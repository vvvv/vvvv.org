import { createRouter, createWebHistory } from 'vue-router';
import Businesses from './components/Businesses.vue'
import ForHireList from './components/lists/ForHireList.vue';
const EditUser = () => import('./components/profile/EditUser.vue')
const Users = () => import('./components/Users.vue')

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