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
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockCustomers = [
    { id: "1", name: "Alice Durand", email: "alice.d@email.com", phone: "+33 6 12 34 56 78", loyalty: 1250, type: "Retail", insurance: "Mutuelle Bleue" },
    { id: "2", name: "Marc Lefebvre", email: "m.lefebvre@pro.com", phone: "+33 7 88 45 12 33", loyalty: 450, type: "Retail", insurance: "AÉSÉO" },
    { id: "3", name: "Pharmacie du Centre", email: "contact@pharmacentre.fr", phone: "+33 1 45 66 77 88", loyalty: 15200, type: "Wholesale", insurance: "N/A" },
    { id: "4", name: "Sophie Martin", email: "sophie.m@email.com", phone: "+33 6 55 44 33 22", loyalty: 890, type: "Retail", insurance: "Allianz" },
];

export default function CustomerManagement() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Base <span className="text-blue-600 italic">Clients.</span></h1>
                    <p className="text-slate-500 mt-2 font-medium tracking-wide">Profils, historique d'achat, assurances et programmes de fidélité.</p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl hover:bg-slate-800 transition-all">
                        <Plus className="w-4 h-4" /> Nouveau Client
                    </button>
                </div>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-blue-600 text-white p-10 rounded-[3rem] shadow-xl shadow-blue-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-100">Total Clients</p>
                    <h3 className="text-5xl font-black mt-4">1,420</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-200 mt-6 flex items-center gap-2">
                        <Users className="w-3 h-3" /> +12 ce mois-ci
                    </p>
                </div>

                <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-xl shadow-slate-200">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Programme Fidélité</p>
                    <div className="flex items-center gap-6 mt-4">
                        <h3 className="text-5xl font-black">45.2k</h3>
                        <span className="bg-blue-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Points Totaux</span>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-6 italic">Moyenne de 31 points/visite</p>
                </div>

                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Assurances & Tiers Payant</p>
                    <h3 className="text-5xl font-black text-slate-900 mt-4">92%</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mt-6 flex items-center gap-2 font-black">
                        <ShieldCheck className="w-3 h-3" /> Connecté avec 45 caisses
                    </p>
                </div>
            </div>

            {/* Customer List */}
            <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-50">
                    <div className="relative max-w-xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Rechercher par nom, téléphone ou email..."
                            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="divide-y divide-slate-50">
                    {mockCustomers.map((customer) => (
                        <div key={customer.id} className="p-8 flex items-center justify-between group hover:bg-slate-50/50 transition-all duration-300">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm font-black text-xl">
                                    {customer.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{customer.name}</h3>
                                        <span className={cn(
                                            "text-[9px] font-black uppercase px-3 py-1 rounded-full",
                                            customer.type === "Wholesale" ? "bg-indigo-50 text-indigo-600" : "bg-blue-50 text-blue-600"
                                        )}>
                                            {customer.type}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-6 mt-2">
                                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                                            <Mail className="w-3 h-3" /> {customer.email}
                                        </p>
                                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                                            <Phone className="w-3 h-3" /> {customer.phone}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-12">
                                <div className="text-center hidden lg:block">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Fidélité</p>
                                    <div className="flex items-center gap-1 font-black text-amber-500">
                                        <Star className="w-4 h-4 fill-amber-500" />
                                        <span>{customer.loyalty} pts</span>
                                    </div>
                                </div>

                                <div className="text-center hidden md:block">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Assurance</p>
                                    <p className="text-xs font-black text-slate-900 uppercase tracking-tighter">{customer.insurance}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all border border-slate-100">
                                        <History className="w-5 h-5" />
                                    </button>
                                    <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all border border-slate-100">
                                        <FileText className="w-5 h-5" />
                                    </button>
                                    <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all border border-slate-100">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-8 bg-slate-50 text-center">
                    <button className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-600 hover:text-blue-700 transition-all">Charger plus de clients...</button>
                </div>
            </div>
        </div>
    );
}
