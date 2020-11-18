<template>
  <div class="admin">
    <b-tabs content-class="admin-table mt-3" fill v-model="step">
      <!-- Table of information from contribution -->
      <b-tab title="Submitted Forms" active>
        <b-row>
          <b-col class="table-responsive">
            <b-table striped hover :items="items" :fields="fields" :sticky-header="true" head-variant="light">
              <template #cell(config)="dt">
                <b-button variant="success" v-bind:value='dt.value[1]' v-on:click="editCForm(dt.value[1])">
                  {{ dt.value[0] }}</b-button>
              </template>
              <template #cell(social_media_links)="data">
                <span v-for="social_media_links in data.value" :key="social_media_links.sotre_link">
                  <p v-for="social in social_media_links" :key="social" variant="info"> {{ social }} </p>
                </span>
              </template>
              <template #cell(tags)="data">
                <b-badge variant="info" v-for="tag in data.value" :key="tag"> {{ tag }} </b-badge>
              </template>
            </b-table>
          </b-col>
        </b-row>
      </b-tab>
      <!-- Admin's form -->
      <b-tab title="Admin Form">
        <b-row>
          <b-col>
            <b-jumbotron class="userForm">
              <h3 class="text-center">Admin Form</h3>
              <!-- Input Form -->
              <b-form>
                <b-form-group id="name-group" label="Restaurant's Name" label-for="name">
                  <b-form-input id="name" v-model="form.name" v-bind:value="form.name" required
                    placeholder="Enter name (e.g. 4Fingers)">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="name-group" label="Description" label-for="name">
                  <b-form-input id="name" v-model="form.description" required placeholder="Description of restaurant">
                  </b-form-input>
                </b-form-group>
                <b-form-group id="outlet-group" label="Outlet Name" label-for="outlet">
                  <b-form-input id="outlet" v-model="form.outlet" v-bind:value="form.outlet" required
                    placeholder="Enter outlet (e.g Plaza Singapura)">
                  </b-form-input>
                </b-form-group>
                <!-- Address Details -->
                <h6>Restaurant's Address</h6>
                <b-form-row>
                  <b-col>
                    <b-form-input id="blkStreet" v-model="form.blkStreet" v-bind:value="form.blkStreet" required
                      placeholder="Blk Street"></b-form-input>
                  </b-col>
                  <b-col>
                    <b-form-input id="unitNum" v-model="form.unitNum" v-bind:value="form.unitNum" required
                      placeholder="Unit-Number"></b-form-input>
                  </b-col>
                  <b-col>
                    <b-form-input id="postalCode" v-model="form.postalCode" v-bind:value="form.postalCode" required
                      placeholder="PostalCode"></b-form-input>
                  </b-col>
                </b-form-row>
                <!-- Location Details -->
                <b-form-row>
                  <b-col>
                    <label label-for="region">Region</label>
                    <b-form-select id="region" v-model="form.region" :selected="form.region" :options="regions"
                      required>
                      <!-- This slot appears above the options from 'options' prop -->
                      <template v-slot:first>
                        <b-form-select-option :value="null" disabled>-- Please select restaurant's region --
                        </b-form-select-option>
                      </template>
                    </b-form-select>
                  </b-col>
                  <b-col>
                    <label label-for="location">Location</label>
                    <b-form-select id="location" v-model="form.location" :selected="form.location" :options="locations"
                      required>
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
                  <b-form-input id="operation" v-model="form.operation" v-bind:value="form.operation" type="text"
                    required placeholder="Enter Operating Hours (e.g. Mon to Thurs, 9am - 9:30pm)"></b-form-input>
                </b-form-group>
                <!-- Contact Details -->
                <b-form-row>
                  <b-col>
                    <label label-for="contact">Contact Number</label>
                    <b-form-input id="contact" v-model="form.contact" v-bind:value="form.contact"
                      placeholder="91235678"></b-form-input>
                  </b-col>
                  <b-col>
                    <label label-for="email">Email</label>
                    <b-form-input id="email" v-model="form.email" v-bind:value="form.email" type="text"
                      placeholder="info@name.com"></b-form-input>
                  </b-col>
                </b-form-row>
                <!-- Tags -->
                <b-form-row>
                  <b-col>
                    <label class="typo__label">Tags</label>
                    <multiselect v-model="form.tags" placeholder="Add cuisine and attributes tag" label="name"
                      track-by="value" :searchable="false" :options="cuisine" :multiple="true" :taggable="true"
                      @tag="addTag">
                    </multiselect>
                  </b-col>
                </b-form-row>
                <!-- Social Media Link -->
                <b-form-group id="social-group" label="Social Media Links" label-for="social">
                  <b-form-input id="social" type="text" v-model="form.social_media_links"
                    v-bind:value="form.social_media_links" placeholder="social Media Link"></b-form-input>
                </b-form-group>
                <!-- Image Files -->
                <b-form-group id="photo-group" label="Restaurant Image & Menu" label-for="photos">
                  <b-form-file id="photos" v-model="form.photoFile" multiple accept=".jpg, .png, .gif"></b-form-file>
                </b-form-group>
                <!-- Remarks -->
                <b-form-group id="remarks-group" label="Remarks" label-for="remarks">
                  <b-form-textarea id="remarks" v-model="form.remarks" v-bind:value="form.remarks"
                    placeholder="Enter any additional information"></b-form-textarea>
                </b-form-group>
                <b-button variant="danger" @click="editForm" v-if="edit">Confirm Submit?</b-button>
                <b-button variant="success" @click="submitForm" v-else>Submit</b-button>
              </b-form>
            </b-jumbotron>
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
  </div>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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
      fields: [{ key: 'config', label: 'Configure' }, { key: 'cid', label: 'cid' }, 'name', 'outlet', 'address', 'unitNumber', 'postalCode', 'region', 'location', 'operation', 'contact/Email', 'social_media_links', { key: 'tags', label: 'Tags' }, 'photoFile', 'remarks'],
      items: [],
      form: {
        config: null,
        cid: '',
        name: '',
        description: '',
        outlet: '',
        operation: '',
        blkStreet: '',
        unitNum: '',
        postalCode: '',
        contactEmail: [],
        contact: null,
        email: '',
        social_media_links: '',
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
        { text: 'North-East', value: 'north_east' },
        { text: 'South', value: 'south' },
        { text: 'East', value: 'east' },
        { text: 'West', value: 'west' },
        { text: 'Central', value: 'central' }
      ],
      edit: true,
      editButton: null,
      getCid: null,
      count: null,
      step: 0
    }
  },
  computed: {
    locations () {
      var location = []
      if (this.form.region === 'north') {
        location = this.north
      } else if (this.form.region === 'north_east') {
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
  mounted () {
    axios // API call to retrieve the contribution information
      .get('https://wad2-hallallinone.et.r.appspot.com/contribution')
      .then((response) => {
        this.restaurant = response.data.Contribution
        for (var i in this.restaurant) {
          var item = this.restaurant[i]
          this.editButton = 'Edit'
          if (item.verification_status === 'Pending') {
            this.count = item.cid
            var contact = item.contact.substring(1, item.contact.length - 1)
            var social = item.social_media_links
            if (social !== undefined && social !== '' && social[1] === '"') {
              var arr = []
              arr.push(JSON.parse(social))
            }
            this.items.push({
              config: [this.editButton, item.cid],
              cid: item.cid,
              name: item.store_name,
              outlet: item.outlet,
              address: item.address,
              unitNumber: item.unit_number,
              postalCode: item.postal_code,
              region: item.region,
              location: item.location,
              operation: item.operation,
              'contact/Email': contact,
              social_media_links: arr,
              tags: item.tags.slice(1, item.tags.length - 1).split(','),
              photoFile: item.image_links,
              remarks: item.remarks
            })
          }
        }
        this.success = true
      })
  },
  methods: {
    filterArray: function (temp) {
      temp = temp.substring(1, temp.length - 1)
      temp = temp.split(', ')
      return temp
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
        returnTags += ("'" + tag.name + "', ")
      }
      return returnTags.slice(0, returnTags.length - 2) + ']'
    },
    editCForm (id) {
      axios.get('https://wad2-hallallinone.et.r.appspot.com/contribution/get/cid=' + id)
        .then((response) => {
          console.log(response.data[0].operation)
          var tags = response.data[0].tags.slice(1, response.data[0].tags.length - 1).split(', ')
          var tagsArr = []
          tags.forEach(element => {
            tagsArr.push({ name: element.slice(1, element.length - 1) })
          })
          this.contactEmail = this.filterArray(response.data[0].contact)
          this.form.cid = id
          this.form.name = response.data[0].store_name
          this.form.outlet = response.data[0].outlet
          this.form.blkStreet = response.data[0].address
          this.form.unitNum = response.data[0].unit_number
          this.form.postalCode = response.data[0].postal_code
          this.form.contact = this.contactEmail[0]
          this.form.email = this.contactEmail[1]
          this.form.social_media_links = response.data[0].social_media_links
          this.form.remarks = response.data[0].remarks
          this.form.region = response.data[0].region
          this.form.location = response.data[0].location
          this.form.operation = response.data[0].operation
          this.form.tags = tagsArr
          this.form.photoFile = response.data[0].image_links
        })
      this.step = 1
    },
    editForm () {
      this.edit = false
    },
    submitForm () {
      this.edit = true
      const auth = {
        store_name: this.form.name,
        description: this.form.description,
        tags: this.turnTagsToArray(this.form.tags),
        region: this.form.region,
        location: this.form.location,
        outlet: this.form.outlet,
        address: this.form.blkStreet,
        unit_number: this.form.unitNum,
        postal_code: this.form.postalCode,
        contact: "['" + this.form.contact + "', '" + this.form.email + "']",
        image_links: "{ store: '" + this.form.photoFile[0].name + "', menu: '' }",
        social_media_links: this.form.social_media_links,
        operation: this.form.operation
      }
      const url = 'https://wad2-hallallinone.et.r.appspot.com/restaurant/add'
      const urlVerification = 'https://wad2-hallallinone.et.r.appspot.com/contribution/update/' + this.form.cid + '/' + 'Approved'
      // console.log(this.form.cid)
      axios.post(url, auth).then((response) => { // API call to add data into restaurant table
        console.log(response.status)
        if (response.status === 201) {
          axios.get(urlVerification).then((response) => {
            // this.$router.push('/admin')
            this.step = 0
          })
        }
      }, function (err) {
        console.log('err', err)
      })
    }
  }
}
</script>
