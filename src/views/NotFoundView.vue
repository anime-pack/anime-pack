<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
    <div class="flex flex-1 items-center justify-center flex-col">
        <h1 class="text-4xl font-bold mb-4">
            Woops! Page Not Found
        </h1>
        <p class="text-xl">Seems that you should not be here...</p>
        <Button @click="() => router.go(-1)" class="mt-2">Go back</Button>
    </div>
</template>
