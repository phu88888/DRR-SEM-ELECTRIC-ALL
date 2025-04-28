<template>
  <b-modal
    id="modalReport"
    title="Export PDF"
    size="xl"
    ok-only
  >
    <b-card-code style="background-color:rgba(255,255,255, 0.9);">
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
                รายงานการแสดงค่าการทำงานของตู้ควบคุม (รายเดือน)<br>
                ตั้งแต่วันที่ {{ date.dateFrom }} ถึง {{ date.dateTo }}
              </span><br>

            </div>
          </b-col>
        </b-row>
        <br>
        <b-col lg="12">
          <template>
            <div>
              <span style="font-size:20px; color: #000000;">กราฟแสดงค่าการทำงานของตู้ควบคุม (Amp รายเดือน)</span>
              <app-echart-line
                :option-data="option"
                style="width: 100%; margin-left: 50px"
              />
            </div>
          </template>
        </b-col>
        <br>
        <div>
          <b-table
            style="font-size:18px;"
            :head-variant="tableVariant"
            :fields="fields"
            :items="items"
            :fixed="fixed"
            :bordered="bordered"
          >
            <template
              slot="thead-top"
            >
              <th
                colspan="1"
                style="text-align:center;font-size: 14px"
              />
            </template>
            <template
              slot="thead-top"
            >
              <th
                colspan="3"
                style="text-align:center;font-size: 14px; background:rgb(0,0,0,0.1)"
              >แรงดันไฟฟ้า (Volt)</th>
            </template>
            <template
              slot="thead-top"
            >
              <th
                colspan="3"
                style="text-align:center;font-size: 14px; background:rgb(0,0,0,0.3)"
              >กระแสไฟฟ้า (Amp)</th>
            </template>
          </b-table>
        </div>
      </div>
    </b-card-code></b-modal>
</template>
<script>
import {
  BTable, BButton, BRow, BCol,
} from 'bootstrap-vue'
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import html2PDF from 'jspdf-html2canvas'
import axios from '@axios'
import AppEchartLine from './AppEchartLine.vue'

export default {
  components: {
    BTable,
    BButton,
    BRow,
    BCol,
    AppEchartLine,
    BCardCode,
  },
  data() {
    return {
      tableVariant: 'light',
      items: [],
      date: {
        wid: '',
        dateFrom: '',
        dateTo: '',
      },
      option: {
        xAxisData: [],
        series: [
          {
            name: 'Amp',
            type: 'line',
            data: [],
            color: '#579BFE ',
            label: {
              show: true,
              fontSize: '14',
              formatter: ' {a}: {c} ',
            },
          },
          {
            name: 'Phase2',
            type: 'line',
            data: [],
            color: '#00FF27 ',
            label: {
              show: true,
              fontSize: '14',
              formatter: ' {a}: {c} ',
            },
          },
          {
            name: 'Phase3',
            type: 'line',
            data: [],
            color: '#FF6100 ',
            label: {
              show: true,
              fontSize: '14',
              formatter: ' {a}: {c} ',
            },
          },
        ],
      },
      fields: [
        {
          key: 'MonthThai', label: 'เดือน', sortable: true, variant: 'light', tdClass: 'text-dark1', class: 'text-center',
        },
        {
          key: 'volt', label: 'Phase1', sortable: true, variant: 'light', tdClass: 'text-dark1', class: 'text-center', thStyle: { background: 'rgb(0,0,0,0.1)' },
        },
        {
          key: 'volt2', label: 'Phase2', sortable: true, variant: 'light', tdClass: 'text-dark1', class: 'text-center', thStyle: { background: 'rgb(0,0,0,0.1)' },
        },
        {
          key: 'volt3', label: 'Phase3', sortable: true, variant: 'light', tdClass: 'text-dark1', class: 'text-center', thStyle: { background: 'rgb(0,0,0,0.1)' },
        },
        {
          key: 'amp', label: 'Phase1', sortable: true, variant: 'light', tdClass: 'text-dark1', class: 'text-center', thStyle: { background: 'rgb(0,0,0,0.3)' },
        },
        {
          key: 'amp2', label: 'Phase2', sortable: true, variant: 'light', tdClass: 'text-dark1', class: 'text-center', thStyle: { background: 'rgb(0,0,0,0.3)' },
        },
        {
          key: 'amp3', label: 'Phase3', sortable: true, variant: 'light', tdClass: 'text-dark1', class: 'text-center', thStyle: { background: 'rgb(0,0,0,0.3)' },
        },
        // {
        //   key: 'kwh', label: 'KWH', sortable: true, variant: 'light', tdClass: 'text-dark1', class: 'text-center', thStyle: { background: 'rgb(0,0,0,0.3)' },
        // },
        // {
        //   key: 'pf', label: 'PF', sortable: true, variant: 'light', tdClass: 'text-dark1', class: 'text-center', thStyle: { background: 'rgb(0,0,0,0.3)' },
        // },
        // {
        //   key: 'hz', label: 'HZ', sortable: true, variant: 'light', tdClass: 'text-dark1', class: 'text-center', thStyle: { background: 'rgb(0,0,0,0.3)' },
        // },
      ],
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },
  mounted() {
    this.graphLine()
  },
  methods: {
    graphLine() {
      axios.post('/reportGraphSEMControl3PMonth', this.date)
        .then(response => {
          this.xAxisData = []
          this.xAxisData = response.data
          this.option.xAxisData.splice(0)
          this.option.series[0].data.splice(0)
          this.option.series[1].data.splice(0)
          this.option.series[2].data.splice(0)
          this.xAxisData.forEach(value => {
            this.option.xAxisData.push(value.MonthThai)
            this.option.series[0].data.push(value.amp)
            this.option.series[1].data.push(value.amp2)
            this.option.series[2].data.push(value.amp3)
          })
        })
        .catch(error => {
          console.log(error)
        })
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
        output: `Report ${date}.pdf`,
      })
    },
    setToday() {
      const p = new Date()
      const month = (`0${p.getMonth() + 1}`).slice(-2)
      const date = 1
      const year = p.getFullYear()
      this.date.dateFrom = `${year}-${month}-${date}`
      this.date.dateTo = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    },
    getHistory(date1) {
      this.date = date1
      axios
        .post('/reportSEMControl3PMonth', date1)
        .then(response => {
          this.items = response.data
          this.totalRows = response.data.length
          this.graphLine()
        })
    },
  },
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Sarabun&display=swap');
html, body {
  font-family: 'Sarabun', sans-serif;
  color: #000000;
}
</style>
