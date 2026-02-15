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
    Bell,
    UserCog,
    Shield,
    PanelLeft
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

interface SidebarProps {
    userRole: string;
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

export default function Sidebar({ userRole, isCollapsed, toggleSidebar }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside className={cn(
            "fixed left-0 top-0 h-full bg-slate-950 text-slate-400 flex flex-col z-50 shadow-2xl border-r border-white/5 transition-all duration-300",
            isCollapsed ? "w-20" : "w-72"
        )}>
            {/* Header & Toggle */}
            <div className={cn("relative flex items-center mb-2 p-6", isCollapsed ? "justify-center" : "justify-between")}>
                {!isCollapsed && (
                    <Link href="/" className="flex items-center gap-3 group cursor-pointer overflow-hidden max-w-[180px]">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-900/40 shrink-0">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <div className="whitespace-nowrap overflow-hidden">
                            <h1 className="text-lg font-black text-white tracking-tighter uppercase leading-none truncate">Pharma<span className="text-blue-500 italic">OS.</span></h1>
                            <p className="text-[8px] font-black text-slate-600 tracking-[0.2em] mt-1 uppercase truncate">Enterprise v2.0</p>
                        </div>
                    </Link>
                )}

                {isCollapsed && (
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0 cursor-pointer" onClick={toggleSidebar}>
                        <Building2 className="w-5 h-5" />
                    </div>
                )}

                {/* Retract Button */}
                <button
                    onClick={toggleSidebar}
                    className={cn(
                        "absolute -right-3 top-8 bg-blue-600 text-white p-1 rounded-full shadow-lg border-4 border-slate-50 hover:bg-blue-500 transition-all z-50",
                        isCollapsed && "rotate-180"
                    )}
                >
                    <PanelLeft className="w-3 h-3" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-grow px-3 space-y-2 overflow-y-auto no-scrollbar py-4">
                <div className="px-2">
                    {!isCollapsed && <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-600 mb-4 px-2">Main Ops</p>}
                    <div className="space-y-1">
                        {navigation.map((item) => {
                            if (item.role && !item.role.includes(userRole)) return null;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    title={isCollapsed ? item.name : ""}
                                    className={cn(
                                        "flex items-center px-4 py-3 rounded-xl transition-all duration-300 group relative",
                                        isActive
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                                            : "hover:bg-white/5 hover:text-white",
                                        isCollapsed ? "justify-center" : "justify-between"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-white" : "text-slate-500 group-hover:text-blue-500")} />
                                        {!isCollapsed && <span className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap">{item.name}</span>}
                                    </div>
                                    {!isCollapsed && isActive && <ChevronRight className="w-4 h-4 text-white/50" />}

                                    {/* Tooltip */}
                                    {isCollapsed && (
                                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 border border-white/10 shadow-xl">
                                            {item.name}
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Admin Logic */}
                {userRole === "ADMIN" && (
                    <div className="mt-6 px-2 pt-6 border-t border-white/5">
                        {!isCollapsed && <p className="text-[9px] font-black uppercase tracking-[0.4em] text-rose-600 mb-4 px-2 flex items-center gap-2"><Shield className="w-3 h-3" /> Admin</p>}
                        <div className="space-y-1">
                            {adminNavigation.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        title={isCollapsed ? item.name : ""}
                                        className={cn(
                                            "flex items-center px-4 py-3 rounded-xl transition-all duration-300 group relative",
                                            isActive
                                                ? "bg-rose-600 text-white shadow-lg shadow-rose-900/20"
                                                : "hover:bg-white/5 hover:text-white",
                                            isCollapsed ? "justify-center" : "justify-between"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-white" : "text-slate-500 group-hover:text-rose-500")} />
                                            {!isCollapsed && <span className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap">{item.name}</span>}
                                        </div>
                                        {!isCollapsed && isActive && <ChevronRight className="w-4 h-4 text-white/50" />}

                                        {/* Tooltip */}
                                        {isCollapsed && (
                                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 border border-white/10 shadow-xl">
                                                {item.name}
                                            </div>
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </nav>

            {/* Footer Actions */}
            <div className="p-4 mt-auto border-t border-white/5 space-y-2">
                <Link
                    href="/settings"
                    title={isCollapsed ? "Paramètres" : ""}
                    className={cn(
                        "w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all",
                        pathname === "/settings" ? "text-white bg-blue-600" : "text-slate-400",
                        isCollapsed && "justify-center"
                    )}
                >
                    <Settings className="w-5 h-5 shrink-0" />
                    {!isCollapsed && <span className="text-[10px] font-black uppercase tracking-widest">Settings</span>}
                </Link>

                <button
                    onClick={() => {
                        window.location.href = "/login"; // Force manual redirect
                    }}
                    title={isCollapsed ? "Déconnexion" : ""}
                    className={cn(
                        "w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5 hover:bg-rose-500/10 hover:text-rose-500 transition-all group",
                        isCollapsed && "justify-center"
                    )}
                >
                    <LogOut className="w-4 h-4 shrink-0 group-hover:-translate-x-1 transition-transform" />
                    {!isCollapsed && <span className="text-[10px] font-black uppercase tracking-widest">Déconnexion</span>}
                </button>
            </div>
        </aside>
    );
}
