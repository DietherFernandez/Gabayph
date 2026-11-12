import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  PhoneCall,
  Info,
  RotateCcw
} from 'lucide-react';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';

export const Footer: React.FC = () => {
  const { currentPath, navigate, openSuggestModal, openContactModal } = useApp();
  const { showToast } = useToast();
  const { confirmAction } = useConfirm();

  const isHome = currentPath === '/';

  const handleResetData = () => {
    confirmAction({
      title: 'Reset Sample Data?',
      message: 'This will reset all modified services, job listings, and mock records back to default factory fixtures. Your personal saved bookmarks will also be cleared.',
      confirmLabel: 'Reset Data',
      isDestructive: true,
      onConfirm: () => {
        MockStorage.resetAllToDefaults();
        showToast('All prototype sample data has been reset to defaults.', 'info');
      }
    });
  };

  // If not homepage, render only a clean compact legal footnote
  if (!isHome) {
    return (
      <footer className="w-full mt-8 pb-20 lg:pb-8 pt-4 border-t border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[12px] text-[#8E8E93] leading-relaxed">
            © 2026 GabayPH • Official Public Services Directory • Operating locally on your device
          </p>
        </div>
      </footer>
    );
  }

  // Render on Homepage only
  return (
    <footer className="w-full bg-white dark:bg-ios-darkSurface border-t border-ios-lightBorder dark:border-ios-darkBorder mt-12 pb-20 lg:pb-8 pt-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Verification Ribbon (Home only) */}
        <div className="bg-ios-lightSecondary dark:bg-ios-darkSecondary rounded-ios-xl p-4 sm:p-5 border border-ios-lightBorder dark:border-ios-darkBorder mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[14px] font-semibold text-ios-lightText dark:text-ios-darkText">
                Public Data Verification & Citizen's Charter Standard
              </h4>
              <p className="text-[12px] text-ios-lightMuted dark:text-ios-darkMuted mt-0.5 max-w-2xl leading-relaxed">
                All public services, processing fees, documentary requirements, and agency directories in GabayPH are benchmarked against official Citizen's Charters of Republic of the Philippines agencies.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={openSuggestModal}
              className="text-[12px] font-medium px-3 py-1.5 rounded-ios-lg bg-white dark:bg-ios-darkSurface border border-ios-lightBorder dark:border-ios-darkBorder text-ios-lightText dark:text-ios-darkText hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Suggest a Service
            </button>
            <button
              onClick={openContactModal}
              className="text-[12px] font-medium px-3 py-1.5 rounded-ios-lg bg-ios-navy text-white hover:bg-ios-navyLight transition-colors"
            >
              Contact Support
            </button>
          </div>
        </div>

        {/* Directory Columns (Home only) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 mb-8 text-[12px]">
          {/* Col 1: Identity & Mission */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-6 h-6 rounded-ios-lg bg-ios-navy flex items-center justify-center text-white font-bold text-xs">
                G
              </div>
              <span className="font-bold text-[15px] text-ios-navy dark:text-blue-400">GabayPH</span>
            </div>
            <p className="text-ios-lightMuted dark:text-ios-darkMuted leading-relaxed mb-3 text-[12px]">
              A centralized public information and government services directory dedicated to helping Filipino citizens discover essential public programs, employment opportunities, financial assistance, educational scholarships, and emergency resources.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] text-ios-lightMuted dark:text-ios-darkMuted bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md">
              <Info className="w-3 h-3 text-ios-navy dark:text-blue-400" />
              <span>Phase 1 Interactive Prototype</span>
            </div>
          </div>

          {/* Col 2: Directory Categories */}
          <div>
            <h5 className="font-semibold text-ios-lightText dark:text-ios-darkText uppercase tracking-wider text-[11px] mb-2.5">
              Categories
            </h5>
            <ul className="space-y-1.5 text-ios-lightMuted dark:text-ios-darkMuted text-[12px]">
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
            <h5 className="font-semibold text-ios-lightText dark:text-ios-darkText uppercase tracking-wider text-[11px] mb-2.5">
              National Hotlines
            </h5>
            <ul className="space-y-1.5 text-ios-lightMuted dark:text-ios-darkMuted text-[12px]">
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
            <h5 className="font-semibold text-ios-lightText dark:text-ios-darkText uppercase tracking-wider text-[11px] mb-2.5">
              Citizen Resources
            </h5>
            <ul className="space-y-1.5 text-ios-lightMuted dark:text-ios-darkMuted text-[12px]">
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
            <h5 className="font-semibold text-ios-lightText dark:text-ios-darkText uppercase tracking-wider text-[11px] mb-2.5">
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
        <div className="pt-4 border-t border-ios-lightBorder dark:border-ios-darkBorder flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-ios-lightMuted dark:text-ios-darkMuted">
          <p>© 2026 GabayPH. Republic of the Philippines Public Services Prototype.</p>
          <p className="text-center sm:text-right">
            Operating locally in client storage (Frontend Prototype).
          </p>
        </div>
      </div>
    </footer>
  );
};
