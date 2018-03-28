<template>
  <div class="row">
    <div class="col-sm-12 col-md-12">
      <h3>Welcome !!!</h3>
      <p>
        MANTAPANJENG
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
    }
  },
  route: {
    activate (t) {
      this.$parent.$parent.$data.title = 'Dashboard'
      t.next()
    }
  }
}
</script>
