"use client";

import { useState } from "react";
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Plus,
    Clock,
    User,
    Tag,
    MoreHorizontal,
    LayoutGrid,
    List,
    CheckCircle2,
    CalendarCheck2
} from "lucide-react";
import { cn } from "@/lib/utils";

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const mockEvents = [
    { id: 1, title: "Inventaire Lot A", time: "09:00", type: "Stock", color: "bg-blue-500" },
    { id: 2, title: "Livraison Grossiste", time: "11:30", type: "Logistique", color: "bg-purple-500" },
    { id: 3, title: "Réunion Staff", time: "14:00", type: "Admin", color: "bg-slate-900" },
    { id: 4, title: "Audit Hygiène", time: "16:15", type: "Audit", color: "bg-emerald-500" },
];

export default function CalendarPage() {
    const [currentMonth, setCurrentMonth] = useState(1); // Février
    const [view, setView] = useState("grid");

    return (
        <div className="space-y-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Calendrier & <span className="text-blue-600 italic">Planning.</span></h1>
                    <p className="text-slate-500 mt-2 font-medium tracking-wide">Gestion des rendez-vous, tâches et livraisons.</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                        <button onClick={() => setView("grid")} className={cn("p-2 rounded-xl transition-all", view === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400")}><LayoutGrid className="w-5 h-5" /></button>
                        <button onClick={() => setView("list")} className={cn("p-2 rounded-xl transition-all", view === "list" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400")}><List className="w-5 h-5" /></button>
                    </div>
                    <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl hover:bg-blue-700 transition-all">
                        <Plus className="w-4 h-4" /> Nouvel Événement
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
                {/* Main Calendar Grid */}
                <div className="xl:col-span-3 space-y-8">
                    <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{months[currentMonth]} 2024</h2>
                            <div className="flex gap-2">
                                <button className="p-3 hover:bg-slate-50 rounded-2xl transition-all border border-slate-50"><ChevronLeft /></button>
                                <button className="p-3 hover:bg-slate-50 rounded-2xl transition-all border border-slate-50"><ChevronRight /></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-4 mb-4">
                            {days.map(day => (
                                <div key={day} className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400 py-4">{day}</div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-4">
                            {[...Array(28)].map((_, i) => {
                                const day = i + 1;
                                const isToday = day === 12;
                                return (
                                    <div key={i} className={cn(
                                        "aspect-square rounded-[2rem] p-4 border transition-all cursor-pointer relative group",
                                        isToday ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200" : "bg-white border-slate-50 hover:bg-slate-50 hover:border-slate-100"
                                    )}>
                                        <span className={cn("text-lg font-black", isToday ? "" : "text-slate-900")}>{day}</span>

                                        {/* Event Dot Indicators */}
                                        <div className="absolute bottom-4 left-4 flex gap-1">
                                            {day % 5 === 0 && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.5)]" />}
                                            {day % 7 === 0 && <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
                                        </div>

                                        {isToday && (
                                            <div className="absolute top-4 right-4 animate-pulse">
                                                <CalendarCheck2 className="w-4 h-4 opacity-50" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Upcoming Events List */}
                <div className="space-y-8">
                    <div className="bg-slate-900 text-white rounded-[3rem] p-10 shadow-xl shadow-slate-200 h-full">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-xl font-black uppercase tracking-tight text-blue-400">À Venir</h3>
                            <CalendarIcon className="w-6 h-6 opacity-30" />
                        </div>

                        <div className="space-y-8 overflow-y-auto max-h-[600px] scrollbar-hide no-scrollbar pr-2">
                            {mockEvents.map(event => (
                                <div key={event.id} className="relative pl-8 group cursor-pointer hover:translate-x-2 transition-transform">
                                    <div className={cn("absolute left-0 top-0 bottom-0 w-1 rounded-full", event.color)} />
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{event.time} • {event.type}</p>
                                    <h4 className="text-lg font-black leading-tight tracking-tight uppercase group-hover:text-blue-400 transition-colors">{event.title}</h4>
                                    <div className="flex items-center gap-4 mt-4 opacity-40 text-[9px] font-black uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> Dr. Martin</span>
                                        <span className="flex items-center gap-1.5 border-l border-white/20 pl-4"><Clock className="w-3 h-3" /> 45 min</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-10 border-t border-white/10">
                            <div className="bg-blue-600 rounded-3xl p-6 flex flex-col gap-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-blue-100">Prochain Audit</p>
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xl font-black leading-none">Jeudi 15 Fév</h4>
                                    <CheckCircle2 className="w-6 h-6 text-blue-200" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
