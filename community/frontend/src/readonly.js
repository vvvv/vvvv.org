import App from './App.vue'
import { createApp } from 'vue'
import './styles/bootstrap.min.css'
import './styles/_header.min.css'
import './styles/style.scss'

const page = document.getElementById("app").getAttribute("page")

createApp(App, {
    page: page
}).mount('#app')