import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimeData } from '@/types/types';
import { invoke } from '@tauri-apps/api/core';
import { Funnel } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

export default function HomeSearch() {
    const [searchParams] = useSearchParams();
    const [animes, setAnimes] = useState<AnimeData>();

    useEffect(() => {
        const getSearch = async () => {
            setAnimes(
                await invoke('jikan_api', {
                    urlParams: `anime?q=${searchParams.get("query")}`,
                })
            );
        };

        getSearch();
    }, [searchParams]);

    return (
        <div className="flex flex-1 flex-col p-4 pt-3 h-full pb-4 overflow-hidden overflow-y-auto">
            <div className="h-fit">
                <div className="pb-1 h-fit">
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
                </div>
            </div>
            <hr className="py-2" />
            <div className="grid grid-cols-[repeat(auto-fill,minmax(176px,1fr))] gap-4 w-full px-4 mb-5">
                {animes?.data.map((ani, index) => (
                    <Link
                        key={index}
                        title={ani.title}
                        to={`/anime/${ani.title
                            .replace(/[:]/g, '')
                            .replace(/[\s]/g, '-')
                            .toLowerCase()}?id=${ani.mal_id}`}
                        className="relative pb-[140%]" // Aspect ratio controlado pelo padding bottom
                    >
                        <Card
                            style={{
                                backgroundImage: `url("${
                                    ani.images.webp.large_image_url ||
                                    ani.images.webp.image_url
                                }")`,
                            }}
                            className="absolute inset-0 bg-no-repeat bg-center bg-cover"
                        >
                            <CardContent className="absolute bottom-0 w-full bg-gradient-to-t from-black/100 via-black/70 to-transparent p-2 rounded-lg">
                                <Label className="line-clamp-2">
                                    {ani.title}
                                </Label>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
