<template>
  <div>
    <b-row>
      <b-col
        cols="12"
      >
        <b-col
          class="d-flex align-items-center justify-content-center mb-1"
          cols="12"
        >
          <span style="font-size:20px; color: #000;">สัดส่วนยานพาหนะแต่ละประเภท</span>
        </b-col>
        <!-- <div class="pie-text text-center">
          <h3 class="font-weight-bold">
            โดยรวม
          </h3>
          <h2 class="font-weight-bolder">
            {{ Total_PCU }}
          </h2>
        </div> -->
        <div
          class="chart"
          style="height:350px;"
        >
          <app-echart-doughnut
            :series="series"
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
import AppEchartDoughnut from './AppEchartDoughnut.vue'

export default {
  components: {
    BRow,
    BCol,
    AppEchartDoughnut,
  },
  data() {
    return {
      title: {
        left: 'center',
        top: 'center',
        textStyle: {
          fontSize: 35,
          color: 'white',
        },
        subtextStyle: {
          fontSize: 20,
          color: 'white',
        },
      },
      series: [
        {
          // color: ['#0D6EFD', '#FC6359', '#F0DE97', '#F8841A', '#29C67B', '#58A8FD', '#9999FF'],
          name: 'ประเภท',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            fontSize: '14',
            formatter: '{c} %',
            position: 'outside', // Changed from 'inside' to 'outside'
            fontWeight: 'bold',
          },
          padAngle: 5,
          minAngle: 15,
          labelLine: {
            show: true, // Changed from false to true
            length: 10, // Optional: you can adjust the length of the line as needed
            length2: 20, // Optional: adjust the second segment of the line as needed
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          data: [],
        },
      ],
      date: {
        typeDropdown: 'daily',
        direction: 'ทั้งหมด',
        dateFrom: '',
        dateTo: '',
        month: new Date().getFullYear(),
        year: 1,
      },
      itemsIncident: [
        {
          label: 'มอเตอร์ไซค์', percentage: 36, value: 18720, color: '#0D6EFD',
        },
        {
          label: 'รถยนต์', percentage: 36, value: 18720, color: '#FC6359',
        },
        {
          label: 'รถกระบะ', percentage: 36, value: 18720, color: '#C19C54',
        },
        {
          label: 'รถแท็กซี่', percentage: 36, value: 18720, color: '#F8841A',
        },
        {
          label: 'รถบัส', percentage: 36, value: 18720, color: '#29C67B',
        },
        {
          label: 'รถบรรทุก', percentage: 36, value: 18720, color: '#58A8FD',
        },
        {
          label: 'รถพ่วง', percentage: 36, value: 18720, color: '#9999FF',
        },
      ],
      startMonth: 2020,
      endMonth: new Date().getFullYear(),
      startYear: 1,
      endYear: 5,
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    monthList() {
      const years = []
      // eslint-disable-next-line no-plusplus
      for (let i = this.endMonth; i >= this.startMonth; i--) {
        years.push(i)
      }
      return years
    },
    yearList() {
      const years = []
      // eslint-disable-next-line no-plusplus
      for (let i = this.endYear; i >= this.startYear; i--) {
        years.push(i)
      }
      return years
    },
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  created() {
    this.interval = setInterval(() => {
      this.getPieData()
    }, 300000)
  },
  mounted() {
    this.setToday()
    this.getPieData()
  },
  methods: {
    setToday() {
      const p = new Date()
      const month = (`0${p.getMonth() + 1}`).slice(-2)
      const date = 1
      const year = p.getFullYear()
      const dateTo = (`0${p.getDate()}`).slice(-2)
      this.date.dateFrom = `${year}-${month}-${date}`
      this.date.dateTo = `${year}-${month}-${dateTo}`
    },
    getPieData() {
      axios
        .post('/get-PieGraph-Report-All', { location_id: this.$route.query.location_id })
        .then(response => {
        // เก็บข้อมูลและสีเดิมสำหรับแต่ละหมวดหมู่
          const data = [
            { value: response.data[0].bike_percen, name: 'มอเตอร์ไซค์', color: '#0D6EFD' },
            { value: response.data[0].car_percen, name: 'รถยนต์', color: '#FC6359' },
            { value: response.data[0].pickup_percen, name: 'รถกระบะ', color: '#F0DE97' },
            { value: response.data[0].taxi_percen, name: 'รถแท็กซี่', color: '#F8841A' },
            { value: response.data[0].bus_percen, name: 'รถบัส', color: '#29C67B' },
            { value: response.data[0].truck_percen, name: 'รถบรรทุก', color: '#58A8FD' },
            { value: response.data[0].trailer_percen, name: 'รถพ่วง', color: '#9999FF' },
          ]

          // กรองข้อมูลที่มีค่าไม่เป็นศูนย์และเก็บสีเดิม
          const filteredData = data.filter(item => item.value > 0)
          this.series[0].data = filteredData
          this.series[0].color = filteredData.map(item => item.color) // อัปเดตสี
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>
<style scoped lang="scss">
.pie-text{
      width: 200px;
      position:absolute;
      margin: auto;
      left: 0;
      right: 0;
      top: 50%;
      bottom: 0;
    }
  .text1 {
    position: absolute;
    font-family: Arial;
    top: 20px;
    right: 20px;
    color: white;
  }

  .chart-container {
  width: 70%;
  height: 400px;
}
</style>
