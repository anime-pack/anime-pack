<script setup lang="ts">
import { NavHeader } from '@/components/layout/Main';
import { RouterView } from 'vue-router';
</script>

<template>
    <div class="flex-1 overflow-hidden">
        <div class="h-full w-full overflow-y-auto overflow-x-hidden bg-background">
            <NavHeader />
            <div class="relative">
                <RouterView />
            </div>
        </div>
    </div>
</template>