<script setup lang="ts">
import { ref } from 'vue';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Bell,
    HardDrive,
    Download,
    Trash2,
    Folder
} from 'lucide-vue-next';

// Estados mockados (TODO: implementar storage real)
const settings = ref({
    notifications: true,
    autoUpdate: false,
    startWithSystem: true,
    downloadPath: 'C:/Users/Username/Downloads',
    cacheSize: '1.2 GB'
});

const clearCache = () => {
    // TODO: Implementar limpeza de cache
    console.log('Limpando cache...');
};
</script>

<template>
    <div class="space-y-6">
        <!-- Notificações -->
        <Card>
            <CardContent class="p-6">
                <div class="flex items-start justify-between">
                    <div class="space-y-1">
                        <div class="flex items-center gap-2">
                            <Bell class="size-5" />
                            <h3 class="font-semibold">Notificações do Sistema</h3>
                        </div>
                        <p class="text-sm text-muted-foreground">
                            Controle como o aplicativo interage com o sistema.
                        </p>
                    </div>
                    <Switch v-model:checked="settings.notifications" />
                </div>

                <div class="mt-6 space-y-4">
                    <div class="flex items-center justify-between">
                        <Label class="font-normal">Iniciar com o sistema</Label>
                        <Switch v-model:checked="settings.startWithSystem" />
                    </div>
                    <div class="flex items-center justify-between">
                        <Label class="font-normal">Atualizações automáticas</Label>
                        <Switch v-model:checked="settings.autoUpdate" />
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- Armazenamento -->
        <Card>
            <CardContent class="p-6 space-y-6">
                <div class="flex items-center gap-2">
                    <HardDrive class="size-5" />
                    <h3 class="font-semibold">Armazenamento</h3>
                </div>

                <div class="space-y-4">
                    <!-- Local de Download -->
                    <div class="flex items-center justify-between gap-4">
                        <div class="space-y-1">
                            <Label>Local dos Downloads</Label>
                            <div class="flex items-center gap-2 text-sm text-muted-foreground">
                                <Folder class="size-4" />
                                <span class="truncate">{{ settings.downloadPath }}</span>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">
                            <Download class="size-4 mr-2" />
                            Alterar
                        </Button>
                    </div>

                    <Separator />

                    <!-- Cache -->
                    <div class="flex items-center justify-between gap-4">
                        <div class="space-y-1">
                            <Label>Cache do Aplicativo</Label>
                            <div class="flex items-center gap-2">
                                <Badge variant="secondary">{{ settings.cacheSize }}</Badge>
                                <span class="text-sm text-muted-foreground">em uso</span>
                            </div>
                        </div>
                        <Button variant="destructive" size="sm" @click="clearCache">
                            <Trash2 class="size-4 mr-2" />
                            Limpar Cache
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
