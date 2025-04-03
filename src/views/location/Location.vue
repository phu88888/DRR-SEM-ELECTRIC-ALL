<template>
  <div>
    <!-- TABLE -->
    <b-card>
      <b-row>
        <b-col cols="12">
          <h3 class="mb-1">
            สถานที่ติดตั้ง
          </h3>
        </b-col>

        <!-- Search and Filters -->
        <b-col cols="12">
          <b-row align-v="center">
            <!-- Search Input -->
            <b-col
              lg="3"
              md="4"
              sm="12"
              class="mb-2 mb-md-0"
            >
              <b-input-group class="shadow-sm">
                <b-form-input
                  id="filterInput"
                  v-model="filter"
                  type="search"
                  placeholder="ป้อนคำค้นหา"
                  class="border-right-0"
                />
                <b-input-group-append>
                  <b-button
                    variant="outline-secondary"
                    :disabled="!filter"
                    @click="filter = ''"
                  >
                    <feather-icon
                      icon="XIcon"
                      size="16"
                    />
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </b-col>

            <!-- Filters Section -->
            <b-col
              lg="9"
              md="8"
              sm="12"
            >
              <b-row>
                <!-- Total Roads Counter -->
                <b-col
                  lg="3"
                  md="3"
                  sm="12"
                  class="mb-2 mb-md-0 d-flex justify-content-end"
                >
                  <span class="font-weight-bold">
                    ทั้งหมด {{ count_road }} สายทาง
                  </span>
                </b-col>

                <!-- Area Filter -->
                <b-col
                  lg="3"
                  md="3"
                  sm="12"
                  class="mb-2 mb-md-0"
                >
                  <b-form-group
                    label="ภาค"
                    label-for="area-select"
                    label-cols-md="3"
                    label-align-md="right"
                    label-class="mb-md-0 font-weight-bold"
                    class="mb-0"
                  >
                    <b-input-group class="shadow-sm">
                      <b-form-select
                        id="area-select"
                        v-model="selectedArea"
                        :options="OptionsArea"
                        value-field="text"
                        @change="getProvince(selectedArea), getAll()"
                      >
                        <option
                          value=""
                          disabled
                        >
                          ---กรุณาเลือกภาค---
                        </option>
                      </b-form-select>
                      <b-input-group-append v-if="selectedArea">
                        <b-button
                          variant="outline-secondary"
                          @click="clearArea"
                        >
                          <feather-icon
                            icon="XIcon"
                            size="16"
                          />
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>

                <!-- Province Filter -->
                <b-col
                  lg="3"
                  md="3"
                  sm="12"
                  class="mb-2 mb-md-0"
                >
                  <b-form-group
                    label="จังหวัด"
                    label-for="province-select"
                    label-cols-md="4"
                    label-align-md="right"
                    label-class="mb-md-0 font-weight-bold"
                    class="mb-0"
                  >
                    <b-input-group class="shadow-sm">
                      <b-form-select
                        id="province-select"
                        v-model="selectedProvince"
                        :options="OptionsProvince"
                        value-field="text"
                        @change="getArea(selectedProvince), getAll()"
                      >
                        <option
                          value=""
                          disabled
                        >
                          ---กรุณาเลือกจังหวัด---
                        </option>
                      </b-form-select>
                      <b-input-group-append v-if="selectedProvince">
                        <b-button
                          variant="outline-secondary"
                          @click="clearProvince"
                        >
                          <feather-icon
                            icon="XIcon"
                            size="16"
                          />
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                </b-col>

                <!-- View Filter -->
                <b-col
                  lg="3"
                  md="3"
                  sm="12"
                >
                  <b-form-group
                    label="ดูข้อมูล"
                    label-for="view-select"
                    label-cols-md="4"
                    label-align-md="right"
                    label-class="mb-md-0 font-weight-bold"
                    class="mb-0"
                  >
                    <b-form-select
                      id="view-select"
                      v-model="selected"
                      :options="options"
                      class="shadow-sm"
                      @change="getTableLocation(selected), getAll()"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
        <b-col
          class="mt-2"
          cols="12"
        >
          <div class="table-responsive-wrapper">
            <b-table
              responsive
              class="location-table"
              :per-page="perPage"
              :current-page="currentPage"
              :items="items"
              :fields="fields"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              :filter="filter"
              :filter-included-fields="filterOn"
              sticky-header="calc(100vh - 350px)"
              @filtered="onFiltered"
            >
              <template #cell(road_code)="data">
                <span>{{ data.item.road_code }}</span>
              </template>
              <template #cell(AADT)="data">
                <span style="color: #300066; filter: drop-shadow(1px 1px 1px rgba(48, 0, 102,0.5)); display: block; text-align: right;">{{ formatNumber(data.item.AADT) }}</span>
              </template>
              <template #cell(max_pcu)="data">
                <span style="color: #300066; filter: drop-shadow(1px 1px 1px rgba(48, 0, 102,0.5)); display: block; text-align: right;">{{ formatNumber(data.item.max_pcu) }}</span>
              </template>
              <template #cell(day_count)="data">
                <div v-if="data.item.day_count1 >= 7">
                  <b-link
                    v-if="data.item.active_location_id !== 0 "
                    :to="{ path: `/location-day?location_id=${data.item.location_id}`}"
                    style="text-decoration: underline; color: #d35400 ;"
                  >
                    <span>{{ data.item.day_count }}</span>
                  </b-link>
                  <b-link
                    v-else
                    :to="{ path: `/location-day?location_id=${data.item.location_id}`}"
                    style="text-decoration: underline; color: #d35400 ;"
                  >
                    <span>{{ data.item.day_count }}</span>
                  </b-link>
                </div>
                <div v-else>
                  <b-link
                    v-if="data.item.active_location_id !== 0 "
                    :to="{ path: `/location-day?location_id=${data.item.location_id}`}"
                    style="text-decoration: underline; color: #11DF00;"
                  >
                    <span>{{ data.item.day_count }}</span>
                  </b-link>
                  <b-link
                    v-else
                    :to="{ path: `/location-day?location_id=${data.item.location_id}`}"
                    style="text-decoration: underline; color: #CCAF61;"
                  >
                    <span>{{ data.item.day_count }}</span>
                  </b-link>
                </div>
              </template>
              <template #cell(isOnline)="data">
                <b-badge :variant="status[1][data.value]">
                  {{ status[0][data.value] }}
                </b-badge>
              </template>
              <template #cell(setup)="data">
                <b-img
                  v-if="data.item.setup_picture"
                  :src="data.item.setup_picture"
                  style="width: 25px; height: 25px"
                  @click="showImg(data.item.setup_picture)"
                />
              </template>
              <template #cell(cam)="data">
                <b-img
                  v-if="data.item.cam_picture"
                  :src="data.item.cam_picture"
                  style="width: 25px; height: 25px"
                  @click="showImg(data.item.cam_picture)"
                />
              </template>
              <template #cell(actions)="data">
                <div class="d-flex justify-content-start">
                  <b-dropdown
                    variant="link"
                    no-caret
                    :right="$store.state.appConfig.isRTL"
                  >

                    <template #button-content>
                      <feather-icon
                        icon="UploadIcon"
                        style="filter: drop-shadow(1px 1px 1px rgba(255, 255, 0,0.5));"
                        size="20"
                      />
                    </template>

                    <b-dropdown-item
                      v-b-modal="'modalUploadSet'"
                      @click="$refs.modalUploadSet.setLocationID(data.item.location_id)"
                    >
                      <feather-icon icon="SettingsIcon" />
                      <span class="align-middle ml-50">รูปการติดตั้ง</span>
                    </b-dropdown-item>

                    <b-dropdown-item
                      v-b-modal="'modalUploadCam'"
                      @click="$refs.modalUploadCam.setLocationID(data.item.location_id)"
                    >
                      <feather-icon icon="CameraIcon" />
                      <span class="align-middle ml-50">รูปภาพจากกล้อง</span>
                    </b-dropdown-item>

                    <b-dropdown-item
                      v-b-modal="'modalUploadVideo'"
                      @click="$refs.modalUploadVideo.setLocationID(data.item.location_id)"
                    >
                      <feather-icon icon="VideoIcon" />
                      <span class="align-middle ml-50">วีดีโอกล้อง</span>
                    </b-dropdown-item>
                  </b-dropdown>
                </div>

              </template>
              <!-- Report -->
              <template #cell(report)="data">
                <div>
                  <b-link
                    class="mr-1"
                    target="_blank"
                    :to="{ path: `/report?location_id=${data.item.location_id}`}"
                  >
                    <feather-icon
                      icon="PrinterIcon"
                      style="filter: drop-shadow(1px 1px 1px rgba(255, 255, 0,0.5));"
                      size="20"
                    />
                  </b-link>
                </div>
              </template>
              <template #cell(video)="data">
                <div class="d-flex justify-content-start">
                  <b-link
                    v-if="data.item.cam_video"
                    v-b-modal="'modalVideo'"
                    class="mr-1"
                    @click="$refs.modalVideo.getVideo(data.item.cam_video)"
                  >
                    <feather-icon
                      icon="VideoIcon"
                      size="20"
                      style="filter: drop-shadow(1px 1px 1px rgba(255, 255, 0,0.5));"
                    />
                  </b-link>
                </div>
              </template>
              <template #cell(edit)="data">
                <div class="d-flex justify-content-start">
                  <b-link
                    v-b-modal="'modalEdit'"
                    class="mr-1"
                    @click="$refs.modalEdit.getDataLatLng(data.item.latitude, data.item.longitude, data.item.location_id)"
                  >
                    <feather-icon
                      icon="EditIcon"
                      style="filter: drop-shadow(1px 1px 1px rgba(255, 255, 0,0.5));"
                      size="20"
                    />
                  </b-link>
                </div>
              </template>
              <template #cell(lane)="data">
                <span
                  v-if="data.item.lane !== null"
                  v-b-modal="'modalLane'"
                  @click="$refs.modalLane.getFetchLane(data.item.location_id)"
                >{{ data.item.lane }}</span>
                <b-link
                  v-else
                  v-b-modal="'modalLane'"
                  class="mr-1"
                  @click="$refs.modalLane.getFetchLane(data.item.location_id)"
                >
                  <feather-icon
                    icon="Edit2Icon"
                    style="filter: drop-shadow(1px 1px 1px rgba(255, 255, 0,0.5));"
                    size="20"
                  />
                </b-link>
              </template>
            </b-table>
          </div>
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
              label-for="perPageSelect"
              class="text-nowrap mb-md-0 mr-1"
            >
              <b-form-select
                id="perPageSelect"
                v-model="perPage"
                size="sm"
                inline
                :options="pageOptions"
                style="min-width: 50px;"
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
    <modalUploadSetting
      ref="modalUploadSet"
      @fetch="getTableLocation()"
    />
    <modalUploadCam
      ref="modalUploadCam"
      @fetch="getTableLocation()"
    />
    <modalUploadVideo
      ref="modalUploadVideo"
      @fetch="getTableLocation()"
    />
    <modalEdit
      ref="modalEdit"
      @fetch="getTableLocation()"
    />
    <modalLane
      ref="modalLane"
      @fetch="getTableLocation()"
    />
    <modalVideo
      ref="modalVideo"
    />
  </div>
