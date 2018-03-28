import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/login/Login'
import HelloWorld from '@/components/HelloWorld'
import Upload from '@/components/TP/Upload'
import BasePack from '@/components/BasePack'

import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import Setting from '@/pages/Setting'
// User
import User from '@/pages/users/User'
import UserList from '@/pages/users/UserList'
import UserNew from '@/pages/users/UserNew'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    {
      path: '/base',
      name: 'base-pack',
      component: BasePack
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
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
    }
  ]
})
