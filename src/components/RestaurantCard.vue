<template>
    <b-card :img-src="storeImage()" img-alt="Image" img-top class="mb-2 restaurantCard">
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
        <!-- <a id="icon" href="#">
          <b-icon-bookmark class="float-right" style="z-index:3; position:relative" color="red"></b-icon-bookmark>
        </a> -->
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
  methods: {
    description () {
      // Solution taken from StackOverflow
      if (this.restaurant.description.length <= 230) {
        return this.restaurant.description
      } else {
        return this.restaurant.description.substr(0, this.restaurant.description.lastIndexOf(' ', 230)) + '...'
      }
    },
    storeImage () {
      // Placeholder links taken from google for restaurant image
      var img = ''
      if (this.restaurant.store_name === '4Fingers') {
        img = 'https://s3-ap-southeast-1.amazonaws.com/191-dev/wp-content/uploads/2020/07/16162146/4fingers.jpg'
      } else if (this.restaurant.store_name === '18 Chefs') {
        img = 'https://moderne.com.sg/wp-content/uploads/2016/12/18-chefs.jpg'
      } else {
        img = 'https://picsum.photos/600/300/?image=25'
      }
      return img
    }
  }
}
</script>
