<template>
  <!-- MODAL Lighting -->
  <b-modal
    id="editProblem"
    title="แจ้งปัญหา"
    size="md"
    @hidden="resetModal"
    @ok.prevent="validationForm"
  >
    <validation-observer ref="simpleRules">
      <b-row>
        <b-col
          md="12"
          lg="12"
          class="mb-1"
        >

          <!-- basic -->
          <b-form-group
            label="ระบุปัญหา"
            label-for="ระบุปัญหา"
          >
            <validation-provider
              #default="{ errors }"
              name="Problem"
              rules="required"
            >
              <b-form-input
                id="basicInput"
                v-model="problem_cause"
                :state="errors.length > 0 ? false:null"
                type="text"
                readonly
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col
          md="12"
          lg="12"
        >
          <b-form-group
            label="ระบุการซ่อมแซม"
            label-for="Problem"
          >
            <validation-provider
              #default="{ errors }"
              name="problemSolving"
              rules="required"
            >
              <b-form-textarea
                id="problemSolving"
                v-model="editData.problem_solving"
                :state="errors.length > 0 ? false:null"
                type="text"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col
          md="12"
          lg="12"
        ><b-form-group
          label="ชื่อ-สกุล/ผู้ซ่อม"
          label-for="Name"
        >
          <validation-provider
            #default="{ errors }"
            name="Name"
            rules="required"
          >
            <b-form-input
              id="nameCause"
              v-model="editData.name_solving"
              :state="errors.length > 0 ? false:null"
              type="text"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group></b-col>
      </b-row>
    </validation-observer>

  </b-modal>
</template>

<script>
import axios from '@axios'
import {
  BRow, BCol, BFormInput, BFormGroup, BFormTextarea,
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
    BFormTextarea,
  },
  data() {
    return {
      required,
      editData: {
        name_solving: '',
        problem_solving: '',
        tid: '',
      },
      problem_cause: '',
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
        this.editProblem()
        this.$nextTick(() => {
          this.$bvModal.hide('editProblem')
        })
      })
    },
    resetModal() {
      this.editData.name_solving = ''
      this.editData.problem_solving = ''
      this.problem_cause = ''
      this.nameState = null
    },
    sendInfo(tid) {
      this.id = tid
      axios
        .post('/fetchTroubleSEMControlDetail-Electic', { tid: this.id })
        .then(response => {
          this.editData.name_solving = response.data[0].name_solving
          this.problem_cause = response.data[0].problem_cause
          this.editData.tid = this.id
        })
        .catch(error => {
          console.log(error)
        })
    },
    editProblem() {
      axios
        .post('/editTroubleSEMControlDetail-Electic', this.editData)
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
