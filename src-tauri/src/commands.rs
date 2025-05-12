use crate::types::*;
use jikan_moe::{anime::SearchParams, common::structs::anime::{Anime, AnimeExtended}};
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
pub async fn search_animes(
    app: tauri::AppHandle,
    term: &str,
) -> Result<Vec<Anime>, String> {
    let app_state = app.state::<AppData>();
    let jikan_client = app_state.jikan_client.clone();

    let params = SearchParams {
        q: Some(term.to_string()),
        unapproved: Some(false),
        sfw: Some(true),
        ..Default::default()
    };
    let anime_search = jikan_client
    .get_anime_search(Some(params))
    .await;

    if anime_search.is_ok() {
        Ok(anime_search.ok().expect("No json").data)
    } else {
        Err(String::from("Status not ok for top_animes"))
    }
}

//* This command must be studyed to apply its params and other functionalityes from jikan_rs
#[tauri::command]
pub async fn top_animes(app: tauri::AppHandle) -> Result<Vec<AnimeExtended>, String> {
    let app_state = app.state::<AppData>();
    let jikan_client = app_state.jikan_client.clone();

    let top_anime = jikan_client
        .get_top_anime(
            None,
            None,
            None,
            None,
            None,
            None,
        )
        .await;
    if top_anime.is_ok() {
        Ok(top_anime.ok().expect("No json").data)
    } else {
        Err(String::from("Status not ok for top_animes"))
    }
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
