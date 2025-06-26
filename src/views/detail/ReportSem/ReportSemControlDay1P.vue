<template>
  <div>
    <b-row>
      <b-col lg="12">
        <template>
          <b-card-code>
            <div>
              <b-link
                style="font-size: 26px; color: #fff;"
                :to="`/diagram?wid=${this.$route.query.wid}&imei=${this.$route.query.imei}`"
              >
                <feather-icon
                  style="margin-bottom: 5px;"
                  size="34"
                  icon="ArrowLeftIcon"
                /> <span style="font-size:20px; color: #ffffff;">กราฟแสดงค่าการทำงานของตู้ควบคุม 1 เฟส (Volt / Amp)</span>
              </b-link>
              <b-row>
                <b-col
                  lg="6"
                  md="12"
                  sm="12"
                  class="mb-3"
                >
                  <b-card
                    class="graph-card"
                    header-bg-variant="primary"
                    header-text-variant="white"
                    header-class="text-center py-2"
                  >
                    <template #header>
                      <h5 class="mb-0">
                        แรงดันไฟฟ้าภายในตู้ควบคุม 1 เฟส (Volt)
                      </h5>
                    </template>
                    <div class="chart-container">
                      <app-echart-line
                        :option-data="optionVolt"
                        style="width: 100%; height: 350px;"
                      />
                    </div>
                  </b-card>
                </b-col>
                <b-col
                  lg="6"
                  md="12"
                  sm="12"
                  class="mb-3"
                >
                  <b-card
                    class="graph-card"
                    header-bg-variant="info"
                    header-text-variant="white"
                    header-class="text-center py-2"
                  >
                    <template #header>
                      <h5 class="mb-0">
                        กระแสไฟฟ้าภายในตู้ควบคุม 1 เฟส (Amp)
                      </h5>
                    </template>
                    <div class="chart-container">
                      <app-echart-line
                        :option-data="option"
                        style="width: 100%; height: 350px;"
                      />
                    </div>
                  </b-card>
                </b-col>
              </b-row>
            </div>
          </b-card-code>
        </template>
      </b-col>
      <b-col lg="12">
        <template>
          <b-card-code>
            <b-row>
              <b-col
                md="3"
                class="d-flex align-items-center justify-content-center"
              >
                <label style="padding-right:14px; font-size: 15px">เลือกวันที่</label>
                <b-form-group>
                  <flat-pickr
                    v-model="date.selectedDate"
                    class="form-control"
                    @input="fetchReportData"
                  />
                </b-form-group>
              </b-col>
              <b-col
                md="4"
                class="text-sm-right mb-1"
              />
              <b-col
                md="4"
                class="d-flex align-items-center justify-content-start mb-1"
              >
                <label>ค้นหา</label>
                <b-input-group
                  size="sm"
                  style="padding-left:14px;"
                >
                  <b-form-input
                    id="filterInput"
                    v-model="filter"
                    type="search"
                    placeholder="Type to Search"
                    label-cols-sm="12"
                    label-cols-md="2"
                    label-cols-lg="2"
                  />
                  <b-input-group-append>
                    <b-button
                      :disabled="!filter"
                      @click="filter = ''"
                    >
                      ล้าง
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-col>
              <b-col
                md="1"
                class="text-sm-right mb-1"
              >
                <!-- <b-button
                  id="toggle-btn"
                  size="sm"
                  variant="warning"
                  @click="$refs.childref.getHistory(date)"
                >Report <feather-icon
                  class="text-light"
                  icon="ArrowDownIcon"
                  size="18"
                />
                </b-button> -->
                <b-button
                  id="toggle-btn"
                  v-b-modal="'modalReport'"
                  size="sm"
                  variant="primary"
                >
                  Export PDF
                </b-button>
              </b-col>
              <b-col cols="12">
                <b-table
                  id="table"
                  responsive
                  :per-page="perPage"
                  :current-page="currentPage"
                  :items="items"
                  :fields="fields"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  :sort-direction="sortDirection"
                  :filter="filter"
                  :filter-included-fields="filterOn"
                  sticky-header
                  head-variant="dark"
                  @filtered="onFiltered"
                >
                  <!-- No thead-top template to avoid duplication -->
                </b-table>
              </b-col>

              <b-col
                cols="12"
              >
                <b-card-body class="d-flex justify-content-between flex-wrap pt-1">

                  <!-- page length -->
                  <b-form-group
                    label="Per Page"
                    label-cols="6"
                    label-align="left"
                    label-size="sm"
                    label-for="sortBySelect"
                    class="text-nowrap mb-md-0 mr-1"
                  >
                    <b-form-select
                      id="perPageSelect"
                      v-model="perPage"
                      size="sm"
                      inline
                      :options="pageOptions"
                    />
                  </b-form-group>

                  <!-- pagination -->
                  <div>
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="totalRows"
                      :per-page="perPage"
                      first-number
                      last-number
                      prev-class="prev-item"
                      next-class="next-item"
                      class="mb-0"
                    >
                      <template #prev-text>
                        <feather-icon
                          icon="ChevronLeftIcon"
                          size="18"
                        />
                      </template>
                      <template #next-text>
                        <feather-icon
                          icon="ChevronRightIcon"
                          size="18"
                        />
                      </template>
                    </b-pagination>
                  </div>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card-code>
        </template>
      </b-col>
    </b-row>
    <ExportSemControlDay
      ref="childref"
      style="font-size: 20px;"
      :date="date"
    />
  </div>
