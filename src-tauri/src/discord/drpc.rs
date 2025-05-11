use discordipc::{
    activity::{Activity, ActivityType, Assets, Button, Timestamps},
    packet::Packet,
    Client as DrpcClient, InnerClient,
};
use std::sync::Arc;
use tauri::Manager;

pub fn setup_drpc(app: &tauri::AppHandle) {
    let app_state = app.state::<crate::AppData>();
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
                    .small_image(
                        "app_icon",
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

pub fn disconnect_drpc(app: &tauri::AppHandle) {
    let app_state = app.state::<crate::AppData>();
    let drpc_client = app_state.drpc_client.clone();

    drpc_client
        .disconnect()
        .unwrap_or_else(|e| eprintln!("Couldn't disconnect DRPC: {}", e));
    println!("Drpc client closed");
}