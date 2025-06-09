<script setup lang="ts">
import { ref } from 'vue';
import { SortDesc, Clock, Eye, Calendar } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/SearchBar.vue';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { AnimeItem } from '@/types/anime';

interface ViewedAnime extends AnimeItem {
    lastViewed: Date;
    viewCount: number;
    lastEpisode?: number;
}

const sortBy = ref('recent');
const search = ref('');
const recentAnimes = ref<ViewedAnime[]>([]); // TODO: Implementar store para animes vistos

const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'views', label: 'Most Viewed' },
    { value: 'title', label: 'Title' },
];

const handleSearch = (query: string) => {
    search.value = query;
    // TODO: Implementar filtro de busca
};

const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
};

const continueAnime = (animeId: number) => {
    // TODO: Implementar navegação para o último episódio visto
    console.log('Continuing anime:', animeId);
};
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between gap-4">
            <h2 class="text-2xl font-semibold">Recent Animes</h2>
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

        <div v-if="recentAnimes.length === 0" class="flex flex-col items-center justify-center py-12 space-y-4">
            <Eye class="size-12 text-muted-foreground" />
            <h3 class="text-lg font-medium">No animes viewed yet</h3>
            <p class="text-sm text-muted-foreground">
                Your anime history will appear here
            </p>
            <Button @click="$router.push('/search')">Explore Animes</Button>
        </div>

        <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div v-for="anime in recentAnimes" :key="anime.mal_id"
                class="group relative flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                <!-- Thumbnail -->
                <img :src="anime.images.webp.large_image_url" :alt="anime.title"
                    class="h-24 w-40 object-cover rounded-md flex-none" />

                <!-- Info -->
                <div class="flex-1 min-w-0">
                    <h3 class="font-medium line-clamp-1">{{ anime.title }}</h3>
                    <div class="mt-2 flex flex-col gap-1 text-xs text-muted-foreground">
                        <span class="flex items-center gap-1">
                            <Clock class="size-3" />
                            Viewed on {{ formatDate(anime.lastViewed) }}
                        </span>
                        <span class="flex items-center gap-1">
                            <Eye class="size-3" />
                            {{ anime.viewCount }} views
                        </span>
                        <span v-if="anime.lastEpisode" class="flex items-center gap-1">
                            <Calendar class="size-3" />
                            Episode {{ anime.lastEpisode }}
                        </span>
                    </div>
                </div>

                <!-- Continue Button -->
                <Button variant="ghost" size="sm"
                    class="absolute right-4 bottom-4 opacity-0 transition-opacity group-hover:opacity-100"
                    @click="continueAnime(anime.mal_id)">
                    Continue
                </Button>
            </div>
        </div>
    </div>
</template>
