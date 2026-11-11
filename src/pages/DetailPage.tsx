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
  ArrowLeft,
  Bookmark,
  Share2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
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
      <div className="py-8">
        <EmptyState
          icon={<AlertTriangle className="w-8 h-8 text-amber-500" />}
          title="Information Not Found"
          description="This entry may have been updated, relocated, or archived in the public directory."
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
        text: `View ${item.title} on GabayPH Public Services:`,
        url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      showToast('Link copied to your clipboard!', 'success');
    }
  };

  const srv = item.category === 'serbisyo' ? (item as ServiceItem) : null;
  const job = item.category === 'trabaho' ? (item as JobItem) : null;
  const ast = item.category === 'pera' ? (item as FinancialAssistanceItem) : null;
  const byh = item.category === 'bayanihan' ? (item as BayanihanItem) : null;
  const edu = item.category === 'aral' ? (item as EducationItem) : null;
  const safe = item.category === 'kaligtasan' ? (item as EmergencyResourceItem) : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-1.5 text-xs font-semibold text-ios-lightMuted hover:text-ios-lightText dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="flex items-center gap-1.5">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-2 rounded-ios-lg bg-ios-lightSurface dark:bg-ios-darkSurface border border-ios-lightBorder dark:border-ios-darkBorder text-ios-lightMuted hover:text-ios-lightText transition-colors"
            title="Share this public service"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => {
              const state = toggleSave(item.id);
              showToast(state ? 'Saved to bookmarks!' : 'Removed from bookmarks.', 'info');
            }}
            className={`p-2 rounded-ios-lg border transition-colors ${
              saved
                ? 'bg-blue-50 dark:bg-blue-950/40 text-ios-navy dark:text-blue-400 border-blue-200 dark:border-blue-800'
                : 'bg-ios-lightSurface dark:bg-ios-darkSurface border-ios-lightBorder dark:border-ios-darkBorder text-ios-lightMuted hover:text-ios-lightText'
            }`}
            title="Save to bookmarks"
            aria-label="Save"
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>

          {/* Report Button */}
          <button
            onClick={() => openReportModal({ id: item.id, title: item.title })}
            className="p-2 rounded-ios-lg bg-ios-lightSurface dark:bg-ios-darkSurface border border-ios-lightBorder dark:border-ios-darkBorder text-ios-lightMuted hover:text-red-500 transition-colors"
            title="Report incorrect information"
            aria-label="Report incorrect information"
          >
            <AlertTriangle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Card Header */}
      <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-6 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm">
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <Badge category={item.category} size="md">
            {item.category.toUpperCase()}
          </Badge>
          <span className="text-xs font-semibold text-ios-navy dark:text-blue-400">
            {item.agency} {item.agencyAcronym ? `(${item.agencyAcronym})` : ''}
          </span>
          {item.isVerified && (
            <Badge variant="verified">
              <ShieldCheck className="w-3 h-3" /> Verified: {item.lastVerified}
            </Badge>
          )}
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-ios-lightText dark:text-ios-darkText tracking-tight mb-2">
          {item.title}
        </h1>

        <p className="text-xs sm:text-sm text-ios-lightMuted dark:text-ios-darkMuted leading-relaxed">
          {item.description}
        </p>

        {/* Quick Meta Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 pt-4 border-t border-ios-lightBorder dark:border-ios-darkBorder text-xs">
          {srv && (
            <>
              <div className="p-2.5 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary">
                <span className="text-ios-lightMuted block text-[11px] font-medium">Official Processing Fee:</span>
                <span className="font-semibold text-ios-lightText dark:text-ios-darkText">{srv.fees}</span>
              </div>
              <div className="p-2.5 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary">
                <span className="text-ios-lightMuted block text-[11px] font-medium">Processing Time:</span>
                <span className="font-semibold text-ios-lightText dark:text-ios-darkText">{srv.processingTime}</span>
              </div>
              <div className="p-2.5 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary">
                <span className="text-ios-lightMuted block text-[11px] font-medium">Implementing Agency:</span>
                <span className="font-semibold text-ios-lightText dark:text-ios-darkText">{srv.agencyAcronym || srv.agency}</span>
              </div>
            </>
          )}

          {job && (
            <>
              <div className="p-2.5 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary">
                <span className="text-ios-lightMuted block text-[11px] font-medium">Monthly Salary Schedule:</span>
                <span className="font-semibold text-ios-navy dark:text-blue-400">{job.salaryRange}</span>
              </div>
              <div className="p-2.5 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary">
                <span className="text-ios-lightMuted block text-[11px] font-medium">Office Location:</span>
                <span className="font-semibold text-ios-lightText dark:text-ios-darkText">{job.location}</span>
              </div>
              <div className="p-2.5 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary">
                <span className="text-ios-lightMuted block text-[11px] font-medium">Application Deadline:</span>
                <span className="font-semibold text-red-600 dark:text-red-400">{job.deadline}</span>
              </div>
            </>
          )}

          {ast && (
            <>
              <div className="p-2.5 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary">
                <span className="text-ios-lightMuted block text-[11px] font-medium">Assistance Amount / Coverage:</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">{ast.amountOrCoverage}</span>
              </div>
              <div className="p-2.5 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary">
                <span className="text-ios-lightMuted block text-[11px] font-medium">Disbursement Mode:</span>
                <span className="font-semibold text-ios-lightText dark:text-ios-darkText">{ast.disbursementMode}</span>
              </div>
              <div className="p-2.5 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary">
                <span className="text-ios-lightMuted block text-[11px] font-medium">Assistance Classification:</span>
                <span className="font-semibold text-ios-lightText dark:text-ios-darkText capitalize">{ast.assistanceType.replace('_', ' ')}</span>
              </div>
            </>
          )}

          {byh && (
            <>
              <div className="p-2.5 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary">
                <span className="text-ios-lightMuted block text-[11px] font-medium">Lead Organization:</span>
                <span className="font-semibold text-ios-lightText dark:text-ios-darkText">{byh.organization}</span>
              </div>
              <div className="p-2.5 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary">
                <span className="text-ios-lightMuted block text-[11px] font-medium">Activity Location:</span>
                <span className="font-semibold text-ios-lightText dark:text-ios-darkText">{byh.location}</span>
              </div>
              <div className="p-2.5 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary">
                <span className="text-ios-lightMuted block text-[11px] font-medium">Contact Hotline:</span>
                <span className="font-semibold text-ios-lightText dark:text-ios-darkText">{byh.contactNumber}</span>
              </div>
            </>
          )}

          {edu && (
            <>
              <div className="p-2.5 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary">
                <span className="text-ios-lightMuted block text-[11px] font-medium">Target Academic Level:</span>
                <span className="font-semibold text-ios-lightText dark:text-ios-darkText capitalize">{edu.educationalLevel}</span>
              </div>
              <div className="p-2.5 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary">
                <span className="text-ios-lightMuted block text-[11px] font-medium">Registration Deadline:</span>
                <span className="font-semibold text-red-600 dark:text-red-400">{edu.deadline}</span>
              </div>
              <div className="p-2.5 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary">
                <span className="text-ios-lightMuted block text-[11px] font-medium">Scholarship Classification:</span>
                <span className="font-semibold text-ios-lightText dark:text-ios-darkText capitalize">{edu.educationType}</span>
              </div>
            </>
          )}

          {safe && (
            <>
              <div className="p-2.5 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary">
                <span className="text-ios-lightMuted block text-[11px] font-medium">Emergency Hotline Number:</span>
                <span className="font-bold text-red-600 font-mono text-sm">{safe.hotlineNumber || 'N/A'}</span>
              </div>
              <div className="p-2.5 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary">
                <span className="text-ios-lightMuted block text-[11px] font-medium">Response Hours:</span>
                <span className="font-semibold text-ios-lightText dark:text-ios-darkText">{safe.operatingHours}</span>
              </div>
              <div className="p-2.5 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary">
                <span className="text-ios-lightMuted block text-[11px] font-medium">Jurisdiction / Coverage:</span>
                <span className="font-semibold text-ios-lightText dark:text-ios-darkText">{safe.coverage}</span>
              </div>
            </>
          )}
        </div>

        {/* Action Button Strip */}
        <div className="mt-5 pt-4 border-t border-ios-lightBorder dark:border-ios-darkBorder flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            {item.officialUrl && (
              <a
                href={item.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-ios-lg bg-ios-navy hover:bg-ios-navyLight text-white text-xs font-semibold shadow-ios-sm ios-active"
              >
                Visit Official Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {byh && (
              <Button
                variant="green"
                size="sm"
                onClick={() => openVolunteerModal({ id: byh.id, title: byh.title })}
              >
                Volunteer for this Program
              </Button>
            )}
            {safe && safe.hotlineNumber && (
              <a
                href={`tel:${safe.hotlineNumber.replace(/[^0-9]/g, '')}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-ios-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-ios-sm"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Call Immediately ({safe.hotlineNumber})
              </a>
            )}
          </div>

          <button
            onClick={() => openReportModal({ id: item.id, title: item.title })}
            className="text-xs text-ios-lightMuted hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1"
          >
            <AlertTriangle className="w-3.5 h-3.5" /> Found inaccurate information? Report here
          </button>
        </div>
      </div>

      {/* Requirements Section */}
      {(srv?.requirements || job?.requirements || ast?.requiredDocuments || edu?.requirements) && (
        <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-6 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm">
          <h2 className="text-base font-bold text-ios-lightText dark:text-ios-darkText mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Documentary Requirements Checklist
          </h2>
          <ul className="space-y-2 text-xs sm:text-sm text-ios-lightText dark:text-ios-darkText">
            {(srv?.requirements || job?.requirements || ast?.requiredDocuments || edu?.requirements || []).map((req, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                  ✓
                </span>
                <span className="flex-1 leading-relaxed">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Step-by-Step Instructions */}
      {(srv?.steps || job?.howToApply || ast?.applicationSteps || edu?.applicationSteps || byh?.howToParticipate || safe?.actionProtocol) && (
        <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-6 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm">
          <h2 className="text-base font-bold text-ios-lightText dark:text-ios-darkText mb-3">
            Step-by-Step Application Procedures & Guidelines
          </h2>
          <div className="space-y-3">
            {(srv?.steps || job?.howToApply || ast?.applicationSteps || edu?.applicationSteps || byh?.howToParticipate || safe?.actionProtocol || []).map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary text-xs sm:text-sm"
              >
                <div className="w-6 h-6 rounded-full bg-ios-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>
                <p className="flex-1 text-ios-lightText dark:text-ios-darkText leading-relaxed pt-0.5">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Services */}
      {relatedItems.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ios-lightMuted dark:text-ios-darkMuted mb-2 px-1">
            Related Public Services & Opportunities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedItems.map(rel => (
              <button
                key={rel.id}
                onClick={() => navigate(`/item/${rel.id}`)}
                className="p-3.5 rounded-ios-xl bg-ios-lightSurface dark:bg-ios-darkSurface border border-ios-lightBorder dark:border-ios-darkBorder text-left hover:border-ios-navy dark:hover:border-blue-400 transition-colors group"
              >
                <Badge category={rel.category} size="sm" className="mb-1.5">
                  {rel.category}
                </Badge>
                <h4 className="text-xs font-bold text-ios-lightText dark:text-ios-darkText group-hover:text-ios-navy dark:group-hover:text-blue-400 line-clamp-2">
                  {rel.title}
                </h4>
                <p className="text-[11px] text-ios-lightMuted dark:text-ios-darkMuted mt-1 line-clamp-1">
                  {rel.agency}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
