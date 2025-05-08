<template>
  <div>
    <b-card style="background-color: rgb(250, 250, 250, 1.8); width: 100%; height: 110px; border-radius: 20px">
      <b-row>
        <b-col
          md="12"
          lg="12"
          class="d-flex align-items-center justify-content-start"
        >
          <b-img
            src="@/assets/images/icons/marker/gis_poi-map.svg"
            height="22"
            class="shadow1"
          />
          <span
            style="font-size: 20px;"
            class="ml-1 shadow1"
          > จังหวัดทั้งหมด
          </span>
          <feather-icon
            v-b-modal="'modalprovinces'"
            class="ml-1"
            icon="InfoIcon"
            color="#ff8700"
            style="filter: drop-shadow(1px 1px 1px rgba(76, 40, 0,0.5));"
            size="24"
          />
        </b-col>
        <b-col
          md="12"
          lg="12"
          class="d-flex align-items-end justify-content-end mb-1 shadow1"
        >
          <span style="text-align:left; font-weight: 400; font-size:36px;">
            {{ TotalProvinces }}
          </span>
          <span
            class="ml-1"
            style="text-align:center; font-weight: 300; font-size:20px; margin-bottom: 4px;"
          >
            จังหวัด
          </span>
        </b-col>
      </b-row>
    </b-card>
    <ModalProvincesAll />
  </div>
</template>

<script>
import {
  BCard, BImg, BRow, BCol,
} from 'bootstrap-vue'
import axios from '@axios'
import ModalProvincesAll from '@/views/dashboard/cardDB/modal/ModalProvincesAll.vue'

export default {
  components: {
    BCard,
    // BCardBody,
    // BAvatar,
    BImg,
    BRow,
    BCol,
    ModalProvincesAll,
  },
  data() {
    return {
      TotalProvinces: '',
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {
    this.getProvincesAll()
    this.interval = setInterval(() => {
      this.getProvincesAll()
    }, 300000)
  },
  methods: {
    getProvincesAll() {
      axios
        .post('/count-ProvinceDB-All-Electic')
        .then(response => {
          this.TotalProvinces = response.data[0].total_provinces.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';

.shadow1 {
  filter: drop-shadow(1px 1px 1px rgba(0, 8, 59,0.5));
}
</style>
