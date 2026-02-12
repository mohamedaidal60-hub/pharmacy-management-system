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
    Calendar
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
    { name: "Chiffre d'Affaires", value: "128,450.00$", delta: "+14.2%", positive: true, icon: DollarSign },
    { name: "Marge Bénéficiaire", value: "32.4%", delta: "+2.1%", positive: true, icon: TrendingUp },
    { name: "Rotation Stock", value: "4.2x", delta: "-0.5%", positive: false, icon: Package },
    { name: "Nouveaux Patients", value: "158", delta: "+8.3%", positive: true, icon: Users },
];

export default function ReportsPage() {
    return (
        <div className="space-y-12">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Analyses & <span className="text-blue-600 italic">Rapports.</span></h1>
                    <p className="text-slate-500 mt-2 font-medium tracking-wide">Performance commerciale, tendances de stock et prévisions financières.</p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-slate-50 text-slate-500 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center gap-3 border border-slate-100 hover:bg-slate-100 transition-all">
                        <Filter className="w-4 h-4" /> Filtrer
                    </button>
                    <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl hover:bg-blue-700 transition-all animate-pulse shadow-blue-200">
                        <Download className="w-4 h-4" /> Exporter PDF/Excel
                    </button>
                </div>
            </header>

            {/* Analytics Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 relative group hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500">
                        <div className="flex items-center justify-between mb-8">
                            <div className="bg-slate-100 p-4 rounded-2xl text-slate-900 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className={cn(
                                "text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest",
                                stat.positive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                            )}>
                                {stat.delta}
                            </span>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{stat.name}</p>
                        <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-white rounded-[4rem] p-10 shadow-sm border border-slate-100">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Flux de Trésorerie hebdomadaire</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Secteurs Vente Directe vs. Grossiste</p>
                        </div>
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-600" /><span className="text-[9px] font-black uppercase">Retail</span></div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-300" /><span className="text-[9px] font-black uppercase">Wholesale</span></div>
                        </div>
                    </div>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                                <YAxis hide />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.1)', padding: '20px' }}
                                />
                                <Bar dataKey="retail" fill="#2563eb" radius={[10, 10, 10, 10]} barSize={20} />
                                <Bar dataKey="wholesale" fill="#e2e8f0" radius={[10, 10, 10, 10]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Detailed Insights */}
                <div className="space-y-8">
                    <div className="bg-slate-900 text-white rounded-[3.5rem] p-10 shadow-2xl relative overflow-hidden h-full flex flex-col">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-[100px] opacity-20" />

                        <h3 className="text-xl font-black uppercase tracking-tight text-blue-400 mb-10 flex items-center gap-3">
                            <Activity /> Performances IA
                        </h3>

                        <div className="space-y-8 flex-grow">
                            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] group cursor-default">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Prévision Demande</p>
                                <h4 className="text-lg font-black text-white mt-4 uppercase leading-none">+25% Paracétamol</h4>
                                <p className="text-xs text-slate-400 mt-2 font-medium">Pic attendu pour la semaine prochaine dû à la saisonnalité.</p>
                                <div className="mt-6 flex items-center gap-3">
                                    <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">Optimisation suggérée</span>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] opacity-50 group">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Rapports Automatisés</p>
                                <div className="flex items-center justify-between mt-4">
                                    <h4 className="text-sm font-black text-white uppercase tracking-widest">Bilan de fin de mois</h4>
                                    <Clock className="w-4 h-4" />
                                </div>
                                <p className="text-xs text-slate-400 mt-1 font-medium italic">Génération prévue dans 4 jours.</p>
                            </div>
                        </div>

                        <button className="w-full mt-10 bg-blue-600 hover:bg-blue-500 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-900/40">
                            Générer Rapport Global <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
