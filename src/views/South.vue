<template>
  <b-row class="region">
    <b-col md="2" class="green"></b-col>
    <b-col>
      <!-- Image with title and brief info -->
      <div class="region-jumbotron">
        <b-jumbotron class="justify-content-center text-center text-black vertical-center" style="opacity: 0.7; height: 380px; ">
            <div class="container">
              <h1 style="font-size: 55px;">SOUTH</h1>
              <p style="font-size: 18px;">Singapore does not technically have any "Southern" districts, as the southern
              area of the island is considered the "Central" districts.</p>
              <p>Taken from keylocation.sg</p>
            </div>
        </b-jumbotron>
      </div>
      <!-- Restaurants populate based on region -->
      <div style="margin-top: 20px;">
        <h1 class="text-center">Restaurants In {{ selectedLocation }}</h1>
        <div class="text-center">
          <b-button-group class="filter">
            <b-button variant="light" disabled>Filter by:</b-button>
            <!-- Location Filter button -->
            <b-dropdown right text="Locations" variant="light">
              <b-dropdown-item v-for="location in locations" :key="location.name" @click="clickedLocation = false, showLocation(location.name)">
                {{ location.name }}</b-dropdown-item>
            </b-dropdown>
            <!-- Cuisine Filter button -->
            <b-dropdown right text="Cuisine" variant="light">
              <b-dropdown-item v-for="cuisine in cuisines" :key="cuisine.name">{{ cuisine.name }}</b-dropdown-item>
            </b-dropdown>
            <!-- Tags Filter button -->
            <b-dropdown right text="Tags" variant="light">
              <b-dropdown-item v-for="tag in tags" :key="tag.name">{{ tag.name }}</b-dropdown-item>
            </b-dropdown>
            <!-- Price Filter button -->
            <b-dropdown right text="Price" variant="light">
              <b-dropdown-item>Damn Cheap $</b-dropdown-item>
              <b-dropdown-item>Cheap Thrills $$</b-dropdown-item>
              <b-dropdown-item>Middle Ses $$$</b-dropdown-item>
              <b-dropdown-item>High Ses $$$$</b-dropdown-item>
              <b-dropdown-item>Sibei High Ses $$$$$</b-dropdown-item>
            </b-dropdown>
          </b-button-group>
        </div>
        <div class="content">
          <!-- Checks if there is data to populate -->
          <transition name="fade" mode="out-in">
          <div v-if="restaurants.Restaurant != undefined" :key="1">
            <!-- Unfiltered view -->
            <span id="carouselGroups">
              <div v-for="location in locations" :key="location.name">
                <h3>{{ location.name }}</h3>
                <!-- Carousel containing RestaurantCards based on location, as pagination -->
                <b-carousel :interval="0" controls indicators @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
                  <b-carousel-slide v-for="(stores, index) in filterRestaurant(location.name)" :key="index">
                    <!-- Manipulate bootstrap-vue carousel to contain RestaurantCard instead of img -->
                    <template v-slot:img>
                      <b-card-group deck class="justify-content-center">
                        <span v-for="(store, index) in stores" :key="index">
                          <!-- if there are restaurant data show this -->
                          <span v-if="stores !== 'empty'">
                            <RestaurantCard :id="store.rid" :stall="store" v-b-tooltip.hover
                              title="Click to view restaurant info." />
                          </span>
                          <!-- if there are no restaurant data show this -->
                          <span v-else style="text-align: center; color: white;">
                            <h2>No Restaurants Available</h2>
                          </span>
                        </span>
                      </b-card-group>
                    </template>
                  </b-carousel-slide>
                </b-carousel>
                <img src="../assets/divider.png" width="600px">
              </div>
            </span>
            <!-- Filtered view -->
            <div id="cardGroup">
              <b-card-group deck id="cards" class="justify-content-center" :key="2">
                <span v-for="store in cards(selectedLocation)" :key="store.id">
                  <span v-if="store.location === selectedLocation">
                    <RestaurantCard :id="store.rid" :stall="store" :key="componentKey"/></span>
                </span>
              </b-card-group>
            </div>
          </div>
          <!-- If no data to populate, show this -->
          <div v-else style="text-align: center; color: white;">
            <img src="../assets/questionmark.png">
            <h1>Restaurants not found ....</h1>
          </div>
          </transition>
        </div>
      </div>
      <Contribution />
    </b-col>
    <b-col md="2" class="green"></b-col>
  </b-row>
