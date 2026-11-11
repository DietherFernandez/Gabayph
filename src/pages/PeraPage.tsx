import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MockStorage } from '../data/mockStorage';
import { DollarSign, Bookmark } from 'lucide-react';
import { SearchField, Select } from '../components/common/Input';
import { Badge } from '../components/common/Badge';
import { GroupedList, GroupedListItem } from '../components/common/GroupedList';
import { EmptyState } from '../components/common/EmptyState';
import { useToast } from '../context/ToastContext';

export const PeraPage: React.FC = () => {
  const { navigate, isSaved, toggleSave } = useApp();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [assistanceType, setAssistanceType] = useState<string>('all');

  const assistance = useMemo(() => MockStorage.getAssistance(), []);

  const filteredAssistance = useMemo(() => {
    return assistance.filter(ast => {
      const matchesSearch =
        ast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ast.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ast.agencyAcronym && ast.agencyAcronym.toLowerCase().includes(searchQuery.toLowerCase())) ||
        ast.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = assistanceType === 'all' || ast.assistanceType === assistanceType;

      return matchesSearch && matchesType;
    });
  }, [assistance, searchQuery, assistanceType]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-5 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
          <DollarSign className="w-4 h-4" />
          <span>Financial Assistance & Subsidies Directory</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-ios-lightText dark:text-ios-darkText tracking-tight">
          PERA: Government Financial Aid, Subsidies & Grants
        </h1>
        <p className="text-xs sm:text-sm text-ios-lightMuted dark:text-ios-darkMuted mt-1 max-w-2xl">
          Access verified assistance programs from DSWD, DOLE, SSS, and NCSC including AICS medical crisis assistance, TUPAD cash-for-work, 4Ps, and senior citizen social pensions.
        </p>

        {/* Search & Filter */}
        <div className="mt-4 pt-4 border-t border-ios-lightBorder/80 dark:border-ios-darkBorder/80 grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8">
            <SearchField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search programs (e.g. AICS, TUPAD, Calamity Loan, 4Ps)..."
            />
          </div>
          <div className="sm:col-span-4">
            <Select
              value={assistanceType}
              onChange={e => setAssistanceType(e.target.value)}
              options={[
                { value: 'all', label: 'All Assistance Types' },
                { value: 'emergency_aid', label: 'Emergency Aid (Crisis / Medical)' },
                { value: 'cash_grant', label: 'Cash Grants (4Ps, TUPAD)' },
                { value: 'loan', label: 'Low-Interest Government Loans' },
                { value: 'pension', label: 'Social Pension' }
              ]}
            />
          </div>
        </div>
      </div>

      {/* Program List */}
      <div>
        {filteredAssistance.length > 0 ? (
          <GroupedList
            title={`Assistance Programs (${filteredAssistance.length})`}
            subtitle="Click a program to review eligibility criteria, guidelines, and required documentary checklist"
          >
            {filteredAssistance.map(ast => {
              const saved = isSaved(ast.id);
              return (
                <GroupedListItem
                  key={ast.id}
                  onClick={() => navigate(`/item/${ast.id}`)}
                  leadingIcon={<DollarSign className="w-4 h-4" />}
                  title={
                    <div className="flex items-center gap-2 flex-wrap">
                      <span>{ast.title}</span>
                      <Badge category="pera" size="sm">
                        {ast.assistanceType.replace('_', ' ')}
                      </Badge>
                    </div>
                  }
                  subtitle={`${ast.agency} (${ast.agencyAcronym}) • ${ast.disbursementMode}`}
                  metadata={
                    <>
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        Coverage: {ast.amountOrCoverage}
                      </span>
                    </>
                  }
                  trailing={
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        const state = toggleSave(ast.id);
                        showToast(state ? 'Saved program to bookmarks!' : 'Removed program from bookmarks.', 'info');
                      }}
                      className={`p-2 rounded-full transition-colors ${
                        saved
                          ? 'text-ios-navy dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40'
                          : 'text-ios-lightMuted hover:text-ios-lightText'
                      }`}
                      aria-label="Bookmark program"
                    >
                      <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                    </button>
                  }
                />
              );
            })}
          </GroupedList>
        ) : (
          <EmptyState
            icon={<DollarSign className="w-8 h-8" />}
            title="No Assistance Programs Found"
            description={`No financial assistance programs matched your search query "${searchQuery}".`}
            actionLabel="Reset Search"
            onAction={() => {
              setSearchQuery('');
              setAssistanceType('all');
            }}
          />
        )}
      </div>
    </div>
  );
};
