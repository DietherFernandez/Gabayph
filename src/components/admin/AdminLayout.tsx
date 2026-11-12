import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { MockStorage } from '../../data/mockStorage';
import { BaseItem, AnnouncementItem } from '../../types';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar, AdminNavCounts } from './AdminSidebar';
import { AdminMobileDrawer } from './AdminMobileDrawer';
import { AdminRecordModal, AdminRecordCategory } from './AdminRecordModal';

// Admin Views
import { AdminOverviewView } from '../../pages/admin/AdminOverviewView';
import { AdminServicesView } from '../../pages/admin/AdminServicesView';
import { AdminJobsView } from '../../pages/admin/AdminJobsView';
import { AdminAssistanceView } from '../../pages/admin/AdminAssistanceView';
import { AdminEducationView } from '../../pages/admin/AdminEducationView';
import { AdminBayanihanView } from '../../pages/admin/AdminBayanihanView';
import { AdminSafetyView } from '../../pages/admin/AdminSafetyView';
import { AdminBulletinsView } from '../../pages/admin/AdminBulletinsView';
import { AdminReportsView } from '../../pages/admin/AdminReportsView';
import { AdminSuggestionsView } from '../../pages/admin/AdminSuggestionsView';
import { AdminLogsView } from '../../pages/admin/AdminLogsView';
import { AdminSettingsView } from '../../pages/admin/AdminSettingsView';

