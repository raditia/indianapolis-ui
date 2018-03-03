<template>
  <div id="app">
    <img src="./assets/img/blibli-white.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  html, body {
    background-color: #1991eb;
  }

  img {
    width: 200px;
    height: 60px;
    padding-bottom: 10px;
  }
</style>
