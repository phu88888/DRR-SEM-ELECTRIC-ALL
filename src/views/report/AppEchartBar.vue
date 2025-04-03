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
        tooltip: this.optionData.tooltip,
        legend: {
          data: this.optionData.legendData,
          left: 200,
          bottom: 0,
          textStyle: {
            color: '#000',
            fontSize: 12,
            fontWeight: 'normal',
          },
          itemWidth: 10, // ลดขนาดความกว้างของไอคอนใน legend
          itemHeight: 10, // ลดขนาดความสูงของไอคอนใน legend
          itemGap: 6, // ลดระยะห่างระหว่างรายการใน legend
        },
        // legend: this.optionData.legend,
        grid: {
          top: '40px',
          right: '20%',
          left: '25%',
          bottom: '50px',
        },
        xAxis: this.optionData.xAxis,
        yAxis: this.optionData.yAxis,
        series: this.optionData.series,
      },
    }
  },
}
</script>
<style>
.echarts {
    width: 100% !important;
  }
</style>
