import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Label } from '@/components/ui/label.tsx';
import { Link } from 'react-router';
import { Badge } from '@/components/ui/badge.tsx';
import { AnimeItem } from '@/types/anime.js';
import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { SearchAnimeParams } from '@/types/invoke';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
    const [animes, setAnimes] = useState<AnimeItem[]>();
    const [topAnimes, setTopAnimes] = useState<AnimeItem[]>();
    const [topActionAnimes, setTopActionAnimes] = useState<AnimeItem[]>();
    const [topRomanceAnimes, setTopRomanceAnimes] = useState<AnimeItem[]>();

    const getAnimes = async () => {
        const params = {
            sfw: true,
            status: 'airing',
            start_date: '2025-04-01',
        } satisfies Partial<SearchAnimeParams>;

        setAnimes(await invoke('search_animes', { params }));
    };

    const getTopAnimes = async () => {
        const params = {
            sfw: true,
            start_date: '2024-04-01',
            min_score: 7,
        } satisfies Partial<SearchAnimeParams>;

        setTopAnimes(await invoke('search_animes', { params }));
    };

    const getTopActionAnimes = async () => {
        const params = {
            sfw: true,
            start_date: '2024-04-01',
            min_score: 6,
            genres: '1',
        } satisfies Partial<SearchAnimeParams>;

        setTopActionAnimes(await invoke('search_animes', { params }));
    };

    const getTopRomanceAnimes = async () => {
        const params = {
            sfw: true,
            start_date: '2024-04-01',
            min_score: 6,
            genres: '22',
        } satisfies Partial<SearchAnimeParams>;

        setTopRomanceAnimes(await invoke('search_animes', { params }));
    };

    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    useEffect(() => {
        const fetchData = async () => {
            await getAnimes();
            await delay(1000);
            await getTopAnimes();
            await delay(1000);
            await getTopActionAnimes();
            await delay(1000);
            await getTopRomanceAnimes();
        };

        fetchData();
    }, []); // Empty dependency array

    const MainSkeleton = () => (
        <div className="flex gap-4 h-full w-full pl-4">
            {[...Array(4)].map((_, i) => (
                <Skeleton
                    key={i}
                    className="aspect-video h-full rounded-xl flex-1"
                />
            ))}
        </div>
    );

    const CardSkeleton = () => (
        <div className="flex gap-4 pl-4">
            {[...Array(9)].map((_, i) => (
                <Skeleton key={i} className="h-[260px] w-[200px] rounded-xl" />
            ))}
        </div>
    );

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-3 h-fit pb-4 mb-10 overflow-x-hidden">
            <div className="flex justify-center flex-col">
                <Label className="text-xl pl-3.5 mb-2">New Episodes</Label>
                <Carousel
                    opts={{
                        align: 'start',
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 3000,
                            stopOnMouseEnter: true,
                        }),
                    ]}
                    className="w-full max-h-[240px] min-h-[190px] h-auto ml-[20px]"
                >
                    <CarouselContent className="hover:cursor-grab active:cursor-grabbing snap-center snap-mandatory h-full w-full -ml-1">
                        {!animes ? (
                            <MainSkeleton />
                        ) : (
                            animes?.map((ani, index) => (
                                <CarouselItem
                                    key={index}
                                    className="md:basis-1/1 lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4 h-full aspect-video p-1"
                                >
                                    <div className="px-1 select-none w-full h-full">
                                        <Card
                                            className="h-full p-0 group bg-no-repeat bg-cover bg-center border-0"
                                            style={{
                                                backgroundImage: `url("${
                                                    ani.images.webp
                                                        .large_image_url ||
                                                    ani.images.jpg
                                                        .large_image_url
                                                }")`,
                                            }}
                                        >
                                            <CardContent className="aspect-auto p-0 h-full w-full rounded-xl bg-gradient-to-t from-black via-black/40 to-transparent">
                                                <Link
                                                    to={`/anime?id=${ani.mal_id}`}
                                                    className="active:cursor-grabbing"
                                                >
                                                    <div className="relative w-full h-full">
                                                        {/* Container para gêneros e sinopse (aparece no hover) */}
                                                        <div className="absolute bottom-0 w-full px-4 pb-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                            <div className="flex flex-wrap gap-1 w-full max-w-[90%] mb-2">
                                                                {ani.genres
                                                                    ?.slice(
                                                                        0,
                                                                        4
                                                                    )
                                                                    .map(
                                                                        (
                                                                            genre,
                                                                            index
                                                                        ) => (
                                                                            <Badge
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="bg-black/50 text-white/90 border-white/10"
                                                                            >
                                                                                {
                                                                                    genre.name
                                                                                }
                                                                            </Badge>
                                                                        )
                                                                    )}
                                                            </div>
                                                            <p className="text-sm text-white/80 line-clamp-2 max-w-[80%]">
                                                                {ani.synopsis}
                                                            </p>
                                                        </div>

                                                        {/* Container do título (sempre visível) */}
                                                        <div className="absolute bottom-3 w-full px-4 transition-all duration-300 group-hover:translate-y-[-0.5rem]">
                                                            <Label className="text-white text-base font-medium line-clamp-1">
                                                                {ani.title}
                                                            </Label>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))
                        )}
                    </CarouselContent>
                    {/* <CarouselPrevious />
                        <CarouselNext /> */}
                    {/* //TODO: make buttons appear on carousel intem hover */}
                </Carousel>
            </div>
            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold mb-4 px-4">
                        Top Animes
                    </h2>
                    <div className="relative">
                        <Carousel
                            opts={{
                                align: 'start',
                                dragFree: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="hover:cursor-grab active:cursor-grabbing">
                                {!topAnimes ? (
                                    <CardSkeleton />
                                ) : (
                                    topAnimes?.map((anime, index) => (
                                        <CarouselItem
                                            key={index}
                                            className="basis-[200px] pl-4"
                                        >
                                            <Link
                                                to={`/anime?id=${anime.mal_id}`}
                                                className="block group relative aspect-[3/4] overflow-hidden rounded-md"
                                            >
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center transition-all duration-300 group-hover:scale-105"
                                                    style={{
                                                        backgroundImage: `url("${
                                                            anime.images.webp
                                                                .large_image_url ||
                                                            anime.images.jpg
                                                                .large_image_url ||
                                                            anime.images.webp
                                                                .image_url ||
                                                            anime.images.jpg
                                                                .image_url
                                                        }")`,
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent">
                                                    <div className="absolute bottom-0 w-full px-3 pb-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <div className="flex flex-wrap gap-1 mb-2">
                                                            {anime.genres
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
                                                                {anime.episodes ||
                                                                    '?'}
                                                            </span>
                                                            <span>•</span>
                                                            <span>
                                                                {anime.status}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="absolute bottom-3 w-full px-3 transition-all duration-300 group-hover:translate-y-[-0.5rem]">
                                                        <h3 className="text-white font-medium text-sm line-clamp-2">
                                                            {anime.title}
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
                <section>
                    <h2 className="text-2xl font-semibold mb-4 px-4">Action</h2>
                    <div className="relative">
                        <Carousel
                            opts={{
                                align: 'start',
                                dragFree: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="hover:cursor-grab active:cursor-grabbing">
                                {!topActionAnimes ? (
                                    <CardSkeleton />
                                ) : (
                                    topActionAnimes?.map((anime, index) => (
                                        <CarouselItem
                                            key={index}
                                            className="basis-[200px] pl-4"
                                        >
                                            <Link
                                                to={`/anime?id=${anime.mal_id}`}
                                                className="block group relative aspect-[3/4] overflow-hidden rounded-md"
                                            >
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center transition-all duration-300 group-hover:scale-105"
                                                    style={{
                                                        backgroundImage: `url("${
                                                            anime.images.webp
                                                                .large_image_url ||
                                                            anime.images.jpg
                                                                .large_image_url ||
                                                            anime.images.webp
                                                                .image_url ||
                                                            anime.images.jpg
                                                                .image_url
                                                        }")`,
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent">
                                                    <div className="absolute bottom-0 w-full px-3 pb-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <div className="flex flex-wrap gap-1 mb-2">
                                                            {anime.genres
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
                                                                {anime.episodes ||
                                                                    '?'}
                                                            </span>
                                                            <span>•</span>
                                                            <span>
                                                                {anime.status}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="absolute bottom-3 w-full px-3 transition-all duration-300 group-hover:translate-y-[-0.5rem]">
                                                        <h3 className="text-white font-medium text-sm line-clamp-2">
                                                            {anime.title}
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
                <section>
                    <h2 className="text-2xl font-semibold mb-4 px-4">
                        Romance
                    </h2>
                    <div className="relative">
                        <Carousel
                            opts={{
                                align: 'start',
                                dragFree: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="hover:cursor-grab active:cursor-grabbing">
                                {!topRomanceAnimes ? (
                                    <CardSkeleton />
                                ) : (
                                    topRomanceAnimes?.map((anime, index) => (
                                        <CarouselItem
                                            key={index}
                                            className="basis-[200px] pl-4"
                                        >
                                            <Link
                                                to={`/anime?id=${anime.mal_id}`}
                                                className="block group relative aspect-[3/4] overflow-hidden rounded-md"
                                            >
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center transition-all duration-300 group-hover:scale-105"
                                                    style={{
                                                        backgroundImage: `url("${
                                                            anime.images.webp
                                                                .large_image_url ||
                                                            anime.images.jpg
                                                                .large_image_url ||
                                                            anime.images.webp
                                                                .image_url ||
                                                            anime.images.jpg
                                                                .image_url
                                                        }")`,
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent">
                                                    <div className="absolute bottom-0 w-full px-3 pb-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <div className="flex flex-wrap gap-1 mb-2">
                                                            {anime.genres
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
                                                                {anime.episodes ||
                                                                    '?'}
                                                            </span>
                                                            <span>•</span>
                                                            <span>
                                                                {anime.status}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="absolute bottom-3 w-full px-3 transition-all duration-300 group-hover:translate-y-[-0.5rem]">
                                                        <h3 className="text-white font-medium text-sm line-clamp-2">
                                                            {anime.title}
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
