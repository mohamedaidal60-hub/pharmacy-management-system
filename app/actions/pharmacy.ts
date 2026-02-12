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
    await prisma.notification.create({
        data: { userId, title, message, type, actionId }
    });
}

// ============================================
// HELPER: Créer une action en attente
// ============================================
async function createPendingAction(
    type: string,
    createdById: string,
    storeId: string,
    originalData: any
) {
    const action = await prisma.pendingAction.create({
        data: {
            type: type as any,
            createdById,
            storeId,
            originalData: JSON.stringify(originalData),
            status: "PENDING"
        }
    });

    // Notifier tous les admins
    const admins = await prisma.user.findMany({
        where: { role: "ADMIN", isActive: true }
    });

    for (const admin of admins) {
        await createNotification(
            admin.id,
            "Nouvelle action à valider",
            `${type}: Action créée par un utilisateur et en attente de validation.`,
            "ACTION_REQUIRED",
            action.id
        );
    }

    return action;
}

// ============================================
// GESTION UTILISATEURS (ADMIN UNIQUEMENT)
// ============================================

export async function createUser(data: {
    name: string;
    email: string;
    password: string;
    role: string;
    storeId: string;
}) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user || session.user.role !== "ADMIN") {
            return { success: false, error: "Accès refusé. Admin uniquement." };
        }

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

        await createNotification(
            user.id,
            "Compte créé",
            `Votre compte a été créé par l'administrateur. Email: ${data.email}`,
            "INFO"
        );

        revalidatePath("/admin/users");
        return { success: true, user };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateUserPassword(userId: string, newPassword: string) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user || session.user.role !== "ADMIN") {
            return { success: false, error: "Accès refusé" };
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword }
        });

        await createNotification(
            userId,
            "Mot de passe réinitialisé",
            "Votre mot de passe a été réinitialisé par l'administrateur. Veuillez vous reconnecter.",
            "WARNING"
        );

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function toggleUserStatus(userId: string) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user || session.user.role !== "ADMIN") {
            return { success: false, error: "Accès refusé" };
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return { success: false, error: "Utilisateur introuvable" };

        await prisma.user.update({
            where: { id: userId },
            data: { isActive: !user.isActive }
        });

        await createNotification(
            userId,
            user.isActive ? "Compte désactivé" : "Compte activé",
            user.isActive ? "Votre compte a été désactivé." : "Votre compte a été réactivé.",
            "WARNING"
        );

        revalidatePath("/admin/users");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getAllUsers() {
    const users = await prisma.user.findMany({
        include: { store: true, createdBy: true }
    });
    return users;
}

// ============================================
// GESTION PRODUITS (AVEC VALIDATION)
// ============================================

export async function createProduct(data: {
    name: string;
    molecule?: string;
    category: string;
    price: number;
    wholesalePrice: number;
    barcode: string;
    rxRequired?: boolean;
    storeId: string;
}) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) return { success: false, error: "Non authentifié" };

        // Si l'utilisateur n'est PAS admin, créer une action en attente
        if (session.user.role !== "ADMIN") {
            const action = await createPendingAction(
                "CREATE_PRODUCT",
                session.user.id,
                data.storeId,
                data
            );

            await createNotification(
                session.user.id,
                "Produit en attente de validation",
                `Le produit "${data.name}" sera créé après validation de l'administrateur.`,
                "INFO",
                action.id
            );

            return { success: true, pending: true, actionId: action.id };
        }

        // Admin : création immédiate
        const product = await prisma.product.create({ data: data as any });
        await prisma.inventory.create({
            data: { productId: product.id, storeId: data.storeId, quantity: 0 }
        });

        revalidatePath("/inventory");
        return { success: true, product };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateStock(
    productId: string,
    storeId: string,
    change: number,
    reason: string
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) return { success: false, error: "Non authentifié" };

        if (session.user.role !== "ADMIN") {
            const action = await createPendingAction(
                "UPDATE_STOCK",
                session.user.id,
                storeId,
                { productId, change, reason }
            );

            await createNotification(
                session.user.id,
                "Modification stock en attente",
                `Modification de stock (${change > 0 ? '+' : ''}${change}) en attente de validation.`,
                "INFO",
                action.id
            );

            return { success: true, pending: true };
        }

        const inventory = await prisma.inventory.findUnique({
            where: { productId_storeId: { productId, storeId } }
        });

        if (!inventory) return { success: false, error: "Produit introuvable en inventaire" };

        await prisma.inventory.update({
            where: { id: inventory.id },
            data: { quantity: inventory.quantity + change }
        });

        revalidatePath("/inventory");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function addProductBatch(
    productId: string,
    batchNumber: string,
    expiryDate: Date,
    quantity: number
) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) return { success: false, error: "Non authentifié" };

        const product = await prisma.product.findUnique({
            where: { id: productId },
            include: { inventory: true }
        });

        if (!product) return { success: false, error: "Produit introuvable" };

        if (session.user.role !== "ADMIN") {
            const action = await createPendingAction(
                "CREATE_BATCH",
                session.user.id,
                product.storeId,
                { productId, batchNumber, expiryDate, quantity }
            );

            await createNotification(
                session.user.id,
                "Lot en attente de validation",
                `Le lot ${batchNumber} sera enregistré après validation.`,
                "INFO",
                action.id
            );

            return { success: true, pending: true };
        }

        await prisma.productBatch.create({
            data: { productId, batchNumber, expiryDate, quantity }
        });

        // Mettre à jour l'inventaire
        const inv = product.inventory[0];
        if (inv) {
            await prisma.inventory.update({
                where: { id: inv.id },
                data: { quantity: inv.quantity + quantity }
            });
        }

        revalidatePath("/inventory");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// ============================================
