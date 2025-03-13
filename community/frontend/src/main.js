import App from './App.vue'
import { createApp } from 'vue'
import Vueform from '@vueform/vueform'
import vueformConfig from '../vueform.config'
// import './styles/bootstrap.min.css'
// import './styles/_header.min.css'
import './styles/style.scss'
import './styles/vueform.scss'

const page = document.getElementById("app").getAttribute("page")

const app = createApp(App, {
    page: page
})

if (page == 'edit')
{
    app.use(Vueform, vueformConfig)
}

app.mount('#app')