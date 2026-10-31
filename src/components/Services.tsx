import React, { useState } from 'react';
import { ArrowUpRight, Check, Sparkles, Layers, Clock, Cpu } from 'lucide-react';
import { ServiceItem } from '../types';
import { SERVICES_DATA } from '../config/agency';

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredServices = activeTab === 'all' 
    ? SERVICES_DATA 
    : SERVICES_DATA.filter(s => s.id === activeTab);

  return (
    <section id="services" className="py-20 lg:py-28 border-b border-slate-800/80 bg-[#080B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
              <span>Capabilities</span>
              <span aria-hidden="true">·</span>
              <span>Enterprise Delivery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Engineered AI Systems for Concrete Business Outcomes
            </h2>
            <p className="mt-4 text-slate-300 text-base leading-relaxed">
              We do not build toy chatbots or theoretical prompts. Every solution is a production-hardened pipeline connecting directly with your databases, messaging channels, and operational software.
            </p>
          </div>

          {/* Functional Filter Tabs (interactive filter buttons) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-lg self-start md:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Services
            </button>
            {SERVICES_DATA.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === service.id
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {service.title.replace('AI ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid: Asymmetric Bento arrangement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Featured Service 1: AI Lead Generation (Marquee Asymmetric Card) */}
          {(activeTab === 'all' || activeTab === 'ai-lead-generation') && (
            <div className="lg:col-span-12 rounded-2xl border border-slate-800 bg-[#0B0F1E] overflow-hidden hover:border-slate-700 transition-all text-left">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-2">
                      <span>01. Inbound & Outbound Pipeline</span>
                      <span aria-hidden="true">·</span>
                      <span>{SERVICES_DATA[0].estimatedTimeline}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {SERVICES_DATA[0].title}
                    </h3>
                    <p className="text-sm font-medium text-slate-300 mb-4">
                      {SERVICES_DATA[0].tagline}
                    </p>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      {SERVICES_DATA[0].description}
                    </p>

                    {/* Deliverables List */}
                    <div className="space-y-2.5 mb-6">
                      <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
                        Key Production Deliverables
                      </div>
                      {SERVICES_DATA[0].deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      <span className="font-semibold text-white">Stack:</span>
                      <span>{SERVICES_DATA[0].techStack.join(' · ')}</span>
                    </div>

                    <button
                      onClick={() => onSelectService(SERVICES_DATA[0].id)}
                      className="px-4 py-2.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap self-start sm:self-auto"
                    >
                      <span>Inquire About Lead Generation</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800">
                  <img
                    src="/images/service_lead_gen_1793379842426.jpg"
                    alt="AI Lead Generation Architecture Setup"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1E] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#0B0F1E] lg:via-transparent lg:to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[#080B14]/85 backdrop-blur-md border border-slate-800 text-xs">
                    <span className="text-slate-400">Target Result: </span>
                    <span className="text-purple-300 font-semibold">{SERVICES_DATA[0].keyMetric}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Remaining Services: 2-column grid */}
          {SERVICES_DATA.slice(1).map((service) => {
            if (activeTab !== 'all' && activeTab !== service.id) return null;
            
            const isProcessService = service.id === 'business-process-automation';

            return (
              <div
                key={service.id}
                className={`rounded-2xl border border-slate-800 bg-[#0B0F1E] p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all text-left ${
                  activeTab === 'all' ? 'lg:col-span-6' : 'lg:col-span-12'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-purple-400 mb-2">
                    <span>{service.number}. {service.title}</span>
                    <span className="text-slate-400">{service.estimatedTimeline}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5">
                    {service.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-300 mb-3">
                    {service.tagline}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Optional image highlight for Process Automation */}
                  {isProcessService && activeTab === 'all' && (
                    <div className="mb-5 rounded-lg overflow-hidden border border-slate-800 relative h-36">
                      <img
                        src="/images/service_process_automation_1793379843510.jpg"
                        alt="Process Automation Architecture"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1E] via-transparent to-transparent" />
                    </div>
                  )}

                  {/* Deliverables List */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                      Included Deliverables
                    </div>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400">
                    <span className="text-slate-300 font-medium">Outcome: </span>
                    <span className="text-purple-300">{service.keyMetric}</span>
                  </div>

                  <button
                    onClick={() => onSelectService(service.id)}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-purple-600 border border-slate-700 hover:border-purple-600 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap self-start sm:self-auto"
                  >
                    <span>Inquire For Scope</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