// COMMANDES
// ============================================

export async function createOrder(data: {
    storeId: string;
    type: string;
    items: Array<{ productId: string; quantity: number; price: number }>;
    patientId?: string;
}) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) return { success: false, error: "Non authentifié" };

        const total = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const orderNumber = `ORD-${Date.now()}`;

        if (session.user.role !== "ADMIN") {
            const action = await createPendingAction(
                "CREATE_ORDER",
                session.user.id,
                data.storeId,
                { ...data, total, orderNumber }
            );

            await createNotification(
                session.user.id,
                "Commande en attente",
                `Commande ${orderNumber} (${total.toFixed(2)} DA) en attente de validation.`,
                "INFO",
                action.id
            );

            return { success: true, pending: true };
        }

        const order = await prisma.order.create({
            data: {
                orderNumber,
                total,
                status: "PENDING",
                type: data.type,
                storeId: data.storeId,
                patientId: data.patientId,
                items: {
                    create: data.items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        });

        // Décrémenter le stock
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
// MESSAGERIE
// ============================================

export async function sendInternalMessage(senderId: string, receiverId: string, content: string) {
    try {
        const message = await prisma.message.create({
            data: { senderId, receiverId, content, isRead: false }
        });

        await createNotification(
            receiverId,
            "Nouveau message",
            `Vous avez reçu un message de ${senderId}`,
            "INFO"
        );

        revalidatePath("/messages");
        return { success: true, message };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function getMessages(userId: string) {
    const messages = await prisma.message.findMany({
        where: {
            OR: [{ senderId: userId }, { receiverId: userId }]
        },
        orderBy: { createdAt: "asc" },
        include: { sender: true, receiver: true }
    });
    return messages;
}

export async function markMessageAsRead(messageId: string) {
    await prisma.message.update({
        where: { id: messageId },
        data: { isRead: true }
    });
    revalidatePath("/messages");
}

// ============================================
// RÉCUPÉRATION DONNÉES
// ============================================

export async function getStoreProducts(storeId: string) {
    return await prisma.product.findMany({
        where: { storeId },
        include: { inventory: true, batches: true }
    });
}

export async function getInventory(storeId: string) {
    return await prisma.inventory.findMany({
        where: { storeId },
        include: { product: true }
    });
}

export async function getPatients() {
    return await prisma.patient.findMany();
}

export async function getTasks(storeId: string) {
    return await prisma.task.findMany({
        where: { storeId },
        orderBy: { dueDate: "asc" }
    });
}

export async function createTask(data: {
    title: string;
    description?: string;
    dueDate: Date;
    storeId: string;
}) {
    try {
        const task = await prisma.task.create({ data: data as any });
        revalidatePath("/calendar");
        return { success: true, task };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// ============================================
// NOTIFICATIONS
// ============================================

export async function getNotifications(userId: string) {
    return await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 50
    });
}

export async function markNotificationAsRead(notificationId: string) {
    await prisma.notification.update({
        where: { id: notificationId },
        data: { isRead: true }
    });
    revalidatePath("/");
}

// ============================================
// VALIDATION ADMIN
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
        const session = await getServerSession(authOptions);
        if (!session?.user || session.user.role !== "ADMIN") {
            return { success: false, error: "Accès refusé" };
        }

        const action = await prisma.pendingAction.findUnique({
            where: { id: actionId },
            include: { createdBy: true }
        });

        if (!action) return { success: false, error: "Action introuvable" };

        const finalData = modifications || JSON.parse(action.originalData);

        // Exécuter l'action selon son type
        switch (action.type) {
            case "CREATE_PRODUCT":
                const product = await prisma.product.create({ data: finalData });
                await prisma.inventory.create({
                    data: { productId: product.id, storeId: finalData.storeId, quantity: 0 }
                });
                break;

            case "UPDATE_STOCK":
                const inv = await prisma.inventory.findUnique({
                    where: {
                        productId_storeId: {
                            productId: finalData.productId,
                            storeId: action.storeId
                        }
                    }
                });
                if (inv) {
                    await prisma.inventory.update({
                        where: { id: inv.id },
                        data: { quantity: inv.quantity + finalData.change }
                    });
                }
                break;

            case "CREATE_BATCH":
                await prisma.productBatch.create({ data: finalData });
                break;

            case "CREATE_ORDER":
                await prisma.order.create({
                    data: {
                        orderNumber: finalData.orderNumber,
                        total: finalData.total,
                        status: "PENDING",
                        type: finalData.type,
                        storeId: finalData.storeId,
                        patientId: finalData.patientId,
                        items: {
                            create: finalData.items
                        }
                    }
                });
                break;
        }

        await prisma.pendingAction.update({
            where: { id: actionId },
            data: {
                status: modifications ? "MODIFIED" : "APPROVED",
                modifiedData: modifications ? JSON.stringify(modifications) : null,
                validatedAt: new Date()
            }
        });

        const notifMessage = modifications
            ? "Votre action a été approuvée avec modifications par l'administrateur."
            : "Votre action a été approuvée par l'administrateur.";

        await createNotification(
            action.createdById,
            "Action validée",
            notifMessage,
            "INFO"
        );

        revalidatePath("/admin/validations");
        revalidatePath("/inventory");
        revalidatePath("/retail");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function rejectAction(actionId: string, comment: string) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user || session.user.role !== "ADMIN") {
            return { success: false, error: "Accès refusé" };
        }

        const action = await prisma.pendingAction.findUnique({
            where: { id: actionId }
        });

        if (!action) return { success: false, error: "Action introuvable" };

        await prisma.pendingAction.update({
            where: { id: actionId },
            data: {
                status: "REJECTED",
                adminComment: comment,
                validatedAt: new Date()
            }
        });

        await createNotification(
            action.createdById,
            "Action refusée",
            `Votre action a été refusée. Raison: ${comment}`,
            "WARNING"
        );

        revalidatePath("/admin/validations");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// ============================================
// UTILITAIRES
// ============================================

export async function generateBarcode() {
    // Génération EAN-13 simplifié
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `340${timestamp.slice(-9)}${random}`;
}

export async function getProductCategories() {
    const products = await prisma.product.findMany({
        select: { category: true },
        distinct: ['category']
    });
    return products.map(p => p.category);
}
