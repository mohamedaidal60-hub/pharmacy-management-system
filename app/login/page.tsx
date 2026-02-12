"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    Building2,
    Lock,
    Mail,
    ArrowRight,
    ShieldCheck,
    Zap,
    Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            setError("Identifiants invalides. Vérifiez votre accès.");
            setLoading(false);
        } else {
            router.push("/select-store");
        }
    };

    return (
        <div className="min-h-screen bg-white flex overflow-hidden font-sans">
            {/* Visual Side */}
            <div className="hidden lg:flex w-1/2 bg-slate-950 relative p-20 flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full opacity-20 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:40px_40px]" />
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-600 rounded-full blur-[120px] opacity-20" />
                <div className="absolute top-1/2 right-[-10%] w-96 h-96 bg-indigo-600 rounded-full blur-[150px] opacity-10" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-blue-500/20">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-black text-white tracking-tighter uppercase">Pharma<span className="text-blue-500 italic">OS.</span></h1>
                    </div>
                    <div className="space-y-6 max-w-md">
                        <h2 className="text-6xl font-black text-white leading-tight tracking-tighter uppercase italic">Modernize your <span className="text-blue-500 not-italic">Pharmacy.</span></h2>
                        <p className="text-slate-500 text-lg font-medium leading-relaxed">Le standard industriel pour la gestion de stocks, la délivrance sécurisée et la logistique de groupe.</p>
                    </div>
                </div>

                <div className="relative z-10 flex gap-12">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">Sécurité Certifiée</p>
                        <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest"><ShieldCheck className="w-4 h-4 text-emerald-500" /> AES-256 Cloud</div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">Connectivité</p>
                        <div className="flex items-center gap-2 text-white font-black text-xs uppercase tracking-widest"><Globe className="w-4 h-4 text-blue-400" /> Multi-Store Sync</div>
                    </div>
                </div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-10 sm:p-20 bg-slate-50">
                <div className="w-full max-w-md space-y-12">
                    <div className="lg:hidden flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20"><Building2 className="w-5 h-5" /></div>
                        <h1 className="text-xl font-black text-slate-950 uppercase tracking-tighter">PharmaOS.</h1>
                    </div>

                    <header>
                        <h2 className="text-4xl font-black text-slate-950 tracking-tighter uppercase leading-none mb-4 italic">Connexion <span className="text-blue-600 not-italic">Staff.</span></h2>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Accédez à votre espace professionnel sécurisé</p>
                    </header>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Identifiant Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors w-5 h-5" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="nom@pharmacie.fr"
                                        className="w-full bg-white border border-slate-200 rounded-[2rem] py-6 pl-14 pr-6 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Mot de Passe</label>
                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors w-5 h-5" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="••••••••"
                                        className="w-full bg-white border border-slate-200 rounded-[2rem] py-6 pl-14 pr-6 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-rose-50 text-rose-600 p-6 rounded-3xl border border-rose-100 flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                                <Zap className="w-5 h-5 fill-rose-600" />
                                <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-slate-950 text-white py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-slate-300 hover:bg-blue-600 hover:shadow-blue-200 transition-all duration-500 flex items-center justify-center gap-4 group"
                        >
                            {loading ? "Authentification..." : <>Ouvrir une Session <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" /></>}
                        </button>
                    </form>

                    <footer className="pt-12 flex flex-col items-center gap-6">
                        <button className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors underline underline-offset-8">Mot de passe oublié ?</button>
                        <div className="flex items-center gap-3 opacity-30">
                            <div className="w-8 h-px bg-slate-400" />
                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">v2.0.4 stable</span>
                            <div className="w-8 h-px bg-slate-400" />
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
