import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'; // Ini untuk fungsionalitas JavaScript Bootstrap
import axios from './plugins/axios';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.config.globalProperties.$axios = axios;

app.mount('#app');