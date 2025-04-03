<template>
  <!-- Add -->
  <b-modal
    id="modalAdd"
    ref="my-modal"
    title="เพิ่มข้อมูลผู้ใช้งาน"
    size="1.714rem"
    ok-title="ตกลง"
    cancel-title="ยกเลิก"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <validation-observer ref="simpleRules">
      <b-row>
        <!-- First name -->
        <b-col cols="12">
          <b-form-group
            label="ชื่อ"
            label-for="firstname"
          >
            <validation-provider
              #default="{ errors }"
              name="First name"
              rules="required"
            >
              <b-input-group class="input-group-merge">
                <b-form-input
                  id="firstname"
                  v-model="addData.firstname"
                  :state="errors.length > 0 ? false:null"
                  required
                  type="text"
                  placeholder="ชื่อ"
                />
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- LAST NAME -->
        <b-col cols="12">
          <b-form-group
            label="นามสกุล"
            label-for="lastname"
          >
            <validation-provider
              #default="{ errors }"
              name="Last Name"
              rules="required"
            >
              <b-input-group class="input-group-merge">
                <b-form-input
                  id="lastname"
                  v-model="addData.lastname"
                  :state="errors.length > 0 ? false:null"
                  required
                  type="text"
                  placeholder="นามสกุล"
                />
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- DEPARTMENT -->
        <!-- <b-col cols="12">
          <b-form-group
            label="หน่วยงาน"
            label-for="department"
          >
            <validation-provider
              #default="{ errors }"
              name="หน่วยงาน"
              rules="required"
            >
              <v-select
                v-model="addData.department"
                :reduce="department => department.DeptID"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :state="errors.length > 0 ? false:null"
                required
                label="deptname"
                :options="department"
                transition=""
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col> -->

        <!-- Role -->
        <b-col cols="12">
          <b-form-group
            label="สถานะ"
            label-for="role"
          >
            <validation-provider
              name="สถานะ"
            >
              <v-select
                v-model="addData.role"
                :reduce="role => role.role"
                required
                label="role"
                :options="role"
                transition=""
              />
            </validation-provider>
          </b-form-group>
        </b-col>
        <!-- Username -->
        <b-col cols="12">
          <b-form-group
            label="บัญชีผู้ใช้"
            label-for="username"
          >
            <validation-provider
              #default="{ errors }"
              name="บัญชีผู้ใช้"
              rules="required"
            >
              <b-input-group class="input-group-merge">
                <b-form-input
                  id="username"
                  v-model="addData.username"
                  :state="errors.length > 0 ? false:null"
                  required
                  type="text"
                  placeholder="บัญชีผู้ใช้"
                />
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <!-- password -->
        <b-col cols="12">
          <b-form-group
            label="รหัสผ่าน"
            label-for="password"
          >
            <validation-provider
              #default="{ errors }"
              name="รหัสผ่าน"
              rules="required"
            >
              <b-input-group class="input-group-merge">
                <b-form-input
                  id="password"
                  v-model="addData.password"
                  type="password"
                  :state="errors.length > 0 ? false:null"
                  required
                  placeholder="รหัสผ่าน"
                />
              </b-input-group>
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <template #code>
          {{ codeFeedbackHelper }}
        </template>
      </b-row>
    </validation-observer>
  </b-modal>
</template>

<script>
import axios from '@axios'
import {
  BRow, BCol, BFormGroup, BInputGroup, BFormInput,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { required } from '@validations'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BInputGroup,
    BFormInput,
    vSelect,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      required,
      // department: [],
      role: [],
      username: null,
      password: null,
      addData: {
        firstname: '',
        lastname: '',
        // department: '',
        role: '',
        username: '',
        password: '',
      },
    }
  },
  mounted() {
    // this.dropdownDepartment()
    this.dropdownRole()
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      // this.addData.username = ''
      // this.addData.password = ''
      this.username = valid
      this.password = valid
      return valid
    },
    resetModal() {
      this.addData.firstname = ''
      this.addData.lastname = ''
      // this.addData.department = ''
      this.addData.role = ''
      this.addData.username = ''
      this.addData.password = ''
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      this.addInfo()
      this.$nextTick(() => {
        this.$refs['my-modal'].toggle('#toggle-btn')
      })
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.validationForm()
    },
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (!success) {
          // eslint-disable-next-line
          return
        }
        this.addInfo()
        this.$nextTick(() => {
          this.$bvModal.hide('modalAdd')
        })
      })
    },

    // เพิ่มข้อมูลปุ่ม Add
    async addInfo() {
      // eslint-disable-next-line global-require
      const bcrypt = require('bcryptjs')
      const hash = bcrypt.hashSync(this.addData.password)
      const payload = {
        ...this.addData,
        firstname: this.addData.firstname,
        lastname: this.addData.lastname,
        password: hash,
        // department: this.addData.department,
        username: this.addData.username,
        role: this.addData.role,
      }
      axios
        .post('/add-User-All', payload)
        .then(response => {
          console.log(response)
          this.$swal({
            icon: 'success',
            title: '<span style="color:#000000">เพิ่มผู้ใช้งานเรียบร้อย.</span>',
            showConfirmButton: false,
            timer: 1000,
          })
          this.addData.firstname = ''
          this.addData.lastname = ''
          // this.addData.department = ''
          this.addData.role = ''
          this.addData.username = ''
          this.addData.password = ''
          this.$emit('fetch')
        })
        .catch(error => {
          console.log(error.response)
          this.$swal({
            icon: 'error',
            text: error.response.data.message,
            showConfirmButton: false,
            timer: 2000,
          })
          this.addData.firstname = ''
          this.addData.lastname = ''
          // this.addData.department = ''
          this.addData.role = ''
          this.addData.username = ''
          this.addData.password = ''
        })
    },
    // dropdownDepartment() {
    //   axios
    //     .post('/dropdownDepartment')
    //     .then(response => {
    //       console.log(response.data)
    //       this.department = response.data
    //     })
    // },
    dropdownRole() {
      axios
        .post('/dropdown-Role-All')
        .then(response => {
          console.log(response.data)
          this.role = response.data
        })
    },
  },
}
</script>
