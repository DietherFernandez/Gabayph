import React from 'react';
import { useApp } from '../../context/AppContext';
import { MockStorage } from '../../data/mockStorage';
import {
  ShieldCheck,
  PhoneCall,
  RotateCcw,
  Info
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';

export const Footer: React.FC = () => {
  const { navigate, openContactModal, openSuggestModal } = useApp();
  const { showToast } = useToast();
  const { confirmAction } = useConfirm();

  const handleResetData = () => {
    confirmAction({
      title: 'Reset Prototype Data?',
      message: 'Are you sure you want to restore all public directory records, sample forms, and settings to original defaults?',
      confirmLabel: 'Reset Data',
      isDestructive: true,
      onConfirm: () => {
        MockStorage.resetAllToDefaults();
        showToast('Prototype data successfully reset to default state.', 'info');
      }
    });
  };

  return (
    <footer className="w-full bg-white dark:bg-ios-darkSurface border-t border-ios-lightBorder dark:border-ios-darkBorder mt-12 pb-20 lg:pb-8 pt-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Verification Ribbon */}
        <div className="bg-ios-lightSecondary dark:bg-ios-darkSecondary rounded-ios-xl p-4 sm:p-5 border border-ios-lightBorder dark:border-ios-darkBorder mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-ios-lightText dark:text-ios-darkText">
                Public Data Verification & Citizen's Charter Standard
              </h4>
              <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted mt-0.5 max-w-2xl">
                All public services, processing fees, documentary requirements, and agency directories in GabayPH are benchmarked against official Citizen's Charters of Republic of the Philippines agencies.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={openSuggestModal}
              className="text-xs font-medium px-3 py-1.5 rounded-ios-lg bg-white dark:bg-ios-darkSurface border border-ios-lightBorder dark:border-ios-darkBorder text-ios-lightText dark:text-ios-darkText hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Suggest a Service
            </button>
            <button
              onClick={openContactModal}
              className="text-xs font-medium px-3 py-1.5 rounded-ios-lg bg-ios-navy text-white hover:bg-ios-navyLight transition-colors"
            >
              Contact Support
            </button>
          </div>
        </div>

        {/* Directory Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8 text-xs">
          {/* Col 1: Identity & Mission */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-ios-lg bg-ios-navy flex items-center justify-center text-white font-bold text-xs">
                G
              </div>
              <span className="font-bold text-base text-ios-navy dark:text-blue-400">GabayPH</span>
            </div>
            <p className="text-ios-lightMuted dark:text-ios-darkMuted leading-relaxed mb-3">
              A centralized public information and government services directory dedicated to helping Filipino citizens discover essential public programs, employment opportunities, financial assistance, educational scholarships, and emergency resources.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[10px] text-ios-lightMuted dark:text-ios-darkMuted bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-md">
              <Info className="w-3 h-3 text-ios-navy dark:text-blue-400" />
              <span>Phase 1 Interactive Prototype</span>
            </div>
          </div>

          {/* Col 2: Directory Categories */}
          <div>
            <h5 className="font-semibold text-ios-lightText dark:text-ios-darkText uppercase tracking-wider text-[11px] mb-3">
              Categories
            </h5>
            <ul className="space-y-2 text-ios-lightMuted dark:text-ios-darkMuted">
              <li>
                <button onClick={() => navigate('/trabaho')} className="text-left w-full hover:text-ios-navy dark:hover:text-white transition-colors">
                  Trabaho (Employment)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/serbisyo')} className="text-left w-full hover:text-ios-navy dark:hover:text-white transition-colors">
                  Serbisyo (Government Services)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/pera')} className="text-left w-full hover:text-ios-navy dark:hover:text-white transition-colors">
                  Pera (Financial Assistance)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/bayanihan')} className="text-left w-full hover:text-ios-navy dark:hover:text-white transition-colors">
                  Bayanihan (Community Programs)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/aral')} className="text-left w-full hover:text-ios-navy dark:hover:text-white transition-colors">
                  Aral (Education & TVET)
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/kaligtasan')} className="text-left w-full hover:text-ios-navy dark:hover:text-white transition-colors">
                  Kaligtasan (Safety & Hotlines)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Verified National Hotlines */}
          <div>
            <h5 className="font-semibold text-ios-lightText dark:text-ios-darkText uppercase tracking-wider text-[11px] mb-3">
              National Hotlines
            </h5>
            <ul className="space-y-2 text-ios-lightMuted dark:text-ios-darkMuted">
              <li>
                <a href="tel:911" className="hover:text-red-500 font-medium transition-colors flex items-center gap-1">
                  <PhoneCall className="w-3 h-3 text-red-500" /> 911 — National Emergency
                </a>
              </li>
              <li>
                <a href="tel:8888" className="hover:text-ios-navy dark:hover:text-white transition-colors">
                  8888 — Citizens' Complaint Center
                </a>
              </li>
              <li>
                <a href="tel:1343" className="hover:text-ios-navy dark:hover:text-white transition-colors">
                  1343 — Anti-Human Trafficking
                </a>
              </li>
              <li>
                <a href="tel:143" className="hover:text-ios-navy dark:hover:text-white transition-colors">
                  143 — Philippine Red Cross
                </a>
              </li>
              <li>
                <a href="tel:1553" className="hover:text-ios-navy dark:hover:text-white transition-colors">
                  1553 — National Mental Health Crisis
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Information & Help */}
          <div>
            <h5 className="font-semibold text-ios-lightText dark:text-ios-darkText uppercase tracking-wider text-[11px] mb-3">
              Citizen Resources
            </h5>
            <ul className="space-y-2 text-ios-lightMuted dark:text-ios-darkMuted">
              <li>
                <button onClick={() => navigate('/announcements')} className="text-left w-full hover:text-ios-navy dark:hover:text-white transition-colors">
                  Official Public Advisories
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/saved')} className="text-left w-full hover:text-ios-navy dark:hover:text-white transition-colors">
                  Saved Bookmarks
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/notifications')} className="text-left w-full hover:text-ios-navy dark:hover:text-white transition-colors">
                  Notification Center
                </button>
              </li>
              <li>
                <button onClick={openSuggestModal} className="text-left w-full hover:text-ios-navy dark:hover:text-white transition-colors">
                  Submit Service Suggestion
                </button>
              </li>
              <li>
                <button onClick={openContactModal} className="text-left w-full hover:text-ios-navy dark:hover:text-white transition-colors">
                  Help & Feedback Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Prototype Controls */}
          <div>
            <h5 className="font-semibold text-ios-lightText dark:text-ios-darkText uppercase tracking-wider text-[11px] mb-3">
              Prototype Controls
            </h5>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/admin')}
                className="w-full text-left px-2.5 py-1.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/60 hover:bg-amber-100 transition-colors font-medium text-[11px]"
              >
                Open Admin Portal
              </button>
              <button
                onClick={handleResetData}
                className="w-full text-left px-2.5 py-1.5 rounded bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightMuted hover:text-red-500 transition-colors flex items-center gap-1.5 text-[11px]"
                title="Reset all local prototype records back to factory mock state"
              >
                <RotateCcw className="w-3 h-3" /> Reset Sample Data
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-6 border-t border-ios-lightBorder dark:border-ios-darkBorder flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-ios-lightMuted dark:text-ios-darkMuted">
          <p>© 2026 GabayPH. Republic of the Philippines Public Services Prototype.</p>
          <p className="text-center sm:text-right">
            No personal data is transmitted to external servers. All information operates locally in client memory and storage (Frontend Prototype).
          </p>
        </div>
      </div>
    </footer>
  );
};
