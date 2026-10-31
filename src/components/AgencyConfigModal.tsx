import React, { useState } from 'react';
import { X, Settings, Check, Phone, Mail, Globe, Save } from 'lucide-react';
import { AgencyConfig } from '../types';
import { saveAgencyConfig } from '../config/agency';

interface AgencyConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AgencyConfig;
  onConfigSaved: (newConfig: AgencyConfig) => void;
}

export const AgencyConfigModal: React.FC<AgencyConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onConfigSaved
}) => {
  const [formData, setFormData] = useState<AgencyConfig>({ ...config });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveAgencyConfig(formData);
    onConfigSaved(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-[#0B0F1E] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Settings className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white">
              Agency Contact & WhatsApp Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            Update your live WhatsApp click-to-chat number, official business email, and optional webhook. Changes are saved immediately and update all buttons and contact forms on the site.
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              WhatsApp International Digits (For wa.me link)
            </label>
            <input
              type="text"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value.replace(/[^0-9]/g, '') })}
              placeholder="e.g. 15550198234 (country code + number, no spaces)"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Only numbers (e.g. 15550198234). Used in https://wa.me/[number] for real one-click chatting.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              WhatsApp Display Label
            </label>
            <input
              type="text"
              value={formData.whatsappDisplay}
              onChange={(e) => setFormData({ ...formData, whatsappDisplay: e.target.value })}
              placeholder="e.g. +1 (555) 019-8234"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Executive Business Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="aarishraza865@gmail.com"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Optional Webhook URL (Formspree / Make / Zapier)
            </label>
            <input
              type="url"
              value={formData.webhookUrl || ''}
              onChange={(e) => setFormData({ ...formData, webhookUrl: e.target.value })}
              placeholder="https://formspree.io/f/xyz or https://hook.eu1.make.com/..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Leave blank to rely on the direct WhatsApp + Mailto pipeline.
            </p>
          </div>

          {savedSuccess && (
            <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Agency contact details updated successfully!</span>
            </div>
          )}

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Save className="w-4 h-4" />
              <span>Save & Apply Settings</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
