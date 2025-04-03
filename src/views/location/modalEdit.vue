<template>
  <!-- UserEdit -->
  <b-modal
    id="modalEdit"
    title="แก้ไข"
    size="1.714rem"
    ok-title="ตกลง"
    cancel-title="ยกเลิก"
    @ok="editInfo"
  >
    <b-row>
      <!-- Role -->
      <b-col cols="6">
        <b-form-group
          label="ละติจูด"
          label-for="location"
        >
          <b-form-input
            v-model="editData.latitude"
            type="text"
            required
          />
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group
          label="ลองจิจูด"
          label-for="location"
        >
          <b-form-input
            v-model="editData.longitude"
            type="text"
            required
          />
        </b-form-group>
      </b-col>

    </b-row>
  </b-modal>
</template>

<script>
import axios from '@axios'
import {
  BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      editData: {
        location_id: '',
        latitude: '',
        longitude: '',
      },
    }
  },
  mounted() {
  },
  methods: {
    getDataLatLng(lat, lng, id) {
      this.editData.location_id = id
      this.editData.latitude = lat
      this.editData.longitude = lng
    },
    editInfo() {
      axios
        .post('/update-Location-All', this.editData)
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
  },
}
</script>
