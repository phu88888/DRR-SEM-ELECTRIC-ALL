<template>
  <div>
    <b-card
      class="gradient-border-card-map"
      style="background-color:rgba(0, 0, 0, 0.6); color:#ffffff;"
    >
      <b-row>
        <b-col
          lg="12"
          md="12"
        >
          <l-map
            ref="mymap"
            :zoom="zoom"
            :center="center"
            :options="{scrollWheelZoom:false, zoomControl: true, attributionControl:false}"
            style="z-index: 0"
            @zoomend="handleZoom"
          >
            <l-tile-layer :url="url" />
            <l-marker
              v-for="(marker, index) in markers"
              :key="'marker'+index"
              :ref="'marker'+index"
              :lat-lng="[marker.latitude, marker.longitude]"
              :options="{ autoClose: false, closeOnClick: false, riseOnHover: true }"
              @click="getInfoCount(marker.road_code, marker.road_name, marker.max_pcu, marker.max_aadt, marker.location_id)"
            >
              <!-- North Region -->
              <l-icon
                v-if="['เชียงใหม่', 'เชียงราย', 'ลำปาง', 'ลำพูน', 'แม่ฮ่องสอน', 'น่าน', 'พะเยา', 'แพร่'].includes(marker.province)"
                :icon-size="getIconSize"
                :icon-anchor="getAnchorPoint"
                :icon-url="require('@/assets/images/icons/marker/province1.png')"
              />
              <!-- Northeast Region -->
              <l-icon
                v-if="['กาฬสินธุ์', 'ขอนแก่น', 'ชัยภูมิ', 'นครพนม', 'นครราชสีมา', 'บึงกาฬ', 'บุรีรัมย์', 'มหาสารคาม', 'มุกดาหาร', 'ยโสธร', 'ร้อยเอ็ด', 'เลย', 'ศรีสะเกษ', 'สกลนคร', 'สุรินทร์', 'หนองคาย', 'หนองบัวลำภู', 'อำนาจเจริญ', 'อุดรธานี', 'อุบลราชธานี'].includes(marker.province)"
                :icon-size="getIconSize"
                :icon-anchor="getAnchorPoint"
                :icon-url="require('@/assets/images/icons/marker/province2.png')"
              />
              <!-- Central Region -->
              <l-icon
                v-if="['กรุงเทพมหานคร', 'กำแพงเพชร', 'ชัยนาท', 'นครนายก', 'นครปฐม', 'นครสวรรค์', 'นนทบุรี', 'ปทุมธานี', 'พระนครศรีอยุธยา', 'พิจิตร', 'พิษณุโลก', 'เพชรบูรณ์', 'ลพบุรี', 'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระบุรี', 'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'อ่างทอง', 'อุทัยธานี'].includes(marker.province)"
                :icon-size="getIconSize"
                :icon-anchor="getAnchorPoint"
                :icon-url="require('@/assets/images/icons/marker/province3.png')"
              />
              <!-- East Region -->
              <l-icon
                v-if="['จันทบุรี', 'ฉะเชิงเทรา', 'ชลบุรี', 'ตราด', 'ปราจีนบุรี', 'ระยอง', 'สระแก้ว'].includes(marker.province)"
                :icon-size="getIconSize"
                :icon-anchor="getAnchorPoint"
                :icon-url="require('@/assets/images/icons/marker/province4.png')"
              />
              <!-- West Region -->
              <l-icon
                v-if="['กาญจนบุรี', 'ตาก', 'ประจวบคีรีขันธ์', 'เพชรบุรี', 'ราชบุรี'].includes(marker.province)"
                :icon-size="getIconSize"
                :icon-anchor="getAnchorPoint"
                :icon-url="require('@/assets/images/icons/marker/province5.png')"
              />
              <!-- South Region -->
              <l-icon
                v-if="['กระบี่', 'ชุมพร', 'ตรัง', 'นครศรีธรรมราช', 'นราธิวาส', 'ปัตตานี', 'พังงา', 'พัทลุง', 'ภูเก็ต', 'ยะลา', 'ระนอง', 'สงขลา', 'สตูล', 'สุราษฎร์ธานี'].includes(marker.province)"
                :icon-size="getIconSize"
                :icon-anchor="getAnchorPoint"
                :icon-url="require('@/assets/images/icons/marker/province6.png')"
              />

              <l-popup
                ref="popup"
              >
                <b-table
                  class="table table-borderless"
                  style="background-color: hsl(0, 0%, 0%, 0); font-size: 14px;"
                  responsive="lg"
                  :items="itemsCount"
                  :fields="fields"
                  small
                  stacked
                  foot-clone
                >
                  <!-- <template #cell(connect)="data">
                        <b-badge
                          :variant="connect[1][data.value]"
                          style="font-size: 13px;"
                        >
                          {{ connect[0][data.value] }}
                        </b-badge>
                      </template> -->
                  <template #cell(location_id)="data">
                    <b-link
                      id="toggle-btn"
                      variant="outline-info"
                      target="_blank"
                      :to="`/report?location_id=${data.item.location_id}`"
                    >
                      <span style="color: #000000; filter: drop-shadow(1px 1px 1px rgba(0, 190, 255,0.5)); font-size: 16px;">ดูเพิ่มเติม</span>
                    </b-link>
                  </template>
                </b-table>
              </l-popup>
            </l-marker>
          </l-map>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
