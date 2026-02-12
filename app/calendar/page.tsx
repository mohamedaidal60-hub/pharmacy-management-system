"use client";

import { useState, useEffect } from "react";
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Plus,
    Filter,
    Clock,
    X,
    CheckCircle2,
    AlertCircle,
    Building2,
    MoreVertical
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getTasks, createTask } from "@/app/actions/pharmacy";
import { usePharmacy } from "@/context/PharmacyContext";

export default function CalendarPage() {
    const { selectedStoreId } = usePharmacy();
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        if (selectedStoreId) {
            refreshTasks();
        }
    }, [selectedStoreId]);

    const refreshTasks = async () => {
        if (!selectedStoreId) return;
        setLoading(true);
        const data = await getTasks(selectedStoreId);
        setTasks(data);
        setLoading(false);
    };

    const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedStoreId) return;
        const formData = new FormData(e.currentTarget);
        const res = await createTask({
            title: formData.get("title") as string,
            description: formData.get("desc") as string,
            dueDate: new Date(formData.get("date") as string),
            storeId: selectedStoreId
        });
        if (res.success) {
            alert("Événement ajouté !");
            setShowTaskModal(false);
            refreshTasks();
        } else {
            alert(res.error);
        }
    };

    // Calendar generation logic
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const calendarDays = Array.from({ length: 42 }, (_, i) => {
        const day = i - (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);
        return day > 0 && day <= daysInMonth ? day : null;
    });

    const monthName = currentDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20 px-4 sm:px-0">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-1 bg-indigo-500 rounded-full"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Ops Management</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Planning & <span className="text-indigo-600 italic">Events.</span></h1>
                </div>
                <div className="flex gap-4">
                    <button className="bg-white text-slate-500 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-slate-100 hover:bg-slate-50 transition-all flex items-center gap-3">
                        <Filter className="w-5 h-5" /> Filtres
                    </button>
                    <button
                        onClick={() => setShowTaskModal(true)}
                        className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-3"
                    >
                        <Plus className="w-5 h-5" /> Nouvel Événement
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                {/* Main Calendar Grid */}
                <div className="xl:col-span-2 bg-white rounded-[4rem] p-12 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-12 px-4">
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{monthName}</h2>
                        <div className="flex gap-4">
                            <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))} className="p-4 rounded-2xl hover:bg-slate-50 border border-slate-50 transition-all"><ChevronLeft className="w-6 h-6" /></button>
                            <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))} className="p-4 rounded-2xl hover:bg-slate-50 border border-slate-50 transition-all"><ChevronRight className="w-6 h-6" /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-4 mb-8">
                        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                            <div key={day} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest pb-4 border-b border-slate-50">{day}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-4 auto-rows-fr min-h-[500px]">
                        {calendarDays.map((day, i) => (
                            <div key={i} className={cn(
                                "min-h-[100px] rounded-[2rem] p-4 transition-all border border-transparent flex flex-col items-center gap-3",
                                day ? "bg-white hover:bg-slate-50/50 hover:border-slate-100 cursor-pointer" : "opacity-10 pointer-events-none"
                            )}>
                                {day && (
                                    <>
                                        <span className={cn("text-xs font-black", day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() ? "text-indigo-600" : "text-slate-400")}>{day}</span>
                                        {tasks.filter(t => new Date(t.dueDate).getDate() === day && new Date(t.dueDate).getMonth() === currentDate.getMonth()).map(t => (
                                            <div key={t.id} className="w-full h-2 bg-indigo-500 rounded-full shadow-lg shadow-indigo-200" title={t.title} />
                                        ))}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Task List / Sidebar */}
                <div className="space-y-12">
                    <div className="bg-slate-950 rounded-[4rem] p-12 text-white shadow-2xl relative overflow-hidden h-full flex flex-col">
                        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-12 flex items-center gap-4">
                            <Clock className="w-6 h-6 text-indigo-400" /> Vos Tâches
                        </h3>

                        <div className="space-y-8 flex-grow overflow-y-auto no-scrollbar max-h-[600px] pr-4">
                            {loading ? (
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Chargement...</p>
                            ) : tasks.length === 0 ? (
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Aucune tâche prévue</p>
                            ) : tasks.map((task) => (
                                <div key={task.id} className="bg-white/5 border border-white/5 p-8 rounded-3xl group hover:bg-white/10 transition-all relative">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full">{new Date(task.dueDate).toLocaleDateString()}</span>
                                        <button className="text-white/20 hover:text-white transition-colors"><MoreVertical className="w-4 h-4" /></button>
                                    </div>
                                    <h4 className="text-sm font-black uppercase tracking-tight">{task.title}</h4>
                                    <p className="text-[10px] font-bold text-slate-500 mt-2 line-clamp-2 italic">{task.description}</p>
                                </div>
                            ))}
                        </div>

                        <button onClick={() => setShowTaskModal(true)} className="w-full mt-12 bg-indigo-600 hover:bg-indigo-500 py-6 rounded-[2rem] font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-4 shadow-2xl shadow-indigo-950/40">
                            Ajouter <Plus className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Task Modal */}
            {showTaskModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-md animate-in fade-in">
                    <div className="bg-white rounded-[4rem] w-full max-w-2xl p-16 shadow-2xl relative">
                        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">Planifier un <span className="text-indigo-600 italic">Événement.</span></h2>
                        <p className="text-slate-500 font-medium mb-12 italic">Organisez les gardes, les livraisons ou les maintenances.</p>

                        <form onSubmit={handleCreateTask} className="space-y-12">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Titre de l'événement</label>
                                <input name="title" required className="w-full bg-slate-50 border-none rounded-2xl py-6 px-8 font-black uppercase text-xs outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all" placeholder="Ex: Livraison Hôpital Militaire" />
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Date</label>
                                    <input name="date" type="date" required className="w-full bg-slate-50 border-none rounded-2xl py-6 px-8 font-bold outline-none" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Priorité</label>
                                    <select className="w-full bg-slate-50 border-none rounded-2xl py-6 px-8 font-black uppercase text-[10px] outline-none">
                                        <option>Basse</option>
                                        <option>Moyenne</option>
                                        <option>Haute</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Notes confidentielles</label>
                                <textarea name="desc" className="w-full bg-slate-50 border-none rounded-2xl py-6 px-8 font-bold outline-none no-scrollbar h-32" placeholder="Détails supplémentaires..."></textarea>
                            </div>
                            <div className="flex gap-4">
                                <button type="button" onClick={() => setShowTaskModal(false)} className="flex-grow bg-slate-100 py-8 rounded-[2rem] font-black uppercase tracking-widest text-[10px]">Annuler</button>
                                <button type="submit" className="flex-grow bg-indigo-600 text-white py-8 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-indigo-200">Enregistrer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
