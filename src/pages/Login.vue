<template>
  <div class="login-box">
    <div class="login-logo">
      <a v-link="{ path: '/' }">
        <span class="logo-lg">
        <img class="blibli-logo" src="../assets/img/blibli-white.png"/>
      </span>
      </a>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg">Sign in to start your session</p>
      <form v-on:submit.prevent="login()">
        <div v-if="!success && messages != ''">
          <div class="alert alert-danger">
            <a href="#" class="close" data-dismiss="alert">&times;</a>
            {{ messages }}
          </div>
        </div>

        <div v-if="success && messages != ''">
          <div class="alert alert-success">
            <a href="#" class="close" data-dismiss="alert">&times;</a>
            {{ messages }}
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group has-feedback">
              <input type="email" class="form-control" placeholder="Email" v-model="email">
              <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group has-feedback">
              <input type="password" class="form-control" placeholder="Password" v-model="password">
              <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-login" style="float: right">Sign In</button>
            </div>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      messages: '',
      success: false,
      body_class: 'hold-transition login-page'
    }
  },
  methods: {
    login () {
      this.$parent.$data.login = false
      this.$parent.$data.body_class = 'sidebar-mini skin-blue-light'
    }
  }
}
</script>
<style>
  html, body {
    background-color: #1991eb;
  }
  .blibli-logo {
    width: 200px;
    height: 65px;
    margin-left: 0px;
    margin-top: 5px;
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
  .btn-login {
    width: 100%;
    height: 50px;
    border-radius: 4px;
    background-color: #1991eb;
  }
</style>
