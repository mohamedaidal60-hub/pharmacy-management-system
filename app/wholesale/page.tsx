"use client";

import { useState } from "react";
import {
    Truck,
    BarChart3,
    Plus,
    ArrowUpRight,
    Warehouse,
    Zap,
    Layers,
    ChevronRight,
    Settings,
    TrendingUp,
    Percent,
    Check,
    Building2,
    Package
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createOrder } from "@/app/actions/pharmacy";
import { usePharmacy } from "@/context/PharmacyContext";

export default function WholesalePage() {
    const { selectedStoreId } = usePharmacy();
    const [priceAdjustmentMode, setPriceAdjustmentMode] = useState<"percent" | "fixed">("percent");
    const [adjAmount, setAdjAmount] = useState<string>("0");
    const [isApplying, setIsApplying] = useState(false);

    const handleApplyPricing = async () => {
        setIsApplying(true);
        // Ici on simulerait une Server Action "updateAllPrices"
        await new Promise(r => setTimeout(r, 1500));
        alert(`Mise à jour des prix appliquée : ${adjAmount}${priceAdjustmentMode === "percent" ? "%" : "€"}`);
        setIsApplying(false);
    };

    const handleBulkOrder = async () => {
        if (!selectedStoreId) return alert("Boutique Manquante");
        const res = await createOrder({
            storeId: selectedStoreId,
            type: "WHOLESALE",
            items: [{ productId: "bulk-01", quantity: 500, price: 2.10 }]
        });
        if (res.success) alert("Commande Gros Approuvée !");
    };

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20 px-4 sm:px-0">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Enterprise Logistics</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Commerce de <span className="text-indigo-600 italic">Gros.</span></h1>
                </div>
                <div className="flex gap-4">
                    <button onClick={handleBulkOrder} className="bg-slate-900 text-white px-10 py-6 rounded-3xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-indigo-600 transition-all flex items-center gap-4">
                        <Plus className="w-5 h-5" /> Bulk Order Manual
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                {/* Price Management Section */}
                <div className="xl:col-span-2 space-y-10">
                    <section className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-12 flex items-center gap-4">
                            <TrendingUp className="text-indigo-600" /> Gestion des Prix & Marges
                        </h2>

                        <div className="flex flex-col md:flex-row items-center gap-12 mb-16 p-10 bg-slate-50/50 rounded-[3rem] border border-slate-50">
                            <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                                <button
                                    onClick={() => setPriceAdjustmentMode("percent")}
                                    className={cn("px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", priceAdjustmentMode === "percent" ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400")}
                                >
                                    <Percent className="w-4 h-4 mb-2 mx-auto" /> Pourcentage
                                </button>
                                <button
                                    onClick={() => setPriceAdjustmentMode("fixed")}
                                    className={cn("px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", priceAdjustmentMode === "fixed" ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400")}
                                >
                                    <Zap className="w-4 h-4 mb-2 mx-auto" /> Montant Fixe
                                </button>
                            </div>
                            <div className="flex-grow flex items-center gap-6">
                                <input
                                    type="number"
                                    value={adjAmount}
                                    onChange={(e) => setAdjAmount(e.target.value)}
                                    className="bg-white border-none rounded-2xl py-6 px-8 text-4xl font-black w-40 text-center text-slate-900 shadow-inner focus:ring-4 focus:ring-indigo-600/5 outline-none"
                                />
                                <div className="text-left">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ajustement Global</p>
                                    <p className="text-sm font-bold text-slate-500 mt-1 italic">S'applique à tout le catalogue Retail.</p>
                                </div>
                            </div>
                            <button
                                onClick={handleApplyPricing}
                                disabled={isApplying}
                                className="bg-slate-950 text-white px-10 py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-blue-600 transition-all flex items-center gap-4 shadow-xl shadow-slate-200"
                            >
                                {isApplying ? "Mise à jour..." : <>Appliquer <Check className="w-5 h-5" /></>}
                            </button>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-4 px-4">
                            <Warehouse className="text-indigo-600" /> Expéditions en Attente
                        </h2>
                        <div className="space-y-4">
                            {[1, 2].map(i => (
                                <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 flex items-center justify-between group hover:border-indigo-200 transition-all duration-500 shadow-sm relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-4 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex items-center gap-8">
                                        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                            <Truck className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Hôpital Militaire d'Aïn Naâdja</h3>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-4">
                                                <span>Lot #{2024 + i}</span>
                                                <span>•</span>
                                                <span>450kg de fournitures</span>
                                                <span className="text-emerald-500">Prêt pour picking</span>
                                            </p>
                                        </div>
                                    </div>
                                    <button className="p-4 bg-slate-100 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white transition-all">
                                        <ArrowUpRight className="w-6 h-6" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Logistics Stats Sidebar */}
                <div className="space-y-10">
                    <div className="bg-slate-950 text-white rounded-[4rem] p-12 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600 rounded-full blur-[80px] opacity-10" />
                        <h3 className="text-xl font-black uppercase tracking-tight text-white mb-12 flex items-center gap-4">
                            <BarChart3 className="text-indigo-400" /> Metrics Gros
                        </h3>
                        <div className="space-y-10">
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Flux Entrants</p>
                                    <p className="text-2xl font-black text-white font-sans tracking-tighter">84%</p>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 w-[84%] shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-end">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Rotation Entrepôt</p>
                                    <p className="text-2xl font-black text-white font-sans tracking-tighter">14d</p>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[60%] shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-16 bg-white/5 hover:bg-white/10 py-6 rounded-3xl border border-white/5 font-black uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-4 group">
                            Logistique Complète <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm">
                        <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-8 flex items-center gap-4">
                            <Building2 className="text-indigo-600" /> Suppliers Linked
                        </h3>
                        <div className="space-y-4">
                            {["CERP Algeria", "Biopharm Distribution", "Hydra Pharma"].map(s => (
                                <div key={s} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">{s}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
