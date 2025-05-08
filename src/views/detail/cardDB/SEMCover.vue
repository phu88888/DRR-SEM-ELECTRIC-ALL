<template>
  <div>
    <b-row>
      <b-col
        cols="9"
        class="mb-1"
      >
        <!-- <b-link
          style="font-size: 26px; color: #fff;"
          :to="`/lighting-sub?DeptID=${deptid}`"
        >
          <feather-icon
            style="margin-bottom: 5px;"
            size="34"
            icon="ArrowLeftIcon"
          /> <span style="color: #00FF80;"> ไฟฟ้าส่องสว่าง: </span> {{ waydetail }}
        </b-link> -->
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
    </b-row>
    <modalLog
      ref="Log"
    />
  </div>
</template>

<script>
/* eslint-disable global-require */
import {
  BRow, BCol, BLink, BDropdown, BDropdownItem, BDropdownDivider,
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
      zoom: 18,
      center: [0, 0],
      waydetail: '',
      deptid: '',
      lat: '',
      lng: '',
      type_name: '',
      items: [],
      itemsSemC: [],
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

      itemsSemD: [],
      fieldsSemD: [
        {
          key: 'pole', label: 'เสาที่:', class: 'text-center',
        },
        {
          key: 'phase1Volt', label: 'Volt Phase1:', class: 'text-center', tdClass: 'bg-light-warning',
        },
        {
          key: 'phase2Volt', label: 'Phase2:', class: 'text-center', tdClass: 'bg-light-warning',
        },
        {
          key: 'phase3Volt', label: 'Phase3:', class: 'text-center', tdClass: 'bg-light-warning',
        },
        {
          key: 'phase1Amp', label: 'AmpPhase1:', class: 'text-center', tdClass: 'bg-light-info',
        },
        {
          key: 'phase2Amp', label: 'Phase2:', class: 'text-center', tdClass: 'bg-light-info',
        },
        {
          key: 'phase3Amp', label: 'Phase3:', class: 'text-center', tdClass: 'bg-light-info',
        },
        { key: 'devstatus', label: 'สถานะ:', class: 'text-center' },
        { key: 'lastseen', label: 'อัพเดท:', class: 'text-center' },
      ],
      StatusSemD: [{
        ปกติ: 'ปกติ', ดับ: 'ดับ',
      },
      {
        ปกติ: 'success', ดับ: 'danger',
      }],

      itemsSemBox1: [],
      itemsSemBox2: [],
      itemsSemBox3: [],
      fieldsSemBox: [
        {
          key: 'watt', label: 'Watt:', tdClass: 'bg-light-warning',
        },
        {
          key: 'kwh', label: 'Kwh:', tdClass: 'bg-light-warning',
        },
        {
          key: 'hz', label: 'Hz:', tdClass: 'bg-light-warning',
        },
        {
          key: 'pf', label: 'Pf:', tdClass: 'bg-light-warning',
        },
      ],
      StatusSemBox: [{
        ปกติ: 'ปกติ', ติดต่อไม่ได้: 'ติดต่อไม่ได้',
      },
      {
        ปกติ: 'success', ติดต่อไม่ได้: 'danger',
      }],
      visible: [],
      ack: '',
    }
  },
  created() {
    this.getCenterSem()
    this.getAlertFireAlarm()
    this.getValueDiagram()
  },
  mounted() {
    this.interval = setInterval(() => {
      this.getAlertFireAlarm()
    }, 10000)
  },
  methods: {
    getAlertFireAlarm() {
      axios
        .post('/checkSemEventLog')
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
        .post('/waySEMControlDetail', { wid: this.$route.query.wid })
        .then(response => {
          this.center = []
          this.zoom = response.data[0].mapzoom
          this.center.push(response.data[0].latitude)
          this.center.push(response.data[0].longitude)
          this.waydetail = response.data[0].detail
          this.deptid = response.data[0].deptid
          this.type_name = response.data[0].type_name
        })
        .catch(error => {
          console.log(error)
        })
    },
    getValueDiagram() {
      axios
        .post('/valueDiagram', { wid: this.$route.query.wid })
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
