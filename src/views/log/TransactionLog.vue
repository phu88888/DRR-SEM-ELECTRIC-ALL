<template>
  <div>
    <!-- TABLE -->
    <b-card>
      <b-row>
        <b-col
          lg="12"
          md="12"
        >
          <h3>Log</h3>
        </b-col>
        <b-col
          lg="4"
          class="d-flex align-items-center justify-content-start mb-1"
        >
          <b-input-group>
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              placeholder="ป้อนคำค้นหา"
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
            <template #cell(speed)="data">
              <b-badge
                v-if="data.item.speed > 120"
                variant="danger"
              >
                {{ data.item.speed }} Km/h
              </b-badge>
              <b-badge
                v-else
                variant="success"
                class="custom-green-badge"
              >
                {{ data.item.speed }} Km/h
              </b-badge>
            </template>

          </b-table>
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
    </b-card>
  </div>
</template>

<script>
import {
  BRow, BCol, BTable, BPagination, BInputGroup, BInputGroupAppend, BFormInput, BButton,
  BFormGroup, BFormSelect, BCardBody, BCard,
  BBadge,
} from 'bootstrap-vue'
import axios from '@axios'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BTable,
    BPagination,
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
    BButton,
    BFormGroup,
    BFormSelect,
    BCardBody,
    BBadge,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      fields: [
        {
          key: 'date_time',
          label: 'วันที่/เวลา',
          class: 'text-center',
        },
        {
          key: 'road_code',
          label: 'จุดติดตั้ง',
          sortable: false,
        },
        {
          key: 'ipaddress',
          label: 'ipaddress',
        },
        {
          key: 'vehicle_class',
          label: 'ประเภท',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'speed',
          label: 'ความเร็ว',
          sortable: false,
          class: 'text-center',
        },
        {
          key: 'direction',
          label: 'ทิศทาง',
          sortable: false,
          class: 'text-center',
        },
        {
          key: 'lane',
          label: 'เลน',
          sortable: false,
          class: 'text-center',
        },
        {
          key: 'version',
          label: 'เวอร์ชั่น',
          sortable: false,
          class: 'text-center',
        },
      ],
      items: [],
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
    this.getTableLog()
    this.interval = setInterval(() => {
      this.getTableLog()
    }, 10000)
  },
  methods: {
    getTableLog() {
      axios
        .post('/get-Transaction-Log-1000-All')
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

.custom-green-badge {
  background-color: rgb(21, 138, 0) !important;
  // color: #000 !important;
}
</style>
