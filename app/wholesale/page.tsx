"use client";

import { useState } from "react";
import {
    Truck,
    Package,
    Plus,
    Search,
    BarChart3,
    Warehouse,
    Zap,
    ArrowRight,
    ShieldCheck,
    TrendingUp,
    FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

const wholesaleStats = [
    { name: "Commandes de Gros", value: "24", icon: Truck, color: "bg-indigo-600" },
    { name: "Valeur Inventaire", value: "158,400$", icon: BarChart3, color: "bg-emerald-600" },
    { name: "Entrepôts actifs", value: "2", icon: Warehouse, color: "bg-blue-600" },
    { name: "Alertes Rupture", value: "5", icon: Zap, color: "bg-rose-600" },
];

export default function WholesaleInterface() {
    const [activeTab, setActiveTab] = useState("orders");

    return (
        <div className="space-y-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Interface <span className="text-blue-600 italic">Grossiste.</span></h1>
                    <p className="text-slate-500 mt-2 font-medium tracking-wide">Gestion des stocks en vrac et commandes entrepôts.</p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl hover:bg-slate-800 transition-all">
                        <Plus className="w-4 h-4" /> Nouvelle Commande Gros
                    </button>
                </div>
            </header>

            {/* Tabs */}
            <div className="flex bg-slate-100 p-2 rounded-3xl w-fit">
                {["orders", "inventory", "price-management"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                            activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        {tab.replace("-", " ")}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {wholesaleStats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg", stat.color)}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">{stat.name}</p>
                            <h3 className="text-2xl font-black text-slate-900 mt-1">{stat.value}</h3>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                {/* Bulk Ordering Section */}
                <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
                            <Truck className="text-blue-600" /> Commandes en Cours
                        </h2>
                        <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Historique Complet</button>
                    </div>

                    <div className="space-y-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-blue-200 transition-all group">
                                <div className="flex items-center gap-6">
                                    <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm font-black border border-slate-100">#{i}02</div>
                                    <div>
                                        <h4 className="font-black text-slate-900 uppercase text-xs tracking-wider">Hôpital Central - Lot A</h4>
                                        <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase">1,200 Unités • En préparation</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-slate-900">4,500.00$</p>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Détails <ArrowRight className="inline w-3 h-3" /></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Warehouse Optimization Preview */}
                <div className="bg-slate-900 text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 -skew-x-12 translate-x-1/2" />
                    <div className="relative z-10 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-3 text-blue-400">
                                <Warehouse /> État des Entrepôts
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-6 flex-grow">
                            <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] flex flex-col justify-between">
                                <div>
                                    <h4 className="font-black text-sm text-blue-400 uppercase tracking-widest">Entrepôt Nord</h4>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-2">Capacité: 85% pleine</p>
                                </div>
                                <div className="mt-8">
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[85%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] flex flex-col justify-between">
                                <div>
                                    <h4 className="font-black text-sm text-emerald-400 uppercase tracking-widest">Entrepôt Sud</h4>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-2">Capacité: 42% pleine</p>
                                </div>
                                <div className="mt-8">
                                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[42%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 p-6 bg-blue-600 rounded-3xl flex items-center justify-between group cursor-pointer hover:bg-blue-500 transition-all">
                            <div className="flex items-center gap-4">
                                <ShieldCheck className="w-6 h-6" />
                                <span className="text-sm font-black uppercase tracking-widest">Optimiser le Stockage</span>
                            </div>
                            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
