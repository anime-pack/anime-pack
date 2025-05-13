use jikan_moe::{anime::SearchParams, common::structs::anime::{Anime, AnimeExtended}};
use serde::{Deserialize, Serialize};
use tauri::Manager;

use crate::{types::AppData, utils::{str_to_anime_filter, str_to_anime_rating, str_to_anime_type}};


#[tauri::command]
pub async fn search_animes(app: tauri::AppHandle, term: &str) -> Result<Vec<Anime>, String> {
    let app_state = app.state::<AppData>();
    let jikan_client = app_state.jikan_client.clone();

    let params = SearchParams {
        q: Some(term.to_string()),
        unapproved: Some(false),
        sfw: Some(true),
        ..Default::default()
    };

    jikan_client
        .get_anime_search(Some(params))
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
