<script setup lang="ts">
import { ContinueWatching, CarouselDisplay, FeaturedHero } from '@/components/layout/Main';
</script>

<template>
    <!-- Hero Section -->
    <FeaturedHero />

    <!-- Sections de Conteúdo -->
    <div class="space-y-8 pb-12">
        <ContinueWatching />

        <CarouselDisplay />
    </div>
</template>
