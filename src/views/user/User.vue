<template>
  <div v-if="userData.role === 'Admin' || userData.role === 'manager'">
    <b-col
      cols="12"
      class="mb-1"
    >
      <b-link
        style="font-size: 26px; color: #fff;"
        to="#"
      > <span> จัดการผู้ใช้งาน </span>
      </b-link>
    </b-col>

    <b-card-code style="background-color: rgba(235, 250, 255, 1.0);">
      <!-- UserEdit.vue -->
      <UserAdd
        @fetch="getUser()"
      />
      <!-- UserAdd.vue -->
      <UserEdit
        ref="childref"
        @fetch="getUser()"
      />
      <!-- -------------- -->
      <b-row>
        <b-col
          md="4"
          sm="4"
          lg="4"
          xs="12"
          class="d-flex align-items-center justify-content-start mb-1"
        >
          <b-input-group
            style="padding-left:24px;"
            size="md"
          >
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              placeholder="ป้อนคำค้นหา"
              label-cols-sm="12"
              label-cols-md="2"
              label-cols-lg="2"
              style=" background-color:rgba(250,250,250, 1);"
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
          md="8"
          sm="12"
          lg="8"
          xs="12"
          class="text-sm-right mb-1"
        >
          <b-button
            id="toggle-btn"
            v-b-modal="'modalAdd'"
            variant="primary"
          >
            <span>
              <!-- <feather-icon
              class="text-light"
              icon="PlusCircleIcon"
              size="20"
            /> -->
              เพิ่มผู้ใช้งาน
            </span>
          </b-button>
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
            <template
              #cell(edit)="data"
            >
              <b-link
                v-b-modal="'modalEdit'"
                @click="$refs.childref.sendInfo(data.item.uid)"
              ><b-img
                height="26"
                src="@/assets/images/icons/Edit.svg"
                style="filter: drop-shadow(1px 1px 1px rgba(171, 161, 0, 0.5));"
              />{{ data.value }}
              </b-link>
              <b-link
                @click.prevent="remove(data.item.uid)"
              >
                <b-img
                  src="@/assets/images/icons/Delete.svg"
                />
                {{ data.value }}
              </b-link>
            </template>
            <!-- <template #cell(delete)="data">
            <b-link
              @click.prevent="remove(data.item.uid)"
            >
              <b-img
                src="@/assets/images/icons/Delete.svg"
              />
              {{ data.value }}
            </b-link>
          </template> -->

            <template #cell(status)="data">
              <b-badge :variant="status[1][data.value]">
                {{ status[0][data.value] }}
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
      <!-- <template #code>
        {{ codeFeedbackHelper }}
      </template> -->
      </b-row>
    </b-card-code>
  </div>

</template>

<script>
import {
  BTable, BBadge, BRow, BCol, BFormGroup, BFormSelect, BPagination, BLink, BCardBody, BButton, BInputGroupAppend,
  BInputGroup, BImg,
  // BInputGroupPrepend,
  BFormInput,
} from 'bootstrap-vue'
import axios from '@axios'
import Ripple from 'vue-ripple-directive'
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import UserEdit from './UserEdit.vue'
import UserAdd from './UserAdd.vue'

export default {
  components: {
    BTable,
    BBadge,
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BPagination,
    BLink,
    UserEdit,
    UserAdd,
    BCardCode,
    BCardBody,
    BButton,
    BInputGroupAppend,
    // BFormText,
    // BFormDatalist,
    // BFormInvalidFeedback,
    BInputGroup,
    // BInputGroupPrepend,
    BFormInput,
    BImg,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      perPage: 25,
      pageOptions: [25, 50, 75, 100],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
        // codeFeedbackHelper,
      },
      addData: {
        id: '',
        username: '',
        firstname: '',
        lasttname: '',
        // department: '',
        password: '',
        role: '',
      },
      userId: '',
      occupationID: '',
      fields: [
        {
          key: 'username', label: 'ชื่อผู้ใช้',
        },
        {
          key: 'firstname', label: 'ชื่อ',
        },
        { key: 'lastname', label: 'นามสกุล', sortable: true },
        // { key: 'department', label: 'หน่วยงาน', sortable: true },
        { key: 'role', label: 'สถานะ', sortable: true },
        {
          key: 'edit', label: 'การจัดการ', requiresAdmin: true, class: 'text-center',
        },
        // { key: 'delete', label: 'ลบ', requiresAdmin: true },
      ],
      items: [],
      status: [{
        1: 'Current', 2: 'Professional', 3: 'Rejected', 4: 'Resigned', 5: 'Applied',
      },
      {
        1: 'light-primary', 2: 'light-success', 3: 'light-danger', 4: 'light-warning', 5: 'light-info',
      }],
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    validation() {
      return this.userId.length > 4 && this.userId.length < 13
    },
    validationOccupation() {
      return this.occupationID.length > 1
    },
    computedFields() {
      // If the user isn't an admin, filter out fields that require auth.
      if (this.userData.role === 'User') return this.fields.filter(field => !field.requiresAdmin)

      // If the user IS an admin, return all fields.
      return this.fields
    },
  },
  mounted() {
    // Set the initial number of items
    this.getUser()
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    getUser() {
      axios
        .post('/get-User-All')
        .then(response => {
          this.items = response.data
          this.totalRows = response.data.length
        })
    },
    remove(id) {
      this.$swal({
        title: '<span style="color:#000000">ต้องการลบข้อมูลหรือไม่?</span>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(async result => {
        if (result.value) {
          try {
            const selectedID = id
            await axios.post('/delete-User-All', { id: selectedID })
            this.$swal({
              icon: 'success',
              title: '<span style="color:#000000">ลบข้อมูลเรียบร้อย.</span>',
              // text: 'Deleted successfully.',
              showConfirmButton: false,
              timer: 1000,
            })
            this.getUser()
          } catch (error) {
            this.$swal({
              title: 'Error!',
              text: ' You clicked the button!',
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
  @import '@core/scss/vue/libs/vue-select.scss';
  </style>
