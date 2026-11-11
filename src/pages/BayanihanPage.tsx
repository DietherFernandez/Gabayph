import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MockStorage } from '../data/mockStorage';
import { HeartHandshake, Bookmark } from 'lucide-react';
import { SearchField, Select } from '../components/common/Input';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { GroupedList, GroupedListItem } from '../components/common/GroupedList';
import { EmptyState } from '../components/common/EmptyState';
import { useToast } from '../context/ToastContext';

export const BayanihanPage: React.FC = () => {
  const { navigate, isSaved, toggleSave, openVolunteerModal } = useApp();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [programType, setProgramType] = useState<string>('all');

  const bayanihanList = useMemo(() => MockStorage.getBayanihan(), []);

  const filteredList = useMemo(() => {
    return bayanihanList.filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = programType === 'all' || item.programType === programType;

      return matchesSearch && matchesType;
    });
  }, [bayanihanList, searchQuery, programType]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Editorial Category Header */}
      <div className="px-1 pt-1">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
          <HeartHandshake className="w-4 h-4" />
          <span>Community & Bayanihan Directory</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-ios-lightText dark:text-ios-darkText tracking-tight">
          BAYANIHAN: Volunteer Opportunities & Community Programs
        </h1>
        <p className="text-xs sm:text-sm text-ios-lightMuted dark:text-ios-darkMuted mt-1 max-w-2xl leading-relaxed">
          Participate in civic community initiatives including Red Cross Blood Donation Drives, Brigada Eskwela, food pantries, and disaster relief volunteer mobilization.
        </p>

        {/* Search & Filter */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8">
            <SearchField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search volunteer drives or community organizations..."
            />
          </div>
          <div className="sm:col-span-4">
            <Select
              value={programType}
              onChange={e => setProgramType(e.target.value)}
              options={[
                { value: 'all', label: 'All Initiative Types' },
                { value: 'volunteer', label: 'Volunteer Services' },
                { value: 'community_pantry', label: 'Community Pantries / Food Rescue' },
                { value: 'donation', label: 'Donation Drives' }
              ]}
            />
          </div>
        </div>
      </div>

      {/* Bayanihan List */}
      <div>
        {filteredList.length > 0 ? (
          <GroupedList
            title={`Community Programs (${filteredList.length})`}
            subtitle="Click to review full program details or register directly as a volunteer"
          >
            {filteredList.map(item => {
              const saved = isSaved(item.id);
              return (
                <GroupedListItem
                  key={item.id}
                  onClick={() => navigate(`/item/${item.id}`)}
                  leadingIcon={<HeartHandshake className="w-4 h-4" />}
                  title={
                    <div className="flex items-center gap-2 flex-wrap">
                      <span>{item.title}</span>
                      <Badge category="bayanihan" size="sm">
                        {item.programType}
                      </Badge>
                      {item.volunteersNeeded && (
                        <span className="text-[10px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.2 rounded font-medium">
                          Needs {item.volunteersNeeded} volunteers
                        </span>
                      )}
                    </div>
                  }
                  subtitle={`${item.organization} • ${item.location}`}
                  metadata={
                    <>
                      <span>Schedule: {item.dates}</span>
                      <span>•</span>
                      <span>Beneficiaries: {item.targetBeneficiaries}</span>
                    </>
                  }
                  trailing={
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="green"
                        onClick={e => {
                          e.stopPropagation();
                          openVolunteerModal({ id: item.id, title: item.title });
                        }}
                        className="text-xs py-1 px-2.5 hidden sm:inline-flex"
                      >
                        Volunteer Now
                      </Button>
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          const state = toggleSave(item.id);
                          showToast(state ? 'Program saved to bookmarks!' : 'Removed from bookmarks.', 'info');
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
                    </div>
                  }
                />
              );
            })}
          </GroupedList>
        ) : (
          <EmptyState
            icon={<HeartHandshake className="w-8 h-8" />}
            title="No Community Programs Found"
            description={`No community or volunteer drives matched your search query "${searchQuery}".`}
            actionLabel="Reset Search"
            onAction={() => {
              setSearchQuery('');
              setProgramType('all');
            }}
          />
        )}
      </div>
    </div>
  );
};
