"use client";

import { useSession } from "next-auth/react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import { PharmacyProvider } from "@/context/PharmacyContext";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils"; // Assurez-vous d'importer cn

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    // Initial state check for mobile/desktop preference could be added here

    // Pages publiques qui ne nécessitent pas de sidebar/navbar (ex: login, select-store)
    const isPublicPage = pathname === "/login" || pathname === "/select-store" || pathname === "/admin-fix";

    if (isPublicPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
            {/* Force ADMIN role if no session */}
            <Sidebar
                userRole={session?.user?.role as any || "ADMIN"}
                isCollapsed={isSidebarCollapsed}
                toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            <div className={cn(
                "flex-grow flex flex-col min-w-0 h-screen overflow-hidden transition-all duration-300",
                isSidebarCollapsed ? "ml-20" : "ml-72"
            )}>
                <Navbar />
                <main className="flex-grow overflow-y-auto overflow-x-hidden p-10 no-scrollbar">
                    <div className="mx-auto max-w-[1600px]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    // Auth loading removed
    return (
        <PharmacyProvider>
            <AuthenticatedLayout>{children}</AuthenticatedLayout>
        </PharmacyProvider>
    );
}
