use std::sync::Arc;
use tauri_plugin_opener::OpenerExt;

use discordipc::{
    activity::{Activity, ActivityType, Assets, Button, Timestamps},
    packet::Packet,
    Client,
};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn open_url(app_handle: tauri::AppHandle, url: &str) {
    app_handle.opener().open_url(url, None::<&str>).unwrap_or_else(|_| {
        eprintln!("Failed to open URL: {}", url);
    });
}

#[tauri::command]
fn open_path(app_handle: tauri::AppHandle, path: &str) {
    app_handle.opener().open_path(path, None::<&str>).unwrap_or_else(|_| {
        eprintln!("Failed to open Path: {}", path);
    });
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let app = tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, open_url, open_path])
        .build(tauri::generate_context!())
        .expect("error while running tauri application");

    let drpc_client = Arc::new(Client::new("771124766517755954"));
    let drpc_client_clone = Arc::clone(&drpc_client);

    app.run( move |_app_handle, event| match event {
        tauri::RunEvent::Ready => {
            println!("App ready !");
            let drpc_client_inner = Arc::clone(&drpc_client_clone);

            let drpc_client_activity = Arc::clone(&drpc_client_inner);

            drpc_client_inner.on("READY", move |_client, _packet| {
                println!("Discord client connected!");

                let activity = Activity::new()
                    .state("All your animes, in one pack!")
                    .kind(ActivityType::Watching)
                    .details("Anime Pack")
                    .assets(Assets::new()
                        .large_image("https://i.pinimg.com/736x/2e/1a/a8/2e1aa8b650982b57e99d2907c1954409.jpg", Some("Developing..."))
                        .small_image("https://i.pinimg.com/736x/40/e3/8c/40e38c3e5a26b5da61b326cb5a0282da.jpg", Some("Anime Pack"))
                    )
                    .timestamps(Timestamps::new().start_now())
                    .button(Button::new("Github", "https://github.com/dark1zinn"));

                let nonce = Packet::generate_nonce();
                let activity_packet = Packet::new_activity(Some(&activity), Some(&nonce));

                drpc_client_activity.once(nonce, move |_client, packet| {
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

            drpc_client_inner.connect().unwrap();
        }
        tauri::RunEvent::ExitRequested { .. } => {
            println!("Exit requested ...");
            drpc_client_clone.disconnect().unwrap();
            print!("Drpc client closed");
        }
        _ => {}
    });
}
