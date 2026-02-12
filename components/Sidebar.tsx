"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingCart,
    Package,
    Users,
    Calendar,
    MessageSquare,
    BarChart3,
    Settings,
    LogOut,
    Stethoscope,
    Truck,
    ChevronRight,
    ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

interface SidebarProps {
    userRole: string;
}

const menuItems = [
    { name: "Tableau de Bord", icon: LayoutDashboard, href: "/", roles: ["ADMIN", "PHARMACIST", "ASSISTANT"] },
    { name: "Vente Détail", icon: ShoppingCart, href: "/retail", roles: ["ADMIN", "PHARMACIST", "ASSISTANT"] },
    { name: "Entrepôt / Gros", icon: Truck, href: "/wholesale", roles: ["ADMIN", "PHARMACIST"] },
    { name: "Stocks", icon: Package, href: "/inventory", roles: ["ADMIN", "PHARMACIST", "ASSISTANT"] },
    { name: "Conseils Médicaux", icon: Stethoscope, href: "/prescriptions", roles: ["ADMIN", "PHARMACIST"] },
    { name: "Patients", icon: Users, href: "/customers", roles: ["ADMIN", "PHARMACIST", "ASSISTANT"] },
    { name: "Planning", icon: Calendar, href: "/calendar", roles: ["ADMIN", "PHARMACIST", "ASSISTANT"] },
    { name: "Messages", icon: MessageSquare, href: "/messages", roles: ["ADMIN", "PHARMACIST", "ASSISTANT", "DELIVERY"] },
    { name: "Rapports", icon: BarChart3, href: "/reports", roles: ["ADMIN"] },
    { name: "Paramètres", icon: Settings, href: "/settings", roles: ["ADMIN"] },
];

export default function Sidebar({ userRole }: SidebarProps) {
    const pathname = usePathname();
    const filteredItems = menuItems.filter(item => item.roles.includes(userRole));

    return (
        <aside className="fixed left-0 top-0 h-full w-72 bg-slate-950 text-slate-400 flex flex-col z-50 shadow-2xl border-r border-white/5">
            {/* Brand Logo Section */}
            <div className="p-10 mb-6">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-900/40 group-hover:scale-110 transition-all duration-500">
                        <ShieldCheck className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-white tracking-tighter uppercase leading-none">Pharma<span className="text-blue-500 italic">OS.</span></h1>
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-500/60 mt-1">Enterprise Solution</p>
                    </div>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-grow px-6 space-y-2 overflow-y-auto no-scrollbar">
                <div className="mb-6 px-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 mb-6">Main Operations</p>
                    <div className="space-y-1.5">
                        {filteredItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group relative",
                                        isActive
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                                            : "hover:bg-white/5 hover:text-slate-100"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400 transition-colors")} />
                                        <span className={cn("text-xs font-black uppercase tracking-widest", isActive ? "text-white" : "text-slate-400")}>{item.name}</span>
                                    </div>
                                    {isActive && <ChevronRight className="w-4 h-4 text-blue-200" />}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* User Session Footer */}
            <div className="p-8 mt-auto border-t border-white/5">
                <div className="bg-white/5 rounded-3xl p-5 mb-6 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xs">Ph.</div>
                    <div className="min-w-0">
                        <p className="text-[11px] font-black text-white truncate uppercase tracking-tight">Active Session</p>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{userRole}</p>
                    </div>
                </div>
                <button
                    onClick={() => signOut()}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/5 hover:bg-rose-500/10 hover:text-rose-500 text-slate-500 transition-all font-black text-[10px] uppercase tracking-widest"
                >
                    <LogOut className="w-4 h-4" /> Déconnexion
                </button>
            </div>
        </aside>
    );
}