export const AdminLayout: React.FC = () => {
  const { currentPath, navigate } = useApp();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Universal CRUD Modal State
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<AdminRecordCategory>('serbisyo');
  const [modalEditingItem, setModalEditingItem] = useState<BaseItem | AnnouncementItem | null>(null);

  // Navigation Badge Counts
  const [counts, setCounts] = useState<AdminNavCounts>(() => ({
    services: MockStorage.getServices().length,
    jobs: MockStorage.getJobs().length,
    assistance: MockStorage.getAssistance().length,
    education: MockStorage.getEducation().length,
    bayanihan: MockStorage.getBayanihan().length,
    safety: MockStorage.getSafety().length,
    bulletins: MockStorage.getAnnouncements().length,
    pendingReports: MockStorage.getReports().filter(r => r.status === 'pending').length,
    suggestions: MockStorage.getSuggestions().length,
    logs: MockStorage.getActivityLogs().length
  }));

  const refreshCounts = useCallback(() => {
    setCounts({
      services: MockStorage.getServices().length,
      jobs: MockStorage.getJobs().length,
      assistance: MockStorage.getAssistance().length,
      education: MockStorage.getEducation().length,
      bayanihan: MockStorage.getBayanihan().length,
      safety: MockStorage.getSafety().length,
      bulletins: MockStorage.getAnnouncements().length,
      pendingReports: MockStorage.getReports().filter(r => r.status === 'pending').length,
      suggestions: MockStorage.getSuggestions().length,
      logs: MockStorage.getActivityLogs().length
    });
  }, []);

  useEffect(() => {
    const handleDataUpdate = () => refreshCounts();
    window.addEventListener('gabayph_data_updated', handleDataUpdate);
    return () => window.removeEventListener('gabayph_data_updated', handleDataUpdate);
  }, [refreshCounts]);

  // Modal Triggers
  const handleOpenCreate = (cat: AdminRecordCategory = 'serbisyo') => {
    setModalCategory(cat);
    setModalEditingItem(null);
    setIsRecordModalOpen(true);
  };

  const handleOpenEdit = (item: BaseItem | AnnouncementItem) => {
    setModalEditingItem(item);
    if ('sourceAgency' in item) {
      setModalCategory('announcements');
    } else {
      setModalCategory(item.category);
    }
    setIsRecordModalOpen(true);
  };

  // Resolve current administrative view based on route path
  const renderAdminView = () => {
    if (currentPath === '/admin' || currentPath === '/admin/overview') {
      return (
        <AdminOverviewView
          counts={counts}
          onOpenCreate={handleOpenCreate}
          onOpenEdit={handleOpenEdit}
        />
      );
    }
    if (currentPath === '/admin/services') {
      return (
        <AdminServicesView
          onOpenCreate={() => handleOpenCreate('serbisyo')}
          onOpenEdit={handleOpenEdit}
          onDataChanged={refreshCounts}
        />
      );
    }
    if (currentPath === '/admin/jobs') {
      return (
        <AdminJobsView
          onOpenCreate={() => handleOpenCreate('trabaho')}
          onOpenEdit={handleOpenEdit}
          onDataChanged={refreshCounts}
        />
      );
    }
    if (currentPath === '/admin/assistance') {
      return (
        <AdminAssistanceView
          onOpenCreate={() => handleOpenCreate('pera')}
          onOpenEdit={handleOpenEdit}
          onDataChanged={refreshCounts}
        />
      );
    }
    if (currentPath === '/admin/education') {
      return (
        <AdminEducationView
          onOpenCreate={() => handleOpenCreate('aral')}
          onOpenEdit={handleOpenEdit}
          onDataChanged={refreshCounts}
        />
      );
    }
    if (currentPath === '/admin/bayanihan') {
      return (
        <AdminBayanihanView
          onOpenCreate={() => handleOpenCreate('bayanihan')}
          onOpenEdit={handleOpenEdit}
          onDataChanged={refreshCounts}
        />
      );
    }
    if (currentPath === '/admin/safety') {
      return (
        <AdminSafetyView
          onOpenCreate={() => handleOpenCreate('kaligtasan')}
          onOpenEdit={handleOpenEdit}
          onDataChanged={refreshCounts}
        />
      );
    }
    if (currentPath === '/admin/bulletins') {
      return (
        <AdminBulletinsView
          onOpenCreate={() => handleOpenCreate('announcements')}
          onOpenEdit={handleOpenEdit}
          onDataChanged={refreshCounts}
        />
      );
    }
    if (currentPath === '/admin/reports') {
      return <AdminReportsView onDataChanged={refreshCounts} />;
    }
    if (currentPath === '/admin/suggestions') {
      return <AdminSuggestionsView onDataChanged={refreshCounts} />;
    }
    if (currentPath === '/admin/logs') {
      return <AdminLogsView onDataChanged={refreshCounts} />;
    }
    if (currentPath === '/admin/settings') {
      return <AdminSettingsView />;
    }

    // Default fallback to Overview
    return (
      <AdminOverviewView
        counts={counts}
        onOpenCreate={handleOpenCreate}
        onOpenEdit={handleOpenEdit}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F2F2F7] dark:bg-[#000000] text-black dark:text-white antialiased selection:bg-[#007AFF] selection:text-white">
      {/* 1. Dedicated Admin Top Header */}
      <AdminHeader
        onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
        onSearchClick={() => navigate('/admin/services')}
      />

      {/* 2. Admin Workspace Shell (Desktop Sidebar + Main Content) */}
      <div className="flex-1 flex w-full max-w-[1600px] mx-auto">
        {/* Persistent Desktop Sidebar (Hidden on Mobile) */}
        <AdminSidebar
          counts={counts}
          onOpenCreateRecord={() => handleOpenCreate('serbisyo')}
          onResetData={() => navigate('/admin/settings')}
        />

        {/* Dedicated Main Admin Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl">
          {renderAdminView()}
        </main>
      </div>

      {/* 3. Responsive Off-Canvas Mobile Drawer (Only on < lg screens) */}
      <AdminMobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        counts={counts}
        onOpenCreateRecord={() => handleOpenCreate('serbisyo')}
      />

      {/* 4. Universal Administrative Record CRUD Modal */}
      <AdminRecordModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
        onSaved={refreshCounts}
        initialCategory={modalCategory}
        initialItem={modalEditingItem}
      />
    </div>
  );
};
