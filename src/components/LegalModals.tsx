import React from 'react';
import { X, Shield, FileText } from 'lucide-react';
import { AgencyConfig } from '../types';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
  config: AgencyConfig;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose, config }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#0B0F1E] border border-slate-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            {type === 'privacy' ? (
              <Shield className="w-5 h-5 text-purple-400" />
            ) : (
              <FileText className="w-5 h-5 text-purple-400" />
            )}
            <h3 className="text-lg font-bold text-white">
              {type === 'privacy' ? 'Privacy Policy & Data Security Mandate' : 'Terms of Service & Engagement'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <p className="text-slate-400">
                Last updated: October 2026. Effective immediately for all inquiries and commercial clients of <strong className="text-white">{config.agencyName}</strong>.
              </p>

              <div>
                <h4 className="text-sm font-bold text-white mb-1.5">1. Commitment to Data Confidentiality</h4>
                <p>
                  At {config.agencyName}, we handle sensitive corporate data and automation infrastructure. We treat client information, API credentials, customer records, and internal standard operating procedures with utmost confidentiality under standard NDA covenants.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-1.5">2. Zero Model Training on Client Data</h4>
                <p>
                  We strictly configure all enterprise AI models, embeddings, and vector databases with zero-retention parameters. Your proprietary corporate workflows and customer transcripts are NEVER used to train, fine-tune, or improve any public foundation model.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-1.5">3. Credentials & Access Governance</h4>
                <p>
                  All integration credentials (API keys, webhook tokens, database connection strings) are stored in encrypted environment vaults and transferred securely. We practice least-privilege access and revoke temporary staging keys immediately upon production delivery.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-1.5">4. Information Collected on This Website</h4>
                <p>
                  Information submitted via our inquiry form (name, email, company, and project scope) is used solely to assess technical feasibility and respond directly to your project request. We do not sell, rent, or trade prospective client data to third-party brokers.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-1.5">5. Direct Inquiries & Contact</h4>
                <p>
                  For privacy inquiries or custom Non-Disclosure Agreements (NDAs), reach our lead architect at{' '}
                  <span className="text-purple-400 font-mono">{config.email}</span>.
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-slate-400">
                Commercial Terms of Engagement for <strong className="text-white">{config.agencyName}</strong>.
              </p>

              <div>
                <h4 className="text-sm font-bold text-white mb-1.5">1. Scope of Work & Deliverables</h4>
                <p>
                  All automation engineering projects are defined by a mutually agreed Statement of Work (SOW) specifying milestones, system integrations, deliverables, and acceptance criteria.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-1.5">2. 100% Intellectual Property (IP) Ownership</h4>
                <p>
                  Upon final milestone settlement, the client receives full, unrestricted ownership of all custom scripts, webhook architectures, database schemas, and configuration files created specifically for the project.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-1.5">3. Warranty & Post-Deployment Support</h4>
                <p>
                  Standard engagements include a 30-day post-launch warranty covering bug fixes, edge-case tuning, and integration maintenance caused by third-party API changes. Ongoing support retainers are optional and billed according to the agreed plan.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-1.5">4. Client Dependencies</h4>
                <p>
                  Timely deployment requires client cooperation regarding third-party software accounts, API credentials, and domain verification. Project delivery timelines commence upon receipt of necessary credentials.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white mb-1.5">5. Governing Law</h4>
                <p>
                  These terms are governed by standard commercial law for technical services. Disputed terms are resolved through binding arbitration.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-900/60 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
