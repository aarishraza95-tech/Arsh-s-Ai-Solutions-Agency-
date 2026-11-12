import React, { useState } from 'react';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';

type ChatMessage = { role: 'user' | 'assistant'; text: string };

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', text: "Hi! I'm the ARSH'S AI SOLUTION AGENCY assistant. I can explain our services and help you request a consultation. What would you like to automate?" }
  ]);

  async function sendMessage(event: React.FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    const next = [...messages, { role: 'user' as const, text }];
    setMessages(next);
    setInput('');
    setBusy(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-12).map(item => ({ role: item.role, content: item.text })) })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'The assistant is temporarily unavailable.');
      setMessages(current => [...current, { role: 'assistant', text: data.reply }]);
    } catch (error) {
      setMessages(current => [...current, { role: 'assistant', text: error instanceof Error ? error.message : 'Please try again in a moment.' }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[100] font-sans">
      {open && (
        <section className="mb-3 flex h-[min( min(640px, calc(100dvh - 110px)), 560px)] w-[min(360px,calc(100vw - 32px))] flex-col overflow-hidden rounded-2xl border border-slate-700 bg-[#0D1424] shadow-2xl" aria-label="AI chat">
          <header className="flex items-center justify-between border-b border-slate-700 bg-[#111C31] p-4">
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-purple-600 p-2"><Bot size={20} /></span>
              <div><p className="font-semibold text-white">AI Assistant</p><p className="text-xs text-emerald-400">Here to help · Online</p></div>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-lg p-2 text-slate-300 hover:bg-slate-700" aria-label="Close chat"><X size={20} /></button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {messages.map((message, index) => (
              <div key={index} className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-6 ${message.role === 'user' ? 'ml-auto bg-purple-600 text-white' : 'bg-slate-800 text-slate-100'}`}>
                {message.text}
              </div>
            ))}
            {busy && <div className="flex items-center gap-2 text-xs text-slate-400"><Loader2 size={14} className="animate-spin" /> Thinking…</div>}
          </div>
          <form onSubmit={sendMessage} className="flex gap-2 border-t border-slate-700 p-3">
            <input value={input} onChange={event => setInput(event.target.value)} placeholder="Ask about our services…" maxLength={1000} className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-white outline-none focus:border-purple-500" />
            <button disabled={busy || !input.trim()} className="rounded-xl bg-purple-600 px-3 text-white disabled:opacity-50" aria-label="Send message"><Send size={18} /></button>
          </form>
        </section>
      )}
      <button onClick={() => setOpen(value => !value)} className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-white shadow-xl shadow-purple-950/40 transition hover:scale-105" aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}>
        {open ? <X size={24} /> : <MessageCircle size={25} />}
      </button>
    </div>
  );
}
