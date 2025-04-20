import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated, kclogin } from './keycloak-helper.js'

const Users = () => import('./routes/Users.vue')
const EditUser = () => import('./routes/EditUser.vue')
const Businesses = () => import('./routes/Businesses.vue')
const ForHireList = () => import('./routes/ForHireList.vue')

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
        name: 'Users',
        component: Users,
        meta: { tabName: 'Users', isLeft: true }
    },
    {
        path: '/user/businesses/',
        name: 'Businesses',
        component: Businesses,
        meta: { tabName: 'Businesses', isLeft: true }
    },
    {
        path: '/user/forhire/',
        name: 'For Hire',
        component: ForHireList,
        meta: { tabName: 'For Hire', isLeft: true }
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

export default router;