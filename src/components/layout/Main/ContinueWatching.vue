<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { ChevronRight } from 'lucide-vue-next';

interface WatchingAnime {
    id: string;
    title: string;
    coverUrl: string;
    episode: {
        number: number;
        title: string;
        progress: number; // 0-100
        duration: number; // seconds
    };
}

defineProps({
    animes: {
        type: Array as () => WatchingAnime[],
        required: true,
    },
})

function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}min`;
}
</script>

<template>
    <section class="px-6">
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-semibold">Continuar Assistindo</h2>
            <Button variant="ghost" class="gap-2">
                Ver Mais
                <ChevronRight class="size-4" />
            </Button>
        </div>
        <Carousel :opts="{
            align: 'start',
            dragFree: true,
        }">
            <CarouselContent>
                <CarouselItem v-for="anime in animes" :key="anime.id" class="basis-[250px] sm:basis-[300px]">
                    <Card class="relative aspect-video overflow-hidden group">
                        <!-- Cover Image -->
                        <img :src="anime.coverUrl" :alt="anime.title"
                            class="absolute inset-0 w-full h-full object-cover" />

                        <!-- Diagonal Gradient -->
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-background/90 via-background/40 to-transparent" />

                        <!-- Episode Info -->
                        <div class="absolute top-3 left-3 flex flex-col">
                            <span class="text-xs font-medium opacity-80">Episódio {{ anime.episode.number }}</span>
                            <h3 class="text-sm font-semibold line-clamp-1">{{ anime.episode.title }}</h3>
                        </div>

                        <!-- Progress Bar -->
                        <div class="absolute bottom-0 left-0 right-0 h-1 bg-muted/50">
                            <div class="h-full bg-destructive transition-all"
                                :style="{ width: `${anime.episode.progress}%` }" />
                        </div>

                        <!-- Time Info -->
                        <div
                            class="absolute bottom-2 right-3 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            {{ formatTime(anime.episode.duration) }}
                        </div>
                    </Card>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    </section>
</template>
