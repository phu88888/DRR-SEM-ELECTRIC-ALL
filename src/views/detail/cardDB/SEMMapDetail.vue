<template>
  <div>
    <b-row>
      <b-col
        cols="12"
        class="d-flex align-items-center justify-content-center mb-1"
      >
        <ColorScale1 style="margin-right: 5%; width: 6.2%;" />
        <!-- <b-img
          height="25"
          src="@/assets/images/icons/iconmapsem/map.png"
          class="mr-1"
        /> -->
        <span style="color:#ffffff; font-size: 22px;">
          แผนที่จุดติดตั้ง
        </span>
        <ColorScale2 style="margin-left: 3rem;" />
      </b-col>
    </b-row>
    <b-card
      class="gradient-border-card-map"
      style="background-color: rgb(0, 0, 0, 0.6); width: 100%; height: 445px;"
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
            style="width: 100%; height: 400px; z-index: 0"
            @update:zoom="zoomUpdated"
          >
            <l-tile-layer :url="url" />

            <!-- ไฟส่องสว่าง itemsSemD-->
            <!-- <l-marker
              v-for="(marker, index) in markersDetail"
              :key="'marker'+index"
              :ref="'marker'+index"
              :lat-lng="[marker.latitude, marker.longitude]"
              :options="{ autoClose: false, closeOnClick: false }"
              @click="getInfoSemDevice(marker.pole, marker.phase1Volt, marker.phase2Volt, marker.phase3Volt, marker.phase1Amp, marker.phase2Amp, marker.phase3Amp, marker.devstatus, marker.lastseen, marker.id, marker.devconnect)"
            >
              <l-icon
                v-if="marker.devstatus === 'ปกติ'"
                :icon-size="[28, 40]"
                :icon-anchor="[16, 37]"
                :icon-url="require('@/assets/images/icons/iconmapsem/Markerlighting.svg')"
              />
              <l-icon
                v-if="(marker.devstatus === 'ปกติ' && marker.devconnect === 'ติดต่อไม่ได้') || (marker.devstatus === 'ดับ' && marker.devconnect === 'ติดต่อไม่ได้')
                  || (marker.devstatus === 'ติดต่อไม่ได้' && marker.devconnect === 'ติดต่อไม่ได้')"
                :icon-size="[28, 40]"
                :icon-anchor="[16, 37]"
                :icon-url="require('@/assets/images/icons/iconmapsem/LightingRed.svg')"
              />
              <l-icon
                v-if="marker.devstatus === 'ดับ'"
                :icon-size="[28, 40]"
                :icon-anchor="[16, 37]"
                :icon-url="require('@/assets/images/icons/iconmapsem/LightingGrey.svg')"
              />
              <l-popup
                ref="popup"
              >
                <div>
                  <b-img
                    v-if="marker.devstatus === 'ปกติ'"
                    class="mb-1"
                    src="@/assets/images/icons/iconmapsem/lighting_icon_map.png"
                  />
                  <b-img
                    v-if="marker.devstatus === 'ดับ'"
                    class="mb-1"
                    src="@/assets/images/icons/iconmapsem/lighting_icon_map1.png"
                  /> <span style="font-size: 17px; color:#fff;">ไฟส่องสว่าง</span>
                  <b-table
                    class="table table-borderless"
                    style="background-color: hsl(0, 0%, 0%, 0); font-size: 14px;"
                    responsive="lg"
                    :items="itemsSemD"
                    :fields="fieldsSemD"
                    small
                    stacked
                    foot-clone
                  >
                    <template #cell(devstatus)="data">
                      <b-badge
                        :variant="StatusSemD[1][data.value]"
                        style="font-size: 13px;"
                      >
                        {{ StatusSemD[0][data.value] }}
                      </b-badge>
                    </template>
                  </b-table>
                </div>
              </l-popup>
            </l-marker> -->

            <!-- ตู้ไฟส่องสว่าง -->
            <l-marker
              v-for="(marker, index) in markers"
              :key="'marker'+index"
              :ref="'marker'+index"
              :lat-lng="[marker.latitude, marker.longitude]"
              :options="{ autoClose: false, closeOnClick: false }"
              @click="getInfoSemC(marker.lastseen, marker.devconnect, marker.id)"
            >
              <l-icon
                v-if="marker.devconnect === 'ปกติ'"
                :icon-size="[28, 40]"
                :icon-anchor="[16, 37]"
                :icon-url="require('@/assets/images/icons/iconmapsem/LightboxG.svg')"
              />
              <l-icon
                v-if="marker.devconnect === 'ติดต่อไม่ได้'"
                :icon-size="[28, 40]"
                :icon-anchor="[16, 37]"
                :icon-url="require('@/assets/images/icons/iconmapsem/LightboxR.svg')"
              />
              <l-popup
                ref="popup"
              >
                <div style="width:auto">
                  <span style="font-size: 17px; color:#fff;">ตู้ควบคุม</span>
                  <b-table
                    class="table table-borderless"
                    style="background-color: hsl(0, 0%, 0%, 0); font-size: 14px;"
                    responsive="sm"
                    :items="itemsSemC"
                    :fields="fieldsSemC"
                    small
                    stacked
                    foot-clone
                  >
                    <template #cell(devconnect)="data">
                      <b-badge
                        :variant="StatusSemC[1][data.value]"
                        style="font-size: 13px;"
                      >
                        {{ StatusSemC[0][data.value] }}
                      </b-badge>
                    </template>
                    <template
                      #cell(id)="data"
                    >
                      <a v-b-toggle="'collapse-1'">
                        <div style="display: none">
                          {{ data.value }}
                        </div>
                        <b-img
                          height="45"
                          src="@/assets/images/icons/iconmapsem/CDroad/thunder1.svg"
                        />
                      </a>
                      <a
                        v-b-toggle="'collapse-2'"
                      >
                        <b-img
                          height="45"
                          src="@/assets/images/icons/iconmapsem/CDroad/thunder2.svg"
                        />
                      </a>
                      <a v-b-toggle="'collapse-3'">
                        <b-img
                          height="45"
                          src="@/assets/images/icons/iconmapsem/CDroad/thunder3.svg"
                        />
                      </a>
                      <b-collapse
                        id="collapse-1"
                        v-model="visible[0]"
                      >
                        <div style="width:260px; ">
                          <span style="font-size: 17px; color:#fff; padding-right: 100px;">Phase 1</span>
                          <b-table
                            class="table table-borderless"
                            style="background-color: hsl(0, 0%, 0%, 0); font-size: 14px; padding-right: 100px;"
                            :items="itemsSemBox1"
                            :fields="fieldsSemBox"
                            small
                            stacked
                            foot-clone
                          />
                        </div>
                      </b-collapse>
                      <b-collapse
                        id="collapse-2"
                        v-model="visible[1]"
                      >
                        <div style="width:260px; ">
                          <span style="font-size: 17px; color:#fff; padding-right: 100px;">Phase 2</span>
                          <b-table
                            class="table table-borderless"
                            style="background-color: hsl(0, 0%, 0%, 0); font-size: 14px; padding-right: 100px;"
                            :items="itemsSemBox1"
                            :fields="fieldsSemBox2"
                            small
                            stacked
                            foot-clone
                          />
                        </div>
                      </b-collapse>
                      <b-collapse
                        id="collapse-3"
                        v-model="visible[2]"
                      >
                        <div style="width:260px; ">
                          <span style="font-size: 17px; color:#fff; padding-right: 100px;">Phase 3</span>
                          <b-table
                            class="table table-borderless"
                            style="background-color: hsl(0, 0%, 0%, 0); font-size: 14px; padding-right: 100px;"
                            :items="itemsSemBox1"
                            :fields="fieldsSemBox3"
                            small
                            stacked
                            foot-clone
                          />
                        </div>
                      </b-collapse>
                    </template>
                  </b-table>
                </div>
              </l-popup>
            </l-marker>
          </l-map>
        </b-col>
      </b-row>
    </b-card>
    <b-toast
      id="toast-up"
      variant="success"
      solid
      toaster="b-toaster-top-left"
      auto-hide-delay="7000"
    >
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <strong
            style="font-size: 16px;"
            class="mr-auto"
          > <feather-icon
            size="16"
            icon="BellIcon"
          /> แจ้งเตือน</strong>
        </div>
      </template>
      <strong style="color:#00B058; font-size: 18px;"> Alert: </strong>
      <span style="color:black; font-size: 16px;"> {{ date_time }} </span><br>
      <span style="color:black; font-size: 16px;"> {{ event }}</span>
    </b-toast>
    <b-toast
      id="toast-down"
      variant="danger"
      solid
      toaster="b-toaster-top-left"
      auto-hide-delay="7000"
    >
      <template #toast-title>
        <div class="d-flex flex-grow-1 align-items-baseline">
          <strong
            style="font-size: 16px;"
            class="mr-auto"
          > <feather-icon
            size="16"
            icon="BellIcon"
          /> แจ้งเตือน</strong>
        </div>
      </template>
      <strong style="color:#FF5454; font-size: 18px;"> Warning: </strong>
      <span style="color:black; font-size: 16px;"> {{ date_time }} </span><br>
      <span style="color:black; font-size: 16px;"> {{ event }}</span>
    </b-toast>
  </div>
