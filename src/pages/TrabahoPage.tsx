import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MockStorage } from '../data/mockStorage';
import { Briefcase, Bookmark, Clock, Search } from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { GroupedList, GroupedListItem } from '../components/common/GroupedList';
import { EmptyState } from '../components/common/EmptyState';
import { InlineFilterBar, FilterGroup } from '../components/common/InlineFilterBar';
import { useToast } from '../context/ToastContext';

export const TrabahoPage: React.FC = () => {
  const { navigate, isSaved, toggleSave } = useApp();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string>>({
    employment: 'all',
    sector: 'all'
  });

  const jobs = useMemo(() => MockStorage.getJobs(), []);

  // Filter groups per Master Prompt spec
  const filterGroups: FilterGroup[] = [
    {
      id: 'employment',
      label: 'Employment',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Plantilla / Permanent', value: 'government' },
        { label: 'Contract of Service', value: 'contractual' },
        { label: 'Full-Time NGO', value: 'full-time' }
      ]
    },
    {
      id: 'sector',
      label: 'Sector',
      options: [
        { label: 'All', value: 'all' },
        { label: 'Public Sector', value: 'public' },
        { label: 'NGO / Humanitarian', value: 'ngo' },
        { label: 'Private Sector', value: 'private' }
      ]
    }
  ];

  const handleSelectFilter = (groupId: string, val: string) => {
    setFilterValues(prev => ({ ...prev, [groupId]: val }));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterValues({ employment: 'all', sector: 'all' });
  };

  const hasActiveFilters = Boolean(
    searchQuery.trim() !== '' ||
    (filterValues.employment && filterValues.employment !== 'all') ||
    (filterValues.sector && filterValues.sector !== 'all')
  );

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.agency.toLowerCase().includes(q) ||
        (job.agencyAcronym && job.agencyAcronym.toLowerCase().includes(q)) ||
        job.location.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q);

      const matchesType =
        filterValues.employment === 'all' || job.employmentType === filterValues.employment;
      const matchesSector =
        filterValues.sector === 'all' || job.sector === filterValues.sector;

      return matchesSearch && matchesType && matchesSector;
    });
  }, [jobs, searchQuery, filterValues]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto px-4 sm:px-6">
      {/* 1. Sticky Header Block with Large Title, Search, and InlineFilterBar */}
      <div className="pt-2">
        {/* Large Title 34px bold */}
        <h1 className="text-[28px] sm:text-[34px] font-bold tracking-tight text-black dark:text-white leading-[1.2] mb-1.5">
          Trabaho
        </h1>
        <p className="text-[15px] text-[#8E8E93] leading-relaxed mb-4">
          Verified civil service vacancies, agency plantilla postings, and partner career opportunities.
        </p>

        {/* 2. iOS Search Field */}
        <div className="w-full flex items-center gap-2.5 bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] h-11 px-3.5 rounded-[10px] mb-2.5">
          <Search className="w-[18px] h-[18px] text-[#8E8E93] shrink-0 stroke-[2.2]" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search job titles, agencies, or locations..."
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

        {/* 3. InlineFilterBar (Employment, Sector) */}
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
        {filteredJobs.length > 0 ? (
          <GroupedList
            title={`${filteredJobs.length} OPEN POSITIONS`}
            subtitle="Click a position to review qualifications and application steps"
          >
            {filteredJobs.map(job => {
              const saved = isSaved(job.id);
              return (
                <GroupedListItem
                  key={job.id}
                  onClick={() => navigate(`/item/${job.id}`)}
                  leadingIcon={<Briefcase className="w-5 h-5 stroke-[2]" />}
                  title={
                    <div className="flex items-center gap-2 flex-wrap">
                      <span>{job.title}</span>
                      <Badge category="trabaho" size="sm">
                        {job.employmentType}
                      </Badge>
                      <span className="text-[12px] text-[#8E8E93] font-normal">
                        • {job.vacancies} {job.vacancies === 1 ? 'vacancy' : 'vacancies'}
                      </span>
                    </div>
                  }
                  subtitle={`${job.agency} (${job.agencyAcronym}) • ${job.location}`}
                  metadata={
                    <>
                      <span className="font-semibold text-black dark:text-white">
                        {job.salaryRange}
                      </span>
                      <span>•</span>
                      <span className="text-[#FF9500] font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> Deadline: {job.deadline}
                      </span>
                    </>
                  }
                  trailing={
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        const state = toggleSave(job.id);
                        showToast(state ? 'Saved job to bookmarks' : 'Removed job from bookmarks', 'info');
                      }}
                      className="p-2 text-[#8E8E93] hover:text-[#007AFF] transition-colors"
                      aria-label="Bookmark job"
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
            icon={<Briefcase className="w-10 h-10 opacity-50" />}
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
          All job postings are cross-checked with official Civil Service Commission (CSC) bulletins.
        </p>
      </div>
    </div>
  );
};
