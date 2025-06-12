use jikan_moe::common::enums::common::Sort;
use std::sync::Arc;
use tokio::sync::{Semaphore, RwLock};
use tokio::time::{sleep, Duration};


pub fn str_to_sort(s: &str) -> Option<Sort> {
    match s.to_lowercase().as_str() {
        "asc" => Some(Sort::Asc),
        "desc" => Some(Sort::Desc),
        _ => None,
    }
}

pub struct RateLimiter {
    semaphore: Arc<Semaphore>,
    last_request: Arc<RwLock<std::time::Instant>>,
    delay: Duration
}

impl RateLimiter {
    pub fn new(max_concurrent: usize, delay: u64) -> Self {
        Self {
            semaphore: Arc::new(Semaphore::new(max_concurrent)),
            last_request: Arc::new(RwLock::new(std::time::Instant::now())),
            delay: Duration::from_millis(delay)
        }
    }

    pub async fn acquire(&self) -> tokio::sync::SemaphorePermit {
        let permit = self.semaphore.acquire().await.unwrap();
        let mut last = self.last_request.write().await;
        let now = std::time::Instant::now();
        let elapsed = now.duration_since(*last);

        if elapsed < self.delay {
            sleep(self.delay - elapsed).await;
        }

        *last = std::time::Instant::now();
        permit
    }
}
