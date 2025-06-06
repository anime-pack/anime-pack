<script setup lang="ts">
import { ref } from 'vue';
import { Minus, Expand, Minimize, X } from 'lucide-vue-next';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { useColorMode } from '@vueuse/core';

const currentWindow = getCurrentWindow();

useColorMode({ disableTransition: false })

const checkMaximized = async () => {
    const isMaximized = await currentWindow.isMaximized();
    return isMaximized;
};
const isMaximized = ref<boolean>(checkMaximized());  // TODO: Resolve this promise return
currentWindow.once('tauri://resize', async () => {
    isMaximized.value = await checkMaximized();
});

const minimizeWindow = async () => {
    await currentWindow.minimize();
};
const maximizeWindow = async () => {
    await currentWindow.toggleMaximize();
    isMaximized.value = await checkMaximized();
};
const closeWindow = async () => {
    await currentWindow.close();
};
</script>

<template>
    <div data-tauri-drag-region id="titlebar"
        class="widith-full top-0 z-10 flex h-7 gap-3 items-center bg-muted/50 justify-between">
        <span
            class="hover:text-primary font-bold transition-colors slide-in-from-left duration-300 pl-3 animate-in fade-in-5">
            <p>Anime Pack</p>
        </span>
        <div class="flex items-center h-full">
            <div
                @click="minimizeWindow"
                class="fit-content hover:bg-zinc-700 h-full aspect-1/1 items-center flex justify-center"
            >
                <Minus class="size-4" />
            </div>
            <div
                @click="maximizeWindow"
                class="fit-content hover:bg-zinc-700 h-full aspect-1/1 items-center flex justify-center"
            >
                <Minimize v-if="isMaximized" class="size-4" />
                <Expand v-else class="size-4" />
            </div>
            <div
                @click="closeWindow"
                class="fit-content hover:bg-red-500 h-full aspect-1/1 items-center flex justify-center"
            >
                <X class="size-4" />
            </div>
        </div>
    </div>
</template>