<template>
  <b-row class="contribute userForm">
    <b-col md="2" class="green"></b-col>
    <b-col>
      <!-- Image with title and brief info -->
      <div class="contribution">
        <b-jumbotron class="justify-content-center text-center text-black vertical-center" style="opacity: 0.7; height: 400px;">
            <div class="container">
              <h1 style="font-size: 55px;">Contribution Page</h1>
              <p style="font-size: 18px;">The restuarants shown within this platform are manually keyed in by the developers.
              Hence, we may missed out on a number of restuarants, especially local business in hawker centres.
              With that, we strongly urge the public to fill up the below form to notify us of the missing Halal
              Restaurants!</p>
            </div>
        </b-jumbotron>
      </div>
      <!-- Input Form -->
      <b-form @submit="onSubmit" @reset="onReset" style="">
        <b-form-group id="name-group" label="Restaurant's Name" label-for="name">
          <b-form-input id="name" v-model="form.name" required placeholder="Enter name (e.g. 4Fingers)">
          </b-form-input>
        </b-form-group>
        <b-form-group id="outlet-group" label="Outlet Name" label-for="outlet">
          <b-form-input id="outlet" v-model="form.outlet" required placeholder="Enter outlet (e.g Plaza Singapura)">
          </b-form-input>
        </b-form-group>
        <!-- Address Details -->
        <h6>Restaurant's Address</h6>
        <b-form-row>
          <b-col>
            <b-form-input id="blkStreet" v-model="form.blkStreet" required placeholder="Blk Street"></b-form-input>
          </b-col>
          <b-col>
            <b-form-input id="unitNum" v-model="form.unitNum" required placeholder="Unit-Number"></b-form-input>
          </b-col>
          <b-col>
            <b-form-input id="postalCode" v-model="form.postalCode" required placeholder="PostalCode"></b-form-input>
          </b-col>
        </b-form-row>
        <!-- Location Details -->
        <b-form-row>
          <b-col>
            <label label-for="region">Region</label>
            <b-form-select id="region" v-model="form.region" :options="regions" required>
              <!-- This slot appears above the options from 'options' prop -->
              <template v-slot:first>
                <b-form-select-option :value="null" disabled>-- Please select restaurant's region --
                </b-form-select-option>
              </template>
            </b-form-select>
          </b-col>
          <b-col>
            <label label-for="location">Location</label>
            <b-form-select id="location" v-model="form.location" :options="locations" required>
              <!-- This slot appears above the options from 'options' prop -->
              <template v-slot:first>
                <b-form-select-option :value="null" disabled>-- Please select restaurant's location --
                </b-form-select-option>
              </template>
            </b-form-select>
          </b-col>
        </b-form-row>
        <!-- Operating Hours -->
        <b-form-group id="operation-group" label="Operating Hours" label-for="operation">
          <b-form-input id="operation" v-model="form.operation" type="text" required
            placeholder="Enter Operating Hours (e.g. Mon to Thurs, 9am - 9:30pm)"></b-form-input>
        </b-form-group>
        <!-- Contact Details -->
        <b-form-row>
          <b-col>
            <label label-for="contact">Contact Number</label>
            <b-form-input id="contact" v-model="form.contact" type="number" placeholder="91235678"></b-form-input>
          </b-col>
          <b-col>
            <label label-for="email">Email</label>
            <b-form-input id="email" v-model="form.email" type="text" placeholder="info@name.com"></b-form-input>
          </b-col>
        </b-form-row>
        <!-- Tags -->
        <b-form-row>
          <b-col>
            <label class="typo__label">Tags</label>
            <multiselect v-model="form.tags" placeholder="Add cuisine and attributes tag" label="name" track-by="value"
              :searchable="false" :options="cuisine" :multiple="true" :taggable="true" @tag="addTag">
            </multiselect>
          </b-col>
        </b-form-row>
        <!-- Image Files -->
        <b-form-group id="photo-group" label="Restaurant Image & Menu" label-for="photos">
          <b-form-file id="photos" v-model="form.photoFile" multiple accept=".jpg, .png, .gif"></b-form-file>
        </b-form-group>
        <!-- Remarks -->
        <b-form-group id="remarks-group" label="Remarks" label-for="remarks">
          <b-form-textarea id="remarks" v-model="form.remarks" placeholder="Enter any additional information"></b-form-textarea>
        </b-form-group>
        <b-button type="submit" variant="success">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-col>
    <b-col md="2" class="green"></b-col>
  </b-row>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
.contribution {
  .vertical-center {
    min-height: 100%;
    display: flex;
    align-items: center;
    background:
      linear-gradient(
        rgba(255, 255, 255, 0.7),
        rgba(255, 255, 255, 0.7)
      ),
      url('../assets/Contribute_Img.jpg');
    background-size: cover;
    height: 100%;
    color: black;
  }
}
</style>
<script>
import Multiselect from 'vue-multiselect'
import axios from 'axios'

