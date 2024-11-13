import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Task tracker app',
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
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
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject,
    )
  })
}
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
