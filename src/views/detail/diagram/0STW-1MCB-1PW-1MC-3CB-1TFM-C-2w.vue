<template>
  <l-map
    ref="map"
    style="position: relative; font-size:18px; height:900px; width: 100%; background-color:rgba(0, 0, 0, 0); color:#ffffff; z-index: 0;"
    :crs="crs"
    :min-zoom="minZoom4"
    :zoom="-1"
    :options="{scrollWheelZoom:false, zoomControl: false, doubleClickZoom: false, attributionControl:false,
               touchZoom: false, tap: false, dragging: false}"
  >
    <l-image-overlay
      :url="require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W.png')"
      :bounds="bounds4"
    />
    <!-- TFM ----------------------------------------------------------->
    <l-marker
      v-if="items.c_other === '0'"
      :lat-lng="[604, 114]"
      :icon="iconTFMF"
    />
    <l-marker
      v-else
      :lat-lng="[604, 114]"
      :icon="iconTFMN"
    />
    <!-- MCB ----------------------------------------------------------->
    <l-marker
      v-if="(items.c_main_breaker === '0')"
      :lat-lng="[54, 103]"
      :icon="iconMCBF"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_main_breaker }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else-if="items.c_main_breaker === '1'"
      :lat-lng="[54, 103]"
      :icon="iconMCBN"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_main_breaker }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else
      :lat-lng="[54, 103]"
      :icon="iconMCBNF"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_main_breaker }}
      </l-popup>
    </l-marker>
    <!-- photo swicth ----------------------------------------------------------->
    <l-marker
      v-if="items.c_photo_switch === '0'"
      :lat-lng="[73, -118]"
      :icon="iconPhoto4"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_photo_switch }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else
      :lat-lng="[73, -118]"
      :icon="iconPhotoMoon"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_photo_switch }}
      </l-popup>
    </l-marker>
    <!-- MC1 ----------------------------------------------------------->
    <l-marker
      v-if="(items.c_main_breaker === '0' && items.c_magnetic_contactor1 === '0')"
      :lat-lng="[-230, -534]"
      :icon="iconMC1F"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_magnetic_contactor1 }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else-if="(items.c_main_breaker === '1' && items.c_magnetic_contactor1 === '1')"
      :lat-lng="[-230, -534]"
      :icon="iconMC1N"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_magnetic_contactor1 }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else
      :lat-lng="[-230, -534]"
      :icon="iconMC1NF"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_magnetic_contactor1 }}
      </l-popup>
    </l-marker>
    <!-- MC2 ----------------------------------------------------------->
    <l-marker
      v-if="(items.c_main_breaker === '0' && items.c_magnetic_contactor2 === '0')"
      :lat-lng="[-230, 822]"
      :icon="iconMC2F"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_magnetic_contactor2 }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else-if="(items.c_main_breaker === '1' && items.c_magnetic_contactor2 === '1')"
      :lat-lng="[-230, 822]"
      :icon="iconMC2N"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_magnetic_contactor2 }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else
      :lat-lng="[-230, 822]"
      :icon="iconMC2NF"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_magnetic_contactor2 }}
      </l-popup>
    </l-marker>

    <!-- CB1 ----------------------------------------------------------->
    <l-marker
      v-if="items.c_sub_breaker1 === '1'"
      :lat-lng="[-494, -642]"
      :icon="iconCB1N"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_sub_breaker1 }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else
      :lat-lng="[-494, -642]"
      :icon="iconCB1F"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_sub_breaker1 }}
      </l-popup>
    </l-marker>
    <!-- CB2 ----------------------------------------------------------->
    <l-marker
      v-if="items.c_sub_breaker2 === '1'"
      :lat-lng="[-494, -426]"
      :icon="iconCB2N"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_sub_breaker2 }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else
      :lat-lng="[-494, -426]"
      :icon="iconCB2F"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_sub_breaker2 }}
      </l-popup>
    </l-marker>
    <!-- CB3 ----------------------------------------------------------->
    <l-marker
      v-if="items.c_sub_breaker3 === '1'"
      :lat-lng="[-494, 714]"
      :icon="iconCB3N"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_sub_breaker3 }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else
      :lat-lng="[-494, 714]"
      :icon="iconCB3F"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_sub_breaker3 }}
      </l-popup>
    </l-marker>
    <!-- CB4 ----------------------------------------------------------->
    <l-marker
      v-if="items.c_sub_breaker4 === '1'"
      :lat-lng="[-494, 930]"
      :icon="iconCB4N"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_sub_breaker4 }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else
      :lat-lng="[-494, 930]"
      :icon="iconCB4F"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_sub_breaker4 }}
      </l-popup>
    </l-marker>

    <!-- Line 1,2 ----------------------------------------------------------->
    <l-marker
      v-if="(items.c_sub_breaker1 === '0' && items.c_sub_breaker2 === '0' && items.c_sub_breaker3 === '0') && (items.line_detect1 === 1 || items.line_detect2 === 1)"
      :lat-lng="[-514, -307]"
      :icon="iconLine1F"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_sub_breaker1 }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else-if="(items.c_sub_breaker1 === '1' || items.c_sub_breaker2 === '1' || items.c_sub_breaker3 === '1') && (items.line_detect1 === 1 || items.line_detect2 === 1)"
      :lat-lng="[-514, -307]"
      :icon="iconLine1N"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_sub_breaker1 }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else
      :lat-lng="[-514, -307]"
      :icon="iconLine1B"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_sub_breaker1 }}
      </l-popup>
    </l-marker>
    <!-- Line 3,4 ----------------------------------------------------------->
    <l-marker
      v-if="(items.c_sub_breaker1 === '0' && items.c_sub_breaker2 === '0' && items.c_sub_breaker3 === '0') && (items.line_detect3 === 1 || items.line_detect4 === 1)"
      :lat-lng="[-516, 594]"
      :icon="iconLine2F"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_sub_breaker1 }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else-if="(items.c_sub_breaker1 === '1' || items.c_sub_breaker2 === '1' || items.c_sub_breaker3 === '1') && (items.line_detect3 === 1 || items.line_detect4 === 1)"
      :lat-lng="[-516, 594]"
      :icon="iconLine2N"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_sub_breaker1 }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else
      :lat-lng="[-516, 594]"
      :icon="iconLine2B"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_sub_breaker1 }}
      </l-popup>
    </l-marker>
    <!-- Line 3,4 ----------------------------------------------------------->
    <!-- <l-marker
      v-if="(items.c_sub_breaker1 === '0') && (items.line_detect3 === 1 || items.line_detect4 === 1)"
      :lat-lng="[-690, 240]"
      :icon="iconLine2F"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_sub_breaker1 }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else-if="(items.c_sub_breaker1 === '1') && (items.line_detect3 === 1 || items.line_detect4 === 1)"
      :lat-lng="[-690, 240]"
      :icon="iconLine2N"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_sub_breaker1 }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else
      :lat-lng="[-690, 240]"
      :icon="iconLine2B"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_sub_breaker1 }}
      </l-popup>
    </l-marker> -->
  </l-map>
