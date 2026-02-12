"use client";

import { useState } from "react";
import {
    MessageSquare,
    Search,
    Edit3,
    Send,
    Paperclip,
    MoreVertical,
    User,
    Bell,
    Check,
    CheckCheck,
    Circle,
    Plus
} from "lucide-react";
import { cn } from "@/lib/utils";

const contacts = [
    { id: 1, name: "Marie Laurent", role: "Pharmacien Chef", status: "online", lastMsg: "As-tu reçu le lot de Doliprane ?", time: "10:45", unread: 2 },
    { id: 2, name: "Thomas Krantz", role: "Logistique", status: "offline", lastMsg: "Livraison décalée à demain matin.", time: "Hier", unread: 0 },
    { id: 3, name: "Dr. Benali", role: "Consultant", status: "online", lastMsg: "Ok, je vérifie l'interaction.", time: "Lun", unread: 0 },
    { id: 4, name: "Équipe Nord", role: "Groupe Entrepôt", status: "online", lastMsg: "Besoin de renfort pour l'inventaire.", time: "11:20", unread: 5 },
];

export default function MessagesPage() {
    const [selectedContact, setSelectedContact] = useState(contacts[0]);

    return (
        <div className="h-[calc(100vh-160px)] flex bg-white rounded-[3.5rem] shadow-sm border border-slate-100 overflow-hidden">
            {/* Sidebar List */}
            <div className="w-96 border-r border-slate-50 flex flex-col">
                <div className="p-8 border-b border-slate-50">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Messages</h2>
                        <button className="bg-blue-600 text-white p-3 rounded-2xl shadow-lg shadow-blue-100 hover:bg-slate-900 transition-all">
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Rechercher une discussion..."
                            className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-10 pr-4 text-xs font-semibold focus:bg-white focus:ring-1 focus:ring-blue-600 transition-all outline-none"
                        />
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto no-scrollbar">
                    {contacts.map((contact) => (
                        <div
                            key={contact.id}
                            onClick={() => setSelectedContact(contact)}
                            className={cn(
                                "p-8 border-b border-slate-50 cursor-pointer transition-all relative group",
                                selectedContact.id === contact.id ? "bg-slate-50/80" : "hover:bg-slate-50/30"
                            )}
                        >
                            {selectedContact.id === contact.id && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 rounded-r-full" />}
                            <div className="flex gap-5">
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-blue-600 font-black text-lg shadow-sm">
                                        {contact.name.charAt(0)}
                                    </div>
                                    {contact.status === "online" && (
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white shadow-sm" />
                                    )}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight truncate">{contact.name}</h3>
                                        <span className="text-[9px] font-black text-slate-400 uppercase">{contact.time}</span>
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{contact.role}</p>
                                    <p className={cn(
                                        "text-xs truncate transition-all",
                                        contact.unread > 0 ? "font-bold text-slate-900" : "text-slate-500 font-medium"
                                    )}>
                                        {contact.lastMsg}
                                    </p>
                                </div>
                                {contact.unread > 0 && (
                                    <div className="bg-blue-600 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-blue-100">
                                        {contact.unread}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-grow flex flex-col bg-slate-50/30">
                {/* Header */}
                <div className="p-8 bg-white border-b border-slate-50 flex items-center justify-between z-10">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-lg">
                            {selectedContact.name.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-black text-slate-900 uppercase tracking-widest">{selectedContact.name}</h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                                <Circle className="w-2 h-2 fill-emerald-500" /> En ligne
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all"><Bell className="w-5 h-5" /></button>
                        <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all"><MoreVertical className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Messages List Area */}
                <div className="flex-grow p-10 overflow-y-auto space-y-10 no-scrollbar">
                    <div className="flex flex-col items-center">
                        <span className="bg-white/80 backdrop-blur px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-400 border border-slate-100">Aujourd'hui, 10 Fév</span>
                    </div>

                    <div className="flex gap-6 max-w-2xl">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex-shrink-0 flex items-center justify-center text-blue-600 font-black text-xs">M</div>
                        <div className="bg-white p-6 rounded-[2rem] rounded-tl-none shadow-sm border border-slate-100">
                            <p className="text-sm font-medium text-slate-700 leading-relaxed">Salut Marie, as-tu pu vérifier le stock de Paracétamol 500mh pour l'entrepôt Nord ? On est presque en rupture critique.</p>
                            <div className="flex items-center gap-3 mt-4 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                                <span>10:30 AM</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-6 max-w-2xl ml-auto flex-row-reverse">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex-shrink-0 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-100 overflow-hidden">
                            <User className="w-6 h-6" />
                        </div>
                        <div className="bg-blue-600 text-white p-6 rounded-[2rem] rounded-tr-none shadow-xl shadow-blue-900/10">
                            <p className="text-sm font-medium leading-relaxed">Oui, je viens de voir ! Je passe une commande de gros tout de suite pour réapprovisionner l'entrepôt Sud aussi.</p>
                            <div className="flex items-center gap-3 mt-4 text-[9px] font-black text-blue-200 uppercase tracking-widest italic">
                                <span>10:32 AM</span>
                                <CheckCheck className="w-3 h-3 text-emerald-300" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-6 max-w-2xl">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex-shrink-0 flex items-center justify-center text-blue-600 font-black text-xs">M</div>
                        <div className="bg-white p-6 rounded-[2rem] rounded-tl-none shadow-sm border border-slate-100">
                            <p className="text-sm font-medium text-slate-700 leading-relaxed">Super, merci ! N'oublie pas de synchroniser l'inventaire dans PharmaOS une fois validé.</p>
                            <div className="flex items-center gap-3 mt-4 text-[9px] font-black text-slate-400 uppercase tracking-widest italic">
                                <span>10:45 AM</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-8 bg-white border-t border-slate-50 px-12">
                    <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex items-center gap-4 focus-within:border-blue-600 focus-within:bg-white transition-all">
                        <button className="text-slate-400 hover:text-blue-600 p-2"><Paperclip className="w-5 h-5" /></button>
                        <input
                            type="text"
                            placeholder="Écrivez votre message ici..."
                            className="flex-grow bg-transparent border-none text-sm font-semibold outline-none text-slate-900 py-2"
                        />
                        <button className="bg-blue-600 text-white p-4 rounded-2xl shadow-xl shadow-blue-100 hover:bg-slate-900 transition-all flex items-center gap-3 font-black text-[10px] uppercase tracking-widest">
                            Envoyer <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
