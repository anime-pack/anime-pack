<script setup lang="ts">
import { ref } from 'vue';
import { Star, SortDesc } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/SearchBar.vue';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { AnimeItemFull } from '@/types/anime';

interface RatedAnime extends AnimeItemFull {
    userRating: number;
    ratedAt: Date;
}

const sortBy = ref('recent');
const search = ref('');
const ratedAnimes = ref<RatedAnime[]>([]); // TODO: Implementar store para avaliações

const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'rating', label: 'Highest Rating' },
    { value: 'title', label: 'Title' },
];

const handleSearch = (query: string) => {
    search.value = query;
    // TODO: Implementar filtro de busca
};

const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-500';
    if (rating >= 6) return 'text-yellow-500';
    return 'text-red-500';
};
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between gap-4">
            <h2 class="text-2xl font-semibold">Ratings</h2>
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

        <div v-if="ratedAnimes.length === 0" class="flex flex-col items-center justify-center py-12 space-y-4">
            <Star class="size-12 text-muted-foreground" />
            <h3 class="text-lg font-medium">No rated animes yet</h3>
            <p class="text-sm text-muted-foreground">
                Your ratings will appear here
            </p>
            <Button @click="$router.push('/search')">Explore Animes</Button>
        </div>

        <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="anime in ratedAnimes" :key="anime.mal_id"
                class="flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                <img :src="anime.images.webp.image_url" :alt="anime.title"
                    class="h-24 w-16 object-cover rounded-md flex-none" />
                <div class="flex-1 min-w-0">
                    <h3 class="font-medium line-clamp-1">{{ anime.title }}</h3>
                    <div class="mt-1 flex items-center gap-2">
                        <Star class="size-4 fill-current" :class="getRatingColor(anime.userRating)" />
                        <span :class="getRatingColor(anime.userRating)">{{ anime.userRating }}/10</span>
                    </div>
                    <time class="mt-2 text-xs text-muted-foreground">
                        {{ new Date(anime.ratedAt).toLocaleDateString() }}
                    </time>
                </div>
            </div>
        </div>
    </div>
</template>
