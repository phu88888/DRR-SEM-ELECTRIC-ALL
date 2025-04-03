<template>
  <b-modal
    id="modalHourlyPCU"
    title="ตารางข้อมูลนับรถ"
    size="xl"
    ok-title="ตกลง"
    ok-only
  >
    <div>
      <!-- TABLE -->
      <b-card>
        <b-row>
          <b-col
            lg="12"
            md="12"
          >
            <h3>ตารางนับรถรายชั่วโมง(PCU)</h3>
          </b-col>
          <b-col cols="12">
            <b-table
              responsive
              :per-page="perPage"
              :current-page="currentPage"
              :items="itemsPCU"
              :fields="fieldsPCU"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              :filter="filter"
              :filter-included-fields="filterOn"
              @filtered="onFiltered"
            >
              <template #cell(bike_pcu)="data">
                {{ data.item.bike_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
              </template>
              <template #cell(car_pcu)="data">
                {{ data.item.car_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
              </template>
              <template #cell(truck_pcu)="data">
                {{ data.item.truck_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
              </template>
              <template #cell(pickup_pcu)="data">
                {{ data.item.pickup_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
              </template>
              <template #cell(bus_pcu)="data">
                {{ data.item.bus_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
              </template>
              <template #cell(taxi_pcu)="data">
                {{ data.item.taxi_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
              </template>
              <template #cell(trailer_pcu)="data">
                {{ data.item.trailer_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
              </template>
              <template #cell(total_pcu)="data">
                {{ data.item.total_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
              </template>
            </b-table>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </b-modal>
</template>

<script>
import {
  BRow, BCol, BTable, BCard,
} from 'bootstrap-vue'
import axios from '@axios'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BTable,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      fieldsPCU: [
        {
          key: 'Period_Name',
          label: 'เวลา',
          sortable: true,
        },
        {
          key: 'bike_pcu',
          label: 'จักรยานยนต์',
          class: 'text-center',
        },
        {
          key: 'car_pcu',
          label: 'รถยนต์',
          class: 'text-center',
        },
        {
          key: 'truck_pcu',
          label: 'รถบรรทุก',
          class: 'text-center',
        },
        {
          key: 'pickup_pcu',
          label: 'รถกระบะ',
          class: 'text-center',
        },
        {
          key: 'bus_pcu',
          label: 'รถบัส',
          class: 'text-center',
        },
        {
          key: 'taxi_pcu',
          label: 'รถแท็กซี่',
          class: 'text-center',
        },
        {
          key: 'trailer_pcu',
          label: 'รถพ่วง',
          class: 'text-center',
        },
        {
          key: 'total_pcu',
          label: 'ทั้งหมด',
          class: 'text-center',
        },
        {
          key: 'speed_avg',
          label: 'ความเร็วเฉลี่ย',
          class: 'text-center',
        },
        {
          key: 'speed_max',
          label: 'ความเร็วสูงสุด',
          class: 'text-center',
        },
      ],
      items: [],
      itemsPCU: [],
      perPage: 100,
      pageOptions: [100],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      status: [{
        Online: 'ออนไลน์', Offline: 'ออฟไลน์',
      },
      {
        Online: 'success', Offline: 'danger',
      }],
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
      return this.fieldsSpeaker
    },
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {
  },
  methods: {
    getTableCountPCU(dateTo) {
      axios
        .post('/get-Count-Hourly-PCU-All', { location_id: this.$route.query.location_id, date_to: dateTo })
        .then(response => {
          this.itemsPCU = response.data
          this.totalRows = response.data.length
        })
        .catch(error => {
          console.log(error)
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

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
