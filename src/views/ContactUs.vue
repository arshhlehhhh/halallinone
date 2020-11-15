<template>
  <b-row class="contactUs">
    <b-col md="2" class="green"></b-col>
    <b-col>
      <div class="title">
        <img src="../assets/logo.png">
        <h1>Contact Us</h1>
      </div>
      <!-- Elaborate on the form -->
      <div class="spacing">
        <h5 class="text-center">If you have any issues or feedback, you can reach us by filling up the form and we will get back to you ASAP!</h5>
        <b-jumbotron>
          <b-form>
            <b-form-row>
              <!-- First Name Input -->
              <b-form-group label="First Name" label-for="fname" class="col-6">
                <b-form-input id="fname" type="text" required></b-form-input>
              </b-form-group>
              <!-- Last Name Input -->
              <b-form-group label="Last Name" label-for="lname" class="col-6">
                <b-form-input id="lname" type="text" required></b-form-input>
              </b-form-group>
            </b-form-row>
            <!-- Email Input -->
            <b-form-group label="Email" label-for="email">
              <b-form-input id="email" type="email" required></b-form-input>
            </b-form-group>
            <!-- Message/Feedback input -->
            <b-form-group label="Your Message" label-for="message">
              <b-form-textarea id="message" required></b-form-textarea>
            </b-form-group>
            <b-button type="submit" variant="success">Submit</b-button>
          </b-form>
        </b-jumbotron>
      </div>
    </b-col>
    <b-col md="2" class="green"></b-col>
  </b-row>
</template>

<script>
export default {
  name: 'ContactUs',
  components: {
  }
}
</script>
