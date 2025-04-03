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
              <span style="color: #000; font-size:20px; font-weight: bold">รายงานวิเคราะห์ข้อมูลปริมาณจราจร (Passenger Car Unit : PCU)</span>
              <br>
              <br>
              <br>
              <br>
              <br>
            </b-col>

            <!-- ตาราง PCU -->
            <b-col cols="12">
              <b-table
                class="custom-table"
                responsive
                :items="itemsPCU"
                :fields="fieldsPCU"
                style="width: 100%; border-collapse: collapse; border-spacing: 0;"
              >
                <template
                  slot="thead-top"
                >
                  <tr>
                    <th
                      rowspan="2"
                      colspan="1"
                      style="text-align:center; vertical-align: middle; font-size: 14px; background:rgb(0,0,0, 0.0); color: #000;"
                    >
                      วันที่
                    </th>
                    <th
                      colspan="7"
                      style="text-align:center; font-size: 14px; background:rgb(0,0,0, 0.0); color: #000;"
                    >
                      สัดส่วนยานพาหนะแต่ละประเภท (PCU)
                    </th>
                    <th
                      rowspan="2"
                      colspan="1"
                      style="text-align:center; vertical-align: middle; font-size: 14px; background:rgb(0,0,0, 0.0); color: #000;"
                    >
                      รวมสัดส่วนยานพาหนะ
                    </th>
                    <th
                      rowspan="2"
                      colspan="1"
                      style="text-align:center; vertical-align: middle; font-size: 14px; background:rgb(0,0,0, 0.0); color: #000;"
                    >
                      ความเร็วเฉลี่ย (KM/H.)
                    </th>
                  </tr>
                  <!-- <tr>
                    <th
                      rowspan="1"
                      style="text-align:center; font-size: 14px; background:rgb(0,0,0, 0.0); color: #000;"
                    >
                      มอเตอร์ไซค์
                    </th>
                    <th
                      rowspan="1"
                      style="text-align:center; font-size: 14px; background:rgb(0,0,0, 0.0); color: #000;"
                    >
                      รถยนต์
                    </th>
                    <th
                      rowspan="1"
                      style="text-align:center; font-size: 14px; background:rgb(0,0,0, 0.0); color: #000;"
                    >
                      รถกระบะ
                    </th>
                    <th
                      rowspan="1"
                      style="text-align:center; font-size: 14px; background:rgb(0,0,0, 0.0); color: #000;"
                    >
                      รถแท็กซี่
                    </th>
                    <th
                      rowspan="1"
                      style="text-align:center; font-size: 14px; background:rgb(0,0,0, 0.0); color: #000;"
                    >
                      รถบัส
                    </th>
                    <th
                      rowspan="1"
                      style="text-align:center; font-size: 14px; background:rgb(0,0,0, 0.0); color: #000;"
                    >
                      รถบรรทุก
                    </th>
                    <th
                      rowspan="1"
                      style="text-align:center; font-size: 14px; background:rgb(0,0,0, 0.0); color: #000;"
                    >
                      รถพ่วง
                    </th>
                  </tr> -->
                </template>
                <template #cell(bike_pcu)="data">
                  {{ data.item.bike_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </template>
                <template #cell(car_pcu)="data">
                  {{ data.item.car_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </template>
                <template #cell(truck_pcu)="data">
                  {{ data.item.truck_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </template>
                <template #cell(bus_pcu)="data">
                  {{ data.item.bus_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </template>
                <template #cell(taxi_pcu)="data">
                  {{ data.item.taxi_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </template>
                <template #cell(pickup_pcu)="data">
                  {{ data.item.pickup_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </template>
                <template #cell(trailer_pcu)="data">
                  {{ data.item.trailer_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </template>
                <template #cell(total_pcu)="data">
                  {{ data.item.total_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </template>
              </b-table>
            </b-col>
            <b-col cols="12">
              <div style="margin-bottom: 100px;" />
            </b-col>
            <b-col cols="12">
              <b-table
                class="custom-table"
                style="width: 100%; border-collapse: collapse; border-spacing: 0; margin-top: 20px;"
                responsive
                :items="items"
                :fields="fields"
              >
                <template
                  slot="thead-top"
                >
                  <tr>
                    <th
                      rowspan="2"
                      colspan="1"
                      style="text-align:center; vertical-align: middle; font-size: 14px; background:rgb(0,0,0, 0.0); color: #000;"
                    >
                      วันที่
                    </th>
                    <th
                      colspan="7"
                      style="text-align:center; font-size: 14px; background:rgb(0,0,0, 0.0); color: #000;"
                    >
                      สัดส่วนยานพาหนะแต่ละประเภท (คัน)
                    </th>
                    <th
                      rowspan="2"
                      colspan="1"
                      style="text-align:center; vertical-align: middle; font-size: 14px; background:rgb(0,0,0, 0.0); color: #000;"
                    >
                      รวมปริมาณยานพาหนะ
                    </th>
                    <th
                      rowspan="2"
                      colspan="1"
                      style="text-align:center; vertical-align: middle; font-size: 14px; background:rgb(0,0,0, 0.0); color: #000;"
                    >
                      ความเร็วเฉลี่ย (KM/H.)
                    </th>
                  </tr>

                </template>
                <template #cell(bike)="data">
                  {{ data.item.bike.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </template>
                <template #cell(car)="data">
                  {{ data.item.car.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </template>
                <template #cell(truck)="data">
                  {{ data.item.truck.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </template>
                <template #cell(bus)="data">
                  {{ data.item.bus.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </template>
                <template #cell(taxi)="data">
                  {{ data.item.taxi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </template>
                <template #cell(pickup)="data">
                  {{ data.item.pickup.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </template>
                <template #cell(trailer)="data">
                  {{ data.item.trailer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </template>
                <template #cell(total)="data">
                  {{ data.item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
                </template>
              </b-table>
              <br>
            </b-col>
            <!-- <hr
              class="page-break"
              style="width: 100%; margin: 10px auto; border: none;"
            > -->
            <!-- <br>
            <br> -->
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol, BImg, BCard, BTable,
} from 'bootstrap-vue'
import axios from '@axios'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BImg,
    BTable,
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
          thStyle: { background: '#fff' },
        },
        {
          key: 'car',
          label: 'รถยนต์',
          class: 'text-center',
          thStyle: { background: '#fff' },
        },
        {
          key: 'pickup',
          label: 'รถกระบะ',
          class: 'text-center',
          thStyle: { background: '#fff' },
        },
        {
          key: 'taxi',
          label: 'รถแท็กซี่',
          class: 'text-center',
          thStyle: { background: '#fff' },
        },
        {
          key: 'bus',
          label: 'รถบัส',
          class: 'text-center',
          thStyle: { background: '#fff' },
        },
        {
          key: 'truck',
          label: 'รถบรรทุก',
          class: 'text-center',
          thStyle: { background: '#fff' },
        },
        {
          key: 'trailer',
          label: 'รถพ่วง',
          class: 'text-center',
          thStyle: { background: '#fff' },
        },
        {
          key: 'total',
          label: 'รวมปริมาณยานพาหนะ',
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
          thStyle: { background: '#fff' },
        },
        {
          key: 'car_pcu',
          label: 'รถยนต์',
          class: 'text-center',
          thStyle: { background: '#fff' },
        },
        {
          key: 'pickup_pcu',
          label: 'รถกระบะ',
          class: 'text-center',
          thStyle: { background: '#fff' },
        },
        {
          key: 'taxi_pcu',
          label: 'รถแท็กซี่',
          class: 'text-center',
          thStyle: { background: '#fff' },
        },
        {
          key: 'bus_pcu',
          label: 'รถบัส',
          class: 'text-center',
          thStyle: { background: '#fff' },
        },
        {
          key: 'truck_pcu',
          label: 'รถบรรทุก',
          class: 'text-center',
          thStyle: { background: '#fff' },
        },
        {
          key: 'trailer_pcu',
          label: 'รถพ่วง',
          class: 'text-center',
          thStyle: { background: '#fff' },
        },
        {
          key: 'total_pcu',
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
      max_pcu: '',
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
    this.tableCount()
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
          this.AADT = response.data[0].formatted_AADT
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
          this.max_pcu = response.data[0].max_pcu
        })
        .catch(error => {
          console.log(error)
        })
    },
    tableCount() {
      axios
        .post('/get-Count-Daily-All', { location_id: this.$route.query.location_id })
        .then(response => {
          this.items = response.data
          this.totalRows = response.data.length
        })
        .catch(error => {
          console.log(error)
        })
    },

    tableCountPCU() {
      axios
        .post('/get-Count-Daily-PCU-All', { location_id: this.$route.query.location_id })
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
  background-color: white !important; /* Ensuring white background with !important */
  border: 1px solid black; /* Black borders */
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: normal; /* Changed from nowrap to normal to prevent empty lines */
  vertical-align: middle; /* Ensure content is vertically centered */
  margin: 0 !important;
  padding: 2px 5px !important; /* Reduce padding to minimize empty space */
  line-height: 1.2 !important; /* Reduce line height to minimize empty space */
  border-collapse: collapse;
  border-spacing: 0;
}

/* Fix for empty row at the top */
.custom-table .table {
  border-collapse: collapse !important;
  border-spacing: 0 !important;
  empty-cells: show !important;
}

.custom-table {
  margin: 0 !important;
  padding: 0 !important;
  border-collapse: collapse !important;
  border-spacing: 0 !important;
}

/* เพิ่มสไตล์ใหม่เพื่อแก้ไขปัญหาแถวว่าง */
.custom-table >>> table {
  border-collapse: collapse !important;
  border-spacing: 0 !important;
}

.custom-table >>> tr {
  border-collapse: collapse !important;
  border-spacing: 0 !important;
}

/* แก้ไขปัญหาแถวว่างในการพิมพ์ */
@media print {
  .custom-table .table {
    border-collapse: collapse !important;
    border-spacing: 0 !important;
    empty-cells: show !important;
  }

  .custom-table .table tr {
    page-break-inside: avoid !important;
  }

  .custom-table .table th,
  .custom-table .table td {
    page-break-inside: avoid !important;
  }
}
.pdf-content span, .pdf-content div {
  font-family: 'Sarabun', sans-serif; /* Example to set font for general text */
  font-size: 14px; /* Larger text size for content */
}

.padding1 {
  padding: 100px;
}
</style>
