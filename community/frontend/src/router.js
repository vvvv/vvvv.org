import { createRouter, createWebHistory } from 'vue-router';
import Business from './Pages/Business.vue'
import Users from './Pages/Users.vue'
const EditUser = () => import('./Pages/EditUser.vue')

const routes = [
    {
        path: '/',
        name: 'Home',
        component: { template: '<h1>Home</h1>' }
    },
    {
        path: '/user',
        name: 'Users',
        component: Users
    },
    {
        path: '/user/edit',
        name: 'Edit',
        component: EditUser
    },
    {
        path: '/user/buisnesses',
        name: 'Businesses',
        component: Business
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes 
});

export default router;