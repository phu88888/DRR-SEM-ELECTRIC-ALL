<template>
  <e-charts
    ref="line"
    autoresize
    :options="option"
    theme="theme-color"
    auto-resize
  />
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/bar'
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
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter(d) {
            return `${d[0].name} : ${d[0].data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} amp`
          },
        },
        legend: {
          left: 0,
        },
        grid: {
          top: '40px',
          left: '100x',
          bottom: '50px',
        },
        xAxis: [
          {
            type: 'category',
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
