<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Info, PlayCircle } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { AnimeItem } from '@/types/anime';
import { invoke } from '@tauri-apps/api/core';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoading = ref(true);
const featuredAnimes = ref<AnimeItem[]>([]);
const currentIndex = ref(0);
const intervalId = ref<number>();

const currentAnime = computed(() =>
    featuredAnimes.value.length > 0 ? featuredAnimes.value[currentIndex.value] : null
);

onMounted(async () => {
    try {
        const response = await invoke<AnimeItem[]>('search_animes', {
            params: {
                limit: 7,
            }
        });

        if (response && Array.isArray(response)) {
            featuredAnimes.value = response;
            if (response.length > 0) {
                startSlideshow();
            }
        }
    } catch (error) {
        console.error('Error fetching featured animes:', error);
    } finally {
        isLoading.value = false;
    }
});

function startSlideshow() {
    if (featuredAnimes.value.length <= 1) return;

    intervalId.value = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % featuredAnimes.value.length;
    }, 11000);
}

onUnmounted(() => {
    if (intervalId.value) {
        clearInterval(intervalId.value);
    }
});

const navigateToAnime = (w?: boolean) => {
    if (currentAnime.value) {
        if (w) {
            router.push(`/watch/${currentAnime.value.mal_id}`);
            return;
        }
        router.push(`/anime/${currentAnime.value.mal_id}`);
    }
};
</script>

<template>
    <section class="relative h-[45vh] w-full">
        <!-- Loading State -->
        <div v-if="isLoading" class="absolute inset-0 bg-muted animate-pulse" />

        <!-- Content State -->
        <template v-else-if="currentAnime">
            <TransitionGroup tag="div" name="fade">
                <div v-for="(anime, index) in featuredAnimes" :key="anime.mal_id" v-show="index === currentIndex"
                    class="absolute inset-0 bg-no-repeat bg-cover bg-center transition-opacity duration-1000"
                    :style="{ backgroundImage: `url(${anime.images.webp.large_image_url})` }"
                    :class="['opacity-100 transition-opacity duration-1000', { 'opacity-0': index !== currentIndex }]">
                    <div class="absolute inset-0 bg-gradient-to-r from-background/95 to-background/20" />
                    <div class="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                    <div class="absolute inset-0 bg-gradient-to-b from-background/50 to-transparent" />
                </div>
            </TransitionGroup>

            <div class="relative z-10 flex h-full flex-col justify-end gap-4 p-6 sm:p-8">
                <TransitionGroup tag="div" enter-active-class="transition-all duration-500 ease-out"
                    enter-from-class="opacity-0 translate-y-5" enter-to-class="opacity-100 translate-y-0"
                    leave-active-class="transition-all duration-500 ease-in"
                    leave-from-class="opacity-100 -translate-y-0" leave-to-class="opacity-0 -translate-y-5">
                    <h1 :key="`title-${currentAnime.mal_id}`" class="text-4xl font-bold sm:text-6xl max-w-7xl">
                        {{ currentAnime.title }}
                    </h1>
                    <p :key="`desc-${currentAnime.mal_id}`" class="text-muted-foreground max-w-3xl line-clamp-3">
                        {{ currentAnime.synopsis || 'No description available.' }}
                    </p>
                </TransitionGroup>

                <div class="flex gap-4">
                    <Button size="lg" class="gap-2" @click="navigateToAnime(true)">
                        <PlayCircle class="size-5" />
                        Watch
                    </Button>
                    <Button size="lg" variant="outline" class="gap-2" @click="navigateToAnime(false)">
                        <Info class="size-5 " />
                        More Info
                    </Button>
                </div>
            </div>
        </template>

        <!-- Empty State -->
        <div v-else class="flex h-full items-center justify-center text-muted-foreground">
            No animes in the featured list.
        </div>
    </section>
</template>
