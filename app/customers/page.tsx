"use client";

import { useState } from "react";
import {
    Users,
    Search,
    Plus,
    CreditCard,
    History,
    Star,
    MoreVertical,
    Mail,
    Phone,
    ShieldCheck,
    FileText,
    ChevronRight,
    TrendingUp,
    UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockCustomers = [
    { id: "1", name: "Alice Durand", email: "alice.d@email.com", phone: "+33 6 12 34 56 78", loyalty: 1250, type: "Retail", insurance: "Mutuelle Bleue", avatarIdx: 1 },
    { id: "2", name: "Marc Lefebvre", email: "m.lefebvre@pro.com", phone: "+33 7 88 45 12 33", loyalty: 450, type: "Retail", insurance: "AÉSÉO", avatarIdx: 2 },
    { id: "3", name: "Pharmacie du Centre", email: "contact@pharmacentre.fr", phone: "+33 1 45 66 77 88", loyalty: 15200, type: "Wholesale", insurance: "N/A", avatarIdx: 3 },
    { id: "4", name: "Sophie Martin", email: "sophie.m@email.com", phone: "+33 6 55 44 33 22", loyalty: 890, type: "Retail", insurance: "Allianz", avatarIdx: 4 },
];

export default function CustomerManagement() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20 px-4 sm:px-0">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Patient Relations Manager</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Base <span className="text-blue-600 italic">Patients.</span></h1>
                </div>
                <div className="flex gap-4">
                    <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-600 transition-all flex items-center gap-3">
                        <Plus className="w-5 h-5" /> Nouveau Profil
                    </button>
                </div>
            </header>

            {/* Summary Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-blue-600 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[60px] opacity-20 -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-100">Total Patients</p>
                    <h3 className="text-5xl font-black mt-4 leading-none tracking-tighter">1,420</h3>
                    <div className="mt-8 flex items-center gap-3 bg-white/10 w-fit px-4 py-2 rounded-full border border-white/10 backdrop-blur-sm">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest">+12 ce mois-ci</span>
                    </div>
                </div>

                <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Loyalty Program</p>
                    <div className="mt-4 flex items-baseline gap-4">
                        <h3 className="text-5xl font-black text-indigo-400 font-sans tracking-tighter">45.2k</h3>
                        <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 leading-none pb-1">Points attribués</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full mt-10 overflow-hidden">
                        <div className="h-full bg-indigo-500 w-[78%] rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Claims Connection</p>
                    <h3 className="text-5xl font-black text-slate-900 mt-4 leading-none tracking-tighter">92%</h3>
                    <p className="text-[10px] font-bold text-emerald-500 mt-8 uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> 45 caisses d'assurance connectées
                    </p>
                </div>
            </div>

            {/* Modern Search & List Container */}
            <div className="bg-white rounded-[4rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-10 border-b border-slate-50 bg-slate-50/10">
                    <div className="relative max-w-2xl group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Filtrer par nom, téléphone ou email..."
                            className="w-full bg-white border border-slate-200 rounded-[2rem] py-5 pl-14 pr-6 text-sm font-semibold focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 shadow-sm transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="divide-y divide-slate-50">
                    {mockCustomers.map((customer) => (
                        <div key={customer.id} className="p-10 flex flex-col lg:flex-row lg:items-center justify-between group hover:bg-slate-50/50 transition-all duration-300 gap-8">
                            <div className="flex items-center gap-8">
                                <div className="w-20 h-20 bg-white border border-slate-100 rounded-3xl flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-105 transition-transform duration-500 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 items-center justify-center flex opacity-0 group-hover:opacity-100 transition-opacity">
                                        <UserCheck className="w-8 h-8" />
                                    </div>
                                    <span className="font-black text-2xl uppercase font-sans group-hover:opacity-0 transition-opacity">{customer.name.charAt(0)}{customer.id}</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-4">
                                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none">{customer.name}</h3>
                                        <span className={cn(
                                            "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border",
                                            customer.type === "Wholesale" ? "bg-indigo-50 text-indigo-600 border-indigo-100" : "bg-blue-50 text-blue-600 border-blue-100"
                                        )}>
                                            {customer.type}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-6 mt-4">
                                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 leading-none">
                                            <Mail className="w-3.5 h-3.5" /> {customer.email}
                                        </p>
                                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 leading-none">
                                            <Phone className="w-3.5 h-3.5" /> {customer.phone}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-12 lg:gap-16">
                                <div className="text-left">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Fidélisation</p>
                                    <div className="flex items-center gap-2 font-black text-amber-500 text-lg">
                                        <Star className="w-5 h-5 fill-amber-500" />
                                        <span className="font-sans">{customer.loyalty} PTS</span>
                                    </div>
                                </div>

                                <div className="text-left">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Assurance / Tiers</p>
                                    <div className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl">
                                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{customer.insurance}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button className="p-4 bg-white text-slate-400 rounded-2xl hover:bg-blue-600 hover:text-white transition-all border border-slate-100 shadow-sm"><History className="w-5 h-5" /></button>
                                    <button className="p-4 bg-white text-slate-400 rounded-2xl hover:bg-blue-600 hover:text-white transition-all border border-slate-100 shadow-sm"><FileText className="w-5 h-5" /></button>
                                    <button className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-blue-600 transition-all shadow-lg shadow-slate-200"><ChevronRight className="w-5 h-5" /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-12 bg-slate-50/50 text-center border-t border-slate-50">
                    <button className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 hover:text-blue-800 transition-all">Consulter l'archive complète des patients</button>
                </div>
            </div>
        </div>
    );
}
