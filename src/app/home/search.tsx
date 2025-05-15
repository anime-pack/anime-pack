import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { AnimeItem } from '@/types/anime';
import { SearchAnimeParams } from '@/types/invoke';
import { invoke } from '@tauri-apps/api/core';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';

export default function HomeSearch() {
    const [searchParams] = useSearchParams();
    const [animes, setAnimes] = useState<AnimeItem[]>();

    const getSearch = async () => {
        const params = {
            q: searchParams.get('query')!,
            sfw: true,
        } satisfies Partial<SearchAnimeParams>;

        setAnimes(await invoke('search_animes', { params }));
    };

    getSearch();

    return (
        <div className="flex flex-1 flex-col h-full p-4 pt-3 pb-4">
            <div className="h-fit">
                {/* <div className="pb-1 h-fit">
                    <Dialog>
                        <DialogTrigger asChild className="p-1">
                            <Button variant="outline">
                                <Funnel className="size-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="flex gap-1">
                                    <Funnel />
                                    Filters
                                </DialogTitle>
                                <DialogDescription>
                                    Add filters to your search here. Click save
                                    when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="name"
                                        className="text-right"
                                    >
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        defaultValue="Pedro Duarte"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="username"
                                        className="text-right"
                                    >
                                        Username
                                    </Label>
                                    <Input
                                        id="username"
                                        defaultValue="@peduarte"
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Apply filters</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div> */}
            </div>
            <hr className="py-2" />
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6 w-full px-4 pb-16">
                {animes?.map((ani, index) => (
                    <Link
                        key={index}
                        title={ani.title}
                        to={`/anime/${ani.title
                            .replace(/[:]/g, '')
                            .replace(/[\s]/g, '-')
                            .toLowerCase()}?id=${ani.mal_id}`}
                        className="relative pb-[150%] group"
                    >
                        <Card
                            style={{
                                backgroundImage: `url("${
                                    ani.images.webp.large_image_url ||
                                    ani.images.webp.image_url
                                }")`,
                            }}
                            className="absolute inset-0 bg-no-repeat bg-center bg-cover transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-lg rounded-xl"
                        >
                            <CardContent className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-all duration-300 p-3 rounded-xl">
                                <div className="space-y-3">
                                    <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="flex flex-wrap gap-1">
                                            {ani.genres
                                                ?.slice(0, 2)
                                                .map((genre, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-black/50 text-white/90 px-2 py-0.5 text-xs rounded-md"
                                                    >
                                                        {genre.name}
                                                    </span>
                                                ))}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-white/70">
                                            <span>{ani.type}</span>
                                            {ani.episodes && (
                                                <>
                                                    <span>•</span>
                                                    <span>
                                                        {ani.episodes} eps
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <Label className="line-clamp-2 text-white/90 group-hover:text-white transition-colors duration-200">
                                        {ani.title}
                                    </Label>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
