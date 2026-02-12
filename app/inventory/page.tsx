"use client";

import { useState } from "react";
import {
    Package,
    Search,
    Plus,
    AlertTriangle,
    History,
    QrCode,
    ArrowUpRight,
    Calendar,
    Filter,
    MoreVertical,
    CheckCircle2,
    Trash2,
    BarChart2,
    Warehouse,
    ArrowRight,
    Zap,
    Tag
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

const inventory = [
    { id: "1", name: "Amoxicilline 500mg", batch: "BATCH-2024-001", expiry: "2024-12-20", stock: 45, minStock: 20, shelf: "A-12", manufacturer: "PharmaLab", category: "Antibiotiques" },
    { id: "2", name: "Doliprane 1000mg", batch: "BATCH-2024-042", expiry: "2024-03-15", stock: 8, minStock: 25, shelf: "B-03", manufacturer: "Sanofi", category: "Analgésiques" },
    { id: "3", name: "Ventaline Inhalateur", batch: "BATCH-2023-099", expiry: "2024-05-10", stock: 15, minStock: 10, shelf: "C-01", manufacturer: "GSK", category: "Respiratoire" },
    { id: "4", name: "Loratadine 10mg", batch: "BATCH-2024-015", expiry: "2026-02-14", stock: 120, minStock: 50, shelf: "A-05", manufacturer: "Bayer", category: "Antihistaminiques" },
];

export default function InventoryManagement() {
    const [searchTerm, setSearchTerm] = useState("");

    const lowStockCount = inventory.filter(item => item.stock <= item.minStock).length;
    const expiringSoonCount = inventory.filter(item => {
        const diff = (new Date(item.expiry).getTime() - new Date().getTime()) / (1000 * 3600 * 24);
        return diff < 60;
    }).length;

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Stock & Supply Management</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Gestion <span className="text-indigo-600 italic">Stocks.</span></h1>
                    <p className="text-slate-500 mt-4 font-medium text-lg">Surveillance en temps réel des lots et réapprovisionnement.</p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-3">
                        <QrCode className="w-4 h-4" /> Scanner Lot
                    </button>
                    <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-indigo-600 transition-all flex items-center gap-3">
                        <Plus className="w-5 h-5" /> Ajouter Produit
                    </button>
                </div>
            </header>

            {/* Quick Alerts - Modern Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-rose-500 to-rose-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden flex items-center justify-between">
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-100">Stock Critique</p>
                        <h3 className="text-5xl font-black mt-2">{lowStockCount}</h3>
                        <p className="text-[11px] font-bold mt-4 uppercase tracking-widest text-rose-100">Produits sous le seuil minimal</p>
                    </div>
                    <AlertTriangle className="w-24 h-24 text-white/10 absolute right-10 top-1/2 -translate-y-1/2" />
                    <button className="relative z-10 bg-white/20 backdrop-blur-md p-4 rounded-2xl hover:bg-white/30 transition-all border border-white/20">
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>

                <div className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden flex items-center justify-between">
                    <div className="relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Péremption</p>
                        <h3 className="text-5xl font-black mt-2 text-indigo-400 font-sans">{expiringSoonCount}</h3>
                        <p className="text-[11px] font-bold mt-4 uppercase tracking-widest text-slate-500">Lots expirant sous 60 jours</p>
                    </div>
                    <Zap className="w-24 h-24 text-white/5 absolute right-10 top-1/2 -translate-y-1/2" />
                    <button className="relative z-10 bg-white/10 p-4 rounded-2xl hover:bg-indigo-600 transition-all border border-white/10">
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Filters & Inventory List */}
            <div className="bg-white rounded-[4rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row gap-8 items-center justify-between bg-slate-50/10">
                    <div className="relative flex-grow max-w-2xl group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Rechercher par molécule, nom de marque ou numéro de lot..."
                            className="w-full bg-white border border-slate-200 rounded-[2rem] py-5 pl-14 pr-6 text-sm font-semibold focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 shadow-sm transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-white text-slate-500 p-5 rounded-2xl hover:bg-slate-50 border border-slate-100 transition-all shadow-sm"><Filter /></button>
                        <button className="bg-white text-slate-500 p-5 rounded-2xl hover:bg-slate-50 border border-slate-100 transition-all shadow-sm"><History /></button>
                    </div>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/30">
                                <th className="px-12 py-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Information Produit</th>
                                <th className="px-12 py-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Statut Stock</th>
                                <th className="px-12 py-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Emplacement</th>
                                <th className="px-12 py-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {inventory.map((item) => {
                                const isLow = item.stock <= item.minStock;
                                return (
                                    <tr key={item.id} className="hover:bg-slate-50/40 transition-all duration-300 group">
                                        <td className="px-12 py-10">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 bg-white rounded-[1.5rem] border border-slate-100 flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-105 transition-transform duration-500">
                                                    <Tag className="w-7 h-7" />
                                                </div>
                                                <div>
                                                    <p className="text-xl font-black text-slate-900 tracking-tight uppercase">{item.name}</p>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100 line-clamp-1">{item.manufacturer}</span>
                                                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{item.batch}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-12 py-10">
                                            <div className="flex items-center gap-6">
                                                <div>
                                                    <p className={cn("text-3xl font-black tracking-tighter leading-none", isLow ? "text-rose-500" : "text-slate-900")}>{item.stock}</p>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase mt-1 tracking-widest">Unités disponibles</p>
                                                </div>
                                                {isLow && (
                                                    <div className="bg-rose-50 text-rose-500 p-2 rounded-xl border border-rose-100">
                                                        <AlertTriangle className="w-5 h-5" />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-12 py-10">
                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2 text-slate-900">
                                                    <Warehouse className="w-4 h-4 text-indigo-500" />
                                                    <span className="text-sm font-black uppercase tracking-tight">{item.shelf}</span>
                                                </div>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Étage {item.shelf.charAt(0)}</span>
                                            </div>
                                        </td>
                                        <td className="px-12 py-10 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-4 bg-white rounded-2xl text-slate-400 hover:text-indigo-600 hover:shadow-xl transition-all border border-slate-100"><BarChart2 className="w-5 h-5" /></button>
                                                <button className="p-4 bg-indigo-600 rounded-2xl text-white hover:bg-slate-900 hover:shadow-xl transition-all"><ArrowRight className="w-5 h-5" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
