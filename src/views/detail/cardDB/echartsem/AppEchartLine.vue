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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        grid: this.optionData.grid,
        legend: {
          left: 0,
          textStyle: {
            color: '#fff',
          },
        },
        xAxis: this.optionData.xAxis,
        yAxis: this.optionData.yAxis,
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
