import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, MessageSquare } from 'lucide-react';
import { AgencyConfig } from '../types';

interface NavbarProps {
  config: AgencyConfig;
  onOpenConsultation: () => void;
  onOpenConfig: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ config, onOpenConsultation, onOpenConfig }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#080B14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="/" 
          className="text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-tr from-purple-600 to-indigo-400 group-hover:scale-110 transition-transform"></span>
          <span>ARSH'S AI SOLUTIONS</span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#services"
            onClick={(e) => handleNavClick(e, 'services')}
            className="hover:text-purple-400 transition-colors whitespace-nowrap shrink-0"
          >
            Services
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, 'about')}
            className="hover:text-purple-400 transition-colors whitespace-nowrap shrink-0"
          >
            About Us
          </a>
          <a
            href="#pricing"
            onClick={(e) => handleNavClick(e, 'pricing')}
            className="hover:text-purple-400 transition-colors whitespace-nowrap shrink-0"
          >
            Pricing
          </a>
          <a
            href="#faq"
            onClick={(e) => handleNavClick(e, 'faq')}
            className="hover:text-purple-400 transition-colors whitespace-nowrap shrink-0"
          >
            FAQ
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="hover:text-purple-400 transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenConsultation}
            className="px-4 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-all shadow-sm hover:shadow-purple-500/20 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Book Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg border border-slate-800 bg-slate-900/60"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0B0F1D] px-6 py-5 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-3 text-sm font-medium text-slate-300">
            <a
              href="#services"
              onClick={(e) => handleNavClick(e, 'services')}
              className="py-1 hover:text-purple-400"
            >
              Our Services
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="py-1 hover:text-purple-400"
            >
              About Agency
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleNavClick(e, 'pricing')}
              className="py-1 hover:text-purple-400"
            >
              Pricing & Packages
            </a>
            <a
              href="#faq"
              onClick={(e) => handleNavClick(e, 'faq')}
              className="py-1 hover:text-purple-400"
            >
              Frequently Asked Questions
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="py-1 hover:text-purple-400"
            >
              Contact & WhatsApp
            </a>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-center text-white bg-purple-600 rounded-lg hover:bg-purple-500 transition-colors flex items-center justify-center gap-2"
            >
              <span>Schedule Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConfig();
              }}
              className="w-full py-2 px-3 text-xs text-slate-400 hover:text-slate-200 text-center"
            >
              Agency Contact Settings
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
