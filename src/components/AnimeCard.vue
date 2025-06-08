<script setup lang="ts">
import { Star } from 'lucide-vue-next';
import type { AnimeItem } from '@/types/anime';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps<{
    anime: AnimeItem;
    clickable?: boolean;
}>();

const handleClick = () => {
    if (props.clickable) {
        router.push(`/anime/${props.anime.mal_id}`);
    }
};
</script>

<template>
    <div @click="handleClick" class="group relative overflow-hidden rounded-lg bg-card select-none"
        :class="{ 'cursor-pointer': clickable }">
        <img :src="anime.images.webp.large_image_url" :alt="anime.title"
            class="aspect-[3/4] w-full object-cover transition-transform group-hover:scale-105" />

        <!-- Gradiente permanente para o título -->
        <div class="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90" />

        <!-- Container do conteúdo -->
        <div class="absolute inset-x-0 bottom-0 p-4 flex flex-col gap-2">
            <!-- Título sempre visível -->
            <h3
                class="font-semibold text-card-foreground line-clamp-2 transition-transform duration-200 group-hover:-translate-y-1">
                {{ anime.title }}
            </h3>

            <!-- Info adicional com animação -->
            <div
                class="flex items-center gap-2 text-sm text-muted-foreground transform translate-y-4 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                <div class="flex items-center gap-1">
                    <Star class="size-4 fill-primary text-primary" />
                    <span>{{ anime.score }}</span>
                </div>
                <span>•</span>
                <span>{{ anime.year || anime.aired.prop.from.year }}</span>
                <span>•</span>
                <span>{{ anime.type }}</span>
            </div>
        </div>
    </div>
</template>
