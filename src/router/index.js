import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import HelloWorld from '@/components/HelloWorld'
import UploadCFF from '@/components/TP/UploadCFF'
import upload from '@/components/upload'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)
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
      path: '/upload-cff',
      name: 'upload-cff',
      component: UploadCFF
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    }
  ]
})
