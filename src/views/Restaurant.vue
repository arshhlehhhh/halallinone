<template>
  <b-row class="restaurant">
    <b-col md="2" class="green"></b-col>
    <b-col>
      <!-- Store image and info -->
      <b-overlay show opacity="0.75" variant="light">
        <img :src="require('@/assets/' + storeImage)" width="100%" height="380px">
        <template v-slot:overlay>
          <div class="w-100 text-center">
            <h1 style="font-size: 60px; margin-bottom: 20px">{{ restaurant.store_name }}</h1>
            <p style="font-size: 18px;">{{ restaurant.description }}</p>
            <h4>
              <b-badge variant="info" v-for="tag in tags" :key="tag"> {{ tag }} </b-badge>
            </h4>
          </div>
        </template>
      </b-overlay>
      <b-row>
        <b-col md="6">
          <div class="details">
            <h2>Store Information</h2>
            <h4>{{ restaurant.outlet }}</h4>
            <p>{{ restaurant.address }}, {{ restaurant.unit_number }} {{ restaurant.postal_code }}</p>
            <h4>Operating Hours</h4>
            <p>Days, Hours {{ operation.days }}</p>
            <h4>Contact Details</h4>
            <p>
              <span v-if="contact[0] != 0">Phone Number: {{ contact[0] }}</span>
              <span v-else>Phone Number: -</span>
              <br>
              <span>Email: {{ email }}</span>
            </p>
            <h4>Websites</h4>
            <ul class="list-unstyled">
              <li>
                <b-icon-link variant="success"></b-icon-link>
                <a :href="socials.store_link" target="_blank" style="margin-left: 15px;">{{ socials.store_link }}</a>
              </li>
              <li>
                <img width="20px" src="../assets/Insta-icon.png">
                <a :href="socials.facebook_link" target="_blank" style="margin-left: 10px;">{{ socials.facebook_link }}</a>
              </li>
              <li>
                <img width="20px" src="../assets/FB-icon.png">
                <a :href="socials.instagram_link" target="_blank" style="margin-left: 10px;">{{ socials.instagram_link }}</a>
              </li>
            </ul>
          </div>
        </b-col>
        <b-col md="6">
          <div class="details">
            <h2>Google Map</h2>
            <div class="iframe-container">
              <iframe frameborder="0" style="border:0" :src="gMap" allowfullscreen></iframe>
            </div>
          </div>
        </b-col>
      </b-row>
      <div class="reviews">
        <h2>Ratings & Reviews</h2>
        <transition name="fade" mode="out-in">
        <div v-if="reviews.length > 0" :key="1">
          <h4>{{ ratings }} / 5 stars
            <b-form-rating width="40" variant="success" inline no-border readonly :value="ratings" />
          </h4>
          <b-table responsive :items="reviews"></b-table>
        </div>
        <div v-else style="text-align: center;" :key="2">
          <h4>There are no Ratings & Reviews found for this restaurant.</h4>
        </div>
        </transition>
      </div>
      <Contribution />
    </b-col>
    <b-col md="2" class="green"></b-col>
  </b-row>
</template>

<script>
import Contribution from '@/components/Contribution.vue'
import axios from 'axios'

export default {
  name: 'Restaurant',
  components: {
    Contribution
  },
  data () {
    return {
      restaurant: [],
      operation: Object,
      contact: [],
      email: '-',
      tags: [],
      socials: [],
      reviews: [],
      ratings: 0,
      gMap: '',
      getPlaceId: '',
      place_id: ''
    }
  },
  computed: {
    storeImage () {
      // Local image files
      var img = ''
      if (this.restaurant.store_name === '4Fingers') {
        img = '4fingers.jpg'
      } else if (this.restaurant.store_name === 'Encik Tan') {
        img = 'enciktan.png'
      } else if (this.restaurant.store_name === '18 Chefs') {
        img = '18chef.jpg'
      } else if (this.restaurant.store_name === 'Seoul Garden') {
        img = 'seoul_garden.jpg'
      } else if (this.restaurant.store_name === 'The Ramen Stall') {
        img = 'TRS.jpg'
      } else if (this.restaurant.store_name === 'Ichikokudo Hokkaido Ramen') {
        img = 'ichikokudo.jpg'
      } else if (this.restaurant.store_name === 'Habibie Seafood') {
        img = 'habibie.png'
      } else if (this.restaurant.store_name === 'Prata Wala') {
        img = 'PrataWala.jpg'
      } else if (this.restaurant.store_name === 'Sakura') {
        img = 'sakura.jpg'
      } else if (this.restaurant.store_name === 'Prima Deli') {
        img = 'PrimaDeli.jpg'
      } else if (this.restaurant.store_name === 'Maki-San') {
        img = 'Maki-San.jpg'
      } else if (this.restaurant.store_name === 'CRAVE') {
        img = 'crave.jpg'
      } else {
        img = 'questionmark.png'
      }
      return img
    }
  },
  mounted () {
    axios // API call to retrieve the restaurant information
      .get('https://wad2-hallallinone.et.r.appspot.com/restaurant/search/rid/' + this.$route.params.id)
      .then(response => {
        this.restaurant = response.data.Restaurant
        this.restaurant = this.restaurant[0]
      }).then(data => {
        const tempArr = this.filterArray(this.restaurant.tags)
        tempArr.forEach(element => {
          this.tags.push(element.substring(1, element.length - 1))
        })
        this.contact = this.filterArray(this.restaurant.contact)
        if (this.contact[1].length > 2) {
          this.email = this.contact[1]
        }
        this.operation = this.restaurant.operation
        var social = this.restaurant.social_media_links.replace(/'/g, '"')
        this.socials = JSON.parse(social)
        this.gMap = 'https://www.google.com/maps/embed/v1/place?key=AIzaSyCY-JLzRXduQFdrflpjenGd_s58LilUrQU&q=' + this.restaurant.postal_code + '&zoom=18'
        this.place_id = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + this.restaurant.store_name + ' ' + this.restaurant.outlet + '&inputtype=textquery&key=AIzaSyDgKD27MEAeN4JgY7R_Kd4DnJbNUjZ_q2M&fields=place_id,formatted_address'
        axios // API call to Google to retrieve the restaurant map
          .get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + this.restaurant.store_name + ' ' + this.restaurant.outlet + '&inputtype=textquery&key=AIzaSyDgKD27MEAeN4JgY7R_Kd4DnJbNUjZ_q2M&fields=place_id,formatted_address')
          .then(response => {
            var result = response.data.candidates[0]
            this.place_id = result.place_id
            axios // API call to Google to retrieve the restaurant ratings and reviews
              .get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=' + this.place_id + '&fields=name,rating,reviews&key=AIzaSyDgKD27MEAeN4JgY7R_Kd4DnJbNUjZ_q2M')
              .then(response => {
                this.ratings = response.data.result.rating
                var reviews = response.data.result.reviews
                reviews.forEach(element => {
                  var obj = {}
                  obj = { Name: element.author_name, Rating: element.rating, Description: element.text, Time: element.relative_time_description }
                  this.reviews.push(obj)
                })
              })
          })
      })
  },
  methods: {
    filterArray: function (temp) {
      temp = temp.substring(1, temp.length - 1)
      temp = temp.split(', ')
      return temp
    }
  }
}
</script>
