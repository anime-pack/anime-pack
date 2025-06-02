<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-vue-next';
</script>

<template>
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
</template>
