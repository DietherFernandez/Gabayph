import React, { useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/navigation/Navbar';
import { BottomTabBar } from './components/navigation/BottomTabBar';
import { Footer } from './components/navigation/Footer';

// Pages
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
import { AdminDashboardPage } from './pages/AdminDashboardPage';
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
    } else if (currentPath.startsWith('/admin')) {
      title = 'Admin Operations Dashboard — GabayPH';
    }
    document.title = title;
  }, [currentPath]);

  // Route Resolver
  const renderCurrentPage = () => {
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
    if (currentPath === '/admin') return <AdminDashboardPage />;

    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-ios-lightBg dark:bg-ios-darkBg text-ios-lightText dark:text-ios-darkText transition-colors selection:bg-ios-navy selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-24 lg:pb-12">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile iOS Bottom Tab Bar */}
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
