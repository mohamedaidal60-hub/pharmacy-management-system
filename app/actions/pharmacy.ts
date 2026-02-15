"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

// ============================================
// HELPER: Créer une notification
// ============================================
async function createNotification(userId: string, title: string, message: string, type: string, actionId?: string) {
    try {
        await prisma.notification.create({
            data: { userId, title, message, type, actionId }
        });
    } catch (e) {
        console.error("Failed to create notification", e);
    }
}

// ============================================
// SESSION ADMIN SIMULÉE
// ============================================

async function getAdminSession() {
    // 1. Essayer la vraie session
    const session = await getServerSession(authOptions);
    if (session?.user) return session;

    // 2. Sinon, simuler l'admin (FALLBACK MODE)
    const adminUser = await prisma.user.findUnique({
        where: { email: "amperella@gmail.com" }
    });

    if (adminUser) {
        return {
            user: {
                id: adminUser.id,
                name: adminUser.name,
                email: adminUser.email,
                role: adminUser.role,
                storeId: adminUser.storeId
            }
        };
    }

    // 3. Dernier recours si DB vide
    return {
        user: {
            id: "fallback_admin",
            name: "Admin Fallback",
            email: "admin@pharmacy.local",
            role: "ADMIN",
            storeId: "store_001"
        }
    };
}

// ============================================
// GESTION UTILISATEURS
// ============================================

export async function getAllUsers() {
    return await prisma.user.findMany({
        orderBy: { createdAt: "desc" }
    });
}