export default {
  name: 'Contribute',
  components: {
    Multiselect
  },
  data () {
    return {
      form: {
        name: '',
        outlet: '',
        operation: '',
        blkStreet: '',
        unitNum: '',
        postalCode: '',
        contact: '',
        email: '',
        remarks: '',
        region: null,
        location: null,
        tags: [],
        photoFile: null
      },
      cuisine: [
        { name: 'Chinese', value: 'Chinese' },
        { name: 'French', value: 'French' },
        { name: 'Indian', value: 'Indian' },
        { name: 'Indonesian', value: 'Indonesian' },
        { name: 'Italian', value: 'Italian' },
        { name: 'Japanese', value: 'Japanese' },
        { name: 'Korean', value: 'Korean' },
        { name: 'Malay', value: 'Malay' },
        { name: 'Mexican', value: 'Mexican' },
        { name: 'Thai', value: 'Thai' },
        { name: 'Turkish', value: 'Turkish' },
        { name: 'Vietnamese', value: 'Vietnamese' },
        { name: 'Western', value: 'Western' }
      ],
      east: [
        { text: 'Bedok', value: 'Bedok' },
        { text: 'Changi Airport', value: 'Changi Airport' },
        { text: 'Pasir Ris', value: 'Pasir Ris' },
        { text: 'Paya Lebar', value: 'Paya Lebar' },
        { text: 'Simei', value: 'Simei' },
        { text: 'Tampines', value: 'Tampines' }
      ],
      north: [
        { text: 'Admiralty', value: 'Admiralty' },
        { text: 'Ang Mo Kio', value: 'Ang Mo Kio' },
        { text: 'Bishan', value: 'Bishan' },
        { text: 'Khatib', value: 'Khatib' },
        { text: 'Sembawang', value: 'Sembawang' },
        { text: 'Toa Payoh', value: 'Toa Payoh' },
        { text: 'Woodlands', value: 'Woodlands' },
        { text: 'Yishun', value: 'Yishun' }
      ],
      northeast: [
        { text: 'Hougang', value: 'Hougang' },
        { text: 'Punggol', value: 'Punggol' },
        { text: 'Sengkang', value: 'Sengkang' },
        { text: 'Serangoon', value: 'Serangoon' }
      ],
      central: [
        { text: 'Bugis', value: 'Bugis' },
        { text: 'City Hall', value: 'City Hall' },
        { text: 'Dhoby Ghaut', value: 'Dhoby Ghaut' },
        { text: 'Orchard', value: 'Orchard' },
        { text: 'Raffles Place', value: 'Raffles Place' },
        { text: 'Somerset', value: 'Somerset' }
      ],
      south: [
        { text: 'Harbourfront', value: 'Harbourfront' }
      ],
      west: [
        { text: 'Boon Lay', value: 'Boon Lay' },
        { text: 'Clementi', value: 'Clementi' },
        { text: 'Jurong East', value: 'Jurong East' },
        { text: 'Lakeside', value: 'Lakeside' },
        { text: 'Pioneer', value: 'Pioneer' }
      ],
      regions: [
        { text: 'North', value: 'north' },
        { text: 'North-East', value: 'north-east' },
        { text: 'South', value: 'south' },
        { text: 'East', value: 'east' },
        { text: 'West', value: 'west' },
        { text: 'Central', value: 'central' }
      ]
    }
  },
  computed: {
    locations () {
      var location = []
      if (this.form.region === 'north') {
        location = this.north
      } else if (this.form.region === 'north-east') {
        location = this.northeast
      } else if (this.form.region === 'south') {
        location = this.south
      } else if (this.form.region === 'east') {
        location = this.east
      } else if (this.form.region === 'west') {
        location = this.west
      } else if (this.form.region === 'central') {
        location = this.central
      }
      return location
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      var operationSplit = this.form.operation.split(', ')
      var tagsArray = this.turnTagsToArray(this.form.tags)
      const url = 'https://wad2-hallallinone.et.r.appspot.com/contribution/add'
      const item = {
        username: 'user3',
        store_name: this.form.name,
        description: '',
        remarks: this.form.remarks,
        tags: tagsArray,
        region: this.form.region,
        location: this.form.location,
        outlet: this.form.outlet,
        address: this.form.blkStreet,
        unit_number: this.form.unitNum,
        postal_code: this.form.postalCode,
        contact: '["' + this.form.contact + '", "' + this.form.email + '"]',
        image_links: '{ store: "' + this.form.photoFile[0].name + '", menu: "" }',
        social_media_links: '',
        operation: '{ days: ["' + [operationSplit[0]] + '"], hours: ["' + [operationSplit[1]] + '"] }',
        verification_status: 'Pending'
      }
      console.log(item)
      axios
        .post(url, item).then((response) => {
          console.log(response.data)
        })
      this.success = true
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.name = ''
      this.form.outlet = ''
      this.form.operation = ''
      this.form.blkStreet = ''
      this.form.unitNum = ''
      this.form.postalCode = ''
      this.form.contact = ''
      this.form.email = ''
      this.form.region = null
      this.form.location = null
      this.form.tags = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    addTag (newTag) {
      const tag = {
        name: newTag,
        value: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.tags.push(tag)
    },
    turnTagsToArray (tags) {
      var returnTags = '['
      for (const tag of tags) {
        returnTags += ('"' + tag.name + '", ')
      }
      return returnTags.slice(0, returnTags.length - 2) + ']'
    }
  }
}
</script>
