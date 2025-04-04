<template>
  <div>
    <b-row class="match-height">
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
        <b-row class="match-height">
          <b-col
            lg="12"
            md="12"
            sm="12"
          >
            <GraphPCUTop5 />
          </b-col>
          <b-col
            lg="12"
            md="12"
            sm="12"
          >
            <GraphRadarPCUAADT5 />
          </b-col>
          <b-col
            lg="12"
            md="12"
            sm="12"
          >
            <TruckTop10 />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  // BCardHeader,
  BRow, BCol,
} from 'bootstrap-vue'
import CardMap from '@/views/detail/cardDB/CardMapDB.vue'
// import RoutesAll from '@/views/dashboard/cardDB/RoutesAll.vue'
// import ProvincesAll from '@/views/dashboard/cardDB/ProvincesAll.vue'
import GraphPCUTop5 from '@/views/detail/cardDB/GraphPCUTop5.vue'
import GraphRadarPCUAADT5 from '@/views/detail/cardDB/GraphRadarPCUAADT5.vue'
import TruckTop10 from '@/views/detail/cardDB/TruckTop10.vue'

// import CardVMS from '@/views/dashboard/cardDB/CardVMSDB.vue'
// import CardTraffic from '@/views/dashboard/cardDB/CardTrafficDB.vue'

export default {
  components: {
    CardMap,
    // RoutesAll,
    // ProvincesAll,
    GraphPCUTop5,
    GraphRadarPCUAADT5,
    TruckTop10,
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
