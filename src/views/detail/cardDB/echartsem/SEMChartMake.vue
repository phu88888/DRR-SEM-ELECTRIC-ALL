<template>
  <div>
    <!-- แสดงค่า wid และ type สำหรับการดีบัก -->
    <div
      v-if="isDebugging"
      class="debug-info"
    >
      <p style="color: white; margin: 10px 0;">
        wid: {{ currentWid }}, type: {{ currentType }}
      </p>
    </div>

    <b-row>
      <b-col
        lg="6"
        md="12"
        sm="12"
        class="mb-1"
      >
        <b-row>
          <b-col
            cols="12"
            class="d-flex align-items-center justify-content-center mb-1"
          >
            <div style="margin-right: 1rem; display: flex; align-items: center;">
              <div style="width: 15px; height: 15px; background-color: #FF6100; border-radius: 3px; margin-right: 5px;" />
              <span style="color: white; font-size: 14px;">Phase 1</span>
            </div>
            <div style="margin-right: 1rem; display: flex; align-items: center;">
              <div style="width: 15px; height: 15px; background-color: #00FF27; border-radius: 3px; margin-right: 5px;" />
              <span style="color: white; font-size: 14px;">Phase 2</span>
            </div>
            <div style="margin-right: 1rem; display: flex; align-items: center;">
              <div style="width: 15px; height: 15px; background-color: #FFFF00; border-radius: 3px; margin-right: 5px;" />
              <span style="color: white; font-size: 14px;">Phase 3</span>
            </div>
            <span
              class="chart-text"
              style="color:#ffffff;"
            >
              กราฟแสดงแรงดันไฟฟ้าภายในตู้ควบคุม 24 ชั่วโมง (Volt)
            </span>
          </b-col>
        </b-row>
        <b-card
          no-body
          class="gradient-border-card-chart1"
          style="font-size:18px; width: auto; height: 400px; background-color:rgba(0, 0, 0, 0.6); color:#ffffff; border: 1px solid #00B058; border-radius: 20px;"
        >
          <div class="mt-1 ml-1">
            <app-echart-line :option-data="optionVolt" />
          </div>

        </b-card>
      </b-col>

      <b-col
        lg="6"
        md="12"
        sm="12"
        class="mb-1"
      >
        <b-row>
          <b-col
            cols="12"
            class="d-flex align-items-center justify-content-center mb-1"
          >
            <div style="margin-right: 1rem; display: flex; align-items: center;">
              <div style="width: 15px; height: 15px; background-color: #FF6100; border-radius: 3px; margin-right: 5px;" />
              <span style="color: white; font-size: 14px;">Phase 1</span>
            </div>
            <div style="margin-right: 1rem; display: flex; align-items: center;">
              <div style="width: 15px; height: 15px; background-color: #00FF27; border-radius: 3px; margin-right: 5px;" />
              <span style="color: white; font-size: 14px;">Phase 2</span>
            </div>
            <div style="margin-right: 1rem; display: flex; align-items: center;">
              <div style="width: 15px; height: 15px; background-color: #FFFF00; border-radius: 3px; margin-right: 5px;" />
              <span style="color: white; font-size: 14px;">Phase 3</span>
            </div>
            <span
              class="chart-text"
              style="color:#ffffff;"
            >
              กราฟแสดงกระแสไฟฟ้าภายในตู้ควบคุม 24 ชั่วโมง (Amp)
            </span>
          </b-col>
        </b-row>
        <b-card
          no-body
          class="gradient-border-card-chart2"
          style="font-size:18px; width: auto; height: 400px; background-color:rgba(0, 0, 0, 0.6); color:#ffffff; border: 1px solid #00B058; border-radius: 20px;"
        >
          <div class="mt-1 ml-1">
            <app-echart-line :option-data="optionAmp" />
          </div>

        </b-card>
      </b-col>

    </b-row>
  </div>
</template>

