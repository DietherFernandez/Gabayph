import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MockStorage } from '../data/mockStorage';
import { UserNotification } from '../types';
import { Bell } from 'lucide-react';
import { GroupedList, GroupedListItem } from '../components/common/GroupedList';
import { EmptyState } from '../components/common/EmptyState';
import { useToast } from '../context/ToastContext';
import { useConfirm } from '../context/ConfirmContext';

export const NotificationCenterPage: React.FC = () => {
  const { navigate, refreshNotifications } = useApp();
  const { showToast } = useToast();
  const { confirmAction } = useConfirm();

  const [notifications, setNotifications] = useState<UserNotification[]>(() => MockStorage.getNotifications());
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifs = useMemo(() => {
    if (filter === 'unread') return notifications.filter(n => !n.isRead);
    return notifications;
  }, [notifications, filter]);

  const handleMarkAllAsRead = () => {
    MockStorage.markAllNotificationsAsRead();
    setNotifications(MockStorage.getNotifications());
    refreshNotifications();
    showToast('Marked all notifications as read', 'success');
  };

  const handleClearAll = () => {
    confirmAction({
      title: 'Clear All Notifications?',
      message: 'Are you sure you want to dismiss all bulletin updates and status alerts?',
      confirmLabel: 'Clear All',
      isDestructive: true,
      onConfirm: () => {
        MockStorage.clearNotifications();
        setNotifications([]);
        refreshNotifications();
        showToast('Cleared all notifications', 'info');
      }
    });
  };

  const handleNotificationClick = (notif: UserNotification) => {
    MockStorage.markNotificationAsRead(notif.id);
    setNotifications(MockStorage.getNotifications());
    refreshNotifications();
    if (notif.actionUrl) {
      navigate(notif.actionUrl);
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200 max-w-3xl mx-auto px-4 sm:px-6 pt-1">
      {/* 1. Header: Large Title + Mark All Read */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div>
          <h1 className="text-[22px] sm:text-[26px] font-bold tracking-tight text-black dark:text-white leading-tight">
            Notifications
          </h1>
          <p className="text-[13px] text-[#8E8E93]">
            Official government bulletins and advisories
          </p>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllAsRead}
                className="text-[13px] font-medium text-[#007AFF] dark:text-[#0A84FF] hover:underline px-1 py-0.5 select-none cursor-pointer"
              >
                Mark All Read
              </button>
            )}
            <button
              type="button"
              onClick={handleClearAll}
              className="text-[13px] font-medium text-[#FF3B30] hover:underline px-1 py-0.5 select-none cursor-pointer"
              title="Clear all notifications"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* 2. Filter Pills (All / Unread) */}
      {notifications.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`h-7 px-3 rounded-full text-[12px] font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 select-none cursor-pointer ${
              filter === 'all'
                ? 'bg-[#007AFF] text-white font-semibold shadow-2xs'
                : 'bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] text-black dark:text-white hover:bg-[rgba(118,118,128,0.2)]'
            }`}
          >
            <span>All</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              filter === 'all' ? 'bg-white/20 text-white' : 'bg-black/10 dark:bg-white/10 text-[#8E8E93]'
            }`}>
              {notifications.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('unread')}
            className={`h-7 px-3 rounded-full text-[12px] font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 select-none cursor-pointer ${
              filter === 'unread'
                ? 'bg-[#007AFF] text-white font-semibold shadow-2xs'
                : 'bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] text-black dark:text-white hover:bg-[rgba(118,118,128,0.2)]'
            }`}
          >
            <span>Unread</span>
            {unreadCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#FF3B30] text-white font-bold">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* 3. Inset Grouped Notification Feed */}
      <div>
        {filteredNotifs.length > 0 ? (
          <GroupedList
            title={`${filteredNotifs.length} NOTIFICATIONS`}
            subtitle="Tap a notification to navigate directly to the relevant program"
          >
            {filteredNotifs.map(notif => (
              <GroupedListItem
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                leadingIcon={<Bell className={`w-4 h-4 ${!notif.isRead ? 'text-[#007AFF]' : 'text-[#8E8E93]'}`} />}
                title={
                  <div className="flex items-center gap-2">
                    <span className={!notif.isRead ? 'font-bold' : 'font-normal'}>{notif.title}</span>
                    {!notif.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#007AFF] shrink-0" />
                    )}
                  </div>
                }
                subtitle={notif.message}
                metadata={
                  <div className="flex items-center gap-2 text-[11px] text-[#8E8E93]">
                    <span className="capitalize">{notif.category}</span>
                    <span>•</span>
                    <span>{notif.date}</span>
                  </div>
                }
              />
            ))}
          </GroupedList>
        ) : (
          <EmptyState
            icon={<Bell className="w-10 h-10 opacity-50" />}
            title="No notifications"
            description="You are completely caught up with all public directory updates and advisories."
            actionLabel="Return Home"
            onAction={() => navigate('/')}
          />
        )}
      </div>
    </div>
  );
};
