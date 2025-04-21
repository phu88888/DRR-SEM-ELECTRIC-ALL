<template>
  <!-- MODAL Lighting -->
  <b-modal
    id="Log"
    title="Log"
    size="xl"
    ok-title="ตกลง"
    cancel-title="ยกเลิก"
  >
    <b-col cols="12">
      <template>
        <b-card-code style="background-color: rgb(255, 127, 96, 0.0)">
          <b-row>
            <b-col
              md="12"
              sm="12"
              lg="4"
              xs="12"
              class="d-flex align-items-center justify-content-end mb-1"
            >
              <!-- <b-link
                style="font-size: 18px; color: #808080;"
                :to="`/NB-IoT_Detail?deptid=${deptid}`"
              >
                <feather-icon
                  style="margin-bottom: 5px;"
                  size="16"
                  icon="ArrowLeftIcon"
                /><span style="color: #ed7a00;"> {{ detail }} </span>
              </b-link> -->
            </b-col>
            <b-col
              md="12"
              sm="12"
              lg="5"
              xs="12"
              class="d-flex align-items-center justify-content-start mb-1"
            >
              <b-button
                size="sm"
                variant="outline-success"
                class="btn-tour-skip mr-1"
                @click="filter = ''"
              >
                All
              </b-button>
              <b-button
                size="sm"
                variant="outline-warning"
                class="btn-tour-skip mr-1"
                @click="filter = 'circuit'"
              >
                Circuit
              </b-button>
              <b-button
                size="sm"
                variant="outline-danger"
                class="btn-tour-skip mr-1"
                @click="filter = 'line-check'"
              >
                Line-Check
              </b-button>
              <b-button
                size="sm"
                variant="outline-info"
                class="btn-tour-skip mr-1"
                @click="filter = 'volt-amp'"
              >
                Volt-Amp
              </b-button>
            </b-col>
            <b-col
              lg="3"
              md="12"
              sm="12"
              xs="12"
              class="d-flex align-items-center justify-content-start text-sm-right mb-1"
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
                  placeholder="ป้อนคำที่ต้องการค้นหา.."
                  label-cols-sm="12"
                  label-cols-md="2"
                  label-cols-lg="2"
                  style="background-color: rgb(255, 127, 96, 0.0)"
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
                <template #cell(line_detect1)="data">
                  <b-badge
                    v-if="data.item.line_detect1 != null"
                    class="mr-1"
                    :variant="line_detect1[1][data.value]"
                  >
                    {{ line_detect1[0][data.value] }}
                  </b-badge>
                  <b-badge
                    v-if="data.item.line_detect2 != null & data.item.line_detect2 == 'fail'"
                    class="mr-1"
                    variant="danger"
                  >
                    FAIL
                  </b-badge>
                  <b-badge
                    v-if="data.item.line_detect2 != null & data.item.line_detect2 == 'ok'"
                    class="mr-1"
                    variant="success"
                  >
                    OK
                  </b-badge>
                  <b-badge
                    v-if="(data.item.data_type == 'line-check-4w' || data.item.data_type == 'line-check-6w') & data.item.line_detect3 != null & data.item.line_detect3 == 'fail'"
                    class="mr-1"
                    variant="danger"
                  >
                    FAIL
                  </b-badge>
                  <b-badge
                    v-if="(data.item.data_type == 'line-check-4w' || data.item.data_type == 'line-check-6w') & data.item.line_detect3 != null & data.item.line_detect3 == 'ok'"
                    class="mr-1"
                    variant="success"
                  >
                    OK
                  </b-badge>
                  <b-badge
                    v-if="(data.item.data_type == 'line-check-4w' || data.item.data_type == 'line-check-6w') & data.item.line_detect4 != null & data.item.line_detect4 == 'fail'"
                    class="mr-1"
                    variant="danger"
                  >
                    FAIL
                  </b-badge>
                  <b-badge
                    v-if="(data.item.data_type == 'line-check-4w' || data.item.data_type == 'line-check-6w') & data.item.line_detect4 != null & data.item.line_detect4 == 'ok'"
                    class="mr-1"
                    variant="success"
                  >
                    OK
                  </b-badge>
                  <b-badge
                    v-if="data.item.data_type == 'line-check-6w' & data.item.line_detect5 != null & data.item.line_detect5 == 'fail'"
                    class="mr-1"
                    variant="danger"
                  >
                    FAIL
                  </b-badge>
                  <b-badge
                    v-if="data.item.data_type == 'line-check-6w' & data.item.line_detect5 != null & data.item.line_detect5 == 'ok'"
                    class="mr-1"
                    variant="success"
                  >
                    OK
                  </b-badge>
                  <b-badge
                    v-if="data.item.data_type == 'line-check-6w' & data.item.line_detect6 != null & data.item.line_detect6 == 'fail'"
                    class="mr-1"
                    variant="danger"
                  >
                    FAIL
                  </b-badge>
                  <b-badge
                    v-if="data.item.data_type == 'line-check-6w' & data.item.line_detect6 != null & data.item.line_detect6 == 'ok'"
                    class="mr-1"
                    variant="success"
                  >
                    OK
                  </b-badge>
                  <div v-if="data.item.data_type == 'circuit'">
                    <b-badge
                      v-if="data.item.e.substring(0,1) === '0'"
                      variant="danger"
                    >
                      ST
                    </b-badge>
                    <span v-if="data.item.e.substring(0,1) === '0'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.e.substring(0,1) === '1'"
                      variant="success"
                    >
                      ST
                    </b-badge>
                    <span v-if="data.item.e.substring(0,1) === '1'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.e.substring(1,2) === '0'"
                      variant="danger"
                    >
                      MB
                    </b-badge>
                    <span v-if="data.item.e.substring(1,2) === '0'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.e.substring(1,2) === '1'"
                      variant="success"
                    >
                      MB
                    </b-badge>
                    <span v-if="data.item.e.substring(1,2) === '1'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.e.substring(2,3) === '0'"
                      variant="danger"
                    >
                      PS
                    </b-badge>
                    <span v-if="data.item.e.substring(2,3) === '0'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.e.substring(2,3) === '1'"
                      variant="success"
                    >
                      PS
                    </b-badge>
                    <span v-if="data.item.e.substring(2,3) === '1'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.e.substring(3,4) === '0'"
                      variant="danger"
                    >
                      MC1
                    </b-badge>
                    <span v-if="data.item.e.substring(3,4) === '0'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.e.substring(3,4) === '1'"
                      variant="success"
                    >
                      MC1
                    </b-badge>
                    <span v-if="data.item.e.substring(3,4) === '1'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.e.substring(4,5) === '0'"
                      variant="danger"
                    >
                      MC2
                    </b-badge>
                    <span v-if="data.item.e.substring(4,5) === '0'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.e.substring(4,5) === '1'"
                      variant="success"
                    >
                      MC2
                    </b-badge>
                    <span v-if="data.item.e.substring(4,5) === '1'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.f.substring(0,1) === '0'"
                      variant="danger"
                    >
                      CB1
                    </b-badge>
                    <span v-if="data.item.f.substring(0,1) === '0'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.f.substring(0,1) === '1'"
                      variant="success"
                    >
                      CB1
                    </b-badge>
                    <span v-if="data.item.f.substring(0,1) === '1'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.f.substring(1,2) === '0'"
                      variant="danger"
                    >
                      CB2
                    </b-badge>
                    <span v-if="data.item.f.substring(1,2) === '0'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.f.substring(1,2) === '1'"
                      variant="success"
                    >
                      CB2
                    </b-badge>
                    <span v-if="data.item.f.substring(1,2) === '1'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.f.substring(2,3) === '0'"
                      variant="danger"
                    >
                      CB3
                    </b-badge>
                    <span v-if="data.item.f.substring(2,3) === '0'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.f.substring(2,3) === '1'"
                      variant="success"
                    >
                      CB3
                    </b-badge>
                    <span v-if="data.item.f.substring(2,3) === '1'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.f.substring(3,4) === '0'"
                      variant="danger"
                    >
                      CB4
                    </b-badge>
                    <span v-if="data.item.f.substring(3,4) === '0'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.f.substring(3,4) === '1'"
                      variant="success"
                    >
                      CB4
                    </b-badge>
                    <span v-if="data.item.f.substring(3,4) === '1'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.f.substring(4,5) === '0'"
                      variant="danger"
                    >
                      TFM
                    </b-badge>
                    <span v-if="data.item.f.substring(4,5) === '0'">
                        &nbsp;
                    </span>
                    <b-badge
                      v-if="data.item.f.substring(4,5) === '1'"
                      variant="success"
                    >
                      TFM
                    </b-badge>
                    <span v-if="data.item.f.substring(4,5) === '1'">
                        &nbsp;
                    </span>
                  </div>
                </template>
                <template #cell(a)="data">
                  IMEI : {{ data.item.a }}
                </template>
                <template #cell(b)="data">
                  <b-badge
                    :variant="box_type[1][data.value]"
                  >
                    {{ box_type[0][data.value] }}
                  </b-badge>
                </template>
                <template #cell(e)="data">
                  <span
                    v-if="data.item.data_type === 'volt-amp'"
                  >
                    {{ data.item.e }} V - {{ data.item.f }} A
                  </span>
                  <span
                    v-if="data.item.data_type != 'volt-amp'"
                  >
                    {{ data.item.e }} - {{ data.item.f }}
                  </span>
                </template>
                <template #cell(phase)="data">
                  <span v-if="data.item.phase !== null">
                    {{ data.item.phase }}
                  </span>
                  <span v-if="data.item.phase == null">
                    1
                  </span>
                </template>
                <template #cell(version)="data">
                  <span>
                    {{ data.item.version }} - {{ data.item.g }} °C
                  </span>
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
                    style="background-color: rgb(255, 127, 96, 0.0)"
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

  </b-modal>
