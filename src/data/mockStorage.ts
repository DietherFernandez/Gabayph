import {
  BaseItem,
  ServiceItem,
  JobItem,
  FinancialAssistanceItem,
  BayanihanItem,
  EducationItem,
  EmergencyResourceItem,
  AnnouncementItem,
  UserNotification,
  CitizenReport,
  ServiceSuggestion,
  VolunteerApplication,
  ContactSubmission,
  UserProfile,
  ActivityLogItem,
  CategoryType
} from '../types';

import { INITIAL_SERVICES } from './services';
import { INITIAL_JOBS } from './jobs';
import { INITIAL_ASSISTANCE } from './assistance';
import { INITIAL_BAYANIHAN } from './bayanihan';
import { INITIAL_EDUCATION } from './education';
import { INITIAL_SAFETY } from './safety';
import { INITIAL_ANNOUNCEMENTS } from './announcements';

const STORAGE_KEYS = {
  SERVICES: 'gabayph_services_v1',
  JOBS: 'gabayph_jobs_v1',
  ASSISTANCE: 'gabayph_assistance_v1',
  BAYANIHAN: 'gabayph_bayanihan_v1',
  EDUCATION: 'gabayph_education_v1',
  SAFETY: 'gabayph_safety_v1',
  ANNOUNCEMENTS: 'gabayph_announcements_v1',
  SAVED_ITEMS: 'gabayph_saved_items_v1',
  NOTIFICATIONS: 'gabayph_notifications_v1',
  REPORTS: 'gabayph_reports_v1',
  SUGGESTIONS: 'gabayph_suggestions_v1',
  VOLUNTEER_APPS: 'gabayph_volunteer_apps_v1',
  CONTACT_SUBMISSIONS: 'gabayph_contacts_v1',
  USER_PROFILE: 'gabayph_user_v1',
  AUTH_STATUS: 'gabayph_auth_v1',
  THEME: 'gabayph_theme_v1',
  ACTIVITY_LOGS: 'gabayph_activity_logs_v1'
};

const DEFAULT_USER: UserProfile = {
  id: 'usr-cit-001',
  name: 'Juan Dela Cruz',
  email: 'juan.delacruz@citizen.gov.ph',
  phone: '0917-888-2026',
  city: 'Quezon City',
  province: 'Metro Manila',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  role: 'citizen',
  notificationsEnabled: true,
  emailAlertsEnabled: true,
  emergencyAlertsEnabled: true,
  preferredCategories: ['serbisyo', 'trabaho', 'pera']
};

const DEFAULT_NOTIFICATIONS: UserNotification[] = [
  {
    id: 'notif-1',
    title: 'Saturday Passport Appointment Slots Open',
    message: 'The Department of Foreign Affairs (DFA) opened additional Saturday consular slots across NCR offices.',
    category: 'serbisyo',
    date: '2 hours ago',
    isRead: false,
    actionUrl: '/serbisyo'
  },
  {
    id: 'notif-2',
    title: 'Automatic Price Freeze in Calamity Areas',
    message: 'DTI enforced a 60-day price freeze on basic necessities across provinces under a State of Calamity.',
    category: 'pera',
    date: 'Yesterday',
    isRead: false,
    actionUrl: '/announcements'
  },
  {
    id: 'notif-3',
    title: 'DOST-SEI Scholarship Deadline Reminder',
    message: 'Applications for graduating Grade 12 STEM students close on December 31, 2026.',
    category: 'aral',
    date: '3 days ago',
    isRead: true,
    actionUrl: '/aral'
  },
  {
    id: 'notif-4',
    title: 'Philippine Red Cross Blood Donation Drive',
    message: 'Volunteer phlebotomists and donor registrations requested at Mandaluyong National Headquarters.',
    category: 'bayanihan',
    date: '4 days ago',
    isRead: true,
    actionUrl: '/bayanihan'
  }
];

