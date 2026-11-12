import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MockStorage } from '../data/mockStorage';
import {
  ServiceItem,
  JobItem,
  FinancialAssistanceItem,
  BayanihanItem,
  EducationItem,
  EmergencyResourceItem
} from '../types';
import {
  ChevronLeft,
  Bookmark,
  Share2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  Check
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { useToast } from '../context/ToastContext';
import { EmptyState } from '../components/common/EmptyState';

export const DetailPage: React.FC = () => {
  const {
    currentPath,
    navigate,
    toggleSave,
    isSaved,
    openReportModal,
    openVolunteerModal
  } = useApp();
  const { showToast } = useToast();

  const itemId = currentPath.replace('/item/', '');
  const item = useMemo(() => MockStorage.getItemById(itemId), [itemId]);

  const relatedItems = useMemo(() => {
    if (!item) return [];
    return MockStorage.getAllItems()
      .filter(i => i.category === item.category && i.id !== item.id)
      .slice(0, 3);
  }, [item]);

  if (!item) {
    return (
      <div className="py-12">
        <EmptyState
          icon={<AlertTriangle className="w-10 h-10 text-amber-500 opacity-50" />}
          title="Information Not Found"
          description="This entry may have been updated or archived in the public directory."
          actionLabel="Return to Homepage"
          onAction={() => navigate('/')}
        />
      </div>
    );
  }

  const saved = isSaved(item.id);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: `View ${item.title} on GabayPH:`,
        url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      showToast('Link copied to your clipboard', 'success');
    }
  };

  const srv = item.category === 'serbisyo' ? (item as ServiceItem) : null;
  const job = item.category === 'trabaho' ? (item as JobItem) : null;
  const ast = item.category === 'pera' ? (item as FinancialAssistanceItem) : null;
  const byh = item.category === 'bayanihan' ? (item as BayanihanItem) : null;
  const edu = item.category === 'aral' ? (item as EducationItem) : null;
  const safe = item.category === 'kaligtasan' ? (item as EmergencyResourceItem) : null;

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate(`/${item.category}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-7 pb-28 animate-in fade-in duration-200 px-4 sm:px-6">
      {/* 1. iOS Back Chevron Navigation Header */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={handleBack}
          aria-label="Go back to previous page"
          className="inline-flex items-center gap-0.5 text-[16px] font-medium text-[#007AFF] dark:text-[#0A84FF] hover:opacity-80 active:opacity-60 transition-opacity select-none cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.4]" />
          <span className="capitalize">{item.category}</span>
        </button>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleShare}
            className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full text-[#007AFF] dark:text-[#0A84FF] hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-transform cursor-pointer"
            aria-label="Share entry"
          >
            <Share2 className="w-5 h-5 stroke-[2]" />
          </button>
          <button
            onClick={() => {
              const state = toggleSave(item.id);
              showToast(state ? 'Saved to bookmarks' : 'Removed from bookmarks', 'info');
            }}
            className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-full text-[#007AFF] dark:text-[#0A84FF] hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 transition-transform cursor-pointer"
            aria-label="Bookmark entry"
          >
            <Bookmark className={`w-5 h-5 stroke-[2] ${saved ? 'fill-[#007AFF]' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. Cardless Editorial Document Header */}
      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge category={item.category} size="md">
            {item.category}
          </Badge>
          <span className="text-[13px] text-[#34C759] font-medium flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 stroke-[2.2]" /> Verified: {item.lastVerified}
          </span>
        </div>

        <h1 className="text-[24px] sm:text-[28px] font-bold text-black dark:text-white leading-tight mb-2 tracking-tight">
          {item.title}
        </h1>

        <p className="text-[15px] font-medium text-[#8E8E93] mb-3">
          {item.agency} {item.agencyAcronym ? `(${item.agencyAcronym})` : ''}
        </p>

        <p className="text-[15px] text-black/85 dark:text-white/85 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* 3. Official Key-Value Specification Table (Cardless Flat Table) */}
      <div className="border-y border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)] divide-y divide-[rgba(60,60,67,0.12)] dark:divide-[rgba(84,84,88,0.35)] text-[14px]">
        {srv && (
          <>
            <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-[#8E8E93] text-[13px]">Schedule of Fees</span>
              <span className="font-semibold text-black dark:text-white text-left sm:text-right">{srv.fees}</span>
            </div>
            <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-[#8E8E93] text-[13px]">Processing Time</span>
              <span className="font-semibold text-black dark:text-white text-left sm:text-right">{srv.processingTime}</span>
            </div>
            <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-[#8E8E93] text-[13px]">Implementing Agency</span>
              <span className="font-semibold text-black dark:text-white text-left sm:text-right">{srv.agency}</span>
            </div>
          </>
        )}

        {job && (
          <>
            <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-[#8E8E93] text-[13px]">Monthly Salary</span>
              <span className="font-semibold text-[#34C759] text-left sm:text-right">{job.salaryRange}</span>
            </div>
            <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-[#8E8E93] text-[13px]">Application Deadline</span>
              <span className="font-semibold text-[#FF9500] text-left sm:text-right">{job.deadline}</span>
            </div>
            <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-[#8E8E93] text-[13px]">Employment Classification</span>
              <span className="font-semibold text-black dark:text-white capitalize text-left sm:text-right">{job.employmentType}</span>
            </div>
            <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-[#8E8E93] text-[13px]">Location / Station</span>
              <span className="font-semibold text-black dark:text-white text-left sm:text-right">{job.location}</span>
            </div>
          </>
        )}

        {ast && (
          <>
            <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-[#8E8E93] text-[13px]">Grant / Subsidy Amount</span>
              <span className="font-semibold text-[#34C759] text-left sm:text-right">{ast.amountOrCoverage}</span>
            </div>
            <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-[#8E8E93] text-[13px]">Assistance Classification</span>
              <span className="font-semibold text-black dark:text-white capitalize text-left sm:text-right">{ast.assistanceType}</span>
            </div>
            <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-[#8E8E93] text-[13px]">Disbursement Mode</span>
              <span className="font-semibold text-black dark:text-white text-left sm:text-right">{ast.disbursementMode}</span>
            </div>
          </>
        )}

        {edu && (
          <>
            <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-[#8E8E93] text-[13px]">Target Academic Level</span>
              <span className="font-semibold text-black dark:text-white capitalize text-left sm:text-right">{edu.educationalLevel}</span>
            </div>
            <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-[#8E8E93] text-[13px]">Registration Deadline</span>
              <span className="font-semibold text-[#FF9500] text-left sm:text-right">{edu.deadline}</span>
            </div>
            <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-[#8E8E93] text-[13px]">Scholarship Classification</span>
              <span className="font-semibold text-black dark:text-white capitalize text-left sm:text-right">{edu.educationType}</span>
            </div>
          </>
        )}

        {safe && (
          <>
            <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-[#8E8E93] text-[13px]">Emergency Hotline</span>
              <span className="font-bold text-[#FF3B30] text-left sm:text-right">{safe.hotlineNumber || 'N/A'}</span>
            </div>
            <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-[#8E8E93] text-[13px]">Response Hours</span>
              <span className="font-semibold text-black dark:text-white text-left sm:text-right">{safe.operatingHours}</span>
            </div>
            <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-[#8E8E93] text-[13px]">Coverage</span>
              <span className="font-semibold text-black dark:text-white text-left sm:text-right">{safe.coverage}</span>
            </div>
          </>
        )}
      </div>

      {/* 4. Requirements Section (Cardless Flat Checklist) */}
      {(srv?.requirements || job?.requirements || ast?.requiredDocuments || edu?.requirements) && (
        <div className="space-y-3 pt-1">
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#8E8E93] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#34C759]" />
            Documentary Requirements Checklist
          </h2>
          <div className="divide-y divide-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)]">
            {(srv?.requirements || job?.requirements || ast?.requiredDocuments || edu?.requirements || []).map((req, idx) => (
              <div key={idx} className="py-2.5 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-[#34C759]/12 text-[#34C759] flex items-center justify-center shrink-0 text-[12px] font-bold mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span className="text-[15px] text-black dark:text-white leading-relaxed">{req}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Step-by-Step Procedure (Cardless Numbered Sequence Timeline) */}
      {(srv?.steps || job?.howToApply || ast?.applicationSteps || edu?.applicationSteps || byh?.howToParticipate || safe?.actionProtocol) && (
        <div className="space-y-3 pt-2">
          <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#8E8E93]">
            Step-by-Step Application Procedures & Guidelines
          </h2>
          <div className="space-y-2.5">
            {(srv?.steps || job?.howToApply || ast?.applicationSteps || edu?.applicationSteps || byh?.howToParticipate || safe?.actionProtocol || []).map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 py-1"
              >
                <div className="w-6 h-6 rounded-full bg-[#007AFF] text-white text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  {idx + 1}
                </div>
                <p className="flex-1 text-[15px] text-black dark:text-white leading-relaxed border-b border-[rgba(60,60,67,0.1)] dark:border-[rgba(84,84,88,0.3)] pb-2.5">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Related Services Flat Inset */}
      {relatedItems.length > 0 && (
        <div className="pt-4 border-t border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)]">
          <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#8E8E93] mb-2.5">
            Related Public Services & Opportunities
          </h3>
          <div className="divide-y divide-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)]">
            {relatedItems.map(rel => (
              <button
                key={rel.id}
                onClick={() => navigate(`/item/${rel.id}`)}
                className="py-3 w-full text-left flex items-center justify-between gap-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors select-none cursor-pointer"
              >
                <div>
                  <h4 className="text-[15px] font-semibold text-black dark:text-white line-clamp-1">
                    {rel.title}
                  </h4>
                  <p className="text-[13px] text-[#8E8E93] mt-0.5">
                    {rel.agency}
                  </p>
                </div>
                <span className="text-[14px] text-[#007AFF] font-medium shrink-0">
                  Tingnan ›
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 7. Sticky Bottom Action Bar with CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#1C1C1E]/90 backdrop-blur-xl border-t border-[rgba(60,60,67,0.14)] dark:border-[rgba(84,84,88,0.4)] p-3 safe-bottom">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          {item.officialUrl ? (
            <a
              href={item.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 h-12 rounded-[12px] bg-[#007AFF] hover:bg-blue-600 text-white font-semibold text-[15px] flex items-center justify-center gap-2 shadow-ios-sm ios-active"
            >
              <span>Visit Official Government Portal</span>
              <ExternalLink className="w-4 h-4 stroke-[2.2]" />
            </a>
          ) : byh ? (
            <button
              onClick={() => openVolunteerModal({ id: byh.id, title: byh.title })}
              className="flex-1 h-12 rounded-[12px] bg-[#34C759] hover:bg-green-600 text-white font-semibold text-[15px] flex items-center justify-center shadow-ios-sm ios-active"
            >
              Volunteer for this Program
            </button>
          ) : safe && safe.hotlineNumber ? (
            <a
              href={`tel:${safe.hotlineNumber.replace(/[^0-9]/g, '')}`}
              className="flex-1 h-12 rounded-[12px] bg-[#FF3B30] hover:bg-red-700 text-white font-semibold text-[15px] flex items-center justify-center gap-2 shadow-ios-sm ios-active"
            >
              <PhoneCall className="w-4 h-4 stroke-[2.2]" />
              <span>Call Hotlines ({safe.hotlineNumber})</span>
            </a>
          ) : (
            <button
              onClick={() => showToast('Information is verified against official records', 'info')}
              className="flex-1 h-12 rounded-[12px] bg-[#007AFF] text-white font-semibold text-[15px] flex items-center justify-center ios-active"
            >
              Verified Government Record
            </button>
          )}

          <button
            onClick={() => openReportModal({ id: item.id, title: item.title })}
            className="p-3 text-[#8E8E93] hover:text-[#FF3B30] transition-colors"
            title="Report correction"
            aria-label="Report inaccurate information"
          >
            <AlertTriangle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
