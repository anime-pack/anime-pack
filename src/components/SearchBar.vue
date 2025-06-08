<script setup lang="ts">
import { ref } from 'vue';
import { X } from 'lucide-vue-next';

const searchValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

const props = defineProps<{
    defaultValue?: string;
    cleaner?: boolean;
}>();

const emit = defineEmits<{
    (e: 'submit', value: string): void;
}>();

searchValue.value = props.defaultValue || '';

const isValidSearch = (value: string) => {
    return value && value.trim().length >= 1;
};

const handleSubmit = (e: Event) => {
    e.preventDefault();
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

defineExpose({
    clearSearch,
    focus
});
</script>

<template>
    <form @submit="handleSubmit" class="relative w-full">
        <input ref="inputRef" v-model="searchValue"
            class="h-9 w-full rounded-md border border-input bg-background px-3 pr-8 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="Search... (Ctrl + K)" />

        <div class="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
            <button v-if="cleaner && searchValue" type="button" @click="clearSearch"
                class="text-muted-foreground hover:text-destructive">
                <X class="size-4" />
            </button>
        </div>
    </form>
</template>
