import Vue from 'vue';
import Router from 'vue-router';
import EditUser from './Pages/EditUser.vue'
import Business from './Pages/Business.vue'
import Users from './Pages/Users.vue'
import keycloak from '@/keycloak';

Vue.use(Router);

const router = new Router({
    mode: history,
    routes: [
        {
        path: '/user',
        name: 'Users',
        component: Users,
        meta: { requiresAuth: false }
        },
        {
            path: '/user/edit',
            name: 'Edit',
            component: EditUser,
            meta: { requiresAuth: true }
        },
        {
            path: '/user/buisnesses',
            name: 'Businesses',
            component: Business,
            meta: { requiresAuth: false }
        }
    ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!keycloak.authenticated) {
      keycloak.login();
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;