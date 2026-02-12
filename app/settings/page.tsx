"use client";

import {
    Settings,
    User,
    Store,
    Shield,
    Bell,
    Globe,
    CreditCard,
    Database,
    Lock,
    ChevronRight,
    Save,
    Trash2,
    ExternalLink,
    ShieldCheck,
    Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20 px-4 sm:px-0">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-1 bg-slate-900 rounded-full"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">System Configuration</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Centre de <span className="text-slate-500 italic">Contrôle.</span></h1>
                </div>
                <button className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-blue-200 hover:bg-slate-900 transition-all flex items-center gap-4">
                    <Save className="w-5 h-5" /> Enregistrer les modifications
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Navigation latérale des réglages */}
                <div className="space-y-4">
                    {[
                        { name: "Profil & Utilisateur", icon: User, active: true },
                        { name: "Établissement", icon: Store, active: false },
                        { name: "Sécurité & Accès", icon: Lock, active: false },
                        { name: "Boutique & Vente", icon: Zap, active: false },
                        { name: "Facturation & Plans", icon: CreditCard, active: false },
                        { name: "Notifications", icon: Bell, active: false },
                        { name: "Système & API", icon: Database, active: false }
                    ].map((item) => (
                        <button
                            key={item.name}
                            className={cn(
                                "w-full flex items-center justify-between p-6 rounded-3xl transition-all duration-300 group font-black uppercase tracking-widest text-[10px]",
                                item.active ? "bg-white shadow-xl shadow-slate-100 text-blue-600 border border-slate-100" : "text-slate-400 hover:bg-white hover:text-slate-900"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <item.icon className={cn("w-5 h-5", item.active ? "text-blue-600" : "text-slate-300 group-hover:text-blue-600")} />
                                {item.name}
                            </div>
                            <ChevronRight className={cn("w-4 h-4", item.active ? "opacity-100" : "opacity-0 group-hover:opacity-100")} />
                        </button>
                    ))}
                </div>

                {/* Panneau de contenu principal */}
                <div className="lg:col-span-3 space-y-12">
                    {/* Section Profil */}
                    <section className="bg-white rounded-[4rem] p-12 shadow-sm border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
                        <div className="flex items-center gap-10 mb-16 px-4">
                            <div className="relative group cursor-pointer">
                                <div className="w-32 h-32 rounded-[3.5rem] bg-slate-950 flex items-center justify-center text-white p-1 text-5xl font-black shadow-2xl overflow-hidden group-hover:scale-105 transition-all duration-500">
                                    <div className="w-full h-full rounded-[3rem] border-2 border-white/20 flex items-center justify-center">A</div>
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-4 rounded-2xl shadow-xl border-4 border-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Settings className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Anis Merah</h2>
                                <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.4em] mt-2">Administrateur Principal</p>
                                <div className="flex gap-3 mt-6">
                                    <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">Compte Vérifié</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Email Professionnel</label>
                                <input type="email" defaultValue="anis.merah@pharmaos.fr" className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 text-sm font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all outline-none" />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Numéro de Téléphone</label>
                                <input type="tel" defaultValue="+33 6 88 45 12 33" className="w-full bg-slate-50 border-none rounded-2xl py-5 px-8 text-sm font-bold text-slate-900 focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all outline-none" />
                            </div>
                        </div>
                    </section>

                    {/* Section Sécurité Critiques */}
                    <section className="bg-slate-950 rounded-[4rem] p-12 shadow-2xl relative overflow-hidden border border-white/5">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 -skew-x-12 translate-x-1/2" />
                        <div className="relative z-10">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-4 mb-12">
                                <ShieldCheck className="text-blue-500 w-7 h-7" /> Sécurité du Noyau
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-10 bg-white/5 rounded-[3rem] border border-white/10 group hover:bg-white/10 transition-all">
                                    <div className="flex items-center gap-8">
                                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                            <Lock className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-white uppercase tracking-tight leading-none">Double Authentification (2FA)</h4>
                                            <p className="text-xs text-slate-500 font-bold mt-2 uppercase tracking-widest italic flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Recommandé pour Admin
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Désactivé</span>
                                        <button className="w-16 h-8 bg-slate-800 rounded-full relative p-1 group-hover:bg-slate-700 transition-all">
                                            <div className="w-6 h-6 bg-slate-600 rounded-full" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-10 bg-white/5 rounded-[3rem] border border-white/10 group hover:border-blue-500/50 transition-all">
                                    <div className="flex items-center gap-8">
                                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-400">
                                            <Shield className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-white uppercase tracking-tight leading-none">Audit des Accès</h4>
                                            <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed italic">Consulter l'historique de chaque connexion et action critique.</p>
                                        </div>
                                    </div>
                                    <button className="bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-widest px-8 py-4 rounded-xl transition-all">Ouvrir le Log</button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Zone de Danger */}
                    <div className="px-10 flex items-center justify-between opacity-50 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-4 text-rose-500">
                            <Trash2 className="w-5 h-5" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Archiver ce compte utilisateur</span>
                        </div>
                        <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 hover:text-slate-900">Support Technique <ExternalLink className="w-3 h-3" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