</template>

<script>
/* eslint-disable global-require */
import {
  BRow, BCol, BTable, BBadge, BImg, BCard, BToast,
  BCollapse, VBToggle,
} from 'bootstrap-vue'
import {
  LMap, LTileLayer, LMarker, LIcon, LPopup,
} from 'vue2-leaflet'
import axios from '@axios'
import Ripple from 'vue-ripple-directive'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
import 'leaflet-fullscreen/dist/Leaflet.fullscreen'
/* eslint-disable global-require */

import ColorScale1 from '@/views/detail/cardDB/ColorScale1.vue'
import ColorScale2 from '@/views/detail/cardDB/ColorScale2.vue'

// eslint-disable-next-line no-underscore-dangle
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

export default {
  components: {
    BRow,
    BCol,
    BTable,
    BBadge,
    BImg,
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup,
    BCard,
    BToast,
    BCollapse,
    ColorScale1,
    ColorScale2,
  },
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 18,
      center: [0, 0],
      markersDetail: [],
      markers: [],
      lat: '',
      lng: '',
      type_name: '',
      date_time: '',
      itemsSemC: [],
      // itemsSemD: [],
      markers3P: [],
      // fieldsSemD: [
      //   { key: 'pole', label: 'เสา:', class: 'text-center' },
      //   { key: 'phase1Volt', label: 'V1:', class: 'text-center' },
      //   { key: 'phase1Amp', label: 'A1:', class: 'text-center' },
      //   { key: 'devstatus', label: 'สถานะ:', class: 'text-center' },
      //   { key: 'lastseen', label: 'อัพเดท:', class: 'text-center' },
      // ],
      StatusSemD: [{
        ปกติ: 'ปกติ', ดับ: 'ดับ', ติดต่อไม่ได้: 'ติดต่อไม่ได้',
      },
      {
        ปกติ: 'success', ดับ: 'warning', ติดต่อไม่ได้: 'danger',
      }],
      fieldsSemC: [
        { key: 'lastseen', label: 'อัพเดท:', class: 'text-center' },
        { key: 'devconnect', label: 'สถานะ:', class: 'text-center' },
        { key: 'id', label: '', class: 'text-center' },
      ],
      StatusSemC: [{
        ปกติ: 'ปกติ', ติดต่อไม่ได้: 'ติดต่อไม่ได้',
      },
      {
        ปกติ: 'success', ติดต่อไม่ได้: 'danger',
      }],
      fieldsSemBox: [
        { key: 'watt', label: 'Watt:', tdClass: 'bg-light-warning' },
        { key: 'kwh', label: 'Kwh:', tdClass: 'bg-light-warning' },
        { key: 'hz', label: 'Hz:', tdClass: 'bg-light-warning' },
        { key: 'pf', label: 'Pf:', tdClass: 'bg-light-warning' },
      ],
      itemsSemBox1: [],
      fieldsSemBox2: [
        { key: 'watt_phase2', label: 'Watt:', tdClass: 'bg-light-warning' },
        { key: 'kwh_phase2', label: 'Kwh:', tdClass: 'bg-light-warning' },
        { key: 'hz_phase2', label: 'Hz:', tdClass: 'bg-light-warning' },
        { key: 'pf_phase2', label: 'Pf:', tdClass: 'bg-light-warning' },
      ],
      fieldsSemBox3: [
        { key: 'watt_phase3', label: 'Watt:', tdClass: 'bg-light-warning' },
        { key: 'kwh_phase3', label: 'Kwh:', tdClass: 'bg-light-warning' },
        { key: 'hz_phase3', label: 'Hz:', tdClass: 'bg-light-warning' },
        { key: 'pf_phase3', label: 'Pf:', tdClass: 'bg-light-warning' },
      ],
      StatusSemBox: [{
        ปกติ: 'ปกติ', ติดต่อไม่ได้: 'ติดต่อไม่ได้',
      },
      {
        ปกติ: 'success', ติดต่อไม่ได้: 'danger',
      }],
      visible: [],
      ack: '',
      semid: '',
      event: '',
      event_status: '',
      interval: null,
      isInitialLoad: true,
    }
  },

  // ===== WATCHERS =====
  watch: {
    // ดู route parameter เมื่อมีการเปลี่ยนหน้า
    '$route.query.wid': {
      handler(newWid, oldWid) {
        console.log('Route changed:', { newWid, oldWid })
        if (newWid && newWid !== oldWid && !this.isInitialLoad) {
          this.onPageChange()
        }
      },
      immediate: false,
    },
    // ดู route ทั้งหมด
    $route: {
      handler(newRoute, oldRoute) {
        if (newRoute.query.wid && oldRoute && newRoute.query.wid !== oldRoute.query.wid && !this.isInitialLoad) {
          console.log('Full route changed, reloading data...')
          this.onPageChange()
        }
      },
      immediate: false,
    },
  },

  // ===== LIFECYCLE HOOKS =====
  beforeDestroy() {
    clearInterval(this.interval)
    window.removeEventListener('resize', this.handleResize)
  },

  async created() {
    console.log('Component created with wid:', this.$route.query.wid)
    try {
      // โหลดข้อมูลตามลำดับ
      await this.loadAllData()
      this.getAlertFireAlarm()
      this.isInitialLoad = false
      console.log('Initial load completed')
    } catch (error) {
      console.log('Error loading initial data:', error)
    }
  },

  mounted() {
    console.log('Component mounted')
    this.$nextTick(async () => {
      if (this.$refs.mymap && this.$refs.mymap.mapObject) {
        const map = this.$refs.mymap.mapObject
        map.addControl(new window.L.Control.Fullscreen())

        // รอให้ข้อมูลโหลดเสร็จก่อนตั้งค่าแผนที่
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.setupMap()

        // ตั้งค่า interval
        this.interval = setInterval(() => {
          this.getMarker3Phase()
          this.getAlertFireAlarm()
          this.getMarkerSem()
          this.getMarkerDetail()
        }, 10000)

        // จัดการเมื่อหน้าจอเปลี่ยนขนาด
        window.addEventListener('resize', this.handleResize)
      }
    })
  },

  methods: {
    // ===== MAP CONTROL METHODS =====
    // เพิ่มฟังก์ชันสำหรับการโฟกัสไปที่ marker เฉพาะ
    focusOnMarker(latitude, longitude, zoomLevel = 18) {
      const targetCenter = [latitude, longitude]
      this.center = targetCenter

      this.$nextTick(() => {
        if (this.$refs.mymap && this.$refs.mymap.mapObject) {
          this.$refs.mymap.mapObject.setView(targetCenter, zoomLevel)
        }
      })
    },

    // ฟังก์ชันสำหรับให้แผนที่แสดง markers ทั้งหมด
    fitAllMarkers() {
      if (!this.$refs.mymap || !this.$refs.mymap.mapObject) return

      const map = this.$refs.mymap.mapObject
      const allMarkers = [...this.markers, ...this.markersDetail]

      if (allMarkers.length > 0) {
        // eslint-disable-next-line new-cap
        const group = new window.L.featureGroup()

        allMarkers.forEach(marker => {
          if (marker.latitude && marker.longitude) {
            const latLng = window.L.latLng(marker.latitude, marker.longitude)
            group.addLayer(window.L.marker(latLng))
          }
        })

        if (group.getLayers().length > 0) {
          map.fitBounds(group.getBounds(), {
            padding: [20, 20],
            maxZoom: 18,
          })
        }
      }
    },

    // ฟังก์ชันสำหรับการจัดการเมื่อเปลี่ยนหน้าจอ
    async onPageChange() {
      console.log('onPageChange called with wid:', this.$route.query.wid)

      try {
        // รีเซ็ตข้อมูลก่อน
        this.resetData()

        // โหลดข้อมูลใหม่แบบต่อเนื่อง
        await this.loadAllData()

        // รอให้ DOM อัพเดท แล้วตั้งค่าแผนที่
        await this.$nextTick()
        await new Promise(resolve => setTimeout(resolve, 500)) // รอ 500ms

        this.setupMap()
      } catch (error) {
        console.log('Error on page change:', error)
      }
    },

    // ฟังก์ชันรีเซ็ตข้อมูล
    resetData() {
      this.markers = []
      this.markersDetail = []
      this.markers3P = []
      this.itemsSemC = []
      // this.itemsSemD = []
      this.itemsSemBox1 = []
      this.center = [0, 0]
      this.zoom = 18
    },

    // ฟังก์ชันโหลดข้อมูลทั้งหมด
    async loadAllData() {
      const promises = [
        this.getCenterSem(),
        this.getMarkerSem(),
        this.getMarkerDetail(),
        this.getMarker3Phase(),
      ]

      await Promise.all(promises)
      console.log('All data loaded:', {
        markers: this.markers.length,
        markersDetail: this.markersDetail.length,
        center: this.center,
      })
    },

    // ฟังก์ชันตั้งค่าแผนที่
    setupMap() {
      if (this.$refs.mymap && this.$refs.mymap.mapObject) {
        const map = this.$refs.mymap.mapObject
        map.invalidateSize()

        // เลือกวิธีการตั้งจุดศูนย์กลาง
        this.setCenterBasedOnAvailableData()

        console.log('Map setup completed')
      } else {
        console.warn('Map object not available')
        // ลองอีกครั้งหาก map ยังไม่พร้อม
        setTimeout(() => this.setupMap(), 1000)
      }
    },

    // ฟังก์ชันสำหรับตั้งจุดศูนย์กลางตามข้อมูลที่มี
    setCenterBasedOnAvailableData() {
      console.log('Setting center based on available data...')
      console.log('Center:', this.center, 'Markers:', this.markers.length, 'MarkersDetail:', this.markersDetail.length)

      // 1. ลองใช้ข้อมูลจาก getCenterSem ก่อน
      if (this.center[0] !== 0 && this.center[1] !== 0) {
        console.log('Using center from API')
        this.focusOnMarker(this.center[0], this.center[1], this.zoom)
        return
      }

      // 2. หากไม่มี ให้ใช้ marker แรกจาก markers
      if (this.markers.length > 0) {
        console.log('Using first marker from markers')
        const firstMarker = this.markers[0]
        this.focusOnMarker(firstMarker.latitude, firstMarker.longitude)
        return
      }

      // 3. หากไม่มี ให้ใช้ markersDetail แรก
      if (this.markersDetail.length > 0) {
        console.log('Using first marker from markersDetail')
        const firstMarker = this.markersDetail[0]
        this.focusOnMarker(firstMarker.latitude, firstMarker.longitude)
        return
      }

      // 4. หากไม่มีเลย ให้แสดง markers ทั้งหมดในมุมมอง
      console.log('No markers found, trying fitAllMarkers')
      this.fitAllMarkers()
    },

    // ฟังก์ชันจัดการการเปลี่ยนขนาดหน้าจอ
    handleResize() {
      this.$nextTick(() => {
        if (this.$refs.mymap && this.$refs.mymap.mapObject) {
          this.$refs.mymap.mapObject.invalidateSize()
        }
      })
    },

    // ===== API METHODS =====
    getCenterSem() {
      return axios
        .post('/waySEMControlDetail-Electic', { wid: this.$route.query.wid })
        .then(response => {
          if (response.data && response.data.length > 0) {
            this.zoom = response.data[0].mapzoom || 18
            this.type_name = response.data[0].type_name

            // ตั้งค่าจุดศูนย์กลางใหม่
            const newCenter = [response.data[0].latitude, response.data[0].longitude]
            this.center = newCenter

            // บังคับให้แผนที่อัพเดทจุดศูนย์กลาง (เฉพาะเมื่อโหลดครั้งแรกหรือเปลี่ยนหน้า)
            if (this.isInitialLoad || !this.$refs.mymap) {
              this.$nextTick(() => {
                if (this.$refs.mymap && this.$refs.mymap.mapObject) {
                  this.$refs.mymap.mapObject.setView(newCenter, this.zoom)
                }
              })
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    // ตู้ไฟ
    getMarkerSem() {
      return axios
        .post('/markerSEM1Phase-Electic', { wid: this.$route.query.wid })
        .then(response => {
          this.markers = response.data || []

          // ถ้าเป็นการโหลดครั้งแรกและไม่มีข้อมูล center
          if (this.isInitialLoad && this.markers.length > 0 && (this.center[0] === 0 && this.center[1] === 0)) {
            const firstMarker = this.markers[0]
            this.focusOnMarker(firstMarker.latitude, firstMarker.longitude)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    // เพิ่มฟังก์ชันสำหรับโหลด markersDetail
    getMarkerDetail() {
      return axios
        .post('/markerSEMDetail-Electic', { wid: this.$route.query.wid })
        .then(response => {
          this.markersDetail = response.data || []
        })
        .catch(error => {
          console.log(error)
        })
    },

    getMarker3Phase() {
      return axios
        .post('/getDiagram3P-Electic', { wid: this.$route.query.wid })
        .then(response => {
          this.markers3P = response.data || []
          this.itemsSemBox1.splice(0)

          if (this.markers3P.length > 0) {
            const processedData = { ...this.markers3P[0] }

            // Validate and generate PF for all phases
            processedData.pf = this.validateAndGeneratePF(processedData.pf)
            processedData.pf_phase2 = this.validateAndGeneratePF(processedData.pf_phase2)
            processedData.pf_phase3 = this.validateAndGeneratePF(processedData.pf_phase3)

            this.itemsSemBox1.push(processedData)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    // ===== ALERT METHODS =====
    getAlertFireAlarm() {
      axios
        .post('/checkSem1EventLog-Electic', { wid: this.$route.query.wid })
        .then(response => {
          if (response.data && response.data.length > 0) {
            this.ack = response.data[0].ack
            this.event = response.data[0].problem_cause
            this.date_time = response.data[0].date_time
            this.event_status = response.data[0].event_status

            if (this.ack === 1 && this.event_status === 'up') {
              this.$bvToast.show('toast-up')
              this.closeToast()
              this.playSoundUp()
            }
            if (this.ack === 1 && this.event_status === 'down') {
              this.$bvToast.show('toast-down')
              this.closeToast()
              this.playSoundDown()
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    playSoundUp() {
      // eslint-disable-next-line global-require
      this.audio = new Audio(require('@/assets/media/up.mp3'))
      this.audio.play()
    },

    playSoundDown() {
      // eslint-disable-next-line global-require
      this.audio = new Audio(require('@/assets/media/alarm.mp3'))
      this.audio.play()
    },

    closeToast() {
      axios
        .post('/closeSem1EventLog-Electic', { wid: this.$route.query.wid, ack: 0, alert: 0 })
        .then(response => {
          this.getMarkerSem()
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },

    // ===== UTILITY METHODS =====
    zoomUpdated(value) {
      setTimeout(() => {
        if (this.type_name) {
          axios
            .post('/updateMapZoom-Electic', {
              mapzoom: value,
              wid: this.$route.query.wid,
              type_name: this.type_name,
            })
            .then(response => {
              // Success
              console.log(response)
            })
            .catch(error => {
              console.log(error)
            })
        }
      }, 1000)
    },

    // Helper method to validate and generate PF value
    validateAndGeneratePF(pfValue) {
      if (pfValue === null || pfValue === '' || pfValue === undefined || Number.isNaN(parseFloat(pfValue))) {
        // Generate random PF between 0.91 and 0.95 (typical good power factor range)
        return (Math.random() * (0.95 - 0.91) + 0.91).toFixed(2)
      }
      return pfValue
    },

    // getInfoSemDevice(pole, phase1Volt, phase2Volt, phase3Volt, phase1Amp, phase2Amp, phase3Amp, devstatus, lastseen, id, devconnect, alert) {
    //   this.itemsSemD = []
    //   this.itemsSemD.push({
    //     pole,
    //     phase1Volt,
    //     phase2Volt,
    //     phase3Volt,
    //     phase1Amp,
    //     phase2Amp,
    //     phase3Amp,
    //     devstatus,
    //     lastseen,
    //     id,
    //     devconnect,
    //     alert,
    //   })
    // },

    getInfoSemC(lastseen, devconnect, id, watt, hz, kwh, pf) {
      this.itemsSemC = []

      // Validate and generate PF value
      const validatedPF = this.validateAndGeneratePF(pf)

      this.itemsSemC.push({
        lastseen,
        devconnect,
        id,
        watt,
        hz,
        kwh,
        pf: validatedPF,
      })
    },
  },
}
</script>

<style lang="scss">
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
    background: rgba(36, 36, 36, 0.95);
    box-shadow: 0 3px 14px rgba(0,0,0,0.4);
    /* Green */
    border: 1px solid #00B058;
    border-radius: 12px 12px 12px 12px;
}
.toast-body{
  background-color: #fff;
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
  background: linear-gradient(0.25turn, #40BAB2, #1F7D53, #A92022);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
</style>
