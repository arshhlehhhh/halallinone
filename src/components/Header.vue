<template>
  <b-row class="header">
    <b-col sm="6" md="12" style="padding: 0%;">
      <b-navbar type="dark" toggleable="lg">
        <div class="mx-auto d-sm-flex d-block flex-sm-nowrap">
          <!-- Home Button -->
          <b-navbar-brand class="mx-5">
            <router-link to="/">HALALLINONE</router-link>
          </b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
          <!-- Search Field & Button -->
            <b-navbar-nav>
              <b-nav-form class="mx-3">
                <b-form-input size="sm" class="mr-sm-2" placeholder="Search restaurant name ..."></b-form-input>
                <!-- <b-button size="sm" class="my-2 my-sm-0" type="submit"> Search</b-button> -->
                <b-button pill variant="outline-light" size="sm">
                  <b-icon-search></b-icon-search>
                </b-button>
              </b-nav-form>
            </b-navbar-nav>
            <!-- Region Button -->
            <b-navbar-nav>
              <b-nav-item-dropdown text="REGIONS" class="mx-3">
                <b-dropdown-item v-for="region in regions" :key="region.name" variant="secondary" b-link
                  :to="`/${region.value}`" @click="reload(), count++">
                  {{ region.name }}
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
            <!-- About Us Button -->
            <b-navbar-nav class="mx-3">
              <b-nav-item>
                <router-link to="/about">ABOUT US</router-link>
              </b-nav-item>
            </b-navbar-nav>
            <!-- Contribute Button -->
            <b-navbar-nav class="mx-3">
              <b-nav-item @click="something()" v-if="logged">
                <router-link to="/contribute">CONTRIBUTE</router-link>
              </b-nav-item>
              <b-nav-item @click="something()" v-else v-b-modal="'my-modal'">
                CONTRIBUTE
              </b-nav-item>
            </b-navbar-nav>
            <LogIn />
          </b-collapse>
        </div>
      </b-navbar>
    </b-col>
  </b-row>
</template>

<script>
import LogIn from '@/components/LogIn.vue'
import { loginMixin } from '../mixins/loginMixin'
export default {
  components: {
    LogIn
  },
  mixins: [loginMixin],
  data () {
    return {
      regions: [
        { name: 'North', value: 'north' },
        { name: 'North-East', value: 'north-east' },
        { name: 'South', value: 'south' },
        { name: 'East', value: 'east' },
        { name: 'West', value: 'west' },
        { name: 'Central', value: 'central' }
      ],
      count: 0,
      past: '',
      logged: false
    }
  },
  methods: {
    reload () {
      if (this.count === 0 && this.past === '') {
        this.past = this.$router.currentRoute.path
      }
      if (this.count > 0 && this.$router.currentRoute.path === this.past) {
        this.$router.go(this.$router.currentRoute)
      }
      this.past = this.$router.currentRoute.path
    },
    something () {
      if (this.$session.exists()) {
        this.logged = true
      } else {
        this.logged = false
      }
    }
  }
}
</script>
