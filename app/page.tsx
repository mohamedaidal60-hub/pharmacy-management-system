"use client";

import { useSession } from "next-auth/react";
import {
  TrendingUp,
  Package,
  ShoppingCart,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Calendar as CalendarIcon,
  MessageSquare,
  ArrowUpRight,
  MoreHorizontal,
  Users,
  DollarSign,
  Activity
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

const stats = [
  {
    name: "Ventes du Jour",
    value: "4,250.00 €",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    description: "vs. 3,800€ hier"
  },
  {
    name: "Commandes",
    value: "18",
    change: "-2",
    trend: "down",
    icon: ShoppingCart,
    color: "text-blue-600",
    bg: "bg-blue-50",
    description: "4 en attente"
  },
  {
    name: "Stock Faible",
    value: "12",
    change: "Alerte",
    trend: "neutral",
    icon: Package,
    color: "text-amber-600",
    bg: "bg-amber-50",
    description: "Produits à commander"
  },
  {
    name: "Patients",
    value: "158",
    change: "+8.3%",
    trend: "up",
    icon: Users,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    description: "Nouveaux ce mois"
  },
];

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
      {/* Header avec un look moderne */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Analytics Dashboard</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Pharma<span className="text-blue-600 italic">OS.</span>
          </h1>
          <p className="text-slate-500 mt-4 font-medium text-lg">
            Ravi de vous revoir, <span className="text-slate-900 font-bold">{session?.user?.name || "Pharmacien"}</span>.
          </p>
        </div>
        <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-slate-100 gap-2">
          <div className="px-6 py-2 bg-slate-50 rounded-xl text-center">
            <p className="text-[10px] font-black uppercase text-slate-400">Date du jour</p>
            <p className="text-sm font-bold text-slate-900">12 Février 2024</p>
          </div>
          <div className="px-6 py-2 bg-blue-600 rounded-xl text-center text-white shadow-lg shadow-blue-100">
            <p className="text-[10px] font-black uppercase text-blue-100">Statut Système</p>
            <p className="text-sm font-bold">Opérationnel</p>
          </div>
        </div>
      </header>

      {/* Grid de Stats - Correction du stretching */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden relative">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110", stat.bg, stat.color)}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full",
                  stat.trend === "up" ? "bg-emerald-50 text-emerald-600" : stat.trend === "down" ? "bg-rose-50 text-rose-600" : "bg-slate-50 text-slate-600"
                )}>
                  {stat.trend === "up" && <TrendingUp className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-[11px] font-black font-sans uppercase tracking-[0.2em] text-slate-400 mb-2">{stat.name}</p>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h3>
              <p className="text-[10px] font-bold text-slate-400 mt-4 italic uppercase tracking-widest">{stat.description}</p>
            </div>
            {/* Dégradé de fond subtil au hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Ventes Récentes - Card List au lieu de Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Activity className="text-blue-600 w-5 h-5" />
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Flux de Activités</h2>
            </div>
            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-blue-600 flex items-center gap-2">
              Voir l'historique <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-blue-600 text-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                    #RX{i}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 uppercase tracking-tight">Vente Ordonnance - Dr. Benali</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Patient: Jean Dupont • 12:45</p>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div className="text-right">
                    <p className="text-xl font-black text-slate-900">145.00 €</p>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500">Paiement Validé</span>
                  </div>
                  <button className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:text-blue-600 transition-all">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-10">
          {/* Calendar Widget */}
          <div className="bg-slate-900 text-white rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                  <CalendarIcon className="text-blue-400 w-5 h-5" /> Prochaines Tâches
                </h3>
                <div className="bg-white/10 w-10 h-10 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:bg-blue-600 transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-1 h-3 bg-blue-600 rounded-full mb-1"></div>
                    <div className="w-2 h-2 rounded-full border-2 border-blue-600"></div>
                    <div className="w-1 flex-grow bg-slate-800 rounded-full mt-1"></div>
                  </div>
                  <div className="pb-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Aujourd'hui • 14:00</p>
                    <p className="font-bold text-sm mt-1">Inventaire Cryo-Stock B</p>
                  </div>
                </div>
                <div className="flex gap-4 opacity-50">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full border-2 border-slate-600"></div>
                    <div className="w-1 flex-grow bg-slate-800 rounded-full mt-1"></div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Demain • 09:30</p>
                    <p className="font-bold text-sm mt-1">Réception Grossiste Sanofi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Preview */}
          <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3 text-slate-900">
                <MessageSquare className="text-blue-600 w-5 h-5" /> Staff Chat
              </h3>
              <span className="bg-rose-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-rose-200">2 New</span>
            </div>
            <div className="space-y-8">
              <div className="flex gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black group-hover:bg-blue-600 group-hover:text-white transition-all">M</div>
                <div>
                  <div className="flex items-center justify-between gap-10">
                    <p className="text-sm font-black text-slate-900 uppercase">Marie Laurent</p>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">10:45</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1 italic">"Le lot de Paracétamol est arrivé..."</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-10 bg-slate-50 hover:bg-blue-600 hover:text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all text-slate-500">
              Accéder à la messagerie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
