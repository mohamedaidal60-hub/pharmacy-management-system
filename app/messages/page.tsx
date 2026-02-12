"use client";

import { useState } from "react";
import {
    Search,
    Plus,
    Send,
    Paperclip,
    Smile,
    CheckCheck,
    Circle,
    Phone,
    Video,
    Info,
    ChevronRight,
    MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { sendInternalMessage } from "@/app/actions/pharmacy";
import { useSession } from "next-auth/react";

const contacts = [
    { id: "1", name: "Marie Laurent", role: "Pharmacien Chef", online: true, lastMsg: "Le lot de Paracétamol est arrivé...", time: "10:45", unread: 2 },
    { id: "2", name: "Thomas Klein", role: "Assistant Agent", online: true, lastMsg: "Ok pour le planning de demain.", time: "Hier", unread: 0 },
];

export default function MessagesPage() {
    const { data: session } = useSession();
    const [selectedContact, setSelectedContact] = useState(contacts[0]);
    const [msgContent, setMsgContent] = useState("");
    const [isSending, setIsSending] = useState(false);

    const handleSend = async () => {
        if (!msgContent.trim() || !session?.user?.id) return;
        setIsSending(true);
        const res = await sendInternalMessage(session.user.id, selectedContact.id, msgContent);
        if (res.success) {
            setMsgContent("");
            // En situation réelle, on attendrait le polling ou le websocket
        }
        setIsSending(false);
    };

    return (
        <div className="max-w-[1600px] mx-auto h-[calc(100vh-180px)] flex gap-10 pb-10">
            <div className="w-1/3 flex flex-col space-y-8">
                <header className="flex items-center justify-between">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Canaux.</h1>
                    <button className="bg-slate-950 text-white p-4 rounded-2xl hover:bg-blue-600 transition-all shadow-xl">
                        <Plus className="w-5 h-5" />
                    </button>
                </header>

                <div className="flex-grow bg-white rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col overflow-hidden">
                    <div className="p-10 border-b border-slate-50 bg-slate-50/10">
                        <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Discussion, Tâche, Urgent..."
                                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-14 pr-4 text-xs font-black uppercase tracking-widest focus:ring-4 focus:ring-blue-600/5 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex-grow overflow-y-auto no-scrollbar py-6">
                        {contacts.map((contact) => (
                            <div
                                key={contact.id}
                                onClick={() => setSelectedContact(contact)}
                                className={cn(
                                    "px-10 py-8 flex items-center justify-between cursor-pointer transition-all duration-500 relative group",
                                    selectedContact.id === contact.id ? "bg-slate-50 border-r-4 border-blue-600" : "hover:bg-slate-50/50"
                                )}
                            >
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-[1.5rem] bg-white border border-slate-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform font-black text-xl shadow-sm">
                                            {contact.name.charAt(0)}
                                        </div>
                                        {contact.online && (
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full shadow-lg" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight leading-none">{contact.name}</h3>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{contact.role}</p>
                                    </div>
                                </div>
                                {contact.unread > 0 && (
                                    <span className="bg-blue-600 text-white text-[9px] font-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
                                        {contact.unread}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-grow bg-white rounded-[4rem] shadow-sm border border-slate-100 flex flex-col overflow-hidden relative">
                <header className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center text-white font-black text-xl shadow-xl">
                            {selectedContact.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{selectedContact.name}</h2>
                            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-2 flex items-center gap-2 italic leading-none">
                                <Circle className="w-2 h-2 fill-emerald-500 animate-pulse" /> Actif
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="p-4 bg-white text-slate-400 hover:text-blue-600 rounded-2xl border border-slate-50 transition-all shadow-sm"><Phone className="w-5 h-5" /></button>
                        <button className="p-4 bg-white text-slate-400 hover:text-blue-600 rounded-2xl border border-slate-50 transition-all shadow-sm"><Info className="w-5 h-5" /></button>
                    </div>
                </header>

                <div className="flex-grow overflow-y-auto no-scrollbar p-16 space-y-12 bg-slate-50/10">
                    <div className="flex gap-6 max-w-2xl">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs shrink-0">{selectedContact.name.charAt(0)}</div>
                        <div className="bg-white border border-slate-100 shadow-sm p-8 rounded-tr-[2.5rem] rounded-br-[2.5rem] rounded-bl-[2.5rem] text-sm font-semibold text-slate-700 leading-relaxed relative">
                            Bonjour, j'ai vérifié le stock pour l'hôpital Militaire. Tout est prêt pour l'expédition de 15h.
                            <span className="absolute -bottom-8 left-0 text-[9px] font-black text-slate-300 uppercase tracking-widest">10:42 AM</span>
                        </div>
                    </div>

                    <div className="flex gap-6 max-w-2xl ml-auto flex-row-reverse">
                        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-lg shadow-blue-200">ME</div>
                        <div className="bg-blue-600 p-8 rounded-tl-[2.5rem] rounded-bl-[2.5rem] rounded-br-[2.5rem] text-sm font-semibold text-white leading-relaxed relative shadow-xl shadow-blue-200/50">
                            Super, merci Thomas. Je valide le bon d'expédition immédiatement.
                            <div className="absolute -bottom-8 right-0 flex items-center gap-2">
                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">10:45 AM</span>
                                <CheckCheck className="w-4 h-4 text-blue-400" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-10 border-t border-slate-50 bg-white shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.05)]">
                    <div className="bg-slate-50 p-2 rounded-[2.5rem] border border-slate-100 flex items-center gap-4 group focus-within:ring-4 focus-within:ring-blue-600/5 transition-all">
                        <button className="p-4 text-slate-400 hover:text-blue-600 transition-colors"><Smile /></button>
                        <button className="p-4 text-slate-400 hover:text-blue-600 transition-colors border-r border-slate-200 pr-6"><Paperclip /></button>
                        <input
                            type="text"
                            value={msgContent}
                            onChange={(e) => setMsgContent(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Écrire votre message confidentiel..."
                            className="flex-grow bg-transparent border-none py-4 text-sm font-bold text-slate-900 outline-none"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isSending || !msgContent.trim()}
                            className="bg-blue-600 text-white p-5 rounded-[2rem] hover:bg-slate-900 transition-all shadow-xl shadow-blue-200 disabled:opacity-50"
                        >
                            <Send className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