</template>

<script>
import {
  BRow, BCol, BTable, BPagination, BInputGroup, BInputGroupAppend, BFormInput, BButton,
  BFormGroup, BFormSelect, BCardBody, BCard, BDropdownItem, BDropdown, BImg,
  BLink, BBadge,
} from 'bootstrap-vue'
import axios from '@axios'
import modalUploadSetting from './modalUploadSetting.vue'
import modalUploadCam from './modalUploadCam.vue'
import modalUploadVideo from './modalUploadVideo.vue'
import modalEdit from './modalEdit.vue'
import modalVideo from './modalVideo.vue'
import modalLane from './modalLane.vue'

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
    BDropdown,
    BDropdownItem,
    modalUploadSetting,
    modalUploadVideo,
    modalUploadCam,
    modalEdit,
    modalVideo,
    modalLane,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      count_road: '',
      selected: 2,
      selectedProvince: '',
      selectedArea: '',
      options: [
        { value: 2, text: 'ทั้งหมด' },
        { value: 1, text: 'เฉพาะที่มีกล้องใช้งานอยู่' },
        { value: 6, text: 'นับแล้ว' },
        { value: 3, text: 'นับครบแล้ว' },
        { value: 4, text: 'นับเกิน 7 วัน' },
        { value: 5, text: 'ยังไม่ได้นับ' },
      ],
      OptionsArea: [],
      OptionsProvince: [],
      fields: [
        {
          key: 'camera_id',
          label: 'อุปกรณ์ชุดที่',
          thStyle: { width: '5%' },
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'road_code',
          label: 'สายทาง',
          thStyle: { width: '5%' },
          sortable: false,
        },
        {
          key: 'province',
          label: 'จังหวัด',
          thStyle: { width: '10%' },
          sortable: false,
        },
        {
          key: 'lane',
          label: 'Lane',
          thStyle: { width: '5%' },
          class: 'text-center',
        },
        {
          key: 'day_count',
          label: 'นับรถ (วัน)',
          thStyle: { width: '10%' },
          class: 'text-center',
          sortable: true,
        },
        {
          key: 'max_pcu',
          label: 'MAX (PCU)',
          thStyle: { width: '5%' },
          class: 'text-right',
          tdClass: 'text-right',
          sortable: true,
        },
        {
          key: 'AADT',
          label: 'AADT',
          thStyle: { width: '5%' },
          class: 'text-right',
          tdClass: 'text-right',
          sortable: true,
        },
        {
          key: 'setup',
          label: 'รูปติดตั้ง',
          thStyle: { width: '15%' },
          class: 'text-center',
        },
        {
          key: 'cam',
          label: 'รูปจากกล้อง',
          thStyle: { width: '20%' },
          class: 'text-center',
        },
        {
          key: 'video',
          label: 'วีดีโอ',
          thStyle: { width: '5%', minWidth: '60px' },
          class: 'text-center',
        },
        {
          key: 'actions',
          label: 'อัพโหลดรูป',
          class: 'text-center',
          thStyle: { width: '5%', minWidth: '80px' },
        },
        {
          key: 'report',
          label: 'รายงาน',
          class: 'text-center',
          thStyle: { width: '5%', minWidth: '60px' },
        },
        {
          key: 'edit',
          label: 'แก้ไข',
          class: 'text-center',
          thStyle: { width: '5%', minWidth: '60px' },
        },
        {
          key: 'location_id',
          label: 'ลำดับสายทาง',
          thStyle: { width: '5%' },
          sortable: true,
          class: 'text-center',
        },
        {
          key: 'road_name',
          label: 'จุดติดตั้ง',
          thStyle: { width: '25%' },
          sortable: false,
        },
        {
          key: 'dept_name',
          label: 'หน่วยงาน',
          thStyle: { width: '10%' },
          sortable: false,
        },
      ],
      items: [],
      filterUse: '',
      perPage: 100,
      pageOptions: [
        { value: 25, text: '25' },
        { value: 50, text: '50' },
        { value: 100, text: '100' },
        { value: 250, text: '250' },
        { value: 500, text: '500' },
        { value: 0, text: 'ทั้งหมด' },
      ],
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
      formData: new FormData(),
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
  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {
    this.getTableLocation()
    this.getArea()
    this.getProvince()
    this.getCountLocation()
    this.interval = setInterval(() => {
      this.getTableLocation()
      this.getArea()
      this.getProvince()
      this.getCountLocation()
    }, 300000)
  },
  methods: {
    getTableLocation() {
      axios
        .post('/get-Location-All2', { area: this.selectedArea, province: this.selectedProvince, active: this.selected })
        .then(response => {
          this.items = response.data
          this.totalRows = response.data.length
          this.items.forEach(item => {
            if (item.day_count1 >= 7) {
            // eslint-disable-next-line no-underscore-dangle, no-param-reassign
              item._cellVariants = { day_count: 'info' }
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    getArea() {
      axios
        .post('/dropdown-Area-All', { province: this.selectedProvince })
        .then(response => {
          this.OptionsArea = response.data
          if (response.data.length === 1) {
            this.selectedArea = response.data[0].text
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getProvince() {
      axios
        .post('/dropdown-Province-All2', { area: this.selectedArea })
        .then(response => {
          this.OptionsProvince = response.data
          if (response.data.length === 1) {
            this.selectedProvince = response.data[0].text
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getAll() {
      setTimeout(() => {
        this.getTableLocation()
        this.getCountLocation()
      }, 500)
    },
    getCountLocation() {
      axios
        .post('/count-Location-All', { area: this.selectedArea, province: this.selectedProvince, active: this.selected })
        .then(response => {
          this.count_road = response.data[0].count_location
        })
        .catch(error => {
          console.log(error)
        })
    },
    showImg(img) {
      this.$swal({
        imageUrl: img,
        imageAlt: 'Custom image',
        width: 800,
        background: 'white',
        showCancelButton: false,
        showConfirmButton: false,
        showCloseButton: true,
      })
    },
    clearArea() {
      this.selectedArea = ''
      this.getProvince() // อัพเดทรายการจังหวัด
      this.getAll() // อัพเดทตาราง
    },
    clearProvince() {
      this.selectedProvince = '' // เคลียร์จังหวัดด้วยเมื่อเคลียร์ภาค
      this.getArea() // อัพเดทรายการจังหวัด
      this.getAll() // อัพเดทตาราง
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    formatNumber(value) {
      if (value === null || value === undefined || value === 0 || value === '0' || value === 0.00 || value === '0.00' || value === 'NaN' || Number.isNaN(value)) {
        return ''
      }

      // แปลงเป็นตัวเลขและปัดเศษ
      const num = parseFloat(value)

      // ตรวจสอบอีกครั้งว่าเป็น NaN หรือไม่
      if (Number.isNaN(num)) {
        return ''
      }

      // ถ้าเป็นจำนวนเต็มหรือทศนิยมที่ลงท้ายด้วย .00 ให้แสดงเป็นจำนวนเต็ม
      if (num % 1 === 0 || (num * 100) % 100 === 0) {
        return Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }

      // กรณีอื่นๆ ให้แสดงเป็นจำนวนเต็ม
      return Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.form-group {
  margin-bottom: 0;
}

.input-group {
  .form-control {
    border-right: 0;
    &:focus {
      box-shadow: none;
      border-color: #dee2e6;
    }
  }

  .input-group-append {
    .btn {
      border-left: 0;
      padding: 0.375rem 0.75rem;

      &:focus {
        box-shadow: none;
      }
    }
  }
}

.form-control, .custom-select {
  height: calc(1.5em + 0.75rem + 2px);
}

.table-responsive-wrapper {
  position: relative;
  width: 100%;
  margin-bottom: 15px;
  overflow: hidden;
}

.location-table {
  overflow-x: auto;
  display: block;
  width: 100%;
  max-height: calc(100vh - 350px);
  margin-bottom: 0;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.05);
  }

  th, td {
    white-space: nowrap;
  }

  .feather-icon {
    display: inline-block;
  }

  /* เพิ่ม style สำหรับ sticky header */
  thead th {
    position: sticky;
    top: 0;
    background-color: #f8f9fa;
    z-index: 1;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
}

@media (max-width: 768px) {
  .form-group {
    margin-bottom: 1rem;
  }

  label {
    margin-bottom: 0.5rem;
  }
}
</style>
