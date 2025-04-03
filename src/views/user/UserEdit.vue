<template>
  <!-- UserEdit -->
  <b-modal
    id="modalEdit"
    title="แก้ไขข้อมูลผู้ใช้งาน"
    size="1.714rem"
    ok-title="ตกลง"
    cancel-title="ยกเลิก"
    @ok="editInfo"
  >
    <b-row>
      <!-- First name -->
      <b-col cols="12">
        <b-form-group
          label="ชื่อ"
          label-for="firstname"
        >
          <b-input-group class="input-group-merge">
            <b-input-group-prepend is-text>
              <feather-icon icon="UserIcon" />
            </b-input-group-prepend>
            <b-form-input
              id="firstname"
              v-model="editData.firstname"
              type="text"
              placeholder="ชื่อ"
            />
          </b-input-group>
        </b-form-group>
      </b-col>

      <!-- LAST NAME -->
      <b-col cols="12">
        <b-form-group
          label="นามสกุล"
          label-for="lastname"
        >
          <b-input-group class="input-group-merge">
            <!-- <b-input-group-prepend is-text>
                    <feather-icon icon="MailIcon" />
                  </b-input-group-prepend> -->
            <b-form-input
              id="lastname"
              v-model="editData.lastname"
              type="text"
              placeholder="นามสกุล"
            />
          </b-input-group>
        </b-form-group>
      </b-col>

      <!-- DEPARTMENT -->
      <!-- <b-col cols="12">
        <b-form-group
          label="หน่วยงาน"
          label-for="department"
        >
          <v-select
            v-model="editData.department"
            :reduce="department => department.DeptID"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="deptname"
            :options="department"
            transition=""
          />
        </b-form-group>
      </b-col> -->

      <!-- Role -->
      <b-col cols="12">
        <b-form-group
          label="สถานะ"
          label-for="role"
        >
          <v-select
            v-model="editData.role"
            :reduce="role => role.role"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="role"
            :options="role"
            transition=""
          />
        </b-form-group>
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
  BRow, BCol, BFormGroup, BInputGroup, BFormInput, BInputGroupPrepend,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BInputGroup,
    BFormInput,
    vSelect,
    BInputGroupPrepend,
  },
  data() {
    return {
      department: [],
      role: [],
      editData: {
        id: '',
        firstname: '',
        lastname: '',
        // department: '',
        role: '',
      },
      selectedUser: '',
    }
  },
  mounted() {
    // this.dropdownDepartment()
    this.dropdownRole()
  },
  methods: {
    // ดึงข้อมูลผู้ใช้มาแก้ไขในModal
    sendInfo(id) {
      this.selectedUser = id
      axios
        .post('/fetch-User-All', { id: this.selectedUser })
        .then(response => {
          this.editData.firstname = response.data.firstname
          this.editData.lastname = response.data.lastname
          // this.editData.department = response.data.department
          this.editData.role = response.data.role
          this.editData.id = this.selectedUser
          // this.dropdownDepartment()
          this.dropdownRole()
        })
        .catch(error => {
          console.log(error)
        })
    },
    // แก้ไขข้อมูลผู้ใช้ในModal
    async editInfo() {
      const display = this.editData
      axios
        .post('/edit-User-All', display)
        .then(response => {
          console.log(response)
          this.$swal({
            icon: 'success',
            title: '<span style="color:#000000">แก้ไขข้อมูลลเรรียบร้อย.</span>',
            showConfirmButton: false,
            timer: 1000,
          })
          this.$emit('fetch')
        })
        .catch(error => {
          console.log(error)
        })
    },
    // dropdownDepartment() {
    //   axios
    //     .post('/dropdownDepartment')
    //     .then(response => {
    //       this.department = response.data
    //     })
    // },
    dropdownRole() {
      axios
        .post('/dropdown-Role-All')
        .then(response => {
          this.role = response.data
        })
    },
  },
}
</script>
