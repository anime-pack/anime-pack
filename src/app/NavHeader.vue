<script setup lang="ts">
import { Bell, Search, Settings, User, X } from 'lucide-vue-next';
import { ref, watch, nextTick } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navItems = [
    { name: 'Início', path: '/' },
    { name: 'Animes', path: '/animes' },
    { name: 'Favoritos', path: '/favorites' },
    { name: 'Biblioteca', path: '/library' },
];

const isSearchOpen = ref(false);
const searchValue = ref('');
const searchInput = ref<HTMLInputElement>();

const toggleSearch = () => {
    isSearchOpen.value = !isSearchOpen.value;
    if (isSearchOpen.value) {
        nextTick(() => {
            searchInput.value?.focus();
        });
    }
};

const clearSearch = () => {
    searchValue.value = '';
    isSearchOpen.value = false;
};

watch(searchValue, (newValue) => {
    if (!newValue && !isSearchOpen.value) {
        searchInput.value?.blur();
    }
});
</script>

<template>
    <header class="h-[64px] border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav class="flex h-full items-center justify-between px-4">
            <!-- Navegação Esquerda -->
            <div class="flex items-center gap-6">
                <ul class="flex items-center gap-4">
                    <li v-for="item in navItems" :key="item.name">
                        <Button variant="ghost" class="text-sm font-medium">
                            {{ item.name }}
                        </Button>
                    </li>
                </ul>
            </div>

            <!-- Navegação Direita -->
            <div class="flex items-center gap-2">
                <div class="relative flex items-center">
                    <div class="absolute right-0 transition-all duration-300 overflow-hidden"
                        :class="isSearchOpen ? 'w-[430px] opacity-100' : 'w-0 opacity-0'">
                        <div class="relative w-[430px]">
                            <Input ref="searchInput" v-model="searchValue" class="h-9 pr-9" placeholder="Buscar..." />
                            <Button variant="ghost" size="icon" @click="clearSearch"
                                class="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full opacity-70 hover:opacity-100 hover:bg-red-500/10 hover:text-red-500 transition-all z-20">
                                <X class="size-3.5" />
                            </Button>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" @click="toggleSearch" :class="{ 'opacity-0': isSearchOpen }"
                        class="transition-opacity duration-300">
                        <Search class="size-5" />
                    </Button>
                </div>
                <Button variant="ghost" size="icon">
                    <Bell class="size-5" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Settings class="size-5" />
                </Button>
                <Avatar class="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>
                        <User class="size-4" />
                    </AvatarFallback>
                </Avatar>
            </div>
        </nav>
    </header>
</template>