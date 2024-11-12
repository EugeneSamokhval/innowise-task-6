import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register',
      name: 'Registration page',
      component: () => import('../views/RegistrationView.vue'),
    },
    {
      path: '/login',
      name: 'Login page',
      component: () => import('../views/LoginView.vue'),
    },
  ],
})

export default router
