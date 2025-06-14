<template>
  <div>
    <b-row>
      <b-col lg="12">
        <b-row>
          <b-col
            cols="12"
            class="d-flex align-items-center justify-content-center mb-1"
          >
            <ColorScale1 style="margin-right: 3rem; width: 8%;" />
            <h3 style="color:#ffffff;">
              Single line Diagram
            </h3>
            <ColorScale2 style="margin-left: 3rem;" />
          </b-col>
        </b-row>
        <b-card
          class="hero4 gradient-border-card-map"
          style="font-size:18px; width:auto; height:auto; background-color:rgba(0, 0, 0, 0.6); color:#ffffff; border: 1px solid #00B058; border-radius: 20px;"
        >
          <b-row>
            <b-col
              cols="12"
              class="d-flex align-items-center justify-content-end"
            >
              <label
                class="mr-1"
                style="color:#ffffff;"
              > เปิด/ปิดตู้ไฟ </label>
              <toggle-button
                class="mr-1"
                :width="60"
                :height="25"
                :sync="true"
                :value="this.switch.drv1_cmd"
                :color="{checked: '#29CD21', unchecked: '#FF0000', disabled: '#29CD21'}"
                :labels="{checked: 'เปิด', unchecked: 'ปิด'}"
                @change="onChangeActive($event)"
              />
            </b-col>
            <b-col
              lg="12"
              md="12"
              sm="12"
            >
              <STW0_1MCB_1PW_1MC_3CB_1TFM_ADJ_2W
                v-if="diagram_type === '0STW-1MCB-1PW-1MC-3CB-1TFM-ADJ' && sem_type === 'nbiot_cab_line_check_2w'"
              />
              <STW0_3MCB_1PW_1CB_1MC_3TFM_2W_67
                v-else-if="diagram_type === '0STW-3MCB-1PW-1CB-1MC-3TFM' && sem_type === 'nbiot_cab_3p_line_check_2w'"
              />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import {
  BRow, BCol, BCard,
} from 'bootstrap-vue'
import 'leaflet/dist/leaflet.css'
import axios from '@axios'
import { ToggleButton } from 'vue-js-toggle-button'

import STW0_1MCB_1PW_1MC_3CB_1TFM_ADJ_2W from '@/views/detail/diagram/0STW-1MCB-1PW-1MC-3CB-1TFM-ADJ-2w.vue'
import STW0_3MCB_1PW_1CB_1MC_3TFM_2W_67 from '@/views/detail/diagram/0STW-3MCB-1PW-1CB-1MC-3TFM-2w-67.vue'

import ColorScale1 from './ColorScale1.vue'
import ColorScale2 from './ColorScale2.vue'

