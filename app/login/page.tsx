"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Store, Lock, Mail, AlertCircle } from "lucide-react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError("Identifiants invalides ou accès refusé.")
            } else {
                router.push("/")
                router.refresh()
            }
        } catch (err) {
            setError("Une erreur est survenue lors de la connexion.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-200 mb-4">
                        <Store className="h-10 w-10" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">PharmaOS</h1>
                    <p className="text-slate-500 font-medium">Connectez-vous à votre espace de gestion</p>
                </div>

                <div className="rounded-[2.5rem] bg-white p-10 shadow-2xl shadow-slate-200 border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
                                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                                <p className="font-bold">{error}</p>
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2 px-1">Email professionnel</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nom@pharmacie.com"
                                    className="w-full rounded-2xl bg-slate-50 border-transparent py-4 pl-12 pr-4 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2 px-1">Mot de passe</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full rounded-2xl bg-slate-50 border-transparent py-4 pl-12 pr-4 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-2xl bg-blue-600 py-4 text-sm font-black uppercase tracking-[0.2em] text-white shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:opacity-50 transition-all mt-4"
                        >
                            {loading ? "Connexion..." : "Se Connecter"}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                        Pour tout problème d'accès, veuillez contacter votre administrateur système.
                    </div>
                </div>
            </div>
        </div>
    )
}
