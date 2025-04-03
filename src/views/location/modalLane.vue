<template>
  <!-- UserEdit -->
  <b-modal
    id="modalLane"
    title="เลือกจำนวนเลน"
    ok-title="ตกลง"
    cancel-title="ยกเลิก"
    @ok="editInfo"
  >
    <b-row>
      <!-- Role -->
      <b-col cols="12">
        <b-form-group
          label-for="location"
        >
          <b-form-select
            v-model="editData.lane"
            :options="options"
            size="sm"
          />
        </b-form-group>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import axios from '@axios'
import {
  BRow, BCol, BFormGroup, BFormSelect,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      options: [
        {
          value: null, text: 'โปรดเลือกจำนวนเลน', notEnabled: true, disabled: true,
        },
        { value: 2, text: '2 เลน' },
        { value: 4, text: '4 เลน' },
        { value: 6, text: '6 เลน' },
        { value: 8, text: '8 เลน' },
      ],
      editData: {
        location_id: '',
        lane: null,
      },
    }
  },
  mounted() {
  },
  methods: {
    getFetchLane(id) {
      this.editData.location_id = id
      axios
        .post('/fetchLane-All', { location_id: id })
        .then(response => {
          this.editData.lane = response.data.lane
        })
        .catch(error => {
          console.log(error)
        })
    },
    editInfo() {
      axios
        .post('/laneLocation-All', this.editData)
        .then(() => {
          this.$swal({
            icon: 'success',
            title: '<span style="color:#000000">อัพเดตข้อมูลเรียบร้อย.</span>',
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