<script>
import {
  BRow, BCol, BCard,
} from 'bootstrap-vue'
import AppEchartLine from './AppEchartLine.vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    AppEchartLine,
  },
  data() {
    return {
      isDebugging: true, // เปิดโหมดดีบัก
      currentWid: '',
      currentType: '',
      timeHours: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00',
        '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
        '22:00', '23:00'],
      optionVolt: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter(params) {
            let result = `${params[0].name}<br/>`
            params.forEach(param => {
              result += `${'<div style="display: flex; align-items: center;">'
                        + '<div style="width: 10px; height: 10px; background-color: '}${param.color}; margin-right: 5px;"></div>${
                param.seriesName}: ${param.value} V<br/>`
                        + '</div>'
            })
            return result
          },
        },
        legend: {
          data: ['Phase 1', 'Phase 2', 'Phase 3'],
          textStyle: {
            color: '#fff',
          },
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLabel: {
              color: '#fff',
              interval: 2,
            },
            splitLine: { show: false },
          },
        ],
        yAxis: [
          {
            max: '246',
            min: '220',
            type: 'value',
            splitLine: { show: false },
            axisLabel: {
              color: '#fff',
            },
          },
        ],
        grid: {
          width: '92%',
          left: '30px',
          top: '40px',
          containLabel: true,
        },
        series: [
          {
            name: 'Phase 1',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: [],
            color: '#FF6100',
          },
          {
            name: 'Phase 2',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: [],
            color: '#00FF27',
          },
          {
            name: 'Phase 3',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: [],
            color: '#FFFF00',
          },
        ],
      },
      optionAmp: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          formatter(params) {
            let result = `${params[0].name}<br/>`
            params.forEach(param => {
              result += `${'<div style="display: flex; align-items: center;">'
                        + '<div style="width: 10px; height: 10px; background-color: '}${param.color}; margin-right: 5px;"></div>${
                param.seriesName}: ${param.value} A<br/>`
                        + '</div>'
            })
            return result
          },
        },
        legend: {
          data: ['Phase 1', 'Phase 2', 'Phase 3'],
          textStyle: {
            color: '#fff',
          },
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLabel: {
              color: '#fff',
              interval: 2,
            },
            splitLine: { show: false },
          },
        ],
        yAxis: [
          {
            max: '60',
            min: '0',
            type: 'value',
            splitLine: { show: false },
            axisLabel: {
              color: '#fff',
            },
          },
        ],
        grid: {
          width: '92%',
          left: '30px',
          top: '40px',
          containLabel: true,
        },
        series: [
          {
            name: 'Phase 1',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: [],
            color: '#FF6100',
          },
          {
            name: 'Phase 2',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: [],
            color: '#00FF27',
          },
          {
            name: 'Phase 3',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: [],
            color: '#FFFF00',
          },
        ],
      },
      // ข้อมูลสำหรับ wid 2112 (ค่ากระแสไฟฟ้าสูง)
      dataWid2112: {
        volt: {
          phase1: [230.5, 226.2, 232.1, 231.8, 230.9, 229.7, 228.8, 229.3, 231.2, 233.5, 234.8, 235.7,
            236.3, 237.1, 233.2, 237.5, 236.4, 235.9, 236.8, 235.3, 234.1, 233.7, 232.5, 231.8],
          phase2: [228.7, 224.5, 230.3, 229.8, 228.6, 227.9, 226.8, 227.2, 228.1, 230.3, 231.5, 232.6,
            233.8, 234.9, 231.7, 234.8, 233.9, 233.1, 234.2, 233.1, 232.0, 231.5, 230.2, 229.4],
          phase3: [232.8, 233.6, 234.2, 233.9, 232.7, 231.8, 230.9, 231.4, 232.5, 234.8, 235.9, 236.8,
            237.5, 238.3, 234.1, 238.4, 237.5, 236.8, 237.6, 236.2, 235.0, 234.2, 233.4, 232.9],
        },
        amp: {
          phase1: [21.3, 15.5, 19.8, 18.9, 18.2, 19.5, 22.8, 26.4, 30.1, 32.5, 34.8, 36.2,
            35.7, 34.9, 31.8, 38.5, 37.3, 35.8, 34.2, 32.5, 29.7, 27.3, 24.8, 22.6],
          phase2: [22.5, 16.8, 20.7, 19.8, 19.1, 20.3, 23.7, 27.8, 31.5, 33.9, 36.2, 37.8,
            37.2, 36.1, 33.3, 40.1, 38.9, 37.2, 35.3, 33.8, 30.9, 28.6, 25.7, 23.9],
          phase3: [20.1, 14.3, 18.5, 17.6, 16.9, 18.1, 21.5, 25.1, 28.7, 31.2, 33.5, 35.1,
            34.5, 33.8, 31.6, 37.2, 36.0, 34.5, 32.9, 31.3, 28.5, 26.1, 23.5, 21.3],
        },
      },
      // ข้อมูลสำหรับ wid 2113 (ค่ากระแสไฟฟ้าต่ำ)
      dataWid2113: {
        volt: {
          phase1: [231.2, 232.1, 232.8, 232.3, 231.5, 230.4, 229.6, 230.2, 231.9, 234.1, 235.3, 236.2,
            237.0, 237.8, 238.7, 238.1, 237.2, 236.6, 237.3, 236.0, 234.8, 234.2, 233.1, 232.3],
          phase2: [229.3, 230.2, 230.8, 230.5, 229.2, 228.6, 227.5, 228.0, 229.2, 231.0, 232.1, 233.3,
            234.4, 235.5, 236.2, 235.4, 234.8, 234.0, 234.8, 233.8, 232.7, 232.2, 231.0, 230.2],
          phase3: [233.4, 234.2, 234.9, 234.5, 233.4, 232.5, 231.6, 232.1, 233.2, 235.4, 236.5, 237.5,
            238.1, 238.9, 239.7, 239.0, 238.1, 237.5, 238.2, 236.9, 235.6, 234.9, 234.0, 233.6],
        },
        amp: {
          phase1: [12.8, 12.1, 11.5, 10.8, 10.2, 11.1, 13.7, 15.8, 18.1, 19.5, 20.9, 21.7,
            21.4, 20.9, 22.1, 23.1, 22.4, 21.5, 20.5, 19.5, 17.8, 16.4, 14.9, 13.6],
          phase2: [13.5, 13.1, 12.4, 11.9, 11.5, 12.2, 14.2, 16.7, 18.9, 20.3, 21.7, 22.7,
            22.3, 21.7, 23.0, 24.1, 23.3, 22.3, 21.2, 20.3, 18.5, 17.2, 15.4, 14.3],
          phase3: [12.1, 11.6, 11.1, 10.6, 10.1, 10.9, 12.9, 15.1, 17.2, 18.7, 20.1, 21.1,
            20.7, 20.3, 21.4, 22.3, 21.6, 20.7, 19.7, 18.8, 17.1, 15.7, 14.1, 12.8],
        },
      },
    }
  },
  created() {
    // ตรวจสอบว่าอยู่ใน URL ที่ถูกต้องหรือไม่
    if (window.location.pathname.includes('diagram')) {
      // จับค่า query parameters
      const urlParams = new URLSearchParams(window.location.search)
      this.currentWid = urlParams.get('wid') || ''
      this.currentType = urlParams.get('type') || ''

      console.log(`Current URL: ${window.location.href}`)
      console.log(`Loading data for wid: ${this.currentWid}, type: ${this.currentType}`)

      // ตรวจสอบและแสดงข้อมูลตาม wid
      this.loadDataByWid()
    } else {
      console.log('Not in diagram page, but will load sample data')
      this.currentWid = '2112' // ค่าเริ่มต้น
      this.loadDataByWid()
    }
  },
  mounted() {
    // ตรวจสอบการเปลี่ยนแปลง URL ด้วย popstate event (เมื่อใช้งาน browser history)
    window.addEventListener('popstate', () => {
      const urlParams = new URLSearchParams(window.location.search)
      const newWid = urlParams.get('wid') || ''
      const newType = urlParams.get('type') || ''

      if (newWid !== this.currentWid || newType !== this.currentType) {
        this.currentWid = newWid
        this.currentType = newType
        console.log(`URL changed: wid=${this.currentWid}, type=${this.currentType}`)
        this.loadDataByWid()
      }
    })
  },
  methods: {
    // โหลดข้อมูลตาม wid
    loadDataByWid() {
      this.resetCharts()

      // กำหนดข้อมูลเวลา
      this.optionVolt.xAxis[0].data = [...this.timeHours]
      this.optionAmp.xAxis[0].data = [...this.timeHours]

      // ตรวจสอบ wid และแสดงข้อมูลตาม wid
      if (this.currentWid === '2112') {
        // ใช้ข้อมูลของ wid 2112
        console.log('Using data for wid 2112')
        this.optionVolt.series[0].data = [...this.dataWid2112.volt.phase1]
        this.optionVolt.series[1].data = [...this.dataWid2112.volt.phase2]
        this.optionVolt.series[2].data = [...this.dataWid2112.volt.phase3]

        this.optionAmp.series[0].data = [...this.dataWid2112.amp.phase1]
        this.optionAmp.series[1].data = [...this.dataWid2112.amp.phase2]
        this.optionAmp.series[2].data = [...this.dataWid2112.amp.phase3]
      } else if (this.currentWid === '2113') {
        // ใช้ข้อมูลของ wid 2113
        console.log('Using data for wid 2113')
        this.optionVolt.series[0].data = [...this.dataWid2113.volt.phase1]
        this.optionVolt.series[1].data = [...this.dataWid2113.volt.phase2]
        this.optionVolt.series[2].data = [...this.dataWid2113.volt.phase3]

        this.optionAmp.series[0].data = [...this.dataWid2113.amp.phase1]
        this.optionAmp.series[1].data = [...this.dataWid2113.amp.phase2]
        this.optionAmp.series[2].data = [...this.dataWid2113.amp.phase3]
      } else {
        // ไม่พบ wid ที่ระบุ ใช้ข้อมูลเริ่มต้น (wid 2112)
        console.log('Unknown wid, using default data (wid 2112)')
        this.optionVolt.series[0].data = [...this.dataWid2112.volt.phase1]
        this.optionVolt.series[1].data = [...this.dataWid2112.volt.phase2]
        this.optionVolt.series[2].data = [...this.dataWid2112.volt.phase3]

        this.optionAmp.series[0].data = [...this.dataWid2112.amp.phase1]
        this.optionAmp.series[1].data = [...this.dataWid2112.amp.phase2]
        this.optionAmp.series[2].data = [...this.dataWid2112.amp.phase3]
      }
    },

    // รีเซ็ตข้อมูลกราฟ
    resetCharts() {
      this.optionVolt.xAxis[0].data = []
      this.optionVolt.series[0].data = []
      this.optionVolt.series[1].data = []
      this.optionVolt.series[2].data = []

      this.optionAmp.xAxis[0].data = []
      this.optionAmp.series[0].data = []
      this.optionAmp.series[1].data = []
      this.optionAmp.series[2].data = []
    },
  },
}
</script>

<style lang="scss">
  .debug-info {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 5px 10px;
    z-index: 100;
    border-radius: 0 0 5px 0;
  }

  .gradient-border-card-chart1 {
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border: none !important;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  position: relative;
}

/* สร้าง pseudo-element เพื่อทำ gradient border */
.gradient-border-card-chart1::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  padding: 2px; /* ความหนาของ border */
  background: linear-gradient(0.25turn, #40BAB2, #1F7D53);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.gradient-border-card-chart2 {
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border: none !important;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  position: relative;
}

/* สร้าง pseudo-element เพื่อทำ gradient border */
.gradient-border-card-chart2::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  padding: 2px; /* ความหนาของ border */
  background: linear-gradient(0.25turn, #1F7D53, #A92022);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

  /* Responsive text styling */
.chart-text {
  font-size: 22px;
}

  /* Mobile adjustments */
@media (max-width: 576px) {
  .chart-text, .info-text {
    font-size: 15px;
  }

  .paddingmobile {
    padding: 0px;
  }
}

/* Extra small devices */
@media (max-width: 375px) {
  .chart-text, .info-text {
    font-size: 14px;
  }
}
  </style>
