"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- INVENTORY ACTIONS ---

export async function updateStock(productId: string, storeId: string, quantityChange: number, reason: string) {
    try {
        const inventory = await prisma.inventory.upsert({
            where: { productId_storeId: { productId, storeId } },
            update: { quantity: { increment: quantityChange } },
            create: { productId, storeId, quantity: quantityChange, minStock: 10 },
        });

        // En situation réelle, on ajouterait ici un log d'audit
        revalidatePath("/inventory");
        return { success: true, inventory };
    } catch (error) {
        console.error("Stock update failed:", error);
        return { success: false, error: "Erreur lors de la mise à jour du stock" };
    }
}

export async function addProductBatch(productId: string, batchNumber: string, expiryDate: Date, quantity: number) {
    try {
        const batch = await prisma.productBatch.create({
            data: { productId, batchNumber, expiryDate, quantity }
        });

        // Update main inventory
        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (product) {
            await updateStock(productId, product.storeId, quantity, "New Batch");
        }

        revalidatePath("/inventory");
        return { success: true, batch };
    } catch (error) {
        return { success: false, error: "Échec de l'ajout du lot" };
    }
}

// --- ORDER ACTIONS ---

export async function createOrder(data: {
    patientId?: string;
    storeId: string;
    items: { productId: string; quantity: number; price: number }[];
    type: "RETAIL" | "WHOLESALE";
}) {
    try {
        const total = data.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const orderNumber = `ORD-${Date.now()}`;

        const order = await prisma.order.create({
            data: {
                orderNumber,
                total,
                storeId: data.storeId,
                patientId: data.patientId,
                type: data.type,
                items: {
                    create: data.items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        });

        // Decrement stock
        for (const item of data.items) {
            await updateStock(item.productId, data.storeId, -item.quantity, "Sale");
        }

        revalidatePath("/retail");
        revalidatePath("/wholesale");
        revalidatePath("/"); // Dashboard
        return { success: true, order };
    } catch (error) {
        console.error("Order creation failed:", error);
        return { success: false, error: "Erreur lors de la commande" };
    }
}

// --- MEDICAL ADVICE & INSURANCE ---

export async function submitInsuranceClaim(patientId: string, orderId: string, amount: Float) {
    try {
        const claim = await prisma.insuranceClaim.create({
            data: { patientId, orderId, amount, status: "SUBMITTED" }
        });
        return { success: true, claim };
    } catch (error) {
        return { success: false, error: "Échec de la soumission" };
    }
}

// --- MESSAGING ---

export async function sendInternalMessage(senderId: string, receiverId: string, content: string) {
    try {
        const msg = await prisma.message.create({
            data: { senderId, receiverId, content }
        });
        revalidatePath("/messages");
        return { success: true, msg };
    } catch (error) {
        return { success: false, error: "Échec de l'envoi" };
    }
}
