import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated, kclogin } from './keycloak-helper.js'
import { isRouteLoading } from "./globalState.js"
import Overview from "./routes/Overview.vue"

const UserList = () => import('./routes/UserList.vue');
const UserView = () => import('./routes/UserView.vue');

const BusinessList = () => import('./routes/BusinessList.vue');
const BusinessView = () => import('./routes/BusinessView.vue');

const EduList = () => import('./routes/EduList.vue');
const EduView = () => import('./routes/EduView.vue');

const ForHireList = () => import('./routes/ForHireList.vue');
const EditUser = () => import('./routes/EditUser.vue');

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
        path: '/community/',
        name: 'Overview',
        component: Overview,
        meta: { tabName: 'Overview', visible: true, isLeft: true, order: 0 }
    },
    {
        path: '/user/',
        name: 'Users',
        component: UserList,
        meta: { tabName: 'Users', visible: true, isLeft: true, order: 1 }
    },
    {
        path: '/user/:username',
        name: 'User Profile',
        component: UserView,
        meta: { tabName: 'Users' }
    },
    {
        path: '/business/',
        name: 'Businesses',
        component: BusinessList,
        meta: { tabName: 'Businesses', visible: true, isLeft: true, order: 2 }
    },
    {
        path: '/business/:name',
        name: 'Business Profile',
        component: BusinessView,
        meta: { tabName: 'Businesses' }
    },
    {
        path: '/edu/',
        name: 'Educational Institutions',
        component: EduList,
        meta: { tabName: 'Educational Institutions', visible: true, isLeft: true, order: 3 }
    },
    {
        path: '/edu/:name',
        name: 'Educational Institution Profile',
        component: EduView,
        meta: { tabName: 'Educational Institutions' }
    },
    {
        path: '/forhire/',
        name: 'For Hire',
        component: ForHireList,
        meta: { tabName: 'For Hire', visible: true, isLeft: true, order: 4 }
    },
    {
        path: '/user/edit/',
        name: 'Edit',
        component: EditUser,
        beforeEnter: requireAuth,
        meta: { tabName: 'Profile', visible: true, isLeft: false }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    strict: false
});

// Add global navigation guards for loading state
router.beforeEach((to, from) => {
    isRouteLoading.value = true; // Start loading
});

router.afterEach(() => {
    isRouteLoading.value = false; // Stop loading
});


export default router;