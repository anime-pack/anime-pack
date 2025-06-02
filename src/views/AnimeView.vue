<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AnimeCard from '@/components/AnimeCard.vue';
import type { Anime, AnimeFilter } from '@/types/anime';

const filters = ref<AnimeFilter>({
    search: '',
    type: [],
    status: [],
    genres: [],
    year: null,
    rating: null,
});

// Mock data
const animes = ref<Anime[]>([
    {
        id: '1',
        title: 'Attack on Titan',
        cover: 'https://example.com/attack-on-titan.jpg',
        rating: 9.5,
        year: 2013,
        type: 'TV',
        status: 'completed',
        genres: ['Action', 'Drama', 'Fantasy'],
    },
    {
        id: '2',
        title: 'My Hero Academia',
        cover: 'https://example.com/my-hero-academia.jpg',
        rating: 8.0,
        year: 2016,
        type: 'TV',
        status: 'airing',
        genres: ['Action', 'Adventure', 'Comedy'],
    },
]);

const types = ['TV', 'Movie', 'OVA'];
const status = ['airing', 'completed', 'upcoming'];
const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy'];
</script>

<template>
    <div class="flex flex-col gap-6 p-6">
        <!-- Filters -->
        <section class="flex flex-wrap items-center gap-4 rounded-lg border bg-card p-4">
            <Select v-model="filters.type">
                <SelectTrigger class="w-[180px]">
                    <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="type in types" :key="type" :value="type">
                        {{ type }}
                    </SelectItem>
                </SelectContent>
            </Select>

            <Select v-model="filters.status">
                <SelectTrigger class="w-[180px]">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="status in status" :key="status" :value="status">
                        {{ status }}
                    </SelectItem>
                </SelectContent>
            </Select>

            <Select v-model="filters.genres">
                <SelectTrigger class="w-[180px]">
                    <SelectValue placeholder="Gêneros" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="genre in genres" :key="genre" :value="genre">
                        {{ genre }}
                    </SelectItem>
                </SelectContent>
            </Select>

            <Button variant="secondary" @click="() => filters = { ...filters, type: [], status: [], genres: [] }">
                Limpar Filtros
            </Button>
        </section>

        <!-- Animes grid -->
        <section class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            <AnimeCard v-for="anime in animes" :key="anime.id" :anime="anime" />
        </section>
    </div>
</template>
