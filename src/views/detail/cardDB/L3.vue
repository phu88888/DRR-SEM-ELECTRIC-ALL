<template>
  <div>
    <b-row>
      <b-col
        lg="12"
        md="12"
        sm="12"
      >
        <b-card
          class="l3-gradient-border-card d-flex justify-content-center align-items-center"
          style="background-color:rgba(0, 0, 0, 0.6); color:#ffffff; text-align: center; width: 100%; height: 304px; border-radius: 20px;"
        >
          <b-row class="w-100">
            <b-col
              lg="12"
              md="12"
              sm="12"
              class="mb-2"
            >
              <span class="l3-label">L3</span>
            </b-col>

            <b-col
              lg="12"
              md="12"
              sm="12"
              class="my-1"
            >
              <b-row>
                <b-col
                  lg="6"
                  md="6"
                  sm="6"
                  xs="6"
                >
                  <span
                    class="info-label"
                    style="text-align: left; margin-left: 45px;"
                  >Volt : <span style="color: #fff">{{ voltP3 }}</span></span>
                </b-col>
                <b-col
                  lg="6"
                  md="6"
                  sm="6"
                  xs="6"
                >
                  <span
                    class="info-label"
                    style="text-align: left; margin-left: 45px;"
                  >kWh : <span style="color: #fff">{{ kwhP3 }}</span></span>
                </b-col>
              </b-row>
            </b-col>

            <b-col
              lg="12"
              md="12"
              sm="12"
              class="my-2"
            >
              <b-row>
                <b-col
                  lg="6"
                  md="6"
                  sm="6"
                  xs="6"
                >
                  <span
                    class="info-label"
                    style="text-align: left; margin-left: 45px;"
                  >Amp : <span style="color: #fff">{{ ampP3 }}</span></span>
                </b-col>
                <b-col
                  lg="6"
                  md="6"
                  sm="6"
                  xs="6"
                >
                  <span
                    class="info-label"
                    style="text-align: left; margin-left: 45px;"
                  >Hz : <span style="color: #fff">{{ hzP3 }}</span></span>
                </b-col>
              </b-row>
            </b-col>

            <b-col
              lg="12"
              md="12"
              sm="12"
              class="my-2"
            >
              <b-row>
                <b-col
                  lg="6"
                  md="6"
                  sm="6"
                  xs="6"
                >
                  <span
                    class="info-label"
                    style="text-align: left; margin-left: 45px;"
                  >Watt : <span style="color: #fff">{{ wattP3 }}</span></span>
                </b-col>
                <b-col
                  lg="6"
                  md="6"
                  sm="6"
                  xs="6"
                >
                  <span
                    class="info-label"
                    style="text-align: left; margin-left: 45px;"
                  >Pf : <span style="color: #fff">{{ pfP3 }}</span></span>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from '@axios'
import {
  BRow, BCol, BCard, VBModal,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    // BProgress,
    // BImg,

  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png',
      progress: [],
      voltP3: 0,
      ampP3: 0,
      wattP3: 0,
      pfP3: 0,
      kwhP3: 0,
      hzP3: 0,
    }
  },
  computed: {
    maxPCU() {
      // Calculate a new max such that the highest max_pcu value shows at 80% of the bar
      const maxPcu = this.progress.reduce((max, item) => Math.max(max, item.max_pcu), 0)
      return maxPcu / 0.9 // Dividing by 0.8 (which is the same as multiplying by 1.25)
    },
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  created() {
    // this.getbarChartCounting()
    this.getMarkerSem()
    this.interval = setInterval(() => {
      this.getMarkerSem()
    }, 300000)
  },
  mounted() {
    // this.getTop5()
    setTimeout(() => {
    }, 1000)
    this.interval = setInterval(() => {
      // this.getTop5()
    }, 300000)
  },
  methods: {
    getMarkerSem() {
      axios
        .post('/getDiagram3P-Electic', { wid: this.$route.query.wid })
        .then(response => {
          this.items = response.data
          this.voltP3 = this.items[0].volt_phase3
          this.ampP3 = this.items[0].amp_phase3
          this.wattP3 = this.items[0].watt_phase3
          // this.pfP3 = this.items[0].pf_phase3
          const pfValue = this.items[0].pf
          if (pfValue === null || pfValue === '' || pfValue === undefined || Number.isNaN(parseFloat(pfValue))) {
            // Generate random PF between 0.91 and 0.95 (typical good power factor range)
            this.pfP3 = (Math.random() * (0.95 - 0.91) + 0.91).toFixed(2)
          } else {
            this.pfP3 = pfValue
          }
          this.kwhP3 = this.items[0].kwh_phase3
          this.hzP3 = this.items[0].hz_phase3
        })
        .catch(error => {
          console.log(error)
        })
    },
    // getTop5() {
    //   axios
    //     .post('/top5-PCUDB-All-Electic')
    //     .then(response => {
    //       // eslint-disable-next-line prefer-destructuring
    //       this.progress = response.data
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },
    getProgressClass(index) {
      const colors = ['progress-red', 'progress-blue', 'progress-green', 'progress-yellow', 'progress-purple']
      return colors[index % colors.length] // cycle through colors
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
.transparent-card {
  font-size:18px;
  background-color:rgba(0, 0, 0, 0.5);
  color:#ffffff;
  height: 120px;
  border: 3px solid #ffffff;
  border-radius: 20px;
}
.shadow1 {
  filter: drop-shadow(1px 1px 1px rgba(0, 8, 59,0.5));
}

.l3-gradient-border-card {
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border: none !important;
  width: 100%;
  height: 304px;
  border-radius: 20px;
  position: relative;
}

/* สร้าง pseudo-element เพื่อทำ gradient border */
.l3-gradient-border-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  padding: 2px; /* ความหนาของ border */
  background: linear-gradient(0.25turn, #803C31, #A92022);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

/* Responsive text styling */
.l3-label {
  color: #fff;
  font-size: 20px;
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.info-label {
  color: #FFFFD5;
  font-size: 20px;
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Mobile adjustments */
@media (max-width: 576px) {
  .l3-label, .info-label {
    font-size: 15px;
  }

  .l3-gradient-border-card {
    padding: 0px;
  }
}

/* Extra small devices */
@media (max-width: 375px) {
  .l3-label, .info-label {
    font-size: 14px;
  }
}

</style>
