import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { initKeycloak } from './keycloak'

// import parent styles during dev
if (import.meta.env.DEV)
{
    import("@/styles/bootstrap.min.css");
    import("@scss/main.scss");
    import("@css/creative.css");
}

try{
    await initKeycloak();
}
catch{
    console.log("Failed to initialize Oath");
}

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#Community-app');

