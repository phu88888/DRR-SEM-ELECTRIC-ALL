<template>
  <!-- UserEdit -->
  <b-modal
    id="modalUploadCam"
    title="อัพโหลดรูปกล้อง"
    size="1.714rem"
    ok-title="ตกลง"
    cancel-title="ยกเลิก"
    @ok="upLoadImage"
  >
    <b-row>
      <!-- Role -->
      <b-col
        cols="12"
        style="color: #0e1d49;"
      >
        <b-form-group
          label="แนบรูปภาพ"
          label-for="name"
        >
          <image-uploader
            :max-width="800"
            :quality="0.9"
            :auto-rotate="true"
            output-format="verbose"
            :preview="false"
            :class-name="['fileinput', { 'fileinput--loaded' : hasImage }]"
            :capture="false"
            accept="image/*"
            do-not-resize="['gif', 'svg']"
            @input="setImage"
          />
          <br>
          <img
            v-if="image"
            class="img2"
            :src="image"
          >
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

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      formData: new FormData(),
      hasImage: false,
      image: '',
    }
  },
  mounted() {
  },
  methods: {
    setLocationID(id) {
      this.formData.append('location_id', id)
    },
    setImage(file) {
      this.hasImage = true
      this.image = file.dataUrl
      this.formData.delete('image')
      this.formData.append('image', file.dataUrl)
    },
    upLoadImage() {
      axios
        .post('/addImage-Cam-All', this.formData)
        .then(() => {
          this.$swal({
            icon: 'success',
            title: '<span style="color:#000000">อัพโหลดรูปเรียบร้อย.</span>',
            showConfirmButton: false,
            timer: 1000,
          })
          this.formData.delete('image')
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
