"use client";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";

function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const pathname = usePathname();

    // Show login page without sidebar/navbar
    if (pathname === "/login") {
        return <main className="min-h-screen bg-slate-50">{children}</main>;
    }

    if (status === "loading") {
        return (
            <div className="flex h-screen items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!session) {
        return <main className="min-h-screen bg-slate-50">{children}</main>;
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar userRole={session.user.role} />
            <div className="flex-grow ml-64 flex flex-col">
                <Navbar />
                <main className="p-8">
                    {children}
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
