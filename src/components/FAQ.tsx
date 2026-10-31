import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_DATA, buildWhatsAppLink } from '../config/agency';
import { AgencyConfig } from '../types';

interface FAQProps {
  config: AgencyConfig;
}

export const FAQ: React.FC<FAQProps> = ({ config }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const whatsappQuestionUrl = buildWhatsAppLink(
    config.whatsappNumber,
    `Hello ${config.ownerName}, I have a specific question about your AI automation services that wasn't in the FAQ.`
  );

  return (
    <section id="faq" className="py-20 lg:py-28 border-b border-slate-800/80 bg-[#080B14]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
            <span>Client Questions</span>
            <span aria-hidden="true">·</span>
            <span>Technical Clarity</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Straightforward answers regarding our engineering standards, deployment timelines, enterprise security, and ongoing system maintenance.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 text-left">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="rounded-xl border border-slate-800 bg-[#0B0F1E] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white leading-snug">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-purple-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-850 pt-4">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Unanswered Question Hook */}
        <div className="mt-12 p-6 rounded-xl border border-slate-800 bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
          <div>
            <div className="text-sm font-bold text-white">Have a specific question not addressed here?</div>
            <div className="text-xs text-slate-400">Ask Arsh directly on WhatsApp for an unvarnished technical assessment.</div>
          </div>
          <a
            href={whatsappQuestionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Ask On WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
