<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Sun, Moon, Monitor } from 'lucide-vue-next'

const mode = useColorMode({ disableTransition: false })
</script>

<template>
    <div class="space-y-6">
        <div class="space-y-2">
            <h3 class="text-lg font-medium">Tema</h3>
            <p class="text-sm text-muted-foreground">
                Selecione o tema da aplicação
            </p>
        </div>
        <RadioGroup v-model="mode" class="grid grid-cols-3 gap-4">
            <div>
                <RadioGroupItem value="light" id="light" class="peer sr-only" />
                <Label for="light"
                    class="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground transition-all"
                    :class="[
                        mode === 'light' ? 'bg-accent/50 border-primary' : 'bg-transparent',
                    ]">
                    <Sun class="mb-3 h-6 w-6" />
                    <span class="text-sm font-medium">Claro</span>
                </Label>
            </div>
            <div>
                <RadioGroupItem value="dark" id="dark" class="peer sr-only" />
                <Label for="dark"
                    class="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground transition-all"
                    :class="[
                        mode === 'dark' ? 'bg-accent/50 border-primary' : 'bg-transparent',
                    ]">
                    <Moon class="mb-3 h-6 w-6" />
                    <span class="text-sm font-medium">Escuro</span>
                </Label>
            </div>
            <div>
                <RadioGroupItem value="auto" id="system" class="peer sr-only" />
                <Label for="system"
                    class="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground transition-all"
                    :class="[
                        mode === 'auto' ? 'bg-accent/50 border-primary' : 'bg-transparent',
                    ]">
                    <Monitor class="mb-3 h-6 w-6" />
                    <span class="text-sm font-medium">Sistema</span>
                </Label>
            </div>
        </RadioGroup>
    </div>
</template>