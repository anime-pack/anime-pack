<script setup lang="ts">
import Titlebar from './Titlebar.vue';
import {RouterView} from 'vue-router';
import { Toaster } from '@/components/ui/sonner';
import 'vue-sonner/style.css';
</script>

<template>
    <Toaster expand :visible-toasts="7" class="pointer-events-auto" />
    <div class="flex flex-col h-screen overflow-hidden">
        <Titlebar />
        <RouterView class="flex-1 overflow-auto" />
    </div>
</template>
