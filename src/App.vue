<template>
  <div v-if="authUser===null">
    <app-content></app-content>
  </div>
  <div v-else>
    <app-header></app-header>
    <app-sidebar></app-sidebar>
    <app-content></app-content>
  </div>
</template>

<script>
import AppHeader from './pages/layouts/Header'
import AppSidebar from './pages/layouts/Sidebar'
import AppContent from './pages/layouts/Content'
import Menus from './../config/menus'

export default {
  name: 'App',
  data () {
    return {
      menus: Menus
    }
  },
  computed: {
    authUser () {
      return window.localStorage.getItem('user')
    }
  },
  replace: false,
  components: {
    AppHeader,
    AppSidebar,
    AppContent
  }
}
</script>

<style src="../static/adminLte/css/skins/_all-skins.min.css"></style>
<style src="../static/adminLte/css/AdminLTE.min.css"></style>
