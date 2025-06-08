<script setup lang="ts">
import { ref } from 'vue';
import ThemeToggler from '@/components/ThemeToggler.vue';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const colors = [
    { name: 'Zinc', value: 'zinc' },
    { name: 'Slate', value: 'slate' },
    { name: 'Stone', value: 'stone' },
    { name: 'Gray', value: 'gray' },
    { name: 'Neutral', value: 'neutral' },
    { name: 'Red', value: 'red' },
    { name: 'Rose', value: 'rose' },
    { name: 'Orange', value: 'orange' },
    { name: 'Green', value: 'green' },
    { name: 'Blue', value: 'blue' },
    { name: 'Yellow', value: 'yellow' },
    { name: 'Violet', value: 'violet' },
];

const selectedColor = ref('blue');

const applyAccentColor = (color: string) => {
    // TODO: Implementar mudança de cor do tema
    selectedColor.value = color;
};
</script>

<template>
    <div class="space-y-6">
        <Card>
            <CardContent class="p-6">
                <div class="flex flex-col gap-6">
                    <!-- Theme Selection -->
                    <div class="space-y-4">
                        <ThemeToggler />
                    </div>

                    <Separator />

                    <!-- Accent Color -->
                    <div class="space-y-4">
                        <div>
                            <h3 class="text-lg font-medium">Cor de Destaque</h3>
                            <p class="text-sm text-muted-foreground">
                                Personalize a cor principal do aplicativo.
                            </p>
                        </div>

                        <div class="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
                            <Button v-for="color in colors" :key="color.value" variant="outline" :class="[
                                'h-auto gap-2 p-4 flex flex-col items-center justify-center',
                                selectedColor === color.value && 'border-2 border-primary'
                            ]" @click="applyAccentColor(color.value)">
                                <span class="size-6 rounded-full shadow-sm" :class="`bg-${color.value}-500`" />
                                <span class="text-xs">{{ color.name }}</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
