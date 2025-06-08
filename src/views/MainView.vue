<script setup lang="ts">
import { NavHeader } from '@/components/layout/Main';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import { RouterView } from 'vue-router';
</script>

<template>
    <div class="flex h-screen">
        <div class="flex h-full w-full flex-col bg-background">
            <NavHeader />
            <ScrollArea class="flex-1 overflow-y-auto">
                <RouterView />
            </ScrollArea>
        </div>
    </div>
</template>