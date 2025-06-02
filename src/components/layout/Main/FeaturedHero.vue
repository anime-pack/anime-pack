<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Info, PlayCircle } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';

interface FeaturedAnime {
    id: string;
    title: string;
    description: string;
    coverUrl: string;
}

// Mock data
const featuredAnimes = ref<FeaturedAnime[]>([
    {
        id: '1',
        title: 'Demon Slayer: Kimetsu no Yaiba',
        description: 'Tanjiro Kamado é um jovem que vive uma vida pacífica nas montanhas, até que sua família é brutalmente assassinada e sua irmã transformada em demônio.',
        coverUrl: 'https://www.navitoworld.com/cdn/shop/files/004_55c73005-bb7b-463f-888e-fcfa1fd0b751_1000x.jpg?v=1690530177'
    },
    {
        id: '2',
        title: 'Jujutsu Kaisen',
        description: 'Yuji Itadori é um estudante do ensino médio que se junta a uma organização secreta de feiticeiros para eliminar uma poderosa maldição.',
        coverUrl: 'https://cdn.salla.sa/maZE/8545eaf0-a676-485b-9a11-a1831512c2ce-1000x800-VwsBifr76IxEkPd6cB6isqGOzBiH3jhNLaVECZK6.jpg'
    },
]);

const currentIndex = ref(0);
const intervalId = ref<number>();

const nextAnime = () => {
    currentIndex.value = (currentIndex.value + 1) % featuredAnimes.value.length;
};

onMounted(() => {
    intervalId.value = setInterval(nextAnime, 8000);
});

onUnmounted(() => {
    if (intervalId.value) clearInterval(intervalId.value);
});

const currentAnime = computed(() => featuredAnimes.value[currentIndex.value]);
</script>

<template>
    <section class="relative h-[80vh] w-full">
        <TransitionGroup name="fade">
            <div v-for="(anime, index) in featuredAnimes" :key="anime.id"
                v-show="index === currentIndex"
                class="absolute inset-0 transition-opacity duration-1000 bg-no-repeat bg-cover bg-center"
                :style="{ backgroundImage: `url(${anime.coverUrl})` }"
                :class="{ 'opacity-0': index !== currentIndex }">
                <div class="absolute inset-0 bg-gradient-to-r from-background/90 to-background/20" />
                <div class="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>
        </TransitionGroup>

        <div class="relative z-10 flex h-full flex-col justify-end gap-4 p-6 sm:p-12">
            <TransitionGroup name="slide-fade">
                <h1 :key="`title-${currentAnime.id}`" 
                    class="text-4xl font-bold sm:text-6xl max-w-7xl">
                    {{ currentAnime.title }}
                </h1>
                <p :key="`desc-${currentAnime.id}`" 
                    class="text-muted-foreground max-w-2xl line-clamp-3">
                    {{ currentAnime.description }}
                </p>
            </TransitionGroup>
            
            <div class="flex gap-4">
                <Button size="lg" class="gap-2">
                    <PlayCircle class="size-5" />
                    Assistir
                </Button>
                <Button size="lg" variant="outline" class="gap-2">
                    <Info class="size-5" />
                    Mais Informações
                </Button>
            </div>
        </div>
    </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.5s ease;
}

.slide-fade-enter-from {
    transform: translateY(20px);
    opacity: 0;
}

.slide-fade-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}
</style>
