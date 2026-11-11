import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MockStorage } from '../data/mockStorage';
import { UserNotification } from '../types';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import { Button } from '../components/common/Button';
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
    showToast('Marked all notifications as read.', 'success');
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
        showToast('Cleared all notifications.', 'info');
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
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-5 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ios-navy dark:text-blue-400 mb-1">
            <Bell className="w-4 h-4" />
            <span>Notification Center</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-ios-lightText dark:text-ios-darkText tracking-tight">
            Official Government Notifications & Bulletins
          </h1>
          <p className="text-xs sm:text-sm text-ios-lightMuted dark:text-ios-darkMuted mt-0.5">
            Stay informed with deadline reminders, urgent disaster advisories, and consular appointment openings.
          </p>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            {unreadCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkAllAsRead}
                className="text-xs"
              >
                <CheckCheck className="w-3.5 h-3.5" /> Mark All Read
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              className="text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-900"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </Button>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      {notifications.length > 0 && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === 'all'
                ? 'bg-ios-navy text-white shadow-sm'
                : 'bg-ios-lightSurface dark:bg-ios-darkSurface text-ios-lightMuted border border-ios-lightBorder dark:border-ios-darkBorder'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filter === 'unread'
                ? 'bg-ios-navy text-white shadow-sm'
                : 'bg-ios-lightSurface dark:bg-ios-darkSurface text-ios-lightMuted border border-ios-lightBorder dark:border-ios-darkBorder'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>
      )}

      {/* Notifications List */}
      <div>
        {filteredNotifs.length > 0 ? (
          <GroupedList
            title={`Notification Feed (${filteredNotifs.length})`}
            subtitle="Click a notification to navigate directly to the relevant service or advisory"
          >
            {filteredNotifs.map(notif => (
              <GroupedListItem
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                leadingIcon={
                  <div className="relative">
                    <Bell className="w-4 h-4 text-ios-navy dark:text-blue-400" />
                    {!notif.isRead && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
                    )}
                  </div>
                }
                title={
                  <div className="flex items-center gap-2">
                    <span className={notif.isRead ? 'font-medium' : 'font-bold'}>
                      {notif.title}
                    </span>
                    {!notif.isRead && (
                      <span className="text-[10px] bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-300 font-bold px-1.5 py-0.2 rounded">
                        NEW
                      </span>
                    )}
                  </div>
                }
                subtitle={notif.message}
                metadata={
                  <>
                    <span className="capitalize">{notif.category}</span>
                    <span>•</span>
                    <span>{notif.date}</span>
                  </>
                }
              />
            ))}
          </GroupedList>
        ) : (
          <EmptyState
            icon={<Bell className="w-8 h-8" />}
            title="No Notifications"
            description={
              filter === 'unread'
                ? 'You have no unread notifications.'
                : 'No notifications currently stored in your notification center.'
            }
          />
        )}
      </div>
    </div>
  );
};
