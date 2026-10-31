import React from 'react';
import { Shield, Target, Lock, FileCode, CheckCircle2, ArrowRight } from 'lucide-react';
import { AgencyConfig } from '../types';

interface AboutProps {
  config: AgencyConfig;
  onConsultation: () => void;
}

export const About: React.FC<AboutProps> = ({ config, onConsultation }) => {
  return (
    <section id="about" className="py-20 lg:py-28 border-b border-slate-800/80 bg-[#080B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
            <span>About The Agency</span>
            <span aria-hidden="true">·</span>
            <span>Mission & Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Architecting Dependable AI Infrastructure for Growing Enterprises
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed">
            Founded by Arsh, <span className="text-white font-semibold">{config.agencyName}</span> was established with a singular, unapologetic focus: replacing brittle manual workflows and superficial AI toys with robust, production-grade business automation engines that deliver compounding enterprise value.
          </p>
        </div>

        {/* 2-Column Split: Visual & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
              <img
                src="/images/about_agency_team_1793379844481.jpg"
                alt="ARSH'S AI SOLUTION AGENCY Engineering & Strategy Advisory"
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080B14] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0B0F1E]/85 backdrop-blur-md border border-slate-800 text-left">
                <div className="text-xs font-semibold text-white">Client-First Engineering Mandate</div>
                <div className="text-xs text-slate-300">
                  We don't sell generic software subscriptions. We build tailored automation infrastructure directly in your accounts, owned entirely by you.
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                To liberate high-growth businesses and their teams from repetitive administrative friction by engineering bulletproof AI pipelines—empowering founders and operators to focus exclusively on strategy, client service, and revenue expansion.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-2">Our Business Goals</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Operational Disruption:</strong> Automations are staged in verified test environments and rolled out without interfering with your live client communications.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>Deterministic Reliability:</strong> Every AI node includes fallback handlers, error alerting, and human escalation guardrails.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span><strong>Direct Financial ROI:</strong> Measurable time reclamation and increased conversion rates within 30 to 60 days of launch.</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <button
                onClick={onConsultation}
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors cursor-pointer group"
              >
                <span>Discuss your operational roadmap with Arsh</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Guiding Principles (Numbered Editorial) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="p-6 rounded-xl border border-slate-800 bg-[#0B0F1E] space-y-3">
            <div className="text-xs font-mono text-purple-400">01. Principle</div>
            <div className="text-base font-bold text-white">Full Intellectual Property Ownership</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every workflow, API integration, and script we build belongs 100% to your company. No proprietary black boxes or vendor entrapment.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-[#0B0F1E] space-y-3">
            <div className="text-xs font-mono text-purple-400">02. Principle</div>
            <div className="text-base font-bold text-white">Strict Enterprise Data Confidentiality</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your business data, customer records, and internal documents are never fed to public models. We implement enterprise zero-retention parameters.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-[#0B0F1E] space-y-3">
            <div className="text-xs font-mono text-purple-400">03. Principle</div>
            <div className="text-base font-bold text-white">Human-in-the-Loop Governance</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              High-stakes interactions always retain human supervision. Automated systems handle repetitive tasks while gracefully escalating exceptions.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-800 bg-[#0B0F1E] space-y-3">
            <div className="text-xs font-mono text-purple-400">04. Principle</div>
            <div className="text-base font-bold text-white">Measurable Velocity & Accountability</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              We define clear operational KPIs before writing a line of code: hours saved per week, response time acceleration, and booking conversion lift.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
