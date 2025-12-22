<template>
  <b-row>
    <b-col cols="12">
      <div
        class="bg-login auth-wrapper auth-v1 px-2"
      >
        <div class="py-2">

          <b-img
            class="logo-login"
            src="@/assets/images/logo/loginnew3.png"
          />
          <!-- Login v1 -->
          <b-card
            style="background-color:rgba(36,36,36, 0.75); border: 1px solid #363636; border-radius: 32px;"
            class="mb-0"
          >
            <b-link class="brand-logo">

              <span
                style="font-size: 40px; font-weight: 500; text-shadow: 2px 2px #fff;"
                class="textg"
              >
                Login
              </span>
            </b-link>

            <b-card-title
              class="brand-logo"
              style="color:#fff; font-size:20px; text-shadow: 2px 2px 2px #fff;"
            >
              Welcome to SEM Lighting
            </b-card-title>

            <!-- form -->
            <validation-observer
              ref="loginForm"
              #default="{invalid}"
            >
              <b-form
                class="auth-login-form mt-2"
                @submit.prevent="login()"
              >

                <!-- username -->
                <b-form-group
                  label-for="username"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Username"
                    rules="required"
                  >
                    <b-input-group class="input-group-merge">
                      <b-input-group-prepend is-text>
                        <b-img
                          width="18px;"
                          height="20px;"
                          src="@/assets/images/icons/login/User.svg"
                          style="filter: brightness(0) invert(1);"
                        />
                      </b-input-group-prepend>
                      <b-form-input
                        id="username"
                        v-model="username"
                        style="background-color: rgba(36,36,36, 0.75); color: white;"
                        name="login-username"
                        :state="errors.length > 0 ? false:null"
                        placeholder="Username"
                        autofocus
                      />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <!-- password -->
                <b-form-group
                  style="background-color: rgba(36,36,36, 0.75);"
                >
                  <!-- <div class="d-flex justify-content-between">
                <label for="password">Password</label>
                <b-link :to="{name:'auth-forgot-password-v1'}">
                  <small>Forgot Password?</small>
                </b-link>
              </div> -->
                  <validation-provider
                    #default="{ errors }"
                    name="Password"
                    rules="required"
                  >
                    <b-input-group
                      class="input-group-merge"
                      :class="errors.length > 0 ? 'is-invalid':null"
                    >
                      <b-input-group-prepend
                        is-text
                        class="form-control-merge"
                      >
                        <b-img
                          width="18px;"
                          height="20px;"
                          src="@/assets/images/icons/login/Lock.svg"
                          style="filter: brightness(0) invert(1);"
                        />
                      </b-input-group-prepend>
                      <b-form-input
                        id="password"
                        v-model="password"
                        :type="passwordFieldType"
                        style="background-color: rgba(36,36,36, 0.75); color: white;"
                        class="form-control-merge"
                        :state="errors.length > 0 ? false:null"
                        name="login-password"
                        placeholder="Password"
                      />
                      <b-input-group-append is-text>
                        <feather-icon
                          class="cursor-pointer"
                          :icon="passwordToggleIcon"
                          @click="togglePasswordVisibility"
                        />
                      </b-input-group-append>
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>

                <!-- checkbox -->
                <b-form-group>
                  <b-form-checkbox
                    id="remember-me"
                    v-model="status"
                    name="checkbox-1"
                    style="color: #fff;"
                  >
                    <span style="color:#fff;">
                      Remember Me
                    </span>
                  </b-form-checkbox>
                </b-form-group>

                <!-- submit button -->
                <b-button
                  variant="primary"
                  type="submit"
                  block
                  :disabled="invalid"
                >
                  Log in
                </b-button>
              </b-form>
            </validation-observer>

          </b-card>
          <!-- /Login v1 -->
        </div>
      </div>
    </b-col>
  </b-row>

</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton, BForm, BFormInput, BFormGroup, BCard, BLink, BCardTitle, BRow, BCol,
  BInputGroup, BInputGroupAppend, BImg, BInputGroupPrepend, BFormCheckbox,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import axios from '@axios'
import store from '@/store/index'

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BInputGroupPrepend,
    BFormCheckbox,
    BCard,
    // BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      password: '',
      username: '',
      // sideImg: require('@/assets/images/pages/login/1.svg'),
      // validation rulesimport store from '@/store/index'
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        // this.sideImg = require('@/assets/images/pages/login/1.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('auth/login', {
          username: this.username,
          password: this.password,
        })

        this.$swal.fire({
          position: 'center',
          icon: 'success',
          text: 'เข้าสู่ระบบสำเร็จ',
          showConfirmButton: false,
          timer: 1500,
        })

        // ดึงข้อมูล deptid จาก localStorage หรือ store
        const userData = JSON.parse(localStorage.getItem('userData'))
        const deptid = userData.deptid || this.$store.state.auth.deptid

        // เรียกใช้ API /GetSEMWayData-Electic ด้วย deptid
        setTimeout(async () => {
          try {
            const response = await axios.post('/GetSEMWayData-Electic', { deptid })

            if (response.data && response.data.length > 0) {
              // เก็บข้อมูล wayData ทั้งหมดลงใน localStorage
              localStorage.setItem('wayData', JSON.stringify(response.data))
              console.log('บันทึกข้อมูล wayData ลงใน localStorage สำเร็จ', response.data)

              // นำ wid แรกสุดที่ได้มาใช้แทนค่า wid ที่ fix ไว้
              const firstItem = response.data[0]
              const { wid } = firstItem
              const equipment = firstItem.equipment || 'iot4g-67'

              this.$router.push(`/?wid=${wid}&type=${equipment}`)
            } else {
              // กรณีไม่มีข้อมูล ให้แสดงข้อความแจ้งเตือน
              this.$swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'ไม่พบข้อมูล',
                text: 'ไม่พบข้อมูลในระบบ กรุณาติดต่อผู้ดูแลระบบ',
                showConfirmButton: true,
              })
            }
          } catch (apiError) {
            console.error('Error fetching SEM way data:', apiError)
            // กรณีเกิด error ให้แสดงข้อความแจ้งเตือน
            this.$swal.fire({
              position: 'center',
              icon: 'error',
              title: 'เกิดข้อผิดพลาด',
              text: 'ไม่สามารถเชื่อมต่อกับระบบได้ กรุณาลองใหม่อีกครั้งหรือติดต่อผู้ดูแลระบบ',
              showConfirmButton: true,
            })
          }
        }, 1500)
      } catch (error) {
        this.$swal.fire({
          position: 'center',
          icon: 'error',
          text: 'กรุณาลองอีกครั้ง',
          showConfirmButton: false,
          timer: 1500,
        })
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
@import '@/assets/scss/login.scss';
</style>
