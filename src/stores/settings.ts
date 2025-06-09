import { defineStore } from 'pinia';

interface Settings {
    theme: 'light' | 'dark' | 'auto';
    language: 'pt-BR' | 'en-US';
    autoplay: boolean;
}

const defaultSettings: Settings = {
    theme: 'auto',
    language: 'pt-BR',
    autoplay: false,
};

export const useSettingsStore = defineStore('settings', {
    state: (): Settings => {
        const stored = localStorage.getItem('settings');
        if (stored) {
            return JSON.parse(stored);
        }
        return defaultSettings;
    },

    actions: {
        setTheme(theme: Settings['theme']) {
            this.theme = theme;
            this.saveSettings();
        },

        setLanguage(language: Settings['language']) {
            this.language = language;
            this.saveSettings();
        },

        setAutoplay(autoplay: boolean) {
            this.autoplay = autoplay;
            this.saveSettings();
        },

        saveSettings() {
            localStorage.setItem('settings', JSON.stringify(this.$state));
        },

        resetSettings() {
            this.$state = { ...defaultSettings };
            this.saveSettings();
        },
    },

    getters: {
        isDarkTheme(): boolean {
            if (this.theme === 'auto') {
                return window.matchMedia('(prefers-color-scheme: dark)')
                    .matches;
            }
            return this.theme === 'dark';
        },
    },
});
