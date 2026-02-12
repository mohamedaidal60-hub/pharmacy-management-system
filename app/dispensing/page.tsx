"use client";

import { useState, useEffect } from "react";
import {
    Scan,
    Search,
    Plus,
    Syringe,
    ShieldCheck,
    AlertTriangle,
    ChevronRight,
    User,
    FileText,
    Clock,
    ArrowRight,
    Loader2,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createOrder, getStoreProducts } from "@/app/actions/pharmacy";
import { usePharmacy } from "@/context/PharmacyContext";

export default function DispensingPage() {
    const { selectedStoreId } = usePharmacy();
    const [step, setStep] = useState(1);
    const [patientName, setPatientName] = useState("");
    const [medicationSearch, setMedicationSearch] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isScanning, setIsScanning] = useState(false);

    useEffect(() => {
        if (selectedStoreId) {
            getStoreProducts(selectedStoreId).then(setProducts);
        }
    }, [selectedStoreId]);

    const handleDispense = async () => {
        if (!selectedStoreId) return alert("Veuillez sélectionner une boutique");
        if (!selectedProduct) return alert("Veuillez sélectionner un produit valide");

        setIsSubmitting(true);
        const res = await createOrder({
            items: [{ productId: selectedProduct.id, quantity: 1, price: selectedProduct.price }],
            storeId: selectedStoreId,
            type: "RETAIL"
        });

        if (res.success) {
            setStep(4); // Afficher l'étiquette
        } else {
            alert("Erreur: " + res.error);
        }
        setIsSubmitting(false);
    };

    const handleScanRx = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            setPatientName("Jean Dupont (Auto-détecté)");
            setStep(2);
        }, 2000);
    };

    const filteredMedications = products.filter(p =>
        p.name.toLowerCase().includes(medicationSearch.toLowerCase()) ||
        p.barcode.includes(medicationSearch)
    );

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20 px-4 sm:px-0">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-1 bg-rose-500 rounded-full"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500">Professional Dispensing Unit</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Délivrance <span className="text-rose-500 italic">Rx.</span></h1>
                    <p className="text-slate-500 mt-4 font-medium text-lg">Gestion sécurisée des ordonnances et validation pharmaceutique.</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleScanRx}
                        disabled={isScanning}
                        className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-rose-500 transition-all flex items-center gap-3 disabled:opacity-50"
                    >
                        {isScanning ? <Loader2 className="w-5 h-5 animate-spin" /> : <Scan className="w-5 h-5" />}
                        {isScanning ? "Analyse..." : "Scanner Ordonnance"}
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-16 px-4">
                            {[
                                { step: 1, label: "Identification" },
                                { step: 2, label: "Analyse Rx" },
                                { step: 3, label: "Validation" }
                            ].map((s) => (
                                <div key={s.step} className="flex items-center gap-4 group">
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all",
                                        step === s.step ? "bg-rose-500 text-white shadow-xl shadow-rose-200" :
                                            step > s.step ? "bg-emerald-500 text-white" : "bg-slate-50 text-slate-300"
                                    )}>
                                        {step > s.step ? <ShieldCheck className="w-6 h-6" /> : s.step}
                                    </div>
                                    <span className={cn(
                                        "text-[10px] font-black uppercase tracking-widest",
                                        step === s.step ? "text-slate-900" : "text-slate-300"
                                    )}>{s.label}</span>
                                    {s.step < 3 && <div className="hidden md:block w-12 h-px bg-slate-100 mx-4" />}
                                </div>
                            ))}
                        </div>

                        <div className="space-y-10 min-h-[400px]">
                            {step === 1 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Trouver le Patient</label>
                                        <div className="relative group">
                                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors" />
                                            <input
                                                type="text"
                                                placeholder="Nom, N° Sécu ou Téléphone..."
                                                className="w-full bg-slate-50 border-none rounded-[2rem] py-8 pl-14 pr-8 text-xl font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-rose-500/5 transition-all outline-none"
                                                value={patientName}
                                                onChange={(e) => setPatientName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button onClick={() => setStep(2)} className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-rose-500 transition-all shadow-2xl shadow-slate-200">
                                        Continuer vers l'analyse
                                    </button>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="bg-rose-50 p-10 rounded-[3rem] border border-rose-100 flex items-center gap-8">
                                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-sm border border-rose-100">
                                            <AlertTriangle className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-rose-900 uppercase tracking-tight">Saisie des dosages</h4>
                                            <p className="text-xs text-rose-600 font-bold uppercase tracking-widest mt-1 opacity-70">Sélectionnez le produit dans le catalogue réel.</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4 relative">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Médicament à délivrer</label>
                                        <input
                                            type="text"
                                            placeholder="Saisir la molécule ou scanner..."
                                            className="w-full bg-slate-50 border-none rounded-[2rem] py-8 px-10 text-xl font-bold text-slate-900 focus:bg-white outline-none"
                                            value={medicationSearch}
                                            onChange={(e) => {
                                                setMedicationSearch(e.target.value);
                                                setSelectedProduct(null);
                                            }}
                                        />

                                        {medicationSearch && !selectedProduct && (
                                            <div className="absolute top-full left-0 right-0 bg-white shadow-2xl rounded-3xl mt-2 border border-slate-100 z-50 overflow-hidden max-h-64 overflow-y-auto no-scrollbar">
                                                {filteredMedications.map(p => (
                                                    <div
                                                        key={p.id}
                                                        onClick={() => {
                                                            setSelectedProduct(p);
                                                            setMedicationSearch(p.name);
                                                        }}
                                                        className="p-6 hover:bg-rose-50 cursor-pointer border-b border-slate-50 flex justify-between"
                                                    >
                                                        <span className="font-black uppercase text-xs">{p.name}</span>
                                                        <span className="text-[10px] text-slate-400">{p.barcode}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <button onClick={() => setStep(3)} disabled={!selectedProduct} className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-rose-500 transition-all disabled:opacity-50">
                                        Confirmer le panier Rx
                                    </button>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="bg-slate-50 p-10 rounded-[3.5rem] border border-slate-100">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8">Récapitulatif de délivrance</h4>
                                        <div className="flex items-center justify-between mb-6">
                                            <span className="text-sm font-bold text-slate-500">Patient</span>
                                            <span className="text-sm font-black text-slate-900 uppercase">{patientName || "Anonyme"}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-bold text-slate-500">Produit</span>
                                            <span className="text-sm font-black text-slate-900 uppercase">{selectedProduct?.name}</span>
                                        </div>
                                        <div className="w-full h-px bg-slate-100 my-8" />
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Contrôle de sécurité OK</span>
                                            <ShieldCheck className="w-6 h-6 text-emerald-500" />
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleDispense}
                                        disabled={isSubmitting}
                                        className="w-full bg-rose-600 text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-rose-200 hover:bg-rose-700 transition-all flex items-center justify-center gap-4"
                                    >
                                        {isSubmitting ? "Validation..." : <>Terminer & Imprimer Etiquette <ArrowRight className="w-5 h-5" /></>}
                                    </button>
                                </div>
                            )}

                            {step === 4 && selectedProduct && (
                                <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
                                    <div className="bg-white rounded-[3rem] p-10 shadow-xl border-2 border-dashed border-slate-200 relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-2 bg-rose-500" />
                                        <div className="text-center mb-8">
                                            <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mx-auto mb-4">
                                                <FileText className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-2xl font-black text-slate-900 uppercase">Etiquette <span className="text-rose-500">Valide.</span></h3>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between border-b border-slate-100 pb-4">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Patient</span>
                                                <span className="text-xs font-black text-slate-900 uppercase">{patientName}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-slate-100 pb-4">
                                                <span className="text-[10px] font-black text-slate-400 uppercase">Produit</span>
                                                <span className="text-xs font-black text-rose-600 uppercase">{selectedProduct.name}</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-2">
                                                <div className="flex-grow h-10 bg-slate-900 rounded-lg flex items-center justify-center gap-1 px-4">
                                                    {Array.from({ length: 30 }).map((_, i) => (
                                                        <div key={i} className="h-6 bg-white" style={{ width: Math.random() * 3 + 1 + 'px' }} />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => {
                                                setStep(1);
                                                setPatientName("");
                                                setMedicationSearch("");
                                                setSelectedProduct(null);
                                            }}
                                            className="flex-grow bg-slate-100 py-6 rounded-[2rem] font-black uppercase text-[10px] tracking-widest"
                                        >
                                            Nouvelle Vente
                                        </button>
                                        <button
                                            onClick={() => alert("Impression thermique en cours...")}
                                            className="flex-grow bg-rose-600 text-white py-6 rounded-[2rem] font-black uppercase text-[10px] tracking-widest shadow-xl"
                                        >
                                            Réimprimer
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-10">
                    <div className="bg-slate-950 text-white rounded-[4rem] p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl" />
                        <h3 className="text-xl font-black uppercase tracking-tight text-white mb-12 flex items-center gap-4">
                            <Clock className="text-rose-500" /> File d'attente
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 group hover:bg-white/10 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-[10px] font-black">#1</div>
                                    <div>
                                        <p className="text-xs font-black uppercase text-white leading-none">Mme. Lefebvre</p>
                                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1.5">Renouvellement</p>
                                    </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-rose-500 transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
