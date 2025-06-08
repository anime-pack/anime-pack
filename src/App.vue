<script setup lang="ts">
import Titlebar from './Titlebar.vue';
import {RouterView} from 'vue-router';
import { Toaster } from '@/components/ui/sonner';
import 'vue-sonner/style.css';
import { useColorMode } from '@vueuse/core';

const mode = useColorMode({ disableTransition: false });
</script>

<template>
    <Toaster expand rich-colors :theme="mode == 'auto' ? 'system' : mode" :visible-toasts="7" class="pointer-events-auto" />
    <div class="flex flex-col h-screen overflow-hidden">
        <Titlebar />
        <RouterView class="flex-1 overflow-auto" />
    </div>
</template>
