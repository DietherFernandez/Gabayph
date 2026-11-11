import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bookmark,
  Bell,
  Sun,
  Moon,
  PhoneCall,
  ShieldCheck,
  User,
  Shield,
  Menu,
  X
} from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const {
    currentPath,
    navigate,
    theme,
    toggleTheme,
    role,
    setRole,
    savedIds,
    unreadNotifsCount,
    openAuthModal,
    openSearchModal,
    isAuthenticated,
    user
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Trabaho', sublabel: 'Employment', path: '/trabaho' },
    { label: 'Serbisyo', sublabel: 'Services', path: '/serbisyo' },
    { label: 'Pera', sublabel: 'Financial Aid', path: '/pera' },
    { label: 'Bayanihan', sublabel: 'Community', path: '/bayanihan' },
    { label: 'Aral', sublabel: 'Education', path: '/aral' },
    { label: 'Kaligtasan', sublabel: 'Safety', path: '/kaligtasan' },
    { label: 'Advisories', path: '/announcements' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-ios-darkSurface/95 backdrop-blur-md border-b border-ios-lightBorder dark:border-ios-darkBorder transition-colors">
      {/* Top Emergency Hotline Ribbon */}
      <div className="bg-ios-navy text-white text-[11px] py-1 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="font-semibold tracking-wide shrink-0">
              <span className="hidden sm:inline">National Emergency </span>Hotlines:
            </span>
            <a
              href="tel:911"
              className="inline-flex items-center gap-1 font-bold text-yellow-300 hover:underline shrink-0"
              title="Call National Emergency 911"
            >
              <PhoneCall className="w-3 h-3" />
              <span>911</span>
              <span className="hidden xs:inline">(Emergency)</span>
            </a>
            <span className="hidden sm:inline text-white/50">|</span>
            <a
              href="tel:8888"
              className="hidden sm:inline-flex items-center gap-1 text-white/90 hover:underline shrink-0"
              title="Call 8888 Citizens' Complaint Center"
            >
              8888 (Citizens' Complaint)
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 text-white/80 text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">Official Philippine Public Information Directory</span>
              <span className="md:hidden">GabayPH Portal</span>
            </div>

            {/* Prototype Role Switcher */}
            <div className="flex items-center bg-white/10 rounded-full p-0.5 border border-white/20">
              <button
                type="button"
                onClick={() => setRole('citizen')}
                className={`px-2 py-0.5 text-[10px] rounded-full font-medium transition-all ${
                  role === 'citizen'
                    ? 'bg-white text-ios-navy font-bold shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Citizen
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole('admin');
                  navigate('/admin');
                }}
                className={`px-2 py-0.5 text-[10px] rounded-full font-medium transition-all ${
                  role === 'admin'
                    ? 'bg-amber-400 text-slate-900 font-bold shadow-sm'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
        {/* Brand & Emblem */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
            aria-label="GabayPH Home"
          >
            <div className="w-8 h-8 rounded-ios-lg bg-ios-navy flex items-center justify-center text-white shadow-ios-sm group-hover:scale-105 transition-transform">
              <span className="font-bold text-sm tracking-tighter text-yellow-400">G</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-ios-navy dark:text-blue-400 tracking-tight leading-none">
                  GabayPH
                </span>
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.2 rounded bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightMuted dark:text-ios-darkMuted border border-ios-lightBorder dark:border-ios-darkBorder">
                  Public Directory
                </span>
              </div>
              <p className="text-[10px] text-ios-lightMuted dark:text-ios-darkMuted leading-none mt-0.5 hidden sm:block">
                Republic of the Philippines Public Services
              </p>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
          {navLinks.map(link => {
            const isActive = currentPath === link.path || (link.path !== '/' && currentPath.startsWith(link.path));
            return (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-ios-lg transition-colors flex items-center gap-1 ${
                  isActive
                    ? 'bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-navy dark:text-blue-400 font-semibold'
                    : 'text-ios-lightMuted dark:text-ios-darkMuted hover:text-ios-lightText dark:hover:text-ios-darkText hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                {link.sublabel && (
                  <span className="text-[10px] opacity-70 font-normal hidden xl:inline">
                    ({link.sublabel})
                  </span>
                )}
              </button>
            );
          })}
          {role === 'admin' && (
            <button
              onClick={() => navigate('/admin')}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-ios-lg transition-colors flex items-center gap-1 ${
                currentPath === '/admin'
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                  : 'text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30'
              }`}
            >
              <Shield className="w-3.5 h-3.5" /> Admin Portal
            </button>
          )}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Universal Search trigger button */}
          <button
            onClick={openSearchModal}
            className="flex items-center gap-2 bg-ios-lightSecondary dark:bg-ios-darkSecondary hover:bg-slate-200 dark:hover:bg-slate-700/60 text-ios-lightMuted dark:text-ios-darkMuted px-2.5 sm:px-3 py-1.5 rounded-ios-lg text-xs border border-ios-lightBorder/80 dark:border-ios-darkBorder/80 transition-colors"
            title="Search GabayPH (Press / to search)"
            aria-label="Open universal search directory"
          >
            <Search className="w-3.5 h-3.5 text-ios-lightMuted dark:text-ios-darkMuted" />
            <span className="hidden sm:inline">Search directory...</span>
            <kbd className="hidden md:inline text-[10px] bg-white dark:bg-slate-800 px-1.5 py-0.2 rounded border border-ios-lightBorder dark:border-ios-darkBorder font-mono">
              /
            </kbd>
          </button>

          {/* Saved Items */}
          <button
            onClick={() => navigate('/saved')}
            className="relative p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-ios-lg text-ios-lightMuted hover:text-ios-lightText dark:text-ios-darkMuted dark:hover:text-ios-darkText hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label={`Saved items (${savedIds.length})`}
            title="Saved Items"
          >
            <Bookmark className="w-4 h-4" />
            {savedIds.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-ios-navy dark:bg-blue-500 text-white text-[9px] font-bold flex items-center justify-center">
                {savedIds.length}
              </span>
            )}
          </button>

          {/* Notifications */}
          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-ios-lg text-ios-lightMuted hover:text-ios-lightText dark:text-ios-darkMuted dark:hover:text-ios-darkText hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label={`Notifications (${unreadNotifsCount} unread)`}
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-ios-darkSurface" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-ios-lg text-ios-lightMuted hover:text-ios-lightText dark:text-ios-darkMuted dark:hover:text-ios-darkText hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-yellow-400" />}
          </button>

          {/* User Account Button */}
          {isAuthenticated ? (
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              title="Citizen Profile & Settings"
            >
              <div className="w-6 h-6 rounded-full bg-ios-navy text-white text-xs font-semibold flex items-center justify-center overflow-hidden">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
              <span className="text-xs font-medium hidden md:inline text-ios-lightText dark:text-ios-darkText truncate max-w-[90px]">
                {user.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <Button
              size="sm"
              variant="primary"
              onClick={() => openAuthModal('login')}
              className="text-xs px-2.5 py-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign In</span>
            </Button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-ios-lg text-ios-lightMuted hover:text-ios-lightText dark:text-ios-darkMuted dark:hover:text-ios-darkText"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-ios-lightBorder dark:border-ios-darkBorder bg-ios-lightSurface dark:bg-ios-darkSurface px-4 py-3 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 text-left rounded-ios-lg text-xs font-medium transition-colors ${
                  currentPath === link.path
                    ? 'bg-ios-navy text-white font-semibold'
                    : 'bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightText dark:text-ios-darkText'
                }`}
              >
                <span>{link.label}</span>
                {link.sublabel && (
                  <span className="block text-[10px] opacity-70">
                    {link.sublabel}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-ios-lightBorder dark:border-ios-darkBorder flex items-center justify-between">
            <span className="text-xs text-ios-lightMuted dark:text-ios-darkMuted font-medium">
              Demo Role:
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setRole('citizen');
                  setMobileMenuOpen(false);
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                  role === 'citizen' ? 'bg-ios-navy text-white' : 'bg-slate-200 dark:bg-slate-800'
                }`}
              >
                Citizen
              </button>
              <button
                onClick={() => {
                  setRole('admin');
                  navigate('/admin');
                  setMobileMenuOpen(false);
                }}
                className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                  role === 'admin' ? 'bg-amber-500 text-black font-semibold' : 'bg-slate-200 dark:bg-slate-800'
                }`}
              >
                Admin Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
