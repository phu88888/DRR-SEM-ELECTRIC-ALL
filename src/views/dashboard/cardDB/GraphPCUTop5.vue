<template>
  <div>
    <b-row>
      <b-col
        lg="12"
        md="12"
        sm="12"
      >
        <b-card style="background-color: rgb(250, 250, 250, 1.8); width: 100%; height: auto; border-radius: 20px">
          <b-img
            src="@/assets/images/icons/marker/icontime2.svg"
            style="margin-bottom: 5px;"
            height="20"
          />
          <span
            class="shadow1"
            style="color:#00083b;font-size:20px; margin-left:10px"
          >Top 5  สายทาง PCU มากที่สุด</span>
          <b-row
            v-for="(item, index) in progress.slice(0,5)"
            :key="index"
            style="margin-top: 5px;"
            class="shadow1"
          >
            <b-col
              lg="10"
            >
              <label style="color: #00083b; font-size: 16px;">{{ index+1 +'. ' }} {{ item.road_code }}</label>
              <b-progress
                :value="item.max_pcu"
                :max="maxPCU"
                precision="2"
                :class="getProgressClass(index)"
              />
            </b-col>
            <b-col
              lg="2"
              style="text-align: left;"
            >
              <br>
              <span style="color:#00083b; ">{{ item.max_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }} PCU</span>
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
  BRow, BCol, BCard, VBModal, BProgress, BImg,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BProgress,
    BImg,

  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png',
      progress: [],
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
  mounted() {
    this.getTop5()
    setTimeout(() => {
    }, 1000)
    this.interval = setInterval(() => {
      this.getTop5()
    }, 300000)
  },
  methods: {
    getTop5() {
      axios
        .post('/top5-PCUDB-All')
        .then(response => {
          // eslint-disable-next-line prefer-destructuring
          this.progress = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
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

.progress-red .progress-bar { background: linear-gradient(90deg, #e65786 46.03%, rgb(255, 245, 244) 100%); }
.progress-blue .progress-bar { background: linear-gradient(90deg, #f77e8e 46.03%, rgb(255, 245, 244) 100%); }
.progress-green .progress-bar { background: linear-gradient(90deg, #f48c80 46.03%, rgb(255, 245, 244) 100%); }
.progress-yellow .progress-bar { background: linear-gradient(90deg, #f1ac8c 46.03%, rgb(255, 245, 244) 100%); }
.progress-purple .progress-bar { background: linear-gradient(90deg, #f6dc9f 46.03%, rgb(255, 245, 244) 100%); }
</style>
