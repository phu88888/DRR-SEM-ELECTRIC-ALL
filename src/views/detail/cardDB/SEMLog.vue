<template>
  <div>
    <b-row>
      <b-col
        cols="8"
        class="d-flex align-items-center justify-content-end mb-1"
      >
        <ColorScale1 style="margin-right: 5%;" />
        <span style="color:#ffffff; font-size: 22px;">
          แจ้งเตือนเหตุการณ์ในระบบ
        </span>
        <ColorScale2 style="margin-left: 3rem;" />
      </b-col>
      <b-col
        cols="4"
        class="d-flex align-items-center justify-content-end mb-1"
      >
        <a>
          <b-button
            :to="{ path: `/semcontrol3p-problem?wid=${$route.query.wid}&type=${this.$route.query.type}`}"
            variant="danger"
            class="btn-icon dark-red-btn"
            style="height:auto;"
          >
            <feather-icon
              icon="InfoIcon"
              size="24"
              class="mr-1"
            />
            <label style="color:white; font-size: 14px;">บันทึกข้อมูลไฟฟ้าขัดข้อง</label>
          </b-button>
        </a>
      </b-col>
    </b-row>
    <b-card
      class="log-gradient-border-card"
      style="background-color: rgb(0, 0, 0, 0.8); width: 100%; height: auto;"
    >
      <b-row style="padding-top:10px;">
        <b-col
          cols="12"
        >
          <b-table
            class="custom-table"
            responsive
            :items="items"
            :fields="fields"
            thead-class="hidden_header"
          >
            <template
              #cell(icon)="data"
              class="icon"
            >
              <b-img
                :src="require('@/assets/images/icons/' + data.value + '.png')"
                height="32px"
              />
            </template>
            <template
              #cell(lastupdate)="data"
              class="icon"
            >
              <span style="color: #ffffff;">{{ data.value }}</span>
            </template>
            <template #cell(event_status)="data">
              <b-badge
                :variant="event_status[1][data.value]"
                style="font-size: 13px;"
              >
                {{ event_status[0][data.value] }}
              </b-badge>
            </template>
          </b-table>
        </b-col>
      </b-row>
      <!-- <hr style="border-top: 1px solid #ffffff; margin:0"> -->
    </b-card>
  </div>

</template>

<script>
import {
  BCard, BRow, BCol, BTable, BImg, BButton, BBadge,
} from 'bootstrap-vue'
import axios from '@axios'

import ColorScale1 from '@/views/detail/cardDB/ColorScale1.vue'
import ColorScale2 from '@/views/detail/cardDB/ColorScale2.vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    BButton,
    BImg,
    BBadge,

    ColorScale1,
    ColorScale2,
  },
  data() {
    return {
      ack: '',
      event: '',
      items: [],
      fields: [
        { key: 'icon', class: 'text-right' },
        { key: 'lastupdate', class: 'text-left' },
        { key: 'event', class: 'text-left' },
        { key: 'event_status', class: 'text-center' },
      ],
      event_status: [{
        down: 'Down ⬇', up: '⬆ Up',
      },
      {
        down: 'danger', up: 'success',
      }],
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {
    this.getSemEvent()
    this.interval = setInterval(() => {
      this.getSemEvent()
    }, 10000)
  },
  methods: {
    getSemEvent() {
      axios
        .post('/getSem1EventLog', { wid: this.$route.query.wid })
        .then(response => {
          this.items = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },

  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.hidden_header {
  display: none;
}
.table-responsive{
   font-size: 14px;
}
.table th{
   padding: 0.72rem;
}
.table td{
   padding: 0.72rem;
}

/* Custom button variant danger */
.dark-red-btn.btn-danger {
  background-color: #ec2525 !important; /* Dark red color */
  border-color: #700000 !important;
}

.dark-red-btn.btn-danger:hover {
  background-color: #cd5353 !important;
  border-color: #cd5353 !important;
}

.dark-red-btn.btn-danger:active, .dark-red-btn.btn-danger:focus {
  background-color: #600001 !important;
  border-color: #500000 !important;
  box-shadow: 0 0 0 0.2rem rgba(139, 0, 0, 0.5) !important;
}

.custom-table table {
  // width: 100%;
  border-collapse: separate!important;
  border-spacing: 0 10px!important;
}

/* Header Row Styling */
.custom-table thead th {
  background-color: #0d1b2a!important;
  color: #00b4d8!important;
  padding: 12px!important;
  text-align: left!important;
  font-weight: bold!important;

  border-top: 2px!important;
  border-bottom: 2px!important;
  border-right: 0px!important;
  border-left: 0px!important;
  border-style: solid!important;
  border-color: #40BAB2!important;
}

/* Rounded corners for header */
.custom-table thead th:first-child {
  border-top-left-radius: 10px!important;
  border-bottom-left-radius: 10px!important;

  // border-left: 2px!important;
  // border-style: solid!important;
  // border-color: #40BAB2!important;
  border: 2px solid #40BAB2 !important;
  border-right: 0px!important;
}

.custom-table thead th:nth-child(2) {
  border-style: solid!important;
  border-color: #40BAB2!important;
}

.custom-table thead th:nth-child(3) {
  border-style: solid!important;
  border-color: #40BAB2!important;
}

.custom-table thead th:nth-child(4) {
  border-style: solid!important;
  border-color: #40BAB2!important;
}

.custom-table thead th:nth-child(5) {
  border-style: solid!important;
  border-color: #40BAB2!important;
}

.custom-table thead th:last-child {
  border-top-right-radius: 10px!important;
  border-bottom-right-radius: 10px!important;

  border: 2px solid #40BAB2 !important;
  border-left: 0px!important;
  // border-right: 2px!important;
  // border-style: solid!important;
  // border-color: #40BAB2!important;
}

/* Body cells */
.custom-table td {
  background-color: rgb(55, 55, 55, 0.8)!important;
  padding: 10px!important;
  vertical-align: middle!important;
  border-top: 1px solid transparent!important;
  border-bottom: 1px solid transparent!important;

  border-top: 2px!important;
  border-bottom: 2px!important;
  border-right: 0px!important;
  border-left: 0px!important;
  border-style: solid!important;
  border-color: white!important;
}

/* Rounded corners for rows */
.custom-table tr td:first-child {
  border-top-left-radius: 20px!important;
  border-bottom-left-radius: 20px!important;

  // border-left: 2px!important;
  // border-style: solid!important;
  // border-color: white!important;
  border: 2px solid white !important;
  border-right: 0px!important;
}

.custom-table tr td:nth-child(2) {
  border-style: solid!important;
  border-color: white!important;
}

.custom-table tr td:nth-child(3) {
  border-style: solid!important;
  border-color: white!important;
}

.custom-table tr td:nth-child(4) {
  border-style: solid!important;
  border-color: white!important;
}

.custom-table tr td:nth-child(5) {
  border-style: solid!important;
  border-color: white!important;
}

.custom-table tr td:last-child {
  border-top-right-radius: 20px!important;
  border-bottom-right-radius: 20px!important;

  // border-right: 2px!important;
  // border-style: solid!important;
  // border-color: white!important;
  border: 2px solid white !important;
  border-left: 0px!important;
}

.log-gradient-border-card {
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border: none !important;
  width: 100%;
  height: 304px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}

/* สร้าง pseudo-element เพื่อทำ gradient border */
.log-gradient-border-card::before {
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
