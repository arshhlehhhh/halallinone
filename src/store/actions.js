import Vue from 'vue'

export default {
  // Search by Region Functions
  loadEast ({ commit }) {
    Vue.axios.get('https://wad2-hallallinone.et.r.appspot.com/restaurant/search/region/east').then(response => {
      commit('GET_RESTAURANTS', response.data)
    }).catch(error => {
      throw new Error(`API ${error}`)
    })
  },
  loadWest ({ commit }) {
    Vue.axios.get('https://wad2-hallallinone.et.r.appspot.com/restaurant/search/region/west').then(response => {
      commit('GET_RESTAURANTS', response.data)
    }).catch(error => {
      throw new Error(`API ${error}`)
    })
  },
  loadNorth ({ commit }) {
    Vue.axios.get('https://wad2-hallallinone.et.r.appspot.com/restaurant/search/region/north').then(response => {
      commit('GET_RESTAURANTS', response.data)
    }).catch(error => {
      throw new Error(`API ${error}`)
    })
  },
  loadNorthEast ({ commit }) {
    Vue.axios.get('https://wad2-hallallinone.et.r.appspot.com/restaurant/search/region/north_east').then(response => {
      commit('GET_RESTAURANTS', response.data)
    }).catch(error => {
      throw new Error(`API ${error}`)
    })
  },
  loadSouth ({ commit }) {
    Vue.axios.get('https://wad2-hallallinone.et.r.appspot.com/restaurant/search/region/south').then(response => {
      commit('GET_RESTAURANTS', response.data)
    }).catch(error => {
      throw new Error(`API ${error}`)
    })
  },
  loadCentral ({ commit }) {
    Vue.axios.get('https://wad2-hallallinone.et.r.appspot.com/restaurant/search/region/central').then(response => {
      commit('GET_RESTAURANTS', response.data)
    }).catch(error => {
      throw new Error(`API ${error}`)
    })
  },
  // Search by Location Functions
  loadLocation ({ commit }) {
    Vue.axios.get('https://wad2-hallallinone.et.r.appspot.com/restaurant/search/location/').then(response => {
      commit('GET_RESTAURANTS', response.data)
    }).catch(error => {
      throw new Error(`API ${error}`)
    })
  }
}
