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
        style="margin-top: 2.5rem;"
      >
        <b-row>
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
import EchartSem from '@/views/detail/cardDB/echartsem/SEMChartMake.vue'
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
    }
  },
  created() {
  },
  mounted() {
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
</style>
