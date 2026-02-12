"use client";

import { useState } from "react";
import {
    Stethoscope,
    Search,
    Info,
    AlertCircle,
    Calculator,
    MessageSquare,
    BookOpen,
    ShieldAlert,
    ArrowRight,
    Heart,
    Droplets,
    Zap,
    CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

const medicationDb = [
    {
        name: "Amoxicilline",
        class: "Antibiotique",
        indications: "Infections bactériennes des oreilles, du nez, de la gorge, des voies urinaires et de la peau.",
        dosage: "Généralement 250mg à 500mg toutes les 8 heures.",
        sideEffects: "Nausées, vomissements, diarrhée, éruptions cutanées.",
        safety: "Alerte Allergie Penicilline"
    },
    {
        name: "Lisinopril",
        class: "Inhibiteur de l'ECA",
        indications: "Hypertension artérielle, insuffisance cardiaque, après une crise cardiaque.",
        dosage: "5mg à 40mg une fois par jour.",
        sideEffects: "Toux sèche, étourdissements, maux de tête.",
        safety: "Surveillance Fonction Rénale"
    },
    {
        name: "Metformine",
        class: "Antidiabétique",
        indications: "Diabète de type 2.",
        dosage: "500mg à 2550mg par jour en doses divisées.",
        sideEffects: "Troubles gastro-intestinaux, goût métallique.",
        safety: "Risque d'Acidose Lactique"
    }
];

export default function MedicalAdvice() {
    const [activeTab, setActiveTab] = useState("database");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredMeds = medicationDb.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="space-y-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Conseils <span className="text-blue-600 italic">Médicaux.</span></h1>
                    <p className="text-slate-500 mt-2 font-medium tracking-wide">Base de connaissances, vérificateur d'interactions et assistance patient.</p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl hover:bg-slate-800 transition-all">
                        <Calculator className="w-4 h-4" /> Calculateur de Dosage
                    </button>
                </div>
            </header>

            {/* Tabs */}
            <div className="flex bg-slate-100 p-2 rounded-3xl w-fit">
                {[
                    { id: "database", name: "Base de Données", icon: BookOpen },
                    { id: "interactions", name: "Interactions", icon: ShieldAlert },
                    { id: "education", name: "Éducation Patient", icon: Info },
                    { id: "ask", name: "Demander au Pharmacien", icon: MessageSquare },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                            activeTab === tab.id ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.name}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column: Search & List */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Rechercher une molécule ou un nom de marque..."
                                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        {filteredMeds.map((med) => (
                            <div key={med.name} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 group hover:border-blue-200 transition-all duration-500">
                                <div className="flex items-start justify-between mb-8">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">{med.class}</span>
                                        <h3 className="text-2xl font-black text-slate-900 mt-4 uppercase tracking-tight">{med.name}</h3>
                                    </div>
                                    <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex flex-col items-center">
                                        <ShieldAlert className="w-6 h-6" />
                                        <span className="text-[8px] font-black uppercase mt-1">Sécurité</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <h4 className="text-[10px] font-black uppercase text-slate-900 tracking-widest flex items-center gap-2">
                                            <Droplets className="w-3 h-3 text-blue-500" /> Indications
                                        </h4>
                                        <p className="text-sm font-medium text-slate-500 leading-relaxed">{med.indications}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-[10px] font-black uppercase text-slate-900 tracking-widest flex items-center gap-2">
                                            <Zap className="w-3 h-3 text-blue-500" /> Dosage standard
                                        </h4>
                                        <p className="text-sm font-medium text-slate-500 leading-relaxed">{med.dosage}</p>
                                    </div>
                                </div>

                                <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <AlertCircle className="text-amber-500 w-5 h-5" />
                                        <p className="text-xs font-bold text-slate-600 italic">Attention: {med.safety}</p>
                                    </div>
                                    <button className="text-[10px] font-black bg-slate-900 text-white px-6 py-3 rounded-xl uppercase tracking-widest flex items-center gap-2 hover:bg-blue-600 transition-all">
                                        Fiche Complète <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Interaction Checker & Safety Alerts */}
                <div className="space-y-8">
                    <div className="bg-slate-900 text-white rounded-[3rem] p-10 shadow-xl shadow-slate-200">
                        <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-3 mb-10 text-blue-400">
                            <ShieldAlert /> Interaction Checker
                        </h2>
                        <div className="space-y-6">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-relaxed">Ajoutez des médicaments pour vérifier les interactions potentielles.</p>
                            <div className="space-y-4">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                                    <span className="text-sm font-bold">Amoxicilline</span>
                                    <X className="w-4 h-4 text-slate-500 cursor-pointer" />
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                                    <span className="text-sm font-bold">Lisinopril</span>
                                    <X className="w-4 h-4 text-slate-500 cursor-pointer" />
                                </div>
                            </div>
                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-[2rem] flex items-center gap-4">
                                <CheckCircle2 className="text-emerald-400 w-8 h-8 flex-shrink-0" />
                                <p className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Aucune interaction majeure détectée entre ces médicaments.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
                        <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-3 mb-8 text-red-600">
                            <AlertCircle /> Alertes FDA
                        </h2>
                        <div className="space-y-8">
                            <div className="group cursor-pointer">
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">12 Février 2024</p>
                                <p className="text-sm font-black text-slate-900 mt-2 group-hover:text-blue-600 transition-colors uppercase leading-tight tracking-tighter">Rappel de lot: Ranitidine 150mg (Lots 2023-XX)</p>
                            </div>
                            <div className="group cursor-pointer">
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">08 Février 2024</p>
                                <p className="text-sm font-black text-slate-900 mt-2 group-hover:text-blue-600 transition-colors uppercase leading-tight tracking-tighter">Nouvel avertissement: Risques hépatiques pour certains traitements de l'acné.</p>
                            </div>
                        </div>
                        <button className="w-full mt-10 bg-slate-50 hover:bg-slate-100 text-slate-600 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                            Toutes les Alertes de Sécurité
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function X({ className, ...props }: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(className)}
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}
