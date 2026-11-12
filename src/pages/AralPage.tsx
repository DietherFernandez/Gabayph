import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MockStorage } from '../data/mockStorage';
import { GraduationCap, Bookmark, Search, Clock, CheckCircle2 } from 'lucide-react';
import { GroupedList, GroupedListItem } from '../components/common/GroupedList';
import { EmptyState } from '../components/common/EmptyState';
import { InlineFilterBar, FilterGroup } from '../components/common/InlineFilterBar';
import { useToast } from '../context/ToastContext';

export const AralPage: React.FC = () => {
  const { navigate, isSaved, toggleSave } = useApp();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string>>({
    level: 'all',
    type: 'all'
  });

  const educationList = useMemo(() => MockStorage.getEducation(), []);

  const filterGroups: FilterGroup[] = [
    {
      id: 'level',
      label: 'Antas ng Pag-aaral',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Tertiary / College', value: 'tertiary' },
        { label: 'Technical-Vocational / TVET', value: 'tvet' },
        { label: 'Secondary / High School', value: 'secondary' },
        { label: 'Post-Graduate', value: 'postgraduate' }
      ]
    },
    {
      id: 'type',
      label: 'Uri',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Scholarship Grant', value: 'scholarship' },
        { label: 'Free Skills Training', value: 'training' },
        { label: 'Student Financial Aid', value: 'financial_aid' }
      ]
    }
  ];

  const handleSelectFilter = (groupId: string, val: string) => {
    setFilterValues(prev => ({ ...prev, [groupId]: val }));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterValues({ level: 'all', type: 'all' });
  };

  const hasActiveFilters = Boolean(
    searchQuery.trim() !== '' ||
    (filterValues.level && filterValues.level !== 'all') ||
    (filterValues.type && filterValues.type !== 'all')
  );

  const filteredList = useMemo(() => {
    return educationList.filter(item => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.agency.toLowerCase().includes(q) ||
        (item.agencyAcronym && item.agencyAcronym.toLowerCase().includes(q)) ||
        item.description.toLowerCase().includes(q);

      const matchesLevel =
        filterValues.level === 'all' || item.educationalLevel === filterValues.level || item.educationalLevel === 'all';

      const matchesType =
        filterValues.type === 'all' || item.educationType === filterValues.type;

      return matchesSearch && matchesLevel && matchesType;
    });
  }, [educationList, searchQuery, filterValues]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto px-4 sm:px-6">
      {/* 1. Header Block with Large Title, Search, and InlineFilterBar */}
      <div className="pt-2">
        <h1 className="text-[28px] sm:text-[34px] font-bold tracking-tight text-black dark:text-white leading-[1.2] mb-1.5">
          Aral
        </h1>
        <p className="text-[15px] text-[#8E8E93] leading-relaxed mb-4">
          Government Scholarships, Free Skills Training & TVET Courses
        </p>

        {/* 2. iOS Search Field */}
        <div className="w-full flex items-center gap-2.5 bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] h-11 px-3.5 rounded-[10px] mb-2.5">
          <Search className="w-[18px] h-[18px] text-[#8E8E93] shrink-0 stroke-[2.2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search scholarships, TVET courses, agencies (e.g. DOST, CHED, TESDA)..."
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
            title={`${filteredList.length} EDUCATIONAL OPPORTUNITIES`}
            subtitle="Click an opportunity to view eligibility, allowances, and deadlines"
          >
            {filteredList.map(item => {
              const saved = isSaved(item.id);
              return (
                <GroupedListItem
                  key={item.id}
                  onClick={() => navigate(`/item/${item.id}`)}
                  leadingIcon={<GraduationCap className="w-5 h-5 stroke-[2]" />}
                  title={item.title}
                  subtitle={`${item.agencyAcronym || item.agency} • ${item.educationalLevel}`}
                  metadata={
                    <>
                      <span className="text-[#FF9500] font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Deadline: {item.deadline}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[13px] text-[#34C759] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified: {item.lastVerified}
                      </span>
                    </>
                  }
                  trailing={
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        const state = toggleSave(item.id);
                        showToast(state ? 'Saved scholarship to bookmarks' : 'Removed from bookmarks', 'info');
                      }}
                      className="p-2 text-[#8E8E93] hover:text-[#007AFF] transition-colors"
                      aria-label="Bookmark scholarship"
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
            icon={<GraduationCap className="w-10 h-10 opacity-50" />}
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
          All scholarship requirements and deadlines are verified directly with CHED, DOST, and TESDA portals.
        </p>
      </div>
    </div>
  );
};
