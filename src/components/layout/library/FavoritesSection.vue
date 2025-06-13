<script setup lang="ts">
import { ref, computed } from 'vue';
import { SortDesc, Heart } from 'lucide-vue-next';
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
import { useLibraryStore } from '@/stores/library';

const libraryStore = useLibraryStore();
const sortBy = ref('recent');
const search = ref('');

const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'score', label: 'Highest Score' },
    { value: 'title', label: 'Title' },
];

const favorites = computed(() => {
    let sorted = [...libraryStore.likedAnimes];

    // Aplicar ordenação
    switch (sortBy.value) {
        case 'score':
            sorted.sort((a, b) => (b.score || 0) - (a.score || 0));
            break;
        case 'title':
            sorted.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'recent':
        default:
            // já está ordenado por mais recente no store
            break;
    }

    // Aplicar filtro de busca
    if (search.value) {
        const searchLower = search.value.toLowerCase();
        sorted = sorted.filter(anime =>
            anime.title.toLowerCase().includes(searchLower)
        );
    }

    return sorted;
});

const handleSearch = (query: string) => {
    search.value = query;
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
                    <SearchBar @submit="handleSearch" placeholder="Find..." cleaner />
                </div>
            </div>
        </div>

        <div v-if="favorites.length === 0" class="flex flex-col items-center justify-center py-12 space-y-4">
            <Heart class="size-12 text-muted-foreground" />
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
