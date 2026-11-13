import React, { useState, useMemo } from 'react';
import { AnnouncementItem } from '../../types';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import { InlineFilterBar, FilterGroup } from '../../components/common/InlineFilterBar';
import {
  Bell,
  Search,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Calendar,
  AlertTriangle,
  MapPin,
  RefreshCw
} from 'lucide-react';

interface AdminBulletinsViewProps {
  onOpenCreate: () => void;
  onOpenEdit: (item: AnnouncementItem) => void;
  onDataChanged: () => void;
}

export const AdminBulletinsView: React.FC<AdminBulletinsViewProps> = ({
  onOpenCreate,
  onOpenEdit,
  onDataChanged
}) => {
  const { showToast } = useToast();
  const { confirmAction } = useConfirm();
  const [bulletins, setBulletins] = useState<AnnouncementItem[]>(() => MockStorage.getAnnouncements());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUrgency, setSelectedUrgency] = useState<string>('all');

  const refreshList = () => {
    setBulletins(MockStorage.getAnnouncements());
    onDataChanged();
  };

  const handleDelete = (id: string, title: string) => {
    confirmAction({
      title: 'Delete Public Bulletin?',
      message: `Are you sure you want to permanently withdraw "${title}"? This will remove the advisory from the public news feed immediately.`,
      confirmLabel: 'Withdraw Bulletin',
      isDestructive: true,
      onConfirm: () => {
        MockStorage.deleteAnnouncement(id);
        refreshList();
        showToast(`Withdrawn bulletin advisory: ${title}`, 'info');
      }
    });
  };

  const filterGroups: FilterGroup[] = [
    {
      id: 'urgency',
      label: 'Advisory Level',
      options: [
        { value: 'all', label: 'All Advisories' },
        { value: 'urgent', label: 'Urgent Alerts Only' },
        { value: 'standard', label: 'Standard Advisories' },
      ]
    }
  ];

  const filteredItems = useMemo(() => {
    return bulletins.filter(item => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sourceAgency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.agencyAcronym && item.agencyAcronym.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase());

      const matchUrgency =
        selectedUrgency === 'all'
          ? true
          : selectedUrgency === 'urgent'
          ? item.urgent
          : !item.urgent;

      return matchSearch && matchUrgency;
    });
  }, [bulletins, searchQuery, selectedUrgency]);

  const hasActiveFilters = Boolean(selectedUrgency !== 'all' || searchQuery.trim() !== '');

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* 1. View Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[rgba(0,122,255,0.12)] text-[#007AFF] font-mono">
              Public Communications
            </span>
            <span className="text-[12px] text-[#8E8E93] flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]" />
              {bulletins.length} Active Advisories
            </span>
          </div>

          <div className="flex items-center gap-2">
            <h1 className="text-[20px] sm:text-[24px] font-bold tracking-tight text-black dark:text-white leading-tight">
              Public Bulletins & Official Advisories
            </h1>
            <button
              type="button"
              onClick={refreshList}
              title="Refresh bulletins list"
              className="p-1 rounded-[6px] text-[#8E8E93] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 active:rotate-180 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

          <p className="text-[13px] text-[#8E8E93] mt-0.5">
            Publish official government advisories, price freeze notices, weather warnings, and alerts
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenCreate}
            className="h-9 px-3.5 rounded-[10px] bg-[#007AFF] hover:bg-blue-600 active:scale-[0.98] text-white text-[13px] font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.2]" />
            <span>Publish New Bulletin</span>
          </button>
        </div>
      </div>

      {/* 2. Cohesive Cardless Inset Queue Container */}
      <div className="rounded-[16px] bg-white dark:bg-[#1C1C1E] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)] divide-y divide-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)] overflow-hidden">
        {/* Integrated Management Toolbar (Compact & Subtle Search + Filter) */}
        <div className="p-3 sm:p-3.5 bg-black/[0.015] dark:bg-white/[0.02] space-y-2">
          {/* Search Pill Input */}
          <div className="w-full flex items-center gap-2.5 bg-[rgba(118,118,128,0.08)] dark:bg-[rgba(118,118,128,0.18)] h-9 px-3 rounded-[10px]">
            <Search className="w-4 h-4 text-[#8E8E93] shrink-0 stroke-[2.2]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search bulletin title, issuing agency, or affected area..."
              className="w-full bg-transparent text-[13px] text-black dark:text-white placeholder-[#8E8E93] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[11px] font-medium text-[#8E8E93] hover:text-black dark:hover:text-white px-1 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Compact InlineFilterBar */}
          <InlineFilterBar
            groups={filterGroups}
            selectedValues={{ urgency: selectedUrgency }}
            onSelect={(_groupId, val) => setSelectedUrgency(val)}
            onReset={() => {
              setSelectedUrgency('all');
              setSearchQuery('');
            }}
            hasActiveFilters={hasActiveFilters}
            resetLabel="Reset"
          />
        </div>

        {/* Bulletins List */}
        {filteredItems.length === 0 ? (
          <div className="p-10 text-center text-[13px] text-[#8E8E93] space-y-2">
            <Bell className="w-8 h-8 mx-auto text-[#8E8E93]/60" />
            <p className="font-semibold text-black dark:text-white">No public bulletins found</p>
            <p className="text-[12px]">Try modifying your search query or urgency filter.</p>
          </div>
        ) : (
          filteredItems.map(bulletin => (
            <div
              key={bulletin.id}
              className={`p-4 sm:p-4.5 transition-colors space-y-2.5 hover:bg-black/[0.015] dark:hover:bg-white/[0.02] ${
                bulletin.urgent ? 'bg-[rgba(255,59,48,0.03)] dark:bg-[rgba(255,59,48,0.05)]' : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {bulletin.urgent ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#FF3B30] text-white flex items-center gap-1 shadow-2xs">
                      <AlertTriangle className="w-3 h-3" />
                      Urgent Advisory
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-black/5 dark:bg-white/10 text-black/70 dark:text-white/70">
                      Standard Advisory
                    </span>
                  )}
                  <span className="font-semibold text-[13px] text-[#007AFF]">
                    {bulletin.agencyAcronym} — {bulletin.sourceAgency}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[#8E8E93] text-[12px]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{bulletin.datePublished}</span>
                </div>
              </div>

              <div>
                <h3 className="text-[14px] font-semibold text-black dark:text-white leading-tight">
                  {bulletin.title}
                </h3>
                <p className="text-[13px] text-[#8E8E93] mt-1 leading-relaxed">
                  {bulletin.content}
                </p>
              </div>

              {bulletin.affectedAreas && bulletin.affectedAreas.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap pt-0.5 text-[11px] text-[#8E8E93]">
                  <MapPin className="w-3.5 h-3.5 text-[#8E8E93] shrink-0" />
                  <span className="font-medium">Affected Areas:</span>
                  {bulletin.affectedAreas.map((area, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-black/80 dark:text-white/80 text-[10px] font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-1 text-[12px] text-[#8E8E93]">
                <div>
                  {bulletin.relatedLink && (
                    <a
                      href={bulletin.relatedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#007AFF] hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      <span>Official Source Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onOpenEdit(bulletin)}
                    className="p-1.5 rounded-[6px] text-[#8E8E93] hover:text-[#007AFF] hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                    title="Edit bulletin"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(bulletin.id, bulletin.title)}
                    className="p-1.5 rounded-[6px] text-[#8E8E93] hover:text-[#FF3B30] hover:bg-[rgba(255,59,48,0.1)] transition-colors cursor-pointer"
                    title="Delete bulletin"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
