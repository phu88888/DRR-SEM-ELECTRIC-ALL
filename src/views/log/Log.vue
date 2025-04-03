<template>
  <div>
    <!-- TABLE -->
    <b-card>
      <b-row>
        <b-col
          lg="12"
          md="12"
        >
          <h3>ประวัติย้ายจุดติดตั้ง</h3>
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
            <template #cell(id)="data">
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
            <template #cell(isOnline)="data">
              <b-badge :variant="status[1][data.value]">
                {{ status[0][data.value] }}
              </b-badge>
            </template>
            <template #cell(report)="data">
              <div class="d-flex justify-content-start">
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
    </b-card>
  </div>
</template>

<script>
import {
  BRow, BCol, BTable, BPagination, BInputGroup, BInputGroupAppend, BFormInput, BButton,
  BFormGroup, BFormSelect, BCardBody, BCard,
  BLink, BImg,
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
    BLink,
    BImg,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      fields: [
        {
          key: 'id',
          label: 'ลำดับ',
          sortable: true,
        },
        {
          key: 'road_code1',
          label: 'สายทาง',
          sortable: false,
        },
        {
          key: 'road_name',
          label: 'จุดติดตั้ง',
          sortable: false,
        },
        {
          key: 'ipaddress',
          label: 'ipaddress',
        },
        {
          key: 'username',
          label: 'ชื่อผู้ใช้',
          sortable: false,
        },
        {
          key: 'lastupdate',
          label: 'วันที่/เวลา',
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
    }, 300000)
  },
  methods: {
    getTableLog() {
      axios
        .post('/get-Change-Log-All')
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
