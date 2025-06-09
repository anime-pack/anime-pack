<script setup lang="ts">
import { ref } from 'vue';
import { SortDesc, Clock, Play } from 'lucide-vue-next';
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

interface WatchedEpisode {
    anime: AnimeItem;
    episode: number;
    progress: number;
    duration: number;
    watchedAt: Date;
}

const sortBy = ref('recent');
const search = ref('');
const episodes = ref<WatchedEpisode[]>([]); // TODO: Implementar store para episódios

const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'title', label: 'Anime Title' },
    { value: 'progress', label: 'Progress' },
];

const handleSearch = (query: string) => {
    search.value = query;
    // TODO: Implementar filtro de busca
};

const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
};

const formatProgress = (current: number, total: number) => {
    return `${Math.round((current / total) * 100)}%`;
};

const continueEpisode = (animeId: number, episode: number) => {
    // TODO: Implementar navegação para o player
    console.log('Continuing episode:', { animeId, episode });
};
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between gap-4">
            <h2 class="text-2xl font-semibold">Recent Episodes</h2>
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

        <div v-if="episodes.length === 0" class="flex flex-col items-center justify-center py-12 space-y-4">
            <div class="text-4xl">▶️</div>
            <h3 class="text-lg font-medium">No episodes watched yet</h3>
            <p class="text-sm text-muted-foreground">
                Your watched episodes will appear here
            </p>
            <Button @click="$router.push('/search')">Explore Animes</Button>
        </div>

        <div v-else class="grid grid-cols-1 gap-4">
            <div v-for="episode in episodes" :key="`${episode.anime.mal_id}-${episode.episode}`"
                class="group relative flex items-start gap-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                <!-- Thumbnail -->
                <div class="relative aspect-video w-[240px] flex-none rounded-md overflow-hidden">
                    <img :src="episode.anime.images.webp.large_image_url" :alt="episode.anime.title"
                        class="h-full w-full object-cover" />
                    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" class="absolute inset-0 w-full h-full text-white"
                            @click="continueEpisode(episode.anime.mal_id, episode.episode)">
                            <Play class="size-8" />
                        </Button>
                    </div>
                    <!-- Progress Bar -->
                    <div class="absolute bottom-0 left-0 right-0 h-1 bg-muted-foreground/30">
                        <div class="h-full bg-primary transition-all"
                            :style="{ width: `${(episode.progress / episode.duration) * 100}%` }" />
                    </div>
                </div>

                <!-- Info -->
                <div class="flex-1 min-w-0">
                    <h3 class="font-medium line-clamp-1">{{ episode.anime.title }}</h3>
                    <p class="mt-1 text-sm text-muted-foreground">
                        Episode {{ episode.episode }}
                    </p>
                    <div class="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                        <span class="flex items-center gap-1">
                            <Clock class="size-3" />
                            {{ formatDuration(episode.duration) }}
                        </span>
                        <span>•</span>
                        <span>{{ formatProgress(episode.progress, episode.duration) }}</span>
                    </div>
                    <time class="mt-2 block text-xs text-muted-foreground">
                        {{ new Date(episode.watchedAt).toLocaleDateString() }}
                    </time>
                </div>
            </div>
        </div>
    </div>
</template>
