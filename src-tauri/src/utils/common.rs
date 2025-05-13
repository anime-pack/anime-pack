use jikan_moe::common::enums::common::Sort;


pub fn str_to_sort(s: &str) -> Option<Sort> {
    match s.to_lowercase().as_str() {
        "asc" => Some(Sort::Asc),
        "desc" => Some(Sort::Desc),
        _ => None,
    }
}