export default {
  components: {
    BCol,
    BRow,
    BCard,
    // eslint-disable-next-line vue/no-unused-components
    STW0_1MCB_1PW_1MC_3CB_1TFM_ADJ_2W,
    STW0_3MCB_1PW_1CB_1MC_3TFM_2W_67,
    ToggleButton,

    ColorScale1,
    ColorScale2,

  },
  data() {
    return {
      waydetail: '',
      checkLeft1: '',
      checkRight1: '',
      checkLeft2: '',
      checkRight2: '',
      deptid: '',
      markers: [],
      items: [],
      switch: {
        semid: '',
        controller_id: 1,
        drv1_cmd: '',
      },
      sem_type: '',
      diagram_type: '',
      equipment: '',
      wid: '',
    }
  },
  computed: {
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  created() {
    this.getCenterSem()
    this.checkSwith()
    this.getValueDiagram()
    this.interval = setInterval(() => {
      this.getValueDiagram()
      this.getCenterSem()
      // this.checkSwith()
    }, 10000)
  },
  mounted() {
    this.wid = this.$route.query.wid
  },
  methods: {
    // แก้ไขฟังก์ชัน onChangeActive เพื่อให้แสดงสถานะที่ถูกต้อง
    onChangeActive(event) {
      // เก็บสถานะที่ต้องการเปลี่ยน
      const targetState = event.value

      this.$swal({
        title: `<span style="color:#000000">ต้องการ${targetState ? 'เปิด' : 'ปิด'}ตู้ไฟหรือไม่</span>`,
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
          try {
            // จัดเตรียมข้อมูล
            const requestData = {
              semid: this.switch.semid,
              wid: this.$route.query.wid,
              controller_id: 1,
              equipment: this.equipment,
              drv1_cmd: targetState,
            }

            console.log('ส่งข้อมูลไป API:', requestData)

            // ส่งคำขอไป API
            const response = await axios.post('/swithSemControl-Electic', requestData)
            console.error('111:', response)
            // สำคัญ: บังคับให้แสดงสถานะตามที่เพิ่งส่งไป API
            this.$nextTick(() => {
              // ใช้ $nextTick เพื่อให้แน่ใจว่า Vue ได้อัพเดท DOM หลังจากการเปลี่ยนค่า
              this.switch.drv1_cmd = targetState
            })

            // แสดงข้อความสำเร็จ
            this.$swal({
              icon: 'success',
              title: `<span style="color:#000000">${targetState ? 'เปิด' : 'ปิด'}เรียบร้อยแล้ว</span>`,
              showConfirmButton: false,
              timer: 1000,
            })

            // รอให้ UI อัพเดทก่อนดึงข้อมูลใหม่
            setTimeout(() => {
              this.getValueDiagram()

              // ไม่ดึงข้อมูลสถานะใหม่ทันที เพื่อให้ UI แสดงตามที่ผู้ใช้เพิ่งเปลี่ยน
              // this.checkSwith();
            }, 1000)
          } catch (error) {
            console.error('Error:', error)

            this.$swal({
              title: 'Error!',
              text: 'ไม่สามารถดำเนินการได้ กรุณาลองใหม่อีกครั้ง',
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })

            // กรณีเกิด error ให้กลับไปค่าเดิม
            this.$nextTick(() => {
              this.switch.drv1_cmd = !targetState
            })
          }
        } else {
          // กรณีกดยกเลิก ให้กลับไปใช้ค่าเดิม
          this.$nextTick(() => {
            this.switch.drv1_cmd = !targetState
          })
        }
      })
    },
    // onChangeActive(event) {
    //   this.$swal({
    //     title: '<span style="color:#000000">ต้องการปิดหรือเปิดตู้ไฟหรือไม่</span>',
    //     icon: 'warning',
    //     showCancelButton: true,
    //     cancelButtonText: 'ยกเลิก',
    //     confirmButtonText: 'ตกลง',
    //     reverseButtons: true,
    //     customClass: {
    //       confirmButton: 'btn btn-primary ml-1',
    //       cancelButton: 'btn btn-danger',
    //     },
    //     buttonsStyling: false,
    //   }).then(async result => {
    //     if (result.value) {
    //       this.switch.drv1_cmd = event.value
    //       try {
    //         await axios.post('/swithSemControl-Electic', this.switch)
    //         if (event.value === true) {
    //           this.$swal({
    //             icon: 'success',
    //             title: '<span style="color:#000000">เปิดเรียบร้อยแล้ว</span>',
    //             showConfirmButton: false,
    //             timer: 1000,
    //           })
    //         } else {
    //           this.$swal({
    //             icon: 'success',
    //             title: '<span style="color:#000000">ปิดเรียบร้อยแล้ว</span>',
    //             showConfirmButton: false,
    //             timer: 1000,
    //           })
    //         }
    //         this.getValueDiagram()
    //         this.checkSwith()
    //       } catch (error) {
    //         this.$swal({
    //           title: 'Error!',
    //           text: ' กดเพื่อดำเนินการต่อ!',
    //           icon: 'error',
    //           customClass: {
    //             confirmButton: 'btn btn-primary',
    //           },
    //           buttonsStyling: false,
    //         })
    //       }
    //     }
    //   })
    // },
    checkSwith() {
      return axios
        .post('/checkSwithSemControl-Electic', { wid: this.$route.query.wid, controller_id: 1 })
        .then(response => {
          if (!response.data || response.data.length === 0) {
            console.warn('ไม่พบข้อมูลจาก API checkSwithSemControl')
            return
          }

          // อัพเดท semid เท่านั้น
          this.switch.semid = response.data[0].id || ''

          // หมายเหตุ: ไม่อัพเดทค่า drv1_cmd เพื่อป้องกันการเด้งกลับ
          console.log('ได้รับข้อมูลจาก API (แต่ไม่อัพเดท UI):', response.data[0])
        })
        .catch(error => {
          console.error('เกิดข้อผิดพลาดใน checkSwith:', error)
        })
    },
    // checkSwith() {
    //   axios
    //     .post('/checkSwithSemControl-Electic', { wid: this.$route.query.wid, controller_id: 1 })
    //     .then(response => {
    //       this.switch.semid = response.data[0].id
    //       if (response.data[0].drv1_cmd === 'CH1:CMD01:MT01=1;') {
    //         this.switch.drv1_cmd = true
    //       } else {
    //         this.switch.drv1_cmd = false
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },
    getCenterSem() {
      axios
        .post('/waySEMControlDetail-Electic', { wid: this.$route.query.wid })
        .then(response => {
          this.center = []
          this.waydetail = response.data[0].detail
          this.deptid = response.data[0].deptid
          this.type_name = response.data[0].type_name
          this.switch.semid = response.data[0].id
          this.diagram_type = response.data[0].diagram_type
          this.equipment = response.data[0].equipment
        })
        .catch(error => {
          console.log(error)
        })
    },
    getValueDiagram() {
      axios
        .post('/getDiagram3P-Electic', { wid: this.$route.query.wid })
        .then(response => {
          this.sem_type = response.data[0].firmware
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>

<style  lang="scss" scoped>
.headline {
  font-size: 20px;
}
.title {
  color:#FFFFD5
}
.nowrap {
  white-space: nowrap ;
}

.hero4 {
    content: "";
    background: url(~@/assets/images/icons/semcontrol/dark.jpg);
    position: absolute;
    /* margin: 20px 150px; */
    background-repeat:no-repeat;
    background-position: center;
    left: 0px;
    top : 0px;
    background-size: cover;
    width: 100%;
    height: 100%;
    opacity: 1.0;
    border-radius: 20px;
  }

  .gradient-border-card-map {
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border: none !important;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  position: relative;
}

/* สร้าง pseudo-element เพื่อทำ gradient border */
.gradient-border-card-map::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 20px;
  padding: 2px; /* ความหนาของ border */
  background: linear-gradient(0.25turn, #40BAB2, #1F7D53, #803C31);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

</style>
