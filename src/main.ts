import { createApp } from 'vue';
import App from './App.vue';
import store from './store/store';
import './main.scss'; // Tailwind CSS
import './styles.scss'; // Custom SCSS

const app = createApp(App);

app.use(store);

app.mount('#app');
