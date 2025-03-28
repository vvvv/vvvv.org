import Vue from 'vue'
import App from './App.vue'
import router from './router';
import Vueform from '@vueform/vueform'
import vueformConfig from '../vueform.config'
import keycloak from './keycloak';


// import './styles/bootstrap.min.css'
// import './styles/_header.min.css'
import './styles/style.scss'
import './styles/vueform.scss'

const page = document.getElementById("app").getAttribute("page")

keycloak
.init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: `${location.origin}/user/sso.html`
})
.then(authenticated => {
    if (authenticated) {
      // Make Keycloak instance available globally
      Vue.prototype.$keycloak = keycloak;
  
      new Vue({
        router,
        render: h => h(App)
      }).$mount('#app');
    } else {
      window.location.reload();
    }
})
.catch(() => {
    console.error('Failed to initialize Keycloak');
});

// Conditionally load VueForm plugin
router.beforeEach((to, from, next) => {
    if (to.name === 'Form') {
      import('@vueform/vueform').then(VueForm => {
        Vue.use(VueForm);
        next();
      });
    } else {
      next();
    }
});