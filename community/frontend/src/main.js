import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initKeycloak } from './keycloak'

// import parent styles during dev
if (import.meta.env.DEV)
{
    import("@/styles/bootstrap.min.css");
    import("@scss/main.scss");
    import("@css/creative.css");
}
    
import './styles/style.scss'

await initKeycloak();

const app = createApp(App);

app.use(router)
app.mount('#app')   

