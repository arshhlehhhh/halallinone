<template>
  <b-row class="settings">
    <b-col md="2" class="green"></b-col>
    <b-col>
      <div class="title">
        <img src="../assets/logo.png">
      </div>
      <div class="password-content">
        <b-alert> {{error}} </b-alert>
        <div>
          <h2>Reset Password</h2>
          <h6> Need to reset your password? Fill in the form here so you can reset your password and explore all the
            delicious halal food once more.</h6>
          <b-form v-on:submit.prevent="reset()">
            <b-row class="my-1">
              <b-col sm="2">
                <label for="OldPassword">Old Password:</label>
              </b-col>
              <b-col sm="10">
                <b-form-input id="OldPassword" placeholder="Old Password" v-model="resetPassword.OldPassword">
                </b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2">
                <label for="NewPassword">New Password:</label>
              </b-col>
              <b-col sm="10">
                <b-form-input id="NewPassword" placeholder="New Password" v-model="resetPassword.NewPassword">
                </b-form-input>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="2">
                <label for="ConfirmPassword">Confirm New Password: </label>
              </b-col>
              <b-col sm="10">
                <b-form-input id="Confirm Password" placeholder="Confirm New Password"
                  v-model="resetPassword.ConfirmPassword"></b-form-input>
              </b-col>
            </b-row>
            <div>
              <b-alert show variant="danger" v-if="error" class="text-center">{{ error }}</b-alert>
            </div>
            <div>
              <b-alert show variant="success" v-if="success" class="text-center">{{ success }}</b-alert>
            </div>
            <b-button variant="success" style="width:100%;" type="submit">Reset your Password</b-button>
          </b-form>
        <h5> Have you forgotten your old password? No worries! Just click here to reset your password through email!</h5>
        <b-button v-on:submit="emailreset()" style="background-color: #155C2D ; width:100%">Reset through email!</b-button>
        <br>
        <br>
      </div>
      </div>
    </b-col>
    <b-col md="2" class="green"></b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'

export default {
  name: 'Settings',
  components: {
  },
  data () {
    return {
      resetPassword: {
        OldPassword: '',
        NewPassword: '',
        ConfirmPassword: ''
      },
      error: '',
      success: ''
    }
  },
  methods: {
    reset () {
      // console.log(this.$session.exists())
      // console.log(this.$session.get('username'))
      // console.log(this.resetPassword.OldPassword)
      var NewPassword = this.resetPassword.NewPassword
      var ConfirmPassword = this.resetPassword.ConfirmPassword
      if (NewPassword !== ConfirmPassword) {
        this.error = 'Your New Password does not match your Confirmed Password!'
      }
      var oldcryptoObject = Vue.CryptoJS.SHA256(this.resetPassword.OldPassword).toString()
      var newcryptoObject = Vue.CryptoJS.SHA256(this.resetPassword.NewPassword).toString()
      // console.log(oldcryptoObject)
      // console.log(newcryptoObject)
      axios
        .get('https://wad2-hallallinone.et.r.appspot.com/user/get/username=' + this.$session.get('username'))
        .then((response) => {
          // console.log(response.data)
          // console.log(response.data.User[0].password)
          if (response.data.User[0].password === oldcryptoObject) {
            console.log('YES')
            if (NewPassword === ConfirmPassword) {
              console.log('yesyes')
              const url = 'https://wad2-hallallinone.et.r.appspot.com/user/changepassword'
              const auth = { username: this.$session.get('username'), password: newcryptoObject }
              axios.post(url, auth).then((response) => {
                // console.log(response.status)
                console.log(response.data)
              }
              )
              this.success = 'Password Change Successful!'
              this.error = ''
            }
          } else {
            this.error = 'Your Old Password you have entered is incorrect.'
          }
        })
      return this.error
    }
  }
}
</script>
