import App from '@/App.vue'
import { router } from '@/router'
import '@/style.scss'
import { createApp } from 'vue'

createApp(App).use(router).mount('#app')
