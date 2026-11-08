import React, { useMemo, useState } from 'react';
import { Bot, CalendarDays, Clock, Mail, MapPin, MessageCircle, Send, ShieldCheck, Stethoscope, User, Loader2 } from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string };

const treatments = ['Teeth Cleaning', 'Tooth Extraction', 'Root Canal (RCT)', 'Braces', 'Dental Implants', 'Teeth Whitening'];

export default function RudraDentalPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Namaste! Welcome to Rudra Dental Clinic, Rudrapur. I'm the clinic's virtual assistant. I can share general information about our listed treatments and help you prepare an appointment request. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatError, setChatError] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [treatment, setTreatment] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [requestReady, setRequestReady] = useState(false);

  const minDate = useMemo(() => {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }, []);

  async function sendMessage(textOverride?: string) {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;
    const next = [...messages, { role: 'user' as const, content: text }];
    setMessages(next);
    setInput('');
    setChatError('');
    setLoading(true);
    try {
      const response = await fetch('/api/rudra-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-10) })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'The assistant is temporarily unavailable.');
      setMessages(current => [...current, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setChatError(error instanceof Error ? error.message : 'Please try again shortly.');
    } finally {
      setLoading(false);
    }
  }

  function prepareAppointment(event: React.FormEvent) {
    event.preventDefault();
    if (!patientName.trim() || !/^[+0-9()\s-]{8,18}$/.test(patientPhone.trim()) || !treatment || !preferredDate || !preferredTime) return;
    const subject = 'Appointment request - Rudra Dental Clinic';
    const body = [
      'New appointment request for Rudra Dental Clinic',
      '',
      'Patient name: ' + patientName.trim(),
      'Phone: ' + patientPhone.trim(),
      'Treatment requested: ' + treatment,
      'Preferred date: ' + preferredDate,
      'Preferred time: ' + preferredTime,
      '',
      'Please contact the patient to confirm availability. This is a request, not a confirmed appointment.'
    ].join('\n');
    window.location.href = 'mailto:kassararsh24@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    setRequestReady(true);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-700"><Stethoscope size={25} /></div>
            <div><p className="text-lg font-extrabold tracking-tight">Rudra Dental Clinic</p><p className="text-xs text-slate-500">AI Patient Assistant</p></div>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">Virtual assistant</span>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-7 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:py-10">
        <section className="space-y-5">
          <div className="rounded-3xl bg-gradient-to-br from-cyan-900 to-blue-800 p-6 text-white shadow-lg sm:p-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Dental care • Rudrapur</p>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">A simpler way to ask about your dental visit.</h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-blue-100">Ask general questions about the clinic's listed treatments or prepare an appointment request. The clinic team must confirm availability.</p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm text-blue-50">
              <span className="flex items-center gap-2"><MapPin size={16}/> Rudrapur, Uttarakhand</span>
              <span className="flex items-center gap-2"><Clock size={16}/> 10:00 AM – 8:00 PM</span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold">Treatments listed by the clinic</h2>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {treatments.map(item => <div key={item} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-3 text-sm font-medium"><ShieldCheck size={16} className="text-cyan-700"/>{item}</div>)}
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500">Treatment suitability, fees and clinical advice must be confirmed directly by the dentist.</p>
          </div>
        </section>

        <section className="space-y-5">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 bg-slate-900 px-5 py-4 text-white">
              <div className="rounded-xl bg-cyan-500/20 p-2 text-cyan-200"><Bot size={22}/></div>
              <div><h2 className="font-bold">Chat with the clinic assistant</h2><p className="text-xs text-slate-300">General information and appointment help</p></div>
            </div>
            <div className="flex h-[390px] flex-col">
              <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4" aria-live="polite">
                {messages.map((message, index) => <div key={index} className={'flex ' + (message.role === 'user' ? 'justify-end' : 'justify-start')}>
                  <div className={'max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-6 ' + (message.role === 'user' ? 'bg-cyan-800 text-white' : 'border border-slate-200 bg-white text-slate-800')}>
                    {message.content}
                  </div>
                </div>)}
                {loading && <div className="flex items-center gap-2 text-sm text-slate-500"><Loader2 size={16} className="animate-spin"/> Preparing a reply…</div>}
                {chatError && <p className="rounded-xl bg-amber-50 p-3 text-xs text-amber-800">{chatError}</p>}
              </div>
              <div className="border-t border-slate-200 bg-white p-3">
                <div className="mb-2 flex flex-wrap gap-2">
                  {['What treatments are available?', 'How do I request an appointment?', 'What are the clinic hours?'].map(q => <button key={q} type="button" onClick={() => sendMessage(q)} disabled={loading} className="rounded-full border border-cyan-200 px-3 py-1.5 text-xs font-medium text-cyan-900 hover:bg-cyan-50 disabled:opacity-50">{q}</button>)}
                </div>
                <form onSubmit={event => { event.preventDefault(); void sendMessage(); }} className="flex gap-2">
                  <input value={input} onChange={event => setInput(event.target.value)} placeholder="Type your question…" className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-cyan-700" aria-label="Type your question"/>
                  <button type="submit" disabled={loading || !input.trim()} className="rounded-xl bg-cyan-800 px-4 text-white disabled:opacity-40" aria-label="Send message"><Send size={18}/></button>
                </form>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2"><CalendarDays className="text-cyan-800"/><h2 className="text-lg font-bold">Request an appointment</h2></div>
            <p className="mt-1 text-sm text-slate-500">Share your preferred slot. The clinic must confirm it before it is booked.</p>
            <form onSubmit={prepareAppointment} className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-medium">Patient name<input required value={patientName} onChange={e => setPatientName(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-3 font-normal outline-none focus:border-cyan-700" placeholder="Your name"/></label>
              <label className="text-sm font-medium">Mobile number<input required inputMode="tel" value={patientPhone} onChange={e => setPatientPhone(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-3 font-normal outline-none focus:border-cyan-700" placeholder="Phone number"/></label>
              <label className="text-sm font-medium sm:col-span-2">Treatment<select required value={treatment} onChange={e => setTreatment(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 font-normal outline-none focus:border-cyan-700"><option value="">Select a treatment</option>{treatments.map(item => <option key={item}>{item}</option>)}</select></label>
              <label className="text-sm font-medium">Preferred date<input required type="date" min={minDate} value={preferredDate} onChange={e => setPreferredDate(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-3 font-normal outline-none focus:border-cyan-700"/></label>
              <label className="text-sm font-medium">Preferred time<select required value={preferredTime} onChange={e => setPreferredTime(e.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 font-normal outline-none focus:border-cyan-700"><option value="">Select a time</option>{['10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM'].map(item => <option key={item}>{item}</option>)}</select></label>
              <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-cyan-800 px-4 py-3 text-sm font-bold text-white hover:bg-cyan-900 sm:col-span-2"><Mail size={17}/> Prepare email request</button>
            </form>
            {requestReady && <p className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800">Your email app should open with the request. Review it and press Send. The appointment is not confirmed until the clinic replies.</p>}
            <p className="mt-3 text-xs leading-5 text-slate-500">Your details are placed into an email draft addressed to the clinic admin. They are not automatically sent or stored by this page. Please share only the details needed for an appointment request.</p>
          </div>
        </section>
      </main>
      <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center text-xs text-slate-500">Rudra Dental Clinic • Rudrapur, Uttarakhand • 10 AM–8 PM<br/>This assistant provides general information only, not diagnosis or medical advice.</footer>
    </div>
  );
}
