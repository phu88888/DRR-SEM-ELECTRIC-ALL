<template>
  <div>
    <b-card style="background-color: rgb(250, 250, 250, 1.8); width: 100%; height: 110px; border-radius: 20px">
      <b-row>
        <b-col
          md="12"
          lg="12"
          class="d-flex align-items-center justify-content-start"
        >
          <b-img
            src="@/assets/images/icons/marker/jam_map-f.svg"
            height="22"
          />
          <span
            style="font-size: 20px;"
            class="ml-1 shadow1"
          > สรุปสายทางทั้งหมด
          </span>
        </b-col>
        <b-col
          md="12"
          lg="12"
          class="d-flex align-items-end justify-content-start mb-1 shadow1"
        >
          <span style="text-align:left; font-weight: 400; font-size:36px; margin-left:35px;">
            {{ TotalRoad }}
          </span>
          <span
            class="ml-1"
            style="text-align:center; font-weight: 300; font-size:20px; margin-bottom: 4px;"
          >
            สายทาง
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style="text-align:right; font-weight: 400; font-size:24px; color:#013e00">
            {{ TotalLocation }}
          </span>
          <span
            class="ml-1"
            style="text-align:center; font-weight: 300; font-size:15px; margin-bottom: 4px; color:#013e00;"
          >
            จุดติดตั้ง
          </span>
        </b-col>
        <!-- <b-col
          md="6"
          lg="6"
          class="d-flex align-items-end justify-content-end mb-1 shadow1"
        >
          <span style="text-align:right; font-weight: 400; font-size:24px; color:#00083b">
            {{ TotalLocation }}
          </span>
          <span
            class="ml-1"
            style="text-align:center; font-weight: 300; font-size:15px; margin-bottom: 4px; color:#00083b;"
          >
            จุดติดตั้ง
          </span>
        </b-col> -->
      </b-row>
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BImg, BRow, BCol,
} from 'bootstrap-vue'
import axios from '@axios'

export default {
  components: {
    BCard,
    // BCardBody,
    // BAvatar,
    BImg,
    BRow,
    BCol,
  },
  data() {
    return {
      TotalRoad: '',
      TotalLocation: '',
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {
    this.getRoutesAll()
    this.interval = setInterval(() => {
      this.getRoutesAll()
    }, 300000)
  },
  methods: {
    getRoutesAll() {
      axios
        .post('/count-RoadDB-All-Electic')
        .then(response => {
          this.TotalRoad = response.data[0].count_road.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        })
        .catch(error => {
          console.log(error)
        })
      axios
        .post('/count-LocationDB-All-Electic')
        .then(response => {
          this.TotalLocation = response.data[0].count_location.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';

.shadow1 {
  filter: drop-shadow(1px 1px 1px rgba(0, 8, 59,0.5));
}
</style>