</template>

<script>
/* eslint-disable global-require */
import {
  LMap, LImageOverlay,
  LMarker, LPopup,
  // LIcon,
} from 'vue2-leaflet'
import { CRS, icon, Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from '@axios'
// eslint-disable-next-line no-underscore-dangle
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})
/* eslint-disable global-require */

export default {
  components: {
    LMap,
    LImageOverlay,
    LMarker,
    LPopup,
    // LIcon,
  },
  data() {
    return {
      waydetail: '',
      checkLeft1: '',
      checkRight1: '',
      checkLeft2: '',
      checkRight2: '',
      bounds4: [[-930, 1330], [920, -1079]],
      iconSize: 64,
      crs: CRS.Simple,
      minZoom4: -1,
      deptid: '',
      items: [],
      center: [], // เพิ่ม center เพื่อป้องกัน undefined
      switch: { // เพิ่ม switch เพื่อป้องกัน TypeError
        semid: '',
        controller_id: 1,
        drv1_cmd: '',
      },
      type_name: '', // เพิ่ม type_name เพื่อป้องกัน undefined

      // TFM
      iconTFMN: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/s1b.gif'),
        iconSize: [378, 360],
      }),
      iconTFMF: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/s1r.gif'),
        iconSize: [378, 360],
      }),

      // main_breaker
      iconMCBF: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/lr-cb66-r1.gif'),
        iconSize: [782, 440],
      }),
      iconMCBN: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/lr-cb66-1.gif'),
        iconSize: [782, 440],
      }),
      iconMCBNF: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/lr-cb66-y1.gif'),
        iconSize: [782, 440],
      }),

      // Photo
      iconPhoto4: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/Photo-DR.gif'),
        iconSize: [220, 179],
      }),
      iconPhotoMoon: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/Photo-N.gif'),
        iconSize: [220, 179],
      }),

      // --- MC1 -----------------------------------------------------------
      iconMC1N: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/MAG-1.gif'),
        iconSize: [138, 188],
      }),
      iconMC1F: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/MAG-4.gif'),
        iconSize: [138, 188],
      }),
      iconMC1NF: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/MAG-3.gif'),
        iconSize: [138, 188],
      }),
      // --- MC2 -----------------------------------------------------------
      iconMC2N: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/MAG-1.gif'),
        iconSize: [138, 188],
      }),
      iconMC2F: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/MAG-4.gif'),
        iconSize: [138, 188],
      }),
      iconMC2NF: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/MAG-3.gif'),
        iconSize: [138, 188],
      }),

      // --- CB1 -----------------------------------------------------------
      iconCB1N: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/cb-on2.png'),
        iconSize: [32, 76],
      }),
      iconCB1F: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/cb-r2.png'),
        iconSize: [32, 76],
      }),

      // --- CB2 -----------------------------------------------------------
      iconCB2N: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/cb-on2.png'),
        iconSize: [32, 76],
      }),
      iconCB2F: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/cb-r2.png'),
        iconSize: [32, 76],
      }),

      // --- CB3 -----------------------------------------------------------
      iconCB3N: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/cb-on2.png'),
        iconSize: [32, 76],
      }),
      iconCB3F: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/cb-r2.png'),
        iconSize: [32, 76],
      }),

      // --- CB4 -----------------------------------------------------------
      iconCB4N: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/cb-on2.png'),
        iconSize: [32, 76],
      }),
      iconCB4F: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/cb-r2.png'),
        iconSize: [32, 76],
      }),

      // --- CB2 -----------------------------------------------------------
      // iconCB2N: icon({
      //   iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1MC-1CB-3TFM-2W-67/cb9-r-1.gif'),
      //   iconSize: [232, 202],
      // }),
      // iconCB2F: icon({
      //   iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1MC-1CB-3TFM-2W-67/cb9-r-r1.gif'),
      //   iconSize: [232, 202],
      // }),
      // iconCB2NF: icon({
      //   iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1MC-1CB-3TFM-2W-67/cb9-r-y1.gif'),
      //   iconSize: [232, 202],
      // }),

      // --- Line 2 -----------------------------------------------------------
      iconLine2N: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/l-cb6-1.gif'),
        iconSize: [235, 206],
      }),
      iconLine2F: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/l-cb6-r1.gif'),
        iconSize: [235, 206],
      }),
      iconLine2B: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/l-cb6-r2-green.gif'),
        iconSize: [235, 206],
      }),
      // --- Line 1 -----------------------------------------------------------
      iconLine1N: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/r-cb6-1.gif'),
        iconSize: [235, 206],
      }),
      iconLine1F: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/r-cb6-r1.gif'),
        iconSize: [235, 206],
      }),
      iconLine1B: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-1MCB-1PW-1MC-4CB-1TFM-C-2W/r-cb6-r2-green.gif'),
        iconSize: [235, 206],
      }),
      sem_type: '',
      diagram_type: '',
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  created() {
    // this.checkLine()
    this.getCenterSem()
    this.getValueDiagram()
    this.interval = setInterval(() => {
      this.getValueDiagram()
      this.getCenterSem()
      // this.checkLine()
    }, 10000)
  },
  mounted() {
    this.$refs.map.mapObject.invalidateSize()
  },
  methods: {
    getCenterSem() {
      // ตรวจสอบว่ามี this.switch หรือไม่ ถ้าไม่มีให้สร้างขึ้นมา
      if (!this.switch) {
        this.switch = {
          semid: '',
          controller_id: 1,
          drv1_cmd: '',
        }
      }

      // console.log('getCenterSem - wid ที่ส่งไปยัง API:', this.$route.query.wid)
      axios
        .post('/waySEMControlDetail-Electic', { wid: this.$route.query.wid })
        .then(response => {
          // ตรวจสอบว่ามีข้อมูลจาก API หรือไม่
          if (response.data && response.data.length > 0) {
            // กำหนดค่า center เป็น array ว่างก่อน
            this.center = []

            // กำหนดค่าต่างๆ จากข้อมูลที่ได้จาก API
            this.waydetail = response.data[0].detail
            this.deptid = response.data[0].deptid
            this.type_name = response.data[0].type_name

            // ตรวจสอบว่ามี this.switch หรือไม่ก่อนกำหนดค่า
            if (this.switch) {
              this.switch.semid = response.data[0].id
            }
          } else {
            console.warn('ไม่พบข้อมูลจาก API waySEMControlDetail')
          }
        })
        .catch(error => {
          console.error('เกิดข้อผิดพลาดใน getCenterSem:', error)
        })
    },
    getValueDiagram() {
      // console.log('getValueDiagram - wid ที่ส่งไปยัง API:', this.$route.query.wid)
      axios
        .post('/getDiagram3P-Electic', { wid: this.$route.query.wid })
        .then(response => {
          this.sem_type = response.data[0].firmware
          this.diagram_type = response.data[0].diagram_type
          // eslint-disable-next-line prefer-destructuring
          this.items = response.data[0]
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>
<style  lang="scss" scoped>
.headline {
  font-size: 20px;
}
.title {
  color:#FFFFD5
}
.nowrap {
  white-space: nowrap ;
}
</style>
