import React, { useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/navigation/Navbar';
import { BottomTabBar } from './components/navigation/BottomTabBar';
import { Footer } from './components/navigation/Footer';

// Admin Dedicated Workspace Layout
import { AdminLayout } from './components/admin/AdminLayout';

// Citizen Pages
import { HomePage } from './pages/HomePage';
import { SerbisyoPage } from './pages/SerbisyoPage';
import { TrabahoPage } from './pages/TrabahoPage';
import { PeraPage } from './pages/PeraPage';
import { BayanihanPage } from './pages/BayanihanPage';
import { AralPage } from './pages/AralPage';
import { KaligtasanPage } from './pages/KaligtasanPage';
import { DetailPage } from './pages/DetailPage';
import { UniversalSearchPage } from './pages/UniversalSearchPage';
import { SavedItemsPage } from './pages/SavedItemsPage';
import { NotificationCenterPage } from './pages/NotificationCenterPage';
import { ProfilePage } from './pages/ProfilePage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Modals
import { UniversalSearchModal } from './components/modals/UniversalSearchModal';
import { AuthModal } from './components/modals/AuthModal';
import {
  ReportModal,
  SuggestServiceModal,
  VolunteerModal,
  ContactModal
} from './components/modals/ActionModals';

const AppContent: React.FC = () => {
  const { currentPath } = useApp();
  const isAdminRoute = currentPath.startsWith('/admin');

  // Dynamic Document Title based on current route
  useEffect(() => {
    let title = 'GabayPH — Philippine Public Services & Information Directory';
    if (currentPath === '/') {
      title = 'GabayPH — Philippine Public Services & Information Directory';
    } else if (currentPath.startsWith('/trabaho')) {
      title = 'Trabaho (Employment & Careers) — GabayPH';
    } else if (currentPath.startsWith('/serbisyo')) {
      title = 'Serbisyo (Government Services & IDs) — GabayPH';
    } else if (currentPath.startsWith('/pera')) {
      title = 'Pera (Financial Assistance & Subsidies) — GabayPH';
    } else if (currentPath.startsWith('/bayanihan')) {
      title = 'Bayanihan (Community & Volunteer Drives) — GabayPH';
    } else if (currentPath.startsWith('/aral')) {
      title = 'Aral (Scholarships & Education) — GabayPH';
    } else if (currentPath.startsWith('/kaligtasan')) {
      title = 'Kaligtasan (Emergency Hotlines & Safety) — GabayPH';
    } else if (currentPath.startsWith('/item/')) {
      title = 'Service Details — GabayPH';
    } else if (currentPath.startsWith('/search')) {
      title = 'Universal Directory Search — GabayPH';
    } else if (currentPath.startsWith('/saved')) {
      title = 'Saved Bookmarks — GabayPH';
    } else if (currentPath.startsWith('/notifications')) {
      title = 'Notification Center — GabayPH';
    } else if (currentPath.startsWith('/profile')) {
      title = 'Citizen Profile & Settings — GabayPH';
    } else if (currentPath.startsWith('/announcements')) {
      title = 'Official Public Advisories — GabayPH';
    } else if (currentPath === '/admin' || currentPath === '/admin/overview') {
      title = 'Overview — GabayPH Admin Operations';
    } else if (currentPath === '/admin/services') {
      title = 'Public Services Management — GabayPH Admin';
    } else if (currentPath === '/admin/jobs') {
      title = 'Careers & Jobs Management — GabayPH Admin';
    } else if (currentPath === '/admin/assistance') {
      title = 'Financial Assistance Management — GabayPH Admin';
    } else if (currentPath === '/admin/education') {
      title = 'Education & TVET Management — GabayPH Admin';
    } else if (currentPath === '/admin/bayanihan') {
      title = 'Community Programs Management — GabayPH Admin';
    } else if (currentPath === '/admin/safety') {
      title = 'Safety & Hotlines Management — GabayPH Admin';
    } else if (currentPath === '/admin/bulletins') {
      title = 'Public Bulletins Management — GabayPH Admin';
    } else if (currentPath === '/admin/reports') {
      title = 'Citizen Moderation Reports — GabayPH Admin';
    } else if (currentPath === '/admin/suggestions') {
      title = 'Service Suggestions Queue — GabayPH Admin';
    } else if (currentPath === '/admin/logs') {
      title = 'Audit Trail & Activity Logs — GabayPH Admin';
    } else if (currentPath === '/admin/settings') {
      title = 'Admin Settings & Preferences — GabayPH Admin';
    }
    document.title = title;
  }, [currentPath]);

  // If in administrative route, render dedicated Admin workspace shell
  if (isAdminRoute) {
    return <AdminLayout />;
  }

  // Citizen Route Resolver
  const renderCitizenPage = () => {
    if (currentPath === '/') return <HomePage />;
    if (currentPath === '/serbisyo') return <SerbisyoPage />;
    if (currentPath === '/trabaho') return <TrabahoPage />;
    if (currentPath === '/pera') return <PeraPage />;
    if (currentPath === '/bayanihan') return <BayanihanPage />;
    if (currentPath === '/aral') return <AralPage />;
    if (currentPath === '/kaligtasan') return <KaligtasanPage />;
    if (currentPath.startsWith('/item/')) return <DetailPage />;
    if (currentPath.startsWith('/search')) return <UniversalSearchPage />;
    if (currentPath === '/saved') return <SavedItemsPage />;
    if (currentPath === '/notifications') return <NotificationCenterPage />;
    if (currentPath === '/profile') return <ProfilePage />;
    if (currentPath === '/announcements') return <AnnouncementsPage />;

    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-ios-lightBg dark:bg-ios-darkBg text-ios-lightText dark:text-ios-darkText transition-colors selection:bg-ios-navy selection:text-white">
      {/* Top Citizen Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-24 lg:pb-12">
        {renderCitizenPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile iOS Bottom Tab Bar (Citizen Only) */}
      <BottomTabBar />

      {/* Global Interactive Modals */}
      <UniversalSearchModal />
      <AuthModal />
      <ReportModal />
      <SuggestServiceModal />
      <VolunteerModal />
      <ContactModal />
    </div>
  );
};

export function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ToastProvider>
  );
}

export default App;
