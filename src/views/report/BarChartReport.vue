<template>
  <div>
    <b-row>
      <b-col
        lg="12"
      >
        <b-col
          class="d-flex align-items-center justify-content-center mb-1"
          lg="12"
        >
          <span style="font-size:20px; color: #000;">ปริมาณยานพาหนะแต่ละประเภท (คัน)</span>
        </b-col>
        <div>
          <br>
          <app-echart-bar
            :option-data="optionBar"
            style="width:auto; height:350px;"
          />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol,
} from 'bootstrap-vue'
import axios from '@axios'
import AppEchartBar from './AppEchartBar.vue'

export default {
  components: {
    BRow,
    BCol,
    AppEchartBar,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      date: {
      },
      startMonth: 2020,
      endMonth: new Date().getFullYear(),
      startYear: 1,
      endYear: 5,
      optionBar: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter(d) {
            const totalValue = d.reduce((total, item) => total + item.value, 0)
            const formatNumber = value => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

            let result = `<span style="font-size: 14px;">${d[0].name} </span><span style="font-size: 14px;">`
            result += `(${formatNumber(totalValue)} คัน)<br/></span>`

            d.forEach(item => {
              result += `${item.marker}${item.seriesName} ${formatNumber(item.value)} คัน<br />`
            })

            return result
          },
        },
        // legend: {
        //   left: 100,
        //   bottom: 0,
        //   textStyle: {
        //     color: '#000',
        //   },
        // },
        yAxis: [
          {
            type: 'value',
            splitLine: { show: false },
            axisLabel: {
              hideOverlap: true,
              show: true,
              fontSize: 13,
              color: '#000',
            },
          },
        ],
        xAxis: [
          {
            type: 'category',
            splitLine: { show: false },
            axisLabel: {
              hideOverlap: true,
              show: true,
              fontSize: 13,
              color: '#000',
            },
            data: [],
          },
        ],
        series: [
          {
            name: 'มอเตอร์ไซค์',
            type: 'bar',
            itemStyle: {
              color: '#0D6EFD',
              barBorderRadius: [10, 10, 0, 0],
            },
            data: [],
            barMaxWidth: '10%',
            barMinWidth: '5px',
          },
          {
            name: 'รถยนต์',
            type: 'bar',
            itemStyle: {
              color: '#FC6359',
              barBorderRadius: [10, 10, 0, 0],
            },
            data: [],
            barMaxWidth: '10%',
            barMinWidth: '5px',
          },
          {
            name: 'รถกระบะ',
            type: 'bar',
            itemStyle: {
              color: '#F0DE97',
              barBorderRadius: [10, 10, 0, 0],
            },
            data: [],
            barMaxWidth: '10%',
            barMinWidth: '5px',
          },
          {
            name: 'รถแท็กซี่',
            type: 'bar',
            stack: 'Total',
            itemStyle: {
              color: '#F8841A',
              barBorderRadius: [10, 10, 0, 0],
            },
            data: [],
            barMaxWidth: '10%',
            barMinWidth: '5px',
          },
          {
            name: 'รถบัส',
            type: 'bar',
            itemStyle: {
              color: '#29C67B',
              barBorderRadius: [10, 10, 0, 0],
            },
            data: [],
            barMaxWidth: '10%',
            barMinWidth: '5px',
          },
          {
            name: 'รถบรรทุก',
            type: 'bar',
            itemStyle: {
              color: '#58A8FD',
              barBorderRadius: [10, 10, 0, 0],
            },
            data: [],
            barMaxWidth: '10%',
            barMinWidth: '5px',
          },
          {
            name: 'รถพ่วง',
            type: 'bar',
            itemStyle: {
              color: '#9999FF',
              barBorderRadius: [10, 10, 0, 0],
            },
            data: [],
            barMaxWidth: '10%',
            barMinWidth: '5px',
          },
        ],
      },
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
  mounted() {
    this.setToday()
    this.getBarChart()
  },
  methods: {
    resetBar() {
      this.optionBar.xAxis[0].data.splice(0)
      this.optionBar.series[0].data.splice(0)
      this.optionBar.series[1].data.splice(0)
      this.optionBar.series[2].data.splice(0)
      this.optionBar.series[3].data.splice(0)
      this.optionBar.series[4].data.splice(0)
      this.optionBar.series[5].data.splice(0)
    },
    getBarChart() {
      axios
        .post('/get-Count-Daily-All', { location_id: this.$route.query.location_id })
        .then(response => {
          this.xAxisData = []
          this.resetBar()
          this.xAxisData = response.data
          this.xAxisData.forEach(value => {
            this.optionBar.xAxis[0].data.push(value.date_time)
            this.optionBar.series[0].data.push(value.bike)
            this.optionBar.series[1].data.push(value.car)
            this.optionBar.series[2].data.push(value.pickup)
            this.optionBar.series[3].data.push(value.taxi)
            this.optionBar.series[4].data.push(value.bus)
            this.optionBar.series[5].data.push(value.truck)
            this.optionBar.series[6].data.push(value.trailer)
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    setToday() {
      const p = new Date()
      const month = (`0${p.getMonth() + 1}`).slice(-2)
      const date = 1
      const year = p.getFullYear()
      const dateTo = (`0${p.getDate()}`).slice(-2)
      this.date.dateFrom = `${year}-${month}-${date}`
      this.date.dateTo = `${year}-${month}-${dateTo}`
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.style-chooser .vs__dropdown-toggle {
  border: 0px solid #000000 !important; /* Change #0000FF to the color you'd like on hover */
  background: #131313 !important;
}
.style-chooser .vs__dropdown-toggle .vs__search::placeholder {
  color: rgb(255, 255, 255);
  opacity: 1; /* ทำให้สีเห็นชัดเจนขึ้น */
}
</style>
