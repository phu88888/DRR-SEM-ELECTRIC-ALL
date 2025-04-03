<template>
  <div>
    <b-row class="match-height">
      <b-col
        lg="6"
        md="12"
        sm="12"
      >
        <b-row class="match-height">
          <b-col
            lg="6"
            md="12"
            sm="12"
          >
            <RoutesAll />
          </b-col>
          <b-col
            lg="6"
            md="12"
            sm="12"
          >
            <ProvincesAll />
          </b-col>
          <b-col
            lg="12"
            md="12"
            sm="12"
          >
            <GraphPCUTop5 />
          </b-col>
          <b-col
            lg="6"
            md="12"
            sm="12"
          >
            <GraphRadarPCUAADT5 />
          </b-col>
          <b-col
            lg="6"
            md="12"
            sm="12"
          >
            <TruckTop10 />
          </b-col>
        </b-row>
      </b-col>

      <b-col
        lg="6"
        md="12"
        sm="12"
      >
        <CardMap />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  // BCardHeader,
  BRow, BCol,
} from 'bootstrap-vue'
import CardMap from '@/views/dashboard/cardDB/CardMapDB.vue'
import RoutesAll from '@/views/dashboard/cardDB/RoutesAll.vue'
import ProvincesAll from '@/views/dashboard/cardDB/ProvincesAll.vue'
import GraphPCUTop5 from '@/views/dashboard/cardDB/GraphPCUTop5.vue'
import GraphRadarPCUAADT5 from '@/views/dashboard/cardDB/GraphRadarPCUAADT5.vue'
import TruckTop10 from '@/views/dashboard/cardDB/TruckTop10.vue'

// import CardVMS from '@/views/dashboard/cardDB/CardVMSDB.vue'
// import CardTraffic from '@/views/dashboard/cardDB/CardTrafficDB.vue'

export default {
  components: {
    CardMap,
    RoutesAll,
    ProvincesAll,
    GraphPCUTop5,
    GraphRadarPCUAADT5,
    TruckTop10,
    // BCardHeader,
    BRow,
    BCol,
    // BImg,
    // BLink,
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  // methods: {
  //   getWayCount() {
  //     axios
  //       .post('/getWayCountDetail', { wid: this.$route.query.wid })
  //       .then(response => {
  //         this.center = []
  //         this.center.push(response.data[0].latitude - 0.00135)
  //         this.center.push(response.data[0].longitude)
  //         this.waydetail = response.data[0].detail
  //         this.markers = response.data
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //   },
  //   stream(value, camdesc) {
  //     // eslint-disable-next-line no-return-assign
  //     setTimeout(() => {
  //       this.camdesc = camdesc
  //       const hls = new Hls({
  //         lowLatencyMode: true,
  //         autoreconnect: true,
  //       })
  //       const stream = value
  //       const video = document.querySelector('#video')
  //       hls.loadSource(stream)
  //       hls.attachMedia(video)
  //       hls.on(Hls.Events.MANIFEST_PARSED, () => {
  //         video.play()
  //       })
  //       hls.on(Hls.Events.ERROR, () => {
  //         video.play()
  //       })
  //     }, 500)
  //   },
  // },
}
</script>

<style lang="scss" scoped>
  @import '@core/scss/vue/libs/vue-flatpicker.scss';

.text1 {
  position: absolute;
  font-family: Arial;
  top: 20px;
  right: 20px;
  color: white;
}
.text2 {
  position: absolute;
  font-family: Arial;
  top: 20px;
  right: 20px;
  color: white;
}
</style>
