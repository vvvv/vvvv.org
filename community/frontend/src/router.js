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
        path: '/',
        name: 'Home',
        component: { template: '<h1>Home</h1>' }
    },
    {
        path: '/user',
        name: 'User',
        component: Users
    },
    {
        path: '/user/edit',
        name: 'Edit',
        component: EditUser,
        beforeEnter: requireAuth
    },
    {
        path: '/user/businesses',
        name: 'Businesses',
        component: Businesses
    },
    {
        path: '/user/forhire',
        name: 'For Hire',
        component: ForHireList
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes 
});

export default router;