import { createApp } from 'vue'
import App from './App.vue'
import {InterswitchPlugin} from "../libs"

const app = createApp(App);
app.use(InterswitchPlugin, {disableAutoKobo: false})

app.mount('#app')
