use jikan_moe::common::enums::anime::{
    AnimeFilter, AnimeOrder, AnimeRating, AnimeStatus, AnimeType,
};

pub fn str_to_anime_type(s: &str) -> Option<AnimeType> {
    match s.to_lowercase().as_str() {
        "tv" => Some(AnimeType::TV),
        "movie" => Some(AnimeType::Movie),
        "ova" => Some(AnimeType::OVA),
        "special" => Some(AnimeType::TVSpecial),
        "ona" => Some(AnimeType::ONA),
        "music" => Some(AnimeType::Music),
        _ => None,
    }
}

pub fn str_to_anime_filter(s: &str) -> Option<AnimeFilter> {
    match s.to_lowercase().as_str() {
        "airing" => Some(AnimeFilter::Airing),
        "upcoming" => Some(AnimeFilter::Upcoming),
        "popularity" => Some(AnimeFilter::ByPopularity),
        "favorite" => Some(AnimeFilter::Favorite),
        _ => None,
    }
}

pub fn str_to_anime_rating(s: &str) -> Option<AnimeRating> {
    match s.to_lowercase().as_str() {
        "g" => Some(AnimeRating::G),
        "pg" => Some(AnimeRating::PG),
        "pg13" => Some(AnimeRating::PG13),
        "r17" => Some(AnimeRating::R17),
        "r" => Some(AnimeRating::R),
        "rx" => Some(AnimeRating::Rx),
        _ => None,
    }
}

pub fn str_to_anime_status(s: &str) -> Option<AnimeStatus> {
    match s.to_lowercase().as_str() {
        "airing" => Some(AnimeStatus::Airing),
        "complete" => Some(AnimeStatus::Complete),
        "upcoming" => Some(AnimeStatus::Upcoming),
        _ => None,
    }
}

pub fn str_to_anime_orderby(s: &str) -> Option<AnimeOrder> {
    match s.to_lowercase().as_str() {
        "mal_id" => Some(AnimeOrder::MalId),
        "title" => Some(AnimeOrder::Title),
        "start_date" => Some(AnimeOrder::StartDate),
        "end_date" => Some(AnimeOrder::EndDate),
        "episodes" => Some(AnimeOrder::Episodes),
        "score" => Some(AnimeOrder::Score),
        "scored_by" => Some(AnimeOrder::ScoredBy),
        "rank" => Some(AnimeOrder::Rank),
        "popularity" => Some(AnimeOrder::Popularity),
        "members" => Some(AnimeOrder::Members),
        "favourites" => Some(AnimeOrder::Favourites),
        _ => None,
    }
}
