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
import { AnimeData } from '@/types/types.js';
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/core';

export default function Home() {
    const [animes, setAnimes] = useState<AnimeData>();

    useEffect(() => {
        const getSearch = async () => {
            setAnimes(await invoke('jikan_api_airing', {}));
        };

        getSearch();
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
                        {animes?.data.map((ani, index) => (
                            <CarouselItem
                                key={index}
                                className="md:basis-1/1 lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4 h-full aspect-video p-1"
                            >
                                <div className="px-1 select-none w-full h-full">
                                    <Card
                                        className="h-full p-0 group bg-no-repeat bg-cover bg-center border-0"
                                        style={{
                                            backgroundImage: `url("${
                                                ani.trailer.images
                                                    .large_image_url ||
                                                ani.images.webp.large_image_url
                                            }")`,
                                        }}
                                    >
                                        <CardContent className="aspect-auto p-0 h-full w-full rounded-xl bg-linear-to-b from-black/90 via-black/70 to-black/0 fade-in group-hover:bg-primary-700/50 backdrop-opacity-70 transition-all duration-600 group-hover:backdrop-blur">
                                            <Link
                                                to={`/anime/${ani.title
                                                    .replace(/[:]/g, '')
                                                    .replace(/[\s]/g, '-')
                                                    .toLowerCase()}?id=${
                                                    ani.mal_id
                                                }`}
                                                className="active:cursor-grabbing"
                                            >
                                                <div className="w-full h-full pl-3">
                                                    <Label className="ml-2 mt-3.5 line-clamp-2">
                                                        {ani.title}
                                                    </Label>
                                                    <div className="flex gap-1 w-full mt-2">
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
                                                                        className="bg-muted/70 text-accent-foreground"
                                                                    >
                                                                        {
                                                                            genre.name
                                                                        }
                                                                    </Badge>
                                                                )
                                                            )}
                                                    </div>
                                                    <p className="max-w-[64%] max-h-[72%] ml-2 mt-1.5 line-clamp-4 opacity-0 group-hover:opacity-100 fade-in duration-400">
                                                        {ani.synopsis}
                                                    </p>
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
            <div className="h-fit w-full p-2 rounded-xl bg-muted/50 md:min-h-min">
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
                <p>nao</p>
            </div>
        </div>
    );
}
