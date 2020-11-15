import Vue from 'vue'

import VueCryptojs from 'vue-cryptojs'
import VueGeolocation from 'vue-browser-geolocation'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/stylesheets/index.scss'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueCryptojs)
Vue.use(VueGeolocation)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