/* eslint-disable global-require */
import {
  BRow, BCol, BTable, BCard, BLink,
  // BBadge, BImg,
} from 'bootstrap-vue'
import {
  LMap, LTileLayer, LMarker, LIcon, LPopup,
} from 'vue2-leaflet'
import axios from '@axios'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
import 'leaflet-fullscreen/dist/Leaflet.fullscreen'
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
    BRow,
    BCol,
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup,
    BTable,
    // BBadge,
    // BImg,
    BLink,
    BCard,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 6,
      currentZoom: 6,
      baseIconSize: [42, 50],
      center: [],
      waydetail: '',
      markers: [],
      // camdesc: '',
      // vms_connect: '',
      // anydesk: '',
      // anydesk1: '',
      // deptid: '',
      itemsCount: [],
      fields: [
        { key: 'road_code', label: 'สายทาง:', class: 'text-center' },
        { key: 'road_name', label: 'จุดติดตั้ง:', class: 'text-center' },
        { key: 'max_pcu', label: 'max pcu:', class: 'text-center' },
        { key: 'max_aadt', label: 'aadt:', class: 'text-center' },
        { key: 'location_id', label: '', class: 'text-center' },
      ],
      // owner: '',
    }
  },
  computed: {
    getIconSize() {
      const baseSize = this.baseIconSize
      // eslint-disable-next-line no-restricted-properties
      const zoomRatio = Math.pow(1.1, this.currentZoom - this.zoom)
      return [
        Math.max(25, Math.min(baseSize[0] * zoomRatio, 84)),
        Math.max(30, Math.min(baseSize[1] * zoomRatio, 100)),
      ]
    },
    getAnchorPoint() {
      const iconSize = this.getIconSize
      return [iconSize[0] / 2, iconSize[1]]
    },
  },
  created() {
    this.center = [13.7563, 100.5018] // ตั้งค่าเริ่มต้น
    this.getMarkerVMS() // เรียกโหลดข้อมูล markers
  },

  async mounted() {
    const map = this.$refs.mymap.mapObject
    map.addControl(new window.L.Control.Fullscreen())
    this.currentZoom = this.zoom

    // รอให้ markers โหลดเสร็จก่อน
    await this.getMarkerVMS()

    // ตรวจสอบว่ามี markers จริงๆ
    if (this.markers && this.markers.length > 0) {
      console.log('Markers loaded:', this.markers.length)
      this.center = this.calculateMapCenter()
    } else {
      console.log('No markers found')
    }
  },
  methods: {
    handleZoom(e) {
      this.currentZoom = e.target.getZoom()
    },
    async getMarkerVMS() {
      try {
        const response = await axios.post('/marker-Province-All')
        this.markers = response.data.filter(marker => marker.latitude && marker.longitude
        && marker.latitude !== null && marker.longitude !== null
        && marker.latitude !== '' && marker.longitude !== '')
        return this.markers // return markers เพื่อให้รู้ว่า Promise สำเร็จ
      } catch (error) {
        console.log(error)
        return [] // return array ว่างถ้าเกิด error
      }
    },

    // ส่วน methods อื่นๆ คงเดิม
    calculateMapCenter() {
      if (!this.markers || this.markers.length === 0) {
        return [13.7563, 100.5018]
      }

      const sumLat = this.markers.reduce((sum, marker) => sum + parseFloat(marker.latitude), 0)
      const sumLng = this.markers.reduce((sum, marker) => sum + parseFloat(marker.longitude), 0)

      return [
        sumLat / this.markers.length,
        sumLng / this.markers.length,
      ]
    },
    // eslint-disable-next-line camelcase
    getInfoCount(road_code, road_name, max_pcu, max_aadt, location_id) {
      this.itemsCount = []
      this.itemsCount.push({
        road_code,
        road_name,
        max_pcu,
        max_aadt,
        location_id,
      })
    },
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-flatpicker.scss';
  .vue2leaflet-map {
      &.leaflet-container{
      width: 100%;
      height: 735px;
      }
  }
  .leaflet-popup-content {
    margin: 10px 10px;
    width: 250px;
    height: 100%;
  }
  .leaflet-container a.leaflet-popup-close-button {
    padding: 0 0 0 0
  }
  .leaflet-popup-content-wrapper,
.leaflet-popup-tip {
    background: rgba(229, 229, 229, 0.85);
    box-shadow: 0 3px 14px rgba(0,0,0,0.4);
    /* Green */
    border: 1px solid #1354A2;
    border-radius: 12px 12px 12px 12px;
}
.gradient-border-card-map {
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border: none !important;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  position: relative;
}

/* สร้าง pseudo-element เพื่อทำ gradient border */
.gradient-border-card-map::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  padding: 2px; /* ความหนาของ border */
  background: linear-gradient(0.25turn, #40BAB2, #1F7D53, #803C31);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

</style>
