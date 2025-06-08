<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Heart, History, Play, Star, List } from 'lucide-vue-next';
import { cn } from '@/lib/utils';

const route = useRoute();
const router = useRouter();

const sections = [
    { id: 'favorites', label: 'Favoritos', icon: Heart },
    { id: 'history', label: 'Histórico de Navegação', icon: History },
    { id: 'watched', label: 'Episódios Assistidos', icon: Play },
    { id: 'watchlist', label: 'Lista de Interesses', icon: List },
    { id: 'rated', label: 'Avaliados', icon: Star },
];

// Valida se o tab da URL é uma seção válida
const initialSection = computed(() => {
    const tab = route.query.tab as string;
    return sections.some(s => s.id === tab) ? tab : 'favorites';
});

const currentSection = ref(initialSection.value);

// Atualiza a URL quando a seção muda
const changeSection = (sectionId: string) => {
    currentSection.value = sectionId;
    router.push({ query: { tab: sectionId } });
};
</script>

<template>
    <div class="flex h-screen">
        <!-- Sidebar -->
        <aside class="w-64 shrink-0 border-r bg-card">
            <nav class="sticky top-0 p-4 space-y-1">
                <button v-for="section in sections" :key="section.id" @click="changeSection(section.id)"
                    class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                    :class="cn({
                        'bg-accent': currentSection === section.id,
                        'text-muted-foreground': currentSection !== section.id
                    })">
                    <component :is="section.icon" class="size-4" />
                    {{ section.label }}
                </button>
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 min-h-0 overflow-y-auto px-8 py-6">
            <div class="mx-auto max-w-4xl">
                <!-- // TODO: Implementar componentes para cada seção -->
                <div class="flex flex-col items-center justify-center h-full space-y-2">
                    <p class="text-lg text-muted-foreground">Esta seção está em desenvolvimento</p>
                    <p class="text-sm text-muted-foreground">Volte em breve!</p>
                </div>
            </div>
        </main>
    </div>
</template>
