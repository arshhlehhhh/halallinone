<template>
  <b-row class="home">
    <b-col md="2" class="green"></b-col>
    <b-col>
      <div class="carousel-section">
        <b-carousel id="carousel-1" v-model="slide" :interval="6000" controls indicators variant="dark"
          style="text-shadow: 2px 2px 2px #2c3e50;" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
          <!-- 1. Slides with custom text -->
          <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
          <b-carousel-slide>
            <template v-slot:img>
              <img class="d-block img-fluid w-100" src="../assets/halal_corner_front.jpg" alt="image slot">
            </template>
            <div class="info">
              <h1>The Halal Corner</h1>
              <p>Formerly known as Asyraf's Halal Corner, The Halal Corner is located in Bedok. Bringing you quality halal Western fusion dishes.</p>
            </div>
          </b-carousel-slide>

          <!-- 2. Slides with custom text -->
          <b-carousel-slide>
            <template v-slot:img>
              <img class="d-block img-fluid w-100" src="../assets/The_Straits_Teppanyaki.jpg" alt="image slot">
            </template>
            <div class="info">
              <h1>The Straits Teppanyaki</h1>
              <p>The new restaurant focuses on Asian and Western cuisines cooked and grilled on a hot metal plate, using the Japanese Teppanyaki method and style of cooking.</p>
            </div>
          </b-carousel-slide>

          <!-- 3. Slides with custom text -->
          <b-carousel-slide>
            <template v-slot:img>
              <img class="d-block img-fluid w-100" src="../assets/Rumi_The_Poets_Cup.jpg" alt="image slot">
            </template>
            <div class="info">
              <h1>Rumi The Poets Cup</h1>
              <p>The beverage brand is known for their artisanal drinks that come with special poetry notes. Rumi’s drinks are categorized largely into three main categories: The Dairy Collezione, The Mocktails and The Frizantea.</p>
            </div>
          </b-carousel-slide>
        </b-carousel>
      </div>
      <!-- Restaurants populate based on current location -->
      <div style="margin-top: 20px;">
        <h1 class="text-center">Restaurants Near You</h1>
        <h6 class="text-center">Current Location: {{ address }}</h6>
        <!-- <div class="text-right">View filter buttons</div> -->
        <div class="content">
          <!-- Checks if there's restaurant data then show this || isEmpty(restaurant)-->
          <span v-if="restaurant != undefined && !error">
            <span v-show="restaurant === {}"><b-icon icon="arrow-clockwise" animation="spin" font-scale="4" variant="success"></b-icon></span>
            <b-card-group deck class="justify-content-center">
              <span v-for="store in restaurant" :key="store.id">
                <RestaurantCard :id="store.rid" :stall="store" />
              </span>
            </b-card-group>
          </span>
          <!-- There's no restaurant data so show this -->
          <div v-else style="text-align: center;">
            <img src="../assets/questionmark.png">
            <h2>{{ msg }}</h2>
          </div>
        </div>
      </div>
      <Contribution />
    </b-col>
    <b-col sm="0" md="2" class="green"></b-col>
  </b-row>
</template>

<script>
// @ is an alias to /src
import Contribution from '@/components/Contribution.vue'
import RestaurantCard from '@/components/RestaurantCard.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Contribution,
    RestaurantCard
  },
  data () {
    return {
      slide: 0,
      sliding: null,
      address: '',
      location: '',
      restaurant: {},
      msg: 'There are no restaurants near you.',
      error: false
    }
  },
  created () {
    // Vue-browser-geolocation npm
    this.$getLocation()
      .then(coordinates => {
        // Referred to https://softauthor.com/vuejs-geolocation-get-user-location/
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + coordinates.lat + ',' + coordinates.lng + '&key=AIzaSyCY-JLzRXduQFdrflpjenGd_s58LilUrQU'
        ).then(response => {
          if (response.error_message) {
            console.log(response.error_message)
          } else {
            this.address = response.data.results[0].formatted_address
            var currentLocation = response.data.results[0].address_components[2].long_name
            if (currentLocation === 'Downtown Core') { // Google map records central area as Downtown Core
              this.location = 'region/central'
            } else {
              this.location = 'location/' + currentLocation
            }
            axios.get('https://wad2-hallallinone.et.r.appspot.com/restaurant/search/' + this.location
            ).then(data => {
              this.restaurant = data.data.Restaurant
            }).catch(error => {
              this.error = true
              this.msg = 'Unable to get restaurants.'
              throw new Error(`API ${error}`)
            })
          }
        })
      })
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>
