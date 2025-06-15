<template>
  <div>
    <b-row>
      <b-col
        cols="12"
        class="mb-1"
      >
        <span style="font-size:20px; color: #fff;">ตารางสรุปจุดติดตั้งแต่ละสายทาง</span>
      </b-col>
      <b-col cols="12">
        <b-table
          responsive
          :items="items"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          :filter="filter"
          :filter-included-fields="filterOn"
          :per-page="0"
          @filtered="onFiltered"
        >
          <!-- ปุ่มเข้าหน้าสายทาง -->
          <template #cell(wid)="data">
            <b-button
              size="sm"
              variant="primary"
              title="เข้าหน้าสายทาง"
              :to="{ path: `/?wid=${data.item.id}&type=${data.item.equipment}`}"
            >
              <feather-icon
                icon="MapIcon"
                size="16"
              />
              สายทาง
            </b-button>
          </template>

          <template #cell(Info)="data">
            <b-button
              v-if="data.item.contract_no"
              v-b-modal="'modalProject'"
              title="กดเพื่อดูเพิ่มเติม"
              size="sm"
              variant="link"
              class="p-0"
              @click="$refs.pid2.InfoProject(data.item.id)"
            >
              <feather-icon
                icon="InfoIcon"
                size="16"
                style="color: #11DF00;"
              />
            </b-button>
          </template>
          <!-- <template #cell(wid)="data">
            <div>
              <b-link
                v-if="data.item.sem_type == 'nbiot_cab_pole_hm_3p'"
                :to="{ path: `/semcontrol-detail?wid=${data.item.wid}&type=${data.item.equipment}&imei=${data.item.imei}`}"
                style="text-decoration: underline; color: #11DF00;"
              >
                <span>ดูเพิ่มเติ่ม</span>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="24"
                />
              </b-link>
              <b-link
                v-if="data.item.sem_type == 'nbiot_cab_3p' || data.item.sem_type == 'nbiot_cab_3p_line_check_2w' || data.item.sem_type == 'nbiot_cab_3p_line_check_6w'|| data.item.sem_type == 'nbiot_cab_3p_line_check_4w'|| data.item.sem_type == 'nbiot_cab_3p_line_check_1w'|| data.item.sem_type == 'nbiot_cab_3p_line_check_3w'"
                :to="{ path: `/SEMNB-iotCab3P?wid=${data.item.wid}&type=${data.item.equipment}&imei=${data.item.imei}`}"
                style="text-decoration: underline; color: #11DF00;"
              >
                <span>ดูเพิ่มเติ่ม</span>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="24"
                />
              </b-link>
              <b-link
                v-if="data.item.sem_type == 'nbiot_cab_line_check_2w' || data.item.sem_type == 'nbiot_cab_line_check_4w' || data.item.sem_type === 'nbiot_cab_line_check_1w_r' || data.item.sem_type === 'nbiot_cab_line_check_1w_l' || data.item.sem_type === 'nbiot_cab_1p'"
                :to="{ path: `/semcontrol-detail1?wid=${data.item.wid}&type=${data.item.equipment}&imei=${data.item.imei}`}"
                style="text-decoration: underline; color: #11DF00;"
              >
                <span>ดูเพิ่มเติ่ม</span>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="24"
                />
              </b-link>
              <b-link
                v-if="data.item.sem_type == 'lora_lighting'"
                :to="{ path: `/sem-detail?wid=${data.item.wid}&type=${data.item.equipment}&imei=${data.item.imei}`}"
                style="text-decoration: underline; color: #11DF00;"
              >
                <span>ดูเพิ่มเติ่ม</span>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="24"
                />
              </b-link>
              <b-link
                v-if="data.item.sem_type == 'nbiot_cab_lora'"
                :to="{ path: `/nbiot-lora?wid=${data.item.wid}&type=${data.item.equipment}&imei=${data.item.imei}`}"
                style="text-decoration: underline; color: #11DF00;"
              >
                <span>ดูเพิ่มเติ่ม</span>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="24"
                />
              </b-link>
            </div>
          </template> -->
          <template #cell(ISOnline)="data">
            <b-badge
              v-if="data.item.sem_type != 'lora_lighting' && data.value === 'Online'"
              variant="light-success"
            >
              Online
            </b-badge>
            <div
              v-if="data.item.sem_type != 'lora_lighting' && data.value === 'Offline'"
              class="blink-text offline-badge"
            >
              Offline
            </div>
            <b-badge
              v-if="data.item.sem_type === 'lora_lighting' && data.item.SemISOnline === 'Online'"
              variant="light-success"
            >
              Online
            </b-badge>
            <div
              v-if="data.item.sem_type === 'lora_lighting' && data.item.SemISOnline === 'Offline'"
              class="blink-text offline-badge"
            >
              Offline
            </div>
          </template>
          <template #cell(ISNormal)="data">
            <div
              v-if="data.item.sem_type != 'lora_lighting' && data.item.sem_type != 'nbiot_cab_lora' && data.item.ISOnline == 'Offline'"
              class="blink-text orange-badge"
            >
              ผิดปกติ
            </div>
            <b-badge
              v-if="data.item.sem_type != 'lora_lighting' & data.item.sem_type != 'nbiot_cab_lora' & data.item.issue_linecheck == null & data.item.issue_circuit == null & data.item.ISOnline == 'Online'"
              :variant="ISNormal[1][data.value]"
            >
              {{ ISNormal[0][data.value] }}
            </b-badge>
            <b-badge
              v-if="data.item.sem_type != 'lora_lighting' && data.item.sem_type != 'nbiot_cab_lora' && data.item.issue_linecheck == 0 && data.item.issue_circuit == 0 && data.item.ISOnline == 'Online'"
              variant="success"
            >
              ปกติ
            </b-badge>
            <div
              v-if="data.item.sem_type != 'lora_lighting' && data.item.sem_type != 'nbiot_cab_lora' && data.item.issue_linecheck == 1 && data.item.issue_circuit == 0 && data.item.ISOnline == 'Online'"
              class="blink-text orange-badge"
            >
              สายขาด
            </div>
            <div
              v-if="data.item.sem_type != 'lora_lighting' && data.item.sem_type != 'nbiot_cab_lora' && data.item.issue_linecheck == 0 && data.item.issue_circuit == 1 && data.item.ISOnline == 'Online'"
              class="blink-text orange-badge"
            >
              วงจรผิดปกติ
            </div>
            <div
              v-if="data.item.sem_type != 'lora_lighting' && data.item.sem_type != 'nbiot_cab_lora' && data.item.issue_linecheck == 1 && data.item.issue_circuit == 1 && data.item.ISOnline == 'Online'"
              class="blink-text orange-badge"
            >
              วงจรผิดปกติและสายขาด
            </div>
            <span
              v-if="data.item.sem_type === 'lora_lighting' || data.item.sem_type === 'nbiot_cab_lora'"
            >
              ทั้งหมด {{ data.item.Total }}
            </span>
          </template>
          <template #cell(lastupdate)="data">
            <span
              v-if="data.item.sem_type !== 'lora_lighting'"
            >
              {{ data.item.lastupdate }}
            </span>
            <span
              v-if="data.item.sem_type === 'lora_lighting'"
            >
              {{ data.item.sem_lastupdate }}
            </span>
          </template>
          <template #cell(Online)="data">
            {{ data.item.Total - data.item.Offline }}
          </template>
          <template #cell(Offline)="data">
            {{ data.value }}
          </template>
          <template #cell(contract_no)="data">
            <div>
              <span v-if="data.item.contract_no">
                {{ data.item.contract_no }}
                <span
                  v-if="data.item.contract_no && isCurrentYearContract(data.item.contract_no)"
                  class="blink-text new-badge"
                >
                  New
                </span>
              </span>
              <span v-else-if="data.item.budget_year">
                {{ data.item.budget_year }}
                <span
                  v-if="isCurrentYearBudget(data.item.budget_year)"
                  class="blink-text new-badge"
                >
                  New
                </span>
              </span>
            </div>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <modal-Project ref="pid2" />
  </div>
