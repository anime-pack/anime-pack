import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AnimeItem } from '@/types/anime';
import { SearchAnimeParams } from '@/types/invoke';
import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Skeleton } from '@/components/ui/skeleton';

export default function Anime() {
    const [searchParams] = useSearchParams();
    let [anime, setAnime] = useState<AnimeItem>();
    const [recommendations, setRecommendation] = useState<AnimeItem[]>();

    useEffect(() => {
        const delay = (ms: number) =>
            new Promise((resolve) => setTimeout(resolve, ms));

        const getAnidata = async () => {
            const animeId = Number(searchParams.get('id'));
            const data: AnimeItem = await invoke('anime_full', {
                id: animeId,
            }).then(async (data) => {
                setAnime(data as AnimeItem); //! Must not leave this typecasting here
                return data as AnimeItem;
            });

            await delay(600);

            //? This gets the appropriate recommendations based on the current anime genres
            const params = {
                genres:
                    data?.genres
                        .map((g) => {
                            return g.mal_id;
                        })
                        .join(',') || undefined,
                sfw: true,
            } satisfies Partial<SearchAnimeParams>;
            setRecommendation(
                await invoke('search_animes', {
                    params,
                })
            );
        };

        getAnidata();
    }, [searchParams]);

    const CardSkeleton = () => (
        <div className="flex gap-4 pl-4">
            {[...Array(9)].map((_, i) => (
                <Skeleton key={i} className="h-[260px] w-[200px] rounded-xl" />
            ))}
        </div>
    );

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-3 h-full pb-4 mb-10">
            {!anime ? (
                <Card className="mb-4">
                    <CardContent>
                        <div className="flex gap-4">
                            <Skeleton className="aspect-[3/4] w-[300px] rounded-2xl" />
                            <div className="flex flex-col gap-4 flex-1">
                                <Skeleton className="h-10 w-2/3" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-6 w-20" />
                                    <Skeleton className="h-6 w-20" />
                                    <Skeleton className="h-6 w-20" />
                                </div>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-3/4" />
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <Skeleton className="h-6 w-24" />
                                    <Skeleton className="h-6 w-24" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <Card className="mb-4">
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
                                        ID:{' '}
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
                                    ~{anime.duration}
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

            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold mb-4 px-4">
                        You may also like
                    </h2>
                    <div className="relative overflow-hidden">
                        <Carousel
                            opts={{
                                align: 'start',
                                dragFree: true,
                            }}
                            className="w-full max-w-full"
                        >
                            <CarouselContent className="hover:cursor-grab active:cursor-grabbing">
                                {!recommendations ? (
                                    <CardSkeleton />
                                ) : (
                                    recommendations?.map((rec, index) => (
                                        <CarouselItem
                                            key={index}
                                            className="basis-[200px] pl-4"
                                        >
                                            <Link
                                                to={`/anime?id=${rec.mal_id}`}
                                                className="block group relative aspect-[3/4] overflow-hidden rounded-md"
                                            >
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center transition-all duration-300 group-hover:scale-105"
                                                    style={{
                                                        backgroundImage: `url("${
                                                            rec.images.webp
                                                                .large_image_url ||
                                                            rec.images.jpg
                                                                .large_image_url ||
                                                            rec.images.webp
                                                                .image_url ||
                                                            rec.images.jpg
                                                                .image_url
                                                        }")`,
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent">
                                                    <div className="absolute bottom-0 w-full px-3 pb-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <div className="flex flex-wrap gap-1 mb-2">
                                                            {rec.genres
                                                                ?.slice(0, 2)
                                                                .map(
                                                                    (
                                                                        genre,
                                                                        idx
                                                                    ) => (
                                                                        <Badge
                                                                            key={
                                                                                idx
                                                                            }
                                                                            variant="outline"
                                                                            className="bg-black/50 text-xs text-white/90 border-white/10"
                                                                        >
                                                                            {
                                                                                genre.name
                                                                            }
                                                                        </Badge>
                                                                    )
                                                                )}
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs text-white/70 pb-2">
                                                            <span>
                                                                Ep:{' '}
                                                                {rec.episodes ||
                                                                    '?'}
                                                            </span>
                                                            <span>•</span>
                                                            <span>
                                                                {rec.status}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="absolute bottom-3 w-full px-3 transition-all duration-300 group-hover:translate-y-[-0.5rem]">
                                                        <h3 className="text-white font-medium text-sm line-clamp-2">
                                                            {rec.title}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </Link>
                                        </CarouselItem>
                                    ))
                                )}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </section>
            </div>
        </div>
    );
}
