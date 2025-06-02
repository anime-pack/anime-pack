<script setup lang="ts">
import Titlebar from './Titlebar.vue';
import {RouterView} from 'vue-router';
import { Toaster } from '@/components/ui/sonner';
import 'vue-sonner/style.css';
</script>

<template>
    <Toaster class="pointer-events-auto" />
    <div class="flex flex-col h-screen">
        <Titlebar />
        <RouterView />
    </div>
</template>
