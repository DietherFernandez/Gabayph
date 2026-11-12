import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MockStorage } from '../data/mockStorage';
import { FileText, Bookmark, Clock, Search, CheckCircle2 } from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { GroupedList, GroupedListItem } from '../components/common/GroupedList';
import { EmptyState } from '../components/common/EmptyState';
import { InlineFilterBar, FilterGroup } from '../components/common/InlineFilterBar';
import { useToast } from '../context/ToastContext';

export const SerbisyoPage: React.FC = () => {
  const { navigate, isSaved, toggleSave } = useApp();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string>>({
    category: 'all',
    fees: 'all'
  });

  const services = useMemo(() => MockStorage.getServices(), []);

  // Filter groups per Section 4 (Category, Fees)
  const filterGroups: FilterGroup[] = [
    {
      id: 'category',
      label: 'Category',
      options: [
        { label: 'Lahat', value: 'all' },
        { label: 'Government IDs', value: 'identity' },
        { label: 'Civil Registry', value: 'civil_registry' },
        { label: 'Clearances', value: 'clearance' },
        { label: 'Business & Trade', value: 'business' },
        { label: 'Health & Medical', value: 'health' },
        { label: 'Social Welfare', value: 'social_welfare' }
      ]
    },
    {
      id: 'fees',
      label: 'Fees',
      options: [
        { label: 'Lahat', value: 'all' },
        { label: 'Libre (Free Only)', value: 'free' },
        { label: 'Standard Fees', value: 'paid' }
      ]
    }
  ];

  const handleSelectFilter = (groupId: string, val: string) => {
    setFilterValues(prev => ({ ...prev, [groupId]: val }));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterValues({ category: 'all', fees: 'all' });
  };

  const hasActiveFilters = Boolean(
    searchQuery.trim() !== '' ||
    (filterValues.category && filterValues.category !== 'all') ||
    (filterValues.fees && filterValues.fees !== 'all')
  );

  const filteredServices = useMemo(() => {
    return services.filter(srv => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        srv.title.toLowerCase().includes(q) ||
        srv.agency.toLowerCase().includes(q) ||
        (srv.agencyAcronym && srv.agencyAcronym.toLowerCase().includes(q)) ||
        srv.description.toLowerCase().includes(q);

      const matchesType =
        filterValues.category === 'all' || srv.serviceType === filterValues.category;

      const matchesFee =
        filterValues.fees === 'all'
          ? true
          : filterValues.fees === 'free'
          ? srv.fees.toLowerCase().includes('free') || srv.fees.includes('₱0')
          : !srv.fees.toLowerCase().includes('free');

      return matchesSearch && matchesType && matchesFee;
    });
  }, [services, searchQuery, filterValues]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto px-4 sm:px-6">
      {/* 1. Header Block with Large Title, Search, and InlineFilterBar */}
      <div className="pt-2">
        <h1 className="text-[28px] sm:text-[34px] font-bold tracking-tight text-black dark:text-white leading-[1.2] mb-1.5">
          Serbisyo
        </h1>
        <p className="text-[15px] text-[#8E8E93] leading-relaxed mb-4">
          Government IDs, Civil Registry Documents & National Clearances
        </p>

        {/* 2. iOS Search Field */}
        <div className="w-full flex items-center gap-2.5 bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] h-11 px-3.5 rounded-[10px] mb-2.5">
          <Search className="w-[18px] h-[18px] text-[#8E8E93] shrink-0 stroke-[2.2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search services or agencies (e.g. PSA, Passport)..."
            className="w-full bg-transparent text-[16px] text-black dark:text-white placeholder-[#8E8E93] focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[13px] text-[#8E8E93] hover:text-black dark:hover:text-white px-1"
            >
              Clear
            </button>
          )}
        </div>

        {/* 3. InlineFilterBar (Category, Fees) */}
        <InlineFilterBar
          groups={filterGroups}
          selectedValues={filterValues}
          onSelect={handleSelectFilter}
          onReset={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {/* 4. Results List Header & Inset Grouped List */}
      <div>
        {filteredServices.length > 0 ? (
          <GroupedList
            title={`${filteredServices.length} MATCHING SERVICES`}
            subtitle="Click a service to view documentary requirements and procedures"
          >
            {filteredServices.map(srv => {
              const saved = isSaved(srv.id);
              return (
                <GroupedListItem
                  key={srv.id}
                  onClick={() => navigate(`/item/${srv.id}`)}
                  leadingIcon={<FileText className="w-5 h-5 stroke-[2]" />}
                  title={
                    <div className="flex items-center gap-2 flex-wrap">
                      <span>{srv.title}</span>
                      <Badge category="serbisyo" size="sm">
                        {srv.serviceType}
                      </Badge>
                      {srv.onlineServiceAvailable && (
                        <span className="text-[11px] font-semibold text-[#34C759] bg-[#34C759]/12 px-2 py-0.2 rounded-full">
                          Online
                        </span>
                      )}
                    </div>
                  }
                  subtitle={`${srv.agency} (${srv.agencyAcronym}) • ${srv.fees}`}
                  metadata={
                    <>
                      <span className="flex items-center gap-1 text-[13px]">
                        <Clock className="w-3.5 h-3.5 text-[#8E8E93]" /> {srv.processingTime.split(';')[0]}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[13px] text-[#34C759] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified: {srv.lastVerified}
                      </span>
                    </>
                  }
                  trailing={
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        const state = toggleSave(srv.id);
                        showToast(state ? 'Saved service to bookmarks' : 'Removed from bookmarks', 'info');
                      }}
                      className="p-2 text-[#8E8E93] hover:text-[#007AFF] transition-colors"
                      aria-label="Bookmark service"
                    >
                      <Bookmark className={`w-4 h-4 transition-transform active:scale-125 ${saved ? 'fill-[#007AFF] text-[#007AFF]' : ''}`} />
                    </button>
                  }
                />
              );
            })}
          </GroupedList>
        ) : (
          <EmptyState
            icon={<FileText className="w-10 h-10 opacity-50" />}
            title="Walang tugma na resulta"
            description="Subukan ang ibang salita o alisin ang mga filter."
            actionLabel="I-clear ang Filters"
            onAction={handleResetFilters}
          />
        )}
      </div>

      {/* 5. Footnote Verification Row */}
      <div className="pt-2 pb-6 text-center">
        <p className="text-[13px] text-[#8E8E93]">
          All procedures and citizen's charter standards are verified against official agency publications.
        </p>
      </div>
    </div>
  );
};
