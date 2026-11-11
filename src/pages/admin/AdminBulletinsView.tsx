import React, { useState, useMemo } from 'react';
import { AnnouncementItem } from '../../types';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import { IOSSelect } from '../../components/common/IOSSelect';
import {
  Bell,
  Search,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  AlertTriangle,
  Calendar,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { Button } from '../../components/common/Button';

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
      message: `Are you sure you want to permanently delete "${title}"? This cannot be undone.`,
      confirmLabel: 'Delete Bulletin',
      isDestructive: true,
      onConfirm: () => {
        MockStorage.deleteItem('announcements', id);
        refreshList();
        showToast(`Deleted bulletin: ${title}`, 'info');
      }
    });
  };

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

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-ios-lightText dark:text-ios-darkText">
              Public Bulletins & Official Advisories
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold">
              {bulletins.length} advisories
            </span>
          </div>
          <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted mt-0.5">
            Publish official government advisories, DTI price freeze notices, weather warnings, and public alerts.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button size="sm" variant="outline" onClick={refreshList} title="Refresh records list">
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
          <Button size="sm" variant="primary" onClick={onOpenCreate} className="font-bold">
            <Plus className="w-3.5 h-3.5" />
            <span>Publish New Bulletin</span>
          </Button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="p-3.5 rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-ios-lightMuted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search bulletin title, issuing agency, or affected area..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-ios-lg bg-slate-50 dark:bg-slate-800 border border-ios-lightBorder dark:border-ios-darkBorder text-ios-lightText dark:text-ios-darkText focus:outline-none focus:ring-2 focus:ring-ios-navy"
          />
        </div>

        <div className="w-full md:w-56">
          <IOSSelect
            value={selectedUrgency}
            onChange={setSelectedUrgency}
            size="sm"
            className="w-full"
            options={[
              { value: 'all', label: 'All Advisories' },
              { value: 'urgent', label: 'Urgent Alerts Only' },
              { value: 'standard', label: 'Standard Advisories' },
            ]}
          />
        </div>
      </div>

      {/* Bulletins List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-xs text-ios-lightMuted bg-white dark:bg-slate-900 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder space-y-2">
            <Bell className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
            <p className="font-semibold text-ios-lightText dark:text-ios-darkText">No public bulletins found</p>
            <p>Try modifying your search query or urgency filter.</p>
          </div>
        ) : (
          filteredItems.map(bulletin => (
            <div
              key={bulletin.id}
              className={`p-4 rounded-ios-xl bg-white dark:bg-slate-900 border shadow-ios-sm transition-all space-y-2.5 text-xs ${
                bulletin.urgent
                  ? 'border-red-300 dark:border-red-900/60 bg-red-50/15'
                  : 'border-ios-lightBorder dark:border-ios-darkBorder'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  {bulletin.urgent ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-red-600 text-white flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Urgent Advisory
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Standard Advisory
                    </span>
                  )}
                  <span className="font-bold text-ios-navy dark:text-blue-400">
                    {bulletin.agencyAcronym} — {bulletin.sourceAgency}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{bulletin.datePublished}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-ios-lightText dark:text-ios-darkText">
                  {bulletin.title}
                </h3>
                <p className="text-ios-lightMuted dark:text-ios-darkMuted mt-1 leading-relaxed">
                  {bulletin.content}
                </p>
              </div>

              {bulletin.affectedAreas && bulletin.affectedAreas.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[11px] text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-medium">Affected Areas:</span>
                  {bulletin.affectedAreas.map((area, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px]"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-ios-lightBorder/80 dark:border-ios-darkBorder/80">
                <div>
                  {bulletin.relatedLink && (
                    <a
                      href={bulletin.relatedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-ios-navy dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold text-[11px]"
                    >
                      <span>Official Source Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onOpenEdit(bulletin)}
                    className="p-1.5 text-ios-lightMuted hover:text-ios-navy dark:hover:text-blue-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Edit bulletin"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(bulletin.id, bulletin.title)}
                    className="p-1.5 text-ios-lightMuted hover:text-red-500 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
