<template>
  <b-row class="privacyPolicy">
    <b-col md="2" class="green"></b-col>
    <b-col>
      <div class="title">
        <img src="../assets/logo.png">
        <h1>Privacy Policy</h1>
      </div>
      <!-- Info collected -->
      <div class="spacing">
        <h2>Information we collect</h2>
        <b-jumbotron>
          <ol>
            Halall in One collects the following types of information:
            <li>
              Your username and password when you register for an account
            </li>
            <li>
              Your content (eg. reviews, feedback and contributions) that you post to Halall in One
            </li>
            <li>
              Your location
            </li>
          </ol>
        </b-jumbotron>
      </div>
      <!-- Reasoning-->
      <div class="spacing">
        <h2>Why do we collect this information</h2>
        <b-jumbotron>
          <ol>
            <li>
              You provide data to create an account with us.
            </li>
            <li>
              To display your reviews and contributions so that others can discover new food places for themselves.
            </li>
            <li>
              To help you discover food places nearby.
            </li>
          </ol>
        </b-jumbotron>
      </div>
    </b-col>
    <b-col md="2" class="green"></b-col>
  </b-row>
</template>

<script>
export default {
  name: 'PrivacyPolicy',
  components: {
  }
}
</script>
