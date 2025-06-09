<script setup lang="ts">
import { ref } from 'vue';
import { SortDesc, Search } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import AnimeCard from '@/components/AnimeCard.vue';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import SearchBar from '@/components/SearchBar.vue';
import type { AnimeItem } from '@/types/anime';

const sortBy = ref('recent');
const search = ref('');
const favorites = ref<AnimeItem[]>([]); // TODO: Implementar store para favoritos

const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'score', label: 'Highest Score' },
    { value: 'title', label: 'Title' },
];

const handleSearch = (query: string) => {
    search.value = query;
    // TODO: Implementar filtro de busca
};
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between gap-4">
            <h2 class="text-2xl font-semibold">Favorites</h2>
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

        <div v-if="favorites.length === 0" class="flex flex-col items-center justify-center py-12 space-y-4">
            <div class="text-4xl">❤️</div>
            <h3 class="text-lg font-medium">No favorite animes yet</h3>
            <p class="text-sm text-muted-foreground">
                Your favorite animes will appear here
            </p>
            <Button @click="$router.push('/search')">Explore Animes</Button>
        </div>

        <div v-else class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            <AnimeCard v-for="anime in favorites" :key="anime.mal_id" :anime="anime" clickable />
        </div>
    </div>
</template>
