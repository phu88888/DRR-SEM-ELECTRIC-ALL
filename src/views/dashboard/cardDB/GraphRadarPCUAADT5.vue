<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-card style="background-color: rgba(250,250,250, 1.8); width: 100%; height: auto; border-radius: 20px;">
          <div class="shadow1">
            <b-img
              src="@/assets/images/icons/marker/iconaadt.svg"
              style="margin-bottom: 10px; margin-right: 5px;"
              height="22"
            />
            <span style="font-size:20px; color: #00083b;">Top 5 จังหวัด AADT มากที่สุด / วัน</span>
          </div>
          <div class="shadow1">
            <app-echart-radar
              v-if="dataReady"
              :option-data="optionRadar"
              style="width:auto; height:260px; margin-top: 8px;"
            />
            <div
              v-else
              style="width:auto; height:260px; margin-top: 8px; display: flex; justify-content: center; align-items: center;"
            >
              <span>กำลังโหลดข้อมูล...</span>
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow, BCol, BCard, BImg,
} from 'bootstrap-vue'
import axios from '@axios'
import AppEchartRadar from '@/views/dashboard/cardDB/echart/AppEchartRadarAADT5.vue'

export default {
  components: {
    AppEchartRadar,
    BRow,
    BCol,
    BCard,
    BImg,
  },
  data() {
    return {
      dataReady: false,
      optionRadar: {
        tooltip: {
          trigger: 'item',
        },
        radar: {
          indicator: [
            { name: 'กำลังโหลด', max: 100 },
            { name: 'กำลังโหลด', max: 100 },
            { name: 'กำลังโหลด', max: 100 },
            { name: 'กำลังโหลด', max: 100 },
            { name: 'กำลังโหลด', max: 100 },
          ],
          splitLine: {
            lineStyle: {
              color: [
                'rgba(116, 0, 255, 0.1)',
                'rgba(116, 0, 255, 0.2)',
                'rgba(116, 0, 255, 0.4)',
                'rgba(116, 0, 255, 0.6)',
                'rgba(116, 0, 255, 0.8)',
                'rgba(116, 0, 255, 1)',
              ].reverse(),
            },
          },
          splitArea: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: '#00083b',
            },
          },
        },
        series: [
          {
            name: 'AADT MAX',
            type: 'radar',
            symbol: 'none',
            itemStyle: {
              color: '#0070ff',
            },
            data: [
              {
                value: [0, 0, 0, 0, 0],
                name: 'AADT MAX',
                areaStyle: {
                  opacity: 0.6,
                },
              },
            ],
          },
        ],
      },
    }
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  mounted() {
    this.getRadarChartData()
    this.interval = setInterval(() => {
      this.getRadarChartData()
    }, 300000)
  },
  methods: {
    getRadarChartData() {
      axios
        .post('/top5-ProvinceAADT-DB-All')
        .then(aadtResponse => {
          const aadtData = aadtResponse.data
          if (aadtData && aadtData.length > 0) {
            const maxValue = Math.max(...aadtData.map(d => d.max_aadt)) * 1.1
            this.optionRadar.radar.indicator = aadtData.map(item => ({
              name: item.province || 'ไม่ระบุ',
              max: maxValue || 100,
            }))
            this.optionRadar.series[0].data[0].value = aadtData.map(item => item.max_aadt || 0)
            // Make a deep copy to ensure reactivity
            this.optionRadar = JSON.parse(JSON.stringify(this.optionRadar))
            this.dataReady = true
          }
        })
        .catch(error => {
          console.error('Error fetching AADT data:', error)
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
