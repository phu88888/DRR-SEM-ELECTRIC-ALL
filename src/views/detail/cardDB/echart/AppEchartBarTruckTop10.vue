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
            return `${d[0].name} : ${d[0].data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} คัน`
          },
        },
        // legend: {
        //   left: 0,
        //   textStyle: {
        //     color: '#fff',
        //   },
        // },
        grid: {
          top: '10px',
          left: '40px',
          right: '5%',
          bottom: '30px',
        },
        xAxis: [
          {
            type: 'category',
            splitLine: { show: false },
            data: this.optionData.xAxisData,
            axisLabel: {
              hideOverlap: true,
              show: true,
              fontSize: 13,
              color: '#00083b',
            },
            axisLine: {
              lineStyle: {
                color: '#00083b', // Changed axis line color to blue
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: { show: false },
            axisLabel: {
              hideOverlap: true,
              show: true,
              fontSize: 13,
              color: '#00083b',
            },
            axisLine: {
              lineStyle: {
                color: '#00083b', // Changed axis line color to blue
              },
            },
          },
        ],
        series: this.optionData.series,
      },
    }
  },
}
</script>
