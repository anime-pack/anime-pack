<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {
    Play, Pause, Volume2, VolumeX,
    Maximize, Minimize, Settings, Loader2
} from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

// TODO: make player functional

interface Props {
    src: string;
    poster?: string;
    autoplay?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    autoplay: false
});

const emit = defineEmits(['timeUpdate', 'ended', 'error', 'loaded']);

// Estados do player
const videoRef = ref<HTMLVideoElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);
const progressRef = ref<HTMLDivElement>();
const isPlaying = ref(false);
const isFullscreen = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1);
const isMuted = ref(false);
const isLoading = ref(true);
const showControls = ref(true);
const isVideoReady = ref(false);
const progressHoverWidth = ref(0);
const isControlsVisible = ref(true);
let hideControlsTimer: ReturnType<typeof setTimeout>;

// Controles de reprodução
const togglePlay = async () => {
    if (!videoRef.value) return;

    try {
        if (isPlaying.value) {
            await videoRef.value.pause();
        } else {
            await videoRef.value.play();
        }
        isPlaying.value = !isPlaying.value;
    } catch (error) {
        console.error('Playback error:', error);
    }
};

// Controles de progresso
const seek = (event: MouseEvent) => {
    if (!progressRef.value || !duration.value || !videoRef.value) return;

    const rect = progressRef.value.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    videoRef.value.currentTime = percent * duration.value;
    currentTime.value = videoRef.value.currentTime;
};

const updateProgress = () => {
    if (!videoRef.value) return;
    currentTime.value = videoRef.value.currentTime;
    duration.value = videoRef.value.duration;
    emit('timeUpdate', currentTime.value);
};

// Controles de volume
const toggleMute = () => {
    if (!videoRef.value) return;
    isMuted.value = !isMuted.value;
    videoRef.value.muted = isMuted.value;
};

const setVolume = (value: number) => {
    if (!videoRef.value) return;
    volume.value = value;
    videoRef.value.volume = value;
};

// Controles de tela cheia
const toggleFullscreen = async () => {
    if (!containerRef.value) return;

    if (!document.fullscreenElement) {
        await containerRef.value.requestFullscreen();
        isFullscreen.value = true;
    } else {
        await document.exitFullscreen();
        isFullscreen.value = false;
    }
};

// Formatar tempo
const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Event handlers
const handleProgressHover = (e: MouseEvent) => {
    if (!progressRef.value) return;
    const rect = progressRef.value.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    progressHoverWidth.value = position * 100;
};

const handleMouseMove = () => {
    isControlsVisible.value = true;
    clearTimeout(hideControlsTimer);

    if (isPlaying.value) {
        hideControlsTimer = setTimeout(() => {
            isControlsVisible.value = false;
        }, 3000);
    }
};

onMounted(() => {
    if (!videoRef.value) return;

    const video = videoRef.value;
    video.addEventListener('loadedmetadata', () => {
        isLoading.value = false;
        duration.value = video.duration;
        emit('loaded');
    });
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('ended', () => emit('ended'));
    video.addEventListener('error', (e) => emit('error', e));
    video.addEventListener('play', () => isPlaying.value = true);
    video.addEventListener('pause', () => isPlaying.value = false);

    // Eventos de teclado
    window.addEventListener('keydown', handleKeyPress);

    // Forçar carregamento do vídeo
    video.load();
});

// Cleanup
onBeforeUnmount(() => {
    clearTimeout(hideControlsTimer);
    window.removeEventListener('keydown', handleKeyPress);
});

// Keyboard shortcuts
const handleKeyPress = (e: KeyboardEvent) => {
    if (!videoRef.value) return;

    switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
            e.preventDefault();
            togglePlay();
            break;
        case 'f':
            e.preventDefault();
            toggleFullscreen();
            break;
        case 'm':
            e.preventDefault();
            toggleMute();
            break;
        case 'arrowleft':
            e.preventDefault();
            videoRef.value.currentTime -= 5;
            break;
        case 'arrowright':
            e.preventDefault();
            videoRef.value.currentTime += 5;
            break;
    }
};
</script>

<template>
    <div ref="containerRef" class="relative aspect-video bg-black group" @mousemove="handleMouseMove"
        @mouseleave="isControlsVisible = false">

        <!-- Video Element -->
        <video ref="videoRef" class="h-full w-full" :src="src" :poster="poster" :autoplay="autoplay"
            @click="togglePlay">
            Your browser does not support HTML5 video.
        </video>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-black/50">
            <Loader2 class="size-8 text-primary animate-spin" />
        </div>

        <!-- Controles Overlay -->
        <div class="absolute inset-0 transition-opacity duration-300"
            :class="{ 'opacity-0': !isControlsVisible && isPlaying }">
            <!-- Área de clique para play/pause -->
            <div class="absolute inset-0 z-10" @dblclick="toggleFullscreen" />

            <!-- Barra de Controles -->
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-4 space-y-2">
                <!-- Progress Bar -->
                <div ref="progressRef"
                    class="group relative h-1 hover:h-2 w-full bg-white/30 cursor-pointer rounded-full transition-all"
                    @mousemove="handleProgressHover" @mouseleave="progressHoverWidth = 0" @click="seek">
                    <!-- Progress Track -->
                    <div class="absolute inset-0 rounded-full bg-white/10 transition-all"
                        :style="{ width: `${progressHoverWidth}%` }" />
                    <!-- Progress Fill -->
                    <div class="absolute h-full bg-primary rounded-full transition-all"
                        :style="{ width: `${(currentTime / duration) * 100}%` }" />
                </div>

                <!-- Controls -->
                <div class="flex items-center justify-between gap-4">
                    <!-- Left Controls -->
                    <div class="flex items-center gap-4">
                        <Button variant="ghost" size="icon" class="text-white hover:bg-white/20" @click="togglePlay">
                            <Play v-if="!isPlaying" class="size-5" />
                            <Pause v-else class="size-5" />
                        </Button>

                        <!-- Volume Control -->
                        <div class="group relative flex items-center">
                            <Button variant="ghost" size="icon" class="text-white hover:bg-white/20"
                                @click="toggleMute">
                                <Volume2 v-if="!isMuted && volume > 0" class="size-5" />
                                <VolumeX v-else class="size-5" />
                            </Button>
                            <div class="w-0 overflow-hidden transition-all group-hover:w-24 group-hover:ml-2">
                                <Slider :model-value="[volume]" :min="0" :max="1" :step="0.1"
                                    @update:model-value="val => val && setVolume(val[0])" class="w-24" />
                            </div>
                        </div>

                        <!-- Time Display -->
                        <span class="text-sm text-white min-w-[90px]">
                            {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
                        </span>
                    </div>

                    <!-- Right Controls -->
                    <div class="flex items-center gap-2">
                        <Button variant="ghost" size="icon" class="text-white hover:bg-white/20"
                            @click="toggleFullscreen">
                            <Maximize v-if="!isFullscreen" class="size-5" />
                            <Minimize v-else class="size-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
video::-webkit-media-controls {
    display: none !important;
}

video::-webkit-media-controls-enclosure {
    display: none !important;
}
</style>
