import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '../views/DashBoard.vue'
import Login from '../views/LogiN.vue'
import { useAuthStore } from '@/stores/auth'
import { cryptoService } from '@/service/security'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'Login' }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'dashboard',
      component: DashBoard,
      meta: { requiresAuth: true }
    },
    {
      path: '/ptable',
      name: 'ptable',
      component: () => import('../views/pluginTable.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('../views/TableX.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/CategorY.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/pentry',
      name: 'Purchase Entry',
      component: () => import('../views/PurchaseEntryCol.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/purchase',
      name: 'purchase',
      component: () => import('../views/PurChase.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LogouT.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

// Define the custom guard function
function authenticatedGuard(to, from, next) {
  const userData = cryptoService.getUser()
  const authStore = useAuthStore()

  if (userData) {
    // Check if `userData` has value
    // Update Pinia store with the retrieved data
    authStore.setUsername(userData.user)
    authStore.setAuthorized(userData.authorized)
    authStore.setToken(userData.token)
  } else {
    // Handle case where data could not be retrieved
    // Update Vuex store with default values
    authStore.setUsername('')
    authStore.setAuthorized(false)
    authStore.setToken('')
  }

  // Check if the route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if the user is authenticated
    if (authStore.isAuthenticated) {
      // Proceed to the route
      next()
    } else {
      // Redirect to login if not authenticated
      next({ name: 'Login' })
    }
  } else {
    // For routes that don't require authentication, proceed
    next()
  }
}

// Apply the custom guard to your routes
router.beforeEach(authenticatedGuard)

export default router
