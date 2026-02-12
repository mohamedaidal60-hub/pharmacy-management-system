"use client";

import { useSession } from "next-auth/react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import { PharmacyProvider, usePharmacy } from "@/context/PharmacyContext";

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const pathname = usePathname();
    const { selectedStoreId } = usePharmacy();

    // Pages publiques qui ne nécessitent pas de sidebar/navbar (ex: login, select-store)
    const isPublicPage = pathname === "/login" || pathname === "/select-store";

    if (!session) {
        return <>{children}</>;
    }

    if (isPublicPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
            <Sidebar userRole={session.user.role as any} />
            <div className="flex-grow ml-72 flex flex-col min-w-0 h-screen overflow-hidden">
                <Navbar />
                <main className="flex-grow overflow-y-auto overflow-x-hidden p-10 no-scrollbar">
                    <div className="mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const { status } = useSession();

    if (status === "loading") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
                <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-2">PharmaOS</p>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] animate-pulse">Synchronisation des données...</p>
                </div>
            </div>
        );
    }

    return (
        <PharmacyProvider>
            <AuthenticatedLayout>{children}</AuthenticatedLayout>
        </PharmacyProvider>
    );
}
