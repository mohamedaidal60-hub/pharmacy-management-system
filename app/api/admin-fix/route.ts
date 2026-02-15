import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash, compare } from "bcryptjs";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        console.log("🔍 Diagnostic Auth started...");

        // 1. Test Database
        try {
            await prisma.$connect();
        } catch (e: any) {
            return NextResponse.json({
                status: "CRITICAL_ERROR",
                step: "DB_CONNECTION",
                error: e.message,
                env_db_url_start: process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 20) + "..." : "UNDEFINED"
            }, { status: 500 });
        }

        // 2. Check Store
        const store = await prisma.store.findUnique({
            where: { id: "store_001" }
        });

        // 3. Check User
        const email = "amperella@gmail.com";
        const user = await prisma.user.findUnique({
            where: { email },
            include: { store: true }
        });

        let passwordMatch = false;
        if (user) {
            passwordMatch = await compare("admin123", user.password);
        }

        return NextResponse.json({
            status: "DIAGNOSTIC_COMPLETE",
            database: "CONNECTED",
            store: store ? "FOUND" : "MISSING",
            user: user ? "FOUND" : "MISSING",
            password_check: user ? (passwordMatch ? "MATCH" : "MISMATCH") : "N/A",
            user_details: user ? {
                id: user.id,
                role: user.role,
                isActive: user.isActive,
                storeId: user.storeId
            } : null
        });

    } catch (error: any) {
        return NextResponse.json({ error: "Unexpected Error", details: error.message }, { status: 500 });
    }
}

export async function POST() {
    try {
        console.log("🔧 Attempting Admin Repair...");

        // 1. Ensure Store Exists
        const store = await prisma.store.upsert({
            where: { id: "store_001" },
            update: {},
            create: {
                id: "store_001",
                name: "Pharmacie Centrale",
                address: "123 Rue de la République",
                phone: "0123456789"
            }
        });

        // 2. Fix Admin User
        const hashedPassword = await hash("admin123", 10);

        const user = await prisma.user.upsert({
            where: { email: "amperella@gmail.com" },
            update: {
                password: hashedPassword,
                role: "ADMIN",
                isActive: true,
                storeId: "store_001"
            },
            create: {
                email: "amperella@gmail.com",
                name: "Admin Reparation",
                password: hashedPassword,
                role: "ADMIN",
                isActive: true,
                storeId: "store_001",
                canCreateUsers: true
            }
        });

        return NextResponse.json({
            status: "SUCCESS",
            message: "Admin user & Store repaired successfully",
            credentials: {
                email: "amperella@gmail.com",
                password: "admin123"
            },
            user_id: user.id
        });

    } catch (e: any) {
        return NextResponse.json({ status: "ERROR", error: e.message }, { status: 500 });
    }
}
