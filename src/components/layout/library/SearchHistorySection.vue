<script setup lang="ts">
import { ref } from 'vue';
import { SortDesc, Search, Clock, X, ChevronRight } from 'lucide-vue-next';
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

interface SearchHistoryItem {
    id: string;
    query: string;
    timestamp: Date;
    resultsCount: number;
}

const router = useRouter();
const sortBy = ref('recent');
const search = ref('');
const searchHistory = ref<SearchHistoryItem[]>([]); // TODO: Implementar store para histórico

const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'relevance', label: 'Most Results' },
    { value: 'query', label: 'Search Term' },
];

const handleSearch = (query: string) => {
    search.value = query;
    // TODO: Implementar filtro de busca
};

const repeatSearch = (query: string) => {
    // TODO: Implementar redirecionamento para busca
    router.push({ path: '/search', query: { q: query } });
};

const removeFromHistory = (id: string) => {
    // TODO: Implementar remoção do histórico
    console.log('Removing from history:', id);
};

const clearHistory = () => {
    // TODO: Implementar limpeza do histórico
    searchHistory.value = [];
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
                <div v-for="item in searchHistory" :key="item.id"
                    class="group flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                    <div class="flex items-center gap-4">
                        <Search class="size-4 text-muted-foreground" />
                        <div>
                            <p class="font-medium">{{ item.query }}</p>
                            <div class="flex items-center gap-4 text-xs text-muted-foreground">
                                <span class="flex items-center gap-1">
                                    <Clock class="size-3" />
                                    {{ new Date(item.timestamp).toLocaleDateString() }}
                                </span>
                                <span>•</span>
                                <span>{{ item.resultsCount }} resultados</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" @click="removeFromHistory(item.id)"
                            class="h-8 w-8 text-muted-foreground hover:text-destructive">
                            <X class="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" @click="repeatSearch(item.query)" class="h-8 w-8">
                            <ChevronRight class="size-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
