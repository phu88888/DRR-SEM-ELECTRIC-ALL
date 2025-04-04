<template>
  <div>
    <b-row>
      <b-col
        cols="12"
      >
        <b-card
          class="gradient-border-card"
          style="background-color:rgba(0, 0, 0, 0.6); color:#ffffff;"
        >
          <!-- <div>
            <b-img
              src="@/assets/images/icons/marker/icontime.svg"
              style="margin-bottom: 5px; margin-right: 5px;"
              height="18"
            />
            <span style="font-size:20px; color: #00083b;">Top 10 สายทาง รถบรรทุก มากที่สุด / วัน</span>
          </div>
          <div class="shadow1">
            <app-echart-bar
              :option-data="optionBar"
              style="width:auto; height:260px; margin-top: 8px;"
            />
          </div> -->
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow, BCol, BCard,
// BCard, BCardText,
} from 'bootstrap-vue'
import axios from '@axios'
import echarts from 'echarts'
// import AppEchartBar from '@/views/dashboard/cardDB/echart/AppEchartBarTruckTop10.vue'

export default {
  components: {
    // AppEchartBar,
    BRow,
    BCol,
    BCard,
    // BImg,

  },
  data() {
    return {
      optionBar: {
        xAxisData: [],
        series: [
          {
            name: 'ทั้งหมด',
            type: 'bar',
            stack: 'Total',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#9dffce',
              },
              {
                offset: 1,
                color: '#00aaff',
              },
              ]),
              barBorderRadius: [4, 4, 0, 0],
            },
            data: [],
            barMaxWidth: '40%',
            barMinWidth: '10px',
          },
        ],
      },
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {
    this.getBarChart()
    this.interval = setInterval(() => {
      this.getBarChart()
    }, 300000)
  },
  methods: {
    getBarChart() {
      axios
        .post('/top10-HeavyTruckDB-All')
        .then(response => {
          this.xAxisData = []
          this.optionBar.xAxisData.splice(0)
          this.optionBar.series[0].data.splice(0)
          this.xAxisData = response.data
          this.xAxisData.forEach(value => {
            this.optionBar.xAxisData.push(value.road_code)
            this.optionBar.series[0].data.push(value.percent_heavy_truck)
          })
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

.gradient-border-card {
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border: none !important;
  width: 100%;
  height: 250px;
  border-radius: 20px;
  position: relative;
}

/* สร้าง pseudo-element เพื่อทำ gradient border */
.gradient-border-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  padding: 2px; /* ความหนาของ border */
  background: linear-gradient(0.25turn, #803C31, #A92022); /* ไล่สีฟ้า แดง เขียว */
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
</style>
