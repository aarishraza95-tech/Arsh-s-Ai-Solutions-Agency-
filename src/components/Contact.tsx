import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Mail, 
  Copy, 
  Check, 
  Send, 
  ExternalLink, 
  AlertCircle, 
  Clock, 
  ShieldCheck,
  CheckCircle2,
  Settings
} from 'lucide-react';
import { AgencyConfig, InquiryFormData } from '../types';
import { buildWhatsAppLink, buildMailtoLink, SERVICES_DATA } from '../config/agency';

interface ContactProps {
  config: AgencyConfig;
  preSelectedService?: string;
  preSelectedBudget?: string;
  onOpenConfig: () => void;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  company?: string;
  serviceId?: string;
  message?: string;
}

export const Contact: React.FC<ContactProps> = ({ 
  config, 
  preSelectedService = '', 
  preSelectedBudget = '',
  onOpenConfig
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    company: '',
    serviceId: preSelectedService || 'ai-lead-generation',
    budget: preSelectedBudget || '$2,500 – $5,000',
    timeline: 'Within 2–4 weeks',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    status: 'idle' | 'success_with_whatsapp' | 'backend_saved_and_whatsapp';
    whatsappUrl: string;
    mailtoUrl: string;
    details: string;
  }>({
    status: 'idle',
    whatsappUrl: '',
    mailtoUrl: '',
    details: ''
  });

  // Sync preSelectedService when changed from other components
  useEffect(() => {
    if (preSelectedService) {
      setFormData(prev => ({ ...prev, serviceId: preSelectedService }));
    }
  }, [preSelectedService]);

  useEffect(() => {
    if (preSelectedBudget) {
      setFormData(prev => ({ ...prev, budget: preSelectedBudget }));
    }
  }, [preSelectedBudget]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(config.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback
    }
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please provide your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid business email address.';
    }

    if (!formData.company.trim() || formData.company.trim().length < 2) {
      errs.company = 'Please provide your company name or website.';
    }

    if (!formData.serviceId) {
      errs.serviceId = 'Please select a primary service.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errs.message = 'Please provide at least 15 characters detailing your operational goals.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const serviceName = SERVICES_DATA.find(s => s.id === formData.serviceId)?.title || formData.serviceId;

    // Structured message template for WhatsApp
    const structuredMessage = 
`*NEW CLIENT INQUIRY — ${config.agencyName}*

• *Name:* ${formData.fullName.trim()}
• *Email:* ${formData.email.trim()}
• *Company:* ${formData.company.trim()}
• *Service Required:* ${serviceName}
• *Target Budget:* ${formData.budget}
• *Timeline:* ${formData.timeline}

*Automation Goals / Scope:*
${formData.message.trim()}

---
_Dispatched via official agency inquiry portal_`;

    const whatsAppUrl = buildWhatsAppLink(config.whatsappNumber, structuredMessage);
    const mailtoSubject = `Inquiry: ${serviceName} — ${formData.company.trim()}`;
    const mailtoUrl = buildMailtoLink(config.email, mailtoSubject, structuredMessage);

    let backendSaved = false;

    // Attempt to post to backend /api/inquiry (real server route if available)
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          serviceName,
          submittedAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        backendSaved = true;
      }
    } catch {
      // Backend not running or in preview sandbox — will use WhatsApp/Mailto direct dispatch
      backendSaved = false;
    }

    // Also dispatch to optional webhook URL if user configured Formspree/Make
    if (config.webhookUrl) {
      try {
        await fetch(config.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } catch {
        // Handled silently
      }
    }

    setIsSubmitting(false);

    setSubmissionResult({
      status: backendSaved ? 'backend_saved_and_whatsapp' : 'success_with_whatsapp',
      whatsappUrl: whatsAppUrl,
      mailtoUrl: mailtoUrl,
      details: `${formData.fullName.trim()} from ${formData.company.trim()}`
    });
  };

  const directChatWhatsAppUrl = buildWhatsAppLink(
    config.whatsappNumber,
    `Hi ${config.ownerName}, I would like to schedule an exploratory discussion regarding AI automation for my business.`
  );

  return (
    <section id="contact" className="py-20 lg:py-28 border-b border-slate-800/80 bg-[#080B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
            <span>Direct Communication</span>
            <span aria-hidden="true">·</span>
            <span>Zero Fluff</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Start Your Automation Engineering Engagement
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Reach out directly to Arsh. Every inquiry is reviewed by our lead technical architects—not delegated to sales reps or simulated bots. We will assess technical feasibility and respond with a concrete roadmap.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Left Column: Direct Channels & SLA */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Channel: WhatsApp Click-to-Chat */}
            <div className="p-6 sm:p-8 rounded-2xl border border-emerald-900/60 bg-[#0B1515]/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    <MessageCircle className="w-4 h-4" />
                    <span>Real-Time Priority Channel</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-300">Active</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  Direct WhatsApp Consultation
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Skip email delays. Message Arsh directly for immediate response regarding technical architecture, project scope, and availability.
                </p>

                <div className="space-y-2 text-xs text-slate-300 mb-6 pb-6 border-b border-emerald-900/40">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Direct Number:</span>
                    <span className="font-mono text-white font-medium">{config.whatsappDisplay}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Response SLA:</span>
                    <span className="text-emerald-300 font-medium">{config.responseSla}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Operating Hours:</span>
                    <span className="text-slate-300">{config.operatingHours}</span>
                  </div>
                </div>
              </div>

              <a
                href={directChatWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Chat Directly</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Email Contact Card */}
            <div className="p-6 rounded-2xl border border-slate-800 bg-[#0B0F1E] space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider">
                <Mail className="w-4 h-4" />
                <span>Executive Email Inquiries</span>
              </div>

              <div className="text-xs text-slate-300">
                For detailed RFPs, architecture documents, or NDA requests:
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="font-mono text-xs text-white truncate max-w-[220px]">
                  {config.email}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={`mailto:${config.email}?subject=Enterprise%20AI%20Automation%20Inquiry`}
                className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 hover:underline pt-1"
              >
                <span>Launch default email client</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Agency Owner Setting Quick Action */}
            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <span>Agency Administrator?</span>
              <button
                type="button"
                onClick={onOpenConfig}
                className="inline-flex items-center gap-1 text-slate-300 hover:text-purple-300 underline cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Configure Agency Contact Info</span>
              </button>
            </div>

          </div>

          {/* Right Column: Customer Inquiry Form with Real Validation */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-[#0B0F1E] shadow-xl">
              <div className="mb-6 pb-6 border-b border-slate-800">
                <h3 className="text-xl font-bold text-white mb-1">
                  Structured Project Intake Form
                </h3>
                <p className="text-xs text-slate-400">
                  Fill in your requirements below. Our system validates your details and prepares an instant, direct dispatch via WhatsApp and Email so no lead is ever lost.
                </p>
              </div>

              {/* Submission Result / WhatsApp Fallback Prompt */}
              {submissionResult.status !== 'idle' ? (
                <div className="p-6 rounded-xl border border-purple-800/80 bg-purple-950/30 mb-6 space-y-4 animate-in fade-in">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {submissionResult.status === 'backend_saved_and_whatsapp'
                          ? 'Inquiry Logged & Formatted'
                          : 'Inquiry Formatted For Immediate Delivery'}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        To guarantee zero message drop and immediate attention, dispatch your structured briefing directly to Arsh via WhatsApp or your email client:
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                    <a
                      href={submissionResult.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send to WhatsApp Now ({config.whatsappDisplay})</span>
                    </a>

                    <a
                      href={submissionResult.mailtoUrl}
                      className="px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open Pre-Filled Email</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmissionResult({ status: 'idle', whatsappUrl: '', mailtoUrl: '', details: '' })}
                    className="text-[11px] text-slate-400 hover:text-slate-200 underline pt-1 block"
                  >
                    Edit inquiry or submit another project
                  </button>
                </div>
              ) : null}

              {/* Main Form */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Full Name <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. David Vance"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.fullName 
                          ? 'border-rose-500 focus:border-rose-500' 
                          : 'border-slate-800 focus:border-purple-500'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Business Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Work Email <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.email 
                          ? 'border-rose-500 focus:border-rose-500' 
                          : 'border-slate-800 focus:border-purple-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Company / Website <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Corp / acme.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        errors.company 
                          ? 'border-rose-500 focus:border-rose-500' 
                          : 'border-slate-800 focus:border-purple-500'
                      }`}
                    />
                    {errors.company && (
                      <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.company}</span>
                      </p>
                    )}
                  </div>

                  {/* Service Needed */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Required Service <span className="text-purple-400">*</span>
                    </label>
                    <select
                      value={formData.serviceId}
                      onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
                    >
                      <option value="ai-lead-generation">01. AI Lead Generation</option>
                      <option value="ai-appointment-automation">02. AI Appointment Automation</option>
                      <option value="ai-customer-support">03. AI Customer Support</option>
                      <option value="business-process-automation">04. Business Process Automation</option>
                      <option value="custom-ai-solutions">05. Custom AI Solutions</option>
                      <option value="starter-package">Package: Starter Automation ($1,450)</option>
                      <option value="growth-package">Package: Growth Engine ($3,250)</option>
                      <option value="enterprise-package">Package: Custom Enterprise</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Estimated Budget (USD)
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
                    >
                      <option value="Under $2,000">Under $2,000</option>
                      <option value="$2,000 – $5,000">$2,000 – $5,000</option>
                      <option value="$5,000 – $10,000">$5,000 – $10,000</option>
                      <option value="$10,000+">$10,000+ (Enterprise Scope)</option>
                    </select>
                  </div>

                  {/* Target Timeline */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Target Deployment Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
                    >
                      <option value="Immediate (1–2 weeks)">Immediate (1–2 weeks)</option>
                      <option value="Within 30 days">Within 30 days</option>
                      <option value="Next quarter (1–3 months)">Next quarter (1–3 months)</option>
                    </select>
                  </div>
                </div>

                {/* Message / Project Brief */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Operational Bottlenecks & Automation Goals <span className="text-purple-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your current manual workflow (e.g. 'We spend 20 hours a week answering repetitive client emails and manually updating our HubSpot CRM from web forms...')"
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.message 
                        ? 'border-rose-500 focus:border-rose-500' 
                        : 'border-slate-800 focus:border-purple-500'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                  <p className="mt-1 text-[11px] text-slate-400">
                    Min 15 characters. Technical details will remain strictly confidential.
                  </p>
                </div>

                {/* Submit button with honest dual-flow explanation */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Validating and Preparing Dispatch...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Project Briefing</span>
                      </>
                    )}
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                    <span>Includes immediate WhatsApp priority link + Email backup. No spam.</span>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
