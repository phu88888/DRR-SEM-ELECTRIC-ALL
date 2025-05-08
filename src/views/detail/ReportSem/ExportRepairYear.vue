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
                รายงานการแสดงการซ่อมอุปกรณ์ (รายปี)<br>
                ตั้งแต่ปี {{ date.yearFrom }}
              </span><br>

            </div>
          </b-col>
        </b-row>
        <br>
        <!-- <b-col lg="12">
          <template>
            <div>
              <span style="font-size:20px; color: #000000;">กราฟแสดงการซ่อมอุปกรณ์ (รายปี)</span>
              <app-echart-line
                :option-data="option"
                style="width: 100%"
              />
            </div>
          </template>
        </b-col> -->
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
            <template #cell(count_event)="data">
              {{ data.value }} ครั้ง
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
// import AppEchartLine from './AppEchartLine.vue'

export default {
  components: {
    BTable,
    BButton,
    BRow,
    BCol,
    // AppEchartLine,
    BCardCode,
  },
  data() {
    return {
      tableVariant: 'light',
      items: [],
      date: {
        wid: '',
        yearFrom: '',
        yearTo: '',
      },
      option: {
        xAxisData: [],
        series: [
          {
            name: 'เสาที่ 1',
            type: 'line',
            data: [],
            color: '#579BFE ',
          },
          {
            name: 'เสาที่ 2',
            type: 'line',
            data: [],
            color: '#DC48FF ',
          },
          {
            name: 'เสาที่ 3',
            type: 'line',
            data: [],
            color: '#8246FE ',
          },
          {
            name: 'เสาที่ 4',
            type: 'line',
            data: [],
            color: '#FE447A ',
          },
          {
            name: 'เสาที่ 5',
            type: 'line',
            data: [],
            color: '#4EAF51 ',
          },
          {
            name: 'เสาที่ 6',
            type: 'line',
            data: [],
            color: '#FF805D ',
          },
          {
            name: 'เสาที่ 7',
            type: 'line',
            data: [],
            color: '#FDFF01',
          },
          {
            name: 'เสาที่ 8',
            type: 'line',
            data: [],
            color: '#FDFF01',
          },
          {
            name: 'เสาที่ 9',
            type: 'line',
            data: [],
            color: '#FDFF01',
          },
        ],
      },
      fields: [
        {
          key: 'date_time', label: 'ปี', sortable: true, variant: 'light', tdClass: 'text-dark1', class: 'text-center',
        },
        {
          key: 'event', label: 'เหตุการณ์', sortable: true, variant: 'light', tdClass: 'text-dark1', class: 'text-center',
        },
        {
          key: 'count_event', label: 'จำนวน', sortable: true, variant: 'light', tdClass: 'text-dark1', class: 'text-center',
        },
      ],
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },
  mounted() {
  },
  methods: {
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
      this.date.yearFrom = `${year}-${month}-${date}`
      this.date.yearTo = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    },
    getHistory(date1) {
      this.date = date1
      axios
        .post('/reportProblem1Years-Electic', date1)
        .then(response => {
          this.items = response.data
          this.totalRows = response.data.length
        })
    },
    // getHistory(date) {
    //   axios
    //     .post('/reportYearsSEMControlPole', date)
    //     .then(response => {
    //       this.items = response.data
    //       this.totalRows = response.data.length
    //     })
    // },
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
