import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MockStorage } from '../data/mockStorage';
import { Bookmark, Search, CheckCircle2 } from 'lucide-react';
import { GroupedList, GroupedListItem } from '../components/common/GroupedList';
import { PesoSign } from '../components/common/PesoSign';
import { EmptyState } from '../components/common/EmptyState';
import { InlineFilterBar, FilterGroup } from '../components/common/InlineFilterBar';
import { useToast } from '../context/ToastContext';

export const PeraPage: React.FC = () => {
  const { navigate, isSaved, toggleSave } = useApp();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string>>({
    type: 'all'
  });

  const assistance = useMemo(() => MockStorage.getAssistance(), []);

  const filterGroups: FilterGroup[] = [
    {
      id: 'type',
      label: 'Uri ng Ayuda',
      options: [
        { label: 'Lahat', value: 'all' },
        { label: 'Cash Grant', value: 'cash_grant' },
        { label: 'Emergency Aid', value: 'emergency_aid' },
        { label: 'Livelihood Assistance', value: 'livelihood' },
        { label: 'Social Pension', value: 'pension' }
      ]
    }
  ];

  const handleSelectFilter = (groupId: string, val: string) => {
    setFilterValues(prev => ({ ...prev, [groupId]: val }));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterValues({ type: 'all' });
  };

  const hasActiveFilters = Boolean(
    searchQuery.trim() !== '' ||
    (filterValues.type && filterValues.type !== 'all')
  );

  const filteredAssistance = useMemo(() => {
    return assistance.filter(ast => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        ast.title.toLowerCase().includes(q) ||
        ast.agency.toLowerCase().includes(q) ||
        (ast.agencyAcronym && ast.agencyAcronym.toLowerCase().includes(q)) ||
        ast.description.toLowerCase().includes(q);

      const matchesType =
        filterValues.type === 'all' || ast.assistanceType === filterValues.type;

      return matchesSearch && matchesType;
    });
  }, [assistance, searchQuery, filterValues]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto px-4 sm:px-6">
      {/* 1. Header Block with Large Title, Search, and InlineFilterBar */}
      <div className="pt-2">
        <h1 className="text-[28px] sm:text-[34px] font-bold tracking-tight text-black dark:text-white leading-[1.2] mb-1.5">
          Pera
        </h1>
        <p className="text-[15px] text-[#8E8E93] leading-relaxed mb-4">
          Financial Assistance, Subsidies & Social Protection Grants
        </p>

        {/* 2. iOS Search Field */}
        <div className="w-full flex items-center gap-2.5 bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] h-11 px-3.5 rounded-[10px] mb-2.5">
          <Search className="w-[18px] h-[18px] text-[#8E8E93] shrink-0 stroke-[2.2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search cash grants, assistance, agencies (e.g. DSWD AICS, 4Ps)..."
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

        {/* 3. InlineFilterBar */}
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
        {filteredAssistance.length > 0 ? (
          <GroupedList
            title={`${filteredAssistance.length} ASSISTANCE PROGRAMS`}
            subtitle="Click a program to review eligibility and disbursement procedures"
          >
            {filteredAssistance.map(ast => {
              const saved = isSaved(ast.id);
              return (
                <GroupedListItem
                  key={ast.id}
                  onClick={() => navigate(`/item/${ast.id}`)}
                  leadingIcon={<PesoSign className="w-5 h-5 stroke-[2.2]" />}
                  title={ast.title}
                  subtitle={`${ast.agencyAcronym || ast.agency} • ${ast.assistanceType}`}
                  metadata={
                    <>
                      <span className="font-semibold text-[#34C759]">
                        {ast.amountOrCoverage.split(';')[0]}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[13px] text-[#34C759] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    </>
                  }
                  trailing={
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        const state = toggleSave(ast.id);
                        showToast(state ? 'Saved program to bookmarks' : 'Removed from bookmarks', 'info');
                      }}
                      className="p-2 text-[#8E8E93] hover:text-[#007AFF] transition-colors"
                      aria-label="Bookmark program"
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
            icon={<PesoSign className="w-10 h-10 opacity-50 stroke-[2.2]" />}
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
          All social assistance figures are sourced from official DSWD and DOLE administrative orders.
        </p>
      </div>
    </div>
  );
};
