import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/login/Login'

import Login from '@/pages/login/Login'
import Dashboard from '@/pages/Dashboard'
import Setting from '@/pages/Setting'
import AccessDenied from '@/components/AccessDenied'

// User
import User from '@/pages/users/User'
import UserList from '@/pages/users/UserList'
import UserNew from '@/pages/users/UserNew'

// TP
import UploadCff from '@/pages/TP/UploadCff'
import Status from '@/pages/TP/Status'

// SCM
import RecommendationPage from '@/pages/SCM/RecommendationPage'
import ManageCFFPage from '@/pages/SCM/ManageCFFPage'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/denied',
    name: 'accessDenied',
    component: AccessDenied,
    meta: {requiresAuth: false, scmAuth: false, tpAuth: false}
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {requiresAuth: false, scmAuth: false, tpAuth: false}
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
    meta: {requiresAuth: true, scmAuth: false, tpAuth: true}
  },
  {
    path: '/status',
    name: 'status',
    component: Status,
    meta: {requiresAuth: true, scmAuth: false, tpAuth: true}
  },
  {
    path: '/manage-cff',
    name: 'manageCff',
    component: ManageCFFPage,
    meta: {requiresAuth: true, scmAuth: true, tpAuth: false}
  },
  {
    path: '/recommendation',
    name: 'recommendation',
    component: RecommendationPage,
    meta: {requiresAuth: true, scmAuth: true, tpAuth: false}
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('user'))
    if (!authUser) {
      next('/')
    } else if (to.meta.tpAuth) {
      const authUser = JSON.parse(window.localStorage.getItem('user'))
      if (authUser.userRole === 'tp') {
        next()
      } else if (authUser.userRole === 'scm') {
        next('/denied')
      }
    } else if (to.meta.scmAuth) {
      const authUser = JSON.parse(window.localStorage.getItem('user'))
      if (authUser.userRole === 'scm') {
        next()
      } else if (authUser.userRole === 'tp') {
        next('/denied')
      }
    }
  } else {
    next()
  }
})

export default router
