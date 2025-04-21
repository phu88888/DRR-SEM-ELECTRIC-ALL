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
      :url="require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/0STW-3MCB-1PW-1CB-1MC-3TFM-2W.png')"
      :bounds="bounds4"
    />
    <!-- TFM ----------------------------------------------------------->
    <l-marker
      v-if="items.c_other === '0' && items.c_other_phase2 === '0' && items.c_other_phase3 === '0'"
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
      v-if="(items.c_main_breaker === '0' && items.c_main_breaker_phase2 === '0' && items.c_main_breaker_phase3 === '0')"
      :lat-lng="[64, 100]"
      :icon="iconMCBF"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_main_breaker }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else-if="items.c_main_breaker === '1' || items.c_main_breaker_phase2 === '1' || items.c_main_breaker_phase3 === '1'"
      :lat-lng="[64, 100]"
      :icon="iconMCBN"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_main_breaker }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else
      :lat-lng="[64, 100]"
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
    <!-- CB1 ----------------------------------------------------------->
    <l-marker
      v-if="(items.c_main_breaker === '0' && items.c_main_breaker_phase2 === '0' && items.c_main_breaker_phase3 === '0')
        || (items.c_sub_breaker1 === '0' && items.c_sub_breaker1_phase2 === '0' && items.c_sub_breaker1_phase3 === '0')"
      :lat-lng="[-264, 44]"
      :icon="iconCB1F"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_sub_breaker1 }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else-if="(items.c_main_breaker === '1' || items.c_main_breaker_phase2 === '1'|| items.c_main_breaker_phase3 === '1')
        && (items.c_sub_breaker1 === '1'|| items.c_sub_breaker1_phase2 === '1' || items.c_sub_breaker1_phase3 === '1')"
      :lat-lng="[-264, 44]"
      :icon="iconCB1N"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_sub_breaker1 }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else
      :lat-lng="[-264, 44]"
      :icon="iconCB1NF"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_sub_breaker1 }}
      </l-popup>
    </l-marker>

    <!-- MC ----------------------------------------------------------->
    <l-marker
      v-if="items.c_magnetic_contactor1 === '1'"
      :lat-lng="[-510, -50]"
      :icon="iconMCN"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_magnetic_contactor1 }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else
      :lat-lng="[-510, -50]"
      :icon="iconMCF"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_magnetic_contactor1 }}
      </l-popup>
    </l-marker>

    <!-- Line 1,2 ----------------------------------------------------------->
    <l-marker
      v-if="(items.c_magnetic_contactor1 === '0') && (items.line_detect1 === 1 || items.line_detect2 === 1)"
      :lat-lng="[-522, -170]"
      :icon="iconLine1F"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_magnetic_contactor1 }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else-if="(items.c_magnetic_contactor1 === '1') && (items.line_detect1 === 1 || items.line_detect2 === 1)"
      :lat-lng="[-522, -170]"
      :icon="iconLine1N"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_magnetic_contactor1 }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else
      :lat-lng="[-522, -170]"
      :icon="iconLine1B"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_magnetic_contactor1 }}
      </l-popup>
    </l-marker>
    <!-- Line 3,4 ----------------------------------------------------------->
    <l-marker
      v-if="(items.c_magnetic_contactor1 === '0') && (items.line_detect3 === 1 || items.line_detect4 === 1)"
      :lat-lng="[-522, 174]"
      :icon="iconLine2F"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_magnetic_contactor1 }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else-if="(items.c_magnetic_contactor1 === '1') && (items.line_detect3 === 1 || items.line_detect4 === 1)"
      :lat-lng="[-522, 174]"
      :icon="iconLine2N"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_magnetic_contactor1 }}
      </l-popup>
    </l-marker>
    <l-marker
      v-else
      :lat-lng="[-522, 174]"
      :icon="iconLine2B"
    >
      <l-popup style="color:#ffffff; width: 2000px; font-size: 14px;">
        {{ items.value_magnetic_contactor1 }}
      </l-popup>
    </l-marker>
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
      bounds4: [[-930, 1330], [920, -1080]],
      iconSize: 64,
      crs: CRS.Simple,
      minZoom4: -1,
      deptid: '',
      items: [],

      // TFM
      iconTFMN: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/s1b.gif'),
        iconSize: [378, 360],
      }),
      iconTFMF: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/s1r.gif'),
        iconSize: [378, 360],
      }),
      // main_breaker
      iconMCBF: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/mcb-r1.gif'),
        iconSize: [290, 260],
      }),
      iconMCBN: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/mcb-1.gif'),
        iconSize: [290, 260],
      }),
      iconMCBNF: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/mcb-yn1.gif'),
        iconSize: [290, 260],
      }),
      iconPhoto4: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/Photo-DR.gif'),
        iconSize: [220, 179],
      }),
      iconPhotoMoon: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/Photo-N.gif'),
        iconSize: [220, 179],
      }),

      // --- MC -----------------------------------------------------------
      iconMCN: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/mc-on1.gif'),
        iconSize: [54, 80],
      }),
      iconMCF: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/mc-r1.gif'),
        iconSize: [54, 80],
      }),

      // --- CB1 -----------------------------------------------------------
      iconCB1N: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/cb9-l-1.gif'),
        iconSize: [232, 210],
      }),
      iconCB1F: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/cb9-l-r1.gif'),
        iconSize: [232, 210],
      }),
      iconCB1NF: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/cb9-l-y1.gif'),
        iconSize: [232, 210],
      }),

      // --- CB2 -----------------------------------------------------------
      iconCB2N: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/cb9-r-1.gif'),
        iconSize: [232, 202],
      }),
      iconCB2F: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/cb9-r-r1.gif'),
        iconSize: [232, 202],
      }),
      iconCB2NF: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/cb9-r-y1.gif'),
        iconSize: [232, 202],
      }),

      // --- Line 1 -----------------------------------------------------------
      iconLine1N: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/l-cb6-1.gif'),
        iconSize: [235, 210],
      }),
      iconLine1F: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/l-cb6-r1.gif'),
        iconSize: [235, 210],
      }),
      iconLine1B: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/l-cb6-r2-green.gif'),
        iconSize: [235, 210],
      }),
      // --- Line 2 -----------------------------------------------------------
      iconLine2N: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/r-cb6-1.gif'),
        iconSize: [235, 210],
      }),
      iconLine2F: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/r-cb6-r1.gif'),
        iconSize: [235, 210],
      }),
      iconLine2B: icon({
        iconUrl: require('@/assets/images/icons/semcontrol/0STW-3MCB-1PW-1CB-1MC-3TFM-2W-67/r-cb6-r2-green.gif'),
        iconSize: [235, 210],
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
      axios
        .post('/waySEMControlDetail', { wid: this.$route.query.wid })
        .then(response => {
          this.center = []
          this.waydetail = response.data[0].detail
          this.deptid = response.data[0].deptid
          this.type_name = response.data[0].type_name
          this.switch.semid = response.data[0].id
        })
        .catch(error => {
          console.log(error)
        })
    },
    getValueDiagram() {
      axios
        .post('/getDiagram3P', { wid: this.$route.query.wid })
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
