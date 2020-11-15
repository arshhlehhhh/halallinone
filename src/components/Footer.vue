<template>
  <b-row class="footer">
    <b-col md="2" class="hide"></b-col>
    <b-col md="8">
      <b-row style="padding-top: 20px;">
        <b-col sm="4" md="3">
          <h5 class="title text-left"><img src="../assets/Halal_Logo.png">HALALLINONE</h5>
        </b-col>
        <b-col sm="4" md="3" class="text-left">
          <ul>
            <li class="list-unstyled">
              <router-link to="/sitemap">Sitemap</router-link>
            </li>
            <li class="list-unstyled">
              <router-link to="/contactus">Contact Us</router-link>
            </li>
            <li class="list-unstyled">
              <router-link to="/privacypolicy">Privacy Policy</router-link>
            </li>
          </ul>
        </b-col>
        <b-col sm="4" md="6" class="text-right">
          <p>Copyright &copy; 2020 HalallInOne. All rights reserved</p>
        </b-col>
      </b-row>
    </b-col>
    <b-col md="2" class="hide"></b-col>
  </b-row>
</template>
