<script setup lang="ts">
import { ref } from 'vue';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
    Eye,
    Type,
    ScrollText,
    Keyboard,
    RotateCcw
} from 'lucide-vue-next';

const settings = ref({
    reduceMotion: false,
    highContrast: false,
    subtitlesEnabled: true,
    fontScale: [1],
    autoplay: true,
    keyboardShortcuts: true
});

const resetSettings = () => {
    settings.value = {
        reduceMotion: false,
        highContrast: false,
        subtitlesEnabled: true,
        fontScale: [1],
        autoplay: true,
        keyboardShortcuts: true
    };
};
</script>

<template>
    <div class="space-y-6">
        <!-- Visual Settings -->
        <Card>
            <CardContent class="p-6 space-y-6">
                <div class="flex items-center gap-2">
                    <Eye class="size-5" />
                    <h3 class="font-semibold">Configurações Visuais</h3>
                </div>

                <div class="space-y-4">
                    <!-- Font Scale -->
                    <div class="space-y-2">
                        <div class="flex items-center justify-between">
                            <Label>Tamanho da Fonte</Label>
                            <span class="text-sm text-muted-foreground">{{ settings.fontScale[0] }}x</span>
                        </div>
                        <Slider v-model="settings.fontScale" :min="0.8" :max="1.4" :step="0.1" class="w-full" />
                    </div>

                    <!-- High Contrast -->
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <Label>Alto Contraste</Label>
                            <p class="text-sm text-muted-foreground">
                                Aumenta o contraste do texto e elementos visuais
                            </p>
                        </div>
                        <Switch v-model:checked="settings.highContrast" />
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- Motion Settings -->
        <Card>
            <CardContent class="p-6 space-y-6">
                <div class="flex items-center gap-2">
                    <ScrollText class="size-5" />
                    <h3 class="font-semibold">Movimento e Interação</h3>
                </div>

                <div class="space-y-4">
                    <!-- Reduce Motion -->
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <Label>Reduzir Movimento</Label>
                            <p class="text-sm text-muted-foreground">
                                Minimiza animações e transições
                            </p>
                        </div>
                        <Switch v-model:checked="settings.reduceMotion" />
                    </div>

                    <!-- Autoplay -->
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <Label>Reprodução Automática</Label>
                            <p class="text-sm text-muted-foreground">
                                Inicia automaticamente o próximo episódio
                            </p>
                        </div>
                        <Switch v-model:checked="settings.autoplay" />
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- Subtitles & Keyboard -->
        <Card>
            <CardContent class="p-6 space-y-6">
                <div class="flex items-center gap-2">
                    <Type class="size-5" />
                    <h3 class="font-semibold">Legendas e Controles</h3>
                </div>

                <div class="space-y-4">
                    <!-- Subtitles -->
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <Label>Legendas</Label>
                            <p class="text-sm text-muted-foreground">
                                Exibir legendas quando disponíveis
                            </p>
                        </div>
                        <Switch v-model:checked="settings.subtitlesEnabled" />
                    </div>

                    <!-- Keyboard Shortcuts -->
                    <div class="flex items-center justify-between">
                        <div class="space-y-0.5">
                            <div class="flex items-center gap-2">
                                <Label>Atalhos de Teclado</Label>
                                <Keyboard class="size-4 text-muted-foreground" />
                            </div>
                            <p class="text-sm text-muted-foreground">
                                Habilitar controles pelo teclado
                            </p>
                        </div>
                        <Switch v-model:checked="settings.keyboardShortcuts" />
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- Reset Section -->
        <div class="flex items-center justify-between px-2">
            <div class="space-y-0.5">
                <Label>Redefinir Configurações</Label>
                <p class="text-sm text-muted-foreground">
                    Restaurar todas as configurações para o padrão
                </p>
            </div>
            <Button variant="outline" size="sm" @click="resetSettings">
                <RotateCcw class="size-4 mr-2" />
                Redefinir
            </Button>
        </div>
    </div>
</template>
