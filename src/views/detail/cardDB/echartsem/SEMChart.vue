<template>
  <div>
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
            <ColorScale1 style="margin-right: 3rem;" />
            <span
              class="chart-text"
              style="color:#ffffff;"
            >
              {{ phaseType === 1 ? 'กราฟแสดงแรงดันไฟฟ้าภายในตู้ควบคุม 24 ชั่วโมง (Volt)' : 'กราฟแสดงแรงดันไฟฟ้า 3 เฟส ภายในตู้ควบคุม 24 ชั่วโมง (Volt)' }}
            </span>
            <ColorScale2 style="margin-left: 3rem;" />
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
            <ColorScale1 style="margin-right: 3rem;" />
            <span
              class="chart-text"
              style="color:#ffffff;"
            >
              {{ phaseType === 1 ? 'กราฟแสดงกระแสไฟฟ้าภายในตู้ควบคุม 24 ชั่วโมง (Amp)' : 'กราฟแสดงกระแสไฟฟ้า 3 เฟส ภายในตู้ควบคุม 24 ชั่วโมง (Amp)' }}
            </span>
            <ColorScale2 style="margin-left: 3rem;" />
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
import axios from '@axios'
import AppEchartLine from './AppEchartLine.vue'

import ColorScale1 from '@/views/detail/cardDB/ColorScale1.vue'
import ColorScale2 from '@/views/detail/cardDB/ColorScale2.vue'

