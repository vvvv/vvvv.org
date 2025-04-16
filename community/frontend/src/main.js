import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initKeycloak } from './keycloak'
import './styles/style.scss'

await initKeycloak()

const app = createApp(App)
app.use(router)
app.mount('#app')
