<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Heart, History, Star, List, Search as SearchIcon, Eye, ChevronRight } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import { InterestSection, RatingsSection, FavoritesSection, SearchHistorySection, RecentAnimesSection } from '@/components/layout/library';

const route = useRoute();
const router = useRouter();

const sections = [
    { id: 'favorites', label: 'Favorites', icon: Heart, component: FavoritesSection },
    { id: 'watchlist', label: 'Interest List', icon: List, component: InterestSection },
    {
        id: 'activity', label: 'Activity', icon: History, children: [
            { id: 'recent-animes', label: 'Recently Viewed', icon: Eye, component: RecentAnimesSection },
            { id: 'search-history', label: 'Search History', icon: SearchIcon, component: SearchHistorySection },
        ]
    },
    { id: 'rated', label: 'Ratings', icon: Star, component: RatingsSection },
];

// Valida se o tab da URL é uma seção válida
const initialSection = computed(() => {
    const tab = route.query.tab as string;
    const isValidTab = sections.some(s => {
        if (s.children) {
            return s.children.some(child => child.id === tab);
        }
        return s.id === tab;
    });
    return isValidTab ? tab : 'favorites';
});

const currentSection = ref(initialSection.value);
const expandedSections = ref<string[]>([]);

// Move a função getButtonClasses para antes de ser usada no template
const getButtonClasses = (section: typeof sections[0]) => {
    const isActive = section.children
        ? section.children.some(child => child.id === currentSection.value)
        : currentSection.value === section.id;

    const isExpanded = section.children && expandedSections.value.includes(section.id);

    return cn({
        'bg-accent': isActive,
        'hover:bg-accent/50': isExpanded && !isActive,
        'bg-accent/10': isExpanded && !isActive,
        'text-muted-foreground': !isActive && !isExpanded
    });
};

// Atualiza a URL quando a seção muda
const toggleSection = (sectionId: string) => {
    const index = expandedSections.value.indexOf(sectionId);
    if (index === -1) {
        expandedSections.value.push(sectionId);
    } else {
        expandedSections.value.splice(index, 1);
    }
};

const changeSection = (sectionId: string, section?: typeof sections[0]) => {
    if (section?.children) {
        toggleSection(sectionId);
        return;
    }
    // Verifica se é uma seção filha válida antes de atualizar
    const isValidSection = sections.some(s => {
        if (s.children) {
            return s.children.some(child => child.id === sectionId);
        }
        return s.id === sectionId && !s.children;
    });

    if (isValidSection) {
        currentSection.value = sectionId;
        router.push({ query: { tab: sectionId } });
    }
};

const getCurrentComponent = computed(() => {
    // Procura primeiro nas seções principais
    const mainSection = sections.find(s => s.id === currentSection.value);
    if (mainSection?.component) {
        return mainSection.component;
    }

    // Se não encontrou, procura nas subseções
    const parentSection = sections.find(s => s.children?.some(child => child.id === currentSection.value));
    if (parentSection) {
        const childSection = parentSection.children?.find(child => child.id === currentSection.value);
        return childSection?.component;
    }

    return null;
});
</script>

<template>
    <div class="flex h-screen select-none">
        <!-- Sidebar -->
        <aside class="w-64 shrink-0 border-r bg-card">
            <nav class="sticky top-0 p-4 space-y-1">
                <template v-for="section in sections" :key="section.id">
                    <button @click="changeSection(section.id, section)"
                        class="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                        :class="getButtonClasses(section)">
                        <span class="flex items-center gap-3">
                            <component :is="section.icon" class="size-4" />
                            {{ section.label }}
                        </span>
                        <ChevronRight v-if="section.children" class="size-4 transition-transform"
                            :class="expandedSections.includes(section.id) ? 'rotate-90' : ''" />
                    </button>
                    <!-- Child Options -->
                    <Transition enter-active-class="transition-all duration-300 ease-out"
                        enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0"
                        leave-active-class="transition-all duration-200 ease-in"
                        leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
                        <div v-if="section.children && expandedSections.includes(section.id)"
                            class="ml-6 mt-1 space-y-1 border-l pl-2">
                            <button v-for="child in section.children" :key="child.id" @click="changeSection(child.id)"
                                class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                                :class="cn({
                                    'bg-accent': currentSection === child.id,
                                    'text-muted-foreground': currentSection !== child.id
                                })">
                                <component :is="child.icon" class="size-4" />
                                {{ child.label }}
                            </button>
                        </div>
                    </Transition>
                </template>
            </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 min-h-0 overflow-y-auto px-8 py-6">
            <div class="mx-auto max-w-4xl">
                <component v-if="getCurrentComponent" :is="getCurrentComponent" />
                <div v-else class="flex flex-col items-center justify-center h-full space-y-2">
                    <p class="text-lg text-muted-foreground">Esta seção está em desenvolvimento</p>
                    <p class="text-sm text-muted-foreground">Volte em breve!</p>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
    transition: all 0.3s ease-in-out;
    overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>
