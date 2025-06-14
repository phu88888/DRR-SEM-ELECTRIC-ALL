<template>
  <div>
    <b-row class="match-height">
      <b-col
        lg="12"
        md="12"
        sm="12"
      >
        <SEMCover />
      </b-col>
      <b-col
        lg="9"
        md="12"
        sm="12"
      >
        <CardMap />
      </b-col>
      <b-col
        lg="3"
        md="12"
        sm="12"
      >
        <b-row
          v-if="phaseType === 1"
          style="margin-top: 3.4rem;"
        >
          <!-- แสดงผลตามค่า phase_type -->
          <template>
            <!-- กรณี 1 phase แสดงคอมโพเนนต์ L1PhaseCard -->
            <b-col
              lg="12"
              md="12"
              sm="12"
            >
              <L1PhaseCard />
            </b-col>
          </template>
        </b-row>
        <b-row
          v-else
          style="margin-top: 3.2rem;"
        >
          <template>
            <!-- กรณี 3 phase แสดงคอมโพเนนต์ L1, L2, L3 -->
            <b-col
              lg="12"
              md="12"
              sm="12"
            >
              <L1 />
            </b-col>
            <b-col
              lg="12"
              md="12"
              sm="12"
            >
              <L2 />
            </b-col>
            <b-col
              lg="12"
              md="12"
              sm="12"
            >
              <L3 />
            </b-col>
          </template>
        </b-row>
      </b-col>

      <b-col
        lg="12"
        md="12"
        sm="12"
      >
        <EchartSem />
      </b-col>
      <b-col
        lg="12"
        md="12"
        sm="12"
      >
        <SEMMap />
      </b-col>
      <b-col
        lg="12"
        md="12"
        sm="12"
      >
        <SEMTable />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  // BCardHeader,
  BRow, BCol,
} from 'bootstrap-vue'
import SEMCover from '@/views/detail/cardDB/SEMCover.vue'
import CardMap from '@/views/detail/cardDB/CardDiagram.vue'
// import RoutesAll from '@/views/dashboard/cardDB/RoutesAll.vue'
// import ProvincesAll from '@/views/dashboard/cardDB/ProvincesAll.vue'
import L1 from '@/views/detail/cardDB/L1.vue'
import L2 from '@/views/detail/cardDB/L2.vue'
import L3 from '@/views/detail/cardDB/L3.vue'
import L1PhaseCard from '@/views/detail/cardDB/L1PhaseCard.vue'
import EchartSem from '@/views/detail/cardDB/echartsem/SEMChart.vue'
import SEMMap from '@/views/detail/cardDB/SEMMapDetail.vue'
import SEMTable from '@/views/detail/cardDB/SEMLog.vue'

// import CardVMS from '@/views/dashboard/cardDB/CardVMSDB.vue'
// import CardTraffic from '@/views/dashboard/cardDB/CardTrafficDB.vue'

export default {
  components: {
    SEMCover,
    CardMap,
    // RoutesAll,
    // ProvincesAll,
    L1,
    L2,
    L3,
    L1PhaseCard,
    EchartSem,
    SEMMap,
    SEMTable,
    // BCardHeader,
    BRow,
    BCol,
    // BImg,
    // BLink,
  },
  data() {
    return {
      phaseType: 1, // ค่าเริ่มต้นเป็น 1 phase
    }
  },
  watch: {
    // เมื่อ wid ใน URL เปลี่ยน ให้ดึงค่า phase_type ใหม่
    '$route.query.wid': {
      handler() {
        this.getPhaseType()
      },
      immediate: false,
    },
  },
  created() {
    this.getPhaseType()
  },
  mounted() {
  },
  methods: {
    // ดึงค่า phase_type จาก wayData ใน localStorage ตามค่า wid ปัจจุบัน
    getPhaseType() {
      try {
        // ดึงค่า wid จาก URL query
        const { wid } = this.$route.query

        // ดึงข้อมูลจาก localStorage
        const wayData = JSON.parse(localStorage.getItem('wayData'))

        // ถ้าไม่มีข้อมูลใน localStorage ให้ใช้ค่าเริ่มต้น
        if (!wayData) {
          console.warn('ไม่พบข้อมูล wayData ใน localStorage')
          return
        }

        // แปลง wid เป็น string เพื่อให้แน่ใจว่าเปรียบเทียบประเภทข้อมูลเดียวกัน
        const widStr = String(wid)

        // หา way ที่มี wid ตรงกับที่ต้องการ
        const way = wayData.find(item => String(item.wid) === widStr)

        // ถ้าไม่พบ way ที่ตรงกับ wid ให้ใช้ค่าเริ่มต้น
        if (!way) {
          console.warn(`ไม่พบ way ที่มี wid=${wid} ใน wayData`)
          return
        }

        // ดึงค่า phase_type จาก way ที่พบ
        const phaseType = way.phase_type ? Number(way.phase_type) : 1

        // อัพเดทค่า phaseType
        this.phaseType = phaseType
        console.log(`พบ way สำหรับ wid=${wid}: phase_type=${phaseType}`)
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล phase_type:', error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  @import '@core/scss/vue/libs/vue-flatpicker.scss';

.text1 {
  position: absolute;
  font-family: Arial;
  top: 20px;
  right: 20px;
  color: white;
}
.text2 {
  position: absolute;
  font-family: Arial;
  top: 20px;
  right: 20px;
  color: white;
}

/* สไตล์สำหรับคอมโพเนนต์ 1 phase */
.phase-card-wrapper {
  height: 100%;
  /* ความสูงเท่ากับ 3 คาร์ดรวมกัน */
  min-height: calc(137vh - 250px);
  /* ไม่ต้องกำหนด margin-top ที่นี่เพราะมีการกำหนดที่ b-col แล้ว */
}
</style>
