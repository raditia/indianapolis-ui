<template>
  <div class="login-box">
    <div class="login-logo">
      <router-link to="/">
        <a>
          <span class="logo-lg">
            <img class="blibli-login-logo" src="../../assets/img/blibli-white.png"/>
          </span>
        </a>
      </router-link>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg">Sign in to start your session</p>
      <form v-on:submit.prevent="login()">
        <div v-if="!success && messages == 'Login failed!'">
          <div class="alert alert-danger">
            <a href="#" class="close" data-dismiss="alert">&times;</a>
            {{ messages }}
          </div>
        </div>

        <div v-if="success && messages == 'Login success!'">
          <div class="alert alert-success">
            <a href="#" class="close" data-dismiss="alert">&times;</a>
            {{ messages }}
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group has-feedback">
              <input type="text" class="form-control" placeholder="Email" v-model="loginDetails.email">
              <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12">
            <div class="form-group has-feedback">
              <input type="password" class="form-control" placeholder="Password" v-model="loginDetails.password">
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
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      messages: '',
      success: false,
      loginDetails: {
        email: '',
        password: ''
      },
      loginDataResponse: {
        userId: '',
        userName: '',
        userRole: ''
      }
    }
  },
  methods: {
    login: function () {
      axios.post(
        '/api/login', {
          email: this.loginDetails.email,
          password: this.loginDetails.password
        }, {
          headers: {
            'Content-type': 'application/json'
          }
        })
        .then(response => {
          this.loginDataResponse = response.data.data
          if (this.loginDataResponse != null) {
            window.localStorage.setItem('user', JSON.stringify(this.loginDataResponse))
            this.success = true
            this.messages = 'Login success!'
            if (this.loginDataResponse.userRole === 'tp') {
              window.location.href = '/upload-cff'
            } else if (this.loginDataResponse.userRole === 'scm') {
              window.location.href = '/manage-cff'
            }
          } else {
            this.messages = 'Login failed!'
          }
        })
        .catch(error => {
          console.log('Error : ' + error)
        })
    },
    checkLoginStatus: function () {
      const status = JSON.parse(window.localStorage.getItem('user'))
      var app = this

      if (status === null || status === undefined) {
        app.$router.push('/')
      } else if (status.userRole === 'tp') {
        window.location.href = '/upload-cff'
      } else if (status.userRole === 'scm') {
        window.location.href = '/manage-cff'
      }
    }
  },
  created: function () {
    this.checkLoginStatus()
  }
}
</script>
<style>
  html, body {
    background-color: #1991eb;
  }
  .blibli-login-logo {
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
