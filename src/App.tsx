/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LegalModal } from './components/LegalModals';
import { AgencyConfigModal } from './components/AgencyConfigModal';
import { PublishingGuideModal } from './components/PublishingGuideModal';
import { ChatWidget } from './components/ChatWidget';
import { getAgencyConfig } from './config/agency';
import { AgencyConfig } from './types';
import RudraDentalPage from './RudraDentalPage';

export default function App() {
  const [config, setConfig] = useState<AgencyConfig>(getAgencyConfig());
  const [selectedService, setSelectedService] = useState<string>('ai-lead-generation');
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  
  // Modals state
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setConfig(getAgencyConfig());
  }, []);

  const handleSelectService = (serviceId: string) => {
    setSelectedService(serviceId);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPlan = (planName: string, estimatedBudget: string) => {
    setSelectedBudget(estimatedBudget);
    if (planName.includes('Starter')) {
      setSelectedService('starter-package');
    } else if (planName.includes('Growth')) {
      setSelectedService('growth-package');
    } else {
      setSelectedService('enterprise-package');
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToSection = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (window.location.pathname === '/rudra-dental' || window.location.pathname === '/rudra-dental/') {
    return <RudraDentalPage />;
  }

  return (
    <div className="min-h-screen bg-[#080B14] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Navigation */}
      <Navbar
        config={config}
        onOpenConsultation={() => handleScrollToSection('contact')}
        onOpenConfig={() => setIsConfigModalOpen(true)}
      />

      <main className="flex-1">
        {/* 1. HOME / Hero */}
        <Hero
          config={config}
          onExploreServices={() => handleScrollToSection('services')}
          onBookConsultation={() => handleScrollToSection('contact')}
        />

        {/* 2. OUR SERVICES */}
        <Services onSelectService={handleSelectService} />

        {/* 3. ABOUT US */}
        <About
          config={config}
          onConsultation={() => handleScrollToSection('contact')}
        />

        {/* 4. PRICING */}
        <Pricing
          onSelectPlan={handleSelectPlan}
          onCustomPricing={() => handleScrollToSection('contact')}
        />

        {/* 5. CONTACT & INQUIRY */}
        <Contact
          config={config}
          preSelectedService={selectedService}
          preSelectedBudget={selectedBudget}
          onOpenConfig={() => setIsConfigModalOpen(true)}
        />

        {/* 6. FAQ */}
        <FAQ config={config} />
      </main>

      {/* 7. FOOTER */}
      <Footer
        config={config}
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
        onOpenConfig={() => setIsConfigModalOpen(true)}
        onOpenGuide={() => setIsGuideModalOpen(true)}
      />

      {/* Legal Modal (Privacy Policy & Terms) */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
        config={config}
      />

      {/* Agency Owner Configuration Modal */}
      <AgencyConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        config={config}
        onConfigSaved={(updated) => setConfig(updated)}
      />

      {/* External Publishing & Setup Guide Modal */}
      <PublishingGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        config={config}
      />

      <ChatWidget />
    </div>
  );
}
