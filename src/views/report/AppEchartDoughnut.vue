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
import 'echarts/lib/chart/pie'
import theme from './theme.json'

ECharts.registerTheme('theme-color', theme)

export default {
  components: {
    ECharts,
  },
  props: {
    series: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} %',
        },
        legend: {
          left: 'center', // Centers the legend horizontally
          bottom: '0', // Positions the legend at the bottom
          orient: 'horizontal', // Ensures the legend items are aligned horizontally
          textStyle: {
            color: '#000',
            fontSize: 12,
            fontWeight: 'normal',
          },
          itemWidth: 10, // ลดขนาดความกว้างของไอคอนใน legend
          itemHeight: 10, // ลดขนาดความสูงของไอคอนใน legend
          itemGap: 6, // ลดระยะห่างระหว่างรายการใน legend
        },
        series: this.series,
      },
    }
  },
}
</script>
