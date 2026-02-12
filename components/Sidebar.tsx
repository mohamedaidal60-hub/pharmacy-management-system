"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    FileText,
    Settings,
    Truck,
    Stethoscope,
    Calendar,
    MessageSquare,
    History,
    Store,
    LogOut
} from "lucide-react";
import { signOut } from "next-auth/react";

const sidebarLinks = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard, roles: ["ADMIN", "STAFF", "RETAILER", "WHOLESALE"] },
    { name: "Ventes (Retail)", href: "/retail", icon: ShoppingCart, roles: ["ADMIN", "STAFF", "RETAILER"] },
    { name: "Grossiste (Wholesale)", href: "/wholesale", icon: Truck, roles: ["ADMIN", "WHOLESALE"] },
    { name: "Inventaire", href: "/inventory", icon: Package, roles: ["ADMIN", "STAFF"] },
    { name: "Prescriptions", href: "/prescriptions", icon: Stethoscope, roles: ["ADMIN", "STAFF"] },
    { name: "Clients", href: "/customers", icon: Users, roles: ["ADMIN", "STAFF"] },
    { name: "Calendrier", href: "/calendar", icon: Calendar, roles: ["ADMIN", "STAFF"] },
    { name: "Messages", href: "/messages", icon: MessageSquare, roles: ["ADMIN", "STAFF"] },
    { name: "Rapports", href: "/reports", icon: FileText, roles: ["ADMIN"] },
    { name: "Paramètres", href: "/settings", icon: Settings, roles: ["ADMIN"] },
];

export default function Sidebar({ userRole }: { userRole: string }) {
    const pathname = usePathname();

    const filteredLinks = sidebarLinks.filter(link => link.roles.includes(userRole));

    return (
        <div className="flex flex-col h-full bg-slate-900 text-white w-64 fixed left-0 top-0 z-50">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-blue-400 flex items-center gap-2">
                    <Store className="w-8 h-8" />
                    PharmaOS
                </h1>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">Système de Gestion</p>
            </div>

            <nav className="flex-grow px-4 space-y-1 mt-4">
                {filteredLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                                isActive
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            )}
                        >
                            <Icon className={cn(
                                "w-5 h-5 transition-colors",
                                isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400"
                            )} />
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={() => signOut()}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-red-900/20 hover:text-red-400 transition-all text-sm font-medium"
                >
                    <LogOut className="w-5 h-5" />
                    Déconnexion
                </button>
            </div>
        </div>
    );
}
