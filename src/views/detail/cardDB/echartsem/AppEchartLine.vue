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
        grid: this.optionData ? this.optionData.grid : {},
        legend: {
          left: 0,
          textStyle: {
            color: '#fff',
          },
        },
        xAxis: this.optionData ? this.optionData.xAxis : [],
        yAxis: this.optionData ? this.optionData.yAxis : {},
        series: this.optionData ? this.optionData.series : [],
      },
    }
  },
  watch: {
    // เพิ่ม watcher สำหรับ optionData เพื่ออัพเดทกราฟเมื่อข้อมูลเปลี่ยนแปลง
    optionData: {
      handler(newVal) {
        if (newVal) {
          console.log('optionData เปลี่ยนแปลง - อัพเดทกราฟ')
          // อัพเดทค่าใน line object
          this.line.grid = newVal.grid || {}
          this.line.xAxis = newVal.xAxis || []
          this.line.yAxis = newVal.yAxis || {}
          this.line.series = newVal.series || []
        }
      },
      deep: true, // ตรวจจับการเปลี่ยนแปลงแบบลึก (nested properties)
      immediate: true, // ทำงานทันทีเมื่อคอมโพเนนต์ถูกสร้าง
    },
  },
}
</script>

<style scoped>
.echarts {
  width: 100% !important;
}
</style>
