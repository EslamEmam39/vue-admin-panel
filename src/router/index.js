import { createRouter, createWebHistory } from 'vue-router';
import DashboardLayout from "../layouts/DashboardLayout.vue";
import LoginPage from '../views/Login.vue';
import RegisterPage from '../views/Register.vue';
import DashboardPage from '../views/Dashboard.vue';
import ProductsPage from "../views/Products.vue";
import OrdersPage from "../views/Orders.vue";
import ProfilePage from "../views/Profile.vue";

const routes = [
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    

    {  path: "/", 
        component: DashboardLayout,

        children: [
             { path: '/dashboard', component: DashboardPage },
            { path: "/products", component: ProductsPage },
            { path: "/orders", component: OrdersPage },
            { path: "/Profile", component: ProfilePage },
        ]
    },
    
     { path: '/', redirect: '/login' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
