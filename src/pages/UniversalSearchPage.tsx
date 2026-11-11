import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MockStorage } from '../data/mockStorage';
import { CategoryType } from '../types';
import { Bookmark, Layers, Search } from 'lucide-react';
import { SearchField, Select } from '../components/common/Input';
import { Badge } from '../components/common/Badge';
import { GroupedList, GroupedListItem } from '../components/common/GroupedList';
import { EmptyState } from '../components/common/EmptyState';
import { useToast } from '../context/ToastContext';

export const UniversalSearchPage: React.FC = () => {
  const { navigate, isSaved, toggleSave } = useApp();
  const { showToast } = useToast();

  // Read query params from URL
  const [query, setQuery] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('q') || '';
  });

  const [activeCategory, setActiveCategory] = useState<CategoryType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'title'>('relevance');

  const allItems = useMemo(() => MockStorage.getAllItems(), []);

  const searchResults = useMemo(() => {
    let results = allItems;
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      results = results.filter(item => {
        return (
          item.title.toLowerCase().includes(q) ||
          item.agency.toLowerCase().includes(q) ||
          (item.agencyAcronym && item.agencyAcronym.toLowerCase().includes(q)) ||
          item.description.toLowerCase().includes(q)
        );
      });
    }

    if (activeCategory !== 'all') {
      results = results.filter(item => item.category === activeCategory);
    }

    if (sortBy === 'title') {
      results = [...results].sort((a, b) => a.title.localeCompare(b.title));
    }

    return results;
  }, [allItems, query, activeCategory, sortBy]);

  const categories = [
    { id: 'all', label: 'Lahat' },
    { id: 'serbisyo', label: 'Serbisyo' },
    { id: 'trabaho', label: 'Trabaho' },
    { id: 'pera', label: 'Pera' },
    { id: 'bayanihan', label: 'Bayanihan' },
    { id: 'aral', label: 'Aral' },
    { id: 'kaligtasan', label: 'Kaligtasan' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Search Header */}
      <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-5 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm">
        <h1 className="text-xl sm:text-2xl font-bold text-ios-lightText dark:text-ios-darkText tracking-tight mb-3">
          Paghahanap sa Buong GabayPH
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8">
            <SearchField
              value={query}
              onChange={setQuery}
              placeholder="Maghanap ng kahit anong serbisyo, ahensya, trabaho, o ayuda..."
            />
          </div>
          <div className="sm:col-span-4">
            <Select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              options={[
                { value: 'relevance', label: 'Pagsunud-sunod: Relevance' },
                { value: 'title', label: 'Pagsunud-sunod: Titulo (A–Z)' }
              ]}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-ios-navy text-white font-semibold shadow-sm'
                  : 'bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightMuted hover:text-ios-lightText'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results List */}
      <div>
        {searchResults.length > 0 ? (
          <GroupedList
            title={`Mga Nahanap na Tala (${searchResults.length})`}
            subtitle={query ? `Mga resulta para sa paghahanap na "${query}"` : 'Ipinapakita ang lahat ng tala sa direktoryo'}
          >
            {searchResults.map(item => {
              const saved = isSaved(item.id);
              return (
                <GroupedListItem
                  key={item.id}
                  onClick={() => navigate(`/item/${item.id}`)}
                  leadingIcon={<Layers className="w-4 h-4" />}
                  title={
                    <div className="flex items-center gap-2 flex-wrap">
                      <span>{item.title}</span>
                      <Badge category={item.category} size="sm">
                        {item.category}
                      </Badge>
                    </div>
                  }
                  subtitle={`${item.agency} (${item.agencyAcronym || ''})`}
                  metadata={
                    <span className="line-clamp-1">{item.description}</span>
                  }
                  trailing={
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        const state = toggleSave(item.id);
                        showToast(state ? 'Nai-save sa talaan!' : 'Inalis sa talaan.', 'info');
                      }}
                      className={`p-2 rounded-full transition-colors ${
                        saved
                          ? 'text-ios-navy dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40'
                          : 'text-ios-lightMuted hover:text-ios-lightText'
                      }`}
                      aria-label="Bookmark item"
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
            icon={<Search className="w-8 h-8" />}
            title="Walang Tumugmang Resulta"
            description={`Walang nahanap na serbisyo, trabaho, o ayuda para sa "${query}". Subukang gumamit ng ibang mga salita.`}
            actionLabel="I-clear ang Search"
            onAction={() => {
              setQuery('');
              setActiveCategory('all');
            }}
          />
        )}
      </div>
    </div>
  );
};