export default {
  components: {
    BRow,
    BCol,
    // BImg,
    BCard,
    AppEchartLine,

    ColorScale1,
    ColorScale2,
  },
  data() {
    return {
      phaseType: 1, // ค่าเริ่มต้นเป็น 1 เฟส
      voltPhase1: [],
      voltPhase2: [],
      voltPhase3: [],
      ampPhase1: [],
      ampPhase2: [],
      ampPhase3: [],
      optionVolt: {
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLabel: {
              color: '#fff',
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
            name: 'Volt',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: [],
            color: '#00D8FF',
          },
        ],
      },
      optionAmp: {
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLabel: {
              color: '#fff',
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
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },
  watch: {
    // เพิ่ม watcher สำหรับตรวจจับการเปลี่ยนแปลงของ wid ใน URL query
    '$route.query.wid': {
      handler(newWid, oldWid) {
        if (newWid && newWid !== oldWid) {
          console.log(`wid เปลี่ยนจาก ${oldWid} เป็น ${newWid} - โหลดข้อมูลกราฟใหม่`)
          // ล้างข้อมูลเดิมก่อน
          this.resetVolt()
          this.resetAmp()
          // โหลดข้อมูลกราฟใหม่เมื่อ wid เปลี่ยน
          this.graphVolt()
          this.graphAmp()
        }
      },
      immediate: true, // ทำงานทันทีเมื่อคอมโพเนนต์ถูกสร้าง
    },
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  created() {
    this.interval = setInterval(() => {
      this.graphVolt()
      this.graphAmp()
    }, 100000)
  },
  mounted() {
    // ไม่จำเป็นต้องเรียกที่นี่แล้ว เพราะ watcher จะทำงานทันทีด้วย immediate: true
    // this.graphVolt()
    // this.graphAmp()
    // this.getbarChartCounting()
  },
  methods: {
    // ฟังก์ชันสำหรับดึงค่า imei และ phaseType จาก wayData ใน localStorage ตามค่า wid ปัจจุบัน
    getWayData(wid) {
      try {
        // ดึงข้อมูลจาก localStorage
        const wayData = JSON.parse(localStorage.getItem('wayData'))

        // ถ้าไม่มีข้อมูลใน localStorage ให้ return ค่าว่าง
        if (!wayData) {
          console.warn('ไม่พบข้อมูล wayData ใน localStorage')
          return { imei: null, phaseType: 1 } // ค่าเริ่มต้นเป็น 1 เฟส
        }

        // แปลง wid เป็น string เพื่อให้แน่ใจว่าเปรียบเทียบประเภทข้อมูลเดียวกัน
        const widStr = String(wid)

        // หา way ที่มี wid ตรงกับที่ต้องการ (เปรียบเทียบแบบไม่เข้มงวด)
        const way = wayData.find(item => String(item.wid) === widStr)

        // ถ้าไม่พบ way ที่ตรงกับ wid ให้ return ค่าว่าง
        if (!way) {
          console.warn(`ไม่พบ way ที่มี wid=${wid} ใน wayData`)
          return { imei: null, phaseType: 1 } // ค่าเริ่มต้นเป็น 1 เฟส
        }

        // ดึงค่า imei และ phaseType จาก way ที่พบ
        const { imei, phaseType } = way

        // อัพเดท phaseType ในคอมโพเนนต์
        this.phaseType = phaseType || 1 // ถ้าไม่มี phaseType ให้ใช้ค่าเริ่มต้นเป็น 1

        console.log(`พบ way สำหรับ wid=${wid}: imei=${imei}, phase_type=${phaseType || 1}`)
        return { imei, phaseType: phaseType || 1 }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล way:', error)
        return { imei: null }
      }
    },

    // เก็บไว้สำหรับความเข้ากันได้กับโค้ดเดิม
    getImeiFromWid(wid) {
      const { imei } = this.getWayData(wid)
      return imei
    },

    graphVolt() {
      // ดึงค่า wid จาก URL query
      const { wid } = this.$route.query

      // ดึงค่า imei และ phaseType จาก wayData ใน localStorage
      const { imei, phaseType } = this.getWayData(wid)

      // ก่อนเรียก API ให้ปรับการแสดงผลของกราฟตามประเภทเฟส
      this.updateVoltChartConfig(phaseType)

      // ใช้เฉพาะ API path /api-go/logs4g/graph/volt และส่ง phaseType ไปด้วย
      axios
        .get(`/api-go/logs4g/graph/volt?imei=${imei}&phase_type=${phaseType || 1}`)
        .then(response => {
          this.resetVolt()

          if (phaseType === 1 || !phaseType) {
            // กรณี 1 เฟส
            this.voltPhase1 = response.data
            this.voltPhase1.forEach(value => {
              this.optionVolt.xAxis[0].data.push(value.Period_Name)
              this.optionVolt.series[0].data.push(value.volt)
            })
          } else {
            // กรณี 3 เฟส
            // สมมติว่า API จะส่งข้อมูลมาในรูปแบบที่มี volt1, volt2, volt3
            this.voltPhase1 = response.data
            this.voltPhase1.forEach(value => {
              this.optionVolt.xAxis[0].data.push(value.Period_Name)
              this.optionVolt.series[0].data.push(value.volt1 || value.volt)
              if (this.optionVolt.series[1] && value.volt2) {
                this.optionVolt.series[1].data.push(value.volt2)
              }
              if (this.optionVolt.series[2] && value.volt3) {
                this.optionVolt.series[2].data.push(value.volt3)
              }
            })
          }
        })
        .catch(error => {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูลกราฟแรงดันไฟฟ้า:', error)
        })
    },
    graphAmp() {
      // ดึงค่า wid จาก URL query
      const { wid } = this.$route.query

      // ดึงค่า imei และ phaseType จาก wayData ใน localStorage
      const { imei, phaseType } = this.getWayData(wid)

      // ก่อนเรียก API ให้ปรับการแสดงผลของกราฟตามประเภทเฟส
      this.updateAmpChartConfig(phaseType)

      // ใช้เฉพาะ API path /api-go/logs4g/graph/amp และส่ง phaseType ไปด้วย
      axios
        .get(`/api-go/logs4g/graph/amp?imei=${imei}&phase_type=${phaseType || 1}`)
        .then(response => {
          this.resetAmp()

          if (phaseType === 1 || !phaseType) {
            // กรณี 1 เฟส
            this.ampPhase1 = response.data
            this.ampPhase1.forEach(value => {
              this.optionAmp.xAxis[0].data.push(value.Period_Name)
              this.optionAmp.series[0].data.push(value.amp)
            })
          } else {
            // กรณี 3 เฟส
            // สมมติว่า API จะส่งข้อมูลมาในรูปแบบที่มี amp1, amp2, amp3
            this.ampPhase1 = response.data
            this.ampPhase1.forEach(value => {
              this.optionAmp.xAxis[0].data.push(value.Period_Name)
              this.optionAmp.series[0].data.push(value.amp1 || value.amp)
              if (this.optionAmp.series[1] && value.amp2) {
                this.optionAmp.series[1].data.push(value.amp2)
              }
              if (this.optionAmp.series[2] && value.amp3) {
                this.optionAmp.series[2].data.push(value.amp3)
              }
            })
          }
        })
        .catch(error => {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูลกราฟกระแสไฟฟ้า:', error)
        })
    },
    // ฟังก์ชันสำหรับปรับการแสดงผลกราฟ Volt ตามประเภทเฟส
    updateVoltChartConfig(phaseType) {
      // กำหนดค่าเริ่มต้นสำหรับ series ของกราฟ
      if (phaseType === 1 || !phaseType) {
        // กรณี 1 เฟส - มี series เดียว
        this.optionVolt.series = [
          {
            name: 'Volt',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: [],
            color: '#00D8FF',
          },
        ]
      } else {
        // กรณี 3 เฟส - มี 3 series
        this.optionVolt.series = [
          {
            name: 'Phase 1',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: [],
            color: '#00D8FF',
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
        ]
      }
    },

    // ฟังก์ชันสำหรับปรับการแสดงผลกราฟ Amp ตามประเภทเฟส
    updateAmpChartConfig(phaseType) {
      // กำหนดค่าเริ่มต้นสำหรับ series ของกราฟ
      if (phaseType === 1 || !phaseType) {
        // กรณี 1 เฟส - มี series เดียว
        this.optionAmp.series = [
          {
            name: 'Amp',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: [],
            color: '#FF6100',
          },
        ]
      } else {
        // กรณี 3 เฟส - มี 3 series
        this.optionAmp.series = [
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
        ]
      }
    },

    resetVolt() {
      this.voltPhase1.splice(0)
      this.voltPhase2.splice(0)
      this.voltPhase3.splice(0)
      this.optionVolt.xAxis[0].data.splice(0)

      // ล้างข้อมูลทุก series
      this.optionVolt.series.forEach(series => {
        series.data.splice(0)
      })
    },
    resetAmp() {
      this.ampPhase1.splice(0)
      this.ampPhase2.splice(0)
      this.ampPhase3.splice(0)
      this.optionAmp.xAxis[0].data.splice(0)

      // ล้างข้อมูลทุก series
      this.optionAmp.series.forEach(series => {
        series.data.splice(0)
      })
    },
  },
}
</script>

<style lang="scss">
  .text1 {
    position: absolute;
    font-family: Arial;
    top: 20px;
    right: 20px;
    color: white;
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
    // margin-top: 50px;
  }
}

/* Extra small devices */
@media (max-width: 375px) {
  .chart-text, .info-text {
    font-size: 14px;
  }
}
  </style>
