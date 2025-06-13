<template>
  <div>
    <b-row>
      <b-col
        cols="6"
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
        cols="3"
        class="text-sm-right d-flex align-items-center justify-content-end"
      >
        <div class="mr-1">
          <b-link
            v-b-modal="'Log'"
            class="nav-link"
            variant="outline-primary"
            @click="$refs.Log.getTableNBIoTLog(items.imei)"
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
            <b-dropdown-item :href="`/reportsemcontrol3day?wid=${this.$route.query.wid}&type=${this.$route.query.type}`">
              สรุปการทำงานตู้ควบคุมรายวัน
            </b-dropdown-item>
            <b-dropdown-item :href="`/reportsemcontrol3month?wid=${this.$route.query.wid}&type=${this.$route.query.type}`">
              สรุปการทำงานตู้ควบคุมรายเดือน
            </b-dropdown-item>
            <b-dropdown-item :href="`/reportsemcontrol3year?wid=${this.$route.query.wid}&type=${this.$route.query.type}`">
              สรุปการทำงานตู้ควบคุมรายปี
            </b-dropdown-item>
            <b-dropdown-divider />
            <!-- รายงานการซ่อมปุกรณ์ -->
            <b-dropdown-item :href="`/reportrepair3day?wid=${this.$route.query.wid}&type=${this.$route.query.type}`">
              สรุปการซ่อมอุปกรณ์รายวัน
            </b-dropdown-item>
            <b-dropdown-item :href="`/reportrepair3month?wid=${this.$route.query.wid}&type=${this.$route.query.type}`">
              สรุปการซ่อมอุปกรณ์รายเดือน
            </b-dropdown-item>
            <b-dropdown-item :href="`/reportrepair3year?wid=${this.$route.query.wid}&type=${this.$route.query.type}`">
              สรุปการซ่อมอุปกรณ์รายปี
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </b-col>
      <b-col
        cols="3"
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
    <modalLog
      ref="Log"
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
import modalLog from './modalLog.vue'
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
    modalLog,
    // BButton,
    // ModalStatusLighting,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      waydetail: '',
      deptid: '',
      type_name: '',
      id: '',
      items: [],

      selectedWay: null,
      wayOptions: [
        { value: null, text: '-- เลือกสายทาง --' },
        { value: '2244', text: 'สายทาง 2244' },
        { value: '2112', text: 'สายทาง 2112' },
      ],

      ack: '',
      event: '',
    }
  },
  created() {
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
    onWayChange(value) {
      if (value) {
        // อัพเดท URL และ query parameters
        const newQuery = {
          ...this.$route.query,
          wid: value,
        }
        this.$router.push({
          name: this.$route.name,
          query: newQuery,
        })

        // โหลดข้อมุลใหม่สำหรับสายทางที่เลือก
        this.getCenterSem()
        this.getValueDiagram()
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

  },
}
</script>

<style lang="scss">
</style>
