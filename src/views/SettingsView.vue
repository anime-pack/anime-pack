<script setup lang="ts">
import { ref } from 'vue';
import { Monitor, Palette, Info } from 'lucide-vue-next';
import { DesktopSection, AppearanceSection, AboutSection } from '@/components/layout/Settings';
import { cn } from '@/lib/utils';

const sections = [
    { id: 'desktop', label: 'Desktop', icon: Monitor, component: DesktopSection },
    { id: 'appearance', label: 'Aparência', icon: Palette, component: AppearanceSection },
    { id: 'about', label: 'Sobre', icon: Info, component: AboutSection },
];

const currentSection = ref('desktop');
</script>

<template>
    <div class="flex h-full">
        <!-- Sidebar -->
        <aside class="w-64 border-r bg-card px-4 py-6">
            <nav class="space-y-1">
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
        <main class="flex-1 px-8 py-6">
            <component :is="sections.find(s => s.id === currentSection)?.component" />
        </main>
    </div>
</template>