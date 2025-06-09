<script setup lang="ts">
import { onMounted, reactive, ref, watch, onBeforeUnmount, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AnimeCard from '@/components/AnimeCard.vue';
import { AnimeItem, AnimeRating, AnimeStatus, AnimeType } from '@/types/anime';
import { invoke } from '@tauri-apps/api/core';
import { SearchAnimeParams } from '@/types/invoke';
import SearchBar from '@/components/SearchBar.vue';
import { useLibraryStore } from '@/stores/library';

type Filter = {
    search: string;
    type: keyof typeof AnimeType | undefined;
    status: (keyof typeof AnimeStatus | undefined);
    genres: number[];
    year: string | undefined;
    rating: (keyof typeof AnimeRating | undefined);
};

const filterOpts = {
    types: Object.keys(AnimeType) as unknown as (keyof typeof AnimeType),
    status: Object.keys(AnimeStatus) as unknown as (keyof typeof AnimeStatus | undefined),
    rating: Object.keys(AnimeRating) as unknown as (keyof typeof AnimeRating | undefined),
    genres: [] as string[],
};

const animes = ref<AnimeItem[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

const route = useRoute();
const router = useRouter();
const libraryStore = useLibraryStore();

const filters = reactive<Filter>({
    search: (route.query.q as string) || '',
    type: undefined,
    status: undefined,
    genres: [],
    year: undefined,
    rating: undefined,
});

const searchBarRef = ref();

async function fetchAnimes() {
    isLoading.value = true;
    error.value = null;

    try {
        const params = {
            q: filters.search || undefined,
            type_: filters.type ? filters.type : undefined,
            status: filters.status && filters.status.length > 0 ? filters.status : undefined,
            genres: filters.genres.length > 0 ? filters.genres : undefined,
            start_date: filters.year || undefined,
            rating: filters.rating || undefined,
        } satisfies Partial<SearchAnimeParams>;

        const response = await invoke<AnimeItem>('search_animes', { params });

        if (!response || !Array.isArray(response)) {
            throw new Error('Invalid response format');
        }

        animes.value = response as AnimeItem[];
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to fetch animes';
        console.error('Error fetching animes:', err);
    } finally {
        isLoading.value = false;
    }
}

// Atualizar busca quando filtros mudarem
watch(
    filters,
    () => fetchAnimes(),
    { deep: true }
);

onMounted(() => {
    window.addEventListener('keydown', handleKeyPress);
    fetchAnimes();
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyPress);
});

const handleKeyPress = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchBarRef.value?.focus();
    }
};

const handleSearch = (query: string) => {
    filters.search = query;
    if (query) {
        libraryStore.addSearchQuery(query);
    }
    router.push({ query: { ...route.query, q: query || undefined } });
};

const searchSuggestions = computed(() =>
    libraryStore.getRecentSearches.map(item => item.query)
);
</script>

<template>
    <div class="flex flex-col gap-6 p-6">
        <!-- Search -->
        <div class="w-full max-w-3xl">
            <SearchBar ref="searchBarRef" :defaultValue="filters.search" :suggestions="searchSuggestions"
                @submit="handleSearch" cleaner />
        </div>

        <!-- Filters -->
        <section class="flex flex-wrap items-center gap-4 rounded-lg border bg-card p-4">
            <Select v-model="filterOpts">
                <SelectTrigger class="w-[180px]">
                    <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="type in filterOpts.types" :key="type" :value="type">
                        {{ type }}
                    </SelectItem>
                </SelectContent>
            </Select>

            <Select v-model="filters.status">
                <SelectTrigger class="w-[180px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="status in filterOpts.status" :key="status" :value="status">
                        {{ status }}
                    </SelectItem>
                </SelectContent>
            </Select>

            <Select v-if="filterOpts.genres" v-model="filterOpts.genres">
                <SelectTrigger class="w-[180px]">
                    <SelectValue placeholder="Gêneros" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="genre in filterOpts.genres" :key="genre" :value="genre">
                        {{ genre }}
                    </SelectItem>
                </SelectContent>
            </Select>

            <Button variant="secondary"
                @click="() => filters = { ...filters, type: undefined, status: undefined, genres: [] }">
                Limpar Filtros
            </Button>
        </section>

        <!-- Loading & Error states -->
        <div v-if="isLoading" class="flex justify-center p-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>

        <div v-else-if="error" class="flex justify-center p-12">
            <p class="text-destructive">{{ error }}</p>
        </div>

        <!-- Empty state -->
        <div v-else-if="animes.length === 0" class="flex justify-center p-12">
            <p class="text-muted-foreground">Nenhum anime encontrado</p>
        </div>

        <!-- Animes grid -->
        <section v-else class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            <AnimeCard clickable v-for="anime in animes" :key="anime.mal_id" :anime="anime" />
        </section>
    </div>
</template>
