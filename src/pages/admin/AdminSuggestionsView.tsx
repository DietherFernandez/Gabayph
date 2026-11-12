import React, { useState, useMemo } from 'react';
import { ServiceSuggestion, ServiceItem } from '../../types';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
import {
  CheckCircle2,
  Search,
  ExternalLink,
  Calendar,
  Building2,
  RefreshCw,
  Sparkles
} from 'lucide-react';

interface AdminSuggestionsViewProps {
  onDataChanged: () => void;
}

export const AdminSuggestionsView: React.FC<AdminSuggestionsViewProps> = ({
  onDataChanged
}) => {
  const { showToast } = useToast();
  const [suggestions, setSuggestions] = useState<ServiceSuggestion[]>(() => MockStorage.getSuggestions());
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const refreshList = () => {
    setSuggestions(MockStorage.getSuggestions());
    onDataChanged();
  };

  const handleUpdateStatus = (id: string, status: ServiceSuggestion['status'], name: string) => {
    MockStorage.updateSuggestionStatus(id, status);
    refreshList();
    showToast(`Suggestion "${name}" updated to ${status}.`, 'info');
  };

  const handleApproveAndPromote = (sug: ServiceSuggestion) => {
    // 1. Mark suggestion as approved
    MockStorage.updateSuggestionStatus(sug.id, 'approved');

    // 2. Automatically create new verified service in public directory
    const newService: ServiceItem = {
      id: `srv-promoted-${Date.now()}`,
      title: sug.serviceName,
      category: 'serbisyo',
      serviceType: 'identity',
      agency: sug.agencyName,
      agencyAcronym: sug.agencyName.slice(0, 4).toUpperCase(),
      description: sug.description,
      requirements: ['Valid Government-issued ID', 'Proof of Billing / Address'],
      eligibility: ['All qualified Filipino citizens'],
      fees: 'Standard Citizen\'s Charter Schedule',
      processingTime: '3–5 working days',
      steps: ['Submit online application via agency portal.', 'Verify identity at regional satellite office.'],
      officeLocations: ['Regional Offices nationwide'],
      onlineServiceAvailable: !!sug.sourceUrl,
      onlineServiceUrl: sug.sourceUrl || 'https://gov.ph',
      lastVerified: 'November 2026',
      isVerified: true
    };

    MockStorage.addItem(newService);
    refreshList();
    showToast(`Approved & promoted "${sug.serviceName}" to official Services Directory!`, 'success');
  };

  const filteredSuggestions = useMemo(() => {
    return suggestions.filter(sug => {
      const matchSearch =
        sug.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sug.agencyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sug.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'all' || sug.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [suggestions, searchQuery, statusFilter]);

  const pendingCount = suggestions.filter(s => s.status === 'pending').length;

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* 1. View Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[rgba(52,199,89,0.12)] text-[#34C759] font-mono">
              Crowdsourcing Queue
            </span>
            <span className="text-[12px] text-[#8E8E93] flex items-center gap-1.5 font-medium">
              <span className={`w-1.5 h-1.5 rounded-full ${pendingCount > 0 ? 'bg-[#FF9500]' : 'bg-[#34C759]'}`} />
              {pendingCount > 0 ? `${pendingCount} Submissions Awaiting Review` : `${suggestions.length} Submissions Processed`}
            </span>
          </div>
          <h1 className="text-[20px] sm:text-[24px] font-bold tracking-tight text-black dark:text-white leading-tight">
            Service Suggestions Queue
          </h1>
          <p className="text-[13px] text-[#8E8E93]">
            Review crowdsourced government services submitted by citizens for directory inclusion
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={refreshList}
            title="Refresh suggestions list"
            className="h-9 px-3 rounded-[10px] bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] hover:bg-[rgba(118,118,128,0.2)] text-black dark:text-white text-[13px] font-medium transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* 2. Cohesive Cardless Inset Queue Container */}
      <div className="rounded-[16px] bg-white dark:bg-[#1C1C1E] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)] divide-y divide-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)] overflow-hidden">
        {/* Integrated Management Toolbar */}
        <div className="p-3 sm:p-3.5 bg-black/[0.015] dark:bg-white/[0.02] flex flex-col md:flex-row items-center gap-2.5">
          <div className="relative flex-1 w-full">
            <Search className="w-3.5 h-3.5 text-[#8E8E93] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search suggestion name, government agency, or details..."
              className="w-full h-8 pl-8 pr-3 text-[13px] rounded-[8px] bg-[rgba(118,118,128,0.1)] dark:bg-[rgba(118,118,128,0.2)] text-black dark:text-white placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-[#007AFF]"
            />
          </div>

          <div className="bg-[rgba(118,118,128,0.1)] dark:bg-[rgba(118,118,128,0.2)] p-0.5 rounded-[9px] flex items-center gap-0.5 w-full sm:w-auto overflow-x-auto shrink-0">
            {(['all', 'pending', 'approved', 'rejected'] as const).map(tab => {
              const active = statusFilter === tab;
              const count = tab === 'all' ? suggestions.length : suggestions.filter(s => s.status === tab).length;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setStatusFilter(tab)}
                  className={`h-7 px-3 rounded-[7px] text-[12px] font-medium capitalize whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-[#007AFF] text-white font-semibold shadow-2xs'
                      : 'text-black dark:text-[#EBEBF5]/90 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {tab} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Suggestions Queue List */}
        {filteredSuggestions.length === 0 ? (
          <div className="p-10 text-center text-[13px] text-[#8E8E93] space-y-2">
            <CheckCircle2 className="w-8 h-8 mx-auto text-[#34C759]" />
            <p className="font-semibold text-black dark:text-white">No suggestions found in this view</p>
            <p className="text-[12px]">Citizen submissions will appear here for administrative verification.</p>
          </div>
        ) : (
          filteredSuggestions.map(sug => (
            <div
              key={sug.id}
              className="p-4 sm:p-4.5 hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-[14px] text-black dark:text-white leading-tight">
                    {sug.serviceName}
                  </h3>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[#007AFF]">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{sug.agencyName}</span>
                  </span>
                </div>

                <div>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase ${
                      sug.status === 'approved'
                        ? 'bg-[rgba(52,199,89,0.12)] text-[#34C759]'
                        : sug.status === 'pending'
                        ? 'bg-[rgba(255,149,0,0.12)] text-[#FF9500]'
                        : 'bg-[rgba(255,59,48,0.12)] text-[#FF3B30]'
                    }`}
                  >
                    {sug.status}
                  </span>
                </div>
              </div>

              <p className="text-[13px] text-[#8E8E93] leading-relaxed">
                {sug.description}
              </p>

              {sug.sourceUrl && (
                <div className="text-[12px]">
                  <a
                    href={sug.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#007AFF] hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    <span>Suggested URL: {sug.sourceUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-[12px] text-[#8E8E93]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#8E8E93]" />
                    <span>Submitted: {sug.submittedAt}</span>
                  </span>
                  {sug.submittedBy && (
                    <span>By: {sug.submittedBy}</span>
                  )}
                </div>

                <div className="flex items-center gap-2 justify-end">
                  {sug.status !== 'approved' && (
                    <button
                      type="button"
                      onClick={() => handleApproveAndPromote(sug)}
                      className="h-7 px-3 rounded-[8px] bg-[#34C759] hover:bg-emerald-600 active:scale-[0.98] text-white text-[12px] font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Approve & Promote</span>
                    </button>
                  )}
                  {sug.status !== 'rejected' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(sug.id, 'rejected', sug.serviceName)}
                      className="h-7 px-2.5 rounded-[8px] bg-[rgba(255,59,48,0.12)] hover:bg-[rgba(255,59,48,0.2)] text-[#FF3B30] text-[12px] font-medium transition-colors cursor-pointer"
                    >
                      Reject
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
