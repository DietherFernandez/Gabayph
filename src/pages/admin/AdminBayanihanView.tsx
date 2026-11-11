import React, { useState, useMemo } from 'react';
import { BayanihanItem, VolunteerApplication } from '../../types';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import { IOSSelect } from '../../components/common/IOSSelect';
import {
  HeartHandshake,
  Search,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Users,
  MapPin,
  Calendar,
  Eye,
  RefreshCw
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

interface AdminBayanihanViewProps {
  onOpenCreate: () => void;
  onOpenEdit: (item: BayanihanItem) => void;
  onDataChanged: () => void;
}

export const AdminBayanihanView: React.FC<AdminBayanihanViewProps> = ({
  onOpenCreate,
  onOpenEdit,
  onDataChanged
}) => {
  const { showToast } = useToast();
  const { confirmAction } = useConfirm();
  const [bayanihan, setBayanihan] = useState<BayanihanItem[]>(() => MockStorage.getBayanihan());
  const [volunteerApps, setVolunteerApps] = useState<VolunteerApplication[]>(() => MockStorage.getVolunteerApps());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedProgramForApps, setSelectedProgramForApps] = useState<BayanihanItem | null>(null);

  const refreshList = () => {
    setBayanihan(MockStorage.getBayanihan());
    setVolunteerApps(MockStorage.getVolunteerApps());
    onDataChanged();
  };

  const handleDelete = (id: string, title: string) => {
    confirmAction({
      title: 'Delete Community Drive?',
      message: `Are you sure you want to permanently delete "${title}"? This cannot be undone.`,
      confirmLabel: 'Delete Drive',
      isDestructive: true,
      onConfirm: () => {
        MockStorage.deleteItem('bayanihan', id);
        refreshList();
        showToast(`Deleted community program: ${title}`, 'info');
      }
    });
  };

  const filteredItems = useMemo(() => {
    return bayanihan.filter(item => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchType = selectedType === 'all' || item.programType === selectedType;

      return matchSearch && matchType;
    });
  }, [bayanihan, searchQuery, selectedType]);

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-ios-lightText dark:text-ios-darkText">
              Community Programs & Bayanihan Management
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold">
              {bayanihan.length} programs
            </span>
          </div>
          <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted mt-0.5">
            Coordinate public volunteer drives, blood donations, community pantries, and disaster relief mobilizations.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button size="sm" variant="outline" onClick={refreshList} title="Refresh records list">
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
          <Button size="sm" variant="primary" onClick={onOpenCreate} className="font-bold">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Community Drive</span>
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
            placeholder="Search drive title, lead organization, or location..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-ios-lg bg-slate-50 dark:bg-slate-800 border border-ios-lightBorder dark:border-ios-darkBorder text-ios-lightText dark:text-ios-darkText focus:outline-none focus:ring-2 focus:ring-ios-navy"
          />
        </div>

        <div className="w-full md:w-64">
          <IOSSelect
            value={selectedType}
            onChange={setSelectedType}
            size="sm"
            className="w-full"
            options={[
              { value: 'all', label: 'All Drive Types' },
              { value: 'volunteer', label: 'Volunteer Mobilization' },
              { value: 'disaster_relief', label: 'Disaster Relief Operations' },
              { value: 'donation', label: 'Blood & Medical Donations' },
              { value: 'community_pantry', label: 'Food Security / Community Pantry' },
            ]}
          />
        </div>
      </div>

      {/* Records Table */}
      <div className="rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-xs text-ios-lightMuted space-y-2">
            <HeartHandshake className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
            <p className="font-semibold text-ios-lightText dark:text-ios-darkText">No community programs found</p>
            <p>Try modifying your search or resetting filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-ios-lightMuted uppercase text-[10px] font-bold border-b border-ios-lightBorder dark:border-ios-darkBorder">
                <tr>
                  <th className="p-3.5">Community Program & Description</th>
                  <th className="p-3.5">Lead Organization</th>
                  <th className="p-3.5">Location & Schedule</th>
                  <th className="p-3.5">Volunteers Target</th>
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
                      <span className="inline-block text-[10px] uppercase font-semibold px-1.5 py-0.2 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 mt-1">
                        {item.programType?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-semibold text-ios-navy dark:text-blue-400">
                        {item.organization}
                      </span>
                      <p className="text-[10px] text-ios-lightMuted">
                        Contact: {item.contactPerson} ({item.contactNumber})
                      </p>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-ios-lightText dark:text-ios-darkText font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="max-w-[150px] truncate">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-ios-lightMuted mt-0.5">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{item.dates}</span>
                      </div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-ios-navy dark:text-blue-400 font-bold">
                        <Users className="w-3.5 h-3.5" />
                        <span>{item.volunteersNeeded || 'Active'}</span>
                      </div>
                      <button
                        onClick={() => setSelectedProgramForApps(item)}
                        className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect sign-ups</span>
                      </button>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap space-x-1">
                      {item.officialUrl && (
                        <a
                          href={item.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block p-1.5 text-ios-lightMuted hover:text-ios-navy rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Open official volunteer registration link"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => onOpenEdit(item)}
                        className="p-1.5 text-ios-lightMuted hover:text-ios-navy dark:hover:text-blue-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit program"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        className="p-1.5 text-ios-lightMuted hover:text-red-500 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Delete program"
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

      {/* Volunteer Applicants Inspector Modal */}
      {selectedProgramForApps && (
        <Modal
          isOpen={!!selectedProgramForApps}
          onClose={() => setSelectedProgramForApps(null)}
          title={`Registered Volunteers: ${selectedProgramForApps.title}`}
          maxWidth="md"
        >
          <div className="space-y-3.5 text-xs">
            <p className="text-ios-lightMuted dark:text-ios-darkMuted">
              Citizen volunteer registrations submitted for this program via the citizen public portal.
            </p>

            {volunteerApps.length === 0 ? (
              <div className="p-6 text-center text-ios-lightMuted border border-dashed rounded-ios-lg">
                No citizen volunteer registrations submitted yet for this simulation session.
              </div>
            ) : (
              <div className="divide-y divide-ios-lightBorder dark:divide-ios-darkBorder border rounded-ios-lg overflow-hidden">
                {volunteerApps.map(app => (
                  <div key={app.id} className="p-3 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-ios-lightText dark:text-ios-darkText">
                        {app.fullName}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {app.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-ios-lightMuted">
                      {app.email} • {app.phone} • {app.city}
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300">
                      Skills: <em>{app.skills}</em> (Availability: {app.availability})
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <Button size="sm" variant="secondary" onClick={() => setSelectedProgramForApps(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
