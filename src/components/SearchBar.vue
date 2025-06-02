<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { Search, X } from 'lucide-vue-next';

const cn = (...classes: (string | boolean | null | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
};

const isExpanded = ref(false);
const searchValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);

const handleToggle = () => {
    isExpanded.value = !isExpanded.value;
};

// No need for event parameter or stopPropagation here if using @click.stop
const handleClose = () => {
    isExpanded.value = false;
    searchValue.value = '';
};

const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (searchValue.value.trim()) {
        console.log('Searching for:', searchValue.value);
    }
};

watch(isExpanded, (newVal) => {
    if (newVal && inputRef.value) {
        nextTick(() => {
            inputRef.value?.focus();
        });
    }
});
</script>

<template>
    <!-- <div class="relative flex items-center">
        <div class="absolute right-0 transition-all duration-300 overflow-hidden"
            :class="isExpanded ? 'w-[430px] opacity-100' : 'w-0 opacity-0'">
            <div class="relative w-[430px]">
                <Input ref="searchInput" v-model="searchValue" class="h-9 pr-9" placeholder="Buscar..." />
                <Button variant="ghost" size="icon" @click="handleClose"
                    class="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full opacity-70 hover:opacity-100 hover:bg-red-500/10 hover:text-red-500 transition-all z-20">
                    <X class="size-3.5" />
                </Button>
            </div>
        </div>
        <Button variant="ghost" size="icon" @click="handleToggle" :class="{ 'opacity-0': isExpanded }"
            class="transition-opacity duration-300">
            <Search class="size-5" />
        </Button>
    </div> -->
    <!-- <div class="relative flex items-center">   // TODO: Restylish this component to match app style
        <form @submit="handleSubmit" class="relative">
            <div :class="cn(
                'flex items-center bg-white border-2 border-gray-200 rounded-full transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl',
                isExpanded ? 'w-80 px-4 py-3' : 'w-12 h-12 cursor-pointer hover:border-blue-300'
            )" @click="!isExpanded ? handleToggle() : undefined">
                <Search :class="cn(
                    'text-gray-500 transition-all duration-200',
                    isExpanded ? 'w-5 h-5 mr-3' : 'w-6 h-6 mx-auto'
                )" />

                <input ref="inputRef" type="text" v-model="searchValue" placeholder="Search..." :class="cn(
                    'bg-transparent outline-none text-gray-700 placeholder-gray-400 transition-all duration-300',
                    isExpanded ? 'w-full opacity-100' : 'w-0 opacity-0'
                )" :style="{
                    width: isExpanded ? '100%' : '0px',
                    transition: 'width 0.3s ease-in-out, opacity 0.2s ease-in-out'
                }" />

                <button v-if="isExpanded" type="button" @click.stop="handleClose"
                    class="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200">
                    <X class="w-4 h-4 text-gray-500" />
                </button>
            </div>
        </form>
    </div> -->
    <div class="relative flex items-center">
        <div class="absolute right-0 transition-all duration-300 overflow-hidden"
            :class="isExpanded ? 'w-[430px] opacity-100' : 'w-0 opacity-0'">
            <div class="relative w-[430px]">
                <input ref="inputRef" v-model="searchValue" type="text" placeholder="Buscar..."
                    class="h-9 pr-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" />
                <button type="button" @click="handleClose"
                    class="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full opacity-70 hover:opacity-100 hover:bg-red-500/10 hover:text-red-500 transition-all z-20 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    <X class="size-3.5" />
                </button>
            </div>
        </div>
        <button type="button" @click="handleToggle" :class="{ 'opacity-0': isExpanded }"
            class="transition-opacity duration-300 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 w-9 p-0">
            <Search class="size-5" />
        </button>
    </div>
</template>
