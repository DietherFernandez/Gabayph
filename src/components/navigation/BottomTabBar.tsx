import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Layers,
  Bookmark,
  PhoneCall,
  Shield
} from 'lucide-react';

export const BottomTabBar: React.FC = () => {
  const { currentPath, navigate, savedIds, role } = useApp();

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-5 h-5" />,
      path: '/'
    },
    {
      id: 'directory',
      label: 'Directory',
      icon: <Layers className="w-5 h-5" />,
      path: '/serbisyo'
    },
    {
      id: 'saved',
      label: 'Saved',
      icon: <Bookmark className="w-5 h-5" />,
      path: '/saved',
      badge: savedIds.length > 0 ? savedIds.length : undefined
    },
    {
      id: 'hotlines',
      label: 'Hotlines',
      icon: <PhoneCall className="w-5 h-5" />,
      path: '/kaligtasan'
    },
    ...(role === 'admin'
      ? [
          {
            id: 'admin',
            label: 'Admin',
            icon: <Shield className="w-5 h-5" />,
            path: '/admin'
          }
        ]
      : [])
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#1C1C1E]/95 backdrop-blur-xl border-t border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)] safe-bottom transition-colors">
      <nav className="flex items-center justify-around h-12 px-2" aria-label="Mobile Bottom Navigation">
        {tabs.map(tab => {
          // Exact route matching so /item/ doesn't trigger unrelated tab
          const isActive =
            tab.path === '/'
              ? currentPath === '/'
              : tab.path === '/serbisyo'
              ? currentPath === '/serbisyo' || currentPath.startsWith('/item/srv-')
              : currentPath === tab.path;

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors select-none ${
                isActive
                  ? 'text-[#007AFF] dark:text-[#0A84FF] font-medium'
                  : 'text-[#8E8E93] hover:text-black dark:hover:text-white'
              }`}
              aria-label={tab.label}
            >
              <div className="relative">
                {tab.icon}
                {typeof tab.badge === 'number' && (
                  <span className="absolute -top-1 -right-2 px-1 min-w-[14px] h-3.5 rounded-full bg-[#FF3B30] text-white text-[9px] font-bold flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
