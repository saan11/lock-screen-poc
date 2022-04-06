import { createApp } from 'vue';

import App from './AppLayout.vue';
import store from './store/index.js';

const app = createApp(App);

app.use(store);

app.mount('#app');
