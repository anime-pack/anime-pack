import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimeItem } from '@/types/anime';
import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';
import {
    // useParams,
    useSearchParams,
} from 'react-router';

export default function HomeAnime() {
    // const params = useParams();
    const [searchParams] = useSearchParams();
    let [anime, setAnime] = useState<AnimeItem>();

    useEffect(() => {
        const getAnidata = async () => {
            const animeId = Number(searchParams.get('id'));
            const animeData: AnimeItem = await invoke('anime_full', {
                id: animeId,
            });
            console.log(animeData);
            setAnime(animeData);
        };

        getAnidata();
    });

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-3 h-fit pb-4 overflow-hidden">
            {!anime ? (
                <div>No anime</div>
            ) : (
                <Card>
                    <CardContent>
                        {' '}
                        {/* //TODO: adjust this bad boi responsivity on small windows */}
                        <div className="flex gap-4">
                            <img
                                src={
                                    anime.images.webp.large_image_url ||
                                    anime.images.jpg.large_image_url
                                }
                                alt={anime.title}
                                className="aspec-9/16 max-w-[300px] rounded-2xl"
                            />
                            <div className="flex flex-col">
                                <Label className="py-1 text-4xl">
                                    {anime.title}
                                </Label>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {anime.genres?.map((genre, index) => (
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
                                            {anime.mal_id}
                                        </span>
                                    </p>
                                    <p className="font-semibold">
                                        Year:{' '}
                                        <span className="font-normal">
                                            {anime.aired.prop.from?.year ||
                                                '??'}
                                        </span>
                                    </p>
                                    <p className="font-semibold">
                                        Status:{' '}
                                        <span className="font-normal">
                                            {anime.status}
                                        </span>
                                    </p>
                                </div>
                                <p className="font-semibold">
                                    ~{anime.duration} per episode
                                </p>
                                {anime.episodes && (
                                    <p className="font-semibold">
                                        {anime.episodes} episodes
                                    </p>
                                )}
                                <ScrollArea className="max-h-[120px] mt-2 bg-linear-to-t from-black/40 to-transparent p-1 rounded-md">
                                    <p>{anime.synopsis}</p>
                                </ScrollArea>
                                <div className="mt-2">
                                    <p>Producers</p>
                                    <div className="flex gap-1 w-full mt-2">
                                        {anime.producers?.map(
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
                                        {anime.studios?.map((genre, index) => (
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
