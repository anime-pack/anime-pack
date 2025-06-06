<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { invoke } from '@tauri-apps/api/core';
import type { AnimeItem } from '@/types/anime';
import {
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

const route = useRoute();
const anime = ref<AnimeItem | null>(null);
const isLoading = ref(true);
const isLiked = ref(false);

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

const toggleLike = () => {
    isLiked.value = !isLiked.value;
};
</script>

<template>
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
                <header class="flex flex-col gap-4 max-w-3xl translate-y-8">
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
                        <Button size="lg" class="gap-2">
                            <PlayCircle class="size-5" />
                            Assistir
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
        <main class="relative z-10 flex-1 bg-background p-6">
            <!-- Content Tabs -->
            <Tabs defaultValue="info" class="w-full">
                <TabsList>
                    <TabsTrigger value="info">Informações</TabsTrigger>
                    <!-- <TabsTrigger value="episodes">Episódios</TabsTrigger> -->
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
                            <!-- // TODO: work on the seasons apisodes etc -->
                            <AccordionItem v-for="season in anime.seasons" :key="season.year"
                                :value="season.year.toString()">
                                <AccordionTrigger>
                                    Temporada {{ season.year }}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div class="grid gap-2">
                                        <div v-for="episode in season.episodes" :key="episode.mal_id"
                                            class="flex items-center justify-between rounded-lg border p-3 hover:bg-muted">
                                            <div>
                                                <span class="font-medium">Episódio {{ episode.number }}</span>
                                                <p class="text-sm text-muted-foreground">{{ episode.title }}</p>
                                            </div>
                                            <Button variant="ghost" size="sm">
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
