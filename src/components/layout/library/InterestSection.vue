<script setup lang="ts">
import { ref } from 'vue';
import { SortDesc, List, Bookmark } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import AnimeCard from '@/components/AnimeCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { AnimeItem } from '@/types/anime';

const sortBy = ref('added');
const search = ref('');
const watchlist = ref<AnimeItem[]>([]); // TODO: Implementar store para watchlist

const sortOptions = [
    { value: 'added', label: 'Recently Added' },
    { value: 'score', label: 'Highest Score' },
    { value: 'title', label: 'Title' },
    { value: 'release', label: 'Release Date' },
];

const handleSearch = (query: string) => {
    search.value = query;
    // TODO: Implementar filtro de busca
};

const removeFromWatchlist = (animeId: number) => {
    // TODO: Implementar remoção da watchlist
    console.log('Removing from watchlist:', animeId);
};
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between gap-4">
            <h2 class="text-2xl font-semibold">Interest List</h2>
            <div class="flex items-center gap-4">
                <Select v-model="sortBy">
                    <SelectTrigger class="w-[180px]">
                        <SortDesc class="mr-2 size-4" />
                        <SelectValue :placeholder="sortOptions.find(opt => opt.value === sortBy)?.label" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="option in sortOptions" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </SelectItem>
                    </SelectContent>
                </Select>
                <div class="w-64">
                    <SearchBar @submit="handleSearch" cleaner />
                </div>
            </div>
        </div>

        <div v-if="watchlist.length === 0" class="flex flex-col items-center justify-center py-12 space-y-4">
            <div class="text-4xl">📋</div>
            <h3 class="text-lg font-medium">Your interest list is empty</h3>
            <p class="text-sm text-muted-foreground">
                Add animes that you want to watch in the future
            </p>
            <Button @click="$router.push('/search')">Explore Animes</Button>
        </div>

        <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="anime in watchlist" :key="anime.mal_id"
                class="group relative flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                <!-- Thumbnail -->
                <img :src="anime.images.webp.image_url" :alt="anime.title"
                    class="h-24 w-16 object-cover rounded-md flex-none" />

                <!-- Info -->
                <div class="flex-1 min-w-0">
                    <h3 class="font-medium line-clamp-1">{{ anime.title }}</h3>
                    <p class="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {{ anime.synopsis }}
                    </p>
                    <div class="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{{ anime.type }}</span>
                        <span>•</span>
                        <span>{{ anime.episodes }} episodes</span>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button variant="ghost" size="icon" class="h-8 w-8" @click="removeFromWatchlist(anime.mal_id)">
                        <Bookmark class="size-4 fill-current" />
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>
