import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated, kclogin } from './keycloak-helper.js'
import { isRouteLoading } from "./globalState.js"
import Overview from "./routes/Overview.vue"

const People = () => import('./routes/People.vue');
const UserView = () => import('./routes/UserView.vue');

const Map = () => import('./routes/Map.vue');

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
        path: '/people/',
        name: 'People',
        component: People,
        meta: { tabName: 'People', visible: true, isLeft: true, order: 1 }
    },
    {
        path: '/people/:username',
        name: 'Personal Profile',
        component: UserView,
        meta: { tabName: 'People' }
    },
    {
        path: '/forhire/',
        name: 'For Hire',
        component: ForHireList,
        meta: { tabName: 'For Hire', visible: true, isLeft: true, order: 2 }
    },
    {
        path: '/business/',
        name: 'Businesses',
        component: BusinessList,
        meta: { tabName: 'Businesses', visible: true, isLeft: true, order: 3 }
    },
    {
        path: '/business/:slug',
        name: 'Business Profile',
        component: BusinessView,
        meta: { tabName: 'Businesses' }
    },
    {
        path: '/edu/',
        name: 'Educational Institutions',
        component: EduList,
        meta: { tabName: 'Educational Institutions', visible: true, isLeft: true, order: 4 }
    },
    {
        path: '/edu/:slug',
        name: 'Educational Institution Profile',
        component: EduView,
        meta: { tabName: 'Educational Institutions' }
    },
    {
        path: '/edit-profile/',
        name: 'Edit Profile',
        component: EditUser,
        beforeEnter: requireAuth,
        meta: { tabName: 'Profile', visible: true, isLeft: false }
    },
    {
        path: '/map/',
        name: 'Map Dev',
        component: Map,
        meta: { tabName: 'Map', visible: false, isLeft: false }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    strict: false,
    scrollBehavior(to, from, savedPosition) {
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ left: 0, top: 0 })
        }, 200)
        })
    },
});

// Add global navigation guards for loading state
router.beforeEach((to, from) => {
    document.title = to.meta?.visible ? to.name : to.params?.name ? 'Profile: ' + to.params.name : to.params?.username ? 'Profile: ' + to.params.username : to.name;
    isRouteLoading.value = true; // Start loading
});

router.afterEach(() => {
    isRouteLoading.value = false; // Stop loading
});


export default router;