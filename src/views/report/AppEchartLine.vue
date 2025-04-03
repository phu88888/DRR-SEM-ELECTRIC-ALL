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
          width: '60%',
          height: '70%',
          left: '0%',
          right: '5%',
          top: '15%',
          bottom: '0%',
          containLabel: true,
          show: false,
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: this.optionData.legendData, // Array of names corresponding to series.name
          left: 'left',
          bottom: '30px',
          orient: 'horizontal',
          textStyle: {
            color: '#000',
            fontSize: 12,
            fontWeight: 'normal',
          },
          itemWidth: 16, // ลดขนาดความกว้างของไอคอนใน legend
          itemHeight: 12, // ลดขนาดความสูงของไอคอนใน legend
          itemGap: 6, // ลดระยะห่างระหว่างรายการใน legend
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          splitLine: {
            lineStyle: {
              width: 1,
              type: 'dashed',
            },
          },
          axisLabel: {
            fontSize: 13,
            color: '#000',
          },
          data: this.optionData.xAxisData,
        }],
        yAxis: {
          type: 'value',
          splitLine: { show: false },
          axisLabel: {
            fontSize: 13,
            color: '#000',
          },
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
    height: 500px;
  }
  </style>
