import { createRouter, createWebHistory } from 'vue-router';
import MainView from '@/views/MainView.vue';
import HomeView from '@/views/HomeView.vue';

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
                    component: () => import('@/views/SettingsView.vue'),
                },
                {
                    path: 'library',
                    name: 'Library',
                    component: () => import('@/views/LibraryView.vue'),
                },
                {
                    path: 'anime',
                    name: 'Anime',
                    component: () => import('@/views/AnimeView.vue'),
                },
                {
                    path: 'anime/:id',
                    name: 'AnimePage',
                    component: () => import('@/views/AnimePageView.vue'),
                },
                {
                    path: 'watch/:id',
                    name: 'Player',
                    component: () => import('@/views/PlayerView.vue'),
                },
            ],
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/LoginView.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('@/views/NotFoundView.vue'),
        },
    ],
});

export default router;
