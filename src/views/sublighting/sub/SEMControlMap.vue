<template>
  <div>
    <b-row>
      <b-col
        class="mb-1"
      >
        <b-link
          style="font-size: 26px; color: #fff;"
          to="/"
        >
          <feather-icon
            style="margin-bottom: 5px;"
            size="34"
            icon="ArrowLeftIcon"
          /><span style="color: #00FF80;"> ไฟฟ้าส่องสว่าง: </span>{{ wayname }}
        </b-link>
      </b-col>
      <b-col
        lg="3"
        md="3"
        sm="12"
        class="text-sm-right"
        style="margin-bottom: 7px;"
      >
        <b-img
          v-if="(qrcode < 95 && qrcode > 99 || qrcode != 83)"
          src="@/assets/images/qrcode/black.jpeg"
          style="height: 70px; width: 70px;"
        />
        <b-img
          v-if="(qrcode >= 95 && qrcode <=99 || qrcode == 83)"
          :src="require(`@/assets/images/qrcode/${qrcode}.jpg`)"
          style="height: 70px; width: 70px;"
        />
      </b-col>
    </b-row>
    <!-- <b-col
      class="mb-1"
    >
      <b-link
        style="font-size: 26px; color: #fff;"
        to="/"
      >
        <feather-icon
          style="margin-bottom: 5px;"
          size="34"
          icon="ArrowLeftIcon"
        /><span style="color: #00FF80;"> ไฟฟ้าส่องสว่าง: </span> {{ wayname }}
      </b-link>
    </b-col>
    <b-col
      lg="3"
      md="3"
      sm="12"
      class="text-sm-right"
      style="margin-bottom: 7px;"
    >
      <b-img
        v-if="(qrcode < 95 && qrcode > 99 || qrcode != 13)"
        src="@/assets/images/qrcode/black.jpeg"
        style="height: 70px; width: 70px;"
      />
      <b-img
        v-if="(qrcode >= 95 && qrcode <=99 || qrcode == 13)"
        :src="require(`@/assets/images/qrcode/${qrcode}.jpg`)"
        style="height: 70px; width: 70px;"
      />
    </b-col> -->
    <b-row>
      <b-col
        lg="12"
        md="12"
      >
        <b-card style="background-color: rgb(255, 127, 96, 0.0); width: 100%; height: 610px; border: 2px solid #00B058; border-radius: 40px 4px 40px 4px;">
          <l-map
            ref="mymap"
            :zoom="zoom"
            :center="center"
            :options="{scrollWheelZoom:false, zoomControl: true, attributionControl:false}"
            style="width: 100%; height: 560px; z-index: 0"
          >
            <l-tile-layer :url="url" />
            <l-marker
              v-for="(marker, index) in markers"
              :key="'marker'+index"
              :ref="'marker'+index"
              :lat-lng="[marker.latitude, marker.longitude]"
              :options="{ autoClose: false, closeOnClick: false }"
              @click="getInfoLighting(marker.WayID, marker.detail, marker.Total, marker.wid, marker.semType, marker.alert, marker.ISNormal, marker.ISOnline, marker.equipment, marker.issueLinecheck, marker.issueCircuit , marker.phaseType)"
            >
              <div v-if="marker.issueLinecheck == null && marker.issueCircuit == null">
                <l-icon
                  v-if="marker.ISNormal == 'Offline'"
                  :icon-size="[28, 40]"
                  :icon-anchor="[16, 37]"
                  :icon-url="require('@/assets/images/icons/semcontrol1/Lighting.gif')"
                />
                <l-icon
                  v-if="marker.ISNormal == 'Online'"
                  :icon-size="[28, 40]"
                  :icon-anchor="[16, 37]"
                  :icon-url="require('@/assets/images/icons/light1.svg')"
                />
              </div>
              <div v-if="marker.issueLinecheck !== null && marker.issueCircuit !== null">
                <l-icon
                  v-if="marker.issueCircuit == 1 || marker.issueLinecheck == 1"
                  :icon-size="[28, 40]"
                  :icon-anchor="[16, 37]"
                  :icon-url="require('@/assets/images/icons/semcontrol1/Lighting.gif')"
                />
                <l-icon
                  v-if="marker.issueLinecheck == 0 && marker.issueCircuit == 0"
                  :icon-size="[28, 40]"
                  :icon-anchor="[16, 37]"
                  :icon-url="require('@/assets/images/icons/light1.svg')"
                />
                <l-icon
                  v-if="marker.ISOnline === 'Offline'"
                  :icon-size="[28, 40]"
                  :icon-anchor="[16, 37]"
                  :icon-url="require('@/assets/images/icons/semcontrol1/LightingRed.svg')"
                />
              </div>

              <l-popup
                ref="popup"
              >
                <div>
                  <span style="font-size: 17px; color:#fff;">ไฟฟ้าส่องสว่าง</span>
                  <b-table
                    class="table table-borderless"
                    style="background-color: hsl(0, 0%, 0%, 0); font-size: 14px;"
                    responsive="lg"
                    :items="itemsLighting"
                    :fields="fields"
                    small
                    stacked
                    foot-clone
                  >
                    <template
                      #cell(id)="data"
                      colspan="2"
                    >
                      <b-button
                        v-if="data.item.semType === 'nbiot_cab_pole_hm_3p'"
                        id="toggle-btn"
                        variant="success"
                        :to="`/semcontrol-detail?wid=${data.item.wid}&type=${data.item.equipment}`"
                      >
                        <span>ดูเพิ่มเติม</span>
                      </b-button>
                      <b-button
                        v-if="data.item.phaseType == '3p'"
                        id="toggle-btn"
                        variant="success"
                        :to="`/SEMNB-iotCab3P?wid=${data.item.wid}&type=${data.item.equipment}`"
                      >
                        <span>ดูเพิ่มเติม</span>
                      </b-button>
                      <b-button
                        v-if="data.item.semType === 'lora_lighting'"
                        id="toggle-btn"
                        variant="success"
                        :to="`/sem-detail?wid=${data.item.wid}&type=${data.item.equipment}`"
                      >
                        <span>ดูเพิ่มเติม</span>
                      </b-button>
                      <b-button
                        v-if="data.item.semType === 'nbiot_cab_lora'"
                        id="toggle-btn"
                        variant="success"
                        :to="{ path: `/nbiot-lora?wid=${data.item.wid}&type=${data.item.equipment}`}"
                      >
                        <span>ดูเพิ่มเติม</span>
                      </b-button>
                      <b-button
                        v-if="data.item.phaseType == '1p'"
                        id="toggle-btn"
                        variant="success"
                        :to="`/semcontrol-detail1?wid=${data.item.wid}&type=${data.item.equipment}`"
                      >
                        <span>ดูเพิ่มเติม</span>
                      </b-button>
                    </template>
                  </b-table>
                </div>
              </l-popup>
            </l-marker>
          </l-map>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
