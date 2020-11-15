<template>
  <b-row class="favorites">
    <b-col md="2" class="green"></b-col>
    <b-col>
      <!-- Image with title and brief info -->
      <div style="margin-top: 20px;">
        <h1 class="text-center">Your Favorite Restaurants</h1>
        <div class="text-right">View filter buttons</div>
        <div class="content">
          <b-card-group deck class="justify-content-center">
            <div v-for="store in restaurants.Restaurant" :key="store.id">
              <RestaurantCard :name="store.store_name" :outlet="store.outlet" :description="store.description"
                :unitNum="store.unit_number" :id="store.rid" :stall="store" />
            </div>
          </b-card-group>
        </div>
      </div>
      <Contribution />
    </b-col>
    <b-col md="2" class="green"></b-col>
  </b-row>
</template>

<style lang="scss">
.favorites {
}
</style>

<script>
import Contribution from '@/components/Contribution.vue'
import RestaurantCard from '@/components/RestaurantCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'Favorites',
  components: {
    Contribution,
    RestaurantCard
  },
  computed: {
    ...mapState([
      'restaurants'
    ])
  },
  created () {
    this.$store.dispatch('loadEast')
  }
}
</script>
