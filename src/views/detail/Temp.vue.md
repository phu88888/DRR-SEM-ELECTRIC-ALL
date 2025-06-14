<template>
  <div>
    <b-row>
      <b-col
        lg="6"
        md="12"
        sm="12"
        class="mb-1"
      >
        <b-card
          no-body
          style="font-size:18px; width:auto; height:100%; background-color:rgba(0, 0, 0, 0.6); color:#ffffff; border: 1px solid #00B058; border-radius: 20px;"
        >
          <b-row>
            <b-col
              lg="12"
              class="d-flex align-items-center justify-content-start mt-1 ml-1"
            >
              <b-img
                height="25"
                src="@/assets/images/icons/CDroad/Graph3.svg"
                class="mr-1"
              />
              <label style="color:white; font-size: 16px;">กราฟแสดงแรงดันไฟฟ้าภายในตู้ควบคุม 24 ชั่วโมง (Volt)</label>
            </b-col>
          </b-row>
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
        <b-card
          no-body
          style="font-size:18px; width:auto; height:100%; background-color:rgba(0, 0, 0, 0.6); color:#ffffff; border: 1px solid #00B058; border-radius: 20px;"
        >
          <b-row>
            <b-col
              lg="12"
              class="d-flex align-items-center justify-content-start mt-1 ml-1"
            >
              <b-img
                height="25"
                :src="require('@/assets/images/icons/CDroad/Graph1.svg')"
                class="mr-1"
              />
              <label style="color:white; font-size: 16px;">กราฟแสดงกระแสไฟฟ้าภายในตู้ควบคุม 24 ชั่วโมง (Amp)</label>
            </b-col>
          </b-row>
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
  BRow, BCol, BImg, BCard,
} from 'bootstrap-vue'
import axios from '@axios'
import AppEchartLine from './AppEchartLine.vue'

