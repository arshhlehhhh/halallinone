<template>
  <b-row class="forgotPassword">
    <b-col md="2" class="green"></b-col>
    <b-col>
      <br>
      <b-alert show variant="success" v-if="success" class="text-center">{{ success }}</b-alert>
      <div class="title">
        <img src="../assets/logo.png">
      </div>
      <!-- Form Input -->
      <div class="spacing">
        <b-card title="Forgot your Password?" style="max-width: 50%;">
          <b-card-text>
            Don't worry about it! Just enter your email here so you can reset your password and explore all the
            delicious halal food once more.
          </b-card-text>
          <b-form v-on:submit.prevent="sendEmail()">
            <b-form-group label-for="email">
              <b-form-input id="email" v-model="email" type="email" placeholder="Email" required="required">
              </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="success" style="width:100%;">Reset your Password</b-button>
          </b-form>
        </b-card>
      </div>
    </b-col>
    <b-col md="2" class="green"></b-col>
  </b-row>
</template>

<script>
import emailjs from 'emailjs-com'
import generator from 'generate-password'
import Vue from 'vue'
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      userName: '',
      success: ''
    }
  },
  methods: {
    //  1. use session's email and username to populate
    // 2. find a random generator
    // 3. set the random generated pw to the the one sending for email
    // 4. hash the  random generated pw then update
    sendEmail (e) {
      // retrieve email input
      var emailInput = this.email
      // generate pw
      var plainTextPw = generator.generate({
        length: 10,
        numbers: true
      })
      // call axios get using email
      const emailUrl = 'https://wad2-hallallinone.et.r.appspot.com/user/get/email=' + emailInput
      axios.get(emailUrl).then((response) => {
        if (response.status === 200) {
          this.userName = response.data.User[0].username
          emailjs.init('user_glh56R2pIXKnq8Xg9mNJi')
          emailjs.send('service_yklx8g8', 'template_5myj1hr', {
            to_name: this.userName,
            password: plainTextPw,
            to_email: emailInput
          })
            .then((result) => {
              this.success = 'Email sent! Please check your email to change your password!'
              this.email = ''
              // generate sha 256 hash
              var cryptoObject = Vue.CryptoJS.SHA256(plainTextPw).toString()
              // setup to push
              var updateUserName = this.userName
              const urlUpdateDB = 'https://wad2-hallallinone.et.r.appspot.com/user/changepassword'
              const auth = { username: updateUserName, password: cryptoObject }
              // set up axios post
              axios.post(urlUpdateDB, auth).then((response) => {
                if (response.status === 201) {
                  console.log('pw updated in db!')
                }
              }, function (err) {
                console.log('err', err)
              })
            }, (error) => {
              console.log('FAILED...', error)
            })
        }
      }, function (err) {
        console.log('err', err)
      })
    }
  }
}
</script>
