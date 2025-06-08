<script setup lang="ts">
import { ref } from 'vue';
import { Monitor, Palette, Info, PersonStanding } from 'lucide-vue-next';
import { DesktopSection, AppearanceSection, AboutSection } from '@/components/layout/Settings';
import { cn } from '@/lib/utils';
import AccessibilitySection from '@/components/layout/Settings/AccessibilitySection.vue';

const sections = [
    { id: 'desktop', label: 'Desktop', icon: Monitor, component: DesktopSection },
    { id: 'accessibility', label: 'Accessibility', icon: PersonStanding, component: AccessibilitySection },
    { id: 'appearance', label: 'Appearance', icon: Palette, component: AppearanceSection },
    { id: 'about', label: 'About', icon: Info, component: AboutSection },
];

const currentSection = ref('desktop');
</script>

<template>
    <div class="flex min-h-0 flex-1">
        <!-- Sidebar -->
        <aside class="w-64 shrink-0 border-r bg-card">
            <nav class="sticky top-0 p-4 space-y-1">
                <button v-for="section in sections" :key="section.id" @click="currentSection = section.id"
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
        <main class="flex-1 overflow-y-auto px-8 py-6">
            <div class="mx-auto max-w-4xl">
                <component :is="sections.find(s => s.id === currentSection)?.component" />
            </div>
        </main>
    </div>
</template>