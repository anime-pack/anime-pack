import { createRouter, createWebHistory } from 'vue-router';
import MainView from '@/views/MainView.vue';
import SettingsView from '@/views/SettingsView.vue';
import HomeView from '@/views/HomeView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import LibraryView from '@/views/LibraryView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Main',
            component: MainView,
            children: [
                {
                    path: '/',
                    name: 'Home',
                    component: HomeView,
                },
                {
                    path: 'settings',
                    name: 'Settings',
                    component: SettingsView,
                },
                {
                    path: 'library',
                    name: 'Library',
                    component: LibraryView,
                },
            ],
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundView,
        },
    ],
});

export default router;
