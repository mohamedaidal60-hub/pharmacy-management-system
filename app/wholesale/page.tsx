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
    FileText,
    History,
    Activity,
    Layers,
    ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const wholesaleStats = [
    { name: "Commandes Gros", value: "24", icon: Truck, color: "text-indigo-600", bg: "bg-indigo-50" },
    { name: "Valeur Totale", value: "158.4k €", icon: BarChart3, color: "text-emerald-600", bg: "bg-emerald-50" },
    { name: "Unités Stockées", value: "12.5k", icon: Layers, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Alertes Rupture", value: "5", icon: Zap, color: "text-rose-600", bg: "bg-rose-50" },
];

export default function WholesaleInterface() {
    const [activeTab, setActiveTab] = useState("orders");

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20 px-4 sm:px-0">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Enterprise Warehouse Ops</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Gestion <span className="text-blue-600 italic">Entrepôts.</span></h1>
                    <p className="text-slate-500 mt-4 font-medium text-lg">Centralisation logistique et distribution de groupe.</p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-600 transition-all flex items-center gap-3">
                        <Plus className="w-5 h-5" /> Nouvelle Expédition
                    </button>
                </div>
            </header>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {wholesaleStats.map((stat) => (
                    <div key={stat.name} className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 group hover:shadow-xl transition-all duration-500">
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500", stat.bg, stat.color)}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">{stat.name}</p>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                {/* Active Shipments Section */}
                <div className="xl:col-span-2 space-y-8">
                    <div className="flex items-center justify-between px-4">
                        <div className="flex items-center gap-3">
                            <Activity className="text-blue-600 w-5 h-5" />
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Expéditions Actives</h2>
                        </div>
                        <div className="flex bg-slate-100 p-1.5 rounded-xl gap-1">
                            {["En cours", "Validé", "Livre"].map(t => (
                                <button key={t} className="px-5 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all hover:bg-white active:bg-white">{t}</button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white p-8 rounded-[3.5rem] border border-slate-100 flex flex-col md:flex-row md:items-center justify-between group hover:border-blue-200 transition-all duration-500 shadow-sm">
                                <div className="flex items-center gap-8">
                                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center relative overflow-hidden group-hover:bg-blue-600 transition-colors">
                                        <Truck className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Hôpital Central - Plateforme Nord</h4>
                                            <span className="text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100">Prioritaire</span>
                                        </div>
                                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-2 flex items-center gap-4">
                                            <span>Batch #WH-882{i}</span>
                                            <span>•</span>
                                            <span>1,250 articles</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1.5 text-blue-600"><History className="w-3 h-3" /> Expédié il y a 2h</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-8 md:mt-0 flex items-center gap-10">
                                    <div className="text-right">
                                        <p className="text-2xl font-black text-slate-900">4,500.00 €</p>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Facturé à J+30</p>
                                    </div>
                                    <button className="bg-slate-50 text-slate-400 p-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all">
                                        <ArrowUpRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Warehouse Capacity Cards */}
                <div className="space-y-10">
                    <div className="bg-slate-950 text-white rounded-[4rem] p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 rounded-full blur-[80px]" />
                        <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3 mb-12 text-blue-400">
                            <Warehouse /> Capacité Stocks
                        </h3>

                        <div className="space-y-10">
                            {[
                                { name: "Entrepôt Nord", fill: 85, color: "bg-blue-500", shadow: "shadow-blue-500/20" },
                                { name: "Entrepôt Sud", fill: 42, color: "bg-emerald-500", shadow: "shadow-emerald-500/20" }
                            ].map(site => (
                                <div key={site.name} className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <p className="text-sm font-black uppercase tracking-tight">{site.name}</p>
                                        <p className="text-2xl font-black tracking-tighter text-blue-400">{site.fill}%</p>
                                    </div>
                                    <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden p-1 border border-white/5">
                                        <div
                                            className={cn("h-full rounded-full transition-all duration-1000", site.color, site.shadow)}
                                            style={{ width: `${site.fill}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-16 bg-white/5 hover:bg-blue-600 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] transition-all border border-white/10 flex items-center justify-center gap-4">
                            Logistics Report <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="bg-white rounded-[4rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-8 flex items-center gap-3">
                            <ShieldCheck className="text-emerald-500" /> Sécurité Group
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">Toutes les expéditions vers les hôpitaux sont tracées via le protocole PharmaSync.</p>
                        <div className="mt-8 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Flux en temps réel actif</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
