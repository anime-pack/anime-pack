use reqwest::{self};
use serde::Deserialize;
use std::sync::Arc;
use tauri::Manager;
use tauri_plugin_opener::OpenerExt;

use discordipc::{
    activity::{Activity, ActivityType, Assets, Button, Timestamps},
    packet::Packet,
    Client as DrpcClient, InnerClient,
};

#[tauri::command]
fn window_mmc(app: tauri::AppHandle, window_label: &str, action: &str) {
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

// #[derive(Deserialize)]
// struct JkAPIRes {
//     pagination: String,
//     data: String,
// }

#[tauri::command]
async fn jikan_api_search(
    app: tauri::AppHandle,
    search_term: &str,
) -> Result<serde_json::Value, String> {  // Mudança no tipo de retorno
    let app_state = app.state::<AppData>();
    let reqwest_client = app_state.reqwest_client.clone();

    let base_url = String::from("https://api.jikan.moe/v4/");

    let jk_res = reqwest_client
        .get(format!("{}anime?q={}", base_url, search_term))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    match jk_res.status() {
        reqwest::StatusCode::OK => {
            println!("Status OK");
            jk_res.json::<serde_json::Value>()
                .await
                .map_err(|e| e.to_string())
        },
        _ => {
            eprintln!("Status not OK");
            Err("API request failed".to_string())
        }
    }
}

#[tauri::command]
async fn jikan_api_airing(
    app: tauri::AppHandle,
) -> Result<serde_json::Value, String> {  // Mudança no tipo de retorno
    let app_state = app.state::<AppData>();
    let reqwest_client = app_state.reqwest_client.clone();

    let base_url = String::from("https://api.jikan.moe/v4/");

    let jk_res = reqwest_client
        .get(format!("{}anime?status=airing", base_url))
        .send()
        .await
        .map_err(|e| e.to_string())?;

    match jk_res.status() {
        reqwest::StatusCode::OK => {
            println!("Status OK");
            jk_res.json::<serde_json::Value>()
                .await
                .map_err(|e| e.to_string())
        },
        _ => {
            eprintln!("Status not OK");
            Err("API request failed".to_string())
        }
    }
}

#[tauri::command]
fn open_url(app_handle: tauri::AppHandle, url: &str) {
    app_handle
        .opener()
        .open_url(url, None::<&str>)
        .unwrap_or_else(|_| {
            eprintln!("Failed to open URL: {}", url);
        });
}

#[tauri::command]
fn open_path(app_handle: tauri::AppHandle, path: &str) {
    app_handle
        .opener()
        .open_path(path, None::<&str>)
        .unwrap_or_else(|_| {
            eprintln!("Failed to open Path: {}", path);
        });
}

fn setup_drpc(app: &tauri::AppHandle) {
    let app_state = app.state::<AppData>();
    let drpc_client = app_state.drpc_client.clone();
    let drpc_client_clone = drpc_client.clone();

    drpc_client.on("READY", move |_client, _packet| {
        println!("Discord client connected!");

        let activity = Activity::new()
            .state("All your animes, in one pack!")
            .kind(ActivityType::Watching)
            .details("Anime Pack")
            .assets(
                Assets::new()
                    .large_image(
                        "https://i.pinimg.com/736x/2e/1a/a8/2e1aa8b650982b57e99d2907c1954409.jpg",
                        Some("Developing..."),
                    )
                    .small_image(
                        "https://i.pinimg.com/736x/40/e3/8c/40e38c3e5a26b5da61b326cb5a0282da.jpg",
                        Some("Anime Pack"),
                    ),
            )
            .timestamps(Timestamps::new().start_now())
            .button(Button::new("Github", "https://github.com/dark1zinn"));

        let nonce = Packet::generate_nonce();
        let activity_packet = Packet::new_activity(Some(&activity), Some(&nonce));

        drpc_client_clone.once(nonce, move |_client, packet| {
            match packet.filter() {
                Ok(_packet) => {
                    println!("Activity has been set!");

                    // following code clears activity after 3 secs

                    // std::thread::sleep(std::time::Duration::from_secs(3));
                    // if let Err(e) = client.send(Packet::new_activity(None, None)) {
                    //     eprintln!("Couldn't send packet: {}", e);
                    // };
                    // println!("Activity cleared!");
                }
                Err(e) => {
                    eprintln!("Couldn't set activity: {}", e);
                }
            }
        });
        if let Err(e) = _client.send(activity_packet) {
            eprintln!("Couldn't send Packet: {}", e);
        }
    });

    drpc_client.connect().unwrap_or_else(|e| {
        eprintln!("Couldn't connect DRPC: {}", e);
    })
}

fn disconnect_drpc(app: &tauri::AppHandle) {
    let app_state = app.state::<AppData>();
    let drpc_client = app_state.drpc_client.clone();

    drpc_client
        .disconnect()
        .unwrap_or_else(|e| eprintln!("Couldn't disconnect DRPC: {}", e));
    println!("Drpc client closed");
}

struct AppData {
    drpc_client: Arc<discordipc::Client<Arc<InnerClient>>>,
    reqwest_client: reqwest::Client,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let app = tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            app.manage(AppData {
                drpc_client: Arc::new(DrpcClient::new("1100480933452333068")),
                reqwest_client: reqwest::Client::new(),
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![open_url, open_path, window_mmc, jikan_api_search, jikan_api_airing])
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
