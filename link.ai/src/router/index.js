import { createRouter, createWebHistory } from 'vue-router'

// Import views
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('../views/Services.vue')
  },
  {
    path: '/service/:id',
    name: 'ServiceDetail',
    component: () => import('../views/ServiceDetail.vue')
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: () => import('../views/Jobs.vue')
  },
  {
    path: '/job/:id',
    name: 'JobDetail',
    component: () => import('../views/JobDetail.vue')
  },
  {
    path: '/post-job',
    name: 'PostJob',
    component: () => import('../views/PostJob.vue'),
    meta: { requiresAuth: true, requiresCompany: true }
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/company/:id',
    name: 'CompanyProfile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () => import('../views/Messages.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userType = localStorage.getItem('userType')

  // Check if route requires authentication
  if (to.meta.requiresAuth && !token) {
    next({ path: '/login', query: { redirect: to.fullPath } })
    return
  }

  // Check if route requires company account
  if (to.meta.requiresCompany && userType !== 'client') {
    next({ path: '/dashboard' })
    return
  }

  // Check if route requires freelancer account
  if (to.meta.requiresFreelancer && userType !== 'freelancer') {
    next({ path: '/dashboard' })
    return
  }

  next()
})

export default router
