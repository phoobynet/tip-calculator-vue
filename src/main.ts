import App from '@/App.vue'
import { keys } from '@/directives/keys'
import { router } from '@/router'
import '@/style.scss'
import { createApp } from 'vue'

const app = createApp(App)

app.use(router)
app.directive('keys', keys)
app.mount('#app')
