import React from 'react';
import { ArrowRight, MessageCircle, CheckCircle2, ShieldCheck, Zap, Clock } from 'lucide-react';
import { AgencyConfig } from '../types';
import { buildWhatsAppLink } from '../config/agency';

interface HeroProps {
  config: AgencyConfig;
  onExploreServices: () => void;
  onBookConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onExploreServices, onBookConsultation }) => {
  const quickWhatsAppUrl = buildWhatsAppLink(
    config.whatsappNumber,
    `Hello ${config.ownerName}, I visited ${config.agencyName} and would like to discuss an AI automation system for my business.`
  );

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/80">
      {/* Background ambient gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-purple-950/25 via-indigo-950/10 to-transparent pointer-events-none -z-10 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Primary Action */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Clean unboxed kicker with subtle separator - NO PILL */}
            <div className="flex items-center gap-2 text-xs font-medium text-purple-400 mb-4 tracking-wider uppercase">
              <span>Production AI Automation</span>
              <span aria-hidden="true">·</span>
              <span>Enterprise Systems</span>
              <span aria-hidden="true">·</span>
              <span>Measurable ROI</span>
            </div>

            {/* Headline with text-wrap: balance */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 [text-wrap:balance]">
              Automate Your Business. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-white">Grow Faster.</span>
            </h1>

            {/* Clear service introduction prose */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal">
              We engineer custom AI automation infrastructure that eliminates manual administrative bottlenecks, qualifies high-intent leads 24/7, and accelerates client acquisition. Real production workflows built for serious businesses.
            </p>

            {/* Action buttons: Single-line controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-8">
              <button
                onClick={onBookConsultation}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-all shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Schedule Discovery Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreServices}
                className="px-6 py-3.5 text-sm font-medium text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Explore Automation Services</span>
              </button>
            </div>

            {/* Real Direct WhatsApp Contact Hook */}
            <div className="flex items-center gap-2.5 text-xs text-slate-400 pt-2 border-t border-slate-800/80 w-full max-w-xl">
              <span className="text-slate-400">Prefer direct messaging?</span>
              <a
                href={quickWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium hover:underline whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat instantly on WhatsApp ({config.whatsappDisplay})</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Focal Carrier with measured scrim */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 shadow-2xl">
              <img
                src="/images/hero_ai_agency_1793379843088.jpg"
                alt="ARSH'S AI SOLUTION AGENCY Modern Engineering Command Center"
                className="w-full h-80 sm:h-96 lg:h-[440px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B14] via-[#080B14]/40 to-transparent" />
              
              {/* Overlay architectural caption */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0B0F1D]/80 backdrop-blur-md border border-slate-700/60 text-left">
                <div className="text-xs font-semibold text-white tracking-wide mb-1">
                  Autonomous Operations Architecture
                </div>
                <div className="text-xs text-slate-300 leading-normal">
                  Resilient API pipelines, human-in-the-loop safeguards, and deterministic business logic deployed for modern enterprise scale.
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-column KPI strip below the hero split with Tabular Numerals */}
        <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              24/7/365
            </div>
            <div className="text-xs font-medium text-purple-400">Always-On Operations</div>
            <div className="text-xs text-slate-400">Autonomous lead intake, qualification, and appointment booking.</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              &lt; 2 Mins
            </div>
            <div className="text-xs font-medium text-purple-400">Inbound Response Velocity</div>
            <div className="text-xs text-slate-400">Immediate prospect qualification while buyer intent is at its peak.</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              100%
            </div>
            <div className="text-xs font-medium text-purple-400">Human-in-the-Loop</div>
            <div className="text-xs text-slate-400">Deterministic escalation boundaries for sensitive customer decisions.</div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
              Zero
            </div>
            <div className="text-xs font-medium text-purple-400">Vendor Lock-In</div>
            <div className="text-xs text-slate-400">Full intellectual property and system credentials transferred to you.</div>
          </div>
        </div>

      </div>
    </section>
  );
};
