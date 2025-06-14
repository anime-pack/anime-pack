interface Pagination {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
        count: number;
        total: number;
        per_page: number;
    };
}

interface Image {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
}

interface Images {
    jpg: Image;
    webp: Image;
}

interface Trailer {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
    images: {
        image_url: string | null;
        small_image_url: string | null;
        medium_image_url: string | null;
        large_image_url: string | null;
        maximum_image_url: string | null;
    };
}

interface Title {
    type: string;
    title: string;
}

interface Producer {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

export interface AnimeItem {
    mal_id: number;
    url: string;
    images: Images;
    title: string;
    start_year: number;
    title_english: string;
    title_japanese: string;
    episodes: Number;
    status: string;
    score: number;
    synopsis: string;
    aired: {
        from: string;
        to: string | null;
        prop: {
            from: {
                day: number;
                month: number;
                year: number;
            };
            to: {
                day: number | null;
                month: number | null;
                year: number | null;
            };
        };
        string: string;
    };
}

export interface AnimeItemFull {
    mal_id: number;
    url: string;
    images: Images;
    trailer: Trailer;
    approved: boolean;
    titles: Title[];
    title: string;
    title_english: string | null;
    title_japanese: string;
    title_synonyms: string[];
    type: string;
    source: string;
    episodes: number | null;
    status: string;
    airing: boolean;
    aired: {
        from: string;
        to: string | null;
        prop: {
            from: {
                day: number;
                month: number;
                year: number;
            };
            to: {
                day: number | null;
                month: number | null;
                year: number | null;
            };
        };
        string: string;
    };
    duration: string;
    rating: string;
    score: number;
    scored_by: number;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string;
    background: string;
    season: string | null;
    year: number | null;
    broadcast: {
        day: string | null;
        time: string | null;
        timezone: string | null;
        string: string | null;
    };
    producers: Producer[];
    licensors: Producer[];
    studios: Producer[];
    genres: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
    explicit_genres: any[];
    themes: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
    demographics: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
}

export interface AnimeData {
    pagination: Pagination;
    data: AnimeItem | AnimeItemFull[];
}

export enum AnimeType {
    'tv',
    'movie',
    'ova',
    'ona',
    'music',
    'cm',
    'pv',
    'special',
}

export enum AnimeFilter {
    'airing',
    'upcoming',
    'popularity',
    'favorite',
}

export enum AnimeRating {
    'all ages' = 'g',
    'children' = 'pg',
    '13+' = 'pg13',
    '17+ violence & profanity' = 'r17',
    'mild nudity' = 'r',
    'hentai' = 'rx',
}

export enum AnimeStatus {
    'airing',
    'complete',
    'upcoming',
}

export enum AnimeOrder {
    'mal_id',
    'title',
    'start_date',
    'end_date',
    'episodes',
    'score',
    'scored_by',
    'rank',
    'popularity',
    'members',
    'favourites',
}

/**
 * THIS TYPE IS NOT `any`!!
 *
 * It is in fact an recursive type, which follows this pattern:
 * ```ts
 * `${number}` | `${number},${number}` | `${number},${number},${number}...`
 * ```
 * This means it can have as many numbers as you'd like.
 *
 * It's purpose is due the query param for the genres accepting an single string like `1,32,542,4,52`, so you can make an array with the genres id's the do an `.join(',')` on them.
 *
 * @example
 * ```ts
 * const genres = [1, 32, 542, 4, 52];
 * const param: AnimeGenresParam = genres.join(','); // "1,32,542,4,52"
 * ```
 */
// @ts-ignore
export type AnimeGenresParam = `${number}` | `${number},${AnimeGenresParam}`;
