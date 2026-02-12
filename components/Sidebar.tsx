"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    BarChart3,
    Settings,
    LogOut,
    ChevronRight,
    Truck,
    Calendar,
    MessageSquare,
    Stethoscope,
    Building2,
    Syringe,
    History,
    Shield,
    Bell,
    UserCog
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard, role: ["ADMIN", "PHARMACIST", "ASSISTANT"] },
    { name: "Dispensing", href: "/dispensing", icon: Syringe, role: ["ADMIN", "PHARMACIST"] },
    { name: "Inventaire", href: "/inventory", icon: Package, role: ["ADMIN", "PHARMACIST", "ASSISTANT"] },
    { name: "Vente Retail", href: "/retail", icon: ShoppingCart, role: ["ADMIN", "PHARMACIST", "ASSISTANT"] },
    { name: "Wholesale OPS", href: "/wholesale", icon: Truck, role: ["ADMIN", "PHARMACIST"] },
    { name: "Patients", href: "/customers", icon: Users, role: ["ADMIN", "PHARMACIST", "ASSISTANT"] },
    { name: "Conseils Médicaux", href: "/prescriptions", icon: Stethoscope, role: ["ADMIN", "PHARMACIST"] },
    { name: "Planning", href: "/calendar", icon: Calendar, role: ["ADMIN", "PHARMACIST", "ASSISTANT"] },
    { name: "Messages", href: "/messages", icon: MessageSquare, role: ["ADMIN", "PHARMACIST", "ASSISTANT"] },
    { name: "Rapports", href: "/reports", icon: BarChart3, role: ["ADMIN"] },
];

const adminNavigation = [
    { name: "Gestion Utilisateurs", href: "/admin/users", icon: UserCog },
    { name: "Centre de Validation", href: "/admin/validations", icon: Bell },
];

export default function Sidebar({ userRole }: { userRole: string }) {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-full w-72 bg-slate-950 text-slate-400 flex flex-col z-50 shadow-2xl border-r border-white/5">
            <div className="p-10 mb-6">
                <Link href="/" className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-900/40 group-hover:scale-110 transition-all duration-500">
                        <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-white tracking-tighter uppercase leading-none">Pharma<span className="text-blue-500 italic">OS.</span></h1>
                        <p className="text-[9px] font-black text-slate-600 tracking-[0.2em] mt-1.5 uppercase">Enterprise v2.0</p>
                    </div>
                </Link>
            </div>

            <nav className="flex-grow px-6 space-y-2 overflow-y-auto no-scrollbar">
                <div className="mb-6 px-4">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 mb-6">Main Operations</p>
                    <div className="space-y-1.5">
                        {navigation.map((item) => {
                            if (item.role && !item.role.includes(userRole)) return null;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 group",
                                        isActive
                                            ? "bg-blue-600 text-white shadow-xl shadow-blue-900/20"
                                            : "hover:bg-white/5 hover:text-white"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-500 group-hover:text-blue-500")} />
                                        <span className="text-[11px] font-black uppercase tracking-widest">{item.name}</span>
                                    </div>
                                    {isActive && <ChevronRight className="w-4 h-4 text-white/50" />}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {userRole === "ADMIN" && (
                    <div className="mb-6 px-4 pt-6 border-t border-white/5">
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-rose-600 mb-6 flex items-center gap-2">
                            <Shield className="w-3 h-3" /> Admin Panel
                        </p>
                        <div className="space-y-1.5">
                            {adminNavigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 group",
                                            isActive
                                                ? "bg-rose-600 text-white shadow-xl shadow-rose-900/20"
                                                : "hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-500 group-hover:text-rose-500")} />
                                            <span className="text-[11px] font-black uppercase tracking-widest">{item.name}</span>
                                        </div>
                                        {isActive && <ChevronRight className="w-4 h-4 text-white/50" />}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </nav>

            <div className="p-8 mt-auto border-t border-white/5">
                <Link
                    href="/settings"
                    className={cn(
                        "w-full flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all mb-4",
                        pathname === "/settings" ? "text-white bg-blue-600" : "text-slate-400"
                    )}
                >
                    <Settings className="w-5 h-5" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Settings</span>
                </Link>
                <button
                    onClick={() => signOut()}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white/5 hover:bg-rose-500/10 hover:text-rose-500 transition-all font-black text-[10px] uppercase tracking-widest group"
                >
                    <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Déconnexion
                </button>
            </div>
        </aside>
    );
}
