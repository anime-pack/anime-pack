<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Monitor, Palette, Info, PersonStanding } from 'lucide-vue-next';
import { DesktopSection, AppearanceSection, AboutSection } from '@/components/layout/Settings';
import { cn } from '@/lib/utils';
import AccessibilitySection from '@/components/layout/Settings/AccessibilitySection.vue';

const route = useRoute();
const router = useRouter();

const sections = [
    { id: 'desktop', label: 'Desktop', icon: Monitor, component: DesktopSection },
    { id: 'accessibility', label: 'Accessibility', icon: PersonStanding, component: AccessibilitySection },
    { id: 'appearance', label: 'Appearance', icon: Palette, component: AppearanceSection },
    { id: 'about', label: 'About', icon: Info, component: AboutSection },
];

// Valida se o tab da URL é uma seção válida
const initialSection = computed(() => {
    const tab = route.query.tab as string;
    return sections.some(s => s.id === tab) ? tab : 'desktop';
});

const currentSection = ref(initialSection.value);

// Atualiza a URL quando a seção muda
const changeSection = (sectionId: string) => {
    currentSection.value = sectionId;
    router.push({ query: { tab: sectionId } });
    console.log(route)
};
</script>

<template>
    <div class="flex min-h-0 flex-1">
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
        <main class="flex-1 min-h-[calc(90vh-2px)] overflow-y-auto px-8 pt-9">
            <div class="mx-auto max-w-4xl pb-14">
                <component :is="sections.find(s => s.id === currentSection)?.component" />
            </div>
        </main>
    </div>
</template>