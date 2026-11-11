import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MockStorage } from '../data/mockStorage';
import {
  BaseItem,
  ServiceItem,
  JobItem,
  FinancialAssistanceItem,
  EducationItem,
  BayanihanItem,
  EmergencyResourceItem,
  AnnouncementItem,
  CitizenReport,
  ServiceSuggestion,
  ActivityLogItem,
  CategoryType
} from '../types';
import {
  Shield,
  LayoutDashboard,
  FileText,
  Briefcase,
  DollarSign,
  GraduationCap,
  HeartHandshake,
  ShieldAlert,
  Bell,
  CheckCircle2,
  AlertTriangle,
  History,
  Settings,
  Plus,
  Trash2,
  Edit3,
  RotateCcw,
  Check
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { TextInput, Textarea } from '../components/common/Input';
import { Modal } from '../components/common/Modal';
import { useToast } from '../context/ToastContext';

type AdminTab =
  | 'overview'
  | 'services'
  | 'jobs'
  | 'assistance'
  | 'education'
  | 'bayanihan'
  | 'safety'
  | 'announcements'
  | 'reports'
  | 'suggestions'
  | 'users'
  | 'logs'
  | 'settings';

export const AdminDashboardPage: React.FC = () => {
  const { setRole, navigate } = useApp();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Local state for dynamic updates
  const [services, setServices] = useState<ServiceItem[]>(() => MockStorage.getServices());
  const [jobs, setJobs] = useState<JobItem[]>(() => MockStorage.getJobs());
  const [assistance, setAssistance] = useState<FinancialAssistanceItem[]>(() => MockStorage.getAssistance());
  const [education, setEducation] = useState<EducationItem[]>(() => MockStorage.getEducation());
  const [bayanihan, setBayanihan] = useState<BayanihanItem[]>(() => MockStorage.getBayanihan());
  const [safety, setSafety] = useState<EmergencyResourceItem[]>(() => MockStorage.getSafety());
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(() => MockStorage.getAnnouncements());
  const [reports, setReports] = useState<CitizenReport[]>(() => MockStorage.getReports());
  const [suggestions, setSuggestions] = useState<ServiceSuggestion[]>(() => MockStorage.getSuggestions());
  const [logs, setLogs] = useState<ActivityLogItem[]>(() => MockStorage.getActivityLogs());

  // CRUD Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BaseItem | null>(null);

  // Form fields for Create / Edit Record
  const [formCategory, setFormCategory] = useState<CategoryType>('serbisyo');
  const [formTitle, setFormTitle] = useState('');
  const [formAgency, setFormAgency] = useState('');
  const [formAcronym, setFormAcronym] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formFees, setFormFees] = useState('Libre (Free)');
  const [formProcessingTime, setFormProcessingTime] = useState('1 hanggang 3 araw');
  const [formOfficialUrl, setFormOfficialUrl] = useState('https://gov.ph');

  const refreshAllData = () => {
    setServices(MockStorage.getServices());
    setJobs(MockStorage.getJobs());
    setAssistance(MockStorage.getAssistance());
    setEducation(MockStorage.getEducation());
    setBayanihan(MockStorage.getBayanihan());
    setSafety(MockStorage.getSafety());
    setAnnouncements(MockStorage.getAnnouncements());
    setReports(MockStorage.getReports());
    setSuggestions(MockStorage.getSuggestions());
    setLogs(MockStorage.getActivityLogs());
  };

  const handleOpenCreate = (cat: CategoryType) => {
    setFormCategory(cat);
    setFormTitle('');
    setFormAgency('Kagawaran ng Pamahalaan');
    setFormAcronym('GOV');
    setFormDescription('');
    setFormFees('Libre (Free)');
    setFormProcessingTime('3–5 working days');
    setFormOfficialUrl('https://gov.ph');
    setEditingItem(null);
    setIsCreateModalOpen(true);
  };

  const handleOpenEdit = (item: BaseItem) => {
    setEditingItem(item);
    setFormCategory(item.category);
    setFormTitle(item.title);
    setFormAgency(item.agency);
    setFormAcronym(item.agencyAcronym || '');
    setFormDescription(item.description);
    setFormOfficialUrl(item.officialUrl || 'https://gov.ph');
    setIsCreateModalOpen(true);
  };

  const handleSaveRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      showToast('Pakilagay ang pamagat ng tala.', 'error');
      return;
    }

    if (editingItem) {
      // Edit existing
      const updatedItem: BaseItem = {
        ...editingItem,
        title: formTitle,
        agency: formAgency,
        agencyAcronym: formAcronym,
        description: formDescription,
        officialUrl: formOfficialUrl,
        lastVerified: 'November 2026'
      };
      MockStorage.updateItem(updatedItem);
      showToast(`Nai-update ang tala: ${formTitle}`, 'success');
    } else {
      // Create new
      const newItem: BaseItem = {
        id: `mock-${formCategory}-${Date.now()}`,
        title: formTitle,
        category: formCategory,
        agency: formAgency,
        agencyAcronym: formAcronym,
        description: formDescription,
        officialUrl: formOfficialUrl,
        lastVerified: 'November 2026',
        isVerified: true
      };

      if (formCategory === 'serbisyo') {
        const s: ServiceItem = {
          ...newItem,
          category: 'serbisyo',
          serviceType: 'identity',
          requirements: ['Valid Government ID', 'Barangay Clearance'],
          eligibility: ['Lahat ng mamamayang Pilipino'],
          fees: formFees,
          processingTime: formProcessingTime,
          steps: ['Isumite ang online application form.', 'Pumunta sa pinakamalapit na tanggapan.'],
          officeLocations: ['Regional Offices nationwide'],
          onlineServiceAvailable: true
        };
        MockStorage.addItem(s);
      } else {
        MockStorage.addItem(newItem);
      }
      showToast(`Nalikha ang bagong ${formCategory} tala: ${formTitle}`, 'success');
    }

    setIsCreateModalOpen(false);
    refreshAllData();
  };

  const handleDeleteRecord = (category: CategoryType, id: string, title: string) => {
    if (window.confirm(`Sigurado ka bang nais mong burahin ang record na "${title}"?`)) {
      MockStorage.deleteItem(category, id);
      refreshAllData();
      showToast(`Nabura ang tala: ${title}`, 'info');
    }
  };

  const handleUpdateReportStatus = (id: string, status: CitizenReport['status']) => {
    MockStorage.updateReportStatus(id, status);
    refreshAllData();
    showToast(`Binago ang estado ng ulat sa ${status}.`, 'info');
  };

  const handleUpdateSuggestionStatus = (id: string, status: ServiceSuggestion['status']) => {
    MockStorage.updateSuggestionStatus(id, status);
    refreshAllData();
    showToast(`Binago ang estado ng mungkahi sa ${status}.`, 'info');
  };

  const navTabs: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'overview', label: 'Pangkalahatan', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'services', label: 'Mga Serbisyo', icon: <FileText className="w-4 h-4" />, badge: services.length },
    { id: 'jobs', label: 'Trabaho', icon: <Briefcase className="w-4 h-4" />, badge: jobs.length },
    { id: 'assistance', label: 'Ayuda at Pera', icon: <DollarSign className="w-4 h-4" />, badge: assistance.length },
    { id: 'education', label: 'Edukasyon', icon: <GraduationCap className="w-4 h-4" />, badge: education.length },
    { id: 'bayanihan', label: 'Bayanihan', icon: <HeartHandshake className="w-4 h-4" />, badge: bayanihan.length },
    { id: 'safety', label: 'Kaligtasan', icon: <ShieldAlert className="w-4 h-4" />, badge: safety.length },
    { id: 'announcements', label: 'Mga Anunsyo', icon: <Bell className="w-4 h-4" />, badge: announcements.length },
    {
      id: 'reports',
      label: 'Moderation / Ulat',
      icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,
      badge: reports.filter(r => r.status === 'pending').length
    },
    { id: 'suggestions', label: 'Mga Mungkahi', icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, badge: suggestions.length },
    { id: 'logs', label: 'Audit Trail Logs', icon: <History className="w-4 h-4" /> },
    { id: 'settings', label: 'Admin Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Admin Banner */}
      <div className="bg-amber-500 text-slate-950 p-4 sm:p-5 rounded-ios-xl shadow-ios-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-ios-lg bg-slate-950 text-amber-400 flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight">
                GabayPH Admin Operations Portal
              </h1>
              <span className="text-[10px] font-bold bg-slate-950 text-amber-400 px-2 py-0.5 rounded-full uppercase">
                Prototype Mode
              </span>
            </div>
            <p className="text-xs text-slate-900/80 font-medium">
              Pamamahala ng mga talaan, pagsusuri ng ulat ng mamamayan, at pagpapatunay ng serbisyo.
            </p>
          </div>
        </div>

        {/* Prototype Role Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setRole('citizen');
              navigate('/');
              showToast('Bumalik sa Citizen Interface.', 'info');
            }}
            className="text-xs font-bold bg-slate-950 text-white hover:bg-slate-800"
          >
            Bumalik sa Citizen View
          </Button>
        </div>
      </div>

      {/* Main Admin Layout: Navigation Bar & Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar Navigation */}
        <div className="w-full lg:w-64 shrink-0 space-y-1">
          <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-2 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm space-y-1">
            {navTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-ios-lg text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-ios-navy text-white shadow-sm'
                    : 'text-ios-lightText dark:text-ios-darkText hover:bg-ios-lightSecondary dark:hover:bg-ios-darkSecondary'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {tab.icon}
                  <span>{tab.label}</span>
                </div>
                {typeof tab.badge === 'number' && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      activeTab === tab.id
                        ? 'bg-white/20 text-white'
                        : 'bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightMuted'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-ios-xl bg-ios-lightSurface dark:bg-ios-darkSurface border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm">
                  <span className="text-[11px] font-semibold text-ios-lightMuted dark:text-ios-darkMuted uppercase">
                    Kabuuang Serbisyo
                  </span>
                  <div className="text-2xl font-bold text-ios-navy dark:text-blue-400 mt-1">
                    {services.length}
                  </div>
                  <span className="text-[10px] text-emerald-600 font-medium mt-1 block">
                    ✓ Lahat ay beripikado
                  </span>
                </div>

                <div className="p-4 rounded-ios-xl bg-ios-lightSurface dark:bg-ios-darkSurface border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm">
                  <span className="text-[11px] font-semibold text-ios-lightMuted dark:text-ios-darkMuted uppercase">
                    Bukas na Trabaho
                  </span>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {jobs.length}
                  </div>
                  <span className="text-[10px] text-ios-lightMuted mt-1 block">
                    Civil Service & Gov
                  </span>
                </div>

                <div className="p-4 rounded-ios-xl bg-ios-lightSurface dark:bg-ios-darkSurface border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm">
                  <span className="text-[11px] font-semibold text-ios-lightMuted dark:text-ios-darkMuted uppercase">
                    Mga Ulat ng Mamamayan
                  </span>
                  <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                    {reports.filter(r => r.status === 'pending').length}
                  </div>
                  <span className="text-[10px] text-amber-600 font-medium mt-1 block">
                    Nangangailangan ng aksyon
                  </span>
                </div>

                <div className="p-4 rounded-ios-xl bg-ios-lightSurface dark:bg-ios-darkSurface border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm">
                  <span className="text-[11px] font-semibold text-ios-lightMuted dark:text-ios-darkMuted uppercase">
                    Mga Mungkahi
                  </span>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                    {suggestions.length}
                  </div>
                  <span className="text-[10px] text-ios-lightMuted mt-1 block">
                    Bagong mungkahi mula sa publiko
                  </span>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-5 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-ios-lightMuted dark:text-ios-darkMuted mb-3">
                  Mabilisang Aksyon sa Paglikha ng Tala
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="primary" onClick={() => handleOpenCreate('serbisyo')}>
                    <Plus className="w-3.5 h-3.5" /> Magdagdag ng Serbisyo
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => handleOpenCreate('trabaho')}>
                    <Plus className="w-3.5 h-3.5" /> Magdagdag ng Trabaho
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => handleOpenCreate('pera')}>
                    <Plus className="w-3.5 h-3.5" /> Magdagdag ng Ayuda
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => handleOpenCreate('aral')}>
                    <Plus className="w-3.5 h-3.5" /> Magdagdag ng Iskolarship
                  </Button>
                </div>
              </div>

              {/* Recent Activity Audit Logs */}
              <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-5 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-ios-lightMuted dark:text-ios-darkMuted">
                    Kamakailang Audit Trail (Huling 5 Aksyon)
                  </h3>
                  <button
                    onClick={() => setActiveTab('logs')}
                    className="text-xs text-ios-navy dark:text-blue-400 font-semibold hover:underline"
                  >
                    Tingnan Lahat
                  </button>
                </div>
                <div className="divide-y divide-ios-lightBorder/80 dark:divide-ios-darkBorder/80">
                  {logs.slice(0, 5).map(log => (
                    <div key={log.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-ios-lightText dark:text-ios-darkText">
                          {log.action}
                        </span>
                        <div className="text-[11px] text-ios-lightMuted">
                          Isinagawa ni: {log.user} • {log.timestamp}
                        </div>
                      </div>
                      <Badge variant={log.status === 'success' ? 'verified' : log.status === 'warning' ? 'urgent' : 'default'}>
                        {log.entityType}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. SERVICES TAB */}
          {activeTab === 'services' && (
            <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-5 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-ios-lightText dark:text-ios-darkText">
                    Pamamahala ng mga Serbisyo ng Pamahalaan
                  </h2>
                  <p className="text-xs text-ios-lightMuted">
                    {services.length} kabuuang tala sa direktoryo
                  </p>
                </div>
                <Button size="sm" variant="primary" onClick={() => handleOpenCreate('serbisyo')}>
                  <Plus className="w-3.5 h-3.5" /> Bagong Serbisyo
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightMuted font-semibold uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Serbisyo</th>
                      <th className="p-3">Ahensya</th>
                      <th className="p-3">Bayarin</th>
                      <th className="p-3">Beripikasyon</th>
                      <th className="p-3 text-right">Aksyon</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ios-lightBorder dark:divide-ios-darkBorder">
                    {services.map(srv => (
                      <tr key={srv.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="p-3 font-semibold text-ios-lightText dark:text-ios-darkText">
                          {srv.title}
                        </td>
                        <td className="p-3 text-ios-lightMuted">
                          {srv.agencyAcronym || srv.agency}
                        </td>
                        <td className="p-3 text-ios-lightMuted truncate max-w-[140px]">
                          {srv.fees}
                        </td>
                        <td className="p-3">
                          <span className="text-emerald-600 font-medium">✓ {srv.lastVerified}</span>
                        </td>
                        <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => handleOpenEdit(srv)}
                            className="p-1.5 text-ios-lightMuted hover:text-ios-navy rounded hover:bg-black/5"
                            title="I-edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteRecord('serbisyo', srv.id, srv.title)}
                            className="p-1.5 text-ios-lightMuted hover:text-red-500 rounded hover:bg-black/5"
                            title="Burahin"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. JOBS TAB */}
          {activeTab === 'jobs' && (
            <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-5 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-ios-lightText dark:text-ios-darkText">
                    Pamamahala ng Trabaho (Employment)
                  </h2>
                  <p className="text-xs text-ios-lightMuted">
                    {jobs.length} bakanteng posisyon sa talaan
                  </p>
                </div>
                <Button size="sm" variant="primary" onClick={() => handleOpenCreate('trabaho')}>
                  <Plus className="w-3.5 h-3.5" /> Magdagdag ng Trabaho
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightMuted font-semibold uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Posisyon</th>
                      <th className="p-3">Ahensya</th>
                      <th className="p-3">Sahod</th>
                      <th className="p-3">Deadline</th>
                      <th className="p-3 text-right">Aksyon</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ios-lightBorder dark:divide-ios-darkBorder">
                    {jobs.map(job => (
                      <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="p-3 font-semibold text-ios-lightText dark:text-ios-darkText">
                          {job.title}
                        </td>
                        <td className="p-3 text-ios-lightMuted">
                          {job.agencyAcronym || job.agency}
                        </td>
                        <td className="p-3 text-ios-navy dark:text-blue-400 font-medium">
                          {job.salaryRange.split('(')[0]}
                        </td>
                        <td className="p-3 text-red-600 dark:text-red-400 font-medium">
                          {job.deadline}
                        </td>
                        <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                          <button
                            onClick={() => handleOpenEdit(job)}
                            className="p-1.5 text-ios-lightMuted hover:text-ios-navy rounded hover:bg-black/5"
                            title="I-edit"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteRecord('trabaho', job.id, job.title)}
                            className="p-1.5 text-ios-lightMuted hover:text-red-500 rounded hover:bg-black/5"
                            title="Burahin"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. ASSISTANCE TAB */}
          {activeTab === 'assistance' && (
            <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-5 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-ios-lightText dark:text-ios-darkText">
                    Pamamahala ng Tulong Pinansyal (Ayuda)
                  </h2>
                  <p className="text-xs text-ios-lightMuted">
                    {assistance.length} programa sa talaan
                  </p>
                </div>
                <Button size="sm" variant="primary" onClick={() => handleOpenCreate('pera')}>
                  <Plus className="w-3.5 h-3.5" /> Bagong Programa ng Ayuda
                </Button>
              </div>

              <div className="divide-y divide-ios-lightBorder dark:divide-ios-darkBorder">
                {assistance.map(ast => (
                  <div key={ast.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div>
                      <h4 className="font-bold text-ios-lightText dark:text-ios-darkText">
                        {ast.title}
                      </h4>
                      <p className="text-ios-lightMuted text-[11px] mt-0.5">
                        {ast.agency} • Halaga: <strong>{ast.amountOrCoverage.split(';')[0]}</strong>
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEdit(ast)}
                        className="p-1.5 text-ios-lightMuted hover:text-ios-navy rounded hover:bg-black/5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteRecord('pera', ast.id, ast.title)}
                        className="p-1.5 text-ios-lightMuted hover:text-red-500 rounded hover:bg-black/5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. REPORTS & MODERATION TAB */}
          {activeTab === 'reports' && (
            <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-5 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-ios-lightText dark:text-ios-darkText">
                    Mga Ulat ng Maling Impormasyon (Moderation)
                  </h2>
                  <p className="text-xs text-ios-lightMuted">
                    Suriin at aksyunan ang mga sumbong ng mamamayan ukol sa mga bayarin o sirang link
                  </p>
                </div>
                <Badge variant="urgent">
                  {reports.filter(r => r.status === 'pending').length} Nakabinbin
                </Badge>
              </div>

              <div className="space-y-3">
                {reports.map(rep => (
                  <div
                    key={rep.id}
                    className="p-4 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary border border-ios-lightBorder/80 dark:border-ios-darkBorder/80 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-bold text-ios-navy dark:text-blue-400">
                        {rep.targetTitle}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        rep.status === 'resolved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : rep.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {rep.status}
                      </span>
                    </div>

                    <p className="text-ios-lightText dark:text-ios-darkText font-medium">
                      Uri ng Isyu: <span className="capitalize">{rep.reportType.replace('_', ' ')}</span>
                    </p>
                    <p className="text-ios-lightMuted bg-white dark:bg-slate-900 p-2.5 rounded border border-ios-lightBorder/60 dark:border-ios-darkBorder/60">
                      "{rep.details}"
                    </p>
                    <p className="text-[11px] text-ios-lightMuted">
                      Isumite noong: {rep.submittedAt} {rep.reporterEmail ? `mula kay ${rep.reporterEmail}` : ''}
                    </p>

                    <div className="flex items-center gap-2 pt-2 border-t border-ios-lightBorder dark:border-ios-darkBorder justify-end">
                      {rep.status !== 'resolved' && (
                        <Button
                          size="sm"
                          variant="green"
                          onClick={() => handleUpdateReportStatus(rep.id, 'resolved')}
                          className="text-xs py-1"
                        >
                          <Check className="w-3.5 h-3.5" /> Mark Resolved
                        </Button>
                      )}
                      {rep.status !== 'dismissed' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUpdateReportStatus(rep.id, 'dismissed')}
                          className="text-xs py-1 text-slate-500"
                        >
                          Dismiss
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. SUGGESTIONS TAB */}
          {activeTab === 'suggestions' && (
            <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-5 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm space-y-4">
              <div>
                <h2 className="text-base font-bold text-ios-lightText dark:text-ios-darkText">
                  Mga Mungkahing Serbisyo mula sa Publiko
                </h2>
                <p className="text-xs text-ios-lightMuted">
                  Maaaring aprobahan upang maging opisyal na tala sa direktoryo
                </p>
              </div>

              <div className="space-y-3">
                {suggestions.map(sug => (
                  <div
                    key={sug.id}
                    className="p-4 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary border border-ios-lightBorder/80 dark:border-ios-darkBorder/80 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-ios-lightText dark:text-ios-darkText">
                        {sug.serviceName}
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        sug.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {sug.status}
                      </span>
                    </div>
                    <p className="text-ios-navy dark:text-blue-400 font-semibold">
                      Ahensya: {sug.agencyName}
                    </p>
                    <p className="text-ios-lightMuted">
                      {sug.description}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-ios-lightBorder dark:border-ios-darkBorder">
                      <span className="text-[11px] text-ios-lightMuted">
                        Petsa: {sug.submittedAt}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Button
                          size="sm"
                          variant="green"
                          onClick={() => handleUpdateSuggestionStatus(sug.id, 'approved')}
                          className="text-xs py-1"
                        >
                          Aprobahan
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleUpdateSuggestionStatus(sug.id, 'rejected')}
                          className="text-xs py-1"
                        >
                          Tanggihan
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. AUDIT TRAIL LOGS TAB */}
          {activeTab === 'logs' && (
            <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-5 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm space-y-3">
              <h2 className="text-base font-bold text-ios-lightText dark:text-ios-darkText">
                System Audit Trail & Activity History
              </h2>
              <div className="divide-y divide-ios-lightBorder dark:divide-ios-darkBorder">
                {logs.map(log => (
                  <div key={log.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-ios-lightText dark:text-ios-darkText">
                        {log.action}
                      </p>
                      <span className="text-[11px] text-ios-lightMuted">
                        {log.user} • {log.timestamp}
                      </span>
                    </div>
                    <Badge variant={log.status === 'success' ? 'verified' : log.status === 'warning' ? 'urgent' : 'default'}>
                      {log.entityType}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-5 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm space-y-4 text-xs">
              <h2 className="text-base font-bold text-ios-lightText dark:text-ios-darkText">
                Mga Setting ng Administrasyon (Prototype)
              </h2>
              <p className="text-ios-lightMuted">
                Ang application ay tumatakbo sa Frontend Prototype Mode (Phase 1). Walang live backend database na nakakonekta alinsunod sa mga panuntunan ng proyekto.
              </p>

              <div className="p-4 rounded-ios-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-red-700 dark:text-red-300">
                    I-reset ang Lahat ng Prototype Data
                  </h4>
                  <p className="text-ios-lightMuted text-[11px]">
                    Ibabalik nito ang lahat ng services, jobs, ayuda, at reports sa orihinal na initial mock fixtures.
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    if (window.confirm('I-reset ang buong prototype database?')) {
                      MockStorage.resetAllToDefaults();
                    }
                  }}
                >
                  <RotateCcw className="w-3.5 h-3.5" /> I-reset Lahat
                </Button>
              </div>
            </div>
          )}

          {/* Fallback for other category management tabs */}
          {['education', 'bayanihan', 'safety', 'announcements', 'users'].includes(activeTab) && (
            <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-5 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-ios-lightText dark:text-ios-darkText capitalize">
                  Pamamahala ng {activeTab}
                </h2>
                <Button size="sm" variant="primary" onClick={() => handleOpenCreate('serbisyo')}>
                  <Plus className="w-3.5 h-3.5" /> Magdagdag ng Tala
                </Button>
              </div>
              <p className="text-xs text-ios-lightMuted">
                Aktibong pinamamahalaan ang seksyong {activeTab} sa ilalim ng local simulated store.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CREATE / EDIT RECORD MODAL */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title={editingItem ? `I-edit ang Tala (${formCategory})` : `Lumikha ng Bagong Tala (${formCategory})`}
        maxWidth="lg"
      >
        <form onSubmit={handleSaveRecord} className="space-y-3.5">
          <TextInput
            label="Pamagat ng Tala o Serbisyo"
            required
            value={formTitle}
            onChange={e => setFormTitle(e.target.value)}
            placeholder="hal. PhilHealth Registration, DOST Scholarship..."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TextInput
              label="Ahensya ng Pamahalaan"
              required
              value={formAgency}
              onChange={e => setFormAgency(e.target.value)}
              placeholder="hal. Department of Health"
            />
            <TextInput
              label="Akronim ng Ahensya"
              value={formAcronym}
              onChange={e => setFormAcronym(e.target.value)}
              placeholder="hal. DOH, PSA, DOLE"
            />
          </div>

          <Textarea
            label="Paglalarawan (Description)"
            required
            rows={3}
            value={formDescription}
            onChange={e => setFormDescription(e.target.value)}
            placeholder="Maikling buod ng layunin at saklaw ng serbisyo..."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <TextInput
              label="Bayarin (Fees)"
              value={formFees}
              onChange={e => setFormFees(e.target.value)}
              placeholder="hal. Libre (Free) o ₱950.00"
            />
            <TextInput
              label="Panahon ng Pagproseso"
              value={formProcessingTime}
              onChange={e => setFormProcessingTime(e.target.value)}
              placeholder="hal. 3–5 working days"
            />
          </div>

          <TextInput
            label="Opisyal na Website Link"
            type="url"
            value={formOfficialUrl}
            onChange={e => setFormOfficialUrl(e.target.value)}
            placeholder="https://..."
          />

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-ios-lightBorder dark:border-ios-darkBorder">
            <Button type="button" variant="secondary" onClick={() => setIsCreateModalOpen(false)}>
              Kanselahin
            </Button>
            <Button type="submit" variant="primary">
              I-save ang Tala
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
