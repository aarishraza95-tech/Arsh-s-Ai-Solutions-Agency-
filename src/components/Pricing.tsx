import React, { useState } from 'react';
import { Check, ArrowRight, HelpCircle, Calculator, Sliders } from 'lucide-react';
import { PricingPlan } from '../types';
import { PRICING_PLANS } from '../config/agency';

interface PricingProps {
  onSelectPlan: (planName: string, estimatedBudget: string) => void;
  onCustomPricing: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan, onCustomPricing }) => {
  // Interactive Scope Calculator for real prospective clients
  const [showCalculator, setShowCalculator] = useState(false);
  const [leadChannels, setLeadChannels] = useState<number>(2);
  const [supportChannels, setSupportChannels] = useState<number>(1);
  const [includeCrmSync, setIncludeCrmSync] = useState<boolean>(true);
  const [includeOcrInvoicing, setIncludeOcrInvoicing] = useState<boolean>(false);

  // Dynamic estimate calculation
  const calculatedEstimate = 1200 + (leadChannels * 350) + (supportChannels * 450) + (includeCrmSync ? 300 : 0) + (includeOcrInvoicing ? 600 : 0);

  return (
    <section id="pricing" className="py-20 lg:py-28 border-b border-slate-800/80 bg-[#080B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
              <span>Transparent Investment</span>
              <span aria-hidden="true">·</span>
              <span>No Hidden Fees</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Predictable Pricing Built on Measurable Value
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              We offer structured, outcome-driven packages with transparent delivery milestones. Every engagement includes full system deployment, testing, staff handover, and post-launch tuning.
            </p>
          </div>

          {/* Toggle between Fixed Packages and Custom Scope Estimator */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="px-4 py-2 text-xs font-semibold text-purple-300 hover:text-white bg-purple-950/40 hover:bg-purple-900/50 border border-purple-800/80 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-purple-400" />
              <span>{showCalculator ? 'View Fixed Packages' : 'Launch Custom Scope Calculator'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Scope Calculator Mode */}
        {showCalculator ? (
          <div className="rounded-2xl border border-purple-900/60 bg-[#0B0F22] p-6 sm:p-10 mb-16 text-left">
            <div className="max-w-3xl mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Custom Workflow & Integration Estimator
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Adjust parameters to estimate your implementation scope. This provides a realistic ballpark before our technical discovery call.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Lead Intake Channels ({leadChannels})
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={leadChannels}
                  onChange={(e) => setLeadChannels(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
                <div className="text-[11px] text-slate-400">Website, LinkedIn, Meta Ads, Calendars</div>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
                <label className="text-xs font-semibold text-slate-300 block">
                  Support Channels ({supportChannels})
                </label>
                <input
                  type="range"
                  min="0"
                  max="4"
                  value={supportChannels}
                  onChange={(e) => setSupportChannels(Number(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
                <div className="text-[11px] text-slate-400">WhatsApp, Web Widget, Email, Slack</div>
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-300">CRM Bi-Directional Sync</div>
                  <div className="text-[11px] text-slate-400">HubSpot, Salesforce, Pipedrive</div>
                </div>
                <input
                  type="checkbox"
                  checked={includeCrmSync}
                  onChange={(e) => setIncludeCrmSync(e.target.checked)}
                  className="w-4 h-4 accent-purple-500 rounded cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-300">Invoice / Document OCR</div>
                  <div className="text-[11px] text-slate-400">QuickBooks, Xero, PDF Data</div>
                </div>
                <input
                  type="checkbox"
                  checked={includeOcrInvoicing}
                  onChange={(e) => setIncludeOcrInvoicing(e.target.checked)}
                  className="w-4 h-4 accent-purple-500 rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="p-6 rounded-xl border border-slate-700/80 bg-slate-900/90 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                  Estimated One-Time Implementation Scope
                </div>
                <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
                  ~${calculatedEstimate.toLocaleString()}
                  <span className="text-xs font-sans text-slate-400 font-normal ml-2">USD (Includes deployment & 30-day warranty)</span>
                </div>
              </div>

              <button
                onClick={() => onSelectPlan(`Custom Scope (${leadChannels} leads, ${supportChannels} support channels)`, `~$${calculatedEstimate.toLocaleString()}`)}
                className="px-6 py-3 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Lock In This Configuration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : null}

        {/* 3 Editable Service Packages Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch text-left">
          {PRICING_PLANS.map((plan) => {
            const isPopular = plan.isPopular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between p-6 sm:p-8 transition-all ${
                  isPopular
                    ? 'border-2 border-purple-500 bg-[#0E1329] shadow-xl shadow-purple-950/40 lg:-translate-y-2'
                    : 'border border-slate-800 bg-[#0B0F1E] hover:border-slate-700'
                }`}
              >
                {/* Popular Banner */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-purple-600 text-white text-[11px] font-bold tracking-wide uppercase shadow-sm">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    {!isPopular && (
                      <div className="text-xs font-medium text-slate-400 mb-1">
                        {plan.badge}
                      </div>
                    )}
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-6 min-h-[48px]">
                      {plan.description}
                    </p>

                    <div className="pt-4 border-t border-slate-800/80">
                      <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                        {plan.price}
                      </div>
                      <div className="text-xs text-purple-300 font-medium mt-1">
                        {plan.billingPeriod}
                      </div>
                    </div>
                  </div>

                  {/* Key metadata without pills */}
                  <div className="space-y-1.5 text-xs text-slate-400 mb-6 pb-6 border-b border-slate-800/80">
                    <div><span className="text-slate-300 font-medium">Timeline:</span> {plan.setupTimeline}</div>
                    <div><span className="text-slate-300 font-medium">Support:</span> {plan.supportLevel}</div>
                    <div><span className="text-slate-300 font-medium">Target:</span> {plan.idealFor}</div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-2.5 mb-8">
                    <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                      Included Scope & Systems
                    </div>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => onSelectPlan(plan.name, plan.price)}
                    className={`w-full py-3 px-4 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isPopular
                        ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/30'
                        : 'bg-slate-900 hover:bg-purple-600 text-slate-100 hover:text-white border border-slate-700 hover:border-purple-600'
                    }`}
                  >
                    <span>{plan.id === 'enterprise' ? 'Request Custom Proposal' : `Select ${plan.name}`}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Pricing Callout */}
        <div className="mt-12 p-6 rounded-xl border border-slate-800 bg-[#0B0F1E] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
          <div>
            <div className="text-sm font-bold text-white">Need a custom enterprise integration or high-volume SLA?</div>
            <div className="text-xs text-slate-400">
              We structure milestone-based scopes for legacy system modernizations, HIPAA/SOC2 deployments, and proprietary LLM workflows.
            </div>
          </div>
          <button
            onClick={onCustomPricing}
            className="px-5 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-850 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer self-start sm:self-auto"
          >
            Contact For Custom Pricing
          </button>
        </div>

      </div>
    </section>
  );
};
