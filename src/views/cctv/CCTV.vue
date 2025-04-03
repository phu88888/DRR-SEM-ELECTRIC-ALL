<template>
  <div>
    <b-card>
      <b-row>
        <b-col cols="12">
          <Map />
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
          <h3>รายการกล้อง CCTV</h3>
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
            <template #cell(live)="data">
              <b-link
                v-b-modal="'Live'"
                @click="$refs.RTSP.streamLive(data.item.camera_url), handleLiveClick(data.item)"
              >
                <b-img
                  src="@/assets/images/icons/Live.svg"
                />
              </b-link>
            </template>
            <template #cell(today_count)="data">
              <span>{{ data.item.today_count }}</span>
            </template>
            <template #cell(ISOnline)="data">
              <b-badge
                v-ripple.400="'rgba(28, 28, 32, 0.15)'"
                v-b-tooltip.hover.bottom="data.item.lastupdate"
                :variant="status[1][data.value]"
                :class="{'custom-green-badge': data.value === 'Online'}"
              >
                {{ status[0][data.value] }}
              </b-badge>
            </template>
            <template #cell(ISOnline_router)="data">
              <b-badge
                v-ripple.400="'rgba(28, 28, 32, 0.15)'"
                v-b-tooltip.hover.bottom="data.item.lastupdate_router"
                :variant="status_router[1][data.value]"
                :class="{'custom-green-badge': data.value === 'Online'}"
              >
                {{ status_router[0][data.value] }}
              </b-badge>
            </template>
            <template #cell(ISOnline_node_red)="data">
              <b-badge
                v-ripple.400="'rgba(28, 28, 32, 0.15)'"
                v-b-tooltip.hover.bottom="data.item.lastupdate_node_red"
                :variant="status_node_red[1][data.value]"
                :class="{'custom-green-badge': data.value === 'Online'}"
              >
                {{ status_node_red[0][data.value] }}
              </b-badge>
            </template>
            <template #cell(setup)="data">
              <div class="d-flex justify-content-center">
                <b-link
                  :href="data.item.camera_url"
                  target="_blank"
                >
                  <feather-icon
                    icon="CameraIcon"
                    size="20"
                    style="color: #0080ff; filter: drop-shadow(1px 1px 1px rgba(255, 255, 0,0.5));"
                  />
                </b-link>
                <b-link
                  class="ml-1"
                  :href="data.item.router_url"
                  target="_blank"
                >
                  <b-img
                    src="@/assets/images/icons/router-icon.png"
                    style="width: 22px; height: 22px; filter: drop-shadow(1px 1px 1px rgba(215, 0, 0,0.5));"
                    alt="Node-red"
                  />
                </b-link>
                <b-link
                  class="ml-1"
                  :href="data.item.node_red_ui_url"
                  target="_blank"
                >
                  <b-img
                    src="@/assets/images/icons/nodered-icon.png"
                    style="width: 22px; height: 22px"
                    alt="Node-red"
                  />
                </b-link>
              </div>
            </template>
            <template #cell(edit)="data">
              <div class="d-flex justify-content-center">
                <b-link
                  v-b-modal="'modalEdit'"
                  class="mr-1"
                  @click="$refs.modalUpdate.dropdownLocation(data.item.ipaddress), $refs.modalUpdate.getLocation(data.item.camera_id)"
                >
                  <feather-icon
                    icon="EditIcon"
                    size="20"
                    style="filter: drop-shadow(1px 1px 1px rgba(255, 255, 0,0.5));"
                  />
                </b-link>
              </div>
            </template>
            <template #cell(log)="data">
              <div>
                <b-link
                  v-b-modal="'modalLog'"
                  @click="$refs.modalLog.getTableLog(data.item.location_id, data.item.road_code1)"
                >
                  <feather-icon
                    icon="BarChart2Icon"
                    size="24"
                    style=" filter: drop-shadow(1px 1px 1px rgba(255, 255, 0,0.5));"
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
    <modalUpdate
      ref="modalUpdate"
      :active_location_id="liveData.active_location_id"
      @fetch="getTableCCTV()"
    />
    <modalLog
      ref="modalLog"
    />
  </div>
</template>

<script>
import {
  BRow, BCol, BTable, BPagination, BInputGroup, BInputGroupAppend, BFormInput, BButton,
  BFormGroup, BFormSelect, BCardBody, BCard,
  BLink, BImg, BBadge, VBTooltip,
} from 'bootstrap-vue'
import axios from '@axios'
import Ripple from 'vue-ripple-directive'
import modalUpdate from './modalUpdate.vue'
import modalLog from './modalLog.vue'
import Map from './Map.vue'

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
    BLink,
    BImg,
    BBadge,
    modalUpdate,
    modalLog,
    Map,
  },
  directives: {
    'b-tooltip': VBTooltip,
    Ripple,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      fields: [
        {
          key: 'camera_id',
          label: 'ลำดับ',
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'road_code',
          label: 'สายทาง',
          sortable: false,
        },
        {
          key: 'road_name',
          label: 'จุดติดตั้ง',
          thStyle: { width: '35%' },
        },
        {
          key: 'ipaddress',
          label: 'IP Address',
          sortable: false,
        },
        {
          key: 'today_count',
          label: 'นับรถ (วันนี้)',
          thStyle: { width: '6%' },
          class: 'text-center',
        },
        {
          key: 'ISOnline_router',
          label: 'สถานะ router',
          class: 'text-center',
        },
        {
          key: 'ISOnline',
          label: 'สถานะ cctv',
          class: 'text-center',
        },
        {
          key: 'ISOnline_node_red',
          label: 'สถานะ node-red',
          thStyle: { width: '7%' },
          class: 'text-center',
        },
        {
          key: 'log',
          label: 'Log',
          class: 'text-center',
        },
        {
          key: 'setup',
          label: 'ตั้งค่ากล้อง',
          class: 'text-center',
        },
        {
          key: 'edit',
          label: 'แก้ไขจุดติดตั้ง',
          thStyle: { width: '10%' },
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
      status_router: [{
        Online: 'ออนไลน์', Offline: 'ออฟไลน์',
      },
      {
        Online: 'success', Offline: 'danger',
      }],
      status_node_red: [{
        Online: 'ออนไลน์', Offline: 'ออฟไลน์',
      },
      {
        Online: 'success', Offline: 'danger',
      }],
      liveData: {},
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
    this.getTableCCTV()
    this.interval = setInterval(() => {
      this.getTableCCTV()
    }, 10000)
  },
  methods: {
    getTableCCTV() {
      axios
        .post('/get-Camera-All')
        .then(response => {
          this.items = response.data
          this.totalRows = response.data.length
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleLiveClick(item) {
      // Update the liveData property based on the clicked item
      this.liveData = {
        title: `${item.road_name}`,
      }
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
