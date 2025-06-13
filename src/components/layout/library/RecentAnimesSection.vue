<script setup lang="ts">
import { ref, computed } from 'vue';
import { SortDesc, Clock, Eye, Calendar, PlayCircle, Info } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/SearchBar.vue';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'vue-router';
import { useLibraryStore } from '@/stores/library';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const router = useRouter();
const libraryStore = useLibraryStore();
const sortBy = ref('recent');
const search = ref('');

const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'views', label: 'Most Viewed' },
    { value: 'title', label: 'Title' },
];

const recentAnimes = computed(() => {
    let animes = libraryStore.getRecentlyViewed.map(item => ({
        ...item.animeData,
        lastViewed: item.timestamp,
        lastEpisode: item.watch?.number || null
    }));

    // Aplicar filtro de busca
    if (search.value) {
        const query = search.value.toLowerCase();
        animes = animes.filter(anime =>
            anime.title.toLowerCase().includes(query)
        );
    }

    // Aplicar ordenação
    switch (sortBy.value) {
        case 'title':
            return animes.sort((a, b) => a.title.localeCompare(b.title));
        case 'recent':
        default:
            return animes.sort((a, b) => b.lastViewed.getTime() - a.lastViewed.getTime());
    }
});

const continueAnime = (animeId: number) => {
    const anime = libraryStore.getRecentlyViewed.find(
        item => item.animeData.mal_id === animeId
    );

    if (anime?.watch) {
        router.push(`/watch/${animeId}?episode=${anime.watch.number}`);
    } else {
        router.push(`/watch/${animeId}`);
    }
};

const goToAnimePage = (animeId: number) => {
    router.push(`/anime/${animeId}`);
};

const formatDate = (date: Date) => new Date(date).toLocaleDateString();

const handleSearch = (query: string) => {
    search.value = query;
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
                    <SearchBar @submit="handleSearch" placeholder="Find..." cleaner />
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

        <div v-else>
            <Accordion type="single" collapsible class="space-y-4">
                <AccordionItem v-for="anime in recentAnimes" :key="anime.mal_id" :value="anime.mal_id.toString()"
                    class="border rounded-lg overflow-hidden">
                    <AccordionTrigger class="px-4 py-2 hover:no-underline">
                        <div class="flex items-center gap-4 w-full">
                            <img :src="anime.images.webp.small_image_url" :alt="anime.title"
                                class="h-16 w-12 object-cover rounded" />
                            <div class="flex-1 min-w-0">
                                <h3 class="font-medium line-clamp-1">{{ anime.title }}</h3>
                                <div class="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                    <span class="flex items-center gap-1">
                                        <Clock class="size-3" />
                                        {{ formatDate(anime.lastViewed) }}
                                    </span>
                                    <span v-if="anime.lastEpisode" class="flex items-center gap-1">
                                        <Calendar class="size-3" />
                                        Ep. {{ anime.lastEpisode }}
                                    </span>
                                </div>
                            </div>
                            <!-- Quick Actions -->
                            <div class="flex gap-2 ml-4">
                                <Button variant="ghost" size="sm" @click.stop="goToAnimePage(anime.mal_id)">
                                    <Info class="size-4" />
                                </Button>
                                <Button variant="ghost" size="sm" @click.stop="continueAnime(anime.mal_id)">
                                    <PlayCircle class="size-4" />
                                </Button>
                            </div>
                        </div>
                    </AccordionTrigger>

                    <AccordionContent class="px-4 pb-4">
                        <div class="grid gap-6 pt-4 md:grid-cols-2">
                            <!-- Sinopse -->
                            <div class="space-y-2">
                                <h4 class="font-medium">Sinopse</h4>
                                <p class="text-sm text-muted-foreground line-clamp-4">
                                    {{ anime.synopsis }}
                                </p>
                            </div>

                            <!-- Detalhes -->
                            <div class="space-y-4">
                                <div class="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span class="font-medium">Tipo: </span>
                                        <span class="text-muted-foreground"> {{ anime.type }}</span>
                                    </div>
                                    <div>
                                        <span class="font-medium">Status: </span>
                                        <span class="text-muted-foreground"> {{ anime.status }}</span>
                                    </div>
                                    <div>
                                        <span class="font-medium">Episódios: </span>
                                        <span class="text-muted-foreground"> {{ anime.episodes || '?' }}</span>
                                    </div>
                                    <div>
                                        <span class="font-medium">Score: </span>
                                        <span class="text-muted-foreground"> {{ anime.score }}</span>
                                    </div>
                                </div>

                                <Button class="w-full" @click="continueAnime(anime.mal_id)">
                                    <PlayCircle class="size-4 mr-2" />
                                    {{ anime.lastEpisode ? 'Continue Watching' : 'Start Watching' }}
                                </Button>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    </div>
</template>
