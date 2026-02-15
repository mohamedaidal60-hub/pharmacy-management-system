"use client";

import { useState, useEffect } from "react";
import {
    Search,
    Plus,
    Scan,
    Download,
    Filter,
    Package,
    AlertTriangle,
    Layers,
    ChevronRight,
    Calendar,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    createProduct,
    updateStock,
    addProductBatch,
    getInventory,
    generateBarcode
} from "@/app/actions/pharmacy";
import { usePharmacy } from "@/context/PharmacyContext";

const CATEGORIES = [
    "Analgésique",
    "AINS",
    "Antibiotique",
    "Cardiologie",
    "Diabète",
    "ORL",
    "Dermatologie",
    "Gastro-entérologie",
    "Neurologie",
    "Pédiatrie",
    "Autre"
];

export default function InventoryPage() {
    const { selectedStoreId } = usePharmacy();
    const [inventory, setInventory] = useState<any[]>([]);
    const [filteredInventory, setFilteredInventory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [showProductModal, setShowProductModal] = useState(false);
    const [showBatchModal, setShowBatchModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    useEffect(() => {
        if (selectedStoreId) {
            refreshData();
        }
    }, [selectedStoreId]);

    useEffect(() => {
        let filtered = inventory;

        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.product.molecule?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.product.barcode.includes(searchTerm)
            );
        }

        if (categoryFilter && categoryFilter !== "all") {
            filtered = filtered.filter(item => item.product.category === categoryFilter);
        }

        setFilteredInventory(filtered);
    }, [searchTerm, categoryFilter, inventory]);

    const refreshData = async () => {
        if (!selectedStoreId) return;
        setLoading(true);
        const data = await getInventory(selectedStoreId);
        setInventory(data);
        setFilteredInventory(data);
        setLoading(false);
    };

    const handleUpdateStock = async (productId: string, change: number) => {
        if (!selectedStoreId) return alert("Sélectionnez une boutique");
        const res = await updateStock(productId, selectedStoreId, change, "Ajustement manuel");
        if (res.success) {
            // Success direct
            alert("✅ Modification effectuée !");
            refreshData();
        } else {

            alert("Erreur: " + res.error);
        }
    };

    const handleAddBatch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedProduct) return;
        const formData = new FormData(e.currentTarget);

        const res = await addProductBatch(
            selectedProduct.id,
            formData.get("batchNumber") as string,
            new Date(formData.get("expiryDate") as string),
            parseInt(formData.get("quantity") as string)
        );

        if (res.success) {
            alert("✅ Lot ajouté !");
            setShowBatchModal(false);
            setSelectedProduct(null);
            refreshData();
        } else {
            alert("❌ " + res.error);
        }
    };

    const handleCreateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedStoreId) return;
        const formData = new FormData(e.currentTarget);

        const res = await createProduct({
            name: formData.get("name") as string,
            molecule: formData.get("molecule") as string,
            category: formData.get("category") as string,
            price: parseFloat(formData.get("price") as string),
            wholesalePrice: parseFloat(formData.get("wprice") as string),
            barcode: formData.get("barcode") as string,
            storeId: selectedStoreId
        });

        if (res.success) {
            alert("✅ Produit créé !");
            setShowProductModal(false);
            refreshData();
        } else {

            alert("❌ " + res.error);
        }
    };

    const handleGenerateBarcode = async () => {
        const code = await generateBarcode();
        const input = document.querySelector('input[name="barcode"]') as HTMLInputElement;
        if (input) input.value = code;
    };

    const criticalStockCount = inventory.filter(item => item.quantity <= item.minStock).length;

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
                    <button
                        onClick={() => alert("Scanner: Connectez un lecteur de code-barres USB")}
                        className="bg-white text-slate-500 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-slate-100 hover:bg-slate-50 transition-all flex items-center gap-3"
                    >
                        <Scan className="w-5 h-5" /> Scanner
                    </button>
                    <button
                        onClick={() => setShowProductModal(true)}
                        className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-700 transition-all flex items-center gap-3"
                    >
                        <Plus className="w-5 h-5" /> Nouveau Produit
                    </button>
                </div>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-rose-600 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-100">Stock Critique</p>
                    <h3 className="text-5xl font-black mt-4">{criticalStockCount}</h3>
                    <p className="text-[11px] font-bold mt-8 uppercase tracking-widest text-rose-100 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" /> Produits sous le seuil
                    </p>
                </div>
                <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Flux Inventaire</p>
                    <h3 className="text-5xl font-black mt-4 text-blue-500">{inventory.length}</h3>
                    <p className="text-[11px] font-bold mt-8 uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <Package className="w-4 h-4" /> Références actives
                    </p>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="flex gap-4">
                <div className="flex-grow relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Recherche rapide : nom, molécule, code-barres..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white border border-slate-100 rounded-[2rem] py-6 pl-14 pr-8 font-bold outline-none shadow-sm"
                    />
                </div>
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-white border border-slate-100 rounded-[2rem] px-8 py-6 font-black uppercase text-xs outline-none shadow-sm"
                >
                    <option value="all">Toutes Catégories</option>
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Liste Inventaire */}
            <div className="space-y-6">
                {loading ? (
                    <div className="text-center py-20">
                        <p className="text-slate-400 font-black text-sm">Chargement...</p>
                    </div>
                ) : filteredInventory.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[4rem] border border-slate-100">
                        <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-400 font-bold">Aucun produit trouvé</p>
                    </div>
                ) : (
                    filteredInventory.map((item) => (
                        <div key={item.id} className="bg-white p-10 rounded-[4rem] border border-slate-100 flex items-center justify-between shadow-sm hover:shadow-xl transition-all">
                            <div className="flex items-center gap-8 flex-grow">
                                <div className={cn(
                                    "w-20 h-20 rounded-3xl flex items-center justify-center text-white font-black text-2xl shadow-lg",
                                    item.quantity <= item.minStock ? "bg-rose-600" : "bg-blue-600"
                                )}>
                                    <Package className="w-10 h-10" />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{item.product.name}</h3>
                                    <div className="flex items-center gap-6 mt-3">
                                        <span className="text-[10px] font-black text-slate-400 uppercase">Molécule: {item.product.molecule || "N/A"}</span>
                                        <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-blue-50 text-blue-600">{item.product.category}</span>
                                        <span className="text-[9px] font-mono text-slate-400">{item.product.barcode}</span>
                                    </div>
                                    <div className="flex items-center gap-4 mt-4 text-[10px] font-bold text-slate-500">
                                        <span>Retail: {item.product.price.toFixed(2)} DA</span>
                                        <span>•</span>
                                        <span>Gros: {item.product.wholesalePrice.toFixed(2)} DA</span>
                                        {item.shelf && (
                                            <>
                                                <span>•</span>
                                                <span>Rayon: {item.shelf}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="text-center">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Stock</p>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleUpdateStock(item.product.id, -1)}
                                                className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 hover:bg-rose-600 hover:text-white transition-all font-black"
                                            >-</button>
                                            <p className={cn(
                                                "text-2xl font-black font-sans",
                                                item.quantity <= item.minStock ? "text-rose-600" : "text-slate-900"
                                            )}>{item.quantity}</p>
                                            <button
                                                onClick={() => handleUpdateStock(item.product.id, 1)}
                                                className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all font-black"
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => { setSelectedProduct(item.product); setShowBatchModal(true); }}
                                    className="px-6 py-3 bg-slate-50 text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center gap-3"
                                >
                                    <Layers className="w-4 h-4" /> Gérer Lots
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Modal Nouveau Produit */}
            {showProductModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-md">
                    <div className="bg-white rounded-[4rem] w-full max-w-3xl p-16 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">Nouveau <span className="text-blue-600">Produit.</span></h2>
                        <p className="text-slate-500 font-medium mb-12">Enregistrez une nouvelle référence dans le catalogue.</p>

                        <form onSubmit={handleCreateProduct} className="space-y-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Désignation</label>
                                    <input name="name" required className="w-full bg-slate-50 border-none rounded-2xl py-5 px-6 font-bold outline-none" placeholder="Ex: Panadol 500mg" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Molécule</label>
                                    <input name="molecule" className="w-full bg-slate-50 border-none rounded-2xl py-5 px-6 font-bold outline-none" placeholder="Ex: Paracétamol" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Catégorie</label>
                                    <select name="category" required className="w-full bg-slate-50 border-none rounded-2xl py-5 px-6 font-black uppercase text-xs outline-none">
                                        <option value="">-- Sélectionnez --</option>
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center justify-between">
                                        <span>Code-Barres (EAN)</span>
                                        <button
                                            type="button"
                                            onClick={handleGenerateBarcode}
                                            className="text-[9px] font-black uppercase bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-all"
                                        >
                                            Auto-Générer
                                        </button>
                                    </label>
                                    <input name="barcode" required className="w-full bg-slate-50 border-none rounded-2xl py-5 px-6 font-bold outline-none" placeholder="625123456789" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Prix Public (Retail)</label>
                                    <input name="price" type="number" step="0.01" required className="w-full bg-slate-50 border-none rounded-2xl py-5 px-6 font-bold outline-none" placeholder="0.00" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Prix de Gros (Wholesale)</label>
                                    <input name="wprice" type="number" step="0.01" required className="w-full bg-slate-50 border-none rounded-2xl py-5 px-6 font-bold outline-none" placeholder="0.00" />
                                </div>
                            </div>
                            <div className="flex gap-4 pt-6">
                                <button type="button" onClick={() => setShowProductModal(false)} className="flex-grow bg-slate-100 py-8 rounded-[2rem] font-black uppercase text-[10px]">Annuler</button>
                                <button type="submit" className="flex-grow bg-blue-600 text-white py-8 rounded-[2rem] font-black uppercase text-[10px] shadow-2xl">Créer le Produit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Gestion Lots */}
            {showBatchModal && selectedProduct && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-md">
                    <div className="bg-white rounded-[4rem] w-full max-w-2xl p-16 shadow-2xl">
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">Gérer <span className="text-blue-600">Lots</span></h2>
                        <p className="text-slate-500 font-medium mb-12">Produit: <span className="font-black text-slate-900">{selectedProduct.name}</span></p>

                        <form onSubmit={handleAddBatch} className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Numéro de Lot</label>
                                <input name="batchNumber" required className="w-full bg-slate-50 border-none rounded-2xl py-6 px-8 font-bold outline-none" placeholder="LOT-2024-001" />
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Date d'Expiration</label>
                                    <input name="expiryDate" type="date" required className="w-full bg-slate-50 border-none rounded-2xl py-6 px-8 font-bold outline-none" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Quantité</label>
                                    <input name="quantity" type="number" min="1" required className="w-full bg-slate-50 border-none rounded-2xl py-6 px-8 font-bold outline-none" />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button type="button" onClick={() => { setShowBatchModal(false); setSelectedProduct(null); }} className="flex-grow bg-slate-100 py-8 rounded-[2rem] font-black uppercase text-[10px]">Annuler</button>
                                <button type="submit" className="flex-grow bg-blue-600 text-white py-8 rounded-[2rem] font-black uppercase text-[10px] shadow-2xl">Enregistrer le Lot</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