const DEFAULT_ACTIVITY_LOGS: ActivityLogItem[] = [
  {
    id: 'log-1',
    timestamp: 'Just now',
    user: 'System Initializer',
    action: 'Database initialized with verified public agency records and Citizen\'s Charter data',
    entityType: 'System',
    entityId: 'INIT-2026',
    status: 'info'
  },
  {
    id: 'log-2',
    timestamp: '1 hour ago',
    user: 'Admin Maria Santos',
    action: 'Verified PSA PhilSys online ePhilID download requirements and procedures',
    entityType: 'Service',
    entityId: 'srv-philsys',
    status: 'success'
  },
  {
    id: 'log-3',
    timestamp: '3 hours ago',
    user: 'Admin Maria Santos',
    action: 'Approved DTI Price Freeze public advisory announcement',
    entityType: 'Announcement',
    entityId: 'anc-dti-price-freeze',
    status: 'warning'
  }
];

function getStoredJson<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStoredJson<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving to localStorage ${key}:`, err);
  }
}

export const MockStorage = {
  // Services
  getServices: (): ServiceItem[] => getStoredJson(STORAGE_KEYS.SERVICES, INITIAL_SERVICES),
  saveServices: (items: ServiceItem[]) => setStoredJson(STORAGE_KEYS.SERVICES, items),

  // Jobs
  getJobs: (): JobItem[] => getStoredJson(STORAGE_KEYS.JOBS, INITIAL_JOBS),
  saveJobs: (items: JobItem[]) => setStoredJson(STORAGE_KEYS.JOBS, items),

  // Assistance
  getAssistance: (): FinancialAssistanceItem[] => getStoredJson(STORAGE_KEYS.ASSISTANCE, INITIAL_ASSISTANCE),
  saveAssistance: (items: FinancialAssistanceItem[]) => setStoredJson(STORAGE_KEYS.ASSISTANCE, items),

  // Bayanihan
  getBayanihan: (): BayanihanItem[] => getStoredJson(STORAGE_KEYS.BAYANIHAN, INITIAL_BAYANIHAN),
  saveBayanihan: (items: BayanihanItem[]) => setStoredJson(STORAGE_KEYS.BAYANIHAN, items),

  // Education
  getEducation: (): EducationItem[] => getStoredJson(STORAGE_KEYS.EDUCATION, INITIAL_EDUCATION),
  saveEducation: (items: EducationItem[]) => setStoredJson(STORAGE_KEYS.EDUCATION, items),

  // Safety
  getSafety: (): EmergencyResourceItem[] => getStoredJson(STORAGE_KEYS.SAFETY, INITIAL_SAFETY),
  saveSafety: (items: EmergencyResourceItem[]) => setStoredJson(STORAGE_KEYS.SAFETY, items),

  // Announcements
  getAnnouncements: (): AnnouncementItem[] => getStoredJson(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS),
  saveAnnouncements: (items: AnnouncementItem[]) => setStoredJson(STORAGE_KEYS.ANNOUNCEMENTS, items),

  // All Items consolidated for search
  getAllItems: (): BaseItem[] => {
    return [
      ...MockStorage.getServices(),
      ...MockStorage.getJobs(),
      ...MockStorage.getAssistance(),
      ...MockStorage.getBayanihan(),
      ...MockStorage.getEducation(),
      ...MockStorage.getSafety()
    ];
  },

  getItemById: (id: string): BaseItem | undefined => {
    const all = MockStorage.getAllItems();
    return all.find(item => item.id === id);
  },

  // Saved Items
  getSavedItemIds: (): string[] => getStoredJson(STORAGE_KEYS.SAVED_ITEMS, ['srv-philsys', 'job-admin-deped', 'ast-aics-dswd', 'edu-dost-sei']),
  toggleSavedItem: (id: string): boolean => {
    const saved = MockStorage.getSavedItemIds();
    const exists = saved.includes(id);
    let updated: string[];
    if (exists) {
      updated = saved.filter(itemId => itemId !== id);
    } else {
      updated = [...saved, id];
    }
    setStoredJson(STORAGE_KEYS.SAVED_ITEMS, updated);
    window.dispatchEvent(new Event('gabayph_saved_updated'));
    return !exists;
  },
  isItemSaved: (id: string): boolean => {
    const saved = MockStorage.getSavedItemIds();
    return saved.includes(id);
  },
  clearAllSavedItems: () => {
    setStoredJson(STORAGE_KEYS.SAVED_ITEMS, []);
    window.dispatchEvent(new Event('gabayph_saved_updated'));
  },

  // Notifications
  getNotifications: (): UserNotification[] => getStoredJson(STORAGE_KEYS.NOTIFICATIONS, DEFAULT_NOTIFICATIONS),
  saveNotifications: (notifs: UserNotification[]) => {
    setStoredJson(STORAGE_KEYS.NOTIFICATIONS, notifs);
    window.dispatchEvent(new Event('gabayph_notifications_updated'));
  },
  markNotificationAsRead: (id: string) => {
    const notifs = MockStorage.getNotifications().map(n => n.id === id ? { ...n, isRead: true } : n);
    MockStorage.saveNotifications(notifs);
  },
  markAllNotificationsAsRead: () => {
    const notifs = MockStorage.getNotifications().map(n => ({ ...n, isRead: true }));
    MockStorage.saveNotifications(notifs);
  },
  clearNotifications: () => {
    MockStorage.saveNotifications([]);
  },

  // User Profile and Auth
  getUserProfile: (): UserProfile => getStoredJson(STORAGE_KEYS.USER_PROFILE, DEFAULT_USER),
  saveUserProfile: (profile: UserProfile) => {
    setStoredJson(STORAGE_KEYS.USER_PROFILE, profile);
    window.dispatchEvent(new Event('gabayph_user_updated'));
  },
  isAuthenticated: (): boolean => getStoredJson(STORAGE_KEYS.AUTH_STATUS, true),
  setAuthenticated: (status: boolean) => {
    setStoredJson(STORAGE_KEYS.AUTH_STATUS, status);
    window.dispatchEvent(new Event('gabayph_auth_updated'));
  },

  // Form Submissions
  getReports: (): CitizenReport[] => getStoredJson(STORAGE_KEYS.REPORTS, [
    {
      id: 'rep-1',
      targetId: 'srv-dfa-passport',
      targetTitle: 'DFA e-Passport Application & Renewal',
      reportType: 'wrong_fee',
      details: 'Expedited processing fee was updated to ₱1,200 at Consular Offices.',
      reporterEmail: 'citizen.alex@example.com',
      submittedAt: 'Nov 8, 2026',
      status: 'resolved'
    },
    {
      id: 'rep-2',
      targetId: 'job-nurse-pgh',
      targetTitle: 'Staff Nurse II (UP-PGH)',
      reportType: 'outdated_link',
      details: 'Online portal link had a typo in the career submission page.',
      reporterEmail: 'nurse.maria@example.com',
      submittedAt: 'Nov 10, 2026',
      status: 'pending'
    }
  ]),
  submitReport: (report: Omit<CitizenReport, 'id' | 'submittedAt' | 'status'>) => {
    const list = MockStorage.getReports();
    const newReport: CitizenReport = {
      ...report,
      id: `rep-${Date.now()}`,
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'pending'
    };
    setStoredJson(STORAGE_KEYS.REPORTS, [newReport, ...list]);
    MockStorage.logActivity(`Submitted report on ${report.targetTitle}`, 'Report', newReport.id, 'warning');
    return newReport;
  },
  updateReportStatus: (id: string, status: CitizenReport['status']) => {
    const list = MockStorage.getReports().map(r => r.id === id ? { ...r, status } : r);
    setStoredJson(STORAGE_KEYS.REPORTS, list);
    MockStorage.logActivity(`Moderated report ${id} status to ${status}`, 'Report', id, 'info');
  },

  // Service Suggestions
  getSuggestions: (): ServiceSuggestion[] => getStoredJson(STORAGE_KEYS.SUGGESTIONS, [
    {
      id: 'sug-1',
      serviceName: 'Barangay Solo Parent ID Registration',
      agencyName: 'Local Social Welfare and Development Office (LSWDO)',
      description: 'Requesting inclusion of the Solo Parent ID application requirements and 10% discount privileges under RA 11861.',
      submittedBy: 'ParentAdvocate@example.com',
      submittedAt: 'Nov 7, 2026',
      status: 'pending'
    }
  ]),
  submitSuggestion: (sug: Omit<ServiceSuggestion, 'id' | 'submittedAt' | 'status'>) => {
    const list = MockStorage.getSuggestions();
    const newSug: ServiceSuggestion = {
      ...sug,
      id: `sug-${Date.now()}`,
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'pending'
    };
    setStoredJson(STORAGE_KEYS.SUGGESTIONS, [newSug, ...list]);
    MockStorage.logActivity(`Suggested new service: ${sug.serviceName}`, 'Suggestion', newSug.id, 'info');
    return newSug;
  },
  updateSuggestionStatus: (id: string, status: ServiceSuggestion['status']) => {
    const list = MockStorage.getSuggestions().map(s => s.id === id ? { ...s, status } : s);
    setStoredJson(STORAGE_KEYS.SUGGESTIONS, list);
  },

  // Volunteer Applications
  getVolunteerApps: (): VolunteerApplication[] => getStoredJson(STORAGE_KEYS.VOLUNTEER_APPS, []),
  submitVolunteerApp: (app: Omit<VolunteerApplication, 'id' | 'submittedAt' | 'status'>) => {
    const list = MockStorage.getVolunteerApps();
    const newApp: VolunteerApplication = {
      ...app,
      id: `vol-${Date.now()}`,
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'submitted'
    };
    setStoredJson(STORAGE_KEYS.VOLUNTEER_APPS, [newApp, ...list]);
    MockStorage.logActivity(`New volunteer registered for ${app.programTitle}`, 'Volunteer', newApp.id, 'success');
    return newApp;
  },

  // Contact Inquiries
  getContactSubmissions: (): ContactSubmission[] => getStoredJson(STORAGE_KEYS.CONTACT_SUBMISSIONS, []),
  submitContact: (contact: Omit<ContactSubmission, 'id' | 'submittedAt'>) => {
    const list = MockStorage.getContactSubmissions();
    const newContact: ContactSubmission = {
      ...contact,
      id: `contact-${Date.now()}`,
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setStoredJson(STORAGE_KEYS.CONTACT_SUBMISSIONS, [newContact, ...list]);
    MockStorage.logActivity(`Received contact inquiry: ${contact.subject}`, 'Contact', newContact.id, 'info');
    return newContact;
  },

  // Activity Logs
  getActivityLogs: (): ActivityLogItem[] => getStoredJson(STORAGE_KEYS.ACTIVITY_LOGS, DEFAULT_ACTIVITY_LOGS),
  logActivity: (action: string, entityType: string, entityId: string, status: 'success' | 'warning' | 'info' = 'info') => {
    const list = MockStorage.getActivityLogs();
    const user = MockStorage.getUserProfile().name;
    const newLog: ActivityLogItem = {
      id: `log-${Date.now()}`,
      timestamp: 'Just now',
      user,
      action,
      entityType,
      entityId,
      status
    };
    setStoredJson(STORAGE_KEYS.ACTIVITY_LOGS, [newLog, ...list.slice(0, 49)]);
  },

  // Delete Record by category & ID (Admin)
  deleteItem: (category: CategoryType, id: string) => {
    switch (category) {
      case 'serbisyo':
        MockStorage.saveServices(MockStorage.getServices().filter(s => s.id !== id));
        break;
      case 'trabaho':
        MockStorage.saveJobs(MockStorage.getJobs().filter(j => j.id !== id));
        break;
      case 'pera':
        MockStorage.saveAssistance(MockStorage.getAssistance().filter(a => a.id !== id));
        break;
      case 'bayanihan':
        MockStorage.saveBayanihan(MockStorage.getBayanihan().filter(b => b.id !== id));
        break;
      case 'aral':
        MockStorage.saveEducation(MockStorage.getEducation().filter(e => e.id !== id));
        break;
      case 'kaligtasan':
        MockStorage.saveSafety(MockStorage.getSafety().filter(s => s.id !== id));
        break;
    }
    MockStorage.logActivity(`Deleted item ${id} from ${category}`, category, id, 'warning');
    window.dispatchEvent(new Event('gabayph_data_updated'));
  },

  // Add Item (Admin)
  addItem: (item: BaseItem) => {
    switch (item.category) {
      case 'serbisyo':
        MockStorage.saveServices([item as ServiceItem, ...MockStorage.getServices()]);
        break;
      case 'trabaho':
        MockStorage.saveJobs([item as JobItem, ...MockStorage.getJobs()]);
        break;
      case 'pera':
        MockStorage.saveAssistance([item as FinancialAssistanceItem, ...MockStorage.getAssistance()]);
        break;
      case 'bayanihan':
        MockStorage.saveBayanihan([item as BayanihanItem, ...MockStorage.getBayanihan()]);
        break;
      case 'aral':
        MockStorage.saveEducation([item as EducationItem, ...MockStorage.getEducation()]);
        break;
      case 'kaligtasan':
        MockStorage.saveSafety([item as EmergencyResourceItem, ...MockStorage.getSafety()]);
        break;
    }
    MockStorage.logActivity(`Created new ${item.category} record: ${item.title}`, item.category, item.id, 'success');
    window.dispatchEvent(new Event('gabayph_data_updated'));
  },

  // Edit Item (Admin)
  updateItem: (item: BaseItem) => {
    switch (item.category) {
      case 'serbisyo':
        MockStorage.saveServices(MockStorage.getServices().map(s => s.id === item.id ? (item as ServiceItem) : s));
        break;
      case 'trabaho':
        MockStorage.saveJobs(MockStorage.getJobs().map(j => j.id === item.id ? (item as JobItem) : j));
        break;
      case 'pera':
        MockStorage.saveAssistance(MockStorage.getAssistance().map(a => a.id === item.id ? (item as FinancialAssistanceItem) : a));
        break;
      case 'bayanihan':
        MockStorage.saveBayanihan(MockStorage.getBayanihan().map(b => b.id === item.id ? (item as BayanihanItem) : b));
        break;
      case 'aral':
        MockStorage.saveEducation(MockStorage.getEducation().map(e => e.id === item.id ? (item as EducationItem) : e));
        break;
      case 'kaligtasan':
        MockStorage.saveSafety(MockStorage.getSafety().map(s => s.id === item.id ? (item as EmergencyResourceItem) : s));
        break;
    }
    MockStorage.logActivity(`Updated ${item.category} record: ${item.title}`, item.category, item.id, 'info');
    window.dispatchEvent(new Event('gabayph_data_updated'));
  },

  // Reset to initial mock fixtures
  resetAllToDefaults: () => {
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.JOBS);
    localStorage.removeItem(STORAGE_KEYS.ASSISTANCE);
    localStorage.removeItem(STORAGE_KEYS.BAYANIHAN);
    localStorage.removeItem(STORAGE_KEYS.EDUCATION);
    localStorage.removeItem(STORAGE_KEYS.SAFETY);
    localStorage.removeItem(STORAGE_KEYS.ANNOUNCEMENTS);
    localStorage.removeItem(STORAGE_KEYS.SAVED_ITEMS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.REPORTS);
    localStorage.removeItem(STORAGE_KEYS.SUGGESTIONS);
    localStorage.removeItem(STORAGE_KEYS.VOLUNTEER_APPS);
    localStorage.removeItem(STORAGE_KEYS.CONTACT_SUBMISSIONS);
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    localStorage.removeItem(STORAGE_KEYS.AUTH_STATUS);
    localStorage.removeItem(STORAGE_KEYS.ACTIVITY_LOGS);
    window.location.reload();
  }
};
