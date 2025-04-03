<template>
  <!-- UserEdit -->
  <b-modal
    id="modalLog"
    title="ตารางข้อมูลนับรถ"
    size="xl"
    ok-title="ตกลง"
    ok-only
  >
    <b-row>
      <!-- Role -->
      <b-col cols="12">
        <b-row>
          <b-col
            lg="12"
            md="12"
          >
            <h3>{{ title }}</h3>
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
              <template #cell(index)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(live)="data">
                <b-link
                  v-b-modal="'Live'"
                  @click="$refs.RTSP.streamLive(data.item.hls_url)"
                >
                  <b-img
                    src="@/assets/images/icons/Live.svg"
                  />
                </b-link>
              </template>
              <template #cell(speed)="data">
                <b-badge
                  v-if="data.item.speed > 90"
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
              <template #cell(log)="data">
                <div>
                  <b-link
                    v-b-modal="'modalEdit'"
                    class="mr-1"
                    @click="$refs.childref.getID(data.item.uid)"
                  >
                    <feather-icon
                      icon="BarChart2Icon"
                      size="20"
                    />
                  </b-link>
                </div>
              </template>
              <template #cell(report)="data">
                <div>
                  <b-link
                    v-b-modal="'modalEdit'"
                    class="mr-1"
                    @click="$refs.childref.getID(data.item.uid)"
                  >
                    <feather-icon
                      icon="PrinterIcon"
                      size="20"
                    />
                  </b-link>
                </div>
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
      </b-col>
      <template #code>
        {{ codeFeedbackHelper }}
      </template>
    </b-row>
  </b-modal>
</template>

<script>
import axios from '@axios'
import {
  BRow, BCol, BTable, BPagination,
  BFormGroup, BFormSelect, BCardBody,
  BLink, BImg,
  BBadge,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BTable,
    BPagination,
    BFormGroup,
    BFormSelect,
    BCardBody,
    BBadge,
    BLink,
    BImg,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      title: '',
      fields: [
        {
          key: 'index',
          label: 'ลำดับ',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'ipaddress',
          label: 'IP Address',
          sortable: false,
        },
        {
          key: 'vehicle_class',
          label: 'ประเภทของยานพาหนะ',
          sortable: false,
        },
        {
          key: 'speed',
          label: 'ความเร็ว',
        },
        {
          key: 'date_time',
          label: 'วันที่/เวลา',
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
  },
  methods: {
    getTableLog(id, title) {
      this.title = title
      axios
        .post('/get-Transaction-Log-All', { location_id: id })
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
}
</style>
