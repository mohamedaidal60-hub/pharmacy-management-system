"use client";

import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Clock,
    DollarSign,
    Package,
    Users,
    ArrowRight,
    Download,
    Filter,
    PieChart as PieIcon,
    Activity,
    Calendar,
    Layers,
    Search,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area
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

const stats = [
    { name: "Chiffre d'Affaires", value: "128,450.00 €", delta: "+14.2%", positive: true, icon: DollarSign },
    { name: "Marge Bénéficiaire", value: "32.4%", delta: "+2.1%", positive: true, icon: TrendingUp },
    { name: "Rotation Stock", value: "4.2x", delta: "-0.5%", positive: false, icon: Package },
    { name: "Nouveaux Patients", value: "158", delta: "+8.3%", positive: true, icon: Users },
];

export default function ReportsPage() {
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
                    <button className="bg-white text-slate-500 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-slate-100 hover:bg-slate-50 transition-all flex items-center gap-3 shadow-sm">
                        <Filter className="w-4 h-4" /> Filtres Avancés
                    </button>
                    <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-700 transition-all flex items-center gap-3">
                        <Download className="w-4 h-4" /> Exporter PDF
                    </button>
                </div>
            </header>

            {/* Analytics Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-10 rounded-[4rem] shadow-sm border border-slate-100 group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
                        <div className="flex items-center justify-between mb-8">
                            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className={cn(
                                "text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border",
                                stat.positive ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                            )}>
                                {stat.delta}
                            </span>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{stat.name}</p>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Chart Section */}
                <div className="lg:col-span-2 bg-white rounded-[4rem] p-12 shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-16 relative z-10">
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Performance Hebdomadaire</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2 italic">Analyse comparative Ventes Directes vs. Grossiste</p>
                        </div>
                        <div className="flex gap-8">
                            <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]" /><span className="text-[10px] font-black uppercase tracking-widest">Retail</span></div>
                            <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-slate-200" /><span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Wholesale</span></div>
                        </div>
                    </div>
                    <div className="h-[450px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                                <YAxis hide />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)', padding: '24px' }}
                                />
                                <Bar dataKey="retail" fill="#2563eb" radius={[12, 12, 12, 12]} barSize={24} />
                                <Bar dataKey="wholesale" fill="#e2e8f0" radius={[12, 12, 12, 12]} barSize={24} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Subtle decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />
                </div>

                {/* AI Insight Sidebar Widget */}
                <div className="space-y-10">
                    <div className="bg-slate-950 text-white rounded-[4rem] p-12 shadow-2xl relative overflow-hidden h-full flex flex-col">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600 rounded-full blur-[100px] opacity-10" />

                        <h3 className="text-xl font-black uppercase tracking-tight text-blue-400 mb-12 flex items-center gap-4">
                            <Activity className="w-6 h-6" /> Prévisions <span className="italic">IAOS</span>
                        </h3>

                        <div className="space-y-8 flex-grow">
                            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] group cursor-default transition-all hover:bg-white/[0.08]">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/20"><TrendingUp className="w-5 h-5" /></div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Demande Produits</p>
                                </div>
                                <h4 className="text-2xl font-black text-white uppercase tracking-tight leading-none">+25% Paracétamol</h4>
                                <p className="text-xs text-slate-500 mt-4 leading-relaxed font-semibold italic">Alerte saisonnalité critique : Préparez les stocks pour la semaine S08.</p>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] opacity-40 group hover:opacity-100 transition-all duration-500">
                                <div className="flex items-center justify-between mb-6">
                                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600">Reports Autos</p>
                                    <Clock className="w-4 h-4 text-slate-600" />
                                </div>
                                <h4 className="text-sm font-black text-white uppercase tracking-[0.2em]">Bilan Mensuel Fév</h4>
                                <p className="text-[10px] text-slate-600 mt-2 font-bold uppercase tracking-widest text-emerald-400">Génération : 4 jours restants</p>
                            </div>
                        </div>

                        <button className="w-full mt-16 bg-blue-600 hover:bg-blue-500 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-4 shadow-2xl shadow-blue-900/40 group">
                            Analyse complète <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
