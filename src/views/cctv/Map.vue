<template>
  <div>
    <b-row>
      <b-col
        lg="12"
        md="12"
      >
        <h3>แผนที่</h3>
      </b-col>
      <b-col cols="12">
        <b-card style="background-color: rgba(255, 127, 96, 0.0); width: 100%; height: 500px;">
          <l-map
            ref="mymap"
            :zoom="zoom"
            :center="center"
            style="width: 100%; height: 500px; z-index: 0"
            :options="{scrollWheelZoom:false, zoomControl: true, attributionControl:false, dragging:true, doubleClickZoom: true, permanent: true}"
          >
            <l-tile-layer
              :url="url"
              :attribution="attribution"
            />
            <l-marker
              v-for="(marker, index) in markers"
              :key="'marker'+index"
              ref="marker"
              :lat-lng="[marker.latitude, marker.longitude]"
              @click="getInfo(marker.day_count, marker.province, marker.ISOnline)"
            >
              <l-icon
                v-if="marker.ISOnline === 'Online'"
                :icon-size="[16, 46]"
                :icon-anchor="[16, 37]"
                :icon-url="require('@/assets/images/icons/CCTVon.svg')"
              />
              <l-icon
                v-else
                :icon-size="[16, 46]"
                :icon-anchor="[16, 37]"
                :icon-url="require('@/assets/images/icons/CCTVoff.svg')"
              />
              <l-popup
                ref="popup"
              >
                <div>
                  <span style="padding: 10px; text-align: left; font-size: 12px;">
                    ตำแหน่ง:{{ marker.road_code1 }}
                  </span>
                  <div>
                    <b-table
                      responsive="sm"
                      :items="items"
                      :fields="fields"
                      small
                      stacked
                      foot-clone
                    >
                      <template #cell(density_level)="data">
                        <b-badge :variant="status[1][data.value]">
                          {{ status[0][data.value] }}
                        </b-badge>
                      </template>
                      <template #cell(isOnline)="data">
                        <b-badge :variant="status[1][data.value]">
                          {{ status[0][data.value] }}
                        </b-badge>
                      </template>
                    </b-table>
                  </div>
                </div>
              </l-popup>
            </l-marker>
          </l-map>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import {
  BRow,
  BCol,
  VBModal,
  BCard,
  BTable,
  BBadge,
} from 'bootstrap-vue'
import {
  LMap, LTileLayer, LPopup,
  LMarker, LIcon,
} from 'vue2-leaflet'
import axios from '@axios'
import 'leaflet/dist/leaflet.css'
import Ripple from 'vue-ripple-directive'
import { Icon } from 'leaflet'

// eslint-disable-next-line no-underscore-dangle
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

export default {
  components: {
    BRow,
    BCol,
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    BCard,
    LPopup,
    BTable,
    BBadge,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 5,
      center: [14.925558, 99.514521],
      status: [{
        Online: 'ออนไลน์', Offline: 'ออฟไลน์',
      },
      {
        Online: 'success', Offline: 'danger',
      }],
      markers: [],
      fields: [
        {
          key: 'province',
          label: 'จังหวัด',
          class: 'text-center',
        },
        {
          key: 'daycount',
          label: 'ระยะเวลานับรถ',
          class: 'text-center',
        },
        {
          key: 'isOnline',
          label: 'ระยะเวลานับรถ',
          class: 'text-center',
        },
      ],
      items: [],
      attribution: '',
      itemsCount: [],
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },
  created() {
  },
  mounted() {
    this.getMarker()
  },
  methods: {
    getMarker() {
      axios.post('/get-Location-All2', { active: 1 })
        .then(response => {
          this.markers = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    getInfo(daycount, province, isOnline) {
      this.items = []
      this.items.push({
        daycount,
        province,
        isOnline,
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
.leaflet-popup-content {
    margin: 10px 10px;
    width: 280px;
    height: 100%;
  }
  .leaflet-container a.leaflet-popup-close-button {
    padding: 0 0 0 0
  }
  .leaflet-popup-content-wrapper,
.leaflet-popup-tip {
    background: rgba(229, 229, 229, 0.85);
    box-shadow: 0 3px 14px rgba(0,0,0,0.4);
    /* Green */
    border: 1px solid #1354A2;
    border-radius: 12px 12px 12px 12px;
}
</style>
