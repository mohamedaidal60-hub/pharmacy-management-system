"use client";

import { useState } from "react";
import {
    Search,
    Plus,
    MoreVertical,
    Send,
    Paperclip,
    Smile,
    CheckCheck,
    Clock,
    Phone,
    Video,
    Info,
    Circle,
    MessageSquare,
    ChevronRight,
    User
} from "lucide-react";
import { cn } from "@/lib/utils";

const contacts = [
    { id: "1", name: "Marie Laurent", role: "Pharmacien Chef", online: true, lastMsg: "Le lot de Paracétamol est arrivé...", time: "10:45", unread: 2 },
    { id: "2", name: "Thomas Klein", role: "Assistant Agent", online: true, lastMsg: "Ok pour le planning de demain.", time: "Hier", unread: 0 },
    { id: "3", name: "Lucie Bernard", role: "Livreur", online: false, lastMsg: "Livraison effectuée zone Nord.", time: "Lun", unread: 0 },
    { id: "4", name: "Dr. Benali", role: "Externe", online: false, lastMsg: "Besoin d'une précision dosage...", time: "2 Jan", unread: 0 },
];

export default function MessagesPage() {
    const [selectedContact, setSelectedContact] = useState(contacts[0]);

    return (
        <div className="max-w-[1600px] mx-auto h-[calc(100vh-180px)] flex gap-10 pb-10">
            {/* Contact List */}
            <div className="w-1/3 flex flex-col space-y-8">
                <header className="flex items-center justify-between">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Messages.</h1>
                    <button className="bg-slate-950 text-white p-4 rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
                        <Plus className="w-5 h-5" />
                    </button>
                </header>

                <div className="flex-grow bg-white rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col overflow-hidden">
                    <div className="p-10 border-b border-slate-50">
                        <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Chercher une discussion..."
                                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-14 pr-4 text-xs font-black uppercase tracking-widest focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex-grow overflow-y-auto no-scrollbar py-6">
                        {contacts.map((contact) => (
                            <div
                                key={contact.id}
                                onClick={() => setSelectedContact(contact)}
                                className={cn(
                                    "px-10 py-8 flex items-center justify-between cursor-pointer transition-all duration-300 relative group",
                                    selectedContact.id === contact.id ? "bg-slate-50 border-r-4 border-blue-600 shadow-inner" : "hover:bg-slate-50/50"
                                )}
                            >
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-[1.5rem] bg-white border border-slate-100 flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform duration-500 font-black text-xl">
                                            {contact.name.charAt(0)}
                                        </div>
                                        {contact.online && (
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full shadow-lg" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">{contact.name}</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{contact.role}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-2">{contact.time}</p>
                                    {contact.unread > 0 && (
                                        <span className="bg-blue-600 text-white text-[9px] font-black w-6 h-6 rounded-full flex items-center justify-center ml-auto shadow-lg shadow-blue-200">
                                            {contact.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-grow bg-white rounded-[4rem] shadow-sm border border-slate-100 flex flex-col overflow-hidden relative">
                {/* Chat Header */}
                <header className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-slate-950 flex items-center justify-center text-white p-0.5 shadow-xl">
                            <div className="w-full h-full rounded-[1.2rem] border border-white/20 flex items-center justify-center font-black text-xl uppercase">
                                {selectedContact.name.charAt(0)}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none">{selectedContact.name}</h2>
                            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mt-2 flex items-center gap-2 italic">
                                <Circle className="w-2 h-2 fill-emerald-500 animate-pulse" /> Actif maintenant
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="p-4 bg-white text-slate-400 hover:text-blue-600 rounded-2xl border border-slate-50 transition-all shadow-sm"><Phone className="w-5 h-5" /></button>
                        <button className="p-4 bg-white text-slate-400 hover:text-blue-600 rounded-2xl border border-slate-50 transition-all shadow-sm"><Video className="w-5 h-5" /></button>
                        <button className="p-4 bg-white text-slate-400 hover:text-blue-600 rounded-2xl border border-slate-50 transition-all shadow-sm"><Info className="w-5 h-5" /></button>
                    </div>
                </header>

                {/* Messages Area */}
                <div className="flex-grow overflow-y-auto no-scrollbar p-16 space-y-12 bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] [background-size:20px_20px]">
                    <div className="flex gap-6 max-w-2xl">
                        <div className="w-12 h-12 rounded-[1rem] bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs shrink-0">{selectedContact.name.charAt(0)}</div>
                        <div className="bg-slate-100/80 backdrop-blur shadow-sm p-8 rounded-tr-[2.5rem] rounded-br-[2.5rem] rounded-bl-[2.5rem] text-sm font-semibold text-slate-700 leading-relaxed relative">
                            Bonjour, avez-vous pu vérifier si le lot de Paracétamol 1000mg reçu ce matin est bien conforme aux normes d'étiquetage ?
                            <span className="absolute -bottom-8 left-0 text-[9px] font-black text-slate-300 uppercase tracking-widest">10:42 AM</span>
                        </div>
                    </div>

                    <div className="flex gap-6 max-w-2xl ml-auto flex-row-reverse">
                        <div className="w-12 h-12 rounded-[1rem] bg-blue-600 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-lg shadow-blue-100">U</div>
                        <div className="bg-blue-600 p-8 rounded-tl-[2.5rem] rounded-bl-[2.5rem] rounded-br-[2.5rem] text-sm font-semibold text-white leading-relaxed relative shadow-xl shadow-blue-200/50">
                            Oui Marie, tout est en ordre. J'ai scanné les codes et ils sont déjà intégrés dans l'inventaire du rayon B-03.
                            <div className="absolute -bottom-8 right-0 flex items-center gap-2">
                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">10:45 AM</span>
                                <CheckCheck className="w-4 h-4 text-blue-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-10 border-t border-slate-50 bg-slate-50/20 backdrop-blur-sm">
                    <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl border border-slate-100 flex items-center gap-4 group focus-within:ring-4 focus-within:ring-blue-600/5 transition-all">
                        <button className="p-4 text-slate-400 hover:text-blue-600 transition-colors"><Smile /></button>
                        <button className="p-4 text-slate-400 hover:text-blue-600 transition-colors border-r border-slate-50 pr-6"><Paperclip /></button>
                        <input
                            type="text"
                            placeholder="Écrire votre message confidentiel..."
                            className="flex-grow bg-transparent border-none py-4 text-sm font-bold text-slate-900 outline-none"
                        />
                        <button className="bg-blue-600 text-white p-5 rounded-[2rem] hover:bg-slate-900 transition-all shadow-xl shadow-blue-200 group-hover:scale-105 active:scale-95">
                            <Send className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
