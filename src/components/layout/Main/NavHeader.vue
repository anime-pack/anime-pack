<script setup lang="ts">
import { Bell, Settings, User, LogOut, UserCircle, Trash2, Check, Search, X } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SearchBar from '@/components/SearchBar.vue';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNotificationStore } from '@/stores/notifications';
import { useLibraryStore } from '@/stores/library';
import { toast } from 'vue-sonner';

const router = useRouter();
const notificationStore = useNotificationStore();
const libraryStore = useLibraryStore();
const route = useRoute();

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Animes', path: '/search' },
    { name: 'Favorites', path: '/library?tab=favorites' },
    { name: 'Library', path: '/library' },
];

const isSearchRoute = computed(() => route.path === '/search');
const isSearchExpanded = ref(false);
const searchBarRef = ref();

const toggleSearch = () => {
    if (isSearchExpanded.value && searchBarRef.value) {
        searchBarRef.value.clearSearch();
    } else {
        // Aguarda a expansão ser concluída antes de focar
        setTimeout(() => {
            searchBarRef.value?.focus();
        }, 200);
    }
    isSearchExpanded.value = !isSearchExpanded.value;
};

const handleSearch = (query: string) => {
    if (query) {
        libraryStore.addSearchQuery(query);
    }
    router.push({ path: '/search', query: { q: query || undefined } });
};

const handleLogout = () => {
    // TODO: handle logout logic to clear user session etc
    router.push('/login');
};

onMounted(() => {
    window.addEventListener('keydown', handleKeyPress);
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyPress);
});

const handleKeyPress = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (!isSearchRoute.value) {
            if (!isSearchExpanded.value) {
                isSearchExpanded.value = true;
                // Aguarda a expansão terminar
                setTimeout(() => {
                    searchBarRef.value?.focus();
                }, 200);
            } else {
                searchBarRef.value?.focus();
            }
        }
    }
};

const searchSuggestions = computed(() =>
    libraryStore.getRecentSearches.map(item => item.query)
);
</script>

<template>
    <header
        class="sticky select-none top-0 z-50 h-[64px] border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav class="flex h-full items-center justify-between px-4">
            <!-- Navegação Esquerda -->
            <div class="flex items-center gap-6">
                <ul class="flex items-center gap-4">
                    <li v-for="item in navItems" :key="item.name">
                        <Button @click="() => router.push(item.path)" variant="ghost" class="text-sm font-medium">
                            {{ item.name }}
                        </Button>

                    </li>
                </ul>
            </div>

            <!-- Navegação Direita -->
            <div class="flex items-center gap-2">
                <div class="relative flex items-center">
                    <div class="overflow-hidden transition-all duration-200"
                        :class="isSearchExpanded ? 'w-120 mr-2' : 'w-0'">
                        <SearchBar ref="searchBarRef" v-if="!isSearchRoute" @submit="handleSearch"
                            :suggestions="searchSuggestions" />
                    </div>
                    <Button v-if="!isSearchRoute" variant="ghost" size="icon" @click="toggleSearch">
                        <Search v-if="!isSearchExpanded" class="size-5" />
                        <X v-else class="size-5" />
                    </Button>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" class="relative">
                            <Bell class="size-5" />
                            <div v-if="notificationStore.hasUnread"
                                class="absolute right-0 top-0 h-2 w-2 rounded-full bg-destructive">
                            </div>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" class="w-80">
                        <DropdownMenuLabel class="flex items-center justify-between">
                            <span>Notifications</span>
                            <Button v-if="notificationStore.hasNotifications" variant="ghost" size="sm"
                                @click="notificationStore.clearAll">
                                <Trash2 class="mr-2 size-4" />
                                Clean
                            </Button>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <div class="max-h-[300px] overflow-y-auto">
                            <div v-if="!notificationStore.hasNotifications"
                                class="p-4 text-center text-muted-foreground">
                                No new notifications
                            </div>

                            <DropdownMenuItem v-for="notification in notificationStore.getNotifications"
                                :key="notification.id" class="flex flex-col items-start gap-1 p-4"
                                @click="notificationStore.markAsRead(notification.id)">
                                <div class="flex w-full items-start justify-between gap-2">
                                    <span class="font-medium" :class="{ 'text-primary': !notification.read }">
                                        {{ notification.title }}
                                    </span>
                                    <Check v-if="notification.read" class="size-4 text-muted-foreground" />
                                </div>
                                <p class="text-sm text-muted-foreground">{{ notification.message }}</p>
                                <time class="text-xs text-muted-foreground">
                                    {{ new Date(notification.timestamp).toLocaleString() }}
                                </time>
                            </DropdownMenuItem>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar
                            class="h-8 w-8 cursor-pointer ring-offset-background transition-opacity hover:opacity-80">
                            <AvatarImage src="https://github.com/anime-pack.png" />
                            <AvatarFallback>
                                <User class="size-4" />
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" class="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem @click="() => toast.info('Hey there!', { description: 'This feature is not available yet, please join the Discord to be up with the news!' })">
                            <UserCircle class="mr-2 size-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="() => router.push('/settings')">
                            <Settings class="mr-2 size-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem @click="handleLogout">
                            <LogOut class="mr-2 size-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    </header>
</template>