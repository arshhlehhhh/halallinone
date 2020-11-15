<template>
  <div class="contributeSection">
    <b-jumbotron class="justify-content-center text-center text-white vertical-center" style="opacity: 0.7; height: 400px;">
        <div class="container">
          <h2>Found a restaurant that's not here?</h2>
          <p>Click on the button below to contribute to this page.</p>
          <b-button variant="light" v-if="logged"><router-link to="/contribute">CONTRIBUTE</router-link></b-button>
          <b-button variant="light" v-b-modal="'my-modal'" @click="something()" v-else>CONTRIBUTE</b-button>
        </div>
    </b-jumbotron>
  </div>
</template>

<script>
import Vue from 'vue'
import VueSession from 'vue-session'
import { loginMixin } from '../mixins/loginMixin'
Vue.use(VueSession)

export default {
  mixins: [loginMixin],
  data () {
    return {
      logged: false
    }
  },
  methods: {
    something () {
      this.logged = this.$session.exists()
    }
  }
}
</script>
