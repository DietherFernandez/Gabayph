import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { MockStorage } from '../../data/mockStorage';
import { BaseItem, CategoryType } from '../../types';
import { Search, X, History, Sparkles, ChevronRight } from 'lucide-react';
import { Badge } from '../common/Badge';

export const UniversalSearchModal: React.FC = () => {
  const { isSearchModalOpen, closeSearchModal, navigate } = useApp();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryType | 'all'>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>(['Passport', 'PhilID', 'TUPAD', 'DOST', '911']);

  const allItems = useMemo(() => MockStorage.getAllItems(), []);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    return allItems.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesQuery =
        item.title.toLowerCase().includes(q) ||
        item.agency.toLowerCase().includes(q) ||
        (item.agencyAcronym && item.agencyAcronym.toLowerCase().includes(q)) ||
        item.description.toLowerCase().includes(q);

      return matchesCategory && matchesQuery;
    }).slice(0, 8);
  }, [allItems, query, activeCategory]);

  const handleSelectResult = (item: BaseItem) => {
    // Add to recents
    if (!recentSearches.includes(query.trim()) && query.trim()) {
      setRecentSearches(prev => [query.trim(), ...prev.slice(0, 4)]);
    }
    closeSearchModal();
    navigate(`/item/${item.id}`);
  };

  const handleSelectRecent = (term: string) => {
    setQuery(term);
  };

  if (!isSearchModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start sm:pt-16 p-3 sm:p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={closeSearchModal}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-xl mx-auto bg-ios-lightSurface dark:bg-ios-darkSurface rounded-ios-xl shadow-ios-lg border border-ios-lightBorder dark:border-ios-darkBorder overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-ios-lightBorder dark:border-ios-darkBorder">
          <Search className="w-4 h-4 text-ios-lightMuted dark:text-ios-darkMuted shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search services, agencies, jobs, financial assistance..."
            className="flex-1 bg-transparent text-sm text-ios-lightText dark:text-ios-darkText placeholder:text-ios-lightMuted/70 outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="text-ios-lightMuted hover:text-ios-lightText p-1 rounded-full"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline text-[10px] bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightMuted px-1.5 py-0.5 rounded border border-ios-lightBorder dark:border-ios-darkBorder">
              ESC
            </kbd>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-ios-lightBorder/60 dark:border-ios-darkBorder/60 overflow-x-auto text-xs scrollbar-none">
          {(['all', 'serbisyo', 'trabaho', 'pera', 'bayanihan', 'aral', 'kaligtasan'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all text-xs font-medium ${
                activeCategory === cat
                  ? 'bg-ios-navy text-white font-semibold'
                  : 'bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightMuted hover:text-ios-lightText'
              }`}
            >
              {cat === 'all'
                ? 'All'
                : cat === 'serbisyo'
                ? 'Services'
                : cat === 'trabaho'
                ? 'Jobs'
                : cat === 'pera'
                ? 'Financial Aid'
                : cat === 'bayanihan'
                ? 'Community'
                : cat === 'aral'
                ? 'Education'
                : 'Safety'}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-4 flex-1 divide-y divide-ios-lightBorder/50 dark:divide-ios-darkBorder/50">
          {query.trim() ? (
            filteredResults.length > 0 ? (
              <div className="space-y-1">
                <p className="text-[11px] font-semibold tracking-wider uppercase text-ios-lightMuted dark:text-ios-darkMuted mb-2 px-1">
                  Results ({filteredResults.length})
                </p>
                {filteredResults.map(item => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectResult(item)}
                    className="flex items-center justify-between p-2.5 rounded-ios-lg hover:bg-ios-lightSecondary dark:hover:bg-ios-darkSecondary cursor-pointer transition-colors group"
                  >
                    <div className="min-w-0 flex-1 pr-3">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Badge category={item.category} size="sm">
                          {item.category}
                        </Badge>
                        <span className="text-[11px] text-ios-lightMuted dark:text-ios-darkMuted truncate">
                          {item.agencyAcronym || item.agency}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-ios-lightText dark:text-ios-darkText truncate group-hover:text-ios-navy dark:group-hover:text-blue-400">
                        {item.title}
                      </h4>
                      <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-ios-lightMuted group-hover:text-ios-navy transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm font-medium text-ios-lightText dark:text-ios-darkText">
                  No services found for "{query}"
                </p>
                <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted mt-1">
                  Try searching with different keywords or agency acronyms (e.g., DFA, PhilSys, SSS, Jobs).
                </p>
              </div>
            )
          ) : (
            <div className="space-y-4">
              {/* Recent Searches */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ios-lightMuted dark:text-ios-darkMuted mb-2 px-1">
                  <History className="w-3.5 h-3.5" />
                  <span>Recent Searches</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {recentSearches.map(term => (
                    <button
                      key={term}
                      onClick={() => handleSelectRecent(term)}
                      className="px-3 py-1.5 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary hover:bg-slate-200 dark:hover:bg-slate-700/60 text-xs font-medium text-ios-lightText dark:text-ios-darkText transition-colors flex items-center gap-1.5"
                    >
                      <Search className="w-3 h-3 text-ios-lightMuted" />
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Suggested Quick Queries */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ios-lightMuted dark:text-ios-darkMuted mb-2 px-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Popular Searches</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { label: 'PhilSys National ID Registration', cat: 'serbisyo' },
                    { label: 'DFA e-Passport Appointment', cat: 'serbisyo' },
                    { label: 'DSWD AICS Crisis Medical Aid', cat: 'pera' },
                    { label: 'DOLE TUPAD Emergency Work', cat: 'pera' },
                    { label: 'DOST S&T Scholarship', cat: 'aral' },
                    { label: 'National Emergency 911', cat: 'kaligtasan' }
                  ].map(sug => (
                    <button
                      key={sug.label}
                      onClick={() => setQuery(sug.label.split(' ')[0])}
                      className="text-left p-2 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary hover:bg-slate-200 dark:hover:bg-slate-700/60 transition-colors flex items-center justify-between text-xs"
                    >
                      <span className="truncate font-medium text-ios-lightText dark:text-ios-darkText">
                        {sug.label}
                      </span>
                      <ChevronRight className="w-3 h-3 text-ios-lightMuted shrink-0 ml-1" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-ios-lightSecondary/60 dark:bg-ios-darkSecondary/60 border-t border-ios-lightBorder dark:border-ios-darkBorder flex items-center justify-between text-[11px] text-ios-lightMuted dark:text-ios-darkMuted">
          <span>Click a result to view full requirements and instructions</span>
          <button
            onClick={() => {
              closeSearchModal();
              navigate(`/search?q=${encodeURIComponent(query)}`);
            }}
            className="text-ios-navy dark:text-blue-400 font-semibold hover:underline"
          >
            View all results →
          </button>
        </div>
      </div>
    </div>
  );
};
