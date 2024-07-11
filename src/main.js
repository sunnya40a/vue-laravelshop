//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import setupFontAwesomeIcons from './icon'
import router from './router'

const app = createApp(App)
setupFontAwesomeIcons(app)
app.use(createPinia())
app.use(router)

app.mount('#app')
