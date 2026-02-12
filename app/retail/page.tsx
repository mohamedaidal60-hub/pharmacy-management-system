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
    X
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

// Mock data for the catalog
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
    };

    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    return (
        <div className="flex gap-8 relative">
            <div className={cn("space-y-10 transition-all duration-500", showCheckout ? "w-2/3" : "w-full")}>
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Catalogue <span className="text-blue-600 italic">Produits.</span></h1>
                        <p className="text-slate-500 mt-2 font-medium tracking-wide">Interface de vente au détail et consultation d'inventaire.</p>
                    </div>
                    <button
                        onClick={() => setShowCheckout(!showCheckout)}
                        className="relative bg-black text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl hover:bg-slate-800 transition-all"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Vente en cours
                        <span className="absolute -top-2 -right-2 bg-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-[10px] border-2 border-white shadow-lg">
                            {cart.length}
                        </span>
                    </button>
                </header>

                {/* Filters & Search */}
                <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Scanner un code-barres ou rechercher par nom..."
                            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 scrollbar-hide no-scrollbar">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={cn(
                                    "px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all",
                                    selectedCategory === cat ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="group bg-white p-2 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 relative overflow-hidden">
                            <div className="bg-slate-50 rounded-[2rem] p-8 relative overflow-hidden">
                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                    {product.rx && (
                                        <span className="bg-red-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">Ordonnance</span>
                                    )}
                                    <span className={cn(
                                        "bg-white/90 backdrop-blur shadow-sm text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter",
                                        product.stock < 10 ? "text-red-600" : "text-slate-600"
                                    )}>
                                        Stock: {product.stock}
                                    </span>
                                </div>
                                <div className="h-32 flex items-center justify-center">
                                    <Package className="w-16 h-16 text-slate-200 group-hover:text-blue-200 transition-colors" />
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">{product.category}</p>
                                <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                                <p className="text-xs text-slate-500 mt-1 font-medium">{product.manufacturer}</p>

                                <div className="mt-6 flex items-center justify-between pt-6 border-t border-slate-50">
                                    <p className="text-2xl font-black text-slate-900">{product.price.toFixed(2)}$</p>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="bg-blue-600 text-white p-3 rounded-2xl hover:bg-slate-900 transition-all shadow-lg shadow-blue-100"
                                    >
                                        <Plus className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Floating Checkout Sidebar */}
            <div className={cn(
                "fixed right-8 top-24 bottom-8 w-[30%] bg-white rounded-[3rem] shadow-2xl border border-slate-100 flex flex-col transition-all duration-500 z-50",
                showCheckout ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
            )}>
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-900 text-white p-3 rounded-2xl"><ShoppingCart className="w-5 h-5" /></div>
                        <h2 className="text-xl font-black uppercase tracking-tight text-slate-900">Vente Directe</h2>
                    </div>
                    <button onClick={() => setShowCheckout(false)} className="bg-slate-50 p-2 rounded-xl text-slate-400 hover:text-slate-900 transition-colors"><X className="w-5 h-5" /></button>
                </div>

                <div className="flex-grow p-8 overflow-y-auto space-y-6">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-10">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                <ShoppingCart className="w-10 h-10 text-slate-200" />
                            </div>
                            <p className="text-slate-400 font-bold uppercase text-xs tracking-widest leading-relaxed">Panier vide. <br />Ajoutez des produits pour commencer la vente.</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl group">
                                <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-100 font-black text-xs">{item.qty}x</div>
                                <div className="flex-grow">
                                    <p className="text-sm font-black text-slate-900 leading-tight">{item.name}</p>
                                    <p className="text-[10px] text-slate-500 font-bold">PU: {item.price.toFixed(2)}$</p>
                                </div>
                                <p className="text-sm font-black text-slate-900">{(item.price * item.qty).toFixed(2)}$</p>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-8 bg-slate-900 text-white rounded-b-[3rem] space-y-6">
                    <div className="space-y-3">
                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                            <span>Sous-total</span>
                            <span>{cartTotal.toFixed(2)}$</span>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                            <span>Taxes (5%)</span>
                            <span>{(cartTotal * 0.05).toFixed(2)}$</span>
                        </div>
                        <div className="flex justify-between text-xl font-black uppercase tracking-tighter pt-4 border-t border-white/10">
                            <span>Total</span>
                            <span className="text-blue-400">{(cartTotal * 1.05).toFixed(2)}$</span>
                        </div>
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 py-5 rounded-2.5xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl shadow-blue-900/40">
                        Encaisser la Vente
                    </button>
                </div>
            </div>
        </div>
    );
}
