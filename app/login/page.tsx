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
    Globe
} from "lucide-react";

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

    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/select-store" });
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

                    {/* Google OAuth Button - Désactivé temporairement */}
                    {/* <button
                        onClick={handleGoogleSignIn}
                        type="button"
                        className="w-full bg-white border-2 border-slate-200 hover:border-blue-600 text-slate-900 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.25em] text-[10px] shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-4 group"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Se connecter avec Google
                    </button> */}

                    {/* Separator */}
                    {/* <div className="flex items-center gap-4">
                        <div className="flex-grow h-px bg-slate-200"></div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">ou administrateur</span>
                        <div className="flex-grow h-px bg-slate-200"></div>
                    </div> */}

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
                                        placeholder="admin@pharmacie.fr"
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
                                <ShieldCheck className="w-5 h-5 fill-rose-600" />
                                <p className="text-[10px] font-black uppercase tracking-widest">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-slate-950 text-white py-6 rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl shadow-slate-300 hover:bg-blue-600 hover:shadow-blue-200 transition-all duration-500 flex items-center justify-center gap-4 group"
                        >
                            {loading ? "Authentification..." : <><Lock className="w-5 h-5" /> Connexion Admin <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" /></>}
                        </button>
                    </form>

                    <footer className="pt-6 flex flex-col items-center gap-6">
                        <div className="flex items-center gap-3 opacity-30">
                            <div className="w-8 h-px bg-slate-400" />
                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">v2.1.0 secure</span>
                            <div className="w-8 h-px bg-slate-400" />
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}
