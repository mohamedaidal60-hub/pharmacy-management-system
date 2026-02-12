"use client";

import { useState } from "react";
import {
    Settings,
    User,
    Shield,
    Store,
    Globe,
    Bell,
    ChevronRight,
    CreditCard,
    Zap,
    Save,
    Lock,
    Database,
    Printer
} from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
    { id: "general", name: "Général", icon: Settings },
    { id: "users", name: "Utilisateurs & Droits", icon: Shield },
    { id: "stores", name: "Gestion des Magasins", icon: Store },
    { id: "pricing", name: "Tarification & Marges", icon: Zap },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "billing", name: "Facturation", icon: CreditCard },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");

    return (
        <div className="space-y-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Paramètres <span className="text-blue-600 italic">Système.</span></h1>
                    <p className="text-slate-500 mt-2 font-medium tracking-wide">Configuration globale de l'application, sécurité et personnalisation.</p>
                </div>
                <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-4 shadow-xl hover:bg-slate-900 transition-all">
                    <Save className="w-5 h-5" /> Enregistrer les changements
                </button>
            </header>

            <div className="flex gap-12">
                {/* Navigation Sidebar */}
                <div className="w-80 space-y-2">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveTab(section.id)}
                            className={cn(
                                "w-full flex items-center justify-between p-6 rounded-[2rem] transition-all group",
                                activeTab === section.id ? "bg-white shadow-sm border border-slate-100" : "hover:bg-slate-100"
                            )}
                        >
                            <div className="flex items-center gap-5">
                                <div className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                                    activeTab === section.id ? "bg-blue-600 text-white shadow-lg shadow-blue-100" : "bg-slate-50 text-slate-400 group-hover:text-blue-600"
                                )}>
                                    <section.icon className="w-6 h-6" />
                                </div>
                                <span className={cn(
                                    "text-xs font-black uppercase tracking-widest",
                                    activeTab === section.id ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"
                                )}>{section.name}</span>
                            </div>
                            <ChevronRight className={cn(
                                "w-4 h-4 transition-all",
                                activeTab === section.id ? "text-blue-600 translate-x-1" : "text-slate-300"
                            )} />
                        </button>
                    ))}
                </div>

                {/* Form Content */}
                <div className="flex-grow space-y-10">
                    <div className="bg-white rounded-[3.5rem] p-12 shadow-sm border border-slate-100">
                        {activeTab === "general" && (
                            <div className="space-y-10">
                                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Informations de l'Organisation</h2>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nom de la Pharmacie</label>
                                        <input
                                            type="text"
                                            defaultValue="Dukanileo Pharma Group"
                                            className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-semibold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Numéro d'agrément</label>
                                        <input
                                            type="text"
                                            defaultValue="PH-992-KLA-110"
                                            className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-semibold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Langue par défaut</label>
                                        <select className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-semibold focus:ring-2 focus:ring-blue-600 transition-all outline-none appearance-none">
                                            <option>Français (France)</option>
                                            <option>English (UK)</option>
                                            <option>Swahili</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Devise de transaction</label>
                                        <select className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-semibold focus:ring-2 focus:ring-blue-600 transition-all outline-none appearance-none">
                                            <option>Euros (€)</option>
                                            <option>Dollars US ($)</option>
                                            <option>Francs CFA (XOF)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-10 border-t border-slate-50">
                                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-8">Base de Données & Sauvegarde</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-slate-100 transition-all">
                                            <div className="flex items-center gap-6">
                                                <div className="bg-white p-4 rounded-2xl shadow-sm text-blue-600"><Database className="w-6 h-6" /></div>
                                                <div>
                                                    <p className="font-black text-slate-900 uppercase text-xs tracking-wider">Sauvegarde Manuelle</p>
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Dernière: Aujourd'hui, 04:22</p>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                        </div>
                                        <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-slate-100 transition-all">
                                            <div className="flex items-center gap-6">
                                                <div className="bg-white p-4 rounded-2xl shadow-sm text-blue-600"><Printer className="w-6 h-6" /></div>
                                                <div>
                                                    <p className="font-black text-slate-900 uppercase text-xs tracking-wider">Configuration Imprimantes</p>
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">3 Imprimantes connectées</p>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab !== "general" && (
                            <div className="text-center py-20">
                                <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100">
                                    <Lock className="w-10 h-10 text-slate-200" />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Section en cours d'optimisation</h2>
                                <p className="text-slate-400 mt-4 font-bold uppercase text-[10px] tracking-widest leading-relaxed max-w-sm mx-auto">
                                    Cette interface de configuration est gérée de manière dynamique. <br />Veuillez contacter le support pour des modifications avancées.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Security Alert Block */}
                    <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center gap-8">
                                <div className="bg-white/10 p-5 rounded-3xl border border-white/10 backdrop-blur">
                                    <Shield className="w-8 h-8 text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black uppercase tracking-tight">Connexion via <span className="text-blue-400 italic">AuthOS.</span></h4>
                                    <p className="text-slate-400 mt-2 font-medium">Authentification sécurisée par rôles active pour tous les terminaux.</p>
                                </div>
                            </div>
                            <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-400 transition-all shadow-xl">Auditer les accès</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
