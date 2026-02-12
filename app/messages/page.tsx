"use client";

import { useState, useEffect } from "react";
import {
    Search,
    Plus,
    Send,
    Paperclip,
    Smile,
    CheckCheck,
    Circle,
    Phone,
    Info,
    ChevronRight,
    MessageSquare,
    X,
    Image as ImageIcon,
    FileText,
    Mic
} from "lucide-react";
import { cn } from "@/lib/utils";
import { sendInternalMessage, getMessages } from "@/app/actions/pharmacy";
import { useSession } from "next-auth/react";

const contacts = [
    { id: "admin_user", name: "Anis Admin", role: "Administrateur", online: true, lastMsg: "Bienvenue sur PharmaOS", time: "10:00", unread: 0 },
    { id: "1", name: "Marie Laurent", role: "Pharmacien Chef", online: true, lastMsg: "Stock Doliprane validé.", time: "10:45", unread: 1 },
];

export default function MessagesPage() {
    const { data: session } = useSession();
    const [selectedContact, setSelectedContact] = useState(contacts[0]);
    const [msgContent, setMsgContent] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [showCallModal, setShowCallModal] = useState(false);

    useEffect(() => {
        if (session?.user?.id) {
            refreshMessages();
        }
    }, [session?.user?.id]);

    const refreshMessages = async () => {
        if (!session?.user?.id) return;
        const data = await getMessages(session.user.id);
        setMessages(data);
    };

    const handleSend = async () => {
        if (!msgContent.trim() || !session?.user?.id) return;
        setIsSending(true);
        const res = await sendInternalMessage(session.user.id, selectedContact.id, msgContent);
        if (res.success) {
            setMsgContent("");
            refreshMessages();
        } else {
            alert(res.error);
        }
        setIsSending(false);
    };

    const handleAction = (name: string) => {
        alert(`Action "${name}" : Module de stockage cloud requis.`);
    };

    return (
        <div className="max-w-[1600px] mx-auto h-[calc(100vh-180px)] flex gap-10 pb-10">
            {/* Contacts Sidebar */}
            <div className="w-1/3 flex flex-col space-y-8">
                <header className="flex items-center justify-between">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Canaux.</h1>
                    <button onClick={() => alert("Nouveau canal: Sélectionnez des membres dans les réglages.")} className="bg-slate-950 text-white p-4 rounded-2xl hover:bg-blue-600 transition-all shadow-xl">
                        <Plus className="w-5 h-5" />
                    </button>
                </header>

                <div className="flex-grow bg-white rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col overflow-hidden">
                    <div className="p-10 border-b border-slate-50 bg-slate-50/10">
                        <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Rechercher staff..."
                                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-14 pr-4 text-xs font-black uppercase tracking-widest outline-none"
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
                                    selectedContact.id === contact.id ? "bg-slate-50 border-r-4 border-blue-600 shadow-inner" : "hover:bg-slate-50/50"
                                )}
                            >
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-[1.5rem] bg-white border border-slate-100 flex items-center justify-center text-blue-600 font-black text-xl shadow-sm">
                                            {contact.name.charAt(0)}
                                        </div>
                                        {contact.online && (
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full shadow-lg" />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">{contact.name}</h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{contact.role}</p>
                                        </div>
                                    </div>
                                </div>
                                {contact.unread > 0 && (
                                    <span className="bg-blue-600 text-white text-[9px] font-black w-6 h-6 rounded-full flex items-center justify-center">
                                        {contact.unread}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-grow bg-white rounded-[4rem] shadow-sm border border-slate-100 flex flex-col overflow-hidden relative">
                <header className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center text-white font-black text-xl shadow-xl">
                            {selectedContact.name.charAt(0)}
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{selectedContact.name}</h2>
                            <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mt-2 flex items-center gap-2 italic">
                                <Circle className="w-2 h-2 fill-emerald-500 animate-pulse" /> Crypté de bout en bout
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setShowCallModal(true)} className="p-4 bg-white text-slate-400 hover:text-emerald-500 rounded-2xl border border-slate-50 transition-all shadow-sm"><Phone className="w-5 h-5" /></button>
                        <button onClick={() => alert("Informations du profil confidentielles.")} className="p-4 bg-white text-slate-400 hover:text-blue-600 rounded-2xl border border-slate-50 transition-all shadow-sm"><Info className="w-5 h-5" /></button>
                    </div>
                </header>

                <div className="flex-grow overflow-y-auto no-scrollbar p-16 space-y-12 bg-slate-50/10">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
                            <MessageSquare className="w-20 h-20 mb-6" />
                            <p className="text-sm font-black uppercase tracking-widest">Aucun message échangé</p>
                        </div>
                    ) : messages.map((m: any) => (
                        <div key={m.id} className={cn("flex gap-6 max-w-2xl", m.senderId === session?.user?.id ? "ml-auto flex-row-reverse" : "")}>
                            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-xs shrink-0", m.senderId === session?.user?.id ? "bg-blue-600" : "bg-slate-200 text-slate-500")}>
                                {m.senderId === session?.user?.id ? "MOI" : "LUI"}
                            </div>
                            <div className={cn(
                                "p-8 rounded-[2.5rem] text-sm font-semibold leading-relaxed relative shadow-sm",
                                m.senderId === session?.user?.id ? "bg-blue-600 text-white rounded-tr-none" : "bg-white border border-slate-100 text-slate-700 rounded-tl-none"
                            )}>
                                {m.content}
                                <span className={cn("absolute -bottom-8 text-[8px] font-black uppercase tracking-widest text-slate-300", m.senderId === session?.user?.id ? "right-0" : "left-0")}>
                                    {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-10 border-t border-slate-50 bg-white">
                    <div className="bg-slate-50 p-2 rounded-[2.5rem] border border-slate-100 flex items-center gap-2 group focus-within:ring-4 focus-within:ring-blue-600/5 transition-all">
                        <button onClick={() => alert("Emoji Picker: Module requis.")} className="p-4 text-slate-400 hover:text-amber-500 transition-colors"><Smile /></button>
                        <button onClick={() => alert("Attachments: Configuration Vercel Blob requise.")} className="p-4 text-slate-400 hover:text-blue-600 transition-colors border-r border-slate-200 pr-4"><Paperclip /></button>
                        <input
                            type="text"
                            value={msgContent}
                            onChange={(e) => setMsgContent(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Tapez votre message ici..."
                            className="flex-grow bg-transparent border-none py-4 px-4 text-sm font-bold text-slate-900 outline-none"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isSending || !msgContent.trim()}
                            className="bg-blue-600 text-white p-5 rounded-[2rem] hover:bg-slate-900 transition-all shadow-xl disabled:opacity-50"
                        >
                            <Send className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Call Modal */}
            {showCallModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl animate-in zoom-in-95">
                    <div className="flex flex-col items-center">
                        <div className="w-32 h-32 rounded-[3.5rem] bg-emerald-500 flex items-center justify-center text-white mb-10 animate-pulse shadow-[0_0_80px_rgba(16,185,129,0.4)]">
                            <Phone className="w-12 h-12" />
                        </div>
                        <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">Appel Voix IP</h2>
                        <p className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[10px] mb-12">Connexion sécurisée en cours...</p>
                        <div className="flex gap-8">
                            <button onClick={() => setShowCallModal(false)} className="bg-rose-600 p-8 rounded-full text-white hover:scale-110 transition-transform"><X className="w-8 h-8" /></button>
                            <button className="bg-white/10 p-8 rounded-full text-white opacity-20 cursor-not-allowed"><Mic className="w-8 h-8" /></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
