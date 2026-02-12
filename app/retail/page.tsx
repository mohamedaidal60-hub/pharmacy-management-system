"use client";

import { useState } from "react";
import {
    Search,
    Filter,
    Plus,
    ShoppingCart,
    Eye,
    Package,
    Tag,
    Info,
    ChevronRight,
    PlusCircle,
    X,
    Minus,
    Trash2,
    CreditCard,
    Stethoscope
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

const mockProducts = [
    { id: "1", name: "Amoxicilline 500mg", category: "Antibiotiques", price: 12.50, stock: 45, barcode: "123456", rx: true, manufacturer: "PharmaLab" },
    { id: "2", name: "Doliprane 1000mg", category: "Analgésiques", price: 5.75, stock: 120, barcode: "789012", rx: false, manufacturer: "Sanofi" },
    { id: "3", name: "Ventaline Inhalateur", category: "Respiratoire", price: 18.90, stock: 8, barcode: "345678", rx: true, manufacturer: "GSK" },
    { id: "4", name: "Loratadine 10mg", category: "Antihistaminiques", price: 9.30, stock: 60, barcode: "901234", rx: false, manufacturer: "Bayer" },
    { id: "5", name: "Ibuprofène 400mg", category: "Anti-inflammatoires", price: 6.20, stock: 85, barcode: "567890", rx: false, manufacturer: "Advil" },
    { id: "6", name: "Gaviscon Suspension", category: "Estomac", price: 11.45, stock: 32, barcode: "112233", rx: false, manufacturer: "Reckitt" },
];

const categories = ["Tous", "Analgésiques", "Antibiotiques", "Respiratoire", "Antihistaminiques", "Estomac"];

export default function RetailCatalog() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tous");
    const [cart, setCart] = useState<{ id: string, name: string, price: number, qty: number }[]>([]);
    const [showCheckout, setShowCheckout] = useState(false);

    const filteredProducts = mockProducts.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.barcode.includes(searchTerm);
        const matchesCategory = selectedCategory === "Tous" || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const addToCart = (product: typeof mockProducts[0]) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
            }
            return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
        });
        if (!showCheckout) setShowCheckout(true);
    };

    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    return (
        <div className="max-w-[1600px] mx-auto flex gap-12 pb-20 relative px-4 sm:px-0">
            {/* Main Center Area */}
            <div className={cn("flex-grow transition-all duration-700", showCheckout ? "w-2/3" : "w-full")}>
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-8 h-1 bg-emerald-600 rounded-full"></span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Dispensing Terminal</span>
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Point de <span className="text-emerald-600 italic">Vente.</span></h1>
                    </div>
                    <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={cn(
                                    "px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                    selectedCategory === cat ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" : "text-slate-400 hover:text-slate-600"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </header>

                {/* Search Bar Premium */}
                <div className="relative group mb-12">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-emerald-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Rechercher un médicament ou scanner code-barres..."
                        className="w-full bg-white border border-slate-100 rounded-[2.5rem] py-8 pl-20 pr-10 text-xl font-bold text-slate-900 focus:shadow-2xl focus:shadow-emerald-100 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/5 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Grid Products */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-[3.5rem] p-4 shadow-sm border border-slate-100 group hover:shadow-2xl hover:shadow-emerald-200/50 hover:border-emerald-200 transition-all duration-500 overflow-hidden relative">
                            <div className="bg-slate-50 rounded-[3rem] p-10 flex flex-col items-center justify-center relative">
                                {product.rx && (
                                    <div className="absolute top-6 right-6 bg-rose-500 text-white p-3 rounded-2xl shadow-lg border border-white/20">
                                        <Stethoscope className="w-5 h-5" />
                                    </div>
                                )}
                                <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center border border-slate-100 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                    <Package className="w-10 h-10 text-slate-200 group-hover:text-emerald-500 transition-colors" />
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">{product.category}</p>
                                        <h3 className="text-xl font-black text-slate-900">{product.name}</h3>
                                    </div>
                                    <p className="text-2xl font-black text-emerald-600 tracking-tighter">{product.price.toFixed(2)}€</p>
                                </div>
                                <div className="flex items-center justify-between mt-8">
                                    <div className="flex items-center gap-2">
                                        <div className={cn("w-2 h-2 rounded-full", product.stock < 10 ? "bg-rose-500" : "bg-emerald-500")} />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Stock: {product.stock}</span>
                                    </div>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-slate-100 active:scale-95"
                                    >
                                        <PlusCircle className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Float Checkout Sidebar - Much more refined */}
            {showCheckout && (
                <div className="w-[450px] bg-slate-950 rounded-[4rem] text-white p-10 flex flex-col shadow-2xl h-[calc(100vh-160px)] sticky top-32 animate-in slide-in-from-right duration-500">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                <ShoppingCart className="w-6 h-6 text-emerald-400" />
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">Panier</h2>
                        </div>
                        <button onClick={() => setShowCheckout(false)} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all"><X /></button>
                    </div>

                    <div className="flex-grow space-y-8 overflow-y-auto no-scrollbar pr-2">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
                                <ShoppingCart className="w-16 h-16 mb-6" />
                                <p className="text-[10px] font-black uppercase tracking-widest">Le panier est de nouveau vide</p>
                            </div>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="bg-white/5 p-6 rounded-[2.5rem] flex items-center justify-between group">
                                    <div className="flex items-center gap-6">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center font-black text-emerald-400 text-xs">{item.qty}</div>
                                        <div>
                                            <p className="text-sm font-black uppercase tracking-tight">{item.name}</p>
                                            <p className="text-[10px] font-bold text-slate-500 tracking-widest mt-1">{item.price.toFixed(2)}€ / unité</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="text-lg font-black text-white">{(item.price * item.qty).toFixed(2)}€</p>
                                        <button className="text-slate-600 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="pt-10 mt-10 border-t border-white/10 space-y-8">
                        <div className="flex justify-between items-end">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Total à payer</p>
                            <h4 className="text-5xl font-black text-emerald-400 tracking-tighter">{(cartTotal * 1.05).toFixed(2)}€</h4>
                        </div>
                        <button className="w-full bg-emerald-600 hover:bg-emerald-500 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] transition-all shadow-2xl shadow-emerald-900/40 flex items-center justify-center gap-4 group">
                            Valider le Paiement <CreditCard className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
