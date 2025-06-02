import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([]);

  function addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
    notifications.value.unshift({
      ...notification,
      id: crypto.randomUUID(),
      timestamp: new Date(),
      read: false,
    });
  }

  function markAsRead(id: string) {
    const notification = notifications.value.find(n => n.id === id);
    if (notification) notification.read = true;
  }

  function clearAll() {
    notifications.value = [];
  }

  return { notifications, addNotification, markAsRead, clearAll };
});
