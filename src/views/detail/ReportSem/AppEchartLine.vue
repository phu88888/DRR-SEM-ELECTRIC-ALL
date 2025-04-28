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
        grid: {
          width: '90%',
          left: '3%',
          top: '30%',
          bottom: '3%',
          containLabel: true,
          show: false,
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: [{
          type: 'category',
          boundaryGap: true,
          splitLine: {
            lineStyle: {
              width: 1,
              type: 'dashed',
            },
          },
          data: this.optionData.xAxisData,
        }],
        yAxis: {
          type: 'value',
          splitLine: { show: false },
        },
        series: this.optionData.series,
      },
    }
  },
}
</script>

  <style scoped>
  .echarts {
    width: 100% !important;
  }
  </style>
