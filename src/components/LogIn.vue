<template>
  <b-navbar-nav class="mx-3">
    <!-- v if not log in show this  -->
    <b-nav-item-dropdown v-if="success" id="success" :text= "logName">
    <!-- Dropdown menu: Settings | LogOut -->
    <b-dropdown-item v-if="role === 'Admin'" id="role" ><router-link to="/admin">Admin Page</router-link></b-dropdown-item>
    <b-dropdown-item b-link :to="`/settings`">Settings</b-dropdown-item>
    <b-dropdown-item v-on:click="LogOut()" ref="btnSuccess"><router-link to="/">Logout</router-link></b-dropdown-item>
    </b-nav-item-dropdown>
    <b-nav-item v-else id="success" v-b-modal="'my-modal'">LOG IN / SIGN UP</b-nav-item>
    <!-- Logout Modal -->
    <b-modal id="logoutSuccess-modal" hide-footer hide-header>
      <div class="text-center" style="margin:30px 20px">
        <h4>You have successfully logged out!</h4>
        <b-button class="mt-3" variant="outline-success" block @click="okay()">Okay!</b-button>
      </div>
    </b-modal>
    <b-modal id="my-modal" hide-footer>
      <b-tabs content-class="mt-3" fill>
        <!-- Login part -->
        <b-tab title="Login" active>
          <div class="login-form">
            <div class="text-center">
              <h2>Log in to your account</h2>
              <h5> Discover new halal food places </h5>
            </div>
            <form v-on:submit.prevent="LogIn()">
              <div class="form-group">
                <div class="input-group">
                  <input type="text" class="form-control" name="username" v-model="login.username" placeholder="Username" required="required">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="password" class="form-control" name="password" v-model="login.password" placeholder="Password" required="required">
                </div>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-success login-btn btn-block">Sign in</button>
              </div>
              <div class="text-center">
                <router-link to="/forgetpassword" @click.native="hideModal('my-modal')">
                  Forgot Password?
                </router-link>
              </div>
            </form>
          </div>
        </b-tab>
        <!-- Sign up part -->
        <b-tab title="Sign Up">
          <div class="signup-form">
            <div class="text-center">
              <h2>Get Started!</h2>
              <h5> Create an account and start exploring </h5>
            </div>
            <form v-on:submit.prevent="Register()">
              <div class="form-group">
                <div class="input-group">
                  <input type="text" class="form-control" name="username" v-model="register.username" placeholder="Username" required="required">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="email" class="form-control" name="email" v-model="register.email" placeholder="Email" required="required">
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input type="password" class="form-control" name="password" v-model="register.password" placeholder="Password" required="required">
                </div>
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-success login-btn btn-block" >Create Account</button>
              </div>
            </form>
          </div>
        </b-tab>
      </b-tabs>
    </b-modal>
  </b-navbar-nav>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueSession from 'vue-session'
Vue.use(VueSession)
export default {
  name: 'login',
  data () {
    return {
      showModal: true,
      login: {
        username: '',
        password: ''
      },
      register: {
        username: '',
        email: '',
        password: ''
      },
      logName: null,
      success: false,
      role: null,
      checkUser: false
    }
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      // this.$router.push('/')
    }
  },
  methods: {
    hideModal (id) {
      this.$root.$emit('bv::hide::modal', id)
    },
    LogIn () {
      var cryptoObject = Vue.CryptoJS.SHA256(this.login.password).toString()
      const auth = { username: this.login.username, password: cryptoObject }
      // const authJson = JSON.stringify(auth)
      const url = 'https://wad2-hallallinone.et.r.appspot.com/user/authenticate'
      axios.post(url, auth).then((response) => {
        if (response.status === 201) {
          this.$session.start()
          this.$session.set('jwt', response.data.token)
          this.$session.set('username', response.data.username)
          this.$session.set('email', response.data.email)
          this.$session.set('role_id', response.data.role_id)
          this.logName = this.$session.get('username')
          this.role = this.$session.get('role_id')
          axios.defaults.headers.common.Authorization = 'Bearer ' + response.data.token
          this.hideModal('my-modal')
          this.success = true
        }
      }, function (err) {
        console.log('err', err)
      }
      )
    },
    okay () {
      this.hideModal('logoutSuccess-modal')
      this.$router.go('/')
    },
    LogOut () {
    // sesssion
      this.$session.destroy()
      this.success = false
      this.hideModal('my-modal')
      this.login.username = ''
      this.login.password = ''
      this.$root.$emit('bv::show::modal', 'logoutSuccess-modal', '#btnSucess')
    },
    Register () {
      const urlUserName = 'https://wad2-hallallinone.et.r.appspot.com/user/get/username=' + this.register.username
      const urlUserEmail = 'https://wad2-hallallinone.et.r.appspot.com/user/get/email=' + this.register.email
      const UserStatus = axios.get(urlUserName)
      if (UserStatus.status !== 200) {
        this.checkUser = true
      }
      const UserEmail = axios.get(urlUserEmail)
      if (UserEmail.status !== 200) {
        this.checkUser = true
      }
      if (this.checkUser) {
        this.role = 'User'
        var cryptoObject = Vue.CryptoJS.SHA256(this.register.password).toString()
        const auth = { username: this.register.username, password: cryptoObject, email: this.register.email, role_id: this.role }
        const url = 'https://wad2-hallallinone.et.r.appspot.com/user/add'
        axios.post(url, auth).then((response) => {
          console.log(response.status)
          if (response.status === 201) {
            this.$session.start()
            this.$session.set('jwt', response.data.token)
            this.$session.set('username', response.data.username)
            this.$session.set('email', response.data.email)
            this.$session.set('role_id', response.data.role_id)
            this.logName = this.$session.get('username')
            this.role = this.$session.get('role_id')
            axios.defaults.headers.common.Authorization = 'Bearer ' + response.data.token
            this.hideModal('my-modal')
            this.success = true
            // this.role = ''
          }
        }, function (err) {
          console.log('err', err)
        })
      }
    }
  }
}
</script>
