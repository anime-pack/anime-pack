<script setup lang="ts">
import { Star } from 'lucide-vue-next';
import type { Anime } from '@/types/anime';

defineProps<{
    anime: Anime;
}>();
</script>

<template>
    <div class="group relative overflow-hidden rounded-lg bg-card">
        <img :src="anime.cover" :alt="anime.title"
            class="aspect-[3/4] w-full object-cover transition-transform group-hover:scale-105" />

        <div
            class="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent p-4 flex flex-col justify-end opacity-0 transition-opacity group-hover:opacity-100">
            <h3 class="font-semibold text-card-foreground line-clamp-2">{{ anime.title }}</h3>
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
                <div class="flex items-center">
                    <Star class="size-4 fill-primary text-primary" />
                    <span>{{ anime.rating }}</span>
                </div>
                <span>•</span>
                <span>{{ anime.year }}</span>
            </div>
        </div>
    </div>
</template>
