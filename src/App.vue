<script setup lang="ts">
import Titlebar from './Titlebar.vue';
import ThemeToggler from '@/components/ThemeToggler.vue';
import MainView from '@/app/MainView.vue';
import { Toaster } from '@/components/ui/sonner';
import 'vue-sonner/style.css';
</script>

<template>
    <Toaster class="pointer-events-auto" />
    <div class="flex flex-col h-screen">
        <Titlebar />
        <!-- <ThemeToggler /> -->
        <div class="flex-1 overflow-hidden">
            <MainView />
        </div>
    </div>
</template>
