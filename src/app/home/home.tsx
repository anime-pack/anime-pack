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
import { AnimeItem } from '@/types/types.js';
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function Home() {
    const [animes, setAnimes] = useState<AnimeItem[]>();

    useEffect(() => {
        const getAnimesAiring = async () => {
            setAnimes(
                await invoke('top_animes')
            );
        };

        getAnimesAiring();
    });

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-3 h-fit pb-4">
            <div className="flex justify-center">
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
                        {animes?.map((ani, index) => (
                            <CarouselItem
                                key={index}
                                className="md:basis-1/1 lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4 h-full aspect-video p-1"
                            >
                                <div className="px-1 select-none w-full h-full">
                                    <Card
                                        className="h-full p-0 group bg-no-repeat bg-cover bg-center border-0"
                                        style={{
                                            backgroundImage: `url("${
                                                ani.images.webp.large_image_url || ani.images.jpg.large_image_url
                                            }")`,
                                        }}
                                    >
                                        <CardContent className="aspect-auto p-0 h-full w-full rounded-xl bg-gradient-to-t from-black via-black/40 to-transparent">
                                            <Link
                                                to={`/anime/${ani.title
                                                    .replace(/[:]/g, '')
                                                    .replace(/[\s]/g, '-')
                                                    .toLowerCase()}?id=${
                                                    ani.mal_id
                                                }`}
                                                className="active:cursor-grabbing"
                                            >
                                                <div className="relative w-full h-full">
                                                    {/* Container para gêneros e sinopse (aparece no hover) */}
                                                    <div className="absolute bottom-0 w-full px-4 pb-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <div className="flex flex-wrap gap-1 w-full max-w-[90%] mb-2">
                                                            {ani.genres
                                                                .slice(0, 4)
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
                        ))}
                    </CarouselContent>
                    {/* <CarouselPrevious />
      <CarouselNext /> */}
                    {/* TODO: make buttons appear on carousel intem hover */}
                </Carousel>
            </div>
            <div className="space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold mb-4 px-4">
                        In Display
                    </h2>
                    <div className="relative">
                        <ScrollArea className="w-full">
                            <div className="flex gap-3.5 px-4 pb-4">
                                {animes?.map((anime, index) => (
                                    <Link
                                        key={index}
                                        to={`/anime/${anime.title
                                            .replace(/[:]/g, '')
                                            .replace(/[\s]/g, '-')
                                            .toLowerCase()}?id=${anime.mal_id}`}
                                        className="flex-none w-[200px] group relative aspect-[3/4] overflow-hidden rounded-md"
                                    >
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-all duration-300 group-hover:scale-105"
                                            style={{
                                                backgroundImage: `url("${anime.images.webp.large_image_url || anime.images.jpg.large_image_url || anime.images.webp.image_url || anime.images.jpg.image_url}")`,
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent">
                                            {/* Container para informações extras (aparece no hover) */}
                                            <div className="absolute bottom-0 w-full px-3 pb-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="flex flex-wrap gap-1 mb-2">
                                                    {anime.genres
                                                        .slice(0, 2)
                                                        .map((genre, idx) => (
                                                            <Badge
                                                                key={idx}
                                                                variant="outline"
                                                                className="bg-black/50 text-xs text-white/90 border-white/10"
                                                            >
                                                                {genre.name}
                                                            </Badge>
                                                        ))}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-white/70">
                                                    <span>
                                                        Ep:{' '}
                                                        {anime.episodes || '?'}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{anime.status}</span>
                                                </div>
                                            </div>

                                            {/* Container do título (sempre visível) */}
                                            <div className="absolute bottom-3 w-full px-3 transition-all duration-300 group-hover:translate-y-[-0.5rem]">
                                                <h3 className="text-white font-medium text-sm line-clamp-2">
                                                    {anime.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                </section>
            </div>
        </div>
    );
}
