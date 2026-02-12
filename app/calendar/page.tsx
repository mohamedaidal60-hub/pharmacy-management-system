"use client";

import { useState } from "react";
import {
    Plus,
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    Clock,
    Filter,
    MoreHorizontal,
    Bell,
    CheckCircle2,
    AlertTriangle,
    ArrowRight,
    List
} from "lucide-react";
import { cn } from "@/lib/utils";

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const tasks = [
    { id: "1", time: "09:00", title: "Réception Grossiste CERP", type: "logistic", priority: "high" },
    { id: "2", time: "11:30", title: "Entretien Patient - Suivi Diabète", type: "medical", priority: "medium" },
    { id: "3", time: "14:00", title: "Inventaire Lot Antidouleurs", type: "logistic", priority: "low" },
    { id: "4", time: "16:45", title: "Livraison Domicile - Mme Leroy", type: "delivery", priority: "high" },
];

export default function CalendarPage() {
    const [view, setView] = useState<"grid" | "list">("grid");

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20 px-4 sm:px-0">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-1 bg-indigo-600 rounded-full"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Unified Scheduler</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Planning & <span className="text-indigo-600 italic">Tâches.</span></h1>
                </div>
                <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-slate-100 items-center gap-2">
                    <button
                        onClick={() => setView("grid")}
                        className={cn("p-4 rounded-xl transition-all", view === "grid" ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:bg-slate-50")}
                    >
                        <CalendarIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setView("list")}
                        className={cn("p-4 rounded-xl transition-all", view === "list" ? "bg-slate-900 text-white shadow-xl" : "text-slate-400 hover:bg-slate-50")}
                    >
                        <List className="w-5 h-5" />
                    </button>
                    <div className="w-px h-8 bg-slate-100 mx-2" />
                    <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-3">
                        <Plus className="w-4 h-4" /> Nouvel Événement
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
                {/* Main Calendar View */}
                <div className="xl:col-span-3 space-y-8">
                    <div className="bg-white rounded-[4rem] p-10 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-16">
                            <div className="flex items-center gap-8">
                                <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">Février 2024</h2>
                                <div className="flex gap-2">
                                    <button className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all border border-slate-100 text-slate-600"><ChevronLeft className="w-5 h-5" /></button>
                                    <button className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all border border-slate-100 text-slate-600"><ChevronRight className="w-5 h-5" /></button>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button className="px-6 py-3 bg-slate-50 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 border border-slate-50">Aujourd'hui</button>
                                <button className="p-3 bg-slate-50 rounded-xl text-slate-400 border border-slate-50"><Filter className="w-5 h-5" /></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-px bg-slate-100 rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/20">
                            {days.map(day => (
                                <div key={day} className="bg-slate-50 py-6 text-center text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    {day}
                                </div>
                            ))}
                            {Array.from({ length: 35 }).map((_, i) => {
                                const dayNum = i - 3; // Mocking start
                                const isToday = dayNum === 12;
                                const isCurrentMonth = dayNum > 0 && dayNum <= 29;
                                return (
                                    <div key={i} className={cn(
                                        "bg-white min-h-[140px] p-6 transition-all duration-300 hover:bg-slate-50 group border-slate-50",
                                        !isCurrentMonth && "opacity-20 pointer-events-none"
                                    )}>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={cn(
                                                "text-xl font-black font-sans leading-none",
                                                isToday ? "text-indigo-600" : "text-slate-900"
                                            )}>{dayNum > 0 && dayNum <= 29 ? dayNum : ""}</span>
                                            {isToday && <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(79,70,229,0.5)]" />}
                                        </div>
                                        {/* Mock events icons */}
                                        <div className="flex flex-wrap gap-1.5 mt-auto">
                                            {dayNum === 12 && (
                                                <>
                                                    <div className="w-full h-1.5 bg-rose-500 rounded-full opacity-60" />
                                                    <div className="w-2/3 h-1.5 bg-blue-500 rounded-full opacity-60" />
                                                </>
                                            )}
                                            {dayNum === 15 && <div className="w-1/2 h-1.5 bg-indigo-500 rounded-full opacity-60" />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Task List Sidebar */}
                <div className="space-y-10">
                    <div className="bg-slate-950 text-white rounded-[4rem] p-10 shadow-2xl relative overflow-hidden h-full flex flex-col">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600 rounded-full blur-[80px] opacity-10" />
                        <h3 className="text-2xl font-black uppercase tracking-tight flex items-center gap-4 text-indigo-400 mb-12">
                            <Bell className="w-7 h-7" /> Timeline
                        </h3>

                        <div className="flex-grow space-y-10">
                            {tasks.map(task => (
                                <div key={task.id} className="relative pl-10 group cursor-pointer">
                                    <div className={cn(
                                        "absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-slate-900 z-10",
                                        task.priority === "high" ? "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.4)]" :
                                            task.priority === "medium" ? "bg-amber-500" : "bg-emerald-500"
                                    )} />
                                    <div className="absolute left-1 top-4 w-px h-[calc(100%+40px)] bg-slate-800 last:hidden" />

                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 flex items-center justify-between">
                                        {task.time} <span className="opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal className="w-4 h-4" /></span>
                                    </p>
                                    <h4 className="font-bold text-sm tracking-tight leading-snug group-hover:text-indigo-400 transition-colors">{task.title}</h4>
                                    <div className="mt-3 flex gap-2">
                                        <span className="text-[8px] font-black uppercase bg-slate-900 border border-slate-800 px-2 py-1 rounded-md text-slate-500">{task.type}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-16 bg-white/5 hover:bg-indigo-600/20 py-5 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[9px] transition-all border border-white/10 flex items-center justify-center gap-4">
                            Expand View <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-slate-100 group">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
                                <CheckCircle2 className="text-emerald-500 w-5 h-5" /> Terminé
                            </h3>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">24/28</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-50 rounded-full mt-4 overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[85%] rounded-full shadow-lg shadow-emerald-500/20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
