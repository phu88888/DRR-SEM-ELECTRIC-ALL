<template>
  <div>
    <b-row>
      <b-col
        lg="6"
        md="12"
        sm="12"
        class="mb-1"
      >
        <b-link
          style="font-size: 26px; color: #fff;"
        >
          <!-- :to="`/lighting-sub?DeptID=${deptid}`" -->
          <feather-icon
            class="hidden"
            style="margin-bottom: 5px;"
            size="34"
            icon="ArrowLeftIcon"
          /> <span style="color: #00FF80;"> ไฟฟ้าส่องสว่าง: </span> {{ waydetail }}
        </b-link>
      </b-col>
      <b-col
        lg="3"
        md="4"
        sm="12"
        class="text-sm-right d-flex align-items-center justify-content-end"
      >
        <div class="mr-1">
          <b-link
            class="nav-link"
            variant="outline-primary"
            @click="showLogModal = true"
          >
            <feather-icon
              icon="FileTextIcon"
              size="24"
              style="color:aqua"
            />
            <span style="color:#ffffff"> Log</span>
          </b-link>
        </div>
        <div class="mr-1">
          <b-dropdown
            id="dropdown-right"
            right
            text="รายงาน"
            variant="primary"
            class="btn-icon"
          >
            <!-- รายงานการทำงานตู้ควบคุม -->
            <b-dropdown-item :href="`/reportsemcontroldaily1p?wid=${$route.query.wid}&imei=${items.imei}`">
              สรุปการทำงานตู้ควบคุม
            </b-dropdown-item>
            <b-dropdown-divider />
            <!-- รายงานการซ่อมปุกรณ์ -->
            <b-dropdown-item :href="`/reportrepair3year?wid=${$route.query.wid}&imei=${items.imei}`">
              สรุปการซ่อมอุปกรณ์
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </b-col>
      <b-col
        lg="3"
        md="8"
        sm="12"
        class="text-sm-right d-flex align-items-center justify-content-end"
      >
        <div class="mr-2">
          <span style="color: #00FFFF; font-size: 14px;">เลือกสายทาง:</span>
        </div>
        <div style="min-width: 150px;">
          <b-form-select
            v-model="selectedWay"
            :options="wayOptions"
            size="sm"
            style="background-color: #2c3e50; color: #00FF80; border: 1px solid #00FF80; width: 300px;"
            @change="onWayChange"
          />
        </div>
      </b-col>
    </b-row>
    <ModalLog4G
      v-if="showLogModal"
      :imei="String(items.imei)"
      :wid="$route.query.wid"
      :phase-type="items.phase_type || 'single'"
      @hidden="showLogModal = false"
      @diagram-opened="handleDiagramOpened"
    />
  </div>
</template>

