<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'assets/js/vue-material.min.js')
    document.head.appendChild(recaptchaScript)
  }
}
</script>

<style lang="scss">
  @import "assets/css/default.css";
  @import "assets/css/vue-material.min.css";
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
/*}*/
</style>
