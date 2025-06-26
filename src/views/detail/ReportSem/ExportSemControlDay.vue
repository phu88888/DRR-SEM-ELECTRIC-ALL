<template>
  <div>
    <!-- Export PDF Modal -->
    <b-modal
      id="modalReport"
      title="Export PDF"
      size="xl"
      ok-only
      @shown="prepareReportData"
    >
      <b-card style="background-color:rgba(255,255,255, 0.9);">
        <b-row>
          <b-col
            md="12"
            class="d-flex align-items-center justify-content-end mb-1"
          >
            <b-button
              id="toggle-btn"
              size="sm"
              variant="warning"
              @click="generatePDF()"
            > Download <feather-icon
              class="text-light"
              icon="ArrowDownIcon"
              size="18"
            />
            </b-button>
          </b-col>
        </b-row>
        <div id="Report">
          <b-row>
            <b-col>
              <div style="text-align: center; padding-top: 15px">
                <span style="font-size: 20px; color: #000000">
                  รายงานการแสดงค่าการทำงานของตู้ควบคุม 1 เฟส (รายวัน)<br>
                  วันที่ {{ formatDateForReport(date.selectedDate) }}
                </span><br>
              </div>
            </b-col>
          </b-row>
          <br>
          <b-col lg="12">
            <div>
              <div style="text-align: center; margin-bottom: 20px;">
                <span style="font-size:18px; color: #000000; font-weight: bold;">กราฟแสดงแรงดันไฟฟ้า (Volt)</span>
              </div>
              <app-echart-line
                :option-data="reportOptionVolt"
                style="width: 100%; height: 400px;"
              />
            </div>
          </b-col>
          <br>
          <b-col lg="12">
            <div>
              <div style="text-align: center; margin-bottom: 20px;">
                <span style="font-size:18px; color: #000000; font-weight: bold;">กราฟแสดงกระแสไฟฟ้า (Amp)</span>
              </div>
              <app-echart-line
                :option-data="reportOptionAmp"
                style="width: 100%; height: 400px;"
              />
            </div>
          </b-col>
          <br>
          <div>
            <b-table
              style="font-size:16px;"
              :head-variant="'light'"
              :fields="reportFields"
              :items="items"
              :bordered="true"
              class="table-dark-text"
            >
              <!-- <template #thead-top>
                <tr>
                  <th
                    rowspan="2"
                    style="text-align:center; vertical-align: middle; background:rgb(0,0,0,0.1)"
                  >
                    ช่วงเวลา
                  </th>
                  <th style="text-align:center; background:rgb(255, 177, 0, 0.3)">
                    แรงดันไฟฟ้า (Volt)
                  </th>
                  <th style="text-align:center; background:rgb(0, 188, 255, 0.3)">
                    กระแสไฟฟ้า (Amp)
                  </th>
                </tr>
              </template> -->
            </b-table>
          </div>
        </div>
      </b-card>
    </b-modal>
  </div>
</template>

