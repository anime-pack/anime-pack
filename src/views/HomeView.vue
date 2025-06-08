<script setup lang="ts">
import { CarouselDisplay, ContinueWatching, FeaturedHero } from '@/components/layout/Main';
import { ref } from 'vue';

const toWatch = ref(false);  // TODO: work on this when we have some user data structure defined alongside with library n stuff

// Mock data for "Continue Watching" section
const animesToWatch = ref([
    {
        id: '1',
        title: 'Attack on Titan',
        coverUrl: 'https://example.com/attack-on-titan.jpg',
        episode: {
            number: 12,
            title: 'The Final Season Part 2',
            progress: 75,
            duration: 1800, // seconds
        },
    },
    {
        id: '2',
        title: 'Demon Slayer',
        coverUrl: 'https://example.com/demon-slayer.jpg',
        episode: {
            number: 5,
            title: 'Mugen Train Arc',
            progress: 50,
            duration: 1500, // seconds
        },
    },
    {
        id: '3',
        title: 'My Hero Academia',
        coverUrl: 'https://example.com/my-hero-academia.jpg',
        episode: {
            number: 10,
            title: 'Season 5',
            progress: 20,
            duration: 1200, // seconds
        },
    },
]);
</script>

<template>
    <!-- Hero Section -->
    <FeaturedHero />

    <!-- Sections de Conteúdo -->
    <div class="space-y-8 pb-12">
        <ContinueWatching v-if="toWatch" :animes="animesToWatch" />

        <CarouselDisplay title="Season Animes" />
        <CarouselDisplay />
        <CarouselDisplay />
    </div>
</template>
