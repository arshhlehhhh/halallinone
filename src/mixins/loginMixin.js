import Vue from 'vue'
import axios from 'axios'
import VueSession from 'vue-session'
Vue.use(VueSession)

export const loginMixin = {
  name: 'login',
  data: function () {
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
      checkUser: false,
      error: '',
      test: this.$session.get('username')
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
      }).catch(err => {
        if (err.response.status === 405) {
          this.error = 'You might have entered the wrong password or username. Please try again!'
          // console.log(this.error)
        }
      })
      return this.$session.exists()
    },
    LogOut () {
      // sesssion
      this.$session.destroy()
      this.success = false
      this.hideModal('my-modal')
      this.login.username = ''
      this.login.password = ''
      this.error = ''
      this.$root.$emit('bv::show::modal', 'logoutSuccess-modal', '#btnSucess')
      return this.$session.exists()
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
    },
    restart () {
      this.login.username = ''
      this.login.password = ''
      this.register.username = ''
      this.register.email = ''
      this.register.password = ''
      this.error = ''
      this.hideModal('my-modal')
    }
  }
}
