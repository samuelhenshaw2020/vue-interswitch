import { createApp } from 'vue'
import { isw } from '../libs';
import App from './App.vue';

const app = createApp(App);
app.use(isw)

app.mount('#app')
