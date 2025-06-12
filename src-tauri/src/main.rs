// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// TODO: reestructure Rust code according to Modrinth app file and code structure
fn main() {
    anime_pack_lib::run()
}
