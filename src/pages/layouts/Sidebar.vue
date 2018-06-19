<template>
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu">
        <li v-for="row in menus" :key="row.name">
          <router-link :to="{ path: row.link }">
            <i :class="`fa ${row.icon}`"></i>
            <span>{{ row.name }}</span>
            <!-- <i v-show="typeOf row.child.length != 'undefined'" class="fa fa-angle-left pull-right"></i> -->
          </router-link>

          <ul v-show="row.hasOwnProperty('child') && typeof row.child.length !== 'undefined'" class="treeview-menu">
            <li v-for="child in row.child" :key="child.name">
              <router-link :to="{ path: child.link }">
                <i :class="`fa ${child.icon}`"></i> {{ child.name }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      menus: this.$parent.$data.menus || []
    }
  },
  ready () {
  }
}
</script>
