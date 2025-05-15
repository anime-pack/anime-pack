import { invoke } from '@tauri-apps/api/core';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { GithubIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import DiscordLogo from '@/assets/DiscordLogo';

export default function SettingsAbout() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>About</CardTitle>
                <CardDescription>
                    Learn about the app and some legal advice.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
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
                        <Badge
                            onClick={() => {
                                invoke('open_url', {
                                    url: 'https://github.com/dark1zinn/anime-pack',
                                });
                            }}
                            className="hover:cursor-pointer bg-primary"
                        >
                            <GithubIcon />
                            <h3>Github</h3>
                        </Badge>
                        <Badge
                            onClick={() => {
                                invoke('open_url', {
                                    url: 'https://discord.gg/tCMjJdcCsE',
                                });
                            }}
                            className="hover:cursor-pointer bg-primary"
                        >
                            <DiscordLogo className=" fill-black" />
                            <h3>Discord</h3>
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
