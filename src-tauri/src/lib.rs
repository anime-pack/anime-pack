use std::sync::Arc;

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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let app = tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
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
                    .state("On menu")
                    .kind(ActivityType::Watching)
                    .details("All your animes, in one pack!")
                    .assets(Assets::new()
                        .large_image("https://media.istockphoto.com/id/1302508567/vector/closed-cardboard-box-shipping-box-vector-illustration.jpg?s=612x612&w=0&k=20&c=aXX6EP43kX0FMO5OT6q66MFyuEJ3Xw0zrSdWyNuv3jc=", Some("Anime Pack"))
                        .small_image("https://media.istockphoto.com/id/1302508567/vector/closed-cardboard-box-shipping-box-vector-illustration.jpg?s=612x612&w=0&k=20&c=aXX6EP43kX0FMO5OT6q66MFyuEJ3Xw0zrSdWyNuv3jc=", Some("Anime Pack"))
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
