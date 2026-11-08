import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

type ChatMessage = { role: 'user' | 'assistant'; text: string };

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', text: "Hi! I'm the ARSH'S AI SOLUTION AGENCY assistant. I can explain our AI automation services and help you start an enquiry. What would you like to automate?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function sendMessage(event: React.FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: 'user' as const, text }];
    setMessages(next);
    setInput('');
    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-12).map(({ role, text }) => ({ role, content: text })) })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'The assistant is temporarily unavailable.');
      setMessages(current => [...current, { role: 'assistant', text: data.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[100] font-sans">
      {open && (
        <section className="mb-3 flex h-[min( min(  min(  620px, 78vh), 78vh), 78vh)] w-[min( calc(100vw-2.5rem), 390px)] flex-col overflow-hidden rounded-2xl border border-purple-400/30 bg-[#0c1222] shadow-2xl shadow-black/50" aria-label="AI chat">
          <header className="flex items-center justify-between bg-gradient-to-r from-indigo-700 to-purple-700 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-white/15 p-2"><Bot size={20} /></div>
              <div><p className="font-semibold text-white">Agency AI Assistant</p><p className="text-xs text-purple-100">Ask about services & enquiries</p></div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-lg p-2 text-white hover:bg-white/15"><X size={20} /></button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {messages.map((message, index) => (
              <div key={index} className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'assistant' && <span className="mt-1 h-fit rounded-full bg-purple-500/20 p-2 text-purple-200"><Bot size={15} /></span>}
                <p className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed ${message.role === 'user' ? 'bg-indigo-600 text-white' : 'border border-white/10 bg-white/5 text-slate-100'}`}>{message.text}</p>
                {message.role === 'user' && <span className="mt-1 h-fit rounded-full bg-indigo-500/20 p-2 text-indigo-200"><User size={15} /></span>}
              </div>
            ))}
            {loading && <div className="flex items-center gap-2 text-sm text-slate-300"><Loader2 size={16} className="animate-spin" /> Thinking…</div>}
            {error && <p className="rounded-lg border border-amber-400/30 bg-amber-400/10 p-2 text-xs text-amber-100">{error}</p>}
          </div>
          <form onSubmit={sendMessage} className="flex gap-2 border-t border-white/10 p-3">
            <input value={input} onChange={event => setInput(event.target.value)} placeholder="Type your message…" aria-label="Your message" className="min-w-0 flex-1 rounded-xl border border-white/15 bg-[#111a2d] px-3 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-purple-400" />
            <button disabled={loading || !input.trim()} aria-label="Send message" className="rounded-xl bg-purple-600 px-3 text-white disabled:opacity-40"><Send size={18} /></button>
          </form>
          <p className="px-3 pb-2 text-center text-[10px] text-slate-500">AI can make mistakes. Please confirm important details with our team.</p>
        </section>
      )}
      <button onClick={() => setOpen(value => !value)} aria-label={open ? 'Close chat' : 'Open AI chat'} className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl shadow-purple-950/50 transition hover:scale-105">
        {open ? <X size={24} /> : <MessageCircle size={25} />}
      </button>
    </div>
  );
}