<script>
/* eslint-disable global-require */
import {
  BRow, BCol, BLink, BDropdown, BDropdownItem, BDropdownDivider, BFormSelect,

  // BButton,
} from 'bootstrap-vue'
import axios from '@axios'
import Ripple from 'vue-ripple-directive'
import ModalLog4G from '@/views/detail/cardDB/ModalLog4G.vue'
/* eslint-disable global-require */
// import ModalStatusLighting from './ModalStatusLighting.vue'
// eslint-disable-next-line no-underscore-dangle

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BDropdown,
    BDropdownItem,
    BDropdownDivider,
    BFormSelect,
    ModalLog4G,
    // BButton,
    // ModalStatusLighting,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      showLogModal: false,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      waydetail: '',
      deptid: '',
      type_name: '',
      id: '',
      items: [],

      selectedWay: null,
      wayOptions: [
        { value: null, text: '-- เลือกสายทาง --' },
      ],

      ack: '',
      event: '',
    }
  },
  created() {
    // ดึงข้อมูลสายทางจาก API ก่อน
    this.fetchWayData()

    this.getCenterSem()
    this.getAlertFireAlarm()
    this.getValueDiagram()

    // ตั้งค่า selectedWay จาก query parameter ปัจจุบัน
    this.selectedWay = this.$route.query.wid || null
  },
  mounted() {
    this.interval = setInterval(() => {
      this.getAlertFireAlarm()
    }, 10000)
  },
  methods: {
    fetchWayData() {
      try {
        // ดึง deptid จาก localStorage
        const userData = JSON.parse(localStorage.getItem('userData'))
        const deptid = userData ? userData.deptid : null

        if (deptid) {
          // เรียก API เพื่อดึงข้อมูลสายทางล่าสุด
          axios.post('/GetSEMWayData-Electic', { deptid })
            .then(response => {
              if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                // บันทึกข้อมูลลงใน localStorage
                localStorage.setItem('wayData', JSON.stringify(response.data))

                // อัพเดท dropdown options
                this.updateWayOptions(response.data)
              } else {
                // ถ้าไม่มีข้อมูลจาก API ให้ใช้ข้อมูลจาก localStorage
                this.loadWayDataFromStorage()
              }
            })
            .catch(error => {
              console.error('Error fetching way data from API:', error)
              // ถ้าเรียก API ไม่สำเร็จ ให้ใช้ข้อมูลจาก localStorage
              this.loadWayDataFromStorage()
            })
        } else {
          // ถ้าไม่มี deptid ให้ใช้ข้อมูลจาก localStorage
          this.loadWayDataFromStorage()
        }
      } catch (error) {
        console.error('Error in fetchWayData:', error)
        this.loadWayDataFromStorage()
      }
    },

    updateWayOptions(wayData) {
      if (Array.isArray(wayData) && wayData.length > 0) {
        // สร้าง options สำหรับ dropdown
        this.wayOptions = [
          { value: null, text: '-- เลือกสายทาง --' },
          ...wayData.map(way => ({
            value: way.wid.toString(),
            text: way.detail,
            equipment: way.equipment,
          })),
        ]

        // ถ้ายังไม่มี wid ที่เลือกในปัจจุบัน ให้เลือกรายการแรก
        if (!this.selectedWay && wayData.length > 0) {
          this.selectedWay = wayData[0].wid.toString()
          // อัพเดท URL ด้วย wid และ equipment ของรายการแรก
          this.$router.push({
            query: {
              ...this.$route.query,
              wid: this.selectedWay,
              type: wayData[0].equipment,
            },
          })
        }
      }
    },

    loadWayDataFromStorage() {
      try {
        // ดึงข้อมูลสายทางจาก localStorage
        const wayData = localStorage.getItem('wayData')

        if (wayData) {
          const parsedWayData = JSON.parse(wayData)

          // อัพเดท dropdown options
          this.updateWayOptions(parsedWayData)
        }
      } catch (error) {
        console.error('Error loading way data from localStorage:', error)
      }
    },
    onWayChange(value) {
      if (value) {
        try {
          // ค้นหา equipment ของสายทางที่เลือก
          const wayData = JSON.parse(localStorage.getItem('wayData')) || []
          const selectedWayData = wayData.find(way => way.wid.toString() === value.toString())
          const equipment = selectedWayData ? selectedWayData.equipment : this.$route.query.type

          // อัพเดท URL และ query parameters
          const newQuery = {
            ...this.$route.query,
            wid: value,
            type: equipment,
          }

          this.$router.push({
            name: this.$route.name,
            query: newQuery,
          })

          // โหลดข้อมูลใหม่สำหรับสายทางที่เลือก
          this.getCenterSem()
          this.getValueDiagram()
        } catch (error) {
          console.error('Error in onWayChange:', error)
        }
      }
    },
    getAlertFireAlarm() {
      axios
        .post('/checkSemEventLog-Electic')
        .then(response => {
          if (response.data.lenght !== 0) {
            this.ack = response.data[0].ack
            this.event = response.data[0].event
            if (this.ack === 1) {
              this.closeAlert()
              this.playSound()
            }
          }
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          // console.log(error)
        })
    },
    getCenterSem() {
      axios
        .post('/waySEMControlDetail-Electic', { wid: this.$route.query.wid })
        .then(response => {
          this.waydetail = response.data[0].detail
          this.deptid = response.data[0].deptid
          this.type_name = response.data[0].type_name
          this.id = response.data[0].id
        })
        .catch(error => {
          console.log(error)
        })
    },
    getValueDiagram() {
      axios
        .post('/valueDiagram-Electic', { wid: this.$route.query.wid })
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

    handleDiagramOpened(data) {
      console.log('Diagram opened:', data.url, 'with title:', data.title)
      // Additional handling if needed
    },

  },
}
</script>

<style lang="scss">
</style>
