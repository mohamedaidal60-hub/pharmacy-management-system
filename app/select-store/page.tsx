"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Store, ArrowRight, MapPin, Building2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePharmacy } from "@/context/PharmacyContext";

const mockStores = [
    { id: "1", name: "Pharmacie Principale - Centre", address: "12 Rue de la République, Paris" },
    { id: "2", name: "Pharmacie Lafayette - Est", address: "45 Avenue Gambetta, Paris" },
    { id: "3", name: "Dépôt Logistique Nord", address: "Zone Industrielle, Saint-Denis" },
];

export default function SelectStorePage() {
    const router = useRouter();
    const { setSelectedStoreId, selectedStoreId } = usePharmacy();
    const [loading, setLoading] = useState(false);

    const handleSelect = (storeId: string) => {
        setLoading(true);
        setSelectedStoreId(storeId);
        // Simuler un switch de contexte
        setTimeout(() => {
            router.push("/");
        }, 800);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />

            <div className="w-full max-w-4xl relative z-10">
                <header className="text-center mb-16">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-blue-500/40">
                            <Building2 className="w-8 h-8" />
                        </div>
                    </div>
                    <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none mb-4">
                        Sélection du <span className="text-blue-500 italic">Point de Vente.</span>
                    </h1>
                    <p className="text-slate-400 font-medium text-lg">Choisissez votre shop ou entrepôt pour débuter la session.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockStores.map((store) => (
                        <button
                            key={store.id}
                            onClick={() => handleSelect(store.id)}
                            disabled={loading}
                            className={cn(
                                "bg-white/5 border p-10 rounded-[3rem] text-left transition-all duration-500 group relative overflow-hidden",
                                selectedStoreId === store.id ? "border-blue-500 ring-4 ring-blue-500/10" : "border-white/10 hover:border-blue-500/50 hover:bg-white/10",
                                loading && "opacity-50 cursor-not-allowed"
                            )}
                        >
                            {selectedStoreId === store.id && (
                                <div className="absolute top-6 right-6 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg animate-in zoom-in">
                                    <Check className="w-4 h-4" />
                                </div>
                            )}
                            <MapPin className="text-blue-500 mb-8 w-8 h-8 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-4">{store.name}</h3>
                            <p className="text-slate-500 text-xs font-bold leading-relaxed">{store.address}</p>

                            <div className="mt-10 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                Entrer dans le shop <ArrowRight className="w-4 h-4" />
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">PharmaOS Multi-Store Edition v2.0</p>
                </div>
            </div>
        </div>
    );
}
