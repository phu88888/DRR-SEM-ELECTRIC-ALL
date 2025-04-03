<template>
  <div>
    <b-row>
      <b-col>
        <b-card
          class="a4-size"
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
              <span style="color: #000; font-size:20px; font-weight: bold">แผนที่สายทางและจุดติดตั้งเครื่องนับปริมาณจราจรบนสายทาง</span>
              <br>
              <br>
              <br>
              <br>
              <br>
            </b-col>

            <b-col
              class="d-flex align-items-center justify-content-start mb-1"
              style="margin-left: 100px;"
              lg="12"
            >
              <span style="color: #000; font-size:17px;">วันที่สำรวจ &nbsp;&nbsp;{{ MinDate2 }} ถึง {{ MaxDate2 }}</span>
            </b-col>
            <b-col
              class="d-flex align-items-center justify-content-start mb-1"
              style="margin-left: 100px;"
              lg="12"
            >
              <span style="color: #000; font-size:17px;">ชื่อสายทาง &nbsp;&nbsp;{{ road_code2 }} {{ road_name2 }}</span>
            </b-col>
            <b-col
              class="d-flex align-items-center justify-content-start mb-1"
              style="margin-left: 100px;"
              lg="12"
            >
              <span style="color: #000; font-size:17px;">อำเภอ &nbsp;{{ amphoe2 }} จังหวัด &nbsp;{{ province2 }}</span>
            </b-col>
            <b-col
              class="d-flex align-items-center justify-content-start mb-1"
              style="margin-left: 100px;"
              lg="12"
            >
              <span style="color: #000; font-size:17px;">ระยะทางตลอดสายทาง &nbsp;{{ distance_km2 }} กม.</span>
            </b-col>
            <b-col
              class="d-flex align-items-center justify-content-start mb-1"
              style="margin-left: 100px;"
              lg="12"
            >
              <span
                v-if="sta"
                style="color: #000; font-size:17px;"
              >จุดติดตั้งอุปกรณ์สำรวจ กม.{{ sta2 }} ตำแหน่งพิกัด {{ latitude2 }}, {{ longitude2 }}</span>
              <span
                v-else
                style="color: #000; font-size:17px;"
              >จุดติดตั้งอุปกรณ์สำรวจในตำแหน่งพิกัด {{ latitude2 }}, {{ longitude2 }}</span>
            </b-col>
            <b-col
              class="d-flex align-items-center justify-content-start mb-1"
              style="margin-left: 100px;"
              lg="12"
            >
              <span style="color: #000; font-size:17px;">{{ dept_group2 }} {{ dept_name2 }}</span>
            </b-col>

            <b-col
              class="d-flex align-items-center justify-content-center mt-3"
              cols="12"
            >
              <b-img
                :src="cam_picture2"
                :style="{ width: '450px', height: '306px' }"
                fluid
              />
              <!-- </b-col>
            <b-col
              class="d-flex align-items-center justify-content-center mt-3"
              cols="6"
            > -->
              <div class="mr-1" />
              <b-img
                :src="setup_picture2"
                :style="{ width: '450px', height: '306px' }"
                fluid
              />
            </b-col>
            <b-col
              class="d-flex align-items-center justify-content-center mt-3"
              cols="12"
            >
              <span style="color: #000; font-size:17px; margin-right:200px">MAX PCU: {{ max_pcu2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
              <span style="color: #000; font-size:17px; margin-left:150px">AADT: {{ AADT2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
            </b-col>

            <!-- longdo map -->
            <!-- <b-col
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
            </b-col> -->

            <!-- <b-col
              class="d-flex align-items-center justify-content-center mb-1"
              lg="12"
            >
              <span style="color: #000; font-size:20px; font-weight: bold;">แผนที่สายทางและจุดติดตั้งเครื่องนับปริมาณจราจรบนสายทาง</span>
              <br>
              <br>
              <br>
              <br>
              <br>
            </b-col> -->
            <b-col
              class="d-flex align-items-center justify-content-center mb-1"
              lg="12"
            >
              <br>
              <br>
            </b-col>

            <b-col
              class="d-flex align-items-center justify-content-center mb-1"
              lg="12"
            >
              <span
                v-if="sta"
                style="color: #000; font-size:16px;"
              >จุดติดตั้งนี้ติดตั้งใน กม.ที่ {{ sta }} ดังแสดงในรูปที่ 1</span>
              <span
                v-else
                style="color: #000; font-size:16px;"
              >จุดติดตั้งนี้ติดตั้งดังแสดงในรูปที่ 1</span>
              <br>
            </b-col>

            <b-col
              class="d-flex align-items-center justify-content-center mb-1"
              lg="12"
            >
              <div
                id="map-container"
                class="map-container"
                style="width: 50%; height: 580px; margin: 0 auto;"
              >
                <londo-map
                  :route-paths="roadGeometries"
                  :additional-markers="[
                    {
                      lat: Number(latitude),
                      lng: Number(longitude),
                      title: road_name,
                      detail: `จุดติดตั้งเครื่องนับปริมาณจราจร กม. ${sta || '-'}`
                    }
                  ]"
                  :start-marker-icon="startMarkerIcon"
                  :end-marker-icon="endMarkerIcon"
                />
              </div>
            </b-col>

            <b-col
              class="d-flex align-items-center justify-content-center mb-1"
              lg="12"
            >
              <span style="color: #000; font-size: 15px; font-weight: normal;">รูปที่ 1 แผนที่แสดงจุดติดตั้งเครื่องนับปริมาณจราจร</span>
              <br>
              <br>
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
import LondoMap from './LondoMap.vue'
import startMarkerIcon from '@/assets/images/icons/marker/province-start2.png'
import endMarkerIcon from '@/assets/images/icons/marker/province-end2.png'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BImg,
    LondoMap,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
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
      items: [],
      roadGeometries: [],
      geom_text: '',
      interval: null,
      startMarkerIcon,
      endMarkerIcon,

      // part 2
      location_id2: '',
      dept_name2: '',
      dept_group2: '',
      road_code2: '',
      road_name2: '',
      amphoe2: '',
      province2: '',
      sta2: '',
      distance_km2: '',
      installation_point2: '',
      latitude2: '',
      longitude2: '',
      pcu2: '',
      note2: '',
      map_picture2: '',
      cam_picture2: '',
      setup_picture2: '',
      day_count2: '',
      pcu_avg2: '',
      vehicle_max2: '',
      vehicle_class2: '',
      AADT2: '',
      percent_truck2: '',
      speed_max2: '',
      speed_avg2: '',
      speed85th2: '',
      lane_density2: '',
      CLV2: '',
      VKT2: '',
      PHF2: '',
      LOS2: '',
      VC_Ratio2: '',
      pcu_hour2: '',
      MinDate2: '',
      MaxDate2: '',
      max_pcu2: '',
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
    this.reportData()
    this.reportData2()
    this.MapData()
    this.interval = setInterval(() => {
      this.reportData()
      this.reportData2()
    }, 600000)
  },
  beforeDestroy() {
    // ล้าง interval เมื่อคอมโพเนนต์ถูกทำลาย
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {

    MapData() {
      axios
        .post('/get-Map-Location', { location_id: this.$route.query.location_id })
        .then(response => {
          if (response.data && response.data.length > 0) {
            const data = response.data[0]
            this.location_id = data.location_id

            // ถ้ามีข้อมูล geom_text ให้แปลงเป็น geometry
            if (data.geom_text) {
              this.geom_text = data.geom_text
              this.parseGeomText(data.geom_text)
            } else {
              // ถ้าไม่มี geom_text ให้เรียก API เพื่อดึงข้อมูลเส้นทาง
              this.getRoadGeometries(data.road_code)
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    // ฟังก์ชันแปลง geom_text เป็น geometry ที่ใช้กับ LondoMap
    parseGeomText(geomText) {
      try {
        // ตรวจสอบว่าเป็น LineString หรือไม่
        if (geomText && geomText.startsWith('LINESTRING')) {
          // ตัด LINESTRING( และ ) ออก
          const coordsStr = geomText.replace('LINESTRING(', '').replace(')', '')

          // แยกพิกัดออกเป็นคู่ [lon, lat]
          const coordPairs = coordsStr.split(',')
          const coordinates = coordPairs.map(pair => {
            const [lon, lat] = pair.trim().split(' ').map(Number)
            return [lon, lat]
          })

          // สร้าง geometry แบบที่ LondoMap ต้องการ
          this.roadGeometries = [{
            geometry: {
              paths: [coordinates],
            },
            attributes: {
              route_name: this.road_name || 'เส้นทาง',
              road_code: this.road_code || '',
              // เพิ่มข้อมูลจุดเริ่มต้นและจุดสิ้นสุดเพื่อให้ LondoMap สามารถใช้งานได้
              startPoint: coordinates[0],
              endPoint: coordinates[coordinates.length - 1],
            },
          }]
        } else {
          console.log('ไม่สามารถแปลง geom_text ได้: ไม่ใช่ LINESTRING')
          this.getRoadGeometries(this.road_code)
        }
      } catch (error) {
        console.log('เกิดข้อผิดพลาดในการแปลง geom_text:', error)
        this.getRoadGeometries(this.road_code)
      }
    },

    getRoadGeometries(roadCode) {
      // เพิ่มการดึงข้อมูลเส้นทางจาก API (ถ้ามี)
      console.log('ดึงข้อมูลเส้นทางสำหรับรหัสสายทาง:', roadCode)
      // ในที่นี้อาจจะต้องเพิ่มการเรียก API เพื่อดึงข้อมูลเส้นทาง
      // ตัวอย่างเช่น:
      // axios.post('/get-road-geometries', { road_code: roadCode })
      //   .then(response => {
      //     // แปลงข้อมูลที่ได้เป็นรูปแบบที่ LondoMap ต้องการ
      //     // ...
      //   })
      //   .catch(error => {
      //     console.log(error)
      //   })
    },

    reportData() {
      axios
        .post('/get-Data-Report-All', { location_id: this.$route.query.location_id })
        .then(response => {
          if (response.data && response.data.length > 0) {
            const data = response.data[0]
            this.location_id = data.location_id
            this.dept_name = data.dept_name
            this.dept_group = data.dept_group
            this.road_code = data.road_code
            this.road_name = data.road_name
            this.amphoe = data.amphoe
            this.province = data.province
            this.sta = data.sta
            this.distance_km = data.distance_km
            this.installation_point = data.installation_point
            this.latitude = data.latitude
            this.longitude = data.longitude
            this.pcu = data.pcu
            this.note = data.note
            this.map_picture = data.map_picture
            this.cam_picture = data.cam_picture
            this.setup_picture = data.setup_picture
            this.day_count = data.day_count
            this.pcu_avg = data.pcu_avg
            this.vehicle_max = data.vehicle_max
            this.vehicle_class = data.vehicle_class
            this.AADT = data.AADT
            this.percent_truck = data.percent_truck
            this.speed_max = data.speed_max
            this.speed_avg = data.speed_avg
            this.speed85th = data.speed85th
            this.lane_density = data.lane_density
            this.CLV = data.CLV
            this.VKT = data.VKT
            this.PHF = data.PHF
            this.LOS = data.LOS
            this.VC_Ratio = data.VC_Ratio
            this.pcu_hour = data.traffic_flow_rate
            this.MinDate = data.MinDate
            this.MaxDate = data.MaxDate

            // ถ้ามีข้อมูล geom_text ในการเรียก reportData ให้นำมาใช้
            if (data.geom_text && !this.geom_text) {
              this.geom_text = data.geom_text
              this.parseGeomText(data.geom_text)
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    reportData2() {
      axios
        .post('/get-Data-Report-All', { location_id: this.$route.query.location_id })
        .then(response => {
          this.location_id2 = response.data[0].location_id
          this.dept_name2 = response.data[0].dept_name//
          this.dept_group2 = response.data[0].dept_group//
          this.road_code2 = response.data[0].road_code//
          this.road_name2 = response.data[0].road_name//
          this.amphoe2 = response.data[0].amphoe//
          this.province2 = response.data[0].province//
          this.sta2 = response.data[0].sta//
          this.distance_km2 = response.data[0].distance_km
          // this.installation_point2 = response.data[0].installation_point
          this.latitude2 = response.data[0].latitude//
          this.longitude2 = response.data[0].longitude//
          // this.pcu2 = response.data[0].pcu
          // this.note2 = response.data[0].note
          // this.map_picture2 = response.data[0].map_picture
          this.cam_picture2 = response.data[0].cam_picture//
          this.setup_picture2 = response.data[0].setup_picture//
          // this.day_count2 = response.data[0].day_count
          // this.pcu_avg2 = response.data[0].pcu_avg
          // this.vehicle_max2 = response.data[0].vehicle_max
          // this.vehicle_class2 = response.data[0].vehicle_class
          this.AADT2 = response.data[0].formatted_AADT//
          // this.percent_truck2 = response.data[0].percent_truck
          // this.speed_max2 = response.data[0].speed_max
          // this.speed_avg2 = response.data[0].speed_avg
          // this.speed85th2 = response.data[0].speed85th
          // this.lane_density2 = response.data[0].lane_density
          // this.CLV2 = response.data[0].CLV
          // this.VKT2 = response.data[0].VKT
          // this.PHF2 = response.data[0].PHF
          // this.LOS2 = response.data[0].LOS
          // this.VC_Ratio2 = response.data[0].VC_Ratio
          // this.pcu_hour2 = response.data[0].traffic_flow_rate
          this.MinDate2 = response.data[0].MinDate//
          this.MaxDate2 = response.data[0].MaxDate//
          this.max_pcu2 = response.data[0].max_pcu//
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

.np-btn {
  padding: 2px 8px;
  margin: 12px 8px;
  border: 1px solid #da1010;
  width: 110px;
  background: #da1010;
  border-radius: 6px;
  color: #ffffff;
  cursor: pointer;
}

.pdf-content span, .pdf-content div {
  font-family: 'Sarabun', sans-serif; /* Example to set font for general text */
  font-size: 14px; /* Larger text size for content */
}

/* เพิ่มสไตล์สำหรับการพิมพ์ */
@media print {
  .page-break {
    page-break-after: always;
  }

  #map-container {
    width: 100% !important;
    height: 580px !important;
    page-break-inside: avoid;
  }

  /* ปรับขนาดของแผนที่เมื่อพิมพ์ */
  .map-container {
    width: 100% !important;
    height: 500px !important;
    margin: 0 auto;
    page-break-inside: avoid;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

  /* ปรับสไตล์ของคอนเทนเนอร์ Longdo Map */
  .longdo-map-container {
    width: 100% !important;
    height: 500px !important;
    margin: 0 auto;
    page-break-inside: avoid;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

  /* ซ่อนอินเตอร์เฟซควบคุมแผนที่เมื่อพิมพ์ */
  .ldmap-control-zoom,
  .ldmap-control-layers,
  .ldmap-control-attribution,
  .longdo-credits,
  .longdo-logo-powered,
  .ldmap-attribution {
    display: none !important;
    visibility: hidden !important;
  }

  /* ปรับขนาดของ a4-size ให้เหมาะสม */
  .a4-size {
    width: 210mm;
    height: 297mm;
    padding: 10mm;
    margin: 0;
    background: white;
  }

  /* ซ่อนองค์ประกอบที่ไม่จำเป็นในการพิมพ์ */
  .header-navbar,
  .main-menu,
  .footer,
  .btn-print,
  .feather-icon {
    display: none !important;
  }
}
</style>
