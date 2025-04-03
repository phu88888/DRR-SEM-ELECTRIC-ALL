<template>
  <!-- UserEdit -->
  <b-modal
    id="modalEdit"
    title="อัพเดตจุดติดตั้ง"
    size="lg"
    ok-title="ตกลง"
    cancel-title="ยกเลิก"
    @ok="editInfo"
  >
    <b-row>
      <!-- Role -->
      <b-col cols="12">
        <b-form-group
          label="จุดติดตั้ง"
          label-for="location"
        >
          <v-select
            v-model="editData.location_id"
            :options="options"
            :reduce="location => location.location_id"
            label="road_code1"
          />
        </b-form-group>
      </b-col>

      <template #code>
        {{ codeFeedbackHelper }}
      </template>
    </b-row>
  </b-modal>
</template>

<script>
import axios from '@axios'
import {
  BRow, BCol, BFormGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    vSelect,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      options: [],
      ipaddress: '',
      editData: {
        ipaddress: '',
        location_id: '',
        username: '',
        camera_id: '',
      },
    }
  },
  mounted() {
    this.editData.username = this.userData.username
  },
  methods: {
    async editInfo() {
      axios
        .post('/update-Camera-All', this.editData)
        .then(() => {
          this.$swal({
            icon: 'success',
            title: '<span style="color:#000000">อัพดตข้อมูลเรียบร้อย.</span>',
            showConfirmButton: false,
            timer: 1000,
          })
          this.$emit('fetch')
        })
        .catch(error => {
          console.log(error)
        })
    },
    dropdownLocation(ipaddress) {
      this.editData.location_id = ''
      this.editData.ipaddress = ipaddress
      axios
        .post('/dropdown-Location-All')
        .then(response => {
          this.options = response.data
        })
    },
    getLocation(id) {
      this.editData.camera_id = id
      axios
        .post('/fetch-Road-All', { camera_id: id })
        .then(response => {
          this.editData.location_id = response.data[0].location_id
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>
