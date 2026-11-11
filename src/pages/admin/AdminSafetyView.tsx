import React, { useState, useMemo } from 'react';
import { EmergencyResourceItem } from '../../types';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import { IOSSelect } from '../../components/common/IOSSelect';
import {
  ShieldAlert,
  Search,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Clock,
  Copy,
  RefreshCw
} from 'lucide-react';
import { Button } from '../../components/common/Button';

interface AdminSafetyViewProps {
  onOpenCreate: () => void;
  onOpenEdit: (item: EmergencyResourceItem) => void;
  onDataChanged: () => void;
}

export const AdminSafetyView: React.FC<AdminSafetyViewProps> = ({
  onOpenCreate,
  onOpenEdit,
  onDataChanged
}) => {
  const { showToast } = useToast();
  const { confirmAction } = useConfirm();
  const [safety, setSafety] = useState<EmergencyResourceItem[]>(() => MockStorage.getSafety());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const refreshList = () => {
    setSafety(MockStorage.getSafety());
    onDataChanged();
  };

  const handleDelete = (id: string, title: string) => {
    confirmAction({
      title: 'Delete Safety Resource?',
      message: `Are you sure you want to permanently delete "${title}"? This cannot be undone.`,
      confirmLabel: 'Delete Resource',
      isDestructive: true,
      onConfirm: () => {
        MockStorage.deleteItem('kaligtasan', id);
        refreshList();
        showToast(`Deleted safety resource: ${title}`, 'info');
      }
    });
  };

  const copyHotline = (number: string, title: string) => {
    navigator.clipboard.writeText(number);
    showToast(`Copied ${title} hotline (${number}) to clipboard.`, 'success');
  };

  const filteredItems = useMemo(() => {
    return safety.filter(item => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.hotlineNumber && item.hotlineNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchType = selectedType === 'all' || item.resourceType === selectedType;

      return matchSearch && matchType;
    });
  }, [safety, searchQuery, selectedType]);

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-ios-lightText dark:text-ios-darkText">
              Safety, Emergency Hotlines & Disaster Management
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 font-bold">
              {safety.length} entries
            </span>
          </div>
          <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted mt-0.5">
            Manage 24/7 national emergency hotlines (911, 8888, 143), NDRRMC protocols, and regional evacuation guides.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button size="sm" variant="outline" onClick={refreshList} title="Refresh records list">
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
          <Button size="sm" variant="primary" onClick={onOpenCreate} className="font-bold">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Emergency Hotline</span>
          </Button>
        </div>
      </div>

      {/* 24/7 National Emergency Hotline Highlights Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-ios-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 dark:text-red-400">
              National Emergency
            </span>
            <div className="text-2xl font-black text-red-700 dark:text-red-300">911</div>
            <span className="text-[10px] text-red-600/80 dark:text-red-400">Police, Fire, Medical, Rescue</span>
          </div>
          <Button size="sm" variant="destructive" onClick={() => copyHotline('911', 'National Emergency')}>
            Copy
          </Button>
        </div>

        <div className="p-3.5 rounded-ios-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              Citizen Hotline
            </span>
            <div className="text-2xl font-black text-blue-700 dark:text-blue-300">8888</div>
            <span className="text-[10px] text-blue-600/80 dark:text-blue-400">Presidential Complaint Hotline</span>
          </div>
          <Button size="sm" variant="secondary" onClick={() => copyHotline('8888', 'Citizen Complaints')}>
            Copy
          </Button>
        </div>

        <div className="p-3.5 rounded-ios-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Disaster Operations
            </span>
            <div className="text-2xl font-black text-emerald-700 dark:text-emerald-300">143</div>
            <span className="text-[10px] text-emerald-600/80 dark:text-emerald-400">Philippine Red Cross</span>
          </div>
          <Button size="sm" variant="secondary" onClick={() => copyHotline('143', 'Red Cross')}>
            Copy
          </Button>
        </div>
      </div>

      {/* Safety & Hotline Records Table with Integrated Management Toolbar */}
      <div className="rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm overflow-hidden">
        {/* Integrated Management Toolbar */}
        <div className="p-3 bg-slate-50/60 dark:bg-slate-800/40 border-b border-ios-lightBorder dark:border-ios-darkBorder flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-ios-lightMuted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search hotline name, agency, or phone number..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-ios-lg bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder text-ios-lightText dark:text-ios-darkText focus:outline-none focus:ring-2 focus:ring-ios-navy"
            />
          </div>

          <div className="w-full md:w-64">
            <IOSSelect
              value={selectedType}
              onChange={setSelectedType}
              size="sm"
              className="w-full"
              options={[
                { value: 'all', label: 'All Safety Resources' },
                { value: 'hotline', label: 'Emergency Phone Hotlines' },
                { value: 'disaster_guide', label: 'Disaster Preparedness Guides' },
                { value: 'evacuation', label: 'Evacuation Center Network' },
                { value: 'first_aid', label: 'First Aid Protocols' },
              ]}
            />
          </div>
        </div>
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-xs text-ios-lightMuted space-y-2">
            <ShieldAlert className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
            <p className="font-semibold text-ios-lightText dark:text-ios-darkText">No safety resources found</p>
            <p>Try modifying your search or resetting filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-ios-lightMuted uppercase text-[10px] font-bold border-b border-ios-lightBorder dark:border-ios-darkBorder">
                <tr>
                  <th className="p-3.5">Hotline / Protocol Title</th>
                  <th className="p-3.5">Agency</th>
                  <th className="p-3.5">Contact Number</th>
                  <th className="p-3.5">Operating Hours & Coverage</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ios-lightBorder dark:divide-ios-darkBorder">
                {filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 max-w-sm">
                      <div className="font-bold text-ios-lightText dark:text-ios-darkText">
                        {item.title}
                      </div>
                      <p className="text-[11px] text-ios-lightMuted line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                      <span className="inline-block text-[10px] uppercase font-semibold px-1.5 py-0.2 rounded bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 mt-1">
                        {item.resourceType?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-semibold text-ios-navy dark:text-blue-400">
                        {item.agencyAcronym || item.agency}
                      </span>
                      <p className="text-[10px] text-ios-lightMuted max-w-[150px] truncate">
                        {item.agency}
                      </p>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      {item.hotlineNumber ? (
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-red-600 dark:text-red-400 text-sm">
                            {item.hotlineNumber}
                          </span>
                          <button
                            onClick={() => copyHotline(item.hotlineNumber!, item.title)}
                            className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700"
                            title="Copy number"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400">Direct Guide</span>
                      )}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1 font-medium text-ios-lightText dark:text-ios-darkText">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.operatingHours}</span>
                      </div>
                      <span className="text-[10px] text-ios-lightMuted block mt-0.5">
                        {item.coverage}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap space-x-1">
                      {item.officialUrl && (
                        <a
                          href={item.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block p-1.5 text-ios-lightMuted hover:text-ios-navy rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Open official agency hotline portal"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => onOpenEdit(item)}
                        className="p-1.5 text-ios-lightMuted hover:text-ios-navy dark:hover:text-blue-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit safety resource"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        className="p-1.5 text-ios-lightMuted hover:text-red-500 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Delete resource"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
