<template>
  <e-charts
    ref="line"
    autoresize
    :options="chartOptions"
    theme="theme-color"
  />
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/chart/radar'
import echarts from 'echarts/lib/echarts'
import theme from './theme.json'

echarts.registerTheme('theme-color', theme)

export default {
  components: {
    ECharts,
  },
  props: {
    optionData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chartOptions: {},
    }
  },
  watch: {
    optionData: {
      handler(newVal) {
        if (newVal && newVal.radar && newVal.series) {
          this.updateChartOptions()
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.updateChartOptions()
  },
  methods: {
    updateChartOptions() {
      // Create a deep copy to avoid reference issues
      this.chartOptions = JSON.parse(JSON.stringify({
        tooltip: this.optionData.tooltip || {},
        radar: this.optionData.radar || {
          indicator: [
            { name: 'Loading', max: 100 },
          ],
        },
        series: this.optionData.series || [{
          type: 'radar',
          data: [{
            value: [0],
            name: 'Default',
          }],
        }],
      }))
    },
  },
}
</script>
