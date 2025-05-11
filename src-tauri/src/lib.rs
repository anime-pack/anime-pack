use discord::{disconnect_drpc, setup_drpc};
use discordipc::{Client, InnerClient};
use reqwest::{self};
use std::sync::Arc;
use tauri::Manager;
use tauri_plugin_opener::OpenerExt;

mod discord;

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
async fn jikan_api(
    app: tauri::AppHandle,
    url_params: &str,
) -> Result<serde_json::Value, String> {  // Mudança no tipo de retorno
    let app_state = app.state::<AppData>();
    let reqwest_client = app_state.reqwest_client.clone();

    let base_url = String::from("https://api.jikan.moe/v4/");

    let jk_res = reqwest_client
        .get(format!("{}{}", base_url, url_params))
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
                drpc_client: Arc::new(Client::new("1368098323558301759")),
                reqwest_client: reqwest::Client::new(),
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![open_url, open_path, window_mmc, jikan_api])
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
