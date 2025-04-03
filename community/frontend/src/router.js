import { createRouter, createWebHistory } from 'vue-router';
import Business from './components/Businesses.vue'
const EditUser = () => import('./components/EditUser.vue')
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
        component: Business
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes 
});

export default router;