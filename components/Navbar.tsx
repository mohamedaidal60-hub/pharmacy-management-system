"use client";

import { useSession } from "next-auth/react";
import { Bell, Search, User, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
            <div className="flex items-center gap-4 flex-grow max-w-xl">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Rechercher un produit, une commande ou un client..."
                        className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative text-slate-500 hover:text-blue-600 transition-colors">
                    <Bell className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                        3
                    </span>
                </button>

                <div className="h-8 w-px bg-slate-200" />

                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-sm font-bold text-slate-900 leading-none">{session?.user?.name}</p>
                        <p className="text-[10px] text-slate-500 mt-1 uppercase font-black tracking-tighter">
                            {session?.user?.storeName || "Siège Social"} • {session?.user?.role}
                        </p>
                    </div>
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 border border-blue-200">
                        <UserCircle className="w-7 h-7" />
                    </div>
                </div>
            </div>
        </header>
    );
}
