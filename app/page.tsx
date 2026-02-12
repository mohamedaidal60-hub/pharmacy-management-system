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
  ArrowRight
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

const TradingUp = TrendingUp; // Simple alias for the icon

const stats = [
  { name: "Ventes du Jour", value: "4,250.00$", change: "+12.5%", icon: TradingUp, color: "bg-green-500" },
  { name: "Commandes En Attente", value: "18", change: "-2", icon: Clock, color: "bg-blue-500" },
  { name: "Stock Faible", value: "12 Items", change: "! Alerte", icon: AlertTriangle, color: "bg-amber-500" },
  { name: "Commandes Grossiste", value: "3", change: "En transit", icon: Package, color: "bg-purple-500" },
];

function StatsCard({ stat }: { stat: typeof stats[0] }) {
  const Icon = stat.icon;
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5">
      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white", stat.color)}>
        <Icon className="w-7 h-7" />
      </div>
      <div>
        <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">{stat.name}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
          <span className={cn("text-[10px] font-black italic", stat.change.includes('+') ? "text-green-500" : "text-amber-500")}>
            {stat.change}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">Tableau de <span className="text-blue-600 italic">Bord.</span></h1>
        <p className="text-slate-500 mt-2 font-medium tracking-wide">Bienvenue, {session?.user?.name}. Voici un résumé de l'activité du jour.</p>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.name} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Ventes Récentes</h2>
            <button className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest flex items-center gap-2">
              Voir Tout <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Commande</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Client</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Montant</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-4">
                      <p className="text-sm font-bold text-slate-900 leading-tight">#RX-492{i}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-black">À l'instant</p>
                    </td>
                    <td className="px-8 py-4 text-sm font-semibold text-slate-600">Jean Dupont</td>
                    <td className="px-8 py-4 text-sm font-black text-slate-900">45.00$</td>
                    <td className="px-8 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-wider border border-green-100">
                        <CheckCircle2 className="w-3 h-3" /> Terminé
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calendar & Messages Section */}
        <div className="space-y-8">
          {/* Calendar Mini View */}
          <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-3">
                <CalendarIcon className="text-blue-400" /> Calendrier
              </h3>
              <button className="bg-white/10 p-2 rounded-xl hover:bg-white/20 transition-all"><ArrowRight className="w-4 h-4" /></button>
            </div>
            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">14:00 - Aujourd'hui</p>
                <p className="font-bold text-sm mt-1">Réunion d'inventaire mensuel</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-2xl opacity-50">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">16:30 - Demain</p>
                <p className="font-bold text-sm mt-1">Livraison Grossiste #992</p>
              </div>
            </div>
          </div>

          {/* Internal Messaging System Preview */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-3 text-slate-900">
                <MessageSquare className="text-blue-600" /> Messages Staff
              </h3>
              <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">2 Nouveaux</span>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex-shrink-0 border border-slate-100" />
                <div>
                  <p className="text-sm font-bold text-slate-900">Marie L.</p>
                  <p className="text-[11px] text-slate-500 line-clamp-1 italic">Le stock de Paracétamol est presque épuisé...</p>
                </div>
              </div>
              <div className="flex gap-4 opacity-70">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex-shrink-0 border border-slate-100" />
                <div>
                  <p className="text-sm font-bold text-slate-900">Thomas K.</p>
                  <p className="text-[11px] text-slate-500 line-clamp-1 italic">La nouvelle interface de dispensing est top.</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-8 bg-slate-50 hover:bg-slate-100 text-slate-600 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
              Ouvrir la Messageries
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