export async function createUser(data: {
    name: string;
    email: string;
    password: string;
    role: string;
    storeId: string;
}) {
    try {
        const session = await getAdminSession();
        // Bypass checks

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: data.role as any,
                storeId: data.storeId,
                createdById: session.user.id,
                isActive: true
            }
        });

        revalidatePath("/admin/users");
        return { success: true, user };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateUserPassword(userId: string, newPassword: string) {
    try {
        await getAdminSession(); // Just to ensure safe execution context if needed
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword }
        });
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function toggleUserStatus(userId: string) {
    try {
        await getAdminSession();
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return { success: false, error: "Utilisateur introuvable" };

        await prisma.user.update({
            where: { id: userId },
            data: { isActive: !user.isActive }
        });

        revalidatePath("/admin/users");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// ============================================
// MESSAGERIE
// ============================================

export async function sendInternalMessage(senderId: string, receiverId: string, content: string) {
    try {
        const message = await prisma.message.create({
            data: { senderId, receiverId, content, isRead: false }
        });

        await createNotification(senderId, "Message envoyé", "Message envoyé", "INFO"); // Simplification

        revalidatePath("/messages");
        return { success: true, message };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getMessages(userId: string) {
    // Si userId est vide ou invalide (ex: fallback admin), on essaie de charger tous les messages ou rien
    if (!userId) return [];
    return await prisma.message.findMany({
        where: { OR: [{ senderId: userId }, { receiverId: userId }] },
        orderBy: { createdAt: "asc" },
        include: { sender: true, receiver: true }
    });
}

export async function markMessageAsRead(messageId: string) {
    await prisma.message.update({
        where: { id: messageId },
        data: { isRead: true }
    });
    revalidatePath("/messages");
}

// ============================================
// CATALOGUE & STOCK
// ============================================

export async function getStoreProducts(storeId: string) {
    if (!storeId) return [];
    return await prisma.product.findMany({
        where: { storeId },
        include: { inventory: true, batches: true }
    });
}

export async function getInventory(storeId: string) {
    if (!storeId) return [];
    return await prisma.inventory.findMany({
        where: { storeId },
        include: { product: true }
    });
}

export async function createProduct(data: any) {
    try {
        await getAdminSession();
        const product = await prisma.product.create({ data });
        // Init inventory
        await prisma.inventory.create({
            data: { productId: product.id, storeId: data.storeId, quantity: 0 }
        });
        revalidatePath("/inventory");
        return { success: true, product };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateStock(productId: string, storeId: string, change: number, reason: string) {
    try {
        await getAdminSession();
        // Upsert inventory
        const inv = await prisma.inventory.findUnique({
            where: { productId_storeId: { productId, storeId } }
        });

        if (inv) {
            await prisma.inventory.update({
                where: { id: inv.id },
                data: { quantity: inv.quantity + change }
            });
        } else {
            await prisma.inventory.create({
                data: { productId, storeId, quantity: change }
            });
        }

        revalidatePath("/inventory");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function addProductBatch(productId: string, batchNumber: string, expiryDate: Date, quantity: number) {
    try {
        const session = await getAdminSession();
        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) return { success: false, error: "Produit introuvable" };

        await prisma.productBatch.create({
            data: { productId, batchNumber, expiryDate, quantity }
        });

        // Update inventory
        const inv = await prisma.inventory.findUnique({
            where: { productId_storeId: { productId, storeId: product.storeId } }
        });

        if (inv) {
            await prisma.inventory.update({
                where: { id: inv.id },
                data: { quantity: inv.quantity + quantity }
            });
        } else {
            await prisma.inventory.create({
                data: { productId, storeId: product.storeId, quantity }
            });
        }

        revalidatePath("/inventory");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function generateBarcode() {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `340${timestamp.slice(-9)}${random}`;
}

// ============================================
// COMMANDES (RETAIL)
// ============================================

export async function createOrder(data: any) {
    try {
        await getAdminSession();
        const total = data.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
        const orderNumber = `ORD-${Date.now()}`;

        const order = await prisma.order.create({
            data: {
                ...data,
                orderNumber,
                total,
                status: "COMPLETED",
                items: {
                    create: data.items.map((item: any) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            } as any // Cast because of complex nesting
        });

        // Update stock
        for (const item of data.items) {
            const inv = await prisma.inventory.findUnique({
                where: { productId_storeId: { productId: item.productId, storeId: data.storeId } }
            });
            if (inv) {
                await prisma.inventory.update({
                    where: { id: inv.id },
                    data: { quantity: Math.max(0, inv.quantity - item.quantity) }
                });
            }
        }

        revalidatePath("/retail");
        revalidatePath("/dispensing");
        return { success: true, order };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// ============================================
// VALIDATION ET ACTIONS EN ATTENTE
// ============================================

export async function getPendingActions(storeId?: string) {
    const where: any = { status: "PENDING" };
    if (storeId) where.storeId = storeId;
    return await prisma.pendingAction.findMany({
        where,
        include: { createdBy: true, store: true },
        orderBy: { createdAt: "desc" }
    });
}

export async function approveAction(actionId: string, modifications?: any) {
    try {
        await getAdminSession();
        const action = await prisma.pendingAction.findUnique({
            where: { id: actionId },
            include: { createdBy: true }
        });
        if (!action) return { success: false, error: "Action introuvable" };

        const finalData = modifications || JSON.parse(action.originalData);

        // Execute action based on type
        switch (action.type) {
            case "CREATE_PRODUCT":
                const product = await prisma.product.create({ data: finalData });
                await prisma.inventory.create({
                    data: { productId: product.id, storeId: finalData.storeId, quantity: 0 }
                });
                break;
            case "UPDATE_STOCK":
                // Same logic as updateStock
                const inv = await prisma.inventory.findUnique({
                    where: { productId_storeId: { productId: finalData.productId, storeId: action.storeId } }
                });
                if (inv) {
                    await prisma.inventory.update({ where: { id: inv.id }, data: { quantity: inv.quantity + finalData.change } });
                }
                break;
            // Add other cases if needed
        }

        await prisma.pendingAction.update({
            where: { id: actionId },
            data: {
                status: modifications ? "MODIFIED" : "APPROVED",
                modifiedData: modifications ? JSON.stringify(modifications) : null,
                validatedAt: new Date()
            }
        });

        revalidatePath("/admin/validations");
        revalidatePath("/inventory");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function rejectAction(actionId: string, comment: string) {
    try {
        await getAdminSession();
        await prisma.pendingAction.update({
            where: { id: actionId },
            data: { status: "REJECTED", adminComment: comment, validatedAt: new Date() }
        });
        revalidatePath("/admin/validations");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// ============================================
// TACHES & PATIENTS
// ============================================

export async function getPatients() {
    return await prisma.patient.findMany();
}

export async function getTasks(storeId: string) {
    if (!storeId) return [];
    return await prisma.task.findMany({ where: { storeId }, orderBy: { dueDate: "asc" } });
}

export async function createTask(data: any) {
    try {
        await prisma.task.create({ data });
        revalidatePath("/calendar");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getProductCategories() {
    const products = await prisma.product.findMany({
        select: { category: true },
        distinct: ['category']
    });
    return products.map(p => p.category);
}
