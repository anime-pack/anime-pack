use std::sync::Arc;
use discordipc::InnerClient;
use jikan_moe::JikanClient;

//? Dedicated file for structs that will be used in multiple places across the codebase

pub struct AppData {
    pub drpc_client: Arc<discordipc::Client<Arc<InnerClient>>>,
    pub reqwest_client: reqwest::Client,
    pub jikan_client: Arc<JikanClient>,
}