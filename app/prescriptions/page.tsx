"use client";

import { useState } from "react";
import {
    Search,
    Stethoscope,
    AlertCircle,
    ShieldAlert,
    CheckCircle2,
    BookOpen,
    Info,
    Mic,
    History,
    Activity,
    Zap,
    ChevronRight,
    Database,
    ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const drugDatabase = [
    { id: "1", name: "Ibuprofène", category: "AINS", interactions: ["Anticoagulants", "Aspirine"], risk: "Modéré", usage: "Analgésique, Anti-inflammatoire" },
    { id: "2", name: "Paracétamol", category: "Analgésique", interactions: ["Alcool (chronique)"], risk: "Faible", usage: "Douleur, Fièvre" },
    { id: "3", name: "Warfarine", category: "Anticoagulant", interactions: ["Aspirine", "Ibuprofène", "Légumes verts (K1)"], risk: "Élevé", usage: "Fluidification sanguine" },
];

export default function MedicalAdvice() {
    const [query, setQuery] = useState("");

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20 px-4 sm:px-0">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-1 bg-rose-500 rounded-full"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500">Clinical Decision Support</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Conseils <span className="text-rose-500 italic">Médicaux.</span></h1>
                    <p className="text-slate-500 mt-4 font-medium text-lg">Base de connaissances pharmaceutique et vérificateur d'interactions.</p>
                </div>
                <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-rose-500 transition-all flex items-center gap-3">
                    <Database className="w-5 h-5" /> Base Molécules
                </button>
            </header>

            {/* Main Analysis Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                    {/* AI Search Bar */}
                    <div className="bg-white p-10 rounded-[4rem] shadow-sm border border-slate-100">
                        <div className="relative group">
                            <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors w-6 h-6" />
                            <input
                                type="text"
                                placeholder="Scanner une ordonnance ou saisir une molécule..."
                                className="w-full bg-slate-50 border-none rounded-[2.5rem] py-10 pl-24 pr-16 text-2xl font-black text-slate-900 focus:bg-white focus:ring-4 focus:ring-rose-500/5 transition-all outline-none"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button className="absolute right-8 top-1/2 -translate-y-1/2 bg-white p-4 rounded-2xl text-slate-400 hover:text-rose-500 transition-all border border-slate-100 shadow-sm"><Mic /></button>
                        </div>
                        <div className="flex flex-wrap gap-4 mt-8 px-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 w-full mb-2">Recherches fréquentes :</p>
                            {["Amoxicilline", "Ciprofloxacine", "Vitamine D3", "Metformine"].map(tag => (
                                <button key={tag} className="px-5 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-rose-50 hover:text-rose-500 transition-all">{tag}</button>
                            ))}
                        </div>
                    </div>

                    {/* Results Area */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-4 px-4">
                            <Zap className="text-rose-500 w-6 h-6" /> Résultats d'Analyse
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {drugDatabase.map(drug => (
                                <div key={drug.id} className="bg-white p-10 rounded-[3.5rem] border border-slate-100 group hover:shadow-2xl transition-all duration-500">
                                    <div className="flex justify-between items-start mb-10">
                                        <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all duration-500">
                                            <BookOpen className="w-7 h-7" />
                                        </div>
                                        <span className={cn(
                                            "text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest border",
                                            drug.risk === "Élevé" ? "bg-rose-50 text-rose-500 border-rose-100" : "bg-emerald-50 text-emerald-500 border-emerald-100"
                                        )}>
                                            Risque {drug.risk}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none">{drug.name}</h3>
                                    <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-2">{drug.category}</p>

                                    <div className="mt-8 space-y-4">
                                        <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                                            <Info className="w-4 h-4 text-slate-400" />
                                            <p className="text-xs font-bold text-slate-600 leading-normal">{drug.usage}</p>
                                        </div>
                                        {drug.risk === "Élevé" && (
                                            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-4">
                                                <ShieldAlert className="w-5 h-5 text-rose-500" />
                                                <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest leading-normal">Interactions critiques identifiées</p>
                                            </div>
                                        )}
                                    </div>

                                    <button className="w-full mt-10 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                                        Consulter Dossier Complet <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Global Safety Sidebar */}
                <div className="space-y-10">
                    <div className="bg-slate-950 text-white rounded-[4rem] p-12 shadow-2xl relative overflow-hidden h-fit">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-rose-600 rounded-full blur-[100px] opacity-10" />
                        <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-4 text-rose-500 mb-12">
                            <ShieldAlert className="w-7 h-7" /> Alerte FDA / ANSM
                        </h3>
                        <div className="space-y-8">
                            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-3 h-3 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
                                    <p className="text-[11px] font-black uppercase tracking-widest">Rappel de Lot Urgent</p>
                                </div>
                                <h4 className="text-xl font-black text-white uppercase tracking-tight font-sans leading-none">Metformine - Lot X82</h4>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed italic">Contamination potentielle identifiée. Ne pas délivrer et isoler le stock immédiatement.</p>
                                <button className="w-full bg-rose-600 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest">Voir Détails Rappel</button>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] opacity-50 hover:opacity-100 transition-all">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Mise à jour Protocoles</p>
                                <p className="text-sm font-bold text-white uppercase tracking-tight">Nouvelles directives Diabète Type II</p>
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-[9px] font-black uppercase text-indigo-400">PDF Disponible</span>
                                    <History className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-sm group">
                        <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-8 flex items-center gap-4">
                            <Stethoscope className="text-rose-500" /> Télémédecine
                        </h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">Contacter un pharmacien conseil ou un pharmacologue en cas de doute persistant sur un dosage.</p>
                        <button className="mt-8 flex items-center gap-2 text-[10px] font-black text-rose-500 uppercase tracking-widest group-hover:gap-4 transition-all">
                            Lancer un appel expert <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