</template>

<script>
/* eslint-disable global-require */
import {
  BRow, BCol, BTable, BFormGroup, BBadge,
  BFormSelect, BPagination, BCardBody,
  BButton, BInputGroupAppend, BInputGroup, BFormInput,
  // BLink,
} from 'bootstrap-vue'
import axios from '@axios'
import BCardCode from '@core/components/b-card-code/BCardCode.vue'

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
    BInputGroupAppend,
    BInputGroup,
    BFormInput,
    BCardCode,
    BBadge,
    // BLink,
  },
  data() {
    return {
      items: [],
      fields: [
        {
          key: 'date_time', label: 'วัน/เวลา', sortable: true, class: 'text-center box',
        },
        {
          key: 'a', label: 'imei', sortable: true, class: 'text-center box',
        },
        {
          key: 'b', label: 'BOX Type', sortable: true, class: 'text-center box',
        },
        {
          key: 'e', label: 'Data 1-2', sortable: true, class: 'text-center box',
        },
        {
          key: 'line_detect1', label: 'Data Info', sortable: true, class: 'text-center box',
        },
        {
          key: 'data_type', label: 'Type', sortable: true, class: 'text-center box',
        },
        {
          key: 'phase', label: 'Phase', sortable: true, class: 'text-center box',
        },
        {
          key: 'version', label: 'ver-Temp', sortable: true, class: 'text-center box',
        },
      ],
      detail: '',
      deptid: '',
      // --------history--------
      perPage: 100,
      pageOptions: [25, 50, 75, 100],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      box_type: [{
        15: 'ตัวแม่', 20: 'ตัวลูก', 16: 'ตัวแม่', 17: 'ตัวแม่',
      },
      {
        15: 'light-warning', 20: 'light-info', 16: 'light-warning', 17: 'light-warning',
      }],
      line_detect1: [{
        fail: 'FAIL', ok: 'OK',
      },
      {
        fail: 'danger', ok: 'success',
      }],
      line_detect2: [{
        fail: 'FAIL', ok: 'OK',
      },
      {
        fail: 'danger', ok: 'success',
      }],
      userData: JSON.parse(localStorage.getItem('userData')),
      switch: {
        semid: '',
        controller_id: 1,
        drv1_cmd: '',
      },
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {
    this.getTableNBIoTLog()
    // this.checkNBIoTLog()
    this.interval = setInterval(() => {
      this.getTableNBIoTLog()
      // this.checkNBIoTLog()
    }, 300000)
  },
  methods: {
    getTableNBIoTLog(IMEI) {
      axios
        .post('/popupNB-IoTLog', { imei: IMEI })
        .then(response => {
          this.items = response.data
          this.totalRows = response.data.length
        })
    },
    // checkNBIoTLog() {
    //   axios
    //     .post('/checkNB-IoTLog', { imei: this.$route.query.imei })
    //     .then(response => {
    //       this.detail = response.data[0].detail
    //       this.deptid = response.data[0].deptid
    //     })
    // },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    checkLine() {
      axios.post('/checkLine', { wid: this.$route.query.wid })
        .then(response => {
          // eslint-disable-next-line prefer-destructuring
          this.check = response.data[0]
          if (this.check.line_left === 'OK') {
            this.checkLeft = true
          } else {
            this.checkLeft = false
          }
          if (this.check.line_right === 'OK') {
            this.checkRight = true
          } else {
            this.checkRight = false
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    onChangeActive(event) {
      this.$swal({
        title: '<span style="color:#000000">ต้องการปิดหรือเปิดตู้ไฟหรือไม่</span>',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'ยกเลิก',
        confirmButtonText: 'ตกลง',
        reverseButtons: true,
        customClass: {
          confirmButton: 'btn btn-primary ml-1',
          cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false,
      }).then(async result => {
        if (result.value) {
          this.switch.drv1_cmd = event.value
          try {
            await axios.post('/swithSemControl', this.switch)
            if (event.value === true) {
              this.$swal({
                icon: 'success',
                title: '<span style="color:#000000">เปิดเรียบร้อยแล้ว</span>',
                showConfirmButton: false,
                timer: 1000,
              })
            } else {
              this.$swal({
                icon: 'success',
                title: '<span style="color:#000000">ปิดเรียบร้อยแล้ว</span>',
                showConfirmButton: false,
                timer: 1000,
              })
            }
            this.getValueDiagram()
            this.checkSwith()
          } catch (error) {
            this.$swal({
              title: 'Error!',
              text: ' กดเพื่อดำเนินการต่อ!',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
        }
      })
    },
  },
}
</script>

<style lang="scss">
.table-responsive{
    font-size: 14px;
}
.table thead th {
  font-size: 14px;
}
.box {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 100%;
}
</style>
