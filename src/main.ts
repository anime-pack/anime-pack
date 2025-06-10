// @ts-ignore
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import { parse, stringify } from 'zipson';
import App from './App.vue';
import router from './router';
import './main.css';
import { reviveDates } from './lib/utils';

createApp(App)
    .use(
        createPinia().use(
            createPersistedState({
                debug: true,    //* MUST be false in production
                storage: sessionStorage,
                serializer: {
                    serialize: (value) =>
                        stringify(value, { detectUtcTimestamps: true }),
                    deserialize: (value) => {
                        const state = parse(value);
                        return reviveDates(state);
                    },
                },
            })
        )
    )
    .use(router)
    .mount('#app');
