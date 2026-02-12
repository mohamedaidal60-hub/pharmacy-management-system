"use client";

import { useState } from "react";
import {
    Plus,
    Search,
    Filter,
    Download,
    AlertTriangle,
    Package,
    ArrowRight,
    Clock,
    History,
    Layers,
    Scan,
    Database,
    ShieldCheck,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { updateStock, addProductBatch } from "@/app/actions/pharmacy";
import { usePharmacy } from "@/context/PharmacyContext";

const mockInventory = [
    { id: "1", name: "Paracétamol 1000mg", category: "Analgésique", stock: 124, minStock: 20, price: "5.50 €", barcode: "34009300", shelf: "A-01" },
    { id: "2", name: "Ibuprofène 400mg", category: "AINS", stock: 8, minStock: 15, price: "4.20 €", barcode: "34009250", shelf: "A-02" },
    { id: "3", name: "Amoxicilline 500mg", category: "Antibiotique", stock: 45, minStock: 10, price: "12.80 €", barcode: "34009500", shelf: "B-03" },
];

export default function InventoryManagement() {
    const { selectedStoreId } = usePharmacy();
    const [searchTerm, setSearchTerm] = useState("");
    const [showBatchModal, setShowBatchModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const handleUpdateStock = async (productId: string, change: number) => {
        if (!selectedStoreId) return alert("Sélectionnez une boutique");
        const res = await updateStock(productId, selectedStoreId, change, "Ajustement manuel");
        if (res.success) {
            alert("Stock mis à jour avec succès !");
        } else {
            alert("Erreur: " + res.error);
        }
    };

    const handleAddBatch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = await addProductBatch(
            selectedProduct.id,
            formData.get("batch") as string,
            new Date(formData.get("expiry") as string),
            parseInt(formData.get("qty") as string)
        );
        if (res.success) {
            alert("Lot ajouté !");
            setShowBatchModal(false);
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20 px-4 sm:px-0">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Stock & Supply Chain</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Gestion <span className="text-blue-600 italic">Inventaire.</span></h1>
                </div>
                <div className="flex gap-4">
                    <button className="bg-white text-slate-500 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-slate-100 hover:bg-slate-50 transition-all flex items-center gap-3">
                        <Scan className="w-5 h-5" /> Code-barres
                    </button>
                    <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-700 transition-all flex items-center gap-3">
                        <Plus className="w-5 h-5" /> Nouveau Produit
                    </button>
                </div>
            </header>

            {/* Critical Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-rose-600 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[60px] opacity-20 -translate-y-1/2 translate-x-1/2" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-100">Stock Critique</p>
                    <h3 className="text-5xl font-black mt-4 leading-none tracking-tighter">12</h3>
                    <p className="text-[11px] font-bold mt-8 uppercase tracking-widest text-rose-100 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Produits sous le seuil de sécurité
                    </p>
                </div>
                <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Péremption Immédiate</p>
                    <h3 className="text-5xl font-black mt-4 leading-none tracking-tighter text-amber-500">5</h3>
                    <p className="text-[11px] font-bold mt-8 uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Lots périmant dans les 30 jours
                    </p>
                </div>
            </div>

            {/* Inventory List */}
            <div className="bg-white rounded-[4rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-10 border-b border-slate-50 bg-slate-50/10 flex flex-col md:flex-row gap-8 items-center justify-between">
                    <div className="relative max-w-xl w-full group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Rechercher par nom, molécule ou emplacement..."
                            className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-14 pr-4 text-xs font-black uppercase tracking-widest focus:ring-4 focus:ring-blue-600/5 transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4">
                        <button className="p-4 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 shadow-sm transition-all"><Filter className="w-5 h-5" /></button>
                        <button className="p-4 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 shadow-sm transition-all"><Download className="w-5 h-5" /></button>
                    </div>
                </div>

                <div className="divide-y divide-slate-50 overflow-x-auto no-scrollbar">
                    {mockInventory.map((item) => (
                        <div key={item.id} className="p-10 flex items-center justify-between group hover:bg-slate-50/50 transition-all duration-300 min-w-[1000px]">
                            <div className="flex items-center gap-8 w-1/3">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                    <Package className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">{item.name}</h3>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="text-[9px] font-black uppercase tracking-widest bg-blue-50 text-blue-600 px-3 py-1 rounded-full border border-blue-100">{item.category}</span>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 italic">Code: {item.barcode}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-16">
                                <div className="text-center px-8 border-x border-slate-100">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Emplacement</p>
                                    <p className="text-sm font-black text-slate-900 uppercase">{item.shelf}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Quantité</p>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => handleUpdateStock(item.id, -1)}
                                            className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 hover:bg-rose-500 hover:text-white transition-all font-black"
                                        >-</button>
                                        <p className={cn(
                                            "text-2xl font-black font-sans leading-none",
                                            item.stock <= item.minStock ? "text-rose-600" : "text-slate-900"
                                        )}>{item.stock}</p>
                                        <button
                                            onClick={() => handleUpdateStock(item.id, 1)}
                                            className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all font-black"
                                        >+</button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => { setSelectedProduct(item); setShowBatchModal(true); }}
                                    className="px-6 py-3 bg-slate-50 text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center gap-3 border border-slate-100"
                                >
                                    <Layers className="w-4 h-4" /> Gérer Lots
                                </button>
                                <button className="p-4 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-slate-200">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Batch Modal */}
            {showBatchModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-md animate-in fade-in">
                    <div className="bg-white rounded-[4rem] w-full max-w-2xl p-16 shadow-2xl relative">
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">Nouveau Lot <span className="text-blue-600">Trace.</span></h2>
                        <p className="text-slate-500 font-medium mb-12">Ajoutez un lot pour la traçabilité de {selectedProduct?.name}</p>

                        <form onSubmit={handleAddBatch} className="space-y-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Numéro de Lot</label>
                                    <input name="batch" required className="w-full bg-slate-50 border-none rounded-2xl py-5 px-6 font-bold outline-none focus:ring-4 focus:ring-blue-600/5" placeholder="B-2024-X" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Quantité</label>
                                    <input name="qty" type="number" required className="w-full bg-slate-50 border-none rounded-2xl py-5 px-6 font-bold outline-none" placeholder="50" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Date d'expiration</label>
                                <input name="expiry" type="date" required className="w-full bg-slate-50 border-none rounded-2xl py-5 px-6 font-bold outline-none" />
                            </div>
                            <div className="flex gap-4 mt-12">
                                <button type="button" onClick={() => setShowBatchModal(false)} className="flex-grow bg-slate-100 py-6 rounded-3xl font-black uppercase tracking-widest text-[10px]">Annuler</button>
                                <button type="submit" className="flex-grow bg-blue-600 text-white py-6 rounded-3xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-blue-200">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
