import React, { useState } from 'react';
import { MockStorage } from '../data/mockStorage';
import { SAMPLE_EVACUATION_CENTERS } from '../data/safety';
import {
  ShieldAlert,
  PhoneCall,
  Copy,
  Check,
  HeartPulse,
  Info,
  MapPin
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { useToast } from '../context/ToastContext';

export const KaligtasanPage: React.FC = () => {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'hotlines' | 'guides' | 'firstaid' | 'evac'>('hotlines');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const safetyItems = MockStorage.getSafety();
  const hotlines = safetyItems.filter(s => s.resourceType === 'hotline');
  const disasterGuides = safetyItems.filter(s => s.resourceType === 'disaster_guide');
  const firstAidGuides = safetyItems.filter(s => s.resourceType === 'first_aid');

  const handleCopyNumber = (id: string, num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedId(id);
    showToast(`Kinopya ang numero: ${num}`, 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Category Header with Emergency Badge */}
      <div className="bg-red-500 text-white p-5 rounded-ios-xl shadow-ios-lg">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-100 mb-1">
          <ShieldAlert className="w-4 h-4 text-yellow-300" />
          <span>Opisyal na Sentro ng Kaligtasan at Saklolo</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          KALIGTASAN: Mga Pambansang Hotline at Gabay sa Sakuna
        </h1>
        <p className="text-xs sm:text-sm text-red-100 mt-1 max-w-2xl">
          Agarang tawag sa mga beripikadong emergency responders sa buong Pilipinas: Pulisya, Bumbero, Red Cross, NDRRMC, at Mental Health Crisis Support.
        </p>

        {/* Tab switch */}
        <div className="mt-4 pt-3 border-t border-red-400/50 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {[
            { id: 'hotlines', label: 'Mga Emergency Hotline', count: hotlines.length },
            { id: 'guides', label: 'Gabay sa Bagyo & Lindol', count: disasterGuides.length },
            { id: 'firstaid', label: 'First Aid Protocols', count: firstAidGuides.length },
            { id: 'evac', label: 'Evacuation Centers (Sample)', count: SAMPLE_EVACUATION_CENTERS.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-red-700 shadow-sm'
                  : 'bg-red-600/80 text-white hover:bg-red-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. HOTLINES TAB */}
      {activeTab === 'hotlines' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-ios-lightMuted dark:text-ios-darkMuted">
              Tandaan: Ang mga numerong ito ay beripikadong pambansang numero ng Republika ng Pilipinas.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {hotlines.map(hotline => {
              const cleanNumber = hotline.hotlineNumber?.replace(/[^0-9]/g, '') || '';
              return (
                <div
                  key={hotline.id}
                  className="bg-ios-lightSurface dark:bg-ios-darkSurface p-4 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-bold text-ios-navy dark:text-blue-400">
                        {hotline.agencyAcronym || hotline.agency}
                      </span>
                      {hotline.isNationalHotline && (
                        <Badge variant="verified">24/7 National</Badge>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-ios-lightText dark:text-ios-darkText mb-1">
                      {hotline.title}
                    </h3>
                    <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted leading-relaxed mb-3 line-clamp-2">
                      {hotline.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-ios-lightBorder/80 dark:border-ios-darkBorder/80 flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-ios-lightText dark:text-ios-darkText">
                      {hotline.hotlineNumber}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopyNumber(hotline.id, hotline.hotlineNumber || '')}
                        className="px-2.5 py-1.5 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary hover:bg-slate-200 dark:hover:bg-slate-700/60 text-xs font-medium text-ios-lightText dark:text-ios-darkText flex items-center gap-1 transition-colors"
                        title="Kopyahin ang numero"
                      >
                        {copiedId === hotline.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">Kopyahin</span>
                      </button>
                      <a
                        href={`tel:${cleanNumber}`}
                        className="px-3 py-1.5 rounded-ios-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-ios-sm ios-active"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        Tawagan
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. DISASTER GUIDES TAB */}
      {activeTab === 'guides' && (
        <div className="space-y-4">
          {disasterGuides.map(guide => (
            <div
              key={guide.id}
              className="bg-ios-lightSurface dark:bg-ios-darkSurface p-5 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <Badge variant="verified">{guide.agencyAcronym || guide.agency}</Badge>
                <span className="text-xs text-ios-lightMuted dark:text-ios-darkMuted font-medium">
                  {guide.operatingHours}
                </span>
              </div>
              <h3 className="text-base font-bold text-ios-lightText dark:text-ios-darkText mb-1.5">
                {guide.title}
              </h3>
              <p className="text-xs sm:text-sm text-ios-lightMuted dark:text-ios-darkMuted mb-4">
                {guide.description}
              </p>

              {guide.actionProtocol && (
                <div className="bg-ios-lightSecondary dark:bg-ios-darkSecondary p-4 rounded-ios-lg space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-ios-navy dark:text-blue-400">
                    Mga Hakbang sa Pag-iingat at Babala:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-ios-lightText dark:text-ios-darkText">
                    {guide.actionProtocol.map((proto, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-ios-navy text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="flex-1">{proto}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 3. FIRST AID PROTOCOLS TAB */}
      {activeTab === 'firstaid' && (
        <div className="space-y-4">
          {firstAidGuides.map(fa => (
            <div
              key={fa.id}
              className="bg-ios-lightSurface dark:bg-ios-darkSurface p-5 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <HeartPulse className="w-5 h-5 text-red-500" />
                <h3 className="text-base font-bold text-ios-lightText dark:text-ios-darkText">
                  {fa.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-ios-lightMuted dark:text-ios-darkMuted mb-4">
                {fa.description}
              </p>

              {fa.actionProtocol && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {fa.actionProtocol.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary border border-ios-lightBorder/80 dark:border-ios-darkBorder/80 text-xs"
                    >
                      <span className="font-bold text-red-600 dark:text-red-400 block mb-1">
                        Hakbang #{idx + 1}
                      </span>
                      <p className="text-ios-lightText dark:text-ios-darkText leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 4. EVACUATION CENTERS TAB */}
      {activeTab === 'evac' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-ios-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Paunawa sa Prototipo:</span> Ang sumusunod na listahan ng evacuation centers ay sample data para sa demonstrasyon. Sa oras ng totoong sakuna, makipag-ugnayan agad sa inyong lokal na Barangay Disaster Risk Reduction and Management Office (BDRRMC) para sa opisyal na itinalagang evacuation centers sa inyong lugar.
            </div>
          </div>

          <div className="space-y-3">
            {SAMPLE_EVACUATION_CENTERS.map(evac => (
              <div
                key={evac.id}
                className="bg-ios-lightSurface dark:bg-ios-darkSurface p-4 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-ios-navy dark:text-blue-400">
                      {evac.lgu}, {evac.province}
                    </span>
                    <Badge variant="outline">Kapasidad: {evac.capacityPersons} tao</Badge>
                  </div>
                  <h4 className="text-sm font-bold text-ios-lightText dark:text-ios-darkText">
                    {evac.name}
                  </h4>
                  <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-ios-lightMuted" /> {evac.address}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {evac.amenities.map(a => (
                      <span
                        key={a}
                        className="text-[10px] bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightMuted px-2 py-0.5 rounded-full"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right shrink-0 w-full sm:w-auto">
                  <span className="text-xs text-ios-lightMuted block mb-1">
                    Lokal na Disaster Hotline:
                  </span>
                  <span className="text-xs font-mono font-bold text-ios-lightText dark:text-ios-darkText block">
                    {evac.contactNumber}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
