<script setup lang="ts">
import { Info, PlayCircle } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';

</script>

<template>
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
</template>
