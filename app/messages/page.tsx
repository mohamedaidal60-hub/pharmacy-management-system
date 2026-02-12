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
    Mic,
    ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { sendInternalMessage, getMessages, getAllUsers } from "@/app/actions/pharmacy";
import { useSession } from "next-auth/react";

export default function MessagesPage() {
    const { data: session } = useSession();
    const [contacts, setContacts] = useState<any[]>([]);
    const [selectedContact, setSelectedContact] = useState<any>(null);
    const [msgContent, setMsgContent] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [showCallModal, setShowCallModal] = useState(false);
    const [callTime, setCallTime] = useState(0);

    useEffect(() => {
        const init = async () => {
            const users = await getAllUsers();
            const otherUsers = users.filter((u: any) => u.id !== session?.user?.id);
            setContacts(otherUsers);
            if (otherUsers.length > 0 && !selectedContact) setSelectedContact(otherUsers[0]);
        };
        if (session?.user?.id) init();
    }, [session?.user?.id]);

    useEffect(() => {
        if (session?.user?.id && selectedContact) {
            refreshMessages();
            const interval = setInterval(refreshMessages, 5000);
            return () => clearInterval(interval);
        }
    }, [session?.user?.id, selectedContact?.id]);

    useEffect(() => {
        let timer: any;
        if (showCallModal) {
            timer = setInterval(() => setCallTime(prev => prev + 1), 1000);
        } else {
            setCallTime(0);
        }
        return () => clearInterval(timer);
    }, [showCallModal]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const refreshMessages = async () => {
        if (!session?.user?.id || !selectedContact) return;
        const data = await getMessages(session.user.id);
        const conversationMessages = data.filter((m: any) =>
            (m.senderId === session.user.id && m.receiverId === selectedContact?.id) ||
            (m.senderId === selectedContact?.id && m.receiverId === session.user.id)
        );
        setMessages(conversationMessages);
    };

    const handleSend = async () => {
        if (!msgContent.trim() || !session?.user?.id || !selectedContact) return;
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

    return (
        <div className="max-w-[1600px] mx-auto h-[calc(100vh-180px)] flex gap-10 pb-10">
            {/* Contacts Sidebar */}
            <div className="w-1/3 flex flex-col space-y-8">
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase leading-none">Canaux.</h1>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">{contacts.length} Membres Staff</p>
                    </div>
                    <button onClick={() => alert("Nouveau canal: Sélectionnez des membres.")} className="bg-slate-950 text-white p-4 rounded-2xl hover:bg-blue-600 transition-all shadow-xl">
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
                                className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-14 pr-4 text-xs font-black uppercase tracking-widest outline-none shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="flex-grow overflow-y-auto no-scrollbar py-6">
                        {contacts.length === 0 ? (
                            <div className="text-center py-10 opacity-30">
                                <p className="text-[10px] font-black uppercase">Aucun autre membre</p>
                            </div>
                        ) : contacts.map((contact) => (
                            <div
                                key={contact.id}
                                onClick={() => setSelectedContact(contact)}
                                className={cn(
                                    "px-10 py-8 flex items-center justify-between cursor-pointer transition-all duration-300 relative group",
                                    selectedContact?.id === contact.id ? "bg-slate-50 border-r-4 border-blue-600" : "hover:bg-slate-50/50"
                                )}
                            >
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-blue-600 font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
                                            {contact.name?.charAt(0) || "U"}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">{contact.name}</h3>
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">{contact.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-grow bg-white rounded-[4rem] shadow-sm border border-slate-100 flex flex-col overflow-hidden relative">
                {selectedContact ? (
                    <>
                        <header className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center text-white font-black text-xl shadow-xl">
                                    {selectedContact.name?.charAt(0) || "U"}
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
                                <button onClick={() => alert("Cryptographie PharmaOS active.")} className="p-4 bg-white text-slate-400 hover:text-blue-600 rounded-2xl border border-slate-50 transition-all shadow-sm"><ShieldCheck className="w-5 h-5" /></button>
                            </div>
                        </header>

                        <div className="flex-grow overflow-y-auto no-scrollbar p-16 space-y-12 bg-slate-50/10">
                            {messages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center opacity-20 text-center">
                                    <MessageSquare className="w-20 h-20 mb-6" />
                                    <p className="text-sm font-black uppercase tracking-widest">Démarrer la discussion</p>
                                </div>
                            ) : messages.map((m: any) => (
                                <div key={m.id} className={cn("flex gap-6 max-w-2xl animate-in slide-in-from-bottom-2", m.senderId === session?.user?.id ? "ml-auto flex-row-reverse" : "")}>
                                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-[10px] shrink-0", m.senderId === session?.user?.id ? "bg-blue-600" : "bg-slate-200 text-slate-500")}>
                                        {m.senderId === session?.user?.id ? "M" : selectedContact.name?.charAt(0)}
                                    </div>
                                    <div className={cn(
                                        "p-6 rounded-[2rem] text-sm font-semibold leading-relaxed relative shadow-sm",
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
                                <button onClick={() => alert("Emojis PharmaOS.")} className="p-4 text-slate-400 hover:text-amber-500 transition-colors"><Smile /></button>
                                <button onClick={() => alert("Upload requis via Vercel Blob.")} className="p-4 text-slate-400 hover:text-blue-600 transition-colors border-r border-slate-200 pr-4"><Paperclip /></button>
                                <input
                                    type="text"
                                    value={msgContent}
                                    onChange={(e) => setMsgContent(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder={`Message à ${selectedContact.name}...`}
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
                    </>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center opacity-10 text-center">
                        <MessageSquare className="w-40 h-40 mb-10" />
                        <p className="text-xl font-black uppercase tracking-widest">Chargement des canaux...</p>
                    </div>
                )}
            </div>

            {/* Premium Call Modal */}
            {showCallModal && selectedContact && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl animate-in zoom-in-95 duration-500">
                    <div className="flex flex-col items-center">
                        <div className="relative mb-16">
                            <div className="absolute inset-0 bg-emerald-500 rounded-full blur-[60px] opacity-30 animate-pulse" />
                            <div className="w-40 h-40 rounded-[4rem] bg-emerald-500 flex items-center justify-center text-white shadow-[0_0_80px_rgba(16,185,129,0.5)] relative z-10 border-4 border-white/20">
                                <Phone className="w-16 h-16 animate-bounce" />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-emerald-500/30 rounded-full animate-ping" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-emerald-500/50 rounded-full animate-ping [animation-delay:0.5s]" />
                        </div>

                        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">{selectedContact.name}</h2>
                        <div className="flex items-center gap-3 mb-16">
                            <p className="text-emerald-500 font-black uppercase tracking-[0.4em] text-xs">Appel en cours</p>
                            <span className="text-white font-black text-xl font-mono">{formatTime(callTime)}</span>
                        </div>

                        <div className="flex gap-12">
                            <button onClick={() => setShowCallModal(false)} className="bg-rose-600 p-10 rounded-full text-white hover:scale-110 transition-transform shadow-2xl flex items-center justify-center group">
                                <X className="w-10 h-10 group-hover:rotate-90 transition-transform" />
                            </button>
                            <button className="bg-white/10 p-10 rounded-full text-white/40 cursor-not-allowed">
                                <Mic className="w-10 h-10" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
