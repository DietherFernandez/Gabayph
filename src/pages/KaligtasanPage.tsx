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
    showToast(`Copied hotline number: ${num}`, 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Editorial Header (Cardless & Official) */}
      <div className="pt-2 pb-1 border-b border-ios-lightBorder/80 dark:border-ios-darkBorder/80">
        <div className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-1">
          <ShieldAlert className="w-4 h-4 text-red-600 dark:text-red-400" />
          <span>Official Emergency & Safety Center</span>
        </div>
        <h1 className="text-[24px] sm:text-[30px] font-bold tracking-tight text-ios-lightText dark:text-ios-darkText leading-tight">
          KALIGTASAN: National Hotlines & Disaster Preparedness
        </h1>
        <p className="text-[14px] text-ios-lightMuted dark:text-ios-darkMuted mt-1.5 max-w-2xl leading-relaxed">
          Immediate access to verified national emergency responders across the Philippines: PNP Police, BFP Fire Protection, Philippine Red Cross, NDRRMC, and Mental Health Crisis Support.
        </p>

        {/* iOS Segmented Tabs */}
        <div className="mt-4 pt-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-2">
          {[
            { id: 'hotlines', label: 'Emergency Hotlines', count: hotlines.length },
            { id: 'guides', label: 'Typhoon & Earthquake Guides', count: disasterGuides.length },
            { id: 'firstaid', label: 'First Aid Protocols', count: firstAidGuides.length },
            { id: 'evac', label: 'Evacuation Centers (Sample)', count: SAMPLE_EVACUATION_CENTERS.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white shadow-2xs font-semibold'
                  : 'bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightText dark:text-ios-darkText hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. HOTLINES TAB (Cardless Flat Table Rows) */}
      {activeTab === 'hotlines' && (
        <div className="space-y-2">
          <div className="px-1 text-[12px] text-ios-lightMuted dark:text-ios-darkMuted">
            Verified emergency contact numbers operating 24/7 nationwide under the Republic of the Philippines.
          </div>

          <div className="w-full divide-y divide-ios-lightBorder/80 dark:divide-ios-darkBorder/80">
            {hotlines.map(hotline => {
              const cleanNumber = hotline.hotlineNumber?.replace(/[^0-9]/g, '') || '';
              return (
                <div
                  key={hotline.id}
                  className="py-3.5 px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[12px] font-bold tracking-wide uppercase text-ios-navy dark:text-blue-400">
                        {hotline.agencyAcronym || hotline.agency}
                      </span>
                      {hotline.isNationalHotline && (
                        <Badge variant="verified">24/7 National</Badge>
                      )}
                    </div>
                    <h3 className="text-[16px] font-bold text-ios-lightText dark:text-ios-darkText leading-snug">
                      {hotline.title}
                    </h3>
                    <p className="text-[13px] text-ios-lightMuted dark:text-ios-darkMuted leading-relaxed mt-0.5 line-clamp-2">
                      {hotline.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-1 sm:pt-0">
                    <span className="text-[15px] font-mono font-bold text-red-600 dark:text-red-400">
                      {hotline.hotlineNumber}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopyNumber(hotline.id, hotline.hotlineNumber || '')}
                        className="px-2.5 py-1.5 rounded-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary hover:bg-slate-200 dark:hover:bg-slate-700 text-[12px] font-medium text-ios-lightText dark:text-ios-darkText flex items-center gap-1 transition-colors"
                        title="Copy hotline number"
                      >
                        {copiedId === hotline.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">Copy</span>
                      </button>
                      <a
                        href={`tel:${cleanNumber}`}
                        className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[13px] font-bold flex items-center gap-1.5 shadow-2xs ios-active"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        Call
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. DISASTER GUIDES TAB (Cardless Flat Rows) */}
      {activeTab === 'guides' && (
        <div className="w-full divide-y divide-ios-lightBorder/80 dark:divide-ios-darkBorder/80">
          {disasterGuides.map(guide => (
            <div
              key={guide.id}
              className="py-4 px-1"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[12px] font-bold uppercase text-ios-navy dark:text-blue-400">
                  {guide.agencyAcronym || guide.agency}
                </span>
                <span className="text-[12px] text-ios-lightMuted dark:text-ios-darkMuted font-medium">
                  {guide.operatingHours}
                </span>
              </div>
              <h3 className="text-[16px] font-bold text-ios-lightText dark:text-ios-darkText mb-1">
                {guide.title}
              </h3>
              <p className="text-[13px] text-ios-lightMuted dark:text-ios-darkMuted mb-3 leading-relaxed">
                {guide.description}
              </p>

              {guide.actionProtocol && (
                <div className="p-3.5 rounded-lg bg-ios-lightSecondary/70 dark:bg-ios-darkSecondary/70 space-y-2 border border-ios-lightBorder/60 dark:border-ios-darkBorder/60">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-ios-navy dark:text-blue-400">
                    Precautionary Protocols & Action Steps:
                  </h4>
                  <ul className="space-y-1.5 text-[13px] text-ios-lightText dark:text-ios-darkText">
                    {guide.actionProtocol.map((proto, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
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

      {/* 3. FIRST AID PROTOCOLS TAB (Cardless Flat Rows) */}
      {activeTab === 'firstaid' && (
        <div className="w-full divide-y divide-ios-lightBorder/80 dark:divide-ios-darkBorder/80">
          {firstAidGuides.map(fa => (
            <div
              key={fa.id}
              className="py-4 px-1"
            >
              <div className="flex items-center gap-2 mb-1">
                <HeartPulse className="w-4 h-4 text-red-500" />
                <h3 className="text-[16px] font-bold text-ios-lightText dark:text-ios-darkText">
                  {fa.title}
                </h3>
              </div>
              <p className="text-[13px] text-ios-lightMuted dark:text-ios-darkMuted mb-3 leading-relaxed">
                {fa.description}
              </p>

              {fa.actionProtocol && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {fa.actionProtocol.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-ios-lightSecondary/60 dark:bg-ios-darkSecondary/60 border border-ios-lightBorder/60 dark:border-ios-darkBorder/60 text-[13px]"
                    >
                      <span className="font-bold text-red-600 dark:text-red-400 block mb-0.5 text-[12px]">
                        Step #{idx + 1}
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

      {/* 4. EVACUATION CENTERS TAB (Cardless Flat Rows) */}
      {activeTab === 'evac' && (
        <div className="space-y-3">
          <div className="p-3 rounded-lg border-l-4 border-amber-500 bg-amber-50/60 dark:bg-amber-950/20 text-[12px] text-amber-900 dark:text-amber-200 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Prototype Demonstration Notice:</span> The evacuation center listings below are sample fixtures for demonstration. During an actual emergency or typhoon, contact your local Barangay Disaster Risk Reduction and Management Council (BDRRMC) for officially designated shelters in your area.
            </div>
          </div>

          <div className="w-full divide-y divide-ios-lightBorder/80 dark:divide-ios-darkBorder/80">
            {SAMPLE_EVACUATION_CENTERS.map(evac => (
              <div
                key={evac.id}
                className="py-3.5 px-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[12px] font-bold text-ios-navy dark:text-blue-400">
                      {evac.lgu}, {evac.province}
                    </span>
                    <Badge variant="outline">Capacity: {evac.capacityPersons} persons</Badge>
                  </div>
                  <h4 className="text-[15px] font-bold text-ios-lightText dark:text-ios-darkText">
                    {evac.name}
                  </h4>
                  <p className="text-[13px] text-ios-lightMuted dark:text-ios-darkMuted flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-ios-lightMuted shrink-0" /> {evac.address}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {evac.amenities.map(a => (
                      <span
                        key={a}
                        className="text-[11px] bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightMuted px-2 py-0.5 rounded-full"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-right shrink-0 w-full sm:w-auto pt-1 sm:pt-0">
                  <span className="text-[11px] text-ios-lightMuted block mb-0.5">
                    Local Disaster Hotline:
                  </span>
                  <span className="text-[14px] font-mono font-bold text-ios-lightText dark:text-ios-darkText block">
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
