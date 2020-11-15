<template>
  <b-row class="about">
    <b-col md="2" class="green"></b-col>
    <b-col>
      <div class="title">
        <img src="../assets/logo.png">
        <h1>About Us</h1>
      </div>
      <!-- Problem Section -->
      <div class="spacing">
        <h2>Problem</h2>
        <b-jumbotron>
          <ol>
            <li>
              Many of us often faced the problem of deciding what to eat whenever we go out with our Muslim friends.
              This is because we may not know whether the restaurants around our location are halal-certified.
              Hence, forcing us to take time to google for other halal food places.
            </li>
            <li>
              Some food places do not have information online (website/social media page) or incomplete information on
              whether it's halal-certified.
              This causes us to take a risk by making a trip down to the food place to find out if it's halal. If not,
              we have to settle for other more common halal places such as Mcdonalds.
            </li>
            <li>
              Some shops were previously halal-certified but chose not to renew their certification, making it hard to
              personally track which restaurants are still halal or not.
            </li>
          </ol>
        </b-jumbotron>
      </div>
      <!-- Idea Section -->
      <div class="spacing">
        <h2>Idea</h2>
        <b-jumbotron>
          <p>
            To tackle the above problems, Halall In One was created. An all-in-one platform, that provides store
            information, menu, location, reviews all in one place.
            Based on your current location, a list of the nearest halal food places will be populated.
          </p>
          <p>
            Additionally, we want to encourage more contributions from users regarding lesser-known or new places.
            This is achieved by allowing users to contribute suggestions and providing information on these places.
            Contributions will then be validated by administrators and potentially added to the database.
          </p>
          <p>
            Therefore, both Muslim and Non-Muslim users can easily find halal food places, on the go, creating a more
            inclusive society.
          </p>
        </b-jumbotron>
      </div>
      <!-- Team Section -->
      <div class="spacing">
        <h2>Team</h2>
        <b-jumbotron>
          <p>
            Ashley, Dian, Diyanah, Jaspavan, Jia Yiing
          </p>
        </b-jumbotron>
      </div>
    </b-col>
    <b-col md="2" class="green"></b-col>
  </b-row>
</template>

<script>
export default {
  name: 'About',
  components: {
  }
}
</script>
