import { ref, onMounted, onBeforeUnmount } from 'vue';

export interface VideoSettings {
    autoplay: boolean;
    loop: boolean;
    quality: string;
}

// @ts-ignore
export function useVideoPlayer(src: string, autoplay: boolean = false) {
    const videoRef = ref<HTMLVideoElement | null>(null);
    const containerRef = ref<HTMLDivElement | null>(null);
    const progressRef = ref<HTMLDivElement>();

    // Player states
    const isPlaying = ref(false);
    const isFullscreen = ref(false);
    const currentTime = ref(0);
    const duration = ref(0);
    const volume = ref(1);
    const isMuted = ref(false);
    const isLoading = ref(true);
    const showControls = ref(true);
    const progressHoverWidth = ref(0);
    const isControlsVisible = ref(true);
    const isInteracting = ref(false);

    // Video settings
    const videoSettings = ref<VideoSettings>({
        autoplay,
        loop: false,
        quality: '1080p',
    });

    let hideControlsTimer: ReturnType<typeof setTimeout>;

    // Playback controls
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
            console.error('Erro na reprodução:', error);
        }
    };

    // Progress controls
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
    };

    // Volume controls
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

    // Fullscreen controls
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

    // Time formatting
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    // Progress hover
    const handleProgressHover = (e: MouseEvent) => {
        if (!progressRef.value) return;
        const rect = progressRef.value.getBoundingClientRect();
        const position = (e.clientX - rect.left) / rect.width;
        progressHoverWidth.value = position * 100;
    };

    // Controls visibility
    const handleMouseMove = () => {
        isControlsVisible.value = true;
        isInteracting.value = true;
        clearTimeout(hideControlsTimer);

        if (isPlaying.value) {
            hideControlsTimer = setTimeout(() => {
                isControlsVisible.value = false;
                isInteracting.value = false;
            }, 3000);
        }
    };

    // Keyboard controls
    const handleKeyPress = (e: KeyboardEvent) => {
        if (!videoRef.value) return;
        const tagName =
            e.target instanceof HTMLElement
                ? e.target.tagName.toLowerCase()
                : '';

        if (tagName === 'input' || tagName === 'textarea') return;

        switch (e.key.toLowerCase()) {
            // @ts-ignore
            case ' ':
                if (tagName === 'button') return;
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

    // Video settings
    const updateSetting = <K extends keyof VideoSettings>(
        key: K,
        value: VideoSettings[K]
    ) => {
        videoSettings.value[key] = value;
        if (key === 'loop' && videoRef.value) {
            videoRef.value.loop = value as boolean;
        }
    };

    // Lifecycle hooks
    onMounted(() => {
        if (!videoRef.value) return;

        const video = videoRef.value;
        video.addEventListener('loadedmetadata', () => {
            isLoading.value = false;
            duration.value = video.duration;
        });
        video.addEventListener('timeupdate', updateProgress);
        video.addEventListener('play', () => (isPlaying.value = true));
        video.addEventListener('pause', () => (isPlaying.value = false));

        window.addEventListener('keydown', handleKeyPress);

        video.load();
    });

    onBeforeUnmount(() => {
        clearTimeout(hideControlsTimer);
        window.removeEventListener('keydown', handleKeyPress);

        if (videoRef.value) {
            const video = videoRef.value;
            video.removeEventListener('loadedmetadata', () => {});
            video.removeEventListener('timeupdate', updateProgress);
            video.removeEventListener('play', () => {});
            video.removeEventListener('pause', () => {});
        }
    });

    return {
        // Refs
        videoRef,
        containerRef,
        progressRef,

        // States
        isPlaying,
        isFullscreen,
        currentTime,
        duration,
        volume,
        isMuted,
        isLoading,
        showControls,
        progressHoverWidth,
        isControlsVisible,
        isInteracting,
        videoSettings,

        // Methods
        togglePlay,
        seek,
        toggleMute,
        setVolume,
        toggleFullscreen,
        formatTime,
        handleProgressHover,
        handleMouseMove,
        updateSetting,
    };
}