export default {
  components: {
    BRow,
    BCol,
    BImg,
    BCard,
    AppEchartLine,
  },
  data() {
    return {
      items: [],
      voltPhase1: [],
      ampPhase1: [],
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
            max: '72',
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
            name: 'Amp',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: [],
            color: '#FF6100',
          },
        ],
      },
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
            name: 'Volt',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: [],
            color: '#00D8FF',
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
    this.checkVolt()
    this.graphVolt()
    this.checkAmp()
    this.graphAmp()
    this.interval = setInterval(() => {
      this.checkVolt()
      this.graphVolt()
      this.checkAmp()
      this.graphAmp()
    }, 10000)
  },
  mounted() {
  },
  methods: {
    checkVolt() {
      if (this.$route.query.type === 'iot4g') {
        axios
          .post('/checkVolt4G', { wid: this.$route.query.wid })
          .then(response => {
            this.items = response.data
            this.optionVolt.yAxis[0].max = this.items[0].MaxVolt
            this.optionVolt.yAxis[0].min = this.items[0].MinVolt
          })
          .catch(error => {
            console.log(error)
          })
      } else if (this.$route.query.type === 'iot4g-67') {
        axios
          .get(`/api-go/logs4g/check/volt?imei=${this.$route.query.imei}`)
          .then(response => {
            this.items = response.data
            this.optionVolt.yAxis[0].max = this.items[0].MaxVolt
            this.optionVolt.yAxis[0].min = this.items[0].MinVolt
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        axios
          .post('/checkVolt', { wid: this.$route.query.wid })
          .then(response => {
            this.items = response.data
            this.optionVolt.yAxis[0].max = this.items[0].MaxVolt
            this.optionVolt.yAxis[0].min = this.items[0].MinVolt
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    graphVolt() {
      if (this.$route.query.type === 'iot4g') {
        axios.post('/graphVolt1Phase4G', { wid: this.$route.query.wid })
          .then(response => {
            this.resetVolt()
            // eslint-disable-next-line prefer-destructuring
            this.voltPhase1 = response.data
            this.voltPhase1.forEach(value => {
              this.optionVolt.xAxis[0].data.push(value.Period_Name)
              this.optionVolt.series[0].data.push(value.volt)
            })
          })
          .catch(error => {
            console.log(error)
          })
      } else if (this.$route.query.type === 'iot4g-67') {
        axios
          .get(`/api-go/logs4g/graph/volt?imei=${this.$route.query.imei}`)
          .then(response => {
            this.resetVolt()
            // eslint-disable-next-line prefer-destructuring
            this.voltPhase1 = response.data
            this.voltPhase1.forEach(value => {
              this.optionVolt.xAxis[0].data.push(value.Period_Name)
              this.optionVolt.series[0].data.push(value.volt)
            })
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        axios.post('/graphVolt1Phase', { wid: this.$route.query.wid })
          .then(response => {
            this.resetVolt()
            // eslint-disable-next-line prefer-destructuring
            this.voltPhase1 = response.data
            this.voltPhase1.forEach(value => {
              this.optionVolt.xAxis[0].data.push(value.Period_Name)
              this.optionVolt.series[0].data.push(value.volt)
            })
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    checkAmp() {
      if (this.$route.query.type === 'iot4g') {
        axios
          .post('/checkAmp4G', { wid: this.$route.query.wid })
          .then(response => {
            this.items = response.data
            this.optionAmp.yAxis[0].max = this.items[0].MaxAmp
            this.optionAmp.yAxis[0].min = this.items[0].MinAmp
          })
          .catch(error => {
            console.log(error)
          })
      } else if (this.$route.query.type === 'iot4g-67') {
        axios
          .get(`/api-go/logs4g/check/amp?imei=${this.$route.query.imei}`)
          .then(response => {
            this.items = response.data
            this.optionAmp.yAxis[0].max = this.items[0].MaxAmp
            this.optionAmp.yAxis[0].min = this.items[0].MinAmp
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        axios
          .post('/checkAmp', { wid: this.$route.query.wid })
          .then(response => {
            this.items = response.data
            this.optionAmp.yAxis[0].max = this.items[0].MaxAmp
            this.optionAmp.yAxis[0].min = this.items[0].MinAmp
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    graphAmp() {
      if (this.$route.query.type === 'iot4g') {
        axios.post('/graphAmp1Phase4G', { wid: this.$route.query.wid })
          .then(response => {
            this.resetAmp()
            // eslint-disable-next-line prefer-destructuring
            this.ampPhase1 = response.data
            this.ampPhase1.forEach(value => {
              this.optionAmp.xAxis[0].data.push(value.Period_Name)
              this.optionAmp.series[0].data.push(value.amp)
            })
          })
          .catch(error => {
            console.log(error)
          })
      } else if (this.$route.query.type === 'iot4g-67') {
        axios
          .get(`/api-go/logs4g/graph/amp?imei=${this.$route.query.imei}`)
          .then(response => {
            this.resetAmp()
            // eslint-disable-next-line prefer-destructuring
            this.ampPhase1 = response.data
            this.ampPhase1.forEach(value => {
              this.optionAmp.xAxis[0].data.push(value.Period_Name)
              this.optionAmp.series[0].data.push(value.amp)
            })
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        axios.post('/graphAmp1Phase', { wid: this.$route.query.wid })
          .then(response => {
            this.resetAmp()
            // eslint-disable-next-line prefer-destructuring
            this.ampPhase1 = response.data
            this.ampPhase1.forEach(value => {
              this.optionAmp.xAxis[0].data.push(value.Period_Name)
              this.optionAmp.series[0].data.push(value.amp)
            })
          })
          .catch(error => {
            console.log(error)
          })
      }
    },

    resetVolt() {
      this.voltPhase1.splice(0)
      this.optionVolt.xAxis[0].data.splice(0)
      this.optionVolt.series[0].data.splice(0)
    },
    resetAmp() {
      this.ampPhase1.splice(0)
      this.optionAmp.xAxis[0].data.splice(0)
      this.optionAmp.series[0].data.splice(0)
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
  </style>
