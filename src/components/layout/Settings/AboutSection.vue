<script setup lang="ts">
import { invoke } from '@tauri-apps/api/core';
import { Icon } from '@iconify/vue';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>About</CardTitle>
            <CardDescription>
                Learn about the app and some legal advice.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 p-3">
            <div>
                <Label>What is this app?</Label>
                <p className='mt-1 pl-2.5 max-w-[60%]'>
                    Anime Pack is an MyAnimeList client for your desktop,
                    that will provide functionalities integrating with your MAL api,
                    such as liking, creating 'playlists', sharing and a lot more on future updates,
                    join the Discord server and stay tunned for future releases!
                </p>
            </div>
            <div className="space-y-1 pt-2">
                <Label>Socials</Label>
                <div className="flex gap-2 pl-2.5 mt-2">
                    <Badge @click="() => {
                        invoke('open_url', {
                            url: 'https://github.com/anime-pack/anime-pack',
                        });
                    }" className="hover:cursor-pointer">
                        <Icon icon="fa6-brands:github" class="size-7" />
                    </Badge>
                    <Badge @click="() => {
                        invoke('open_url', {
                            url: 'https://discord.gg/Nv8UXpB36y',
                        });
                    }" className="hover:cursor-pointer">
                        <Icon icon="fa6-brands:discord" class="size-7" />
                    </Badge>
                </div>
            </div>
        </CardContent>
    </Card>
</template>
