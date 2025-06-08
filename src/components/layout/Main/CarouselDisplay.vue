<script setup lang="ts">
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-vue-next';
import type { AnimeItem } from '@/types/anime';
import { SearchAnimeParams } from '@/types/invoke';
import { onMounted, ref } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import AnimeCard from '@/components/AnimeCard.vue';


// const props = withDefaults(defineProps<Props>(), {
//     title: 'Animes',
//     animes: () => [],
//     params: undefined,
// });

const props = defineProps<{
    title?: string;
    animes?: AnimeItem[];
    params?: SearchAnimeParams;
}>()

const animes = ref<AnimeItem[]>(props.animes || []);
const moreHref = '#'
const isLoading = ref(false);

async function getAnimes(searchParams: SearchAnimeParams | undefined): Promise<void> {
    if (props.animes) return;

    try {
        const response = await invoke<AnimeItem[]>('search_animes', {
            params: searchParams ?? {
                limit: 20,
            },
        });

        if (response && Array.isArray(response)) {
            animes.value = response;
        } else {
            throw new Error('Invalid response format');
        }
    } catch (error) {
        animes.value = [];
        throw new Error(`Failed to fetch animes: ${error}`);
    }
}

onMounted(async () => {
    isLoading.value = true;
    try {
        await getAnimes(props.params)
    } catch (error) {
        console.error('Error while loading component:', error);
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <section class="px-6 select-none">
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-semibold">{{ title || "Animes" }}</h2>
            <Button v-if="moreHref" :to="moreHref" variant="ghost" class="gap-2">
                Ver Mais
                <ChevronRight class="size-4" />
            </Button>
        </div>
        <Carousel :opts="{ align: 'start', dragFree: true }">
            <CarouselContent>
                <!-- Loading State -->
                <template v-if="isLoading">
                    <CarouselItem v-for="n in 8" :key="`skeleton-${n}`" class="basis-[200px]">
                    <Card class="relative aspect-[3/4] overflow-hidden">
                        <div class="absolute inset-0 bg-muted animate-pulse" />
                    </Card>
                    </CarouselItem>
                </template>

                <!-- Data State -->
                <template v-else-if="animes && animes.length > 0">
                    <CarouselItem v-for="anime in animes" :key="anime.mal_id" class="basis-[200px]">
                        <AnimeCard :anime="anime" clickable />
                    </CarouselItem>
                </template>

                <!-- Empty State -->
                <CarouselItem v-else class="basis-full">
                    <div class="flex justify-center p-8 text-muted-foreground">
                        Nenhum anime encontrado
                    </div>
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    </section>
</template>
