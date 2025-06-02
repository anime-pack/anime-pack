<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { ChevronRight } from 'lucide-vue-next';
</script>

<template>
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
</template>
