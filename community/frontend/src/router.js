import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated, kclogin } from './keycloak-helper.js'
import { isRouteLoading } from "./globalState.js"
import Overview from "./routes/Overview.vue"

const Users = () => import('./routes/Users.vue');
const EditUser = () => import('./routes/EditUser.vue');
const Businesses = () => import('./routes/Businesses.vue');
const ForHireList = () => import('./routes/ForHireList.vue');

const requireAuth = (to, from, next) => {
    if (isAuthenticated()){
        next();
    } 
    else {
        kclogin(window.location.origin + to.fullPath.split('#')[0]);
    }
}


const routes = [
    {
        path: '/user/',
        name: 'Overview',
        component: Overview,
        meta: { tabName: 'Overview', isLeft: true, order: 0 }
    },
    {
        path: '/user/list',
        name: 'Users',
        component: Users,
        meta: { tabName: 'Users', isLeft: true, order: 1 }
    },
    {
        path: '/user/businesses/',
        name: 'Businesses',
        component: Businesses,
        meta: { tabName: 'Businesses', isLeft: true, order: 2 }
    },
    {
        path: '/user/forhire/',
        name: 'For Hire',
        component: ForHireList,
        meta: { tabName: 'For Hire', isLeft: true, order: 3 }
    },
    {
        path: '/user/edit/',
        name: 'Edit',
        component: EditUser,
        beforeEnter: requireAuth,
        meta: { tabName: 'Profile', isLeft: false }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    strict: false
});

// Add global navigation guards for loading state
router.beforeEach((to, from, next) => {
    isRouteLoading.value = true; // Start loading
    next();
});

router.afterEach(() => {
    isRouteLoading.value = false; // Stop loading
});


export default router;