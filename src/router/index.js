import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import HelloWorld from '@/components/HelloWorld'
import Upload from '@/components/TP/Upload'
import UploadMerchant from '@/components/TP/UploadMerchant'

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
      path: '/merchant',
      name: 'upload-merchant',
      component: UploadMerchant
    }
  ]
})
