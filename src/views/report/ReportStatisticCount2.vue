<template>
  <div>
    <b-row>
      <!-- แถว 1: PCU Average และ AADT -->
      <b-col cols="3" />
      <b-col cols="3">
        <b-card
          style="background-color:rgba(0, 0, 0, 0.0); color: #000; height: 140px; border: 4px solid #008CD6; border-radius: 20px;"
        >
          <div style="text-align: center;">
            <span style="font-weight: 500; font-size: 22px;">
              PCU Average
            </span>
          </div>
          <div style="text-align: end; margin-top: 20px;">
            <span style="font-weight: 500; font-size: 20px;">
              {{ pcu_avg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </span>
          </div>
        </b-card>
      </b-col>
      <b-col cols="3">
        <b-card
          style="background-color:rgba(0, 0, 0, 0.0); color: #000; height: 140px; border: 4px solid #008CD6; border-radius: 20px;"
        >
          <div style="text-align: center;">
            <span style="font-weight: 500; font-size: 22px;">
              AADT
            </span>
          </div>
          <div style="text-align: end; margin-top: 20px;">
            <span style="font-weight: 500; font-size: 20px;">
              {{ AADT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </span>
            <span
              style="font-weight: 500; font-size: 18px;"
            >
              คัน/วัน
            </span>
          </div>
        </b-card>
      </b-col>
      <b-col cols="3" />

      <!-- แถว 2: ยานพาหนะสูงสุด, เปอร์เซ็นต์รถบรรทุกหนัก, อัตราการไหลของปริมาณจราจร -->
      <b-col cols="4">
        <b-card
          style="background-color:rgba(0, 0, 0, 0.0); color: #000; height: 140px; border: 4px solid #008CD6; border-radius: 20px;"
        >
          <div style="text-align: center;">
            <span style="font-weight: 500; font-size: 22px;">
              ยานพาหนะสูงสุด
            </span>
          </div>
          <div style="text-align: end; margin-top: 20px;">
            <span
              style="color: #000; font-weight: 500; font-size: 18px;"
              class="mr-1"
            >
              {{ vehicle_class }}
            </span>
            <span style="font-weight: 500; font-size: 20px;">
              {{ vehicle_max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </span>
            <span
              style="font-weight: 500; font-size: 18px;"
            >
              คัน/วัน
            </span>
          </div>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card
          style="background-color:rgba(0, 0, 0, 0.0); color: #000; height: 140px; border: 4px solid #008CD6; border-radius: 20px;"
        >
          <div style="text-align: center;">
            <span style="font-weight: 500; font-size: 22px;">
              เปอร์เซ็นต์รถบรรทุกหนัก
            </span>
          </div>
          <div style="text-align: end; margin-top: 20px;">
            <span style="font-weight: 500; font-size: 20px;">
              {{ percent_truck }} %
            </span>
          </div>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card
          style="background-color:rgba(0, 0, 0, 0.0); color: #000; height: 140px; border: 4px solid #008CD6; border-radius: 20px;"
        >
          <div style="text-align: center;">
            <span style="font-weight: 500; font-size: 22px;">
              อัตราการไหลของปริมาณจราจร
            </span>
          </div>
          <div style="text-align: end; margin-top: 20px;">
            <span style="font-weight: 500; font-size: 20px;">
              {{ pcu_hour.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </span>
            <span
              style="font-weight: 500; font-size: 18px;"
            >
              PCU/ชม.
            </span>
          </div>
        </b-card>
      </b-col>

      <!-- แถว 3: ความเร็วสูงสุด, ความเร็วเฉลี่ย, 85 เปอร์เซ็นไทล์ -->
      <b-col cols="4">
        <b-card
          style="background-color:rgba(0, 0, 0, 0.0); color: #000; height: 140px; border: 4px solid #008CD6; border-radius: 20px;"
        >
          <div style="text-align: center;">
            <span style="font-weight: 500; font-size: 22px;">
              ความเร็วสูงสุด
            </span>
          </div>
          <div style="text-align: end; margin-top: 20px;">
            <span style="font-weight: 500; font-size: 20px;">
              {{ speed_max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </span>
            <span
              style="font-weight: 500; font-size: 18px;"
            >
              กม./ชม.
            </span>
          </div>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card
          style="background-color:rgba(0, 0, 0, 0.0); color: #000; height: 140px; border: 4px solid #008CD6; border-radius: 20px;"
        >
          <div style="text-align: center;">
            <span style="font-weight: 500; font-size: 22px;">
              ความเร็วเฉลี่ย
            </span>
          </div>
          <div style="text-align: end; margin-top: 20px;">
            <span style="font-weight: 500; font-size: 20px;">
              {{ speed_avg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </span>
            <span
              style="font-weight: 500; font-size: 18px;"
            >
              กม./ชม.
            </span>
          </div>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card
          style="background-color:rgba(0, 0, 0, 0.0); color: #000; height: 140px; border: 4px solid #008CD6; border-radius: 20px;"
        >
          <div style="text-align: center;">
            <span style="font-weight: 500; font-size: 22px;">
              85 เปอร์เซ็นไทล์
            </span>
          </div>
          <div style="text-align: end; margin-top: 20px;">
            <span style="font-weight: 500; font-size: 20px;">
              {{ speed85th.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </span>
            <span
              style="font-weight: 500; font-size: 18px;"
            >
              กม./ชม.
            </span>
          </div>
        </b-card>
      </b-col>

      <!-- แถว 4: Lane Density, Critical Lane Volume, Vehicle Kilometer Travel -->
      <b-col cols="4">
        <b-card
          style="background-color:rgba(0, 0, 0, 0.0); color: #000; height: 140px; border: 4px solid #008CD6; border-radius: 20px;"
        >
          <div style="text-align: center;">
            <span style="font-weight: 500; font-size: 22px;">
              Lane Density
            </span>
          </div>
          <div style="text-align: end; margin-top: 20px;">
            <span style="font-weight: 500; font-size: 20px;">
              {{ lane_density.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </span>
            <span
              style="font-weight: 500; font-size: 18px;"
            >
              คัน/กม.
            </span>
          </div>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card
          style="background-color:rgba(0, 0, 0, 0.0); color: #000; height: 140px; border: 4px solid #008CD6; border-radius: 20px;"
        >
          <div style="text-align: center;">
            <span style="font-weight: 500; font-size: 22px;">
              Critical Lane Volume
            </span>
          </div>
          <div style="text-align: end; margin-top: 20px;">
            <span style="font-weight: 500; font-size: 20px;">
              {{ CLV.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </span>
            <span
              style="font-weight: 500; font-size: 18px;"
            >
              คัน/ชม.
            </span>
          </div>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card
          style="background-color:rgba(0, 0, 0, 0.0); color: #000; height: 140px; border: 4px solid #008CD6; border-radius: 20px;"
        >
          <div style="text-align: center;">
            <span style="font-weight: 500; font-size: 22px;">
              Vehicle Kilometer Travel
            </span>
          </div>
          <div style="text-align: end; margin-top: 20px;">
            <span style="font-weight: 500; font-size: 20px;">
              {{ VKT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </span>
            <span
              style="font-weight: 500; font-size: 18px;"
            >
              คัน/กม.
            </span>
          </div>
        </b-card>
      </b-col>

      <!-- แถว 5: Peak Hour Factor, Level of Service, Volume Capacity Ratio -->
      <b-col cols="4">
        <b-card
          style="background-color:rgba(0, 0, 0, 0.0); color: #000; height: 140px; border: 4px solid #008CD6; border-radius: 20px;"
        >
          <div style="text-align: center;">
            <span style="font-weight: 500; font-size: 22px;">
              Peak Hour Factor
            </span>
          </div>
          <div style="text-align: end; margin-top: 20px;">
            <span style="font-weight: 500; font-size: 20px;">
              {{ PHF.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </span>
          </div>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card
          style="background-color:rgba(0, 0, 0, 0.0); color: #000; height: 140px; border: 4px solid #008CD6; border-radius: 20px;"
        >
          <div style="text-align: center;">
            <span style="font-weight: 500; font-size: 22px;">
              Level of Service
            </span>
          </div>
          <div style="text-align: end; margin-top: 20px;">
            <span style="font-weight: 500; font-size: 20px;">
              {{ LOS.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </span>
          </div>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-card
          style="background-color:rgba(0, 0, 0, 0.0); color: #000; height: 140px; border: 4px solid #008CD6; border-radius: 20px;"
        >
          <div style="text-align: center;">
            <span style="font-weight: 500; font-size: 22px;">
              Volume Capacity Ratio
            </span>
          </div>
          <div style="text-align: end; margin-top: 20px;">
            <span style="font-weight: 500; font-size: 20px;">
              {{ VC_Ratio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </span>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow, BCol, BCard,
  // BPopover,
} from 'bootstrap-vue'
import axios from '@axios'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    // BImg,
    // BPopover,
  },
  data() {
    return {
      Total: '',
      Type_Max: '',
      Type: '',
      Speed_Max: '',
      Speed85: 0,
      SpeedAVG: 0,
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
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.isSmallScreen)
    clearInterval(this.interval)
  },
  mounted() {
    this.reportData()
    window.addEventListener('resize', this.isSmallScreen)
    this.interval = setInterval(() => {
      this.reportData()
    }, 300000)
  },
  methods: {
    isSmallScreen() {
      return window.innerWidth <= 850
    },
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
          this.pcu_avg = response.data[0].formatted_pcu_avg
          this.vehicle_max = response.data[0].formatted_vehicle_max
          this.vehicle_class = response.data[0].vehicle_class_thai
          this.AADT = response.data[0].formatted_AADT
          this.percent_truck = response.data[0].formatted_percent_heavy_truck
          this.speed_max = response.data[0].formatted_speed_max
          this.speed_avg = response.data[0].formatted_speed_avg
          this.speed85th = response.data[0].formatted_speed85th
          this.lane_density = response.data[0].formatted_lane_density
          this.CLV = response.data[0].formatted_CLV
          this.VKT = response.data[0].formatted_VKT
          this.PHF = response.data[0].formatted_PHF
          this.LOS = response.data[0].LOS
          this.VC_Ratio = response.data[0].formatted_VC_Ratio
          this.pcu_hour = response.data[0].formatted_traffic_flow_rate
          this.MinDate = response.data[0].MinDate
          this.MaxDate = response.data[0].MaxDate
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>

<style>
</style>
