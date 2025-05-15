use jikan_moe::{
    anime::SearchParams,
    common::structs::anime::{Anime, AnimeExtended},
};
use serde::{Deserialize, Serialize};
use tauri::Manager;

use crate::{
    types::AppData,
    utils::{
        str_to_anime_filter, str_to_anime_orderby, str_to_anime_rating, str_to_anime_status,
        str_to_anime_type, str_to_sort,
    },
};

#[derive(Deserialize, Serialize)]
pub struct SearchAnimeParams<'sap> {
    q: Option<&'sap str>,
    unapproved: Option<bool>,
    page: Option<u32>,
    limit: Option<u32>,
    type_: Option<&'sap str>,
    score: Option<f32>,
    min_score: Option<f32>,
    max_score: Option<f32>,
    status: Option<&'sap str>,
    rating: Option<&'sap str>,
    sfw: Option<bool>,
    genres: Option<&'sap str>,
    genres_exclude: Option<&'sap str>,
    order_by: Option<&'sap str>,
    sort: Option<&'sap str>,
    letter: Option<&'sap str>,
    producers: Option<&'sap str>,
    start_date: Option<&'sap str>,
    end_date: Option<&'sap str>,
}

#[tauri::command]
pub async fn search_animes(
    app: tauri::AppHandle,
    params: Option<SearchAnimeParams<'_>>,
) -> Result<Vec<Anime>, String> {
    let app_state = app.state::<AppData>();
    let jikan_client = app_state.jikan_client.clone();

    jikan_client
        .get_anime_search(Some(SearchParams {
            q: params
                .as_ref()
                .map(|p| p.q)
                .flatten()
                .and_then(|q| Some(String::from(q))),
            unapproved: params.as_ref().and_then(|p| p.unapproved),
            page: params.as_ref().and_then(|p| p.page),
            limit: params.as_ref().and_then(|p| p.limit),
            type_: params
                .as_ref()
                .map(|p| p.type_)
                .flatten()
                .and_then(str_to_anime_type),
            score: params.as_ref().and_then(|p| p.score),
            min_score: params.as_ref().and_then(|p| p.min_score),
            max_score: params.as_ref().and_then(|p| p.max_score),
            status: params
                .as_ref()
                .map(|p| p.status)
                .flatten()
                .and_then(str_to_anime_status),
            rating: params
                .as_ref()
                .map(|p| p.rating)
                .flatten()
                .and_then(str_to_anime_rating),
            sfw: params.as_ref().and_then(|p| p.sfw),
            genres: params.as_ref().and_then(|p| p.genres),
            genres_exclude: params.as_ref().and_then(|p| p.genres_exclude),
            order_by: params
                .as_ref()
                .map(|p| p.order_by)
                .flatten()
                .and_then(str_to_anime_orderby),
            sort: params
                .as_ref()
                .map(|p| p.sort)
                .flatten()
                .and_then(str_to_sort),
            letter: params.as_ref().and_then(|p| p.letter),
            producers: params.as_ref().and_then(|p| p.producers),
            start_date: params.as_ref().and_then(|p| p.start_date),
            end_date: params.as_ref().and_then(|p| p.end_date),
        }))
        .await
        .map(|response| response.data)
        .map_err(|_| String::from("Status not ok for anime_full"))
}

//* This command must be studyed to apply its params and other functionalityes from jikan_rs
#[derive(Deserialize, Serialize)]
pub struct TopAnimesParams<'tap> {
    type_: Option<&'tap str>,
    filter: Option<&'tap str>,
    rating: Option<&'tap str>,
    sfw: Option<bool>,
    page: Option<u32>,
    limit: Option<u32>,
}

#[tauri::command]
pub async fn top_animes(
    app: tauri::AppHandle,
    params: Option<TopAnimesParams<'_>>,
) -> Result<Vec<AnimeExtended>, String> {
    let app_state = app.state::<AppData>();
    let jikan_client = app_state.jikan_client.clone();

    jikan_client
        .get_top_anime(
            params
                .as_ref()
                .map(|p| p.type_)
                .flatten()
                .and_then(str_to_anime_type),
            params
                .as_ref()
                .map(|p| p.filter)
                .flatten()
                .and_then(str_to_anime_filter),
            params
                .as_ref()
                .map(|p| p.rating)
                .flatten()
                .and_then(str_to_anime_rating),
            params.as_ref().and_then(|p| p.sfw),
            params.as_ref().and_then(|p| p.page),
            params.as_ref().and_then(|p| p.limit),
        )
        .await
        .map(|response| response.data)
        .map_err(|_| String::from("Status not ok for anime_full"))
}

#[tauri::command]
pub async fn anime_full(app: tauri::AppHandle, id: i32) -> Result<AnimeExtended, String> {
    let app_state = app.state::<AppData>();
    let jikan_client = app_state.jikan_client.clone();

    jikan_client
        .get_anime_full(id)
        .await
        .map(|response| response.data)
        .map_err(|_| String::from("Status not ok for anime_full"))
}
