"use client";

import { useState, useEffect } from "react";
import {
    Users,
    Plus,
    Lock,
    ToggleLeft,
    ToggleRight,
    Mail,
    Shield,
    Building2,
    Key,
    CheckCircle2,
    XCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createUser, getAllUsers, updateUserPassword, toggleUserStatus } from "@/app/actions/pharmacy";
import { useSession } from "next-auth/react";

const ROLES = [
    { value: "ADMIN", label: "Administrateur", icon: Shield, color: "text-rose-600" },
    { value: "PHARMACIST", label: "Pharmacien", icon: Users, color: "text-blue-600" },
    { value: "ASSISTANT", label: "Assistant", icon: Users, color: "text-emerald-600" },
    { value: "DELIVERY", label: "Livreur", icon: Users, color: "text-amber-600" },
    { value: "WHOLESALE_BUYER", label: "Acheteur Gros", icon: Building2, color: "text-indigo-600" }
];

export default function AdminUsersPage() {
    const { data: session } = useSession(); // Used only for debug if needed
    const [users, setUsers] = useState<any[]>([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Force refresh immediately without checking session
        refreshUsers();
    }, []);

    const refreshUsers = async () => {
        setLoading(true);
        try {
            const data = await getAllUsers();
            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                console.error("Failed to load users", data);
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const res = await createUser({
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            role: formData.get("role") as string,
            storeId: formData.get("storeId") as string
        });

        if (res.success) {
            alert("✅ Utilisateur créé avec succès !");
            setShowCreateModal(false);
            refreshUsers();
        } else {
            alert("❌ Erreur: " + res.error);
        }
    };

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newPassword = formData.get("newPassword") as string;

        const res = await updateUserPassword(selectedUser.id, newPassword);
        if (res.success) {
            alert("✅ Mot de passe réinitialisé !");
            setShowPasswordModal(false);
            setSelectedUser(null);
        } else {
            alert("❌ " + res.error);
        }
    };

    const handleToggleStatus = async (userId: string) => {
        const res = await toggleUserStatus(userId);
        if (res.success) {
            refreshUsers();
        } else {
            alert("❌ " + res.error);
        }
    };

    // No session check return

    return (
        <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-8 h-1 bg-rose-600 rounded-full"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-600">Admin Panel</span>
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                        Gestion <span className="text-rose-600 italic">Utilisateurs.</span>
                    </h1>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-slate-950 text-white px-10 py-6 rounded-3xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-rose-600 transition-all flex items-center gap-4"
                >
                    <Plus className="w-5 h-5" /> Créer Utilisateur
                </button>
            </header>

            {loading ? (
                <div className="text-center py-20">
                    <p className="text-slate-400 font-black uppercase text-sm">Chargement...</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {users.map((user) => {
                        const roleInfo = ROLES.find(r => r.value === user.role);
                        return (
                            <div
                                key={user.id}
                                className="bg-white p-10 rounded-[4rem] border border-slate-100 flex items-center justify-between shadow-sm hover:shadow-xl transition-all"
                            >
                                <div className="flex items-center gap-8">
                                    <div className={cn(
                                        "w-20 h-20 rounded-3xl flex items-center justify-center text-white font-black text-2xl shadow-xl",
                                        user.isActive ? "bg-slate-950" : "bg-slate-300"
                                    )}>
                                        {user.name?.charAt(0) || "?"}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                                            {user.name}
                                        </h3>
                                        <div className="flex items-center gap-4 mt-3">
                                            <span className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-2">
                                                <Mail className="w-3 h-3" /> {user.email}
                                            </span>
                                            <span className={cn("text-[10px] font-black uppercase px-3 py-1 rounded-full", roleInfo?.color, "bg-slate-50")}>
                                                {roleInfo?.label}
                                            </span>
                                            <span className={cn(
                                                "text-[9px] font-black uppercase px-3 py-1 rounded-full flex items-center gap-2",
                                                user.isActive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                                            )}>
                                                {user.isActive ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                                {user.isActive ? "Actif" : "Inactif"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setShowPasswordModal(true);
                                        }}
                                        className="p-4 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all"
                                        title="Réinitialiser mot de passe"
                                    >
                                        <Key className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleToggleStatus(user.id)}
                                        className={cn(
                                            "p-4 rounded-2xl transition-all",
                                            user.isActive
                                                ? "bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white"
                                                : "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                                        )}
                                        title={user.isActive ? "Désactiver" : "Activer"}
                                    >
                                        {user.isActive ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Modal Création Utilisateur */}
            {showCreateModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-md">
                    <div className="bg-white rounded-[4rem] w-full max-w-3xl p-16 shadow-2xl">
                        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-12">
                            Créer un <span className="text-rose-600 italic">Utilisateur</span>
                        </h2>
                        <form onSubmit={handleCreateUser} className="space-y-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Nom Complet</label>
                                    <input name="name" required className="w-full bg-slate-50 border-none rounded-2xl py-6 px-8 font-bold outline-none" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email</label>
                                    <input name="email" type="email" required className="w-full bg-slate-50 border-none rounded-2xl py-6 px-8 font-bold outline-none" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Mot de Passe Initial</label>
                                    <input name="password" type="text" required className="w-full bg-slate-50 border-none rounded-2xl py-6 px-8 font-bold outline-none" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Rôle</label>
                                    <select name="role" required className="w-full bg-slate-50 border-none rounded-2xl py-6 px-8 font-black uppercase text-xs outline-none">
                                        {ROLES.map(r => (
                                            <option key={r.value} value={r.value}>{r.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Pharmacie Assignée</label>
                                <input name="storeId" defaultValue="store_001" required className="w-full bg-slate-50 border-none rounded-2xl py-6 px-8 font-bold outline-none" />
                            </div>
                            <div className="flex gap-4 pt-6">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-grow bg-slate-100 py-8 rounded-[2rem] font-black uppercase text-[10px]">Annuler</button>
                                <button type="submit" className="flex-grow bg-rose-600 text-white py-8 rounded-[2rem] font-black uppercase text-[10px] shadow-2xl">Créer</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Réinitialisation Mot de Passe */}
            {showPasswordModal && selectedUser && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-md">
                    <div className="bg-white rounded-[4rem] w-full max-w-2xl p-16 shadow-2xl">
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-8">
                            Réinitialiser Mot de Passe
                        </h2>
                        <p className="text-slate-500 mb-12">Utilisateur: <span className="font-black text-slate-900">{selectedUser.name}</span></p>
                        <form onSubmit={handleResetPassword} className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Nouveau Mot de Passe</label>
                                <input name="newPassword" type="text" required className="w-full bg-slate-50 border-none rounded-2xl py-6 px-8 font-bold outline-none" />
                            </div>
                            <div className="flex gap-4">
                                <button type="button" onClick={() => { setShowPasswordModal(false); setSelectedUser(null); }} className="flex-grow bg-slate-100 py-8 rounded-[2rem] font-black uppercase text-[10px]">Annuler</button>
                                <button type="submit" className="flex-grow bg-blue-600 text-white py-8 rounded-[2rem] font-black uppercase text-[10px] shadow-2xl">Réinitialiser</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
