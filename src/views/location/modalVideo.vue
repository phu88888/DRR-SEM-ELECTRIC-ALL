<template>
  <!-- UserEdit -->
  <b-modal
    id="modalVideo"
    title="วีดีโอ"
    size="lg"
    ok-only
    ok-title="ปิด"
  >
    <b-row>
      <!-- Setup -->
      <b-col cols="12">
        <video
          id="video-container"
          ref="videoRef"
          :src="video"
          width="100%"
          autoplay
          playsinline
          controls
        />
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import {
  BRow, BCol,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
  },
  data() {
    return {
      video: '',
    }
  },
  mounted() {
  },
  methods: {
    getVideo(video) {
      this.video = video
    },
  },
}
</script>