</template>
<script>
import Contribution from '@/components/Contribution.vue'
import RestaurantCard from '@/components/RestaurantCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'South',
  components: {
    Contribution,
    RestaurantCard
  },
  data () {
    return {
      locations: [
        { name: 'Harbourfront', value: 'Harbourfront' }
      ],
      cuisines: [
        { name: 'Chinese', value: 'Chinese' },
        { name: 'French', value: 'French' },
        { name: 'Indian', value: 'Indian' },
        { name: 'Indonesian', value: 'Indonesian' },
        { name: 'Italian', value: 'Italian' },
        { name: 'Japanese', value: 'Japanese' },
        { name: 'Korean', value: 'Korean' },
        { name: 'Malay', value: 'Malay' },
        { name: 'Mexican', value: 'Mexican' },
        { name: 'Thai', value: 'Thai' },
        { name: 'Turkish', value: 'Turkish' },
        { name: 'Vietnamese', value: 'Vietnamese' },
        { name: 'Western', value: 'Western' }
      ],
      tags: [
        { name: 'Bakery', value: 'Bakery' },
        { name: 'Buffet', value: 'Buffet' },
        { name: 'Cakes', value: 'Cakes' },
        { name: 'Dessert', value: 'Dessert' },
        { name: 'Fast-food', value: 'Fast-food' },
        { name: 'Hotpot - Steamboat', value: 'Hotpot' },
        { name: 'Local Delights', value: 'Local Delights' },
        { name: 'Seafood', value: 'Seafood' },
        { name: 'Take-away', value: 'Take-away' },
        { name: 'Vegetarian', value: 'Vegetarian' },
        { name: 'Vegan', value: 'Vegan' }
      ],
      selectedLocation: 'The South',
      componentKey: 0,
      clickedLocation: false
    }
  },
  computed: {
    ...mapState([
      'restaurants'
    ])
  },
  created () {
    this.$store.dispatch('loadSouth')
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    filterRestaurant (places) {
      var restaurant = this.restaurants.Restaurant
      var arr = []
      var slideArr = []
      // Loop through restaurant data and push into arr
      restaurant.forEach(store => {
        if (store.location === places) {
          arr.push(store)
        }
      })
      var obj = { ...arr }
      var count = 0
      // Check if arr is empty -> no restaurant data
      if (arr.length === 0) {
        slideArr.push('empty')
      } else {
        // Divide cards into 2 cards per slide
        for (let i = 0; i < Math.ceil(arr.length / 2); i++) {
          var temp = []
          temp.push(obj[count])
          temp.push(obj[count + 1])
          count = count + 2
          slideArr.push(temp)
        }
      }
      return slideArr
    },
    cards (places) {
      var restaurant = this.restaurants.Restaurant
      var arr = []
      // Loop through restaurant data and push into arr
      restaurant.forEach(store => {
        if (store.location === places) {
          arr.push(store)
        }
      })
      if (this.clickedLocation) {
        var cardGrp = document.getElementById('cardGroup')
        cardGrp.style.display = 'block'
      }
      return { ...arr }
    },
    showLocation (location) {
      // Gets Carousel groups and hides them
      var carouselGrp = document.getElementById('carouselGroups')
      carouselGrp.style.display = 'none'
      this.selectedLocation = location
      this.clickedLocation = true
      this.componentKey += 1 // God Bless Michael Thiessen for this solution https://michaelnthiessen.com/force-re-render/
    }
  }
}
</script>
