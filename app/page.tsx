"use client";

import { useSession } from "next-auth/react";
import {
  TrendingUp,
  ShoppingCart,
  Package,
  Users,
  ArrowRight,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  Plus,
  Building2,
  Syringe,
  BarChart3,
  Truck,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePharmacy } from "@/context/PharmacyContext";

const stats = [
  { name: "Ventes du Jour", value: "2,450.00 €", delta: "+12%", bg: "bg-blue-50", color: "text-blue-600", icon: ShoppingCart },
  { name: "Produits en Stock", value: "1,240", delta: "-2%", bg: "bg-emerald-50", color: "text-emerald-600", icon: Package },
  { name: "Patients Actifs", value: "158", delta: "+5%", bg: "bg-indigo-50", color: "text-indigo-600", icon: Users },
  { name: "Commandes Gros", value: "12", delta: "+8%", bg: "bg-amber-50", color: "text-amber-600", icon: Truck },
];

export default function Dashboard() {
  const { data: session } = useSession();
  const { selectedStoreId } = usePharmacy();

  if (!selectedStoreId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-400 mb-8 border border-slate-200">
          <Building2 className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">Initialisation <span className="text-blue-600">Requise.</span></h2>
        <p className="text-slate-500 font-medium mb-12 max-w-sm">Veuillez sélectionner une boutique pour accéder au tableau de bord en temps réel.</p>
        <Link href="/select-store" className="bg-slate-950 text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-blue-600 transition-all flex items-center gap-4">
          Sélectionner un Shop <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Enterprise Dashboard</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Pharma<span className="text-blue-600 italic">OS.</span>
          </h1>
          <p className="text-slate-500 mt-4 font-medium text-lg">
            Ravi de vous revoir, <span className="text-slate-900 font-bold">{session?.user?.name || "Pharmacien"}</span>.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/dispensing" className="bg-rose-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-rose-200 hover:bg-rose-600 transition-all flex items-center gap-3">
            <Syringe className="w-5 h-5" /> Dispensing Rapide
          </Link>
          <Link href="/select-store" className="bg-white text-slate-500 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border border-slate-100 hover:bg-slate-50 transition-all flex items-center gap-3">
            <Building2 className="w-5 h-5" /> Changer de Shop
          </Link>
        </div>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={stat.name} className="bg-white p-10 rounded-[4rem] shadow-sm border border-slate-100 group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-sm", stat.bg, stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                <TrendingUp className="w-3 h-3 text-emerald-600" />
                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{stat.delta}</span>
              </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{stat.name}</p>
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter font-sans">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Urgent Operations Section */}
        <div className="xl:col-span-2 space-y-8">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-4">
              <BarChart3 className="text-blue-600" /> Opérations Prioritaires
            </h2>
            <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-all">Consulter toutes les tâches</button>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 flex items-center justify-between group hover:border-rose-200 shadow-sm transition-all duration-500">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-all">
                  <AlertTriangle className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-none text-rose-600">Alerte Rupture Stock</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2 italic leading-none">Ibuprofène 400mg - Seuil de sécurité atteint</p>
                </div>
              </div>
              <Link href="/inventory" className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-rose-500 hover:text-white transition-all">
                <ArrowUpRight className="w-6 h-6" />
              </Link>
            </div>

            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 flex items-center justify-between group hover:border-indigo-200 shadow-sm transition-all duration-500">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <Clock className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-none">Maintenance Planning</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2 italic leading-none">Entretien Patient prévu à 14:00 - Dr. Benali</p>
                </div>
              </div>
              <Link href="/calendar" className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all">
                <ArrowUpRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Messaging Quick Review */}
        <div className="bg-slate-950 text-white rounded-[4rem] p-12 shadow-2xl relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-[80px] opacity-10" />
          <h3 className="text-xl font-black uppercase tracking-tight text-white mb-12 flex items-center gap-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            Messages Internes
          </h3>
          <div className="space-y-8 flex-grow">
            {[1].map(i => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] relative group cursor-pointer hover:bg-white/10 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-[10px]">ML</div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Marie Laurent</p>
                </div>
                <p className="text-sm font-semibold text-slate-300 leading-relaxed italic">"N'oubliez pas de valider les commandes wholesale avant ce soir."</p>
              </div>
            ))}
          </div>
          <Link href="/messages" className="w-full mt-16 bg-white/5 hover:bg-blue-600 py-6 rounded-3xl border border-white/5 font-black uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-4 group">
            Ouvrir la Messagerie <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
