<template>
    <b-card :img-src="require('@/assets/' + storeImage)" img-alt="Image" img-top class="mb-2 restaurantCard">
      <b-card-text class="text-center">
        <router-link :to="`/restaurant/${id}`" class="stretched-link">
          <p id="description">{{ description() }}</p>
          <span id="name">{{ restaurant.store_name }}</span>
          <p id="address">
            <span v-if="restaurant.outlet!==''"> {{ restaurant.outlet }} </span>
            <span v-else>HDB {{ restaurant.address }}</span><br>
            <span> {{ restaurant.unit_number }}</span>
          </p>
        </router-link>
        <br>
      </b-card-text>
    </b-card>
</template>

<script>
export default {
  components: {
  },
  props: {
    id: Number,
    stall: Object
  },
  data () {
    return {
      restaurant: this.stall
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
  methods: {
    description () {
      // Solution taken from StackOverflow
      if (this.restaurant.description.length <= 230) {
        return this.restaurant.description
      } else {
        return this.restaurant.description.substr(0, this.restaurant.description.lastIndexOf(' ', 230)) + '...'
      }
    }
  }
}
</script>