</template>

<script>
import {
  BRow, BCol, BTable, BBadge, BButton,
} from 'bootstrap-vue'
import axios from '@axios'
import modalProject from './modalProject.vue'

export default {
  components: {
    BRow,
    BCol,
    BTable,
    // BLink,
    BBadge,
    modalProject,
    BButton,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      wayData: [], // เพิ่มตัวแปรสำหรับเก็บข้อมูลสายทาง
      fields: [
        // {
        //   key: 'route',
        //   label: 'ลำดับ',
        //   class: 'text-center',
        //   sortable: false,
        // },
        {
          key: 'detail',
          label: 'จุดติดตั้ง',
          class: 'text-center',
        },
        {
          key: 'ISNormal',
          label: 'สถานะ',
          class: 'text-center',
          sortable: false,
        },
        {
          key: 'ISOnline',
          label: 'การเชื่อมต่อ',
          class: 'text-center',
          sortable: false,
        },
        {
          key: 'lastupdate',
          label: 'อัพเดตล่าสุด',
          class: 'text-center',
          sortable: true,
        },
        // {
        //   key: 'wid',
        //   label: 'รายละเอียด',
        //   class: 'text-center',
        // },
        {
          key: 'wid',
          label: 'สายทาง',
          class: 'text-center',
          sortable: false,
        },
        {
          key: 'contract_no',
          label: 'เลขที่สัญญา',
          class: 'text-center',
          sortable: true,
        },
        {
          key: 'Info',
          label: 'ข้อมูลโครงการ',
          class: 'text-center',
        },
      ],
      items: [],
      perPage: 100,
      pageOptions: [25, 50, 75, 100],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      ISOnline: [{
        Online: 'ออนไลน์', Offline: 'ออฟไลน์',
      },
      {
        Online: 'light-success', Offline: 'light-danger',
      }],
      ISNormal: [{
        Online: 'ปกติ', Offline: 'ผิดปกติ',
      },
      {
        Online: 'success', Offline: 'danger',
      }],
      SemISOnline: [{
        Online: 'ออนไลน์', Offline: 'ออฟไลน์',
      },
      {
        Online: 'light-success', Offline: 'light-danger',
      }],
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      // ทำ action ที่คุณต้องการเมื่อ path เปลี่ยน (แม้เป็น path เดิม)
      this.fetchWayData()
    },
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {
    this.fetchWayData() // เรียกฟังก์ชันดึงข้อมูลสายทางแทน
  },
  methods: {
    // ฟังก์ชันสำหรับไปหน้าสายทาง
    goToRoute(item) {
      // ใช้ข้อมูลจาก wayData ที่ดึงมาจาก API
      if (this.wayData && this.wayData.length > 0) {
        // บันทึกข้อมูลลงใน localStorage
        localStorage.setItem('wayData', JSON.stringify(this.wayData))
      }

      // นำทางไปหน้าสายทาง พร้อมส่ง parameter ที่จำเป็น
      this.$router.push({
        path: '/route-page', // เปลี่ยนเป็น path ที่ต้องการ
        query: {
          id: item.id,
          DeptID: this.$route.query.DeptID,
          equipment: item.equipment,
          // imei: item.imei,
        },
      })
    },

    // ฟังก์ชันดึงข้อมูลสายทาง
    fetchWayData() {
      try {
        // ดึง deptid จาก userData
        const deptid = this.userData ? this.userData.deptid : null

        if (deptid) {
          // เรียก API เพื่อดึงข้อมูลสายทางล่าสุด
          axios.post('/GetSEMWayData-Electic', {
            deptid,
          })
            .then(response => {
              if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                // บันทึกข้อมูลลงใน wayData
                this.wayData = response.data

                // ใช้ข้อมูลจาก API โดยตรงสำหรับตาราง
                this.items = response.data.map(item => ({
                  ...item,
                  // ข้อมูลพื้นฐานจาก API
                  id: item.wid, // ใช้ wid เป็น id
                  // เพิ่มข้อมูลที่จำเป็นสำหรับตารางแต่ไม่มีใน API
                  ISOnline: 'Online', // ค่าเริ่มต้น เนื่องจากไม่มีใน API
                  ISNormal: 'Online', // ค่าเริ่มต้น เนื่องจากไม่มีใน API
                  lastupdate: new Date().toLocaleString('th-TH'), // วันที่ปัจจุบัน
                  Total: 1, // ค่าเริ่มต้น
                  Offline: 0, // ค่าเริ่มต้น
                  contract_no: '', // ค่าเริ่มต้น
                  budget_year: '', // ค่าเริ่มต้น
                  // ข้อมูลสำหรับ LoRa lighting (ถ้าจำเป็น)
                  SemISOnline: 'Online',
                  sem_lastupdate: new Date().toLocaleString('th-TH'),
                  issue_linecheck: null,
                  issue_circuit: null,
                }))

                this.totalRows = this.items.length

                // บันทึกข้อมูลลงใน localStorage
                localStorage.setItem('wayData', JSON.stringify(response.data))

                console.log('ดึงข้อมูลสายทางสำเร็จ:', response.data.length, 'รายการ')
                console.log('ข้อมูลตัวอย่าง:', this.items[0])
              } else {
                // ถ้าไม่มีข้อมูลจาก API ให้ใช้ข้อมูลจาก localStorage
                this.loadWayDataFromStorage()
              }
            })
            .catch(error => {
              console.error('Error fetching way data from API:', error)
              // ถ้าเรียก API ไม่สำเร็จ ให้ใช้ข้อมูลจาก localStorage
              this.loadWayDataFromStorage()
            })
        } else {
          // ถ้าไม่มี deptid ให้ใช้ข้อมูลจาก localStorage
          this.loadWayDataFromStorage()
        }
      } catch (error) {
        console.error('Error in fetchWayData:', error)
        this.loadWayDataFromStorage()
      }
    },

    // ฟังก์ชันโหลดข้อมูลสายทางจาก localStorage
    loadWayDataFromStorage() {
      try {
        const storedWayData = localStorage.getItem('wayData')
        if (storedWayData) {
          this.wayData = JSON.parse(storedWayData)

          // ใช้ข้อมูลจาก localStorage โดยตรงสำหรับตาราง
          this.items = this.wayData.map(item => ({
            ...item,
            // ข้อมูลพื้นฐานจาก API
            id: item.wid, // ใช้ wid เป็น id
            // เพิ่มข้อมูลที่จำเป็นสำหรับตารางแต่ไม่มีใน API
            ISOnline: 'Online', // ค่าเริ่มต้น
            ISNormal: 'Online', // ค่าเริ่มต้น
            lastupdate: new Date().toLocaleString('th-TH'), // วันที่ปัจจุบัน
            Total: 1, // ค่าเริ่มต้น
            Offline: 0, // ค่าเริ่มต้น
            contract_no: '', // ค่าเริ่มต้น
            budget_year: '', // ค่าเริ่มต้น
            // ข้อมูลสำหรับ LoRa lighting (ถ้าจำเป็น)
            SemISOnline: 'Online',
            sem_lastupdate: new Date().toLocaleString('th-TH'),
            issue_linecheck: null,
            issue_circuit: null,
          }))

          this.totalRows = this.items.length
          console.log('โหลดข้อมูลสายทางจาก localStorage:', this.wayData.length, 'รายการ')
        } else {
          console.log('ไม่พบข้อมูลสายทางใน localStorage')
          this.wayData = []
          this.items = []
          this.totalRows = 0
        }
      } catch (error) {
        console.error('Error loading way data from localStorage:', error)
        this.wayData = []
        this.items = []
        this.totalRows = 0
      }
    },

    // ฟังก์ชันตรวจสอบว่าเป็นปีงบประมาณปัจจุบันหรือไม่จากเลขที่สัญญา
    isCurrentYearContract(contract) {
      if (!contract) return false

      // ดึงปี พ.ศ. ปัจจุบัน
      const currentDate = new Date()
      const currentYear = currentDate.getFullYear() + 543 // แปลงเป็นปี พ.ศ.

      // ตรวจสอบว่าเลขที่สัญญามีปีปัจจุบันหรือไม่
      return contract.includes(`/${currentYear}`)
    },

    // ฟังก์ชันตรวจสอบว่าเป็นปีงบประมาณปัจจุบันหรือไม่จากปีงบประมาณ
    isCurrentYearBudget(budgetYear) {
      if (!budgetYear) return false

      // ดึงปี พ.ศ. ปัจจุบัน
      const currentDate = new Date()
      const currentYear = currentDate.getFullYear() + 543 // แปลงเป็นปี พ.ศ.

      // ตรวจสอบว่าปีงบประมาณตรงกับปีปัจจุบันหรือไม่
      return budgetYear === currentYear.toString()
    },

    getMenuCount() {
      // ฟังก์ชันนี้ยังคงไว้สำหรับใช้ในอนาคต หากต้องการ
      // หรือสามารถลบออกได้หากไม่ใช้งาน
      console.log('getMenuCount function - สำรองไว้')
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
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
  // .leaflet-container a.leaflet-popup-close-button {
  //   padding: 0 0 0 0
  // }
</style>

<style>
@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
}

.blink-text {
  animation: blink 1.5s infinite;
  font-weight: bold;
}

.offline-badge {
  display: inline-block;
  padding: 0.25em 0.6em;
  font-size: 0.9em;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  background-color: #dc3545 !important;
  color: white !important;
}

.orange-badge {
  display: inline-block;
  padding: 0.25em 0.6em;
  font-size: 0.9em;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  background-color: orange !important;
  color: black !important;
}
.new-badge {
  display: inline-block;
  padding: 0.15em 0.4em;
  margin-left: 5px;
  font-size: 0.75em;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: text-top;
  border-radius: 0.25rem;
  background-color: #FFD700 !important; /* สีทอง */
  color: #000000 !important; /* สีดำ */
  box-shadow: 0 0 8px rgba(255, 215, 0, 0.7);
  text-shadow: none;
  animation: blink 1.5s infinite;
}
</style>
