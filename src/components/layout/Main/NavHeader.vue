<script setup lang="ts">
import { Bell, Settings, User } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import SearchBar from '@/components/SearchBar.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const navItems = [
    { name: 'Início', path: '/' },
    { name: 'Animes', path: '/animes' },
    { name: 'Favoritos', path: '/favorites' },
    { name: 'Biblioteca', path: '/library' },
];

</script>

<template>
    <header class="h-[64px] border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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

                <SearchBar />
                <Button variant="ghost" size="icon">
                    <Bell class="size-5" />
                </Button>
                <Button @click="() => router.push('/settings')" variant="ghost" size="icon">
                    <Settings class="size-5" />
                </Button>
                <Avatar class="h-8 w-8">
                    <AvatarImage src="https://github.com/anime-pack.png" />
                    <AvatarFallback>
                        <User class="size-4" />
                    </AvatarFallback>
                </Avatar>
            </div>
        </nav>
    </header>
</template>