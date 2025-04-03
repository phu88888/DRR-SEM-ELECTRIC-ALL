<template>
  <!-- UserEdit -->
  <b-modal
    id="modalUploadVideo"
    title="อัพโหลดวีดีโอ"
    size="1.714rem"
    ok-title="ตกลง"
    cancel-title="ยกเลิก"
    @ok="onFileVideo"
  >
    <b-row>
      <!-- Role -->
      <b-col cols="12">
        <b-form-group
          label="แนบวีดีโอ"
          label-for="name"
        >
          <b-form-file
            id="inputFile"
            ref="filePDF"
            v-model="filename"
            placeholder="เลือกไฟล์วีดีโอ..."
            drop-placeholder="เลือกไฟล์วีดีโอ..."
            accept="application/mp4"
            @change="setVideo"
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
  BRow, BCol, BFormGroup, BFormFile,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormFile,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      formData: new FormData(),
      hasImage: false,
      filename: '',
    }
  },
  mounted() {
  },
  methods: {
    setLocationID(id) {
      this.formData.append('location_id', id)
    },
    setVideo(e) {
      const file = e.target.files[0]
      this.formData.delete('filename')
      this.formData.append('filename', file)
    },
    onFileVideo() {
      axios
        .post('/addVideo-Cam-All', this.formData)
        .then(() => {
          this.$swal({
            icon: 'success',
            title: '<span style="color:#000000">อัพโหลดวีดีโอเรียบร้อย.</span>',
            showConfirmButton: false,
            timer: 1000,
          })
          this.formData.delete('filename')
          this.formData.delete('location_id')
          this.$emit('fetch')
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>
