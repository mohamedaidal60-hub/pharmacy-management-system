"use client";

import { useState, useEffect } from "react";
import {
    Bell,
    Check,
    X,
    Clock,
    Package,
    TrendingUp,
    ShoppingCart,
    Layers,
    Edit,
    MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getPendingActions, approveAction, rejectAction } from "@/app/actions/pharmacy";
import { useSession } from "next-auth/react";

const ACTION_TYPES = {
    CREATE_PRODUCT: { label: "Nouveau Produit", icon: Package, color: "text-blue-600" },
    UPDATE_STOCK: { label: "Ajustement Stock", icon: TrendingUp, color: "text-emerald-600" },
    CREATE_ORDER: { label: "Nouvelle Commande", icon: ShoppingCart, color: "text-rose-600" },
    CREATE_BATCH: { label: "Nouveau Lot", icon: Layers, color: "text-indigo-600" },
    UPDATE_PRICE: { label: "Modification Prix", icon: Edit, color: "text-amber-600" }
};

export default function AdminValidationsPage() {
    const { data: session } = useSession();
    const [pendingActions, setPendingActions] = useState<any[]>([]);
    const [selectedAction, setSelectedAction] = useState<any>(null);
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session?.user?.role === "ADMIN") {
            refreshActions();
        }
    }, [session]);

    const refreshActions = async () => {
        setLoading(true);
        const data = await getPendingActions();
        setPendingActions(data);
        setLoading(false);
    };

    const handleApprove = async (actionId: string) => {
        const res = await approveAction(actionId);
        if (res.success) {
            alert("✅ Action approuvée et exécutée !");
            refreshActions();
        } else {
            alert("❌ " + res.error);
        }
    };

    const handleReject = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const comment = formData.get("comment") as string;

        const res = await rejectAction(selectedAction.id, comment);
        if (res.success) {
            alert("✅ Action refusée.");
            setShowRejectModal(false);
            setSelectedAction(null);
            refreshActions();
        } else {
            alert("❌ " + res.error);
        }
    };

    if (session?.user?.role !== "ADMIN") {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <Bell className="w-20 h-20 text-rose-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-black text-slate-900 uppercase">Accès Refusé</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-1 bg-amber-500 rounded-full"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600">Validation Center</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                        Actions <span className="text-amber-500 italic">en Attente.</span>
                    </h1>
                    <p className="text-slate-500 mt-4 font-medium">
                        {pendingActions.length} {pendingActions.length === 1 ? "action" : "actions"} à traiter
                    </p>
                </div>
            </header>

            {loading ? (
                <div className="text-center py-20">
                    <Clock className="w-12 h-12 text-slate-300 mx-auto mb-4 animate-spin" />
                    <p className="text-slate-400 font-black uppercase text-sm">Chargement...</p>
                </div>
            ) : pendingActions.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[4rem] border border-slate-100">
                    <Check className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-black text-slate-900 uppercase mb-4">Tout est validé !</h3>
                    <p className="text-slate-500">Aucune action en attente pour le moment.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {pendingActions.map((action) => {
                        const typeInfo = ACTION_TYPES[action.type as keyof typeof ACTION_TYPES];
                        const data = JSON.parse(action.originalData);
                        const Icon = typeInfo?.icon || Bell;

                        return (
                            <div
                                key={action.id}
                                className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all"
                            >
                                <div className="flex items-start justify-between mb-8">
                                    <div className="flex items-center gap-6">
                                        <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center bg-slate-50", typeInfo?.color)}>
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-4 mb-3">
                                                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                                                    {typeInfo?.label}
                                                </h3>
                                                <span className="text-[9px] font-black uppercase px-3 py-1 rounded-full bg-amber-50 text-amber-600 flex items-center gap-2">
                                                    <Clock className="w-3 h-3" /> En attente
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase">
                                                <span>Par: {action.createdBy?.name}</span>
                                                <span>•</span>
                                                <span>{new Date(action.createdAt).toLocaleString("fr-FR")}</span>
                                                <span>•</span>
                                                <span>Boutique: {action.store?.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-slate-50 p-8 rounded-3xl mb-8">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Détails de l'action</h4>
                                    <pre className="text-xs font-mono text-slate-700 overflow-x-auto">
                                        {JSON.stringify(data, null, 2)}
                                    </pre>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleApprove(action.id)}
                                        className="flex-grow bg-emerald-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-3"
                                    >
                                        <Check className="w-5 h-5" /> Approuver & Exécuter
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedAction(action);
                                            setShowModifyModal(true);
                                        }}
                                        className="flex-grow bg-blue-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
                                    >
                                        <Edit className="w-5 h-5" /> Modifier & Valider
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedAction(action);
                                            setShowRejectModal(true);
                                        }}
                                        className="flex-grow bg-rose-600 text-white py-6 rounded-[2rem] font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-rose-700 transition-all flex items-center justify-center gap-3"
                                    >
                                        <X className="w-5 h-5" /> Refuser
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modal Modification (simplifié pour l'instant) */}
            {showModifyModal && selectedAction && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-md">
                    <div className="bg-white rounded-[4rem] w-full max-w-3xl p-16 shadow-2xl">
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-8">
                            Modifier l'Action
                        </h2>
                        <p className="text-slate-500 mb-12">Fonctionnalité en cours de développement. Pour l'instant, vous pouvez approuver ou refuser.</p>
                        <button
                            onClick={() => setShowModifyModal(false)}
                            className="w-full bg-slate-100 py-8 rounded-[2rem] font-black uppercase text-[10px]"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            )}

            {/* Modal Refus */}
            {showRejectModal && selectedAction && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-md">
                    <div className="bg-white rounded-[4rem] w-full max-w-2xl p-16 shadow-2xl">
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-8">
                            Refuser l'Action
                        </h2>
                        <form onSubmit={handleReject} className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                                    Raison du refus (sera envoyée à l'utilisateur)
                                </label>
                                <textarea
                                    name="comment"
                                    required
                                    className="w-full bg-slate-50 border-none rounded-3xl py-6 px-8 font-bold outline-none h-32"
                                    placeholder="Expliquez pourquoi cette action est refusée..."
                                ></textarea>
                            </div>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => { setShowRejectModal(false); setSelectedAction(null); }}
                                    className="flex-grow bg-slate-100 py-8 rounded-[2rem] font-black uppercase text-[10px]"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="flex-grow bg-rose-600 text-white py-8 rounded-[2rem] font-black uppercase text-[10px] shadow-2xl"
                                >
                                    Confirmer le Refus
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
