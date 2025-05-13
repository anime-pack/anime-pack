import { AnimeFilter, AnimeRating, AnimeType } from "./anime";

export interface TopAnimeParams {
    type_?: keyof typeof AnimeType,
    filter?: keyof typeof AnimeFilter,
    rating?: keyof typeof AnimeRating,
    sfw?: boolean,
    page?: number,
    limit?: number,
}