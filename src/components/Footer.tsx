import React from 'react';
import { MessageCircle, Mail, Globe, Shield, FileText, Settings, ArrowUpRight, Download } from 'lucide-react';
import { AgencyConfig } from '../types';
import { buildWhatsAppLink } from '../config/agency';

interface FooterProps {
  config: AgencyConfig;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenConfig: () => void;
  onOpenGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenPrivacy,
  onOpenTerms,
  onOpenConfig,
  onOpenGuide
}) => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerWhatsAppUrl = buildWhatsAppLink(
    config.whatsappNumber,
    `Hello ${config.ownerName}, I would like to inquire about your AI solutions.`
  );

  return (
    <footer className="border-t border-slate-800/80 bg-[#06080F] text-slate-400 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Col 1: Brand & Executive Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-tr from-purple-600 to-indigo-400"></span>
              <span className="text-base font-bold text-white tracking-tight">
                {config.agencyName}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              We design, build, and deploy production-grade AI automation architectures for modern enterprises. Eliminating manual operational drag, accelerating sales velocity, and capturing revenue around the clock.
            </p>

            <div className="text-xs text-slate-500 pt-2 space-y-1">
              <div><strong className="text-slate-400">Operating Model:</strong> {config.location}</div>
              <div><strong className="text-slate-400">Guaranteed Response:</strong> {config.responseSla}</div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Our Services (01–05)
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, 'about')}
                  className="hover:text-purple-400 transition-colors"
                >
                  About Arsh & The Agency
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={(e) => handleNavClick(e, 'pricing')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Pricing & Scope Calculator
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleNavClick(e, 'faq')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Technical FAQ & Safeguards
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Direct Inquiry Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact Details & Actions */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Direct Contact Details
            </div>

            <div className="space-y-2.5 text-xs">
              <a
                href={footerWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors group"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span className="font-mono">{config.whatsappDisplay}</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={`mailto:${config.email}?subject=Enterprise%20AI%20Automation`}
                className="flex items-center gap-2 text-slate-300 hover:text-purple-400 transition-colors group"
              >
                <Mail className="w-4 h-4 shrink-0 text-purple-400" />
                <span className="font-mono">{config.email}</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <a
                  href="/arsh-agency-production.zip"
                  download="arsh-agency-production.zip"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-800/60 text-emerald-300 hover:text-white transition-colors cursor-pointer text-[11px]"
                >
                  <Download className="w-3 h-3 text-emerald-400" />
                  <span>Download ZIP</span>
                </a>

                <button
                  onClick={onOpenConfig}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer text-[11px]"
                >
                  <Settings className="w-3 h-3 text-purple-400" />
                  <span>Agency Settings</span>
                </button>

                <button
                  onClick={onOpenGuide}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-purple-950/40 hover:bg-purple-900/40 border border-purple-800/60 text-purple-300 hover:text-white transition-colors cursor-pointer text-[11px]"
                >
                  <Globe className="w-3 h-3 text-purple-400" />
                  <span>Publishing Guide</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-12 pt-8 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} {config.agencyName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy & Security
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
