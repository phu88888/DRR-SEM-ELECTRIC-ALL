<template>
  <div>
    <b-row>
      <b-col
        lg="6"
        md="12"
        sm="12"
        class="mb-1"
      >
        <b-row>
          <b-col
            cols="12"
            class="d-flex align-items-center justify-content-center mb-1"
          >
            <ColorScale1 style="margin-right: 3rem;" />
            <span
              class="chart-text"
              style="color:#ffffff;"
            >
              กราฟแสดงแรงดันไฟฟ้าภายในตู้ควบคุม 24 ชั่วโมง (Volt)
            </span>
            <ColorScale2 style="margin-left: 3rem;" />
          </b-col>
        </b-row>
        <b-card
          no-body
          class="gradient-border-card-chart1"
          style="font-size:18px; width: auto; height: 400px; background-color:rgba(0, 0, 0, 0.6); color:#ffffff; border: 1px solid #00B058; border-radius: 20px;"
        >
          <div class="mt-1 ml-1">
            <app-echart-line :option-data="optionVolt" />
          </div>

        </b-card>
      </b-col>

      <b-col
        lg="6"
        md="12"
        sm="12"
        class="mb-1"
      >
        <b-row>
          <b-col
            cols="12"
            class="d-flex align-items-center justify-content-center mb-1"
          >
            <ColorScale1 style="margin-right: 3rem;" />
            <span
              class="chart-text"
              style="color:#ffffff;"
            >
              กราฟแสดงกระแสไฟฟ้าภายในตู้ควบคุม 24 ชั่วโมง (Amp)
            </span>
            <ColorScale2 style="margin-left: 3rem;" />
          </b-col>
        </b-row>
        <b-card
          no-body
          class="gradient-border-card-chart2"
          style="font-size:18px; width: auto; height: 400px; background-color:rgba(0, 0, 0, 0.6); color:#ffffff; border: 1px solid #00B058; border-radius: 20px;"
        >
          <div class="mt-1 ml-1">
            <app-echart-line :option-data="optionAmp" />
          </div>

        </b-card>
      </b-col>

    </b-row>
  </div>
</template>

<script>
import {
  BRow, BCol, BCard,
} from 'bootstrap-vue'
import axios from '@axios'
import AppEchartLine from './AppEchartLine.vue'

import ColorScale1 from '@/views/detail/cardDB/ColorScale1.vue'
import ColorScale2 from '@/views/detail/cardDB/ColorScale2.vue'

export default {
  components: {
    BRow,
    BCol,
    // BImg,
    BCard,
    AppEchartLine,

    ColorScale1,
    ColorScale2,
  },
  data() {
    return {
      volt3Phase: [],
      amp3Phase: [],
      optionVolt: {
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLabel: {
              color: '#fff',
            },
            splitLine: { show: false },
          },
        ],
        yAxis: [
          {
            max: '246',
            min: '220',
            type: 'value',
            splitLine: { show: false },
            axisLabel: {
              color: '#fff',
            },
          },
        ],
        grid: {
          width: '92%',
          left: '30px',
          top: '40px',
          containLabel: true,
        },
        series: [
          {
            name: 'Phase 1',
            type: 'line',
            showSymbol: false,
            smooth: true,
            // lineStyle: {
            //   width: 0,
            // },
            data: [],
            color: '#FF6100',
          },
          {
            name: 'Phase 2',
            type: 'line',
            showSymbol: false,
            smooth: true,
            // lineStyle: {
            //   width: 0,
            // },
            data: [],
            color: '#00FF27',
          },
          {
            name: 'Phase 3',
            type: 'line',
            showSymbol: false,
            smooth: true,
            // lineStyle: {
            //   width: 0,
            // },
            data: [],
            color: '#FFFF00',
          },
        ],
      },
      optionAmp: {
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLabel: {
              color: '#fff',
            },
            splitLine: { show: false },
          },
        ],
        yAxis: [
          {
            max: '60',
            min: '0',
            type: 'value',
            splitLine: { show: false },
            axisLabel: {
              color: '#fff',
            },
          },
        ],
        grid: {
          width: '92%',
          left: '30px',
          top: '40px',
          containLabel: true,
        },
        series: [
          {
            name: 'Phase 1',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: [],
            color: '#FF6100',
          },
          {
            name: 'Phase 2',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: [],
            color: '#00FF27',
          },
          {
            name: 'Phase 3',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: [],
            color: '#FFFF00',
          },
        ],
      },
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  created() {
    this.graphVolt()
    this.graphAmp()
    this.interval = setInterval(() => {
      this.graphVolt()
      this.graphAmp()
    }, 100000)
  },
  mounted() {
    // this.getbarChartCounting()
  },
  methods: {
    graphVolt() {
      axios.post('/graphVolt3P', { wid: this.$route.query.wid })
        .then(response => {
          this.resetVolt()
          // eslint-disable-next-line prefer-destructuring
          this.volt3Phase = response.data
          this.volt3Phase.forEach(value => {
            this.optionVolt.xAxis[0].data.push(value.Period_Name)
            this.optionVolt.series[0].data.push(value.volt)
            this.optionVolt.series[1].data.push(value.volt2)
            this.optionVolt.series[2].data.push(value.volt3)
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    graphAmp() {
      axios.post('/graphAmp3P', { wid: this.$route.query.wid })
        .then(response => {
          this.resetAmp()
          // eslint-disable-next-line prefer-destructuring
          this.amp3Phase = response.data
          this.amp3Phase.forEach(value => {
            this.optionAmp.xAxis[0].data.push(value.Period_Name)
            this.optionAmp.series[0].data.push(value.amp)
            this.optionAmp.series[1].data.push(value.amp2)
            this.optionAmp.series[2].data.push(value.amp3)
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    resetVolt() {
      this.volt3Phase.splice(0)
      this.optionVolt.xAxis[0].data.splice(0)
      this.optionVolt.series[0].data.splice(0)
      this.optionVolt.series[1].data.splice(0)
      this.optionVolt.series[2].data.splice(0)
    },
    resetAmp() {
      this.amp3Phase.splice(0)
      this.optionAmp.xAxis[0].data.splice(0)
      this.optionAmp.series[0].data.splice(0)
      this.optionAmp.series[1].data.splice(0)
      this.optionAmp.series[2].data.splice(0)
    },
  },
}
</script>

<style lang="scss">
  .text1 {
    position: absolute;
    font-family: Arial;
    top: 20px;
    right: 20px;
    color: white;
  }

  .gradient-border-card-chart1 {
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border: none !important;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  position: relative;
}

/* สร้าง pseudo-element เพื่อทำ gradient border */
.gradient-border-card-chart1::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  padding: 2px; /* ความหนาของ border */
  background: linear-gradient(0.25turn, #40BAB2, #1F7D53);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.gradient-border-card-chart2 {
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border: none !important;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  position: relative;
}

/* สร้าง pseudo-element เพื่อทำ gradient border */
.gradient-border-card-chart2::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  padding: 2px; /* ความหนาของ border */
  background: linear-gradient(0.25turn, #1F7D53, #A92022);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

  /* Responsive text styling */
.chart-text {
  font-size: 22px;
}

  /* Mobile adjustments */
@media (max-width: 576px) {
  .chart-text, .info-text {
    font-size: 15px;
  }

  .paddingmobile {
    padding: 0px;
    // margin-top: 50px;
  }
}

/* Extra small devices */
@media (max-width: 375px) {
  .chart-text, .info-text {
    font-size: 14px;
  }
}
  </style>
