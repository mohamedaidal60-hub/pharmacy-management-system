"use client";

import { useState } from "react";
import { ShieldCheck, Database, RefreshCw, LogIn } from "lucide-react";
import Link from "next/link";

export default function AdminFixPage() {
    // Version 1.1 - Force Update
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const runDiagnostic = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin-fix");
            const data = await res.json();
            setStatus(data);
        } catch (e: any) {
            setStatus({ error: e.message });
        } finally {
            setLoading(false);
        }
    };

    const runRepair = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin-fix", { method: "POST" });
            const data = await res.json();
            setStatus({ ...status, repair: data });
        } catch (e: any) {
            setStatus({ ...status, repairError: e.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white p-10 flex flex-col items-center justify-center font-mono">
            <div className="max-w-2xl w-full space-y-8">
                <header className="flex items-center gap-4 text-emerald-400 mb-8">
                    <ShieldCheck size={48} />
                    <h1 className="text-3xl font-bold uppercase tracking-widest">OUTIL DE RÉPARATION ADMIN</h1>
                </header>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-6">
                    <h2 className="text-xl font-bold text-slate-400 flex items-center gap-2">
                        <Database className="w-5 h-5" /> DIAGNOSTIC DB
                    </h2>

                    <div className="flex gap-4">
                        <button
                            onClick={runDiagnostic}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
                        >
                            {loading ? "Test en cours..." : "Lancer le Diagnostic"}
                        </button>

                        <button
                            onClick={runRepair}
                            disabled={loading}
                            className="bg-rose-600 hover:bg-rose-500 px-6 py-3 rounded-lg font-bold transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            <RefreshCw className="w-5 h-5" /> REPARER ADMIN & STORE
                        </button>
                    </div>

                    {status && (
                        <div className="mt-6 p-4 bg-black rounded-lg border border-slate-800 overflow-auto max-h-96">
                            <pre className="text-xs text-green-400 whitespace-pre-wrap">
                                {JSON.stringify(status, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>

                <div className="text-center pt-8">
                    <Link href="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <LogIn className="w-5 h-5" /> Retour à la page de connexion
                    </Link>
                </div>
            </div>
        </div>
    );
}
