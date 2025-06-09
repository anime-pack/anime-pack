<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { X } from 'lucide-vue-next';

const searchValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);
const showSuggestions = ref(false);
const selectedIndex = ref(-1);
const isSubmitting = ref(false);

const props = defineProps<{
    defaultValue?: string;
    cleaner?: boolean;
    placeholder?: string;
    suggestions?: string[];
}>();

const emit = defineEmits<{
    (e: 'submit', value: string): void;
}>();

searchValue.value = props.defaultValue || '';

const filteredSuggestions = computed(() => {
    if (!props.suggestions || !searchValue.value) return [];
    return props.suggestions.filter(s =>
        s.toLowerCase().includes(searchValue.value.toLowerCase())
    ).slice(0, 5);
});

watch(searchValue, () => {
    if (!isSubmitting.value) {
        showSuggestions.value = Boolean(searchValue.value && filteredSuggestions.value.length);
        selectedIndex.value = -1;
    }
    isSubmitting.value = false;
});

const isValidSearch = (value: string) => {
    return value && value.trim().length >= 1;
};

const handleSubmit = (e: Event) => {
    e.preventDefault();
    isSubmitting.value = true;
    showSuggestions.value = false;
    const query = searchValue.value.trim();
    if (isValidSearch(query)) {
        emit('submit', query);
    }
};

const clearSearch = () => {
    searchValue.value = '';
};

const focus = () => {
    inputRef.value?.focus();
};

const selectSuggestion = (suggestion: string) => {
    isSubmitting.value = true;
    searchValue.value = suggestion;
    showSuggestions.value = false;
    emit('submit', suggestion);
};

const handleKeydown = (e: KeyboardEvent) => {
    if (!showSuggestions.value) return;

    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            selectedIndex.value = Math.min(selectedIndex.value + 1, filteredSuggestions.value.length - 1);
            break;
        case 'ArrowUp':
            e.preventDefault();
            selectedIndex.value = Math.max(selectedIndex.value - 1, -1);
            break;
        case 'Enter':
            if (selectedIndex.value >= 0) {
                e.preventDefault();
                selectSuggestion(filteredSuggestions.value[selectedIndex.value]);
            }
            break;
        case 'Escape':
            showSuggestions.value = false;
            break;
    }
};

const handleBlur = () => {
    setTimeout(() => {
        showSuggestions.value = false;
    }, 200);
};

defineExpose({
    clearSearch,
    focus
});
</script>

<template>
    <form @submit="handleSubmit" class="relative w-full">
        <input ref="inputRef" v-model="searchValue" @keydown="handleKeydown" @blur="handleBlur"
            class="h-9 w-full rounded-md border border-input bg-background px-3 pr-8 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            :placeholder="props.placeholder || 'Search... (Ctrl + K)'" />

        <div class="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
            <button v-if="props.cleaner && searchValue" type="button" @click="clearSearch"
                class="text-muted-foreground hover:text-destructive">
                <X class="size-4" />
            </button>
        </div>

        <!-- Suggestions Overlay -->
        <div v-if="showSuggestions && filteredSuggestions.length > 0"
            class="absolute left-0 right-0 top-[calc(100%+4px)] z-50 rounded-md border bg-popover p-1 shadow-md">
            <ul class="space-y-1">
                <li v-for="(suggestion, index) in filteredSuggestions" :key="suggestion"
                    @mousedown="selectSuggestion(suggestion)"
                    class="cursor-pointer rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                    :class="{ 'bg-accent text-accent-foreground': index === selectedIndex }">
                    {{ suggestion }}
                </li>
            </ul>
        </div>
    </form>
</template>
