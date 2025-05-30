<script setup lang="ts">
import { ChevronRight, Info, PlayCircle } from 'lucide-vue-next';
import { toast } from 'vue-sonner'
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import NavHeader from './NavHeader.vue';
</script>

<template>
    <div class="h-full w-full overflow-y-auto overflow-x-hidden bg-background">
        <NavHeader />

        <!-- Hero Section -->
        <section class="relative h-[80vh] w-full">
            <div class="absolute inset-0 bg-[url('https://placehold.co/1000x800.png')] bg-cover bg-center">
                <div class="absolute inset-0 bg-gradient-to-r from-background/90 to-background/20" />
                <div class="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>

            <div class="relative z-10 flex h-full flex-col justify-end gap-4 p-6 sm:p-12">
                <h1 class="text-4xl font-bold sm:text-6xl max-w-2xl">Título do Anime em Destaque</h1>
                <p class="text-muted-foreground max-w-2xl line-clamp-3">
                    Uma breve descrição do anime em destaque, destacando seus principais pontos e atrativos para o
                    espectador.
                </p>
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

        <!-- Sections de Conteúdo -->
        <div class="space-y-8 pb-12">
            <section class="px-6">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-2xl font-semibold">Continuar Assistindo</h2>
                    <Button variant="ghost" class="gap-2">
                        Ver Mais
                        <ChevronRight class="size-4" />
                    </Button>
                </div>
                <Carousel>
                    <CarouselContent>
                        <CarouselItem v-for="(_, index) in 10" :key="index" class="basis-[250px] sm:basis-[300px]">
                            <Card class="relative aspect-video overflow-hidden">
                                <div class="absolute inset-0 bg-muted animate-pulse" />
                            </Card>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </section>

            <section class="px-6">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-2xl font-semibold">Lançamentos da Temporada</h2>
                    <Button variant="ghost" class="gap-2">
                        Ver Mais
                        <ChevronRight class="size-4" />
                    </Button>
                </div>
                <Carousel>
                    <CarouselContent>
                        <CarouselItem v-for="(_, index) in 10" :key="index" class="basis-[200px]">
                            <Card class="relative aspect-[3/4] overflow-hidden">
                                <div class="absolute inset-0 bg-muted animate-pulse" />
                            </Card>
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>
            </section>
        </div>
    </div>
</template>