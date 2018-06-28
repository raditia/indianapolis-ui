<template>
    <!-- Content Wrapper. Contains page content -->
  <div v-if="authUser===null">
    <!-- Main content -->
    <section class="content">
      <router-view class="view" keep-alive transition transition-mode="out-in">
      </router-view>
    </section>
    <!-- /.content -->
  </div>
    <div v-else class="content-wrapper">
      <!-- Main content -->
      <section class="content">
        <router-view class="view" keep-alive transition transition-mode="out-in">
        </router-view>
      </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
</template>

<script>
export default {
  name: 'Content',
  data () {
    return {
    }
  },
  computed: {
    authUser () {
      return window.localStorage.getItem('user')
    }
  }
}
</script>
