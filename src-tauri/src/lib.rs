use crate::commands::*;
use crate::types::*;
use discord::{disconnect_drpc, setup_drpc};
use discordipc::Client;
use jikan_moe::JikanClient;
use std::sync::Arc;
use tauri::Manager;

mod commands;
mod discord;
mod types;
mod utils;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let app = tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            app.manage(AppData {
                drpc_client: Arc::new(Client::new("1368098323558301759")),
                // reqwest_client: reqwest::Client::new(),
                jikan_client: Arc::new(JikanClient::new()),
                rate_limiter: Arc::new(utils::RateLimiter::new(3, 1000)),
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            open_url, open_path, window_mmc, search_animes, top_animes, anime_full
        ])
        .build(tauri::generate_context!())
        .expect("error while running tauri application");

    app.run(move |_app_handle, event| match event {
        tauri::RunEvent::Ready => {
            println!("App ready !");
            setup_drpc(_app_handle);
        }
        tauri::RunEvent::ExitRequested { .. } => {
            println!("Exit requested ...");
            disconnect_drpc(_app_handle);
        }
        _ => {}
    });
}
