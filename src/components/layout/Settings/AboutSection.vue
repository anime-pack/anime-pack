<script setup lang="ts">
import { invoke } from '@tauri-apps/api/core';
import { Icon } from '@iconify/vue';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart } from 'lucide-vue-next';

const version = '0.1.0'; // TODO: get from package.json
const socialLinks = [
    { name: 'GitHub', icon: 'fa6-brands:github', url: 'https://github.com/anime-pack/anime-pack' },
    { name: 'Discord', icon: 'fa6-brands:discord', url: 'https://discord.gg/Nv8UXpB36y' }
];

const openUrl = (url: string) => invoke<void>('open_url', { url });
</script>

<template>
    <div class="space-y-6">
        <!-- App Info -->
        <Card>
            <CardContent class="pt-6">
                <div class="flex items-start justify-between">
                    <div class="space-y-1">
                        <h2 class="text-2xl font-bold tracking-tight">Anime Pack</h2>
                        <p class="text-sm text-muted-foreground">Version {{ version }}</p>
                    </div>
                    <div class="flex gap-2">
                        <Badge v-for="link in socialLinks" :key="link.name" variant="secondary"
                            class="cursor-pointer hover:bg-muted-foreground/20" @click="() => openUrl(link.url)">
                            <Icon :icon="link.icon" class="size-5" />
                        </Badge>
                    </div>
                </div>

                <Separator class="my-6" />

                <!-- App Description -->
                <div class="space-y-4">
                    <div>
                        <h3 class="font-semibold mb-2">O que é o Anime Pack?</h3>
                        <p class="text-sm text-muted-foreground leading-relaxed">
                            Anime Pack é um cliente desktop para MyAnimeList que oferece uma experiência
                            integrada e moderna para gerenciar sua lista de animes. Com recursos como
                            playlists personalizadas, compartilhamento social e muito mais.
                        </p>
                    </div>

                    <!-- Features -->
                    <div>
                        <h3 class="font-semibold mb-2">Recursos</h3>
                        <ul class="grid gap-2 text-sm text-muted-foreground">
                            <li class="flex items-center gap-2">
                                <Icon icon="lucide:check" class="size-4 text-primary" />
                                Integração com MyAnimeList
                            </li>
                            <li class="flex items-center gap-2">
                                <Icon icon="lucide:check" class="size-4 text-primary" />
                                Player de vídeo personalizado
                            </li>
                            <li class="flex items-center gap-2">
                                <Icon icon="lucide:check" class="size-4 text-primary" />
                                Sistema de playlists
                            </li>
                            <li class="flex items-center gap-2">
                                <Icon icon="lucide:check" class="size-4 text-primary" />
                                Temas personalizáveis
                            </li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- Legal & Credits -->
        <Card>
            <CardContent class="pt-6 space-y-4">
                <h3 class="font-semibold">Informações Legais</h3>
                <div class="text-sm text-muted-foreground space-y-2">
                    <p>© 2024 Anime Pack. Todos os direitos reservados.</p>
                    <p>
                        Desenvolvido com
                        <Heart class="size-4 inline-block fill-destructive text-destructive" />
                        por
                        <a href="#" class="text-primary hover:underline"
                            @click="() => openUrl('https://github.com/anime-pack')">
                            Anime Pack Team
                        </a>
                    </p>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
