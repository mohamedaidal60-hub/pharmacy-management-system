"use client";

import { useState, useEffect } from "react";
import {
    Bell,
    Search,
    Menu,
    X,
    User,
    LogOut,
    Settings,
    CreditCard,
    Zap,
    ChevronDown
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const { data: session } = useSession();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={cn(
            "sticky top-0 z-40 w-full transition-all duration-500 px-10 py-6",
            isScrolled ? "bg-slate-50/80 backdrop-blur-xl border-b border-slate-200 py-4" : "bg-transparent"
        )}>
            <div className="max-w-[1600px] mx-auto flex items-center justify-between">
                {/* Search Bar Moderne */}
                <div className="flex-grow max-w-xl">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Rechercher une prescription, un patient ou un produit..."
                            className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-xs font-semibold shadow-sm group-hover:shadow-md focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600 transition-all outline-none"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            <span className="bg-slate-50 text-[10px] font-black text-slate-400 px-2 py-1 rounded-md border border-slate-100 leading-none tracking-tighter group-focus-within:hidden animate-in fade-in">⌘ K</span>
                        </div>
                    </div>
                </div>

                {/* User Actions */}
                <div className="flex items-center gap-6">
                    {/* Notifications */}
                    <button className="relative p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 hover:shadow-xl hover:shadow-blue-50 transition-all group">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-3 right-3 w-3 h-3 bg-rose-500 border-2 border-white rounded-full group-hover:animate-ping opacity-75"></span>
                        <span className="absolute top-3 right-3 w-3 h-3 bg-rose-500 border-2 border-white rounded-full"></span>
                    </button>

                    {/* User Profile dropdown preview */}
                    <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group px-4">
                        <div className="text-right hidden sm:block">
                            <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight leading-none">{session?.user?.name}</p>
                            <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest mt-1 italic">
                                {session?.user?.storeName || "Dukanileo Main"}
                            </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white p-0.5 group-hover:scale-105 transition-transform duration-500">
                            <div className="w-full h-full rounded-[10px] border border-white/20 flex items-center justify-center font-black text-xs">
                                {session?.user?.name?.charAt(0) || "U"}
                            </div>
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-300 group-hover:text-slate-600" />
                    </div>
                </div>
            </div>
        </nav>
    );
}
