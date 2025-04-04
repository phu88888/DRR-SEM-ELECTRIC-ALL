<template>
  <e-charts
    ref="line"
    autoresize
    :options="line"
    theme="theme-color"
    auto-resize
  />
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/line'
import theme from './theme.json'

ECharts.registerTheme('theme-color', theme)

export default {
  components: {
    ECharts,
  },
  props: {
    optionData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      line: {
        // Make gradient line here
        // visualMap: [{
        //   show: false,
        //   type: 'continuous',
        //   min: 0,
        //   max: 10000,
        // }],
        grid: {
          width: '92%',
          left: '40px',
          top: '10px',
          show: false,
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['มอเตอร์ไซค์', 'รถยนต์', 'รถบรรทุก', 'รถบัส', 'รถแท็กซี่', 'รถกระบะ', 'รถพ่วง', 'รวม'],
          bottom: '15',
          left: '20',
          size: '70px',
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.optionData.xAxisData,
          },
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: { show: false },
          },
        ],
        series: this.optionData.series,
      },
    }
  },
}
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
