use std::sync::Arc;
use discordipc::InnerClient;

pub struct AppData {
    pub drpc_client: Arc<discordipc::Client<Arc<InnerClient>>>,
    pub reqwest_client: reqwest::Client,
}