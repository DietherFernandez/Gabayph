import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MockStorage } from '../data/mockStorage';
import { HeartHandshake, Bookmark, Search, CheckCircle2 } from 'lucide-react';
import { GroupedList, GroupedListItem } from '../components/common/GroupedList';
import { EmptyState } from '../components/common/EmptyState';
import { InlineFilterBar, FilterGroup } from '../components/common/InlineFilterBar';
import { useToast } from '../context/ToastContext';

export const BayanihanPage: React.FC = () => {
  const { navigate, isSaved, toggleSave } = useApp();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string>>({
    type: 'all'
  });

  const bayanihanList = useMemo(() => MockStorage.getBayanihan(), []);

  const filterGroups: FilterGroup[] = [
    {
      id: 'type',
      label: 'Uri ng Programa',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Volunteer Work', value: 'volunteer' },
        { label: 'Donation Drive', value: 'donation' },
        { label: 'Community Action', value: 'community' }
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

  const filteredList = useMemo(() => {
    return bayanihanList.filter(item => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.targetBeneficiaries.toLowerCase().includes(q);

      const matchesType =
        filterValues.type === 'all' || item.programType === filterValues.type;

      return matchesSearch && matchesType;
    });
  }, [bayanihanList, searchQuery, filterValues]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto px-4 sm:px-6">
      {/* 1. Header Block with Large Title, Search, and InlineFilterBar */}
      <div className="pt-2">
        <h1 className="text-[28px] sm:text-[34px] font-bold tracking-tight text-black dark:text-white leading-[1.2] mb-1.5">
          Bayanihan
        </h1>
        <p className="text-[15px] text-[#8E8E93] leading-relaxed mb-4">
          Community Initiatives, Volunteer Missions & Civil Society Drives
        </p>

        {/* 2. iOS Search Field */}
        <div className="w-full flex items-center gap-2.5 bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] h-11 px-3.5 rounded-[10px] mb-2.5">
          <Search className="w-[18px] h-[18px] text-[#8E8E93] shrink-0 stroke-[2.2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search community drives, volunteers, organizations..."
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
        {filteredList.length > 0 ? (
          <GroupedList
            title={`${filteredList.length} COMMUNITY PROGRAMS`}
            subtitle="Click a program to review details and participation procedures"
          >
            {filteredList.map(item => {
              const saved = isSaved(item.id);
              return (
                <GroupedListItem
                  key={item.id}
                  onClick={() => navigate(`/item/${item.id}`)}
                  leadingIcon={<HeartHandshake className="w-5 h-5 stroke-[2]" />}
                  title={item.title}
                  subtitle={`${item.organization} • ${item.location}`}
                  metadata={
                    <>
                      <span className="font-semibold text-[#FF9500]">
                        {item.programType}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[13px] text-[#34C759] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified Drive
                      </span>
                    </>
                  }
                  trailing={
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        const state = toggleSave(item.id);
                        showToast(state ? 'Saved initiative to bookmarks' : 'Removed from bookmarks', 'info');
                      }}
                      className="p-2 text-[#8E8E93] hover:text-[#007AFF] transition-colors"
                      aria-label="Bookmark initiative"
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
            icon={<HeartHandshake className="w-10 h-10 opacity-50" />}
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
          All civic programs are accredited and validated for public safety and legitimacy.
        </p>
      </div>
    </div>
  );
};
