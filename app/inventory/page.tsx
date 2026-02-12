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
    Warehouse
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

// Mock inventory data
const inventory = [
    { id: "1", name: "Amoxicilline 500mg", batch: "BATCH-2024-001", expiry: "2024-12-20", stock: 45, minStock: 20, shelf: "A-12" },
    { id: "2", name: "Doliprane 1000mg", batch: "BATCH-2024-042", expiry: "2025-06-15", stock: 8, minStock: 25, shelf: "B-03" },
    { id: "3", name: "Ventaline Inhalateur", batch: "BATCH-2023-099", expiry: "2024-05-10", stock: 15, minStock: 10, shelf: "C-01" },
    { id: "4", name: "Loratadine 10mg", batch: "BATCH-2024-015", expiry: "2026-02-14", stock: 120, minStock: 50, shelf: "A-05" },
];

export default function InventoryManagement() {
    const [searchTerm, setSearchTerm] = useState("");

    const expiringSoon = inventory.filter(item => {
        const expiryDate = new Date(item.expiry);
        const today = new Date();
        const diff = (expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24);
        return diff < 90; // Alert if less than 90 days
    });

    const lowStock = inventory.filter(item => item.stock <= item.minStock);

    return (
        <div className="space-y-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Gestion des <span className="text-blue-600 italic">Stocks.</span></h1>
                    <p className="text-slate-500 mt-2 font-medium tracking-wide">Suivi en temps réel, alertes d'expiration et réapprovisionnement.</p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl hover:bg-blue-700 transition-all">
                        <QrCode className="w-4 h-4" /> Scanner Barcode
                    </button>
                    <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl hover:bg-slate-800 transition-all">
                        <Plus className="w-4 h-4" /> Ajouter Produit
                    </button>
                </div>
            </header>

            {/* Alert Banner for Expiry/Low Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {lowStock.length > 0 && (
                    <div className="bg-red-50 border border-red-100 p-8 rounded-[2.5rem] flex items-center gap-6 shadow-sm">
                        <div className="bg-red-500 text-white p-4 rounded-2xl shadow-lg shadow-red-100 animate-pulse">
                            <AlertTriangle className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-red-600 uppercase tracking-tight">Rupture de Stock Critique</h3>
                            <p className="text-xs font-bold text-red-400 mt-1 uppercase tracking-widest">{lowStock.length} produits en dessous du seuil minimal.</p>
                        </div>
                        <button className="ml-auto bg-red-600 text-white p-3 rounded-xl hover:bg-red-700 transition-all"><ArrowUpRight className="w-5 h-5" /></button>
                    </div>
                )}

                {expiringSoon.length > 0 && (
                    <div className="bg-amber-50 border border-amber-100 p-8 rounded-[2.5rem] flex items-center gap-6 shadow-sm">
                        <div className="bg-amber-500 text-white p-4 rounded-2xl shadow-lg shadow-amber-100">
                            <Calendar className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-amber-600 uppercase tracking-tight">Alertes Expiration</h3>
                            <p className="text-xs font-bold text-amber-400 mt-1 uppercase tracking-widest">{expiringSoon.length} lots arrivent à expiration bientôt.</p>
                        </div>
                        <button className="ml-auto bg-amber-600 text-white p-3 rounded-xl hover:bg-amber-700 transition-all"><ArrowUpRight className="w-5 h-5" /></button>
                    </div>
                )}
            </div>

            {/* Main Inventory Table */}
            <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="relative flex-grow max-w-xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Rechercher par nom, lot ou étagère..."
                            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-slate-50 text-slate-500 p-4 rounded-2xl hover:bg-slate-100 border border-slate-100 transition-all">
                            <Filter className="w-5 h-5" />
                        </button>
                        <button className="bg-slate-50 text-slate-500 p-4 rounded-2xl hover:bg-slate-100 border border-slate-100 transition-all">
                            <History className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/50">
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Produit & Lot</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Expiration</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Stock Actuel</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Emplacement</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {inventory.map((item) => {
                            const isExpiring = expiringSoon.some(e => e.id === item.id);
                            const isLow = lowStock.some(l => l.id === item.id);

                            return (
                                <tr key={item.id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-10 py-8">
                                        <p className="font-black text-slate-900 uppercase tracking-tight leading-none mb-1">{item.name}</p>
                                        <p className="text-[10px] text-slate-400 font-bold tracking-widest flex items-center gap-1.5 uppercase">
                                            <QrCode className="w-3 h-3 text-blue-500" /> {item.batch}
                                        </p>
                                    </td>
                                    <td className="px-10 py-8">
                                        <p className={cn(
                                            "text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full w-fit",
                                            isExpiring ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-slate-600"
                                        )}>
                                            {item.expiry}
                                        </p>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-3">
                                            <p className={cn(
                                                "text-xl font-black",
                                                isLow ? "text-red-500" : "text-slate-900"
                                            )}>
                                                {item.stock}
                                            </p>
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Unités</span>
                                        </div>
                                        {isLow && <p className="text-[9px] text-red-400 font-black uppercase mt-1">Min: {item.minStock}</p>}
                                    </td>
                                    <td className="px-10 py-8 uppercase">
                                        <p className="text-xs font-black text-slate-600 flex items-center gap-2">
                                            <Warehouse className="w-3.5 h-3.5 text-blue-400" /> {item.shelf}
                                        </p>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all border border-slate-100">
                                                <History className="w-5 h-5" />
                                            </button>
                                            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-amber-50 hover:text-amber-600 transition-all border border-slate-100">
                                                <BarChart2 className="w-5 h-5" />
                                            </button>
                                            <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all border border-slate-100">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
