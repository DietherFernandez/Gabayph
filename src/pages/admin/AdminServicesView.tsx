import React, { useState, useMemo } from 'react';
import { ServiceItem } from '../../types';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
import {
  FileText,
  Search,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { Button } from '../../components/common/Button';

interface AdminServicesViewProps {
  onOpenCreate: () => void;
  onOpenEdit: (item: ServiceItem) => void;
  onDataChanged: () => void;
}

export const AdminServicesView: React.FC<AdminServicesViewProps> = ({
  onOpenCreate,
  onOpenEdit,
  onDataChanged
}) => {
  const { showToast } = useToast();
  const [services, setServices] = useState<ServiceItem[]>(() => MockStorage.getServices());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedFee, setSelectedFee] = useState<string>('all');

  const refreshList = () => {
    setServices(MockStorage.getServices());
    onDataChanged();
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the public service "${title}"?`)) {
      MockStorage.deleteItem('serbisyo', id);
      refreshList();
      showToast(`Deleted service record: ${title}`, 'info');
    }
  };

  const filteredServices = useMemo(() => {
    return services.filter(srv => {
      const matchSearch =
        srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (srv.agencyAcronym && srv.agencyAcronym.toLowerCase().includes(searchQuery.toLowerCase())) ||
        srv.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchType = selectedType === 'all' || srv.serviceType === selectedType;
      const isFree = srv.fees.toLowerCase().includes('free') || srv.fees.toLowerCase().includes('libre') || srv.fees.includes('₱0');
      const matchFee =
        selectedFee === 'all'
          ? true
          : selectedFee === 'free'
          ? isFree
          : !isFree;

      return matchSearch && matchType && matchFee;
    });
  }, [services, searchQuery, selectedType, selectedFee]);

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-ios-lightText dark:text-ios-darkText">
              Public Services Directory Management
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold">
              {services.length} records
            </span>
          </div>
          <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted mt-0.5">
            Manage official Citizen's Charter procedures, requirements, fees, and government agency portals.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button size="sm" variant="outline" onClick={refreshList} title="Refresh records list">
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
          <Button size="sm" variant="primary" onClick={onOpenCreate} className="font-bold">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Public Service</span>
          </Button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-3.5 rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-ios-lightMuted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search service title, government agency, or keyword..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-ios-lg bg-slate-50 dark:bg-slate-800 border border-ios-lightBorder dark:border-ios-darkBorder text-ios-lightText dark:text-ios-darkText focus:outline-none focus:ring-2 focus:ring-ios-navy"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="flex-1 md:flex-initial px-2.5 py-1.5 rounded-ios-lg bg-slate-50 dark:bg-slate-800 border border-ios-lightBorder dark:border-ios-darkBorder text-xs text-ios-lightText dark:text-ios-darkText font-medium focus:outline-none"
          >
            <option value="all">All Service Types</option>
            <option value="identity">Identity & Civil Registry</option>
            <option value="clearance">Clearances & Permits</option>
            <option value="business">Business & Licensing</option>
            <option value="social_welfare">Social Welfare</option>
            <option value="health">Health & Medical</option>
          </select>

          <select
            value={selectedFee}
            onChange={e => setSelectedFee(e.target.value)}
            className="flex-1 md:flex-initial px-2.5 py-1.5 rounded-ios-lg bg-slate-50 dark:bg-slate-800 border border-ios-lightBorder dark:border-ios-darkBorder text-xs text-ios-lightText dark:text-ios-darkText font-medium focus:outline-none"
          >
            <option value="all">All Fee Schedules</option>
            <option value="free">Free Only (₱0)</option>
            <option value="paid">Standard Processing Fee</option>
          </select>
        </div>
      </div>

      {/* Directory Records Table */}
      <div className="rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm overflow-hidden">
        {filteredServices.length === 0 ? (
          <div className="p-8 text-center text-xs text-ios-lightMuted space-y-2">
            <FileText className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
            <p className="font-semibold text-ios-lightText dark:text-ios-darkText">No matching services found</p>
            <p>Try modifying your search term or clearing the type filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-ios-lightMuted uppercase text-[10px] font-bold border-b border-ios-lightBorder dark:border-ios-darkBorder">
                <tr>
                  <th className="p-3.5">Service Title & Description</th>
                  <th className="p-3.5">Agency</th>
                  <th className="p-3.5">Fees & Time</th>
                  <th className="p-3.5">Verification</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ios-lightBorder dark:divide-ios-darkBorder">
                {filteredServices.map(srv => (
                  <tr key={srv.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 max-w-sm">
                      <div className="font-bold text-ios-lightText dark:text-ios-darkText">
                        {srv.title}
                      </div>
                      <p className="text-[11px] text-ios-lightMuted line-clamp-1 mt-0.5">
                        {srv.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-[10px] uppercase font-semibold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {srv.serviceType?.replace('_', ' ')}
                        </span>
                        {srv.onlineServiceAvailable && (
                          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                            Online Portal
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-semibold text-ios-navy dark:text-blue-400">
                        {srv.agencyAcronym || srv.agency}
                      </span>
                      <p className="text-[10px] text-ios-lightMuted max-w-[150px] truncate">
                        {srv.agency}
                      </p>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-medium text-ios-lightText dark:text-ios-darkText">
                        {srv.fees}
                      </div>
                      <div className="text-[11px] text-ios-lightMuted mt-0.5">
                        {srv.processingTime}
                      </div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </span>
                      <span className="text-[10px] text-ios-lightMuted block">
                        {srv.lastVerified}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap space-x-1">
                      {srv.officialUrl && (
                        <a
                          href={srv.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block p-1.5 text-ios-lightMuted hover:text-ios-navy rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Open official agency portal"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => onOpenEdit(srv)}
                        className="p-1.5 text-ios-lightMuted hover:text-ios-navy dark:hover:text-blue-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit service record"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(srv.id, srv.title)}
                        className="p-1.5 text-ios-lightMuted hover:text-red-500 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Delete service record"
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