// import Hls from 'hls.js'
import {
  BRow, BCol, BTable, BButton, BLink, BCard, BImg,
} from 'bootstrap-vue'
import {
  LMap, LTileLayer, LMarker, LIcon, LPopup,
} from 'vue2-leaflet'
import axios from '@axios'
import L, { Icon } from 'leaflet'
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
    BButton,
    BLink,
    BCard,
    BImg,
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 12,
      center: [0, 0],
      waydetail: '',
      wayname: '',
      markers: [],
      video: '',
      check: false,
      camdesc: '',
      userData: JSON.parse(localStorage.getItem('userData')),
      itemsLighting: [],
      qrcode: null, // เพิ่มตัวแปร qrcode
      fields: [
        { key: 'detail', label: 'จุดติดตั้ง:' },
        { key: 'WayID', label: 'สายทาง:' },
        { key: 'id', label: '', class: 'text-center' },
      ],
      type_name: '',
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      // ทำ action ที่คุณต้องการเมื่อ path เปลี่ยน (แม้เป็น path เดิม)
      this.getMarkerLighting()
      this.qrcode = this.$route.query.DeptID
    },
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {
    this.qrcode = this.$route.query.DeptID
    this.getMarkerLighting()
    const map = this.$refs.mymap.mapObject
    map.addControl(new window.L.Control.Fullscreen())
  },
  methods: {
    getMarkerLighting() {
      axios
        .post('/getMarkerLightingSub', { DeptID: this.$route.query.DeptID, username: this.userData.username })
        .then(response => {
          this.zoom = response.data[0].mapzoom_master
          this.center = []
          this.center.push(response.data[0].latitude)
          this.center.push(response.data[0].longitude)
          this.waydetail = response.data[0].detail
          this.markers = response.data
          this.wayname = response.data[0].DeptName2
          this.type_name = response.data[0].type_name

          // เรียกใช้ fitMapToBounds หลังจากได้รับข้อมูลมาร์กเกอร์
          this.$nextTick(() => {
            this.fitMapToBounds()
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    // เพิ่มฟังก์ชัน fitMapToBounds เพื่อปรับ zoom และ center ของแผนที่
    fitMapToBounds() {
      if (this.markers.length > 0) {
        const map = this.$refs.mymap.mapObject

        // กรณีมีมาร์กเกอร์เพียงจุดเดียว
        if (this.markers.length === 1) {
          const lat = parseFloat(this.markers[0].latitude)
          const lng = parseFloat(this.markers[0].longitude)
          if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
            map.setView([lat, lng], 15, {
              animate: true,
              duration: 1,
            })
          }
        } else {
          // กรณีมีมาร์กเกอร์หลายจุด
          // เก็บค่าพิกัดต่ำสุดและสูงสุด
          let minLat = 90
          let maxLat = -90
          let minLng = 180
          let maxLng = -180
          let validMarkers = 0

          // วนลูปเพื่อหาค่าพิกัดต่ำสุดและสูงสุด
          this.markers.forEach((marker, index) => {
            const lat = parseFloat(marker.latitude)
            const lng = parseFloat(marker.longitude)

            // Log ข้อมูลของแต่ละมาร์กเกอร์เพื่อตรวจสอบ
            console.log(`Marker ${index + 1}:`, {
              id: marker.id,
              detail: marker.detail,
              latitude: marker.latitude,
              longitude: marker.longitude,
              isValidLat: !Number.isNaN(lat),
              isValidLng: !Number.isNaN(lng),
              parsedLat: lat,
              parsedLng: lng,
            })

            if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
              validMarkers += 1
              minLat = Math.min(minLat, lat)
              maxLat = Math.max(maxLat, lat)
              minLng = Math.min(minLng, lng)
              maxLng = Math.max(maxLng, lng)
            }
          })

          console.log(`จำนวนมาร์กเกอร์ทั้งหมด: ${this.markers.length}, มาร์กเกอร์ที่มีพิกัดถูกต้อง: ${validMarkers}`)
          console.log(`พิกัดต่ำสุด: [${minLat}, ${minLng}], พิกัดสูงสุด: [${maxLat}, ${maxLng}]`)

          // สร้าง bounds จากพิกัดต่ำสุดและสูงสุด
          const southWest = L.latLng(minLat, minLng)
          const northEast = L.latLng(maxLat, maxLng)
          const bounds = L.latLngBounds(southWest, northEast)

          // คำนวณระยะห่างของมาร์กเกอร์
          const latDiff = maxLat - minLat
          const lngDiff = maxLng - minLng
          console.log(`ระยะห่างละติจูด: ${latDiff}, ระยะห่างลองจิจูด: ${lngDiff}`)

          // คำนวณ zoom ที่เหมาะสมตามระยะห่างของมาร์กเกอร์
          // ถ้าระยะห่างน้อย ให้ซูมเข้ามากขึ้น
          let calculatedMaxZoom = 12
          if (latDiff < 0.02 && lngDiff < 0.02) {
            calculatedMaxZoom = 14 // ระยะห่างน้อยมาก ซูมเข้ามาก
          } else if (latDiff < 0.05 && lngDiff < 0.05) {
            calculatedMaxZoom = 13 // ระยะห่างน้อย ซูมเข้าปานกลาง
          }
          console.log(`คำนวณ maxZoom ได้: ${calculatedMaxZoom}`)

          // กำหนดค่า zoom เริ่มต้นที่ต่ำ
          const initialZoom = 10

          // ตั้งค่า view ก่อน
          map.setView([(minLat + maxLat) / 2, (minLng + maxLng) / 2], initialZoom, {
            animate: false,
          })

          // จากนั้นจึงปรับให้พอดีกับ bounds
          map.fitBounds(bounds, {
            padding: [100, 100], // ลด padding เป็น 100px
            maxZoom: calculatedMaxZoom, // ใช้ค่า maxZoom ที่คำนวณได้
            minZoom: 9, // เพิ่ม minZoom เป็น 9 เพื่อไม่ให้ซูมออกมากเกินไป
            animate: true,
            duration: 1,
          })
        }

        // อัพเดทค่า zoom และ center ใน data เพื่อให้ตรงกับค่าที่ปรับแล้ว
        setTimeout(() => {
          // ตรวจสอบว่า map object ยังคงมีอยู่และพร้อมใช้งาน
          if (map && map.getZoom && typeof map.getZoom === 'function'
              && map.getCenter && typeof map.getCenter === 'function') {
            this.zoom = map.getZoom()
            this.center = [map.getCenter().lat, map.getCenter().lng]
            // console.log(`Map fitted to bounds with zoom: ${this.zoom}, center: ${this.center}`)
          } else {
            console.warn('Map object is not available for getting zoom/center')
          }
        }, 1000)
      }
    },
    getInfoLighting(WayID, detail, Total, wid, semType, alert, ISNormal, ISOnline, equipment, issueLinecheck, issueCircuit, phaseType) {
      this.itemsLighting = []
      this.itemsLighting.push({
        WayID,
        detail,
        Total,
        wid,
        semType,
        alert,
        ISNormal,
        ISOnline,
        equipment,
        issueLinecheck,
        issueCircuit,
        phaseType,
      })
    },
  },
}
</script>

<style lang="scss" >
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
    background: rgba(36, 36, 36, 0.85);
    box-shadow: 0 3px 14px rgba(0,0,0,0.4);
    /* Green */
    border: 1px solid #00B058;
    border-radius: 12px 12px 12px 12px;
}

</style>
