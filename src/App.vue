<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/forgetpassword">ForgetPassword</router-link> |
      <router-link to="/settings">Settings</router-link> |
      <router-link to="/account">Account</router-link> |
      <router-link to="/admin">Admin</router-link>
    </div>
    <Header/>
    <b-container fluid>
      <transition appear name="slide-fade" mode="out-in">
        <router-view/>
      </transition>
    </b-container>
    <Footer/>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>
