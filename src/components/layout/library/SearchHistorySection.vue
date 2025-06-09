<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLibraryStore } from '@/stores/library';
import { SortDesc, Search, Clock, X, ExternalLink } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/SearchBar.vue';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'vue-router';

const router = useRouter();
const libraryStore = useLibraryStore();
const sortBy = ref('recent');
const search = ref('');

const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'query', label: 'Search Term' },
];

const searchHistory = computed(() => {
    let history = [...libraryStore.getRecentSearches];

    if (search.value) {
        const query = search.value.toLowerCase();
        history = history.filter(item =>
            item.query.toLowerCase().includes(query)
        );
    }

    switch (sortBy.value) {
        case 'query':
            return history.sort((a, b) => a.query.localeCompare(b.query));
        case 'recent':
        default:
            return history;
    }
});

const handleSearch = (query: string) => {
    search.value = query;
};

const repeatSearch = (query: string) => {
    libraryStore.addSearchQuery(query);
    router.push({ path: '/search', query: { q: query } });
};

const removeFromHistory = (query: string) => {
    libraryStore.removeSearchQuery(query);
};

const clearHistory = () => {
    libraryStore.clearSearchHistory();
    search.value = ''; // Limpar busca atual
};
</script>

<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between gap-4">
            <h2 class="text-2xl font-semibold">Search History</h2>
            <div class="flex items-center gap-4">
                <Select v-model="sortBy">
                    <SelectTrigger class="w-[180px]">
                        <SortDesc class="mr-2 size-4" />
                        <SelectValue :placeholder="sortOptions.find(opt => opt.value === sortBy)?.label" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="option in sortOptions" :key="option.value" :value="option.value">
                            {{ option.label }}
                        </SelectItem>
                    </SelectContent>
                </Select>
                <div class="w-64">
                    <SearchBar @submit="handleSearch" cleaner />
                </div>
            </div>
        </div>

        <div v-if="searchHistory.length === 0" class="flex flex-col items-center justify-center py-12 space-y-4">
            <Search class="size-12 text-muted-foreground" />
            <h3 class="text-lg font-medium">Empty search history</h3>
            <p class="text-sm text-muted-foreground">
                Your recent searches will appear here
            </p>
            <Button @click="$router.push('/search')">Make a Search</Button>
        </div>

        <div v-else class="space-y-4">
            <div class="flex justify-end">
                <Button variant="outline" size="sm" @click="clearHistory">
                    Clear History
                </Button>
            </div>

            <div class="grid grid-cols-1 gap-2">
                <div v-for="item in searchHistory" :key="`${item.query}-${item.timestamp.getTime()}`"
                    class="group flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                    <div class="flex items-center gap-4">
                        <Search class="size-4 text-muted-foreground" />
                        <div>
                            <p class="font-medium mb-1">{{ item.query }}</p>
                            <div class="flex items-center gap-4 text-xs text-muted-foreground">
                                <span class="flex items-center gap-1">
                                    <Clock class="size-3" />
                                    {{ new Date(item.timestamp).toLocaleDateString() }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" @click="removeFromHistory(item.query)"
                            class="h-8 w-8 text-muted-foreground hover:text-destructive">
                            <X class="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" @click="repeatSearch(item.query)" class="h-8 w-8">
                            <ExternalLink class="size-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
