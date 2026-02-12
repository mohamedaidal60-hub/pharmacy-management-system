"use client";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const pathname = usePathname();

    // Show login page without sidebar/navbar
    if (pathname === "/login") {
        return <main className="min-h-screen bg-white">{children}</main>;
    }

    if (status === "loading") {
        return (
            <div className="flex h-screen items-center justify-center bg-white">
                <div className="flex flex-col items-center gap-6">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 border-4 border-blue-600/10 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Loading PharmaOS</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return <main className="min-h-screen bg-slate-50">{children}</main>;
    }

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
            {/* Sidebar avec largeur fixe réele */}
            <Sidebar userRole={session.user.role} />

            {/* Conteneur principal avec décalage exact */}
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

export default function RootLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <DashboardLayout>{children}</DashboardLayout>
        </SessionProvider>
    );
}
