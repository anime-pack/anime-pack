<script setup lang="ts">
import { NavHeader } from '@/components/layout/Main';
import { RouterView } from 'vue-router';
</script>

<template>
    <div class="flex h-screen">
        <div class="flex h-full w-full flex-col bg-background">
            <NavHeader />
            <div class="flex-1 overflow-y-auto">
                <RouterView />
            </div>
        </div>
    </div>
</template>