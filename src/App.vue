<template>
  <div id="app">
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
