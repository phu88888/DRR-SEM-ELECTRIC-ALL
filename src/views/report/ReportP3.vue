<template>
  <div>
    <b-row>
      <b-col>
        <b-card
          style="background: #fff; width: 100%; border-radius: 10px"
        >
          <b-row>
            <b-col
              class="d-flex align-items-center justify-content-center mb-1"
              lg="12"
            >
              <b-img
                style="opacity: 1.6;"
                src="@/assets/images/icons/logo_new.png"
                width="800px"
                height="506px"
                fluid
              />
            </b-col>
            <b-col
              class="d-flex align-items-center justify-content-center mb-1"
              lg="12"
            >
              <span style="color: #000; font-size:20px; font-weight: bold">รายงานข้อมูลสถิติทางวิศวกรรมจราจรและระบบขนส่ง</span>
              <br>
              <br>
              <br>
              <br>
              <br>
            </b-col>
            <b-col
              lg="12"
              class="mx-auto"
            >
              <b-row class="justify-content-center">
                <b-col cols="6">
                  <BarChartReport />
                </b-col>
                <b-col cols="6">
                  <BarChartReportPCU />
                  <br>
                  <br>
                </b-col>

                <b-col cols="6">
                  <PieChartReport />
                </b-col>
                <b-col cols="6">
                  <LineChartReport />
                </b-col>
              </b-row>
            </b-col>
            <hr
              class="page-break"
              style="width: 100%; margin: 10px auto; border: none;"
            >
            <br>
            <br>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol, BImg, BCard,
} from 'bootstrap-vue'
import axios from '@axios'
import BarChartReport from './BarChartReport.vue'
import BarChartReportPCU from './BarChartReportPCU.vue'
import PieChartReport from './PieChartReport.vue'
import LineChartReport from './LineChartReport.vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BImg,

    BarChartReport,
    BarChartReportPCU,
    PieChartReport,
    LineChartReport,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      fields: [
        {
          key: 'date_time',
          label: 'วันที่',
          class: 'text-center',
          thStyle: { background: '#fff', display: 'none' },
        },
        {
          key: 'bike',
          label: 'มอเตอร์ไซค์',
          class: 'text-center',
          thStyle: { background: '#fff', display: 'none' },
        },
        {
          key: 'car',
          label: 'รถยนต์',
          class: 'text-center',
          thStyle: { background: '#fff', display: 'none' },
        },
        {
          key: 'pickup',
          label: 'รถกระบะ',
          class: 'text-center',
          thStyle: { background: '#fff', display: 'none' },
        },
        {
          key: 'taxi',
          label: 'รถแท็กซี่',
          class: 'text-center',
          thStyle: { background: '#fff', display: 'none' },
        },
        {
          key: 'bus',
          label: 'รถบัส',
          class: 'text-center',
          thStyle: { background: '#fff', display: 'none' },
        },
        {
          key: 'truck',
          label: 'รถบรรทุก',
          class: 'text-center',
          thStyle: { background: '#fff', display: 'none' },
        },
        {
          key: 'trailer',
          label: 'รถพ่วง',
          class: 'text-center',
          thStyle: { background: '#fff', display: 'none' },
        },
        {
          key: 'speed_max',
          label: 'รวมสัดส่วนยานพาหนะ',
          class: 'text-center',
          thStyle: { background: '#fff', display: 'none' },
        },
        {
          key: 'speed_avg',
          label: 'ความเร็วเฉลี่ย (km/h.)',
          class: 'text-center',
          thStyle: { background: '#fff', display: 'none' },
        },
        // {
        //   key: 'id',
        //   label: 'สถานะ',
        //   class: 'text-center hidden',
        // },
      ],
      fieldsPCU: [
        {
          key: 'date_time',
          label: 'วันที่',
          class: 'text-center',
          thStyle: { background: '#fff', display: 'none' },
        },
        {
          key: 'bike_pcu',
          label: 'มอเตอร์ไซค์',
          class: 'text-center',
          thStyle: { background: '#fff', display: 'none' },
        },
        {
          key: 'car_pcu',
          label: 'รถยนต์',
          class: 'text-center',
          thStyle: { background: '#fff', display: 'none' },
        },
        {
          key: 'pickup_pcu',
          label: 'รถกระบะ',
          class: 'text-center',
          thStyle: { background: '#fff', display: 'none' },
        },
        {
          key: 'taxi_pcu',
          label: 'รถแท็กซี่',
          class: 'text-center',
          thStyle: { background: '#fff', display: 'none' },
        },
        {
          key: 'bus_pcu',
          label: 'รถบัส',
          class: 'text-center',
          thStyle: { background: '#fff', display: 'none' },
        },
        {
          key: 'truck_pcu',
          label: 'รถบรรทุก',
          class: 'text-center',
          thStyle: { background: '#fff', display: 'none' },
        },
        {
          key: 'trailer_pcu',
          label: 'รถพ่วง',
          class: 'text-center',
          thStyle: { background: '#fff', display: 'none' },
        },
        {
          key: 'speed_max',
          label: 'รวมสัดส่วนยานพาหนะ',
          class: 'text-center',
          thStyle: { background: '#fff', display: 'none' },
        },
        {
          key: 'speed_avg',
          label: 'ความเร็วเฉลี่ย (km/h.)',
          class: 'text-center',
          thStyle: { background: '#fff', display: 'none' },
        },
        // {
        //   key: 'id',
        //   label: 'สถานะ',
        //   class: 'text-center hidden',
        // },
      ],
      items: [],
      items1: [],
      itemsPCU: [],
      location_id: '',
      dept_name: '',
      dept_group: '',
      road_code: '',
      road_name: '',
      amphoe: '',
      province: '',
      sta: '',
      distance_km: '',
      installation_point: '',
      latitude: '',
      longitude: '',
      pcu: '',
      note: '',
      map_picture: '',
      cam_picture: '',
      setup_picture: '',
      day_count: '',
      pcu_avg: '',
      vehicle_max: '',
      vehicle_class: '',
      AADT: '',
      percent_truck: '',
      speed_max: '',
      speed_avg: '',
      speed85th: '',
      lane_density: '',
      CLV: '',
      VKT: '',
      PHF: '',
      LOS: '',
      VC_Ratio: '',
      pcu_hour: '',
      MinDate: '',
      MaxDate: '',
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
  },
  mounted() {
    /* this.tableCountPCU()
    this.tableCount() */
    this.reportData()
  },
  methods: {
    reportData() {
      axios
        .post('/get-Data-Report-All', { location_id: this.$route.query.location_id })
        .then(response => {
          this.location_id = response.data[0].location_id
          this.dept_name = response.data[0].dept_name
          this.dept_group = response.data[0].dept_group
          this.road_code = response.data[0].road_code
          this.road_name = response.data[0].road_name
          this.amphoe = response.data[0].amphoe
          this.province = response.data[0].province
          this.sta = response.data[0].sta
          this.distance_km = response.data[0].distance_km
          this.installation_point = response.data[0].installation_point
          this.latitude = response.data[0].latitude
          this.longitude = response.data[0].longitude
          this.pcu = response.data[0].pcu
          this.note = response.data[0].note
          this.map_picture = response.data[0].map_picture
          this.cam_picture = response.data[0].cam_picture
          this.setup_picture = response.data[0].setup_picture
          this.day_count = response.data[0].day_count
          this.pcu_avg = response.data[0].pcu_avg
          this.vehicle_max = response.data[0].vehicle_max
          this.vehicle_class = response.data[0].vehicle_class
          this.AADT = response.data[0].AADT
          this.percent_truck = response.data[0].percent_truck
          this.speed_max = response.data[0].speed_max
          this.speed_avg = response.data[0].speed_avg
          this.speed85th = response.data[0].speed85th
          this.lane_density = response.data[0].lane_density
          this.CLV = response.data[0].CLV
          this.VKT = response.data[0].VKT
          this.PHF = response.data[0].PHF
          this.LOS = response.data[0].LOS
          this.VC_Ratio = response.data[0].VC_Ratio
          this.pcu_hour = response.data[0].traffic_flow_rate
          this.MinDate = response.data[0].MinDate
          this.MaxDate = response.data[0].MaxDate
        })
        .catch(error => {
          console.log(error)
        })
    },
    // tableCount() {
    //   axios
    //     .post('/get-Count-Daily-All', { location_id: this.$route.query.location_id })
    //     .then(response => {
    //       this.items = response.data
    //       this.totalRows = response.data.length
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },

    // tableCountPCU() {
    //   axios
    //     .post('/get-Count-Daily-PCU-All', { location_id: this.$route.query.location_id })
    //     .then(response => {
    //       this.itemsPCU = response.data
    //       this.totalRows = response.data.length
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;700&display=swap');

/* .fade {
  opacity: 1;
} */

.custom-table .table, .custom-table .table th, .custom-table .table td {
  background-color: white; /* Ensuring white background */
  border: 1px solid black; /* Black borders */
  font-size: 12px;
  /* overflow: hidden; */
  text-overflow: ellipsis;
  white-space: nowrap;
}

.custom-table .table th,
.custom-table .table td {
  border-color: black; /* Black cell borders */
  color: black !important; /* Forcefully ensuring text in cells is black */
}

.pdf-content span, .pdf-content div {
  font-family: 'Sarabun', sans-serif; /* Example to set font for general text */
  font-size: 14px; /* Larger text size for content */
}

/* Print-specific styles */
@media print {
  .page-break {
    page-break-after: always;
  }

  /* Force content to be centered when printed */
  .justify-content-center {
    justify-content: center !important;
  }

  /* Adjust chart container width for better print layout */
  .mx-auto {
    margin-left: auto !important;
    margin-right: 150mm !important;
  }

  /* Make sure container is wide enough but not full width */
  .b-card {
    width: 90% !important;
    margin: 0 auto !important;
  }
}
</style>
