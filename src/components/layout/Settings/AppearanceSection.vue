<script setup lang="ts">
import { ref } from 'vue';
import { Monitor, Moon, Sun, Palette } from 'lucide-vue-next';
import ThemeToggler from '@/components/ThemeToggler.vue';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
                        <div>
                            <h3 class="text-lg font-medium">Tema</h3>
                            <p class="text-sm text-muted-foreground">
                                Escolha entre tema claro, escuro ou automático.
                            </p>
                        </div>

                        <RadioGroup defaultValue="system" class="grid grid-cols-3 gap-4">
                            <Label
                                class="flex flex-col items-center gap-2 rounded-lg border-2 border-muted bg-popover p-4 
                                hover:bg-accent hover:text-accent-foreground [&:has(:checked)]:border-primary cursor-pointer">
                                <RadioGroupItem value="light" class="sr-only" />
                                <Sun class="size-5" />
                                <span class="text-sm">Claro</span>
                            </Label>
                            <Label
                                class="flex flex-col items-center gap-2 rounded-lg border-2 border-muted bg-popover p-4 
                                hover:bg-accent hover:text-accent-foreground [&:has(:checked)]:border-primary cursor-pointer">
                                <RadioGroupItem value="dark" class="sr-only" />
                                <Moon class="size-5" />
                                <span class="text-sm">Escuro</span>
                            </Label>
                            <Label
                                class="flex flex-col items-center gap-2 rounded-lg border-2 border-muted bg-popover p-4 
                                hover:bg-accent hover:text-accent-foreground [&:has(:checked)]:border-primary cursor-pointer">
                                <RadioGroupItem value="system" class="sr-only" />
                                <Monitor class="size-5" />
                                <span class="text-sm">Sistema</span>
                            </Label>
                        </RadioGroup>
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

        <!-- Font Settings -->
        <Card>
            <CardContent class="p-6">
                <div class="space-y-4">
                    <div>
                        <h3 class="text-lg font-medium">Fonte</h3>
                        <p class="text-sm text-muted-foreground">
                            Ajuste o tamanho da fonte do aplicativo.
                        </p>
                    </div>
                    <!-- TODO: Adicionar controle de fonte -->
                </div>
            </CardContent>
        </Card>
    </div>
</template>
