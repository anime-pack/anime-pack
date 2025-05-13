import { AnimeFilter, AnimeGenresParam, AnimeOrder, AnimeRating, AnimeStatus, AnimeType } from './anime';
import { Sort, Char } from './common';

export interface TopAnimeParams {
    type_: keyof typeof AnimeType;
    filter: keyof typeof AnimeFilter;
    rating: keyof typeof AnimeRating;
    sfw: boolean;
    page: number;
    limit: number;
}

export interface SearchAnimeParams {
    q: string;
    unapproved: boolean;
    page: number;
    limit: number;
    type_: keyof typeof AnimeType;
    score: number;
    min_score: number;
    max_score: number;
    status: keyof typeof AnimeStatus;
    rating: keyof typeof AnimeRating;
    sfw: boolean;
    genres: AnimeGenresParam;
    genres_exclude: AnimeGenresParam;
    order_by: keyof typeof AnimeOrder;
    sort: keyof typeof Sort;
    letter: Char;
    producers: string;
    start_date: string;
    end_date: string;
}
