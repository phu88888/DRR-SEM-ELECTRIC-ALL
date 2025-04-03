<template>
  <div>
    <b-row>
      <b-col
        lg="12"
      >
        <b-col
          class="d-flex align-items-center justify-content-left mb-1"
          lg="12"
        >
          <span style="font-size:20px; color: #000;">ปริมาณจราจร เฉลี่ยรายชั่วโมง</span>
        </b-col>
        <div>
          <app-echart-line
            :option-data="option"
            style="width:auto; height:440px;"
          />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow, BCol,
// BCard, BCardText,
} from 'bootstrap-vue'
import axios from '@axios'
import AppEchartLine from './AppEchartLine.vue'

export default {
  components: {
    BRow,
    BCol,
    AppEchartLine,
    // BCardText,
  },
  data() {
    return {
      rtsp: [],
      name: [],
      option: {
        xAxisData: [],
        series: [
          {
            name: 'มอเตอร์ไซค์',
            type: 'line',
            data: [],
            color: '#0D6EFD ',
          },
          {
            name: 'รถยนต์',
            type: 'line',
            data: [],
            color: '#FC6359 ',
          },
          {
            name: 'รถกระบะ',
            type: 'line',
            data: [],
            color: '#F0DE97 ',
          },
          {
            name: 'รถแท็กซี่',
            type: 'line',
            data: [],
            color: '#F8841A ',
          },
          {
            name: 'รถบัส',
            type: 'line',
            data: [],
            color: '#29C67B ',
          },
          {
            name: 'รถบรรทุก',
            type: 'line',
            data: [],
            color: '#58A8FD ',
          },
          {
            name: 'รถพ่วง',
            type: 'line',
            data: [],
            color: '#9999FF',
          },
        ],
        legendData: ['มอเตอร์ไซค์', 'รถยนต์', 'รถบรรทุก', 'รถบัส', 'รถแท็กซี่', 'รถกระบะ', 'รถพ่วง'],
      },
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },
  mounted() {
    this.graphLine()
  },
  methods: {
    graphLine() {
      axios.post('/get-LineGraph-Report-All', { location_id: this.$route.query.location_id })
        .then(response => {
          this.xAxisData = []
          this.xAxisData = response.data
          this.xAxisData.forEach(value => {
            this.option.xAxisData.push(value.Period_Name)
            this.option.series[0].data.push(value.bike_pcu)
            this.option.series[1].data.push(value.car_pcu)
            this.option.series[2].data.push(value.truck_pcu)
            this.option.series[3].data.push(value.bus_pcu)
            this.option.series[4].data.push(value.taxi_pcu)
            this.option.series[5].data.push(value.pickup_pcu)
            this.option.series[6].data.push(value.trailer_pcu)
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>

<style >

</style>