<script>
import {
  BRow, BCol, BTable, BCard,
  BButton, VBModal, BModal,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from '@axios'
import html2PDF from 'jspdf-html2canvas'
import AppEchartLine from './AppEchartLineModal.vue'

export default {
  components: {
    BRow,
    BCard,
    BCol,
    BTable,
    BButton,
    AppEchartLine,
    BModal,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      items: [],
      date: {
        wid: this.$route.query.wid,
        selectedDate: '',
      },
      // Report table fields
      reportFields: [
        {
          key: 'date_time',
          label: 'ช่วงเวลา',
          class: 'text-center',
          thStyle: { background: 'rgb(0,0,0,0.0)', color: '#000000', fontWeight: 'bold' },
        },
        {
          key: 'volt',
          label: 'แรงดันไฟฟ้า (Volt)',
          class: 'text-center',
          thStyle: { background: 'rgb(255, 177, 0, 0.0)', color: '#000000', fontWeight: 'bold' },
          formatter: value => (value === 0 ? '0' : Math.round(value)),
        },
        {
          key: 'amp',
          label: 'กระแสไฟฟ้า (Amp)',
          class: 'text-center',
          thStyle: { background: 'rgb(0, 188, 255, 0.0)', color: '#000000', fontWeight: 'bold' },
          formatter: value => (value === 0 ? '0' : parseFloat(value).toFixed(1)),
        },
      ],
      // Report chart options for PDF
      reportOptionVolt: {
        title: {
          text: '',
          left: 'center',
          top: 0,
        },
        tooltip: {
          trigger: 'axis',
          formatter(params) {
            const value = parseFloat(params[0].value)
            const formattedValue = value === 0 ? '0' : Math.round(value)
            return `${params[0].name}: ${formattedValue} V`
          },
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            fontSize: 12,
            color: '#000',
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            fontSize: 12,
            color: '#000',
          },
        },
        series: [
          {
            name: 'แรงดันไฟฟ้า (Volt)',
            type: 'line',
            data: [],
            color: '#FF6100',
            smooth: true,
            symbolSize: 6,
            lineStyle: {
              width: 2,
            },
            label: {
              show: true,
            },
          },
        ],
      },
      reportOptionAmp: {
        title: {
          text: '',
          left: 'center',
          top: 0,
        },
        tooltip: {
          trigger: 'axis',
          formatter(params) {
            const value = parseFloat(params[0].value)
            const formattedValue = value === 0 ? '0' : value.toFixed(1)
            return `${params[0].name}: ${formattedValue} Amp`
          },
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            fontSize: 12,
            color: '#000',
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            fontSize: 12,
            color: '#000',
          },
        },
        series: [
          {
            name: 'กระแสไฟฟ้า (Amp)',
            type: 'line',
            data: [],
            color: '#579BFE',
            smooth: true,
            symbolSize: 6,
            lineStyle: {
              width: 2,
            },
            label: {
              show: true,
            },
          },
        ],
      },
    }
  },
  mounted() {
    this.setToday()
  },
  methods: {
    setToday() {
      this.date.selectedDate = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    },
    prepareReportData() {
      // Fetch data when modal is shown
      this.fetchReportData()
    },
    fetchReportData() {
      const { imei } = this.$route.query
      if (!imei) {
        console.error('ไม่พบข้อมูล imei ใน URL parameters')
        return
      }

      const formattedDate = this.date.selectedDate.replace(/-/g, '_')

      Promise.all([
        axios.get(`/api-go/logs4g/graph/volt?imei=${imei}&date=${formattedDate}&phase_type=1`),
        axios.get(`/api-go/logs4g/graph/amp?imei=${imei}&date=${formattedDate}&phase_type=1`),
      ])
        .then(([voltResponse, ampResponse]) => {
          const voltData = voltResponse.data
          const ampData = ampResponse.data

          this.mergeDataForTable(voltData, ampData)
          this.updateReportCharts(voltData, ampData)
        })
        .catch(error => {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูลรายงาน:', error)
        })
    },
    mergeDataForTable(voltData, ampData) {
      const dataMap = new Map()

      voltData.forEach(item => {
        const voltValue = item.volt === null || Number.isNaN(item.volt) ? 0 : item.volt
        dataMap.set(item.Period_Name, { date_time: item.Period_Name, volt: voltValue })
      })

      ampData.forEach(item => {
        const existingData = dataMap.get(item.Period_Name) || { date_time: item.Period_Name }
        existingData.amp = item.amp === null || Number.isNaN(item.amp) ? 0 : item.amp
        dataMap.set(item.Period_Name, existingData)
      })

      this.items = Array.from(dataMap.values())
    },
    updateReportCharts(voltData, ampData) {
      // Update volt chart
      this.reportOptionVolt.xAxis.data = []
      this.reportOptionVolt.series[0].data = []

      voltData.forEach(value => {
        this.reportOptionVolt.xAxis.data.push(value.Period_Name)
        const voltValue = value.volt === null || Number.isNaN(value.volt) ? 0 : value.volt
        this.reportOptionVolt.series[0].data.push(voltValue)
      })

      // Update amp chart
      this.reportOptionAmp.xAxis.data = []
      this.reportOptionAmp.series[0].data = []

      ampData.forEach(value => {
        this.reportOptionAmp.xAxis.data.push(value.Period_Name)
        const ampValue = value.amp === null || Number.isNaN(value.amp) ? 0 : value.amp
        this.reportOptionAmp.series[0].data.push(ampValue)
      })
    },
    formatDateForReport(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear()
      return `${day}/${month}/${year}`
    },
    generatePDF() {
      const page = document.getElementById('Report')
      const date = new Date().toJSON().slice(0, 10).replace(/-/g, '-')

      html2PDF(page, {
        jsPDF: {
          format: 'a4',
        },
        backgroundColor: '#ffffff',
        margin: {
          top: 5,
          right: 5,
          bottom: 5,
          left: 5,
        },
        imageType: 'image/jpeg',
        output: `Report_1Phase_${date}.pdf`,
      })
    },
  },
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Sarabun&display=swap');

html, body {
  font-family: 'Sarabun', sans-serif;
}

.table th{
  border: 1px solid #000000;
  text-align: left;
  padding: 8px;
}
.table td{
  border: 1px solid #000000;
  text-align: left;
  padding: 8px;
}

// Report specific styles
#Report {
  .table {
    font-size: 14px !important;

    th, td {
      border: 1px solid #000000 !important;
      padding: 8px !important;
      text-align: center !important;
    }

    th {
      background-color: rgba(0,0,0,0.1) !important;
      font-weight: bold !important;
    }
  }
}

.table-dark-text {
  th, td {
    color: #000000 !important;
  }
}

::v-deep .table th,
::v-deep .table td {
  color: #000000 !important;
}

// Button styling
#toggle-btn {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

#toggle-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

// Modal content styling
.modal-xl .modal-dialog {
  max-width: 95%;
}
</style>
