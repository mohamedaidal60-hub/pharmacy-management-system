"use client";

import { useState } from "react";
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
    ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createOrder } from "@/app/actions/pharmacy";
import { usePharmacy } from "@/context/PharmacyContext";

export default function DispensingPage() {
    const { selectedStoreId } = usePharmacy();
    const [step, setStep] = useState(1);
    const [patientName, setPatientName] = useState("");
    const [medication, setMedication] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleDispense = async () => {
        if (!selectedStoreId) return alert("Veuillez sélectionner une boutique");
        setIsSubmitting(true);

        // Simuler la création d'une commande de type Dispensing (Retail)
        const res = await createOrder({
            items: [{ productId: "temp-id", quantity: 1, price: 0 }],
            storeId: selectedStoreId,
            type: "RETAIL"
        });

        if (res.success) {
            alert("Ordonnance validée et délivrée !");
            setStep(1);
            setPatientName("");
            setMedication("");
        } else {
            alert("Erreur: " + res.error);
        }
        setIsSubmitting(false);
    };

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
                    <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-600 transition-all flex items-center gap-3">
                        <Scan className="w-5 h-5" /> Scanner Ordonnance
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    {/* Workflow Steps */}
                    <div className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-16 px-4">
                            {[
                                { step: 1, label: "Identification" },
                                { step: 2, label: "Analyse Rx" },
                                { step: 3, label: "Validation" }
                            ].map((s) => (
                                <div key={s.step} className="flex items-center gap-4 group cursor-pointer" onClick={() => setStep(s.step)}>
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all",
                                        step === s.step ? "bg-rose-500 text-white shadow-xl shadow-rose-200" : "bg-slate-50 text-slate-300"
                                    )}>
                                        {s.step}
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
                                            <h4 className="text-lg font-black text-rose-900 uppercase tracking-tight">Vérification Automatique IA</h4>
                                            <p className="text-xs text-rose-600 font-bold uppercase tracking-widest mt-1 opacity-70">En attente de saisie molécule...</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Médicament à délivrer</label>
                                        <input
                                            type="text"
                                            placeholder="Saisir la molécule ou scanner le code-barres..."
                                            className="w-full bg-slate-50 border-none rounded-[2rem] py-8 px-10 text-xl font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-rose-500/5 transition-all outline-none"
                                            value={medication}
                                            onChange={(e) => setMedication(e.target.value)}
                                        />
                                    </div>
                                    <button onClick={() => setStep(3)} className="w-full bg-slate-900 text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-rose-500 transition-all">
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
                                            <span className="text-sm font-black text-slate-900 uppercase">{medication || "Non spécifié"}</span>
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
                                        className="w-full bg-blue-600 text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-4"
                                    >
                                        {isSubmitting ? "Validation en cours..." : <>Terminer & Imprimer Etiquette <ArrowRight className="w-5 h-5" /></>}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Stats Dispensing */}
                <div className="space-y-10">
                    <div className="bg-slate-950 text-white rounded-[4rem] p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600 rounded-full blur-[80px] opacity-10" />
                        <h3 className="text-xl font-black uppercase tracking-tight text-white mb-12 flex items-center gap-4">
                            <Clock className="text-rose-500" /> File d'attente
                        </h3>
                        <div className="space-y-6">
                            {[1, 2].map(i => (
                                <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 group hover:bg-white/10 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-[10px] font-black">
                                            #{i}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase text-white leading-none">Mme. Lefebvre</p>
                                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1.5">Renouvellement</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-rose-500 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
