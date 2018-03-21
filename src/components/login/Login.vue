<template>
  <div class="container">
    <img src="/src/assets/img/blibli-white.png">
    <div class="login-form">
      <label>username</label>
      <input type="text" class="form-control" placeholder="username"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  created: function () {
    window.document.title = 'Indianapolis Login'
  }
}
</script>

<style>
  html, body {
    background-color: #1991eb;
  }

  .login-form {
    width: 341px;
    height: 398px;
    border-radius: 10px;
    background-color: #ffffff;
    border: solid 1px #d0e1ea;
    margin-left: auto;
    margin-right: auto;

  }
</style>
