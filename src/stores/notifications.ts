import { defineStore } from 'pinia';

export interface Notification {
    id: string;
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
}

export interface InboxState {
    ping: true;
    notifications: Notification[];
}

export const useNotificationStore = defineStore('notifications', {
    state: (): InboxState => ({
        ping: true,
        notifications: [],
    }),

    actions: {
        save() { this.$tauri.save() },

        addNotification(
            notification: Omit<Notification, 'id' | 'timestamp' | 'read'>
        ) {
            this.notifications.unshift({
                ...notification,
                id: crypto.randomUUID(),
                timestamp: new Date(),
                read: false,
            });
        },

        markAsRead(id: string) {
            const notification = this.notifications.find((n) => n.id === id);
            if (notification) notification.read = true;
        },

        clearAll() {
            this.notifications = [];
        },
    },

    getters: {
        unreadCount(): number {
            return this.notifications.filter((n) => !n.read).length;
        },

        getNotifications(): Notification[] {
            return this.notifications.sort(
                (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
            );
        },

        hasUnread(): boolean {
            return this.unreadCount > 0;
        },

        hasNotifications(): boolean {
            return this.notifications.length > 0;
        },
    },

    persist: true,
    tauri: {
        sync: true,
    },
});
