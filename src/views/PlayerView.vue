<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { invoke } from '@tauri-apps/api/core';
import type { AnimeItemFull } from '@/types/anime';
import { VideoPlayer } from '@/components/layout/player';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock } from 'lucide-vue-next';
import { useLibraryStore } from '@/stores/library';

const route = useRoute();
const router = useRouter();
const isLoading = ref(true);
const anime = ref<AnimeItemFull | null>(null);
const currentEpisode = ref(Number(route.query.ep) || 1);

const videoSrc = "https://cdn.discordapp.com/attachments/1324069439531909150/1380741471056957531/y2mate.is_-_L_I_F_E-OzFd-6BaiSQ-720p-1709513983.mp4?ex=6844fb33&is=6843a9b3&hm=970125e71f89c731e1dac436e37e1d9873eb988f5a141b70b512eef0573736d9&"; // TODO: Implementar source real

const libraryStore = useLibraryStore();

// Remover desestruturação incorreta
const currentWatchData = computed(() => {
    if (!anime.value) return null;
    const animeHistory = libraryStore.getRecentlyViewed.find(
        item => item.animeData.mal_id === anime.value?.mal_id
    );
    return animeHistory?.watch;
});

onMounted(async () => {
    try {
        const response = await invoke<AnimeItemFull>('anime_full', {
            id: Number(route.params.id)
        });
        anime.value = response;

        // Adicione após carregar o anime
        if (anime.value) {
            libraryStore.addViewedAnime({
                animeData: anime.value,
                watch: currentWatchData.value ?? null
            });
        }
    } catch (error) {
        console.error('Error fetching anime:', error);
    } finally {
        isLoading.value = false;
    }
});

const navigateToEpisode = (episode: number) => {
    currentEpisode.value = episode;
    router.push(`/watch/${route.params.id}?ep=${episode}`);
};

const exitPlayer = () => {
    router.back();
};

const handleTimeUpdate = (time: number) => {
    if (!anime.value) return;

    libraryStore.updateWatchedEpisode(anime.value.mal_id, currentEpisode.value, {
        currentTime: time,
        duration: 1440, // TODO: Pegar duração real do vídeo
        nextEpisode: currentEpisode.value < episodes.length ? currentEpisode.value + 1 : undefined
    });
};

const handleEnded = () => {
    if (!anime.value) return;

    const nextEpisode = currentEpisode.value + 1;
    if (nextEpisode <= episodes.length) {
        navigateToEpisode(nextEpisode);
    }
};

// Mock data for episodes (TODO: implement real data)
const episodes = Array.from({ length: 12 }, (_, i) => ({
    number: i + 1,
    title: `Episode ${i + 1}`,
    duration: '24:00',
    thumbnail: anime.value?.images.webp.image_url || 'https://placehold.co/600x400.png'
}));
</script>

<template>
    <div class="flex flex-col min-h-0 bg-background">
        <!-- Player Container -->
        <div class="w-full bg-black/95">
            <div class="mx-auto max-w-screen-2xl">
                <div class="relative">
                    <!-- Video Player -->
                    <VideoPlayer :src="videoSrc" :initial-time="currentWatchData?.time.currentTime"
                        @timeUpdate="handleTimeUpdate" @ended="handleEnded" />

                    <!-- Header Bar -->
                    <div class="absolute top-0 left-0 p-4">
                        <div class="group relative inline-flex items-center">
                            <Button variant="ghost" size="icon"
                                class="text-white absolute -left-12 opacity-0 transition-all duration-300 ease-out group-hover:left-0 group-hover:opacity-100"
                                @click="exitPlayer">
                                <ArrowLeft class="size-5" />
                            </Button>
                            <h2
                                class="text-white font-medium group-hover:translate-x-12 transition-transform duration-300 ease-out whitespace-nowrap">
                                {{ anime?.title }} - Episode {{ currentEpisode }}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Content Section -->
        <div class="flex-1 overflow-y-auto">
            <div class="mx-auto max-w-screen-xl px-4 py-6">
                <!-- Episode Info -->
                <div v-if="anime" class="max-w-5xl mb-8">
                    <h1 class="text-2xl font-bold mb-2">{{ anime.title }}</h1>
                    <p class="text-muted-foreground">
                        {{ anime.synopsis }}
                    </p>
                </div>

                <!-- Episode Navigation -->
                <div class="space-y-4">
                    <h3 class="text-lg font-semibold">Episódios</h3>
                    <ScrollArea class="h-[400px] rounded-md border">
                        <div class="space-y-1 p-4">
                            <button v-for="episode in episodes" :key="episode.number"
                                @click="navigateToEpisode(episode.number)"
                                class="flex w-full items-center gap-4 rounded-lg p-2 hover:bg-muted transition-colors"
                                :class="{ 'bg-muted': episode.number === currentEpisode }">
                                <!-- Thumbnail -->
                                <div class="relative aspect-video w-[160px] flex-none rounded-md overflow-hidden">
                                    <img :src="episode.thumbnail" :alt="`Episode ${episode.number}`"
                                        class="h-full w-full object-cover" />
                                    <div
                                        class="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-background/80 px-2 py-1 text-xs">
                                        <Clock class="size-3" />
                                        <span>{{ episode.duration }}</span>
                                    </div>
                                </div>

                                <!-- Info -->
                                <div class="flex flex-col items-start gap-1 text-left">
                                    <span class="text-xs text-muted-foreground">
                                        Episode {{ episode.number }}
                                    </span>
                                    <h4 class="font-medium">{{ episode.title }}</h4>
                                </div>
                            </button>
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    </div>
</template>
