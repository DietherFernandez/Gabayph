import React, { useState, useRef, useEffect } from 'react';
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
  X,
  HelpCircle,
  MessageSquare
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
    user,
    openSuggestModal,
    openContactModal
  } = useApp();

  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDesktopMenuOpen(false);
      }
    };
    if (desktopMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [desktopMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-ios-darkSurface/95 backdrop-blur-md border-b border-ios-lightBorder dark:border-ios-darkBorder transition-colors">
      {/* Top Emergency Hotline Ribbon (Smooth Marquee Ticker) */}
      <div className="bg-ios-navy text-white text-[11px] py-1 px-3 sm:px-6 overflow-hidden select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Static Pinned 911 Indicator */}
          <div className="flex items-center gap-1.5 shrink-0 z-10 bg-ios-navy pr-2">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <a
              href="tel:911"
              className="inline-flex items-center gap-1 font-bold text-yellow-300 hover:underline"
              title="Call National Emergency 911"
            >
              <PhoneCall className="w-3 h-3" />
              <span>911</span>
              <span className="px-1 py-0.2 rounded bg-red-600 text-white text-[9px] font-bold">TOLL-FREE</span>
            </a>
            <span className="text-white/40">|</span>
          </div>

          {/* Marquee Ticker Track */}
          <div className="overflow-hidden whitespace-nowrap flex-1 min-w-0">
            <div className="animate-marquee inline-flex items-center gap-6 text-[11px] font-medium text-white/90">
              {/* Loop Chunk 1 */}
              <span className="inline-flex items-center gap-4">
                <span>🚨 <strong>National Emergency:</strong> <a href="tel:911" className="text-yellow-300 font-bold hover:underline">911</a></span>
                <span className="text-white/30">•</span>
                <span>⚖️ <strong>Citizens' Complaint Center:</strong> <a href="tel:8888" className="text-white font-bold hover:underline">8888</a></span>
                <span className="text-white/30">•</span>
                <span>🚑 <strong>Philippine Red Cross:</strong> <a href="tel:143" className="text-yellow-300 font-bold hover:underline">143</a></span>
                <span className="text-white/30">•</span>
                <span>🧠 <strong>Mental Health Crisis:</strong> <a href="tel:1553" className="text-white font-bold hover:underline">1553</a></span>
                <span className="text-white/30">•</span>
                <span>🛑 <strong>Anti-Trafficking Hotline:</strong> <a href="tel:1343" className="text-white font-bold hover:underline">1343</a></span>
                <span className="text-white/30">•</span>
                <span>🚒 <strong>BFP Fire Protection:</strong> <a href="tel:911" className="text-yellow-300 font-bold hover:underline">911 / (02) 8426-0219</a></span>
                <span className="text-white/30">•</span>
                <span>🌊 <strong>NDRRMC Disaster Hotline:</strong> <a href="tel:0289111406" className="text-white font-bold hover:underline">(02) 8911-1406</a></span>
              </span>

              {/* Loop Chunk 2 for Seamless Infinite Scroll */}
              <span className="inline-flex items-center gap-4">
                <span>🚨 <strong>National Emergency:</strong> <a href="tel:911" className="text-yellow-300 font-bold hover:underline">911</a></span>
                <span className="text-white/30">•</span>
                <span>⚖️ <strong>Citizens' Complaint Center:</strong> <a href="tel:8888" className="text-white font-bold hover:underline">8888</a></span>
                <span className="text-white/30">•</span>
                <span>🚑 <strong>Philippine Red Cross:</strong> <a href="tel:143" className="text-yellow-300 font-bold hover:underline">143</a></span>
                <span className="text-white/30">•</span>
                <span>🧠 <strong>Mental Health Crisis:</strong> <a href="tel:1553" className="text-white font-bold hover:underline">1553</a></span>
                <span className="text-white/30">•</span>
                <span>🛑 <strong>Anti-Trafficking Hotline:</strong> <a href="tel:1343" className="text-white font-bold hover:underline">1343</a></span>
                <span className="text-white/30">•</span>
                <span>🚒 <strong>BFP Fire Protection:</strong> <a href="tel:911" className="text-yellow-300 font-bold hover:underline">911 / (02) 8426-0219</a></span>
                <span className="text-white/30">•</span>
                <span>🌊 <strong>NDRRMC Disaster Hotline:</strong> <a href="tel:0289111406" className="text-white font-bold hover:underline">(02) 8911-1406</a></span>
              </span>
            </div>
          </div>

          {/* Prototype Role Switcher */}
          <div className="hidden sm:flex items-center bg-white/10 rounded-full p-0.5 border border-white/20 shrink-0 z-10 bg-ios-navy pl-1">
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
                <span className="hidden sm:inline-flex text-[10px] uppercase font-semibold px-1.5 py-0.2 rounded bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightMuted dark:text-ios-darkMuted border border-ios-lightBorder dark:border-ios-darkBorder">
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

          {/* Desktop Only Hamburger Menu & Tools Docker */}
          <div className="relative hidden lg:block" ref={menuRef}>
            <button
              onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
              className="p-2 rounded-ios-lg text-ios-lightMuted hover:text-ios-lightText dark:text-ios-darkMuted dark:hover:text-ios-darkText hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center"
              aria-label="Toggle desktop menu docker"
              title="Quick Actions & System Docker"
            >
              {desktopMenuOpen ? <X className="w-5 h-5 text-ios-navy dark:text-blue-400" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Desktop Docker Dropdown Popover */}
            {desktopMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-ios-darkSurface rounded-2xl shadow-ios-lg border border-ios-lightBorder dark:border-ios-darkBorder py-2.5 px-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 pb-2 mb-2 border-b border-ios-lightBorder/80 dark:border-ios-darkBorder/80 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-ios-lightMuted dark:text-ios-darkMuted">
                    Quick Actions & Tools
                  </span>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-ios-navy/10 dark:bg-blue-900/30 text-ios-navy dark:text-blue-400">
                    GabayPH
                  </span>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      openSuggestModal();
                      setDesktopMenuOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-medium text-ios-lightText dark:text-ios-darkText hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-ios-navy dark:text-blue-400" />
                    <div>
                      <span className="block font-semibold">Suggest a Service</span>
                      <span className="text-[11px] text-ios-lightMuted">Request missing government program</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      openContactModal();
                      setDesktopMenuOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-medium text-ios-lightText dark:text-ios-darkText hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <div>
                      <span className="block font-semibold">Help & Citizen Support</span>
                      <span className="text-[11px] text-ios-lightMuted">Inquire about public directory guides</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      navigate('/kaligtasan');
                      setDesktopMenuOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-medium text-ios-lightText dark:text-ios-darkText hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4 text-red-500" />
                    <div>
                      <span className="block font-semibold">National Hotlines (911)</span>
                      <span className="text-[11px] text-ios-lightMuted">Emergency, PNP, BFP, Red Cross</span>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      navigate('/admin');
                      setDesktopMenuOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-medium text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 flex items-center gap-2.5 transition-colors border-t border-ios-lightBorder/60 dark:border-ios-darkBorder/60 mt-1 pt-2"
                  >
                    <Shield className="w-4 h-4 text-amber-600" />
                    <div>
                      <span className="block font-semibold">Admin Workspace</span>
                      <span className="text-[11px] opacity-80">Manage services, jobs, and audits</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
