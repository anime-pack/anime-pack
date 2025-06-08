<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ChevronLeft, ChevronRight, X } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { invoke } from '@tauri-apps/api/core';
import type { AnimeItem } from '@/types/anime';
import { VideoPlayer } from '@/components/layout/player';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const isLoading = ref(true);
const anime = ref<AnimeItem | null>(null);
const currentEpisode = ref(Number(route.params.episode) || 1);

const videoSrc = "https://cdn.discordapp.com/attachments/1324069439531909150/1380741471056957531/y2mate.is_-_L_I_F_E-OzFd-6BaiSQ-720p-1709513983.mp4?ex=6844fb33&is=6843a9b3&hm=970125e71f89c731e1dac436e37e1d9873eb988f5a141b70b512eef0573736d9&"; // TODO: Implementar source real

onMounted(async () => {
    try {
        const response = await invoke<AnimeItem>('anime_full', {
            id: Number(route.params.id)
        });
        anime.value = response;
    } catch (error) {
        console.error('Error fetching anime:', error);
    } finally {
        isLoading.value = false;
    }
});

const navigateToEpisode = (episode: number) => {
    currentEpisode.value = episode;
    router.push(`/watch/${route.params.id}/${episode}`);
};

const exitPlayer = () => {
    router.push(`/anime/${route.params.id}`);
};

const handleTimeUpdate = (time: number) => {
    // TODO: Save progress
    // console.log('Current time:', time);
};

const handleEnded = () => {
    // TODO: Auto-play next episode
    // console.log('Video ended');
};

// Mock data for episodes (TODO: implement real data)
const episodes = Array.from({ length: 12 }, (_, i) => ({
    number: i + 1,
    title: `Episode ${i + 1}`,
    duration: '24:00',
    thumbnail: anime.value?.images.webp.image_url || ''
}));
</script>

<template>
    <div class="flex flex-col min-h-0 bg-background">
        <!-- Player Container -->
        <div class="w-full bg-black/95">
            <div class="mx-auto max-w-screen-2xl">
                <div class="relative">
                    <!-- Video Player -->
                    <VideoPlayer :src="videoSrc" @timeUpdate="handleTimeUpdate" @ended="handleEnded" />

                    <!-- Navigation Controls -->
                    <!-- <div
                        class="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-4 pointer-events-none">
                        <Button variant="ghost" size="icon" class="text-white pointer-events-auto"
                            @click="navigateToEpisode(currentEpisode - 1)" :disabled="currentEpisode <= 1">
                            <ChevronLeft class="size-8" />
                        </Button>
                        <Button variant="ghost" size="icon" class="text-white pointer-events-auto"
                            @click="navigateToEpisode(currentEpisode + 1)">
                            <ChevronRight class="size-8" />
                        </Button>
                    </div> -->

                    <!-- Header Bar -->
                    <div class="absolute top-0 inset-x-0 p-4 flex justify-between items-center">
                        <h2 class="text-white font-medium">
                            {{ anime?.title }} - Episódio {{ currentEpisode }}
                        </h2>
                        <Button variant="ghost" size="icon" class="text-white" @click="exitPlayer">
                            <X class="size-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Content Section -->
        <div class="flex-1 overflow-y-auto">
            <div class="mx-auto max-w-screen-xl px-4 py-6">
                <!-- Episode Info -->
                <div v-if="anime" class="max-w-3xl mb-8">
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
                                        Episódio {{ episode.number }}
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

<style>
.video-js {
    width: 100%;
    height: 100%;
}

.vjs-theme-fantasy {
    --vjs-theme-fantasy--primary: hsl(var(--primary));
    --vjs-theme-fantasy--secondary: hsl(var(--secondary));
}

.video-js .vjs-control-bar {
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
}

.video-js .vjs-progress-holder {
    height: 0.5em;
}

.video-js .vjs-play-progress {
    background-color: var(--vjs-theme-fantasy--primary);
}
</style>
