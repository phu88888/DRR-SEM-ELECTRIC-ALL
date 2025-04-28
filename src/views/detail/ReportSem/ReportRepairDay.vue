<template>
  <div>
    <b-row>
      <b-col lg="12">
        <template>
          <b-card-code>
            <div>
              <b-link
                style="font-size: 26px; color: #fff;"
                :to="`/diagram?wid=${this.$route.query.wid}&type=${this.$route.query.type}`"
              >
                <feather-icon
                  style="margin-bottom: 5px;"
                  size="34"
                  icon="ArrowLeftIcon"
                /> <span style="font-size:20px; color: #ffffff; margin-top: -50px;">กราฟแสดงการซ่อมอุปกรณ์ (รายวัน)</span>
              </b-link>
            </div>
            <b-row>
              <b-col
                md="3"
                class="d-flex align-items-center justify-content-end"
              >
                <label style="padding-right:14px; font-size: 15px">จาก</label>
                <b-form-group style="padding-right:14px">
                  <flat-pickr
                    v-model="date.dateFrom"
                    class="form-control"
                    @input="getHistory"
                  />
                </b-form-group>
                <label style="padding-right:14px; font-size: 15px">ถึง</label>
                <b-form-group>
                  <flat-pickr
                    v-model="date.dateTo"
                    class="form-control"
                    @input="getHistory"
                  />
                </b-form-group>
              </b-col>
              <b-col
                md="4"
                class="text-sm-right mb-1"
              >
                <!-- <b-button
                  id="toggle-btn"
                  v-b-modal="'modalAdd'"
                  variant="primary"
                >
                  Add New
                </b-button> -->
              </b-col>
              <b-col
                md="4"
                class="d-flex align-items-center justify-content-start mb-1"
              >
                <label>ค้นหา</label>
                <b-input-group
                  size="sm"
                  style="padding-left:14px;"
                >
                  <b-form-input
                    id="filterInput"
                    v-model="filter"
                    type="search"
                    placeholder="Type to Search"
                    label-cols-sm="12"
                    label-cols-md="2"
                    label-cols-lg="2"
                  />
                  <b-input-group-append>
                    <b-button
                      :disabled="!filter"
                      @click="filter = ''"
                    >
                      ล้าง
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-col>
              <b-col
                md="1"
                class="text-sm-right mb-1"
              >
                <!-- <b-button
                  id="toggle-btn"
                  size="sm"
                  variant="warning"
                  @click="$refs.childref.getHistory(date)"
                >Report <feather-icon
                  class="text-light"
                  icon="ArrowDownIcon"
                  size="18"
                />
                </b-button> -->
                <b-button
                  id="toggle-btn"
                  v-b-modal="'modalReport'"
                  size="sm"
                  variant="primary"
                  @click="$refs.childref.getHistory(date)"
                >
                  Export PDF
                </b-button>
              </b-col>
              <b-col cols="12">
                <b-table
                  id="table"
                  responsive
                  :per-page="perPage"
                  :current-page="currentPage"
                  :items="items"
                  :fields="fields"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  :sort-direction="sortDirection"
                  :filter="filter"
                  :filter-included-fields="filterOn"
                  @filtered="onFiltered"
                />
              </b-col>

              <b-col
                cols="12"
              >
                <b-card-body class="d-flex justify-content-between flex-wrap pt-1">

                  <!-- page length -->
                  <b-form-group
                    label="Per Page"
                    label-cols="6"
                    label-align="left"
                    label-size="sm"
                    label-for="sortBySelect"
                    class="text-nowrap mb-md-0 mr-1"
                  >
                    <b-form-select
                      id="perPageSelect"
                      v-model="perPage"
                      size="sm"
                      inline
                      :options="pageOptions"
                    />
                  </b-form-group>

                  <!-- pagination -->
                  <div>
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="totalRows"
                      :per-page="perPage"
                      first-number
                      last-number
                      prev-class="prev-item"
                      next-class="next-item"
                      class="mb-0"
                    >
                      <template #prev-text>
                        <feather-icon
                          icon="ChevronLeftIcon"
                          size="18"
                        />
                      </template>
                      <template #next-text>
                        <feather-icon
                          icon="ChevronRightIcon"
                          size="18"
                        />
                      </template>
                    </b-pagination>
                  </div>
                </b-card-body>
              </b-col>
            </b-row>
          </b-card-code>
        </template>
      </b-col>
    </b-row>
    <ExportRepairDay
      ref="childref"
      style="font-size: 20px;"
    />
  </div>
</template>

<script>
/* eslint-disable global-require */
import {
  BRow, BCol, BTable, BFormGroup,
  BFormSelect, BPagination, BCardBody, BLink,
  BButton, BInputGroupAppend, BInputGroup, BFormInput, VBModal,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import Ripple from 'vue-ripple-directive'
// import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'
import 'leaflet/dist/leaflet.css'
import axios from '@axios'
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import ExportRepairDay from './ExportRepairDay.vue'

export default {
  components: {
    BRow,
    BCol,
    BTable,
    BFormGroup,
    BFormSelect,
    BPagination,
    BCardBody,
    BButton,
    BLink,
    BInputGroupAppend,
    BInputGroup,
    BFormInput,
    BCardCode,
    flatPickr,
    ExportRepairDay,
    // StatisticCardHorizontal,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      revenueGenerated: {},
      items: [],
      date: {
        wid: this.$route.query.wid,
        dateFrom: '',
        dateTo: '',
      },
      fields: [
        {
          key: 'date_time', label: 'วัน/เดือน/ปี', sortable: true, class: 'text-center',
        },
        {
          key: 'event', label: 'เหตุการณ์', sortable: true, class: 'text-center',
        },
      ],
      // --------history--------
      perPage: 25,
      pageOptions: [25, 50, 100],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      connect: [{
        Offline: 'non-connect', Online: 'connect',
      },
      {
        Offline: 'light-danger', Online: 'light-success',
      }],
      status: [{
        Offline: 'Offline', Online: 'Online', Trip: 'Trip',
      },
      {
        Offline: 'danger', Online: 'success', Trip: 'warning',
      }],
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    computedFields() {
      // If the user isn't an admin, filter out fields that require auth.
      if (this.userData.role === 'User') return this.fields.filter(field => !field.requiresAdmin)
      // If the user IS an admin, return all fields.
      return this.fields
    },
  },
  // created() {
  //   setInterval(() => {
  //     this.getHistory()
  //   }, 2000)
  // },
  mounted() {
    this.getHistory()
    this.setToday()
  },
  methods: {
    setToday() {
      const p = new Date()
      const month = (`0${p.getMonth() + 1}`).slice(-2)
      const date = 1
      const year = p.getFullYear()
      this.date.dateFrom = `${year}-${month}-${date}`
      this.date.dateTo = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    },
    getHistory() {
      axios
        .post('/reportProblem1Day', this.date)
        .then(response => {
          this.items = response.data
          this.totalRows = response.data.length
        })
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>

<style scoped lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
@import '@core/scss/vue/libs/vue-select.scss';
@import url('https://fonts.googleapis.com/css2?family=Sarabun&display=swap');

.table th{
  border: 1px solid #000000;
  text-align: left;
  padding: 8px;
}
.table td{
  border: 1px solid #000000;
  text-align: left;
  padding: 8px;
}
.vue2leaflet-map{
  &.leaflet-container{
    height: 325px;
  }
}
.leaflet-popup-content {
  margin: 10px 10px;
}
.leaflet-container a.leaflet-popup-close-button {
  padding: 0 0 0 0
}
</style>
