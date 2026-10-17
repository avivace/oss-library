import { createApp } from 'vue'
import '@fontsource-variable/libre-caslon-condensed'
import '@fontsource-variable/lora'
import '@fontsource-variable/lora/wght-italic.css'
import '@fontsource-variable/public-sans'
import './style.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
