<template>
  <div>
    <b-row>
      <b-col
        lg="12"
        md="12"
      >
        <b-link
          style="font-size: 26px; color: #fff;"
          :to="{ path: `/diagram?wid=${$route.query.wid}&type=${this.$route.query.type}`}"
        >
          <feather-icon
            style="margin-bottom: 5px;"
            size="34"
            icon="ArrowLeftIcon"
          /><span class="ml-1">ตารางบันทึกข้อมูลไฟฟ้าขัดข้อง</span>
        </b-link>
      </b-col>
      <b-col
        lg="4"
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
            placeholder="ป้อนคำค้นหา"
            label-cols-sm="12"
            label-cols-md="2"
            label-cols-lg="2"
            style=" background-color:rgba(0,0,0, 0.6);"
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
        cols="8"
        class="d-flex align-items-center justify-content-end mb-1"
      >
        <a>
          <b-button
            v-b-modal="'addProblem'"
            variant="primary"
            class="btn-icon"
          >
            <feather-icon
              icon="PlusCircleIcon"
              size="24"
              class="mr-1"
            />
            <label style="color:white; font-size: 14px;">แจ้งปัญหา</label>
          </b-button>
        </a>
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
          <template #cell(edit)="data">
            <b-link
              v-b-modal="'editProblem'"
              @click="$refs.childref.sendInfo(data.item.tid)"
            >
              <b-img
                src="@/assets/images/icons/Edit.svg"
                height="30"
              />
            </b-link>
          </template>
          <template #cell(delete)="data">
            <b-link
              @click.prevent="remove(data.item.tid)"
            >
              <feather-icon
                class="text-danger"
                icon="XSquareIcon"
                size="20"
              />
            </b-link>
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
    <!-- MODAL EDIT -->
    <addProblem
      @fetch="getTableSEM()"
    />
    <editProblem
      ref="childref"
      @fetch="getTableSEM()"
    />
  </div>
</template>

<script>
import {
  BRow, BCol, BTable, BPagination, BInputGroup, BInputGroupAppend, BFormInput, BButton,
  BFormGroup, BFormSelect, BCardBody, BLink, BImg,
} from 'bootstrap-vue'
import axios from '@axios'
import addProblem from './addProblem.vue'
import editProblem from './editProblem.vue'

export default {
  components: {
    BRow,
    BCol,
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
    editProblem,
    addProblem,
  },
  data() {
    return {
      fields: [
        {
          key: 'edit',
          label: 'การซ่อม',
        },
        {
          key: 'date_time',
          label: 'วันที่แจ้ง',
          sortable: true,
        },
        {
          key: 'name_cause',
          label: 'ผู้แจ้ง',
          sortable: false,
        },
        {
          key: 'problem_cause',
          label: 'ปัญหาขัดข้อง',
        },
        {
          key: 'problem_solving',
          label: 'วิธีแก้',
        },
        {
          key: 'name_solving',
          label: 'ผู้ซ่อม',
        },
        {
          key: 'name_solving',
          label: 'วันที่ซ่อม',
        },
        {
          key: 'solving_date',
          label: 'วันที่ซ่อม',
          sortable: true,
        },
        {
          key: 'delete',
          label: 'ลบ',
          class: 'text-center',
        },
      ],
      items: [],
      perPage: 25,
      pageOptions: [25, 50, 100],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      status: [{
        Online: 'Online', Offline: 'Offline',
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
    this.getTableSEM()
    this.interval = setInterval(() => {
      this.getTableSEM()
    }, 300000)
  },
  methods: {
    getTableSEM() {
      axios
        .post('/troubleSEMControlDetail-Electic', { wid: this.$route.query.wid })
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
    remove(id) {
      this.$swal({
        title: '<span style="color:#000000">ต้องการลบหรือไม่</span>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(async result => {
        if (result.value) {
          try {
            await axios.post('/deleteTroubleSEMControlDetail-Electic', { tid: id })
            this.$swal({
              icon: 'success',
              title: '<span style="color:#000000">ลบสำเร็จ</span>',
              // text: 'Deleted successfully.',
              showConfirmButton: false,
              timer: 1000,
            })
            this.getTableSEM()
          } catch (error) {
            this.$swal({
              title: 'Error!',
              text: ' Click to continue!',
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

<style lang="scss" scoped>
  .vue2leaflet-map {
    &.leaflet-container{
      position: absolute;
      width: 1454px;
      height: 568px;
    }
  }
</style>
