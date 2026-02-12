"use client";

import { useState } from "react";
import {
    Search,
    ShoppingCart,
    Plus,
    Minus,
    X,
    CreditCard,
    ChevronRight,
    Stethoscope,
    Scan,
    ShieldCheck,
    Building2,
    Trash2,
    ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createOrder } from "@/app/actions/pharmacy";
import { usePharmacy } from "@/context/PharmacyContext";

const products = [
    { id: "1", name: "Doliprane 1g", price: 3.50, category: "Analgésique", rx: false, stock: 154 },
    { id: "2", name: "Amoxicilline 500mg", price: 12.80, category: "Antibiotique", rx: true, stock: 45 },
    { id: "3", name: "Sirop Toux Humex", price: 8.90, category: "ORL", rx: false, stock: 22 },
];

export default function RetailPage() {
    const { selectedStoreId } = usePharmacy();
    const [searchTerm, setSearchTerm] = useState("");
    const [cart, setCart] = useState<any[]>([]);
    const [showCheckout, setShowCheckout] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [insuranceCovered, setInsuranceCovered] = useState(false);

    const addToCart = (product: any) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === product.id);
            if (existing) {
                return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
            }
            return [...prev, { ...product, qty: 1 }];
        });
        setShowCheckout(true);
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(i => i.id !== id));
    };

    const subtotal = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
    const total = insuranceCovered ? subtotal * 0.35 : subtotal; // Simuler 65% de prise en charge

    const handleCheckout = async () => {
        if (!selectedStoreId) return alert("Sélectionnez une boutique");
        setIsProcessing(true);

        const res = await createOrder({
            storeId: selectedStoreId,
            type: "RETAIL",
            items: cart.map(i => ({ productId: i.id, quantity: i.qty, price: i.price }))
        });

        if (res.success) {
            alert("Vente enregistrée avec succès !");
            setCart([]);
            setShowCheckout(false);
        } else {
            alert("Erreur: " + res.error);
        }
        setIsProcessing(false);
    };

    return (
        <div className="max-w-[1600px] mx-auto min-h-screen flex gap-12 pb-20 px-4 sm:px-0 relative">
            <div className={cn("flex-grow transition-all duration-700", showCheckout ? "mr-[450px]" : "")}>
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-8 h-1 bg-emerald-500 rounded-full"></span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Retail Catalog</span>
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Point de <span className="text-emerald-500 italic">Vente.</span></h1>
                    </div>
                    <div className="relative group max-w-md w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Chercher un produit ou scanner..."
                            className="w-full bg-white border border-slate-200 rounded-2xl py-5 pl-14 pr-6 text-sm font-bold shadow-sm focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-[3.5rem] p-4 shadow-sm border border-slate-100 group hover:shadow-2xl hover:border-emerald-200 transition-all duration-500 overflow-hidden relative">
                            <div className="bg-slate-50 rounded-[3rem] p-10 flex flex-col items-center justify-center relative">
                                {product.rx && (
                                    <div className="absolute top-6 right-6 bg-rose-500 text-white p-3 rounded-2xl shadow-lg">
                                        <Stethoscope className="w-5 h-5" />
                                    </div>
                                )}
                                <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center border border-slate-100 shadow-sm group-hover:scale-110 transition-transform">
                                    <ShoppingCart className="w-8 h-8 text-emerald-500" />
                                </div>
                                <div className="mt-8 text-center">
                                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{product.name}</h3>
                                    <p className="text-[10px] font-black uppercase text-slate-400 mt-2 tracking-widest">{product.category}</p>
                                </div>
                            </div>
                            <div className="p-8 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Prix Unité</p>
                                    <p className="text-2xl font-black text-slate-900 font-sans tracking-tight">{product.price.toFixed(2)} €</p>
                                </div>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="bg-slate-900 text-white p-5 rounded-2xl hover:bg-emerald-500 transition-all shadow-xl shadow-slate-200"
                                >
                                    <Plus className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Checkout Sidebar */}
            <aside className={cn(
                "fixed right-0 top-0 h-screen w-[450px] bg-slate-950 text-white shadow-2xl transition-transform duration-700 flex flex-col z-[60]",
                showCheckout ? "translate-x-0" : "translate-x-full"
            )}>
                <button onClick={() => setShowCheckout(false)} className="absolute left-[-24px] top-1/2 -translate-y-1/2 w-12 h-24 bg-slate-950 rounded-tl-3xl rounded-bl-3xl flex items-center justify-center border-l border-y border-white/10 group">
                    <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="p-12 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-3xl font-black uppercase tracking-tight">Panier <span className="text-emerald-500 italic">Vente.</span></h2>
                    <div className="bg-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5">
                        {cart.length} Articles
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto p-12 space-y-8 no-scrollbar">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
                            <ShoppingCart className="w-20 h-20 mb-6" />
                            <p className="text-sm font-black uppercase tracking-widest leading-loose">Votre panier<br />est vide</p>
                        </div>
                    ) : cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between group">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-400 border border-white/5">
                                    {item.rx ? <Stethoscope className="w-6 h-6" /> : <Package className="w-6 h-6" />}
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-tight">{item.name}</h4>
                                    <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest">{item.qty} x {item.price.toFixed(2)} €</p>
                                </div>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="p-2 text-slate-600 hover:text-rose-500 transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="p-12 bg-white/5 border-t border-white/10 space-y-8">
                    <div className="space-y-4">
                        <button
                            onClick={() => setInsuranceCovered(!insuranceCovered)}
                            className={cn(
                                "w-full p-6 rounded-[2rem] border transition-all flex items-center justify-between group",
                                insuranceCovered ? "bg-blue-600/10 border-blue-600/50 text-blue-400" : "bg-white/5 border-white/5 text-slate-400 hover:border-white/20"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <ShieldCheck className={cn("w-6 h-6 transition-all", insuranceCovered ? "scale-110" : "opacity-40")} />
                                <span className="text-[10px] font-black uppercase tracking-widest">Tiers-Payant / Mutuelle</span>
                            </div>
                            {insuranceCovered && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />}
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-slate-400 text-[10px] font-black uppercase tracking-widest">
                            <span>Sous-total HT</span>
                            <span className="font-sans">{subtotal.toFixed(2)} €</span>
                        </div>
                        {insuranceCovered && (
                            <div className="flex justify-between text-blue-400 text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-blue-400/5 rounded-xl border border-blue-400/20">
                                <span>Prise en charge (65%)</span>
                                <span className="font-sans">-{(subtotal * 0.65).toFixed(2)} €</span>
                            </div>
                        )}
                        <div className="flex justify-between items-end pt-4">
                            <span className="text-lg font-black uppercase tracking-tight">Total à régler</span>
                            <span className="text-4xl font-black text-emerald-500 font-sans tracking-tighter">{total.toFixed(2)} €</span>
                        </div>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={isProcessing || cart.length === 0}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[10px] transition-all flex items-center justify-center gap-4 shadow-2xl shadow-emerald-900/40 disabled:opacity-50"
                    >
                        {isProcessing ? "Encaissement..." : <>Confirmer la vente <ArrowRight className="w-5 h-5" /></>}
                    </button>
                </div>
            </aside>
        </div>
    );
}
