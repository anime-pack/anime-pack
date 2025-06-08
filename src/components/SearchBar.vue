<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { Search } from 'lucide-vue-next';

const router = useRouter();
const searchValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

const props = defineProps<{
    defaultValue?: string;
}>();

const emit = defineEmits<{
    (e: 'submit', value: string): void;
}>();

searchValue.value = props.defaultValue || '';

const handleSubmit = (e: Event) => {
    e.preventDefault();
    const query = searchValue.value.trim();
    emit('submit', query);
};
</script>

<template>
    <form @submit="handleSubmit" class="relative w-full">
        <input ref="inputRef" v-model="searchValue"
            class="h-9 w-full rounded-md border border-input bg-background px-3 pr-8 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="Search..." />
        <button type="submit" class="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search class="size-4" />
        </button>
    </form>
</template>
