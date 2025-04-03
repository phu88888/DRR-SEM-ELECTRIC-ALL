<template>
  <b-modal
    id="modalHourly"
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
            <h3>ตารางนับรถรายชั่วโมง (คัน)</h3>
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
                    @click="$refs.modalHourly.getTableCount(data.item.date_to), $refs.modalHourly.getTableCountPCU(data.item.date_to)"
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
                {{ data.item.car.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
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
    </div>
  </b-modal>
</template>

<script>
import {
  BRow, BCol, BTable, BCard, BLink,
} from 'bootstrap-vue'
import axios from '@axios'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BTable,
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
          key: 'Period_Name',
          label: 'เวลา',
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
          key: 'Period_Name',
          label: 'เวลา',
          sortable: true,
        },
        {
          key: 'bike_pcu',
          label: 'จักรยานยนต์(PCU)',
          class: 'text-center',
        },
        {
          key: 'car_pcu',
          label: 'รถยนต์(PCU)',
          class: 'text-center',
        },
        {
          key: 'truck_pcu',
          label: 'รถบรรทุก(PCU)',
          class: 'text-center',
        },
        {
          key: 'pickup_pcu',
          label: 'รถกระบะ(PCU)',
          class: 'text-center',
        },
        {
          key: 'bus_pcu',
          label: 'รถบัส(PCU)',
          class: 'text-center',
        },
        {
          key: 'taxi_pcu',
          label: 'รถแท็กซี่(PCU)',
          class: 'text-center',
        },
        {
          key: 'trailer_pcu',
          label: 'รถพ่วง(PCU)',
          class: 'text-center',
        },
        {
          key: 'total_pcu',
          label: 'ทั้งหมด(PCU)',
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
    getTableCount(dateTo) {
      axios
        .post('/get-Count-Hourly-All', { location_id: this.$route.query.location_id, date_to: dateTo })
        .then(response => {
          this.items = response.data
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
