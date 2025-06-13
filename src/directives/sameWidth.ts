import type { Directive } from 'vue';

export const vSameWidth: Directive = {
    mounted(el, binding) {
        const target = binding.value;
        if (!target) return;

        const observer = new ResizeObserver(() => {
            const width = target.offsetWidth;
            el.style.width = `${width}px`;
        });

        observer.observe(target);

        el._observer = observer;
    },
    unmounted(el) {
        if (el._observer) {
            el._observer.disconnect();
        }
    },
};
