import { defineStore } from 'pinia';
import type { AnimeItemFull } from '@/types/anime';

interface EpisodeTime {
    currentTime: number;
    duration: number;
    isCompleted: boolean;
    nextEpisode?: number;
}

interface EpisodeWatch {
    number: number;
    timestamp: Date;
    time: EpisodeTime;
}

interface AnimeHistoryItem {
    animeData: AnimeItemFull;
    timestamp: Date;
    watch: EpisodeWatch | null;
}

interface SearchHistoryItem {
    query: string;
    timestamp: Date;
}

interface LibraryState {
    searchHistory: SearchHistoryItem[];
    recentlyViewed: AnimeHistoryItem[];
    likedAnimes: AnimeItemFull[];
    ratedAnimes: Map<number, number>;
}

export const useLibraryStore = defineStore('library', {
    state: (): LibraryState => ({
        searchHistory: [],
        recentlyViewed: [],
        likedAnimes: [],
        ratedAnimes: new Map(),
    }),

    getters: {
        getRecentSearches: (state) =>
            state.searchHistory
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                .slice(0, 10),

        getRecentlyViewed: (state) =>
            state.recentlyViewed.sort(
                (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
            ),

        isAnimeLiked: (state) => (anime: AnimeItemFull | number) => {
            const animeId = typeof anime === 'number' ? anime : anime.mal_id;
            return state.likedAnimes.some((item) => item.mal_id === animeId);
        },
    },

    actions: {
        addSearchQuery(query: string) {
            // Remover busca duplicada se existir
            const existingIndex = this.searchHistory.findIndex(
                (item) => item.query.toLowerCase() === query.toLowerCase()
            );

            if (existingIndex !== -1) {
                this.searchHistory.splice(existingIndex, 1);
            }

            // Adicionar nova busca
            this.searchHistory.push({
                query,
                timestamp: new Date(),
            });
        },

        addViewedAnime(anime: Omit<AnimeHistoryItem, 'timestamp'>) {
            const existingIndex = this.recentlyViewed.findIndex(
                (item) => item.animeData.mal_id === anime.animeData.mal_id
            );

            if (existingIndex !== -1) {
                // Manter informações do último episódio assistido se existir
                const existingWatch = this.recentlyViewed[existingIndex].watch;
                this.recentlyViewed.splice(existingIndex, 1);
                anime.watch = existingWatch;
            }

            this.recentlyViewed.push({
                ...anime,
                timestamp: new Date(),
            });
        },

        toggleLikeAnime(anime: AnimeItemFull) {
            const index = this.likedAnimes.findIndex(
                (item) => item.mal_id === anime.mal_id
            );
            if (index === -1) {
                this.likedAnimes.push(anime);
            } else {
                this.likedAnimes.splice(index, 1);
            }
        },

        rateAnime(animeId: number, rating: number) {
            if (rating >= 1 && rating <= 5) {
                this.ratedAnimes.set(animeId, rating);
            }
        },

        updateWatchedEpisode(
            animeId: number,
            episodeNumber: number,
            time: Omit<EpisodeTime, 'isCompleted'> & { nextEpisode?: number }
        ) {
            const animeIndex = this.recentlyViewed.findIndex(
                (item) => item.animeData.mal_id === animeId
            );

            if (animeIndex !== -1) {
                this.recentlyViewed[animeIndex].watch = {
                    number: episodeNumber,
                    timestamp: new Date(),
                    time: {
                        ...time,
                        isCompleted: time.currentTime >= time.duration * 0.9, // Considera completo se viu 90%
                    },
                };
                this.recentlyViewed[animeIndex].timestamp = new Date();
            }
        },

        removeSearchQuery(query: string) {
            const index = this.searchHistory.findIndex(
                (item) => item.query === query
            );
            if (index !== -1) {
                this.searchHistory.splice(index, 1);
            }
        },

        clearSearchHistory() {
            this.searchHistory = [];
        },
    },

    persist: true,
    tauri: {
        sync: true,
    },
});