</template>

<script>
/* eslint-disable global-require */
import {
  BRow, BCol, BTable, BFormGroup,
  BFormSelect, BPagination, BCardBody, BLink,
  BButton, BInputGroupAppend, BInputGroup, BFormInput, VBModal,
  BCard,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import Ripple from 'vue-ripple-directive'
// import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'
import 'leaflet/dist/leaflet.css'
import axios from '@axios'
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import AppEchartLine from './AppEchartLine.vue'
import ExportSemControlDay from './ExportSemControlDay.vue'

export default {
  components: {
    BRow,
    BCol,
    BTable,
    BFormGroup,
    BFormSelect,
    BPagination,
    BCardBody,
    BButton,
    BLink,
    BInputGroupAppend,
    BInputGroup,
    BFormInput,
    BCardCode,
    flatPickr,
    ExportSemControlDay,
    AppEchartLine,
    BCard,
    // StatisticCardHorizontal,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      revenueGenerated: {},
      items: [],
      date: {
        wid: this.$route.query.wid,
        selectedDate: '',
      },
      fields: [
        {
          key: 'date_time', label: 'ช่วงเวลา', sortable: true, class: 'text-center',
        },
        {
          key: 'volt',
          label: 'แรงดันไฟฟ้า (Volt)',
          sortable: true,
          class: 'text-center',
          thStyle: { background: 'rgb(255, 177, 0,0.7)' },
          tdClass: 'bg-light-warning',
          formatter: value => (value === 0 ? '0' : Math.round(value)),
        },
        {
          key: 'amp',
          label: 'กระแสไฟฟ้า (Amp)',
          sortable: true,
          class: 'text-center',
          thStyle: { background: 'rgb(0, 188, 255, 0.7)' },
          tdClass: 'bg-light-info',
          formatter: value => (value === 0 ? '0' : parseFloat(value).toFixed(1)),
        },
        // {
        //   key: 'kwh', label: 'KWH', sortable: true, class: 'text-center', thStyle: { background: 'rgb(255, 177, 0,0.7)' }, tdClass: 'bg-light-warning',
        // },
        // {
        //   key: 'pf', label: 'PF', sortable: true, class: 'text-center', thStyle: { background: 'rgb(255, 177, 0,0.7)' }, tdClass: 'bg-light-warning',
        // },
        // {
        //   key: 'hz', label: 'HZ', sortable: true, class: 'text-center', thStyle: { background: 'rgb(255, 177, 0,0.7)' }, tdClass: 'bg-light-warning',
        // },
      ],
      // --------history--------
      perPage: 25,
      pageOptions: [25, 50, 100],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      option: {
        title: {
          text: 'กระแสไฟฟ้าภายในตู้ควบคุม 1 เฟส (Amp)',
          left: 'center',
          top: 0,
          textStyle: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
          },
        },
        tooltip: {
          trigger: 'axis',
          formatter(params) {
            const value = parseFloat(params[0].value)
            const formattedValue = value === 0 ? '0' : value.toFixed(1)
            return `${params[0].name}: ${formattedValue} Amp`
          },
          backgroundColor: 'rgba(0,0,0,0.7)',
          borderColor: '#579BFE',
          borderWidth: 1,
          padding: [5, 10],
          textStyle: {
            color: '#fff',
          },
        },
        xAxisData: [],
        series: [
          {
            name: 'กระแสไฟฟ้า (Amp)',
            type: 'line',
            data: [],
            color: '#579BFE',
            smooth: true,
            symbolSize: 8,
            lineStyle: {
              width: 3,
            },
            label: {
              show: false, // Changed to false to prevent overlapping
            },
            areaStyle: {
              opacity: 0.1,
            },
          },
        ],
      },
      optionVolt: {
        title: {
          text: 'แรงดันไฟฟ้าภายในตู้ควบคุม 1 เฟส (Volt)',
          left: 'center',
          top: 0,
          textStyle: {
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
          },
        },
        tooltip: {
          trigger: 'axis',
          formatter(params) {
            const value = parseFloat(params[0].value)
            const formattedValue = value === 0 ? '0' : Math.round(value)
            return `${params[0].name}: ${formattedValue} V`
          },
          backgroundColor: 'rgba(0,0,0,0.7)',
          borderColor: '#FF6100',
          borderWidth: 1,
          padding: [5, 10],
          textStyle: {
            color: '#fff',
          },
        },
        xAxisData: [],
        series: [
          {
            name: 'แรงดันไฟฟ้า (Volt)',
            type: 'line',
            data: [],
            color: '#FF6100',
            smooth: true,
            symbolSize: 8,
            lineStyle: {
              width: 3,
            },
            label: {
              show: false, // Changed to false to prevent overlapping
            },
            areaStyle: {
              opacity: 0.1,
            },
          },
        ],
      },
      connect: [{
        Offline: 'non-connect', Online: 'connect',
      },
      {
        Offline: 'light-danger', Online: 'light-success',
      }],
      status: [{
        Offline: 'Offline', Online: 'Online', Trip: 'Trip',
      },
      {
        Offline: 'danger', Online: 'success', Trip: 'warning',
      }],
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    computedFields() {
      // If the user isn't an admin, filter out fields that require auth.
      if (this.userData.role === 'User') return this.fields.filter(field => !field.requiresAdmin)
      // If the user IS an admin, return all fields.
      return this.fields
    },
  },
  created() {
    setInterval(() => {
      this.fetchReportData()
    }, 2000)
  },
  mounted() {
    this.setToday()
    this.fetchReportData()
  },
  methods: {
    setToday() {
      // ตั้งค่าวันที่เป็นวันปัจจุบัน
      this.date.selectedDate = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    },
    // ฟังก์ชันรวมสำหรับดึงข้อมูลทั้งกราฟและตาราง
    fetchReportData() {
      // ใช้ imei จาก URL query parameters โดยตรง
      const { imei } = this.$route.query
      if (!imei) {
        console.error('ไม่พบข้อมูล imei ใน URL parameters')
        return
      }

      // สร้างวันที่ในรูปแบบที่ API ต้องการ (YYYY_MM_DD)
      const formattedDate = this.date.selectedDate.replace(/-/g, '_')

      // ใช้ Promise.all เพื่อเรียก API ทั้งสองพร้อมกัน
      Promise.all([
        axios.get(`/api-go/logs4g/graph/volt?imei=${imei}&date=${formattedDate}&phase_type=1`),
        axios.get(`/api-go/logs4g/graph/amp?imei=${imei}&date=${formattedDate}&phase_type=1`),
      ])
        .then(([voltResponse, ampResponse]) => {
          // ดึงข้อมูลจาก response
          const voltData = voltResponse.data
          const ampData = ampResponse.data

          // รวมข้อมูลสำหรับตาราง
          this.mergeDataForTable(voltData, ampData)

          // อัปเดตข้อมูลสำหรับกราฟ Volt
          this.updateVoltChart(voltData)

          // อัปเดตข้อมูลสำหรับกราฟ Amp
          this.updateAmpChart(ampData)
        })
        .catch(error => {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูลรายงาน:', error)
        })
    },
    // ฟังก์ชันรวมข้อมูลสำหรับตาราง
    mergeDataForTable(voltData, ampData) {
      // สร้าง Map เพื่อรวมข้อมูล โดยใช้ Period_Name เป็น key
      const dataMap = new Map()

      // เพิ่มข้อมูล Volt
      voltData.forEach(item => {
        // Handle null/NaN values for volt
        const voltValue = item.volt === null || Number.isNaN(item.volt) ? 0 : item.volt
        dataMap.set(item.Period_Name, { date_time: item.Period_Name, volt: voltValue })
      })

      // เพิ่มข้อมูล Amp
      ampData.forEach(item => {
        const existingData = dataMap.get(item.Period_Name) || { date_time: item.Period_Name }
        // Handle null/NaN values for amp
        existingData.amp = item.amp === null || Number.isNaN(item.amp) ? 0 : item.amp
        dataMap.set(item.Period_Name, existingData)
      })

      // แปลง Map เป็น Array
      this.items = Array.from(dataMap.values())
      this.totalRows = this.items.length
    },
    // อัปเดตข้อมูลกราฟ Volt
    updateVoltChart(voltData) {
      this.optionVolt.xAxisData.splice(0)
      this.optionVolt.series[0].data.splice(0)

      voltData.forEach(value => {
        this.optionVolt.xAxisData.push(value.Period_Name)
        // Handle null/NaN values for volt
        const voltValue = value.volt === null || Number.isNaN(value.volt) ? 0 : value.volt
        this.optionVolt.series[0].data.push(voltValue)
      })
    },
    // อัปเดตข้อมูลกราฟ Amp
    updateAmpChart(ampData) {
      this.option.xAxisData.splice(0)
      this.option.series[0].data.splice(0)

      ampData.forEach(value => {
        this.option.xAxisData.push(value.Period_Name)
        // Handle null/NaN values for amp
        const ampValue = value.amp === null || Number.isNaN(value.amp) ? 0 : value.amp
        this.option.series[0].data.push(ampValue)
      })
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>

<style scoped lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
@import '@core/scss/vue/libs/vue-select.scss';
@import url('https://fonts.googleapis.com/css2?family=Sarabun&display=swap');

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

// Graph styling
.graph-card {
  box-shadow: 0 4px 24px 0 rgba(34, 41, 47, 0.1);
  border-radius: 0.428rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px 0 rgba(34, 41, 47, 0.15);
  }
}

.chart-container {
  padding: 1rem;
  // background-color: #283046;
  border-radius: 0 0 0.428rem 0.428rem;
}

// Existing styles
.vue2leaflet-map{
  &.leaflet-container{
    height: 325px;
  }
}
.leaflet-popup-content {
  margin: 10px 10px;
}
.leaflet-container a.leaflet-popup-close-button {
  padding: 0 0 0 0
}
</style>
