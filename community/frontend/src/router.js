import { createRouter, createWebHistory } from 'vue-router';
import Users from './components/Users.vue'
const EditUser = () => import('./components/profile/EditUser.vue')
const Businesses = () => import('./components/Businesses.vue')
const ForHireList = () => import('./components/lists/ForHireList.vue')

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
        component: EditUser
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