import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/login/Login'

import Login from '@/pages/login/Login'
import Dashboard from '@/pages/Dashboard'
import Setting from '@/pages/Setting'

// User
import User from '@/pages/users/User'
import UserList from '@/pages/users/UserList'
import UserNew from '@/pages/users/UserNew'

// TP
import UploadCff from '@/pages/TP/UploadCff'
import Status from '@/pages/TP/Status'

// SCM
// import RecommendationPage from '@/pages/SCM/RecommendationPage'
import ManageCFFPage from '@/pages/SCM/ManageCFFPage'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    // meta: {requiresAuth: true, adminAuth: true, residentAuth: false}
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    subRoutes: {
      '/list': {
        component: UserList
      },
      '/new': {
        component: UserNew
      }
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: Setting
  },
  {
    path: '/upload-cff',
    name: 'uploadCff',
    component: UploadCff,
    // meta: { requiresAuth: true, residentAuth: true, adminAuth: false }
  },
  {
    path: '/status',
    name: 'Status',
    component: Status
  },
  {
    path: '/manage-cff',
    name: 'ManageCFF',
    component: ManageCFFPage
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
    if (!authUser || !authUser.token) {
      next({name: 'Login'})
    } else if (to.meta.adminAuth) {
      const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
      if (authUser.data.role_id === 'ADMIN') {
        next()
      } else {
        next('/manage-cff')
      }
    } else if (to.meta.residentAuth) {
      const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
      if (authUser.data.role_id === 'RESIDENT') {
        next()
      } else {
        console.log('Im in admin')
        next('/dashboard')
      }
    }
  } else {
    next()
  }
})

export default router
