import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimeItem } from '@/types/types';
import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';
import {
    // useParams,
    useSearchParams
} from 'react-router';

export default function HomeAnime() {
    // const params = useParams();
    const [searchParams] = useSearchParams();
    let [anidata, setAnidata] = useState<AnimeItem>();

    useEffect(() => {
        const getAnidata = async () => {
            const ani: { data: AnimeItem } = await invoke('jikan_api_fullid', {
                id: searchParams.get('id'),
            });
            setAnidata(ani.data);
        };

        getAnidata();
    });

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-3 h-fit pb-4 overflow-hidden">
            {!anidata ? (
                <div>No anime</div>
            ) : (
                <Card>
                    <CardContent>   {/* //TODO: adjust this bad boi responsivity on small windows */}
                        <div className="flex gap-4">
                            <img
                                src={
                                    anidata.images.webp.large_image_url ||
                                    anidata.images.jpg.large_image_url
                                }
                                alt={anidata.title}
                                className="aspec-9/16 max-w-[300px] rounded-2xl"
                            />
                            <div className="flex flex-col">
                                <Label className="py-1 text-4xl">
                                    {anidata.title}
                                </Label>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {anidata.genres.map((genre, index) => (
                                        <Badge
                                            key={index}
                                            className="bg-muted/70 text-accent-foreground"
                                        >
                                            {genre.name}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="mt-2 flex gap-3.5">
                                    <p className="font-semibold">
                                        Mal ID:{' '}
                                        <span className="font-normal">
                                            {anidata.mal_id}
                                        </span>
                                    </p>
                                    <p className="font-semibold">
                                        Year:{' '}
                                        <span className="font-normal">
                                            {anidata.aired.prop.from.year}
                                        </span>
                                    </p>
                                    <p className="font-semibold">
                                        Status:{' '}
                                        <span className="font-normal">
                                            {anidata.status}
                                        </span>
                                    </p>
                                </div>
                                <p className="font-semibold">
                                    ~{anidata.duration} per episode
                                </p>
                                {anidata.episodes && (
                                    <p className="font-semibold">
                                        {anidata.episodes} episodes
                                    </p>
                                )}
                                <ScrollArea className="max-h-[120px] mt-2 bg-linear-to-t from-black/40 to-transparent p-1 rounded-md">
                                    <p>{anidata.synopsis}</p>
                                </ScrollArea>
                                <div className="mt-2">
                                    <p>Producers</p>
                                    <div className="flex gap-1 w-full mt-2">
                                        {anidata.producers.map(
                                            (genre, index) => (
                                                <Badge
                                                    key={index}
                                                    className="bg-muted/70 text-accent-foreground"
                                                >
                                                    {genre.name}
                                                </Badge>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <p>Studios</p>
                                    <div className="flex gap-1 w-full mt-2">
                                        {anidata.studios.map((genre, index) => (
                                            <Badge
                                                key={index}
                                                className="bg-muted/70 text-accent-foreground"
                                            >
                                                {genre.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
