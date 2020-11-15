<template>
  <b-row class="siteMap">
    <b-col md="2" class="green"></b-col>
    <b-col>
      <div class="title">
        <img src="../assets/logo.png">
        <h1>Sitemap</h1>
      </div>
      <!-- Links & Information -->
      <div class="spacing">
          <b-jumbotron>
            <ul>
              <li><router-link to="/">Home</router-link></li>
              <ul>
                <li><router-link to="/about">About Us</router-link> - contains our problem statement, idea and team members' names</li>
                <li>Regions - showcases halal restaurants located in specified region in Singapore</li>
                <ul>
                  <li><router-link to="/north">North</router-link></li>
                  <li><router-link to="/north-east">North-East</router-link></li>
                  <li><router-link to="/south">South</router-link></li>
                  <li><router-link to="/east">East</router-link></li>
                  <li><router-link to="/west">West</router-link></li>
                  <li><router-link to="/central">Central</router-link></li>
                </ul>
                <li>Contribute - public can suggest a halal restaurant that is not in HalallInOne at the moment</li>
              </ul>
              <li><router-link to="/contactus">Contact Us</router-link></li>
              <li><router-link to="/privacypolicy">Private Policy</router-link></li>
            </ul>
          </b-jumbotron>
      </div>
    </b-col>
    <b-col md="2" class="green"></b-col>
  </b-row>
</template>

<script>
export default {
  name: 'SiteMap',
  components: {
  }
}
</script>
