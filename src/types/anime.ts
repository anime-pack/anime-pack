export interface Anime {
    id: string;
    title: string;
    cover: string;
    rating: number;
    year: number;
    status: 'airing' | 'completed' | 'upcoming';
    type: 'TV' | 'Movie' | 'OVA';
    genres: string[];
}

export type AnimeFilter = {
    search: string;
    type: string[];
    status: string[];
    genres: string[];
    year: number | null;
    rating: number | null;
};
