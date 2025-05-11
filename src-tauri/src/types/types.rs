use std::sync::Arc;
use discordipc::InnerClient;
use jikan_moe::JikanClient;

pub struct AppData {
    pub drpc_client: Arc<discordipc::Client<Arc<InnerClient>>>,
    pub reqwest_client: reqwest::Client,
    pub jikan_client: Arc<JikanClient>,
}