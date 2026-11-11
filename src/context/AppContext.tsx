import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MockStorage } from '../data/mockStorage';
import { UserProfile, CategoryType } from '../types';

interface AppContextType {
  // Navigation & Routing
  currentPath: string;
  navigate: (path: string, options?: { replace?: boolean }) => void;
  selectedItemId: string | null;
  selectedCategory: CategoryType | null;

  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Role
  role: 'citizen' | 'admin';
  setRole: (role: 'citizen' | 'admin') => void;

  // Auth State
  user: UserProfile;
  isAuthenticated: boolean;
  login: (email?: string, name?: string) => void;
  logout: () => void;
  updateUser: (profile: Partial<UserProfile>) => void;

  // Saved items
  savedIds: string[];
  toggleSave: (id: string) => boolean;
  isSaved: (id: string) => boolean;

  // Notifications
  unreadNotifsCount: number;
  refreshNotifications: () => void;

  // Global Modals
  isAuthModalOpen: boolean;
  openAuthModal: (initialTab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  authModalTab: 'login' | 'register';

  isSearchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;

  // Action Modals
  reportModalItem: { id: string; title: string } | null;
  openReportModal: (item: { id: string; title: string }) => void;
  closeReportModal: () => void;

  isSuggestModalOpen: boolean;
  openSuggestModal: () => void;
  closeSuggestModal: () => void;

  volunteerProgramModal: { id: string; title: string } | null;
  openVolunteerModal: (program: { id: string; title: string }) => void;
  closeVolunteerModal: () => void;

  isContactModalOpen: boolean;
  openContactModal: () => void;
  closeContactModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Path state initialized from browser location
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('gabayph_theme_v1');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Apply theme class to HTML
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('gabayph_theme_v1', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // User & Auth State
  const [user, setUser] = useState<UserProfile>(() => MockStorage.getUserProfile());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => MockStorage.isAuthenticated());
  const [role, setRoleState] = useState<'citizen' | 'admin'>(() => user.role || 'citizen');

  const setRole = (newRole: 'citizen' | 'admin') => {
    setRoleState(newRole);
    const updated = { ...user, role: newRole };
    setUser(updated);
    MockStorage.saveUserProfile(updated);
  };

  const login = (email = 'juan.delacruz@citizen.gov.ph', name = 'Juan Dela Cruz') => {
    const updatedUser = { ...user, email, name };
    setUser(updatedUser);
    setIsAuthenticated(true);
    MockStorage.saveUserProfile(updatedUser);
    MockStorage.setAuthenticated(true);
    MockStorage.logActivity(`User ${name} logged in`, 'User', updatedUser.id, 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    MockStorage.setAuthenticated(false);
    MockStorage.logActivity(`User ${user.name} signed out`, 'User', user.id, 'info');
  };

  const updateUser = (patch: Partial<UserProfile>) => {
    const updated = { ...user, ...patch };
    setUser(updated);
    MockStorage.saveUserProfile(updated);
  };

  // Saved Items
  const [savedIds, setSavedIds] = useState<string[]>(() => MockStorage.getSavedItemIds());

  const toggleSave = useCallback((id: string) => {
    const isNowSaved = MockStorage.toggleSavedItem(id);
    setSavedIds(MockStorage.getSavedItemIds());
    return isNowSaved;
  }, []);

  const isSaved = useCallback((id: string) => {
    return savedIds.includes(id);
  }, [savedIds]);

  // Notifications
  const [unreadNotifsCount, setUnreadNotifsCount] = useState<number>(() => {
    return MockStorage.getNotifications().filter(n => !n.isRead).length;
  });

  const refreshNotifications = useCallback(() => {
    const count = MockStorage.getNotifications().filter(n => !n.isRead).length;
    setUnreadNotifsCount(count);
  }, []);

  // Listeners for storage updates across tabs or components
  useEffect(() => {
    const handleSavedUpdate = () => setSavedIds(MockStorage.getSavedItemIds());
    const handleNotifUpdate = () => refreshNotifications();
    const handleUserUpdate = () => {
      const u = MockStorage.getUserProfile();
      setUser(u);
      setRoleState(u.role);
    };

    window.addEventListener('gabayph_saved_updated', handleSavedUpdate);
    window.addEventListener('gabayph_notifications_updated', handleNotifUpdate);
    window.addEventListener('gabayph_user_updated', handleUserUpdate);

    return () => {
      window.removeEventListener('gabayph_saved_updated', handleSavedUpdate);
      window.removeEventListener('gabayph_notifications_updated', handleNotifUpdate);
      window.removeEventListener('gabayph_user_updated', handleUserUpdate);
    };
  }, [refreshNotifications]);

  // Browser History & Navigation
  const navigate = useCallback((path: string, options?: { replace?: boolean }) => {
    if (options?.replace) {
      window.history.replaceState({}, '', path);
    } else {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Extract selected item or category from path if applicable
  const selectedItemId = currentPath.startsWith('/item/') ? currentPath.replace('/item/', '') : null;
  const selectedCategory: CategoryType | null = (['trabaho', 'serbisyo', 'pera', 'bayanihan', 'aral', 'kaligtasan'].includes(currentPath.replace('/', ''))
    ? currentPath.replace('/', '') as CategoryType
    : null);

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const openAuthModal = (initialTab: 'login' | 'register' = 'login') => {
    setAuthModalTab(initialTab);
    setIsAuthModalOpen(true);
  };
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  const [reportModalItem, setReportModalItem] = useState<{ id: string; title: string } | null>(null);
  const openReportModal = (item: { id: string; title: string }) => setReportModalItem(item);
  const closeReportModal = () => setReportModalItem(null);

  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false);
  const openSuggestModal = () => setIsSuggestModalOpen(true);
  const closeSuggestModal = () => setIsSuggestModalOpen(false);

  const [volunteerProgramModal, setVolunteerProgramModal] = useState<{ id: string; title: string } | null>(null);
  const openVolunteerModal = (prog: { id: string; title: string }) => setVolunteerProgramModal(prog);
  const closeVolunteerModal = () => setVolunteerProgramModal(null);

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigate,
        selectedItemId,
        selectedCategory,
        theme,
        toggleTheme,
        role,
        setRole,
        user,
        isAuthenticated,
        login,
        logout,
        updateUser,
        savedIds,
        toggleSave,
        isSaved,
        unreadNotifsCount,
        refreshNotifications,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalTab,
        isSearchModalOpen,
        openSearchModal,
        closeSearchModal,
        reportModalItem,
        openReportModal,
        closeReportModal,
        isSuggestModalOpen,
        openSuggestModal,
        closeSuggestModal,
        volunteerProgramModal,
        openVolunteerModal,
        closeVolunteerModal,
        isContactModalOpen,
        openContactModal,
        closeContactModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
