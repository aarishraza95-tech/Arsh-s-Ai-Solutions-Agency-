import React from 'react';
import { X, Globe, CheckCircle2, Server, MessageCircle, Mail, ExternalLink, Code, Download } from 'lucide-react';
import { AgencyConfig } from '../types';

interface PublishingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AgencyConfig;
}

export const PublishingGuideModal: React.FC<PublishingGuideModalProps> = ({ isOpen, onClose, config }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#0B0F1E] border border-slate-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white">
              Production Export & Publishing Guide
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
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          {/* Quick ZIP Download Banner */}
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Production ZIP Ready (arsh-agency-production.zip)</span>
              </div>
              <div className="text-xs text-slate-300 mt-1">
                Contains complete standalone dist folder: index.html, assets, images & redirects.
              </div>
            </div>
            <a
              href="/arsh-agency-production.zip"
              download="arsh-agency-production.zip"
              className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center justify-center gap-2 shrink-0 shadow cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download ZIP</span>
            </a>
          </div>

          {/* Step 1 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">1</span>
              <span>Set Your Real WhatsApp Number & Email</span>
            </div>
            <p className="text-xs text-slate-300">
              The website uses real WhatsApp click-to-chat links formatted as <code className="text-purple-300 bg-slate-900 px-1.5 py-0.5 rounded font-mono">https://wa.me/[country_code][number]</code>.
            </p>
            <ul className="text-xs text-slate-400 space-y-1 pl-4 list-disc">
              <li>Click <strong>"Agency Contact Settings"</strong> in the footer (or edit <code className="text-slate-300 font-mono">src/config/agency.ts</code>).</li>
              <li>Input your direct international number without dashes or plus signs (e.g., <code className="text-slate-300 font-mono">15551234567</code> for US or <code className="text-slate-300 font-mono">447123456789</code> for UK).</li>
              <li>Current configured email: <code className="text-purple-300 font-mono">{config.email}</code>.</li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">2</span>
              <span>Form Submissions & Backend Connectivity</span>
            </div>
            <p className="text-xs text-slate-300">
              To make sure client inquiries are <strong>never lost</strong> even if third-party server services fail:
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 pl-4 list-disc">
              <li>
                <strong>Instant WhatsApp Priority Dispatch (Built-in & Working):</strong> When a prospective customer submits the inquiry form, the system immediately pre-compiles their full briefing (name, email, company, selected service, budget, and project goals) into a 1-click WhatsApp message link.
              </li>
              <li>
                <strong>Email Client Draft (Built-in & Working):</strong> Generates an exact RFC-compliant mailto draft with subject and structured body.
              </li>
              <li>
                <strong>External Webhook / Formspree (Optional):</strong> If you want automated email alerts, sign up for a free Formspree, Make.com, or Zapier webhook, and paste the endpoint URL into the "Agency Contact Settings" modal.
              </li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs">3</span>
              <span>Publishing to Your Custom Domain (Vercel, Netlify, or Cloud Run)</span>
            </div>
            <p className="text-xs text-slate-300">
              You can deploy this codebase to any modern hosting platform in 2 minutes:
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
              <div># 1. Build the production bundle:</div>
              <div className="text-purple-300">npm run build</div>
              <div># 2. Output is located in the dist/ folder, ready for static or SSR hosting.</div>
            </div>
            <p className="text-xs text-slate-400">
              Connect your custom domain (e.g. <code className="text-slate-300 font-mono">arshaisolutions.com</code>) through DNS records (A / CNAME) in your domain registrar (GoDaddy, Namecheap, Cloudflare).
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-900/60 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
