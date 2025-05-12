use crate::types::*;
use jikan_moe::{
    anime::SearchParams,
    common::structs::anime::{Anime, AnimeExtended},
};
use tauri::Manager;
use tauri_plugin_opener::OpenerExt;

#[tauri::command]
pub fn window_mmc(app: tauri::AppHandle, window_label: &str, action: &str) {
    let window = app.get_webview_window(window_label).unwrap();
    if action == "minimize" {
        window.minimize().unwrap();
    } else if action == "maximize" {
        window.maximize().unwrap();
    } else if action == "unmaximize" {
        window.unmaximize().unwrap();
    } else if action == "close" {
        window.close().unwrap();
    }
}

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
#[tauri::command]
pub async fn top_animes(app: tauri::AppHandle) -> Result<Vec<AnimeExtended>, String> {
    let app_state = app.state::<AppData>();
    let jikan_client = app_state.jikan_client.clone();

    jikan_client
        .get_top_anime(None, None, None, None, None, None)
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

#[tauri::command]
pub fn open_url(app_handle: tauri::AppHandle, url: &str) {
    app_handle
        .opener()
        .open_url(url, None::<&str>)
        .unwrap_or_else(|_| {
            eprintln!("Failed to open URL: {}", url);
        });
}

#[tauri::command]
pub fn open_path(app_handle: tauri::AppHandle, path: &str) {
    app_handle
        .opener()
        .open_path(path, None::<&str>)
        .unwrap_or_else(|_| {
            eprintln!("Failed to open Path: {}", path);
        });
}
