<script setup lang="ts">
import { useVideoPlayer } from '@/composables/useVideoPlayer';
import {
    Play, Pause, Volume2, VolumeX,
    Maximize, Minimize, Settings, Loader2,
    SkipForward,
    SkipBack
} from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

// TODO: Refactor entire player logic with https://www.youtube.com/watch?v=ZeNyjnneq_w and get rid of @/composables/useVideoPlayer if possible or needed

interface Props {
    src: string;
    poster?: string;
    autoplay?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    autoplay: false
});

const emit = defineEmits(['timeUpdate', 'ended', 'error', 'loaded']);

const {
    videoRef,
    containerRef,
    progressRef,
    isPlaying,
    isFullscreen,
    currentTime,
    duration,
    volume,
    isMuted, isLoading,
    progressHoverWidth,
    isControlsVisible,
    isInteracting,
    videoSettings,
    togglePlay,
    seek,
    toggleMute,
    setVolume,
    toggleFullscreen,
    formatTime,
    handleProgressHover,
    handleMouseMove,
    updateSetting,
} = useVideoPlayer(props.src, props.autoplay);

const qualities = ['1080p', '720p', '480p', '360p'];
</script>

<template>
    <div ref="containerRef" class="relative bg-black max-h-[90vh] min-w-full [aspect-ratio:16/9]"
        @mousemove="handleMouseMove" @mouseleave="isControlsVisible = false">

        <!-- Video Element -->
        <video ref="videoRef" class="h-full w-full" @click.stop="togglePlay" :src="src" :poster="poster"
            :autoplay="autoplay" preload="auto" @ended="emit('ended')" @error="(e) => emit('error', e)"
            @loadedmetadata="emit('loaded')" @timeupdate="emit('timeUpdate', currentTime)">
            Ocorreu um erro inesperado, por favor reporte ao suporte.
        </video>

        <!-- Loading Indicator -->
        <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-black/50">
            <Loader2 class="size-8 text-primary animate-spin" />
        </div>

        <!-- Controles Overlay -->
        <div class="absolute inset-0 transition-opacity duration-300"
            :class="{ 'opacity-0 pointer-events-none': !isControlsVisible && isPlaying }">

            <!-- Play/Pause Overlay -->
            <div class="absolute inset-0 flex items-center justify-center" @click.stop="togglePlay">
                <Button v-show="!isInteracting" variant="ghost" size="lg"
                    class="text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <Play v-if="!isPlaying" class="size-12" />
                    <Pause v-else class="size-12" />
                </Button>
            </div>

            <!-- Bottom Controls -->
            <div class="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 p-4 space-y-2">
                <!-- Progress Bar -->
                <div ref="progressRef"
                    class="group/progress relative h-1 hover:h-2 w-full bg-white/30 cursor-pointer rounded-full transition-all"
                    @click.stop="seek" @mousemove.stop="handleProgressHover" @mouseleave="progressHoverWidth = 0">
                    <div class="absolute inset-0 rounded-full bg-white/10 transition-all"
                        :style="{ width: `${progressHoverWidth}%` }" />
                    <div class="absolute h-full bg-primary rounded-full transition-all"
                        :style="{ width: `${(currentTime / duration) * 100}%` }" />
                </div>

                <!-- Controls -->
                <div class="flex items-center justify-between gap-4">
                    <!-- Left Controls -->
                    <div class="flex items-center gap-4">
                        <Button variant="ghost" size="icon" class="text-white hover:bg-white/20"
                            @click.stop="togglePlay">
                            <Play v-if="!isPlaying" class="size-5" />
                            <Pause v-else class="size-5" />
                        </Button>

                        <!-- Volume Control -->
                        <div class="group relative flex items-center">
                            <Button variant="ghost" size="icon" class="text-white hover:bg-white/20"
                                @click.stop="toggleMute">
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
                    <!-- // TODO: add chrome cast and theater mode -->
                    <div class="flex items-center gap-4">
                        <div>
                            <Button variant="ghost" size="icon" class="text-white hover:bg-white/20">
                                <SkipBack class="size-5" />
                            </Button>

                            <Button variant="ghost" size="icon" class="text-white hover:bg-white/20">
                                <SkipForward class="size-5" />
                            </Button>
                        </div>

                        <Popover @mouseover="isInteracting = true" @mouseleave="isInteracting = false">
                            <PopoverTrigger>
                                <Button variant="ghost" size="icon" class="text-white hover:bg-white/20">
                                    <Settings class="size-5" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-64 p-3" side="top">
                                <div class="space-y-4">
                                    <h4 class="font-medium mb-2">Configurações</h4>

                                    <!-- Qualidade -->
                                    <div class="space-y-2">
                                        <Label>Qualidade</Label>
                                        <select v-model="videoSettings.quality"
                                            class="w-full h-8 rounded-md border bg-background px-3 text-sm">
                                            <option v-for="quality in qualities" :key="quality" :value="quality">
                                                {{ quality }}
                                            </option>
                                        </select>
                                    </div>

                                    <!-- Loop -->
                                    <div class="flex items-center justify-between">
                                        <Label>Loop</Label>
                                        <Switch :checked="videoSettings.loop"
                                            @update:checked="updateSetting('loop', $event)" />
                                    </div>

                                    <!-- Autoplay -->
                                    <div class="flex items-center justify-between">
                                        <Label>Autoplay</Label>
                                        <Switch :checked="videoSettings.autoplay"
                                            @update:checked="updateSetting('autoplay', $event)" />
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>

                        <Button variant="ghost" size="icon" class="text-white hover:bg-white/20"
                            @click.stop="toggleFullscreen">
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
