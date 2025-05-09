import { invoke } from '@tauri-apps/api/core';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { TabsContent } from '@/components/ui/tabs';
import { GithubIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import DiscordLogo from '@/assets/DiscordLogo';

export default function SettingsAbout() {
    return (
        <TabsContent value="about">
            <Card>
                <CardHeader>
                    <CardTitle>About</CardTitle>
                    <CardDescription>Some app info.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label>Socials</Label>
                        <div className="flex gap-1">
                        <Badge onClick={() => {
                                    invoke('open_url', {
                                        url: 'https://github.com/dark1zinn/anime-pack',
                                    });
                            }}
                            className="hover:cursor-pointer bg-primary"
                        >
                            <GithubIcon />
                            <h3>Github</h3>
                        </Badge>
                        <Badge onClick={() => {
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
                {/* <CardFooter>
            <Button>Save changes</Button>
          </CardFooter> */}
            </Card>
        </TabsContent>
    );
}
