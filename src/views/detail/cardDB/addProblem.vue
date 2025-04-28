<template>
  <!-- MODAL Lighting -->
  <b-modal
    id="addProblem"
    title="แจ้งปัญหา"
    size="md"
    @hidden="resetModal"
    @ok.prevent="validationForm"
  >
    <validation-observer ref="simpleRules">
      <b-row>
        <b-col
          md="12"
          xl="12"
          class="mb-1"
        >
          <!-- basic -->
          <b-form-group
            label="ระบุปัญหา"
          >
            <validation-provider
              #default="{ errors }"
              name="Problem"
              rules="required"
            >
              <b-form-input
                v-model="addData.problem_cause"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <b-col
          md="12"
          xl="12"
          class="mb-1"
        >
          <validation-provider
            #default="{ errors }"
            name="Name"
            rules="required"
          >
            <b-form-group
              label="ชื่อ-สกุล/ผู้แจ้ง"
            >
              <b-form-input
                v-model="addData.name_cause"
                placeholder="เช่น สมศักดิ์ ศรีดี"
              />
            </b-form-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
      </b-row>
    </validation-observer>

  </b-modal>
</template>

<script>
import axios from '@axios'
import {
  BRow, BCol, BFormInput, BFormGroup,
} from 'bootstrap-vue'
import { required } from '@validations'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  components: {
    BRow,
    BCol,
    BFormInput,
    BFormGroup,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      required,
      addData: {
        problem_cause: '',
        name_cause: '',
        wid: this.$route.query.wid,
      },
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (!success) {
          return
        }
        this.addProblem()
        this.$nextTick(() => {
          this.$bvModal.hide('addProblem')
        })
      })
    },
    resetModal() {
      this.addData.problem_cause = ''
      this.addData.name_cause = ''
      this.nameState = null
    },
    addProblem() {
      axios
        .post('/addTroubleSEMControlDetail', this.addData)
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          this.$swal({
            icon: 'success',
            title: '<span style="color:#000000">บันทึกสำเร็จ</span>',
            showConfirmButton: false,
            timer: 1000,
          })
          this.$emit('fetch')
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>

<style>

</style>
