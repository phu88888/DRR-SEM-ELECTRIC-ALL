<template>
  <div>
    <!-- TABLE -->
    <b-link
      style="font-size: 26px; color: #fff;"
      :to="{ path: '/location'}"
    >
      <!-- target="_blank" -->
      <feather-icon
        style="margin-bottom: 10px;"
        size="34"
        icon="ArrowLeftIcon"
      />
    </b-link>
    <b-card>
      <b-row>
        <b-col
          lg="12"
          md="12"
        >
          <h3>ตารางนับรถรายวัน (คัน)</h3>
        </b-col>
        <b-col cols="12">
          <b-table
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
          >
            <template #cell(date_to)="data">
              <div>
                <b-link
                  v-b-modal="'modalHourly'"
                  class="mr-1"
                  style="color: #976900;"
                  @click="$refs.modalHourly.getTableCount(data.item.date_to)"
                >
                  {{ data.item.date_to }}
                </b-link>
              </div>
            </template>
            <template #cell(bike)="data">
              {{ data.item.bike.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </template>
            <template #cell(car)="data">
              {{ data.item.car.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </template>
            <template #cell(truck)="data">
              {{ data.item.truck.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </template>
            <template #cell(taxi)="data">
              {{ data.item.taxi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </template>
            <template #cell(pickup)="data">
              {{ data.item.pickup.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </template>
            <template #cell(trailer)="data">
              {{ data.item.trailer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </template>
            <template #cell(total)="data">
              {{ data.item.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-card>
    <!-- TABLE -->
    <b-card>
      <b-row>
        <b-col
          lg="12"
          md="12"
        >
          <h3>ตารางนับรถรายวัน (PCU)</h3>
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
            <template #cell(date_to)="data">
              <div>
                <b-link
                  v-b-modal="'modalHourlyPCU'"
                  class="mr-1"
                  style="color: #976900;"
                  @click="$refs.modalHourlyPCU.getTableCountPCU(data.item.date_to)"
                >
                  {{ data.item.date_to }}
                </b-link>
              </div>
            </template>
            <template #cell(bike_pcu)="data">
              {{ data.item.bike_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </template>
            <template #cell(car_pcu)="data">
              {{ data.item.car_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </template>
            <template #cell(truck_pcu)="data">
              {{ data.item.truck_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </template>
            <template #cell(taxi_pcu)="data">
              {{ data.item.taxi_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </template>
            <template #cell(pickup_pcu)="data">
              {{ data.item.pickup_pcu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
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
    <ModalHourly
      ref="modalHourly"
    />
    <ModalHourlyPCU
      ref="modalHourlyPCU"
    />
  </div>
</template>

<script>
import {
  BRow, BCol, BTable, BCard, BLink,
} from 'bootstrap-vue'
import axios from '@axios'
import ModalHourly from './LocationHourly.vue'
import ModalHourlyPCU from './LocationHourlyPCU.vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BTable,
    ModalHourly,
    ModalHourlyPCU,
    // BPagination,
    // BInputGroup,
    // BInputGroupAppend,
    // BFormInput,
    // BButton,
    // BFormGroup,
    // BFormSelect,
    // BCardBody,
    BLink,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      fields: [
        {
          key: 'date_to',
          label: 'วันที่',
          sortable: true,
        },
        {
          key: 'bike',
          label: 'จักรยานยนต์',
          class: 'text-center',
        },
        {
          key: 'car',
          label: 'รถยนต์',
          class: 'text-center',
        },
        {
          key: 'truck',
          label: 'รถบรรทุก',
          class: 'text-center',
        },
        {
          key: 'pickup',
          label: 'รถกระบะ',
          class: 'text-center',
        },
        {
          key: 'bus',
          label: 'รถบัส',
          class: 'text-center',
        },
        {
          key: 'taxi',
          label: 'รถแท็กซี่',
          class: 'text-center',
        },
        {
          key: 'trailer',
          label: 'รถพ่วง',
          class: 'text-center',
        },
        {
          key: 'total',
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
      fieldsPCU: [
        {
          key: 'date_to',
          label: 'วันที่',
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
    this.getTableCount()
    this.getTableCountPCU()
    this.interval = setInterval(() => {
      this.getTableCount()
      this.getTableCountPCU()
    }, 10000)
  },
  methods: {
    getTableCount() {
      axios
        .post('/get-Count-Daily-All', { location_id: this.$route.query.location_id })
        .then(response => {
          this.items = response.data
          this.totalRows = response.data.length
        })
        .catch(error => {
          console.log(error)
        })
    },
    getTableCountPCU() {
      axios
        .post('/get-Count-Daily-PCU-All', { location_id: this.$route.query.location_id })
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
.wide-column {
  width: 20% !important;
}

.narrow-column {
  width: 10% !important;
}
</style>
