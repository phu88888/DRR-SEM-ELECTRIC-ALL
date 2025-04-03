<template>
  <div>
    <b-row>
      <b-col>
        <b-card
          style="background: #fff; width: 100%; border-radius: 10px"
        >
          <b-row>
            <b-col
              class="d-flex align-items-center justify-content-center"
              lg="12"
              style="margin-bottom: 0; padding-bottom: 0;"
            >
              <b-img
                style="opacity: 1.6;"
                src="@/assets/images/icons/logo_new.png"
                width="800px"
                height="400px"
                fluid
              />
            </b-col>

            <b-col
              cols="12"
              style="margin-top: 30px; padding-top: 0;"
            >
              <div>
                <ReportStatisticCount style="width: 80%; margin-left: 10%; margin-bottom: 0; padding-bottom: 0;" />
              </div>
            </b-col>

            <b-col
              cols="12"
              class="d-flex justify-content-center"
              style="margin-top: 0; padding-top: 0;"
            >
              <b-table-simple
                class="custom-table"
                responsive
                style="width: 70%; margin: 0 auto; padding: 10px;"
              >
                <tr>
                  <th
                    class="text-left"
                    style="background: rgb(0, 143, 255, 0.3); font-size: 18px;"
                  >
                    ประเภทยานพาหนะ (PMMS)
                  </th>
                  <th
                    class="text-right"
                    style="background: rgb(0, 143, 255, 0.3); font-size: 18px;"
                  >
                    AADT คันต่อวัน
                  </th>
                </tr>
                <tbody>
                  <!-- Motorcycle Row -->
                  <tr>
                    <th class="text-left">
                      มอเตอร์ไซค์ (MC)
                    </th>
                    <th
                      v-for="(item, index) in itemsPCU"
                      :key="index"
                      class="text-right font-weight-bold"
                    >
                      {{ item.AADT_MC.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                    </th>
                  </tr>
                  <!-- Car Row -->
                  <tr>
                    <th class="text-left">
                      รถยนต์นั่ง (SV)
                    </th>
                    <th
                      v-for="(item, index) in itemsPCU"
                      :key="index"
                      class="text-right font-weight-bold"
                    >
                      {{ item.AADT_SV.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                    </th>
                  </tr>
                  <!-- Pickup Row -->
                  <tr>
                    <th class="text-left">
                      รถยนต์นั่งพ่วง (SVT)
                    </th>
                    <th
                      v-for="(item, index) in itemsPCU"
                      :key="index"
                      class="text-right font-weight-bold"
                    >
                      {{ item.AADT_SVT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                    </th>
                  </tr>
                  <!-- Taxi Row -->
                  <tr>
                    <th class="text-left">
                      รถโดยสารขนาดกลาง (TB2)
                    </th>
                    <th
                      v-for="(item, index) in itemsPCU"
                      :key="index"
                      class="text-right font-weight-bold"
                    >
                      {{ item.AADT_TB2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                    </th>
                  </tr>
                  <!-- Bus Row -->
                  <tr>
                    <th class="text-left">
                      รถโดยสารขนาดใหญ่ (TB3)
                    </th>
                    <th
                      v-for="(item, index) in itemsPCU"
                      :key="index"
                      class="text-right font-weight-bold"
                    >
                      {{ item.AADT_TB3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                    </th>
                  </tr>
                  <!-- Truck Row -->
                  <tr>
                    <th class="text-left">
                      รถบรรทุก 10 ล้อ (T4)
                    </th>
                    <th
                      v-for="(item, index) in itemsPCU"
                      :key="index"
                      class="text-right font-weight-bold"
                    >
                      {{ item.T4.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                    </th>
                  </tr>
                  <!-- Trailer Rows -->
                  <tr>
                    <th class="text-left">
                      รถบรรทุกพ่วง (ART3)
                    </th>
                    <th
                      v-for="(item, index) in itemsPCU"
                      :key="index"
                      class="text-right font-weight-bold"
                    >
                      {{ item.ART3.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                    </th>
                  </tr>
                  <tr>
                    <th class="text-left">
                      รถบรรทุกพ่วง (ART4)
                    </th>
                    <th
                      v-for="(item, index) in itemsPCU"
                      :key="index"
                      class="text-right font-weight-bold"
                    >
                      {{ item.ART4.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                    </th>
                  </tr>
                  <tr>
                    <th class="text-left">
                      รถบรรทุกพ่วง (ART5)
                    </th>
                    <th
                      v-for="(item, index) in itemsPCU"
                      :key="index"
                      class="text-right font-weight-bold"
                    >
                      {{ item.ART5.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                    </th>
                  </tr>
                  <tr>
                    <th class="text-left">
                      รถบรรทุกพ่วง (ART6)
                    </th>
                    <th
                      v-for="(item, index) in itemsPCU"
                      :key="index"
                      class="text-right font-weight-bold"
                    >
                      {{ item.ART6.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                    </th>
                  </tr>
                  <tr>
                    <th class="text-left">
                      รถบรรทุกพ่วง (BD)
                    </th>
                    <th
                      v-for="(item, index) in itemsPCU"
                      :key="index"
                      class="text-right font-weight-bold"
                    >
                      {{ item.BD.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                    </th>
                  </tr>
                  <tr>
                    <th class="text-left">
                      รถบรรทุกพ่วง (DRT)
                    </th>
                    <th
                      v-for="(item, index) in itemsPCU"
                      :key="index"
                      class="text-right font-weight-bold"
                    >
                      {{ item.DRT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                    </th>
                  </tr>
                  <!-- Total Row -->
                  <tr>
                    <th
                      class="text-left"
                      style="background: rgb(0, 143, 255, 0.3); font-size: 18px;"
                    >
                      เฉลี่ย
                    </th>
                    <th
                      v-for="(item, index) in itemsPCU"
                      :key="index"
                      class="text-right"
                      style="background: rgb(0, 143, 255, 0.3); font-size: 18px;"
                    >
                      {{ item.aadt_sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                    </th>
                  </tr>
                </tbody>
              </b-table-simple>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol, BImg, BCard, BTableSimple,
} from 'bootstrap-vue'
import axios from '@axios'
import ReportStatisticCount from './ReportStatisticCount2.vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BImg,
    BTableSimple,
    ReportStatisticCount,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
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
      day_count: '',
      pcu_avg: '',
      vehicle_max: '',
      vehicle_class: '',
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
    this.tableCountPCU()
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
          this.day_count = response.data[0].day_count
          this.pcu_avg = response.data[0].pcu_avg
          this.vehicle_max = response.data[0].vehicle_max
          this.vehicle_class = response.data[0].vehicle_class
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

    tableCountPCU() {
      axios
        .post('/get-PMMS-Report-All', { location_id: this.$route.query.location_id })
        .then(response => {
          this.itemsPCU = response.data
          this.totalRows = response.data.length
        })
        .catch(error => {
          console.log(error)
        })
    },
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
  font-size: 16px;
  /* overflow: hidden; */
  text-overflow: ellipsis;
  white-space: nowrap;
}

.custom-table .table th,
.custom-table .table td {
  border-color: black; /* Black cell borders */
  color: black !important; /* Forcefully ensuring text in cells is black */
  padding: 8px; /* เพิ่มระยะห่างภายในเซลล์ */
}

.custom-table .table tr {
  height: 40px; /* เพิ่มความสูงของแถว */
}

.pdf-content span, .pdf-content div {
  font-family: 'Sarabun', sans-serif; /* Example to set font for general text */
  font-size: 14px; /* Larger text size for content */
}

@media print {
  body {
    font-size: 12px;
    background-color: white !important;
    color: black !important;
  }

  @page {
    size: A4;
    margin: 1cm;
  }

  .custom-table .table, .custom-table .table th, .custom-table .table td {
    font-size: 14px;
    border: 1px solid black !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .custom-table .table th {
    background-color: rgb(0, 143, 255, 0.3) !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .b-card {
    break-inside: avoid;
    page-break-inside: avoid;
    border: none !important;
    box-shadow: none !important;
  }

  .b-table-simple {
    width: 100% !important;
  }

  /* ป้องกันการแบ่งตารางระหว่างหน้า */
  table {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
</style>
