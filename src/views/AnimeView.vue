<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { invoke } from '@tauri-apps/api/core';
import { useLibraryStore } from '@/stores/library';
import type { AnimeItemFull } from '@/types/anime';
import {
    ArrowLeft,
    Calendar,
    Star,
    Clock,
    Users,
    Activity,
    PlayCircle,
    Heart
} from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs';

interface Episode {
    number: number;
    title: string;
    duration: number; // em segundos
}

interface Season {
    number: number;
    year: number;
    episodes: Episode[];
}

const mockSeasons: Season[] = [
    {
        number: 1,
        year: 2020,
        episodes: Array.from({ length: 12 }, (_, i) => ({
            number: i + 1,
            title: `Episode ${i + 1}`,
            duration: 1440 // 24 minutos
        }))
    },
    {
        number: 2,
        year: 2021,
        episodes: Array.from({ length: 13 }, (_, i) => ({
            number: i + 1,
            title: `Episode ${i + 1}`,
            duration: 1440
        }))
    }
];

const route = useRoute();
const router = useRouter();
const libraryStore = useLibraryStore();
const anime = ref<AnimeItemFull | null>(null);
const isLoading = ref(true);

const isLiked = computed(() =>
    anime.value ? libraryStore.isAnimeLiked(anime.value.mal_id) : false
);

onMounted(async () => {
    try {
        const response = await invoke<AnimeItemFull>('anime_full', {
            id: Number(route.params.id)
        });
        anime.value = response;

        // Adicionar aos recentemente vistos com a nova estrutura
        if (anime.value) {
            libraryStore.addViewedAnime({
                animeData: anime.value,
                watch: null // Inicialmente sem episódio assistido
            });
        }
    } catch (error) {
        console.error('Error fetching anime:', error);
    } finally {
        isLoading.value = false;
    }
});

const toggleLike = () => {
    if (anime.value) {
        libraryStore.toggleLikeAnime(anime.value);
    }
};
const handleWatch = () => {
    if (anime.value) router.push(`/watch/${anime.value.mal_id}`);
}
</script>

<template>
    <Button variant="ghost" class="absolute left-6 top-6 z-50" @click="router.back()">
        <ArrowLeft class="size-5" />
    </Button>

    <div v-if="isLoading" class="flex h-full items-center justify-center">
        <div class="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
    </div>

    <div v-else-if="anime" class="flex flex-col">
        <!-- Hero Section com Background -->
        <section class="relative h-[60vh] w-full">
            <!-- Background Image -->
            <div class="absolute inset-0">
                <img :src="anime.images.webp.large_image_url" :alt="anime.title"
                    class="h-full w-full object-cover object-top" />
                <!-- Gradientes atualizados -->
                <div class="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent" />
                <div class="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
                <div class="absolute inset-0 bg-gradient-to-b from-background/50 to-transparent" />
            </div>

            <!-- Hero Content -->
            <div class="relative h-full flex flex-col justify-end pb-12 px-6 sm:px-12">
                <header class="flex flex-col gap-4 max-w-5xl translate-y-8">
                    <!-- Title & Japanese Title -->
                    <div class="flex items-center gap-4">
                        <h1 class="text-4xl font-bold">{{ anime.title }}</h1>
                        <span class="text-lg text-muted-foreground">({{ anime.title_japanese }})</span>
                    </div>

                    <!-- Quick Info -->
                    <div class="flex flex-wrap gap-4 text-sm">
                        <div class="flex items-center gap-2">
                            <Star class="size-4 text-primary" />
                            <span>{{ anime.score }} ({{ anime.scored_by }} votos)</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <Calendar class="size-4" />
                            <span>{{ anime.year || anime.aired.prop.from.year || 'unavailable' }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <Clock class="size-4" />
                            <span>{{ anime.duration }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <Users class="size-4" />
                            <span>{{ anime.members }} membros</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <Activity class="size-4" />
                            <span>{{ anime.status }}</span>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex gap-4">
                        <Button size="lg" class="gap-2" @click="handleWatch">
                            <PlayCircle class="size-5" />
                            Watch
                        </Button>
                        <Button size="lg" variant="outline" class="gap-2" @click="toggleLike">
                            <Heart class="size-5 transition-colors duration-300"
                                :class="{ 'fill-destructive text-destructive': isLiked }" />
                        </Button>
                    </div>
                </header>
            </div>
        </section>

        <!-- Main Content -->
        <main class="relative flex-1 bg-background p-6">
            <!-- Content Tabs -->
            <Tabs defaultValue="info" class="w-full">
                <TabsList>
                    <TabsTrigger value="info">Informações</TabsTrigger>
                    <TabsTrigger value="episodes">Episódios</TabsTrigger>
                </TabsList>

                <TabsContent value="info" class="mt-6">
                    <div class="grid gap-6 md:grid-cols-2">
                        <!-- Synopsis -->
                        <div class="flex flex-col gap-2">
                            <h2 class="text-xl font-semibold">Sinopse</h2>
                            <p class="text-muted-foreground">{{ anime.synopsis }}</p>
                        </div>

                        <!-- Details -->
                        <div class="flex flex-col gap-4">
                            <h2 class="text-xl font-semibold">Detalhes</h2>
                            <dl class="grid gap-2">
                                <div class="grid grid-cols-2">
                                    <dt class="font-medium">Tipo</dt>
                                    <dd class="text-muted-foreground">{{ anime.type }}</dd>
                                </div>
                                <div class="grid grid-cols-2">
                                    <dt class="font-medium">Gêneros</dt>
                                    <dd class="text-muted-foreground">
                                        {{anime.genres?.map(g => g.name).join(', ')}}
                                    </dd>
                                </div>
                                <div class="grid grid-cols-2">
                                    <dt class="font-medium">Estúdios</dt>
                                    <dd class="text-muted-foreground">
                                        {{anime.studios?.map(s => s.name).join(', ')}}
                                    </dd>
                                </div>
                                <div class="grid grid-cols-2">
                                    <dt class="font-medium">Fonte</dt>
                                    <dd class="text-muted-foreground">{{ anime.source }}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="episodes" class="mt-6">
                    <ScrollArea className="h-[500px] rounded-md border p-4">
                        <Accordion type="single" collapsible>
                            <AccordionItem v-for="season in mockSeasons" :key="season.year"
                                :value="season.number.toString()">
                                <AccordionTrigger>
                                    Temporada {{ season.number }} ({{ season.year }})
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div class="grid gap-2">
                                        <div v-for="episode in season.episodes" :key="episode.number"
                                            class="flex items-center justify-between rounded-lg border p-3 hover:bg-muted">
                                            <div>
                                                <span class="font-medium">Episódio {{ episode.number }}</span>
                                                <p class="text-sm text-muted-foreground">{{ episode.title }}</p>
                                            </div>
                                            <Button variant="ghost" size="sm"
                                                @click="router.push(`/watch/${anime?.mal_id}?episode=${episode.number}`)">
                                                <PlayCircle class="size-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </main>
    </div>

    <div v-else class="flex h-full items-center justify-center">
        <p class="text-muted-foreground">Anime não encontrado</p>
    </div>
</template>
