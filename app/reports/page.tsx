"use client";

import {
    BarChart3,
    TrendingUp,
    Download,
    Filter,
    Activity,
    ChevronRight,
    FileText,
    PieChart as PieIcon,
    Printer,
    Share2
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const data = [
    { name: "Lun", retail: 4000, wholesale: 2400 },
    { name: "Mar", retail: 3000, wholesale: 1398 },
    { name: "Mer", retail: 2000, wholesale: 9800 },
    { name: "Jeu", retail: 2780, wholesale: 3908 },
    { name: "Ven", retail: 1890, wholesale: 4800 },
    { name: "Sam", retail: 2390, wholesale: 3800 },
    { name: "Dim", retail: 3490, wholesale: 4300 },
];

export default function ReportsPage() {
    const handleExport = () => {
        alert("Génération du rapport d'activité consolidé (Multi-Store) en cours...");
        // Simulation d'un téléchargement
        setTimeout(() => {
            alert("Rapport exporté avec succès au format Excel.");
        }, 2000);
    };

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Business Intelligence</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Analyses & <span className="text-blue-600 italic">Rapports.</span></h1>
                </div>
                <div className="flex gap-4">
                    <button onClick={handleExport} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-700 transition-all flex items-center gap-3">
                        <Download className="w-4 h-4" /> Exportation Excel / CSV
                    </button>
                </div>
            </header>

            {/* Analytics Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 bg-white rounded-[4rem] p-12 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-16 px-4">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none">Volume d'Affaires Hebdo</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 italic px-1">Analyse Retail vs Wholesale</p>
                        </div>
                        <div className="flex gap-8">
                            <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]" /><span className="text-[10px] font-black uppercase tracking-widest">Retail</span></div>
                            <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-slate-200" /><span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Wholesale</span></div>
                        </div>
                    </div>
                    <div className="h-[450px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                                <YAxis hide />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)', padding: '24px' }} />
                                <Bar dataKey="retail" fill="#2563eb" radius={[12, 12, 12, 12]} barSize={24} />
                                <Bar dataKey="wholesale" fill="#e2e8f0" radius={[12, 12, 12, 12]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="space-y-10">
                    <div className="bg-slate-950 text-white rounded-[4rem] p-12 shadow-2xl relative overflow-hidden h-full flex flex-col">
                        <h3 className="text-xl font-black uppercase tracking-tight text-blue-400 mb-12 flex items-center gap-4">
                            <Activity className="w-6 h-6" /> KPIs Performance
                        </h3>
                        <div className="space-y-8 flex-grow">
                            <div className="p-8 bg-white/5 rounded-3xl border border-white/5 group hover:bg-white/10 transition-all">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Marge Bénéficiaire</p>
                                <div className="flex items-baseline gap-4">
                                    <h4 className="text-4xl font-black text-white font-sans tracking-tighter">32.4%</h4>
                                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">+2.1%</span>
                                </div>
                            </div>
                            <div className="p-8 bg-white/5 rounded-3xl border border-white/5 group hover:bg-white/10 transition-all opacity-50">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Rotation Stock (Jours)</p>
                                <div className="flex items-baseline gap-4">
                                    <h4 className="text-4xl font-black text-white font-sans tracking-tighter">14.2</h4>
                                    <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">-0.5d</span>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-16 bg-white/5 hover:bg-white/10 py-6 rounded-3xl border border-white/5 font-black uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-4">
                            Audit Annuel <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
