<template>
  <div>
    <b-card
      style="background-color: rgb(250, 250, 250, 0.8); width: 1000px; height: 100%; border: 0px solid #1354A2; border-radius: 16px;"
    >
      <b-row>
        <b-col
          lg="12"
          md="12"
        >
          <l-map
            ref="mymap"
            :zoom="zoom"
            :center="mapCenter"
            style="z-index: 0"
            :options="{
              scrollWheelZoom: false,
              zoomControl: false,
              attributionControl:false
            }"
          >
            <l-tile-layer :url="url" />

            <!-- Route markers (start/end) -->
            <template v-if="hasValidPoints">
              <l-marker
                v-for="point in validMarkerPoints"
                :key="point.type"
                :lat-lng="[point.lat, point.lng]"
              >
                <l-icon
                  :icon-size="[42, 50]"
                  :icon-anchor="[20, 35]"
                  :icon-url="getMarkerIcon(point.type)"
                />
                <l-popup>
                  {{ point.title }} ({{ point.type === 'start' ? 'จุดเริ่มต้น' : 'จุดสิ้นสุด' }})
                </l-popup>
              </l-marker>
            </template>

            <!-- Additional custom markers -->
            <template v-if="additionalMarkers && additionalMarkers.length">
              <l-marker
                v-for="(marker, index) in additionalMarkers"
                :key="'additional-' + index"
                :lat-lng="[marker.lat, marker.lng]"
              >
                <l-icon
                  :icon-size="[24, 35]"
                  :icon-url="marker.iconUrl || defaultMarkerIcon"
                />
                <l-popup v-if="marker.title">
                  {{ marker.title }}
                </l-popup>
              </l-marker>
            </template>
          </l-map>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import {
  BRow, BCol, BCard,
} from 'bootstrap-vue'
import {
  LMap, LTileLayer, LMarker, LPopup, LIcon,
} from 'vue2-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import startMarkerIcon from '@/assets/images/icons/marker/province-start.png'
import endMarkerIcon from '@/assets/images/icons/marker/province-end.png'

// eslint-disable-next-line no-underscore-dangle
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  // eslint-disable-next-line global-require
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  // eslint-disable-next-line global-require
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  // eslint-disable-next-line global-require
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

export default {
  name: 'LeafletMap',
  components: {
    BRow,
    BCol,
    BCard,
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon,
  },
  props: {
    routePoints: {
      type: Object,
      required: true,
      default: () => ({
        start: {
          lat: null, lng: null, title: '', type: 'start',
        },
        end: {
          lat: null, lng: null, title: '', type: 'end',
        },
      }),
    },
    additionalMarkers: {
      type: Array,
      default: () => [],
      validator: markers => markers.every(marker => typeof marker.lat === 'number'
        && typeof marker.lng === 'number'),
    },
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 17,
      routingControl: null,
      defaultCenter: [13.7563, 100.5018], // กรุงเทพฯ
      // eslint-disable-next-line global-require
      defaultMarkerIcon: require('@/assets/images/icons/cctv-marker.png'),
    }
  },
  computed: {
    hasValidPoints() {
      return this.isValidPoint(this.routePoints.start)
             || this.isValidPoint(this.routePoints.end)
    },
    validMarkerPoints() {
      return Object.values(this.routePoints).filter(this.isValidPoint)
    },
    mapCenter() {
      if (this.hasValidPoints) {
        const validPoints = this.validMarkerPoints
        if (validPoints.length === 2) {
          return [
            (validPoints[0].lat + validPoints[1].lat) / 2,
            (validPoints[0].lng + validPoints[1].lng) / 2,
          ]
        }
        return [validPoints[0].lat, validPoints[0].lng]
      }

      // If there are additional markers but no route points, center on the first additional marker
      if (this.additionalMarkers && this.additionalMarkers.length > 0) {
        return [this.additionalMarkers[0].lat, this.additionalMarkers[0].lng]
      }

      return this.defaultCenter
    },
  },
  watch: {
    routePoints: {
      handler() {
        this.$nextTick(() => {
          if (this.hasValidPoints) {
            this.initRouting()
          }
        })
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.hasValidPoints) {
        this.initRouting()
      }
    })
  },
  beforeDestroy() {
    if (this.routingControl) {
      this.routingControl.remove()
    }
  },
  methods: {
    getMarkerIcon(type) {
      return type === 'start' ? startMarkerIcon : endMarkerIcon
    },
    isValidPoint(point) {
      return point
             && typeof point.lat === 'number'
             && typeof point.lng === 'number'
             && point.lat !== 0
             && point.lng !== 0
    },
    initRouting() {
      const validPoints = this.validMarkerPoints
      if (validPoints.length !== 2) return

      const map = this.$refs.mymap?.mapObject
      if (!map) return

      if (this.routingControl) {
        this.routingControl.remove()
      }

      // eslint-disable-next-line no-undef
      this.routingControl = L.Routing.control({
        waypoints: [
          // eslint-disable-next-line no-undef
          L.latLng(validPoints[0].lat, validPoints[0].lng),
          // eslint-disable-next-line no-undef
          L.latLng(validPoints[1].lat, validPoints[1].lng),
        ],
        show: false,
        routeWhileDragging: false,
        showAlternatives: false,
        addWaypoints: false,
        lineOptions: {
          styles: [
            { color: 'red', opacity: 1, weight: 6 },
          ],
        },
        createMarker: () => null,
      }).addTo(map)
    },
  },
}
</script>

<style lang="scss">
.vue2leaflet-map {
  &.leaflet-container {
    width: 100%;
    height: 1000px;
  }
}

.leaflet-popup-content-wrapper,
.leaflet-popup-tip {
  background: rgba(36, 36, 36, 0.85);
  box-shadow: 0 3px 14px rgba(0,0,0,0.4);
  border: 1px solid #1354A2;
  border-radius: 12px;
  color: white;
}

.leaflet-routing-container {
  display: none;
}
</style>
