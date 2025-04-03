<template>
  <div
    ref="mapContainer"
    style="width: 100%; height: 100%;"
  />
</template>

<script>
// นำเข้ารูปภาพโดยตรงที่ด้านบนของไฟล์
import provinceStartIcon from '@/assets/images/icons/marker/province-start2.png'
import provinceEndIcon from '@/assets/images/icons/marker/province-end2.png'
import cctvMarkerIcon from '@/assets/images/icons/cctv-marker.png'

export default {
  name: 'LondoMap',
  props: {
    routePoints: {
      type: Object,
      required: false,
      default: () => ({
        start: {
          lat: 0, lng: 0, title: '', type: 'start',
        },
        end: {
          lat: 0, lng: 0, title: '', type: 'end',
        },
      }),
    },
    routePaths: {
      type: Array,
      default: () => [],
    },
    additionalMarkers: {
      type: Array,
      default: () => [],
    },
    startMarkerIcon: {
      type: String,
      default: null,
    },
    endMarkerIcon: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      map: null,
      scriptLoaded: false,
      markerList: [],
      overlayList: [],
      routeLine: null,
      watermarkObserver: null,
      // เก็บ path ของรูปภาพในตัวแปร
      iconPaths: {
        start: provinceStartIcon,
        end: provinceEndIcon,
        cctv: cctvMarkerIcon,
      },
    }
  },
  watch: {
    routePoints: {
      deep: true,
      handler() {
        this.updateRouteDisplay()
      },
    },
    routePaths: {
      deep: true,
      handler() {
        this.updatePathGeometries()
      },
    },
    additionalMarkers: {
      deep: true,
      handler() {
        this.updateAdditionalMarkers()
      },
    },
    startMarkerIcon() {
      this.iconPaths.start = this.startMarkerIcon || provinceStartIcon
      this.updatePathGeometries()
    },
    endMarkerIcon() {
      this.iconPaths.end = this.endMarkerIcon || provinceEndIcon
      this.updatePathGeometries()
    },
  },

  created() {
    // ถ้ามีการส่ง icon มาผ่าน props ให้ใช้แทนค่าเริ่มต้น
    if (this.startMarkerIcon) {
      this.iconPaths.start = this.startMarkerIcon
    }
    if (this.endMarkerIcon) {
      this.iconPaths.end = this.endMarkerIcon
    }
  },
  mounted() {
    this.loadLongdoMapScript()
  },
  beforeDestroy() {
    // ทำความสะอาดเมื่อคอมโพเนนต์ถูกทำลาย
    this.markerList.forEach(marker => {
      if (this.map && marker) {
        this.map.Overlays.remove(marker)
      }
    })
    this.markerList = []

    this.overlayList.forEach(overlay => {
      if (this.map && overlay) {
        this.map.Overlays.remove(overlay)
      }
    })
    this.overlayList = []

    if (this.routeLine && this.map) {
      this.map.Overlays.remove(this.routeLine)
    }

    if (this.$refs.mapContainer) {
      this.$refs.mapContainer.removeEventListener('wheel', this.preventScroll)
    }

    // ลบ style ที่เพิ่มไว้สำหรับซ่อนลายน้ำ
    const watermarkStyle = document.getElementById('longdo-watermark-hide')
    if (watermarkStyle) {
      document.head.removeChild(watermarkStyle)
    }
  },
  beforeUnmount() {

  },
  methods: {
    loadLongdoMapScript() {
      if (window.longdo) {
        this.scriptLoaded = true
        this.initMap()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://api.longdo.com/map/?key=f7ba675880ccab7ac7fd0a65f1b33553'
      script.async = true
      script.onload = () => {
        this.scriptLoaded = true
        this.initMap()
      }
      script.onerror = () => {
        console.error('ไม่สามารถโหลด Longdo Map API ได้')
        // อาจจะเพิ่มการแจ้งเตือนหรือลองใหม่
      }
      document.head.appendChild(script)
    },

    initMap() {
      if (!this.scriptLoaded || !this.$refs.mapContainer) return

      // For debugging
      console.log('Initializing map...')

      // สร้างแผนที่
      this.map = new window.longdo.Map({
        placeholder: this.$refs.mapContainer,
        language: 'th',
        lastView: false,
        zoom: 13, // เพิ่มค่า zoom เริ่มต้น
        // zoomRange: { min: 12, max: 14 },

        mouse: {
          wheel: false, // ปิดการซูมด้วยลูกกลิ้งเมาส์
        },
      })

      // ตั้งค่าพื้นฐานของแผนที่
      this.map.Layers.setBase(window.longdo.Layers.NORMAL)

      // แสดงเครื่องมือบนแผนที่
      this.map.Ui.DPad.visible(false)
      this.map.Ui.Zoombar.visible(false)
      this.map.Ui.Geolocation.visible(false)
      this.map.Ui.Toolbar.visible(false)
      this.map.Ui.LayerSelector.visible(false)
      this.map.Ui.Fullscreen.visible(false)
      this.map.Ui.Crosshair.visible(false)
      this.map.Ui.Scale.visible(false)

      // ปิดการซูมด้วยปุ่มเมาส์ (ถ้ามี)
      if (this.map.Ui.Mouse) {
        this.map.Ui.Mouse.enableWheel(false)
      }

      // เพิ่ม event listener สำหรับป้องกันการใช้ wheel
      if (this.$refs.mapContainer) {
        this.$refs.mapContainer.addEventListener('wheel', this.preventScroll, { passive: false })
      }

      // เพิ่ม CSS เพื่อซ่อนลายน้ำของ Longdo Map
      this.addWatermarkHidingCSS()

      // เพิ่ม event listener เมื่อแผนที่โหลดเสร็จ
      this.map.Event.bind('ready', () => {
        console.log('Map is ready')
        // แสดงเส้นทางและมาร์คเกอร์อีกครั้งหลังจากแผนที่พร้อม
        this.updateRouteDisplay()
        this.updatePathGeometries()
        this.updateAdditionalMarkers()

        // ปิดการซูมด้วยเมาส์อีกครั้งหลังแผนที่พร้อม
        this.map.Event.unbind('mousemove')
        this.map.Event.unbind('mousewheel')

        // ตั้งค่าเพิ่มเติมเพื่อป้องกันการซูม
        if (typeof this.map.zoom === 'function') {
          const currentZoom = this.map.zoom()
          // จำกัดค่า zoom ไว้ที่ค่าปัจจุบัน
          this.map.zoomRange({ min: currentZoom, max: currentZoom })
        }
        this.setupWatermarkObserver()
      })

      // แสดงเส้นทางและมาร์คเกอร์
      this.updateRouteDisplay()
      this.updatePathGeometries()
      this.updateAdditionalMarkers()
    },

    addWatermarkHidingCSS() {
      // หากยังไม่มี style element สำหรับซ่อนลายน้ำ
      if (!document.getElementById('longdo-watermark-hide')) {
        const style = document.createElement('style')
        style.id = 'longdo-watermark-hide'
        style.textContent = `
      /* ซ่อนลายน้ำ Longdo Map */
      .ldmap_copyright,
      .longdo-attribution,
      .longdo-logo,
      img[src*="longdo.com/map/images"],
      img[alt*="longdo"],
      a[href*="longdo.com"],
      div[style*="longdo.com/map/images"],
      
      /* ซ่อน powered by text และโลโก้ */
      div[style*="position: absolute; z-index: 1; right: 3px; bottom: 0px;"],
      .ldmap_logo, 
      .ldmap_copyright,
      
      /* ซ่อนลายน้ำ OpenStreetMap */
      .leaflet-control-attribution,
      a[href*="openstreetmap.org"],
      .ol-attribution,
      .ol-attribution.ol-uncollapsible,
      .ol-attribution ul,
      .ol-attribution.ol-logo-only,
      .ol-attribution.ol-collapsed,
      .ol-logo-only,
      .ol-logo-only a,
      .mapbox-improve-map,
      .mapboxgl-ctrl-attrib,
      .mapboxgl-ctrl-logo,
      
      /* ซ่อนลายน้ำทั่วไปที่อาจพบในแผนที่ */
      [class*="attribution"],
      [class*="copyright"],
      [class*="watermark"],
      [class*="logo-"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        width: 0 !important;
        height: 0 !important;
        pointer-events: none !important;
      }
      
      /* ซ่อนองค์ประกอบที่มักใช้สำหรับลายน้ำใน Longdo Map */
      .longdo-component,
      div[class*="longdo-"],
      #ldmap_copyright,
      [style*="z-index: 1;"][style*="right: 3px"][style*="bottom: 0px"],
      [style*="z-index: 1"][style*="right: 3px"][style*="bottom: 0"] {
        display: none !important;
        opacity: 0 !important;
      }
    `
        document.head.appendChild(style)
      }
    },

    setupWatermarkObserver() {
      // สร้าง MutationObserver เพื่อคอยสังเกตการเปลี่ยนแปลงและซ่อนลายน้ำที่อาจถูกเพิ่มภายหลัง
      const observer = new MutationObserver(mutations => {
        mutations.forEach(() => {
          // ค้นหาองค์ประกอบลายน้ำที่อาจเพิ่งถูกเพิ่ม
          const watermarks = document.querySelectorAll(`
        .ldmap_copyright, 
        .longdo-attribution, 
        .longdo-logo, 
        .leaflet-control-attribution,
        [class*="attribution"], 
        [class*="copyright"],
        [style*="z-index: 1;"][style*="right: 3px"][style*="bottom: 0px"]
      `)

          watermarks.forEach(element => {
            // eslint-disable-next-line no-param-reassign
            element.style.display = 'none'
            // eslint-disable-next-line no-param-reassign
            element.style.opacity = '0'
            // eslint-disable-next-line no-param-reassign
            element.style.visibility = 'hidden'
          })
        })
      })

      // เริ่มสังเกตการเปลี่ยนแปลงในองค์ประกอบแผนที่
      if (this.$refs.mapContainer) {
        observer.observe(this.$refs.mapContainer, {
          childList: true,
          subtree: true,
        })

        // เก็บ observer ไว้ใน instance เพื่อให้สามารถยกเลิกได้เมื่อ component ถูกทำลาย
        this.watermarkObserver = observer
      }
    },

    updateRouteDisplay() {
      if (!this.map || !this.scriptLoaded) return

      // Console log for debugging
      console.log('Updating route display with points:', this.routePoints)

      // ตรวจสอบโครงสร้างของ routePoints ให้ละเอียดขึ้น
      console.log('Start point details:', {
        hasStart: !!this.routePoints.start,
        startLat: this.routePoints.start ? this.routePoints.start.lat : undefined,
        startLng: this.routePoints.start ? this.routePoints.start.lng : undefined,
        startType: this.routePoints.start ? typeof this.routePoints.start : 'undefined',
      })

      // ล้างมาร์คเกอร์เก่าก่อน
      this.markerList.forEach(marker => {
        if (marker) {
          this.map.Overlays.remove(marker)
        }
      })
      this.markerList = []

      // ล้างเส้นทางเก่าถ้ามี
      if (this.routeLine) {
        this.map.Overlays.remove(this.routeLine)
        this.routeLine = null
      }

      // เพิ่มจุดเริ่มต้น - แก้ไขเงื่อนไขให้ตรวจสอบโดยไม่ใช้ && ทั้งหมด
      if (this.routePoints && this.routePoints.start) {
        // ดึงค่า lat/lng ที่อาจมีรูปแบบแตกต่างกันหรืออยู่ในชื่อตัวแปรอื่น
        const startLat = this.routePoints.start.lat || this.routePoints.start.latitude || this.routePoints.start.y
        const startLng = this.routePoints.start.lng || this.routePoints.start.longitude || this.routePoints.start.x

        console.log('Extracted start coordinates:', startLat, startLng)

        if (startLat && startLng) {
          console.log('Adding start marker at:', startLat, startLng)
          const startMarker = new window.longdo.Marker(
            { lat: startLat, lon: startLng },
            {
              title: this.routePoints.start.title || 'จุดเริ่มต้น',
              detail: 'จุดเริ่มต้นของเส้นทาง',
              icon: {
                url: this.iconPaths.start, // ใช้ path จาก data
                offset: { x: 5, y: 5 },
                size: { width: 10, height: 10 },
              },
              weight: window.longdo.OverlayWeight.Top,
            },
          )
          this.map.Overlays.add(startMarker)
          this.markerList.push(startMarker)
        }
      }

      // เพิ่มจุดสิ้นสุด - แก้ไขเงื่อนไขเช่นเดียวกับจุดเริ่มต้น
      if (this.routePoints && this.routePoints.end) {
        // ดึงค่า lat/lng ที่อาจมีรูปแบบแตกต่างกันหรืออยู่ในชื่อตัวแปรอื่น
        const endLat = this.routePoints.end.lat || this.routePoints.end.latitude || this.routePoints.end.y
        const endLng = this.routePoints.end.lng || this.routePoints.end.longitude || this.routePoints.end.x

        console.log('Extracted end coordinates:', endLat, endLng)

        if (endLat && endLng) {
          console.log('Adding end marker at:', endLat, endLng)
          const endMarker = new window.longdo.Marker(
            { lat: endLat, lon: endLng },
            {
              title: this.routePoints.end.title || 'จุดสิ้นสุด',
              detail: 'จุดสิ้นสุดของเส้นทาง',
              icon: {
                url: this.iconPaths.end, // ใช้ path จาก data
                offset: { x: 5, y: 5 },
                size: { width: 10, height: 10 },
              },
              weight: window.longdo.OverlayWeight.Top,
            },
          )
          this.map.Overlays.add(endMarker)
          this.markerList.push(endMarker)
        }
      }

      // วาดเส้นระหว่างจุดเริ่มต้นและจุดสิ้นสุด - ใช้ตัวแปรที่เราดึงค่าไว้แล้ว
      // ดึงค่าพิกัดเริ่มและสิ้นสุดอีกครั้ง
      const startLat = this.routePoints?.start?.lat || this.routePoints?.start?.latitude || this.routePoints?.start?.y
      const startLng = this.routePoints?.start?.lng || this.routePoints?.start?.longitude || this.routePoints?.start?.x
      const endLat = this.routePoints?.end?.lat || this.routePoints?.end?.latitude || this.routePoints?.end?.y
      const endLng = this.routePoints?.end?.lng || this.routePoints?.end?.longitude || this.routePoints?.end?.x

      if (startLat && startLng && endLat && endLng) {
        // สร้างอาร์เรย์สำหรับจุดเส้นทาง - ใช้ตัวแปร startLat, startLng, endLat, endLng ที่เราดึงค่าไว้
        const coordinates = [
          { lat: startLat, lon: startLng },
          { lat: endLat, lon: endLng },
        ]

        // ใช้ Longdo Route API ถ้าเป็นไปได้
        if (window.longdo.Util && window.longdo.Util.createRoute) {
          window.longdo.Util.createRoute(coordinates, result => {
            if (result && result.data) {
              // สร้างเส้นทางจากข้อมูลที่ได้
              this.routeLine = new window.longdo.Polyline(result.data, {
                title: this.routePoints.start.title || 'เส้นทาง',
                detail: `เส้นทางระหว่าง ${this.routePoints.start.title || 'จุดเริ่มต้น'} ถึง ${this.routePoints.end.title || 'จุดสิ้นสุด'}`,
                lineWidth: 4,
                lineColor: '#0066CC',
                lineStyle: 'solid',
              })
              this.map.Overlays.add(this.routeLine)

              // ปรับแผนที่ให้แสดงเส้นทางทั้งหมด
              this.map.bound(result.bound)
            } else {
              // ถ้าไม่สามารถใช้ Route API ได้ ให้ใช้เส้นตรงแทน
              this.createSimpleLine(coordinates)
            }
          })
        } else {
          // ถ้าไม่มี Route API ให้ใช้เส้นตรงเชื่อมจุด
          this.createSimpleLine(coordinates)
        }
      }
    },

    createSimpleLine(coordinates) {
      // สร้างเส้นตรงระหว่างจุด
      this.routeLine = new window.longdo.Polyline(coordinates, {
        title: 'เส้นทาง',
        detail: this.routePoints.start.title || 'เส้นทาง',
        lineWidth: 4,
        lineColor: 'rgba(255, 0, 0, 0.8)',
      })
      this.map.Overlays.add(this.routeLine)

      // ปรับขอบเขตแผนที่ให้เห็นทั้งหมด
      this.fitBounds(coordinates)
    },

    fitBounds(coordinates) {
      if (coordinates.length > 0) {
        // หาค่า min/max ของละติจูด/ลองจิจูดเพื่อสร้างขอบเขต
        let minLat = coordinates[0].lat
        let maxLat = coordinates[0].lat
        let minLon = coordinates[0].lon
        let maxLon = coordinates[0].lon

        coordinates.forEach(coord => {
          minLat = Math.min(minLat, coord.lat)
          maxLat = Math.max(maxLat, coord.lat)
          minLon = Math.min(minLon, coord.lon)
          maxLon = Math.max(maxLon, coord.lon)
        })

        // เพิ่มระยะห่างรอบขอบ
        const latPadding = (maxLat - minLat) * 0.1
        const lonPadding = (maxLon - minLon) * 0.1

        // กำหนดขอบเขตแผนที่
        this.map.bound({
          minLat: minLat - latPadding,
          minLon: minLon - lonPadding,
          maxLat: maxLat + latPadding,
          maxLon: maxLon + lonPadding,
        })
      }
    },

    updatePathGeometries() {
      if (!this.map || !this.scriptLoaded || !this.routePaths || this.routePaths.length === 0) return

      // ล้าง overlays เก่าก่อน
      this.overlayList.forEach(overlay => {
        if (overlay) {
          this.map.Overlays.remove(overlay)
        }
      })
      this.overlayList = []

      // ล้างมาร์คเกอร์เริ่มต้นและสิ้นสุดเก่า
      this.markerList.forEach(marker => {
        if (marker) {
          this.map.Overlays.remove(marker)
        }
      })
      this.markerList = []

      let minLat = Infinity
      let minLon = Infinity
      let maxLat = -Infinity
      let maxLon = -Infinity

      // วนลูปสร้างเส้นทางจากข้อมูล paths
      this.routePaths.forEach(feature => {
        if (feature.geometry && feature.geometry.paths && feature.geometry.paths.length > 0) {
          // แปลงรูปแบบข้อมูลจาก [lon, lat] เป็น {lon, lat}
          const paths = feature.geometry.paths[0].map(coord => {
            const lon = coord[0]
            const lat = coord[1]

            // อัพเดท bounds
            minLat = Math.min(minLat, lat)
            minLon = Math.min(minLon, lon)
            maxLat = Math.max(maxLat, lat)
            maxLon = Math.max(maxLon, lon)

            return { lon, lat }
          })

          // สร้างเส้นถนน
          const attributes = feature.attributes || {}
          const routeName = attributes.route_name || 'เส้นทาง'
          const roadCode = attributes.road_code || ''
          const lengthDrr = attributes.length_drr || ''
          const laneCount = attributes.lane_count || ''
          const laneWidth = attributes.lane_width || ''

          // สร้างรายละเอียดสำหรับ tooltip
          let detail = routeName
          if (roadCode) detail += `<br>รหัสสายทาง: ${roadCode}`
          if (lengthDrr) detail += `<br>ความยาว: ${lengthDrr} กม.`
          if (laneCount) detail += `<br>จำนวนช่องจราจร: ${laneCount}`
          if (laneWidth) detail += `<br>ความกว้างช่องจราจร: ${laneWidth} ม.`

          const road = new window.longdo.Polyline(paths, {
            title: routeName,
            detail,
            lineWidth: 4,
            lineColor: 'rgba(255, 0, 0, 0.8)',
            pointer: true,
            weight: window.longdo.OverlayWeight.Top,
          })

          // เพิ่มเส้นถนนลงในแผนที่
          this.map.Overlays.add(road)
          this.overlayList.push(road)

          // เพิ่ม marker ที่จุดเริ่มต้นและจุดสิ้นสุดของ path
          if (paths.length > 0) {
            // จุดเริ่มต้น
            const startPoint = paths[0]
            const startMarker = new window.longdo.Marker(
              { lat: startPoint.lat, lon: startPoint.lon },
              {
                title: `จุดเริ่มต้น ${routeName}`,
                detail: `จุดเริ่มต้นของ${routeName}`,
                icon: {
                  url: this.iconPaths.start,
                  offset: { x: 5, y: 5 },
                  size: { width: 10, height: 10 },
                },
                weight: window.longdo.OverlayWeight.Top,
              },
            )
            this.map.Overlays.add(startMarker)
            this.markerList.push(startMarker)

            // จุดสิ้นสุด
            const endPoint = paths[paths.length - 1]
            const endMarker = new window.longdo.Marker(
              { lat: endPoint.lat, lon: endPoint.lon },
              {
                title: `จุดสิ้นสุด ${routeName}`,
                detail: `จุดสิ้นสุดของ${routeName}`,
                icon: {
                  url: this.iconPaths.end,
                  offset: { x: 5, y: 5 },
                  size: { width: 10, height: 10 },
                },
                weight: window.longdo.OverlayWeight.Top,
              },
            )
            this.map.Overlays.add(endMarker)
            this.markerList.push(endMarker)
          }
        }
      })

      // ถ้ามีเส้นทางให้แสดง กำหนด bounds ให้แสดงทั้งหมด
      if (minLat !== Infinity && minLon !== Infinity && maxLat !== -Infinity && maxLon !== -Infinity) {
        this.map.bound({
          minLat,
          minLon,
          maxLat,
          maxLon,
        })
      }

      // อัพเดทมาร์คเกอร์เพิ่มเติมหลังจากจัดการกับเส้นทาง
      this.updateAdditionalMarkers()
    },

    updateAdditionalMarkers() {
      if (!this.map || !this.scriptLoaded) return

      // ล้างมาร์คเกอร์เพิ่มเติมเก่า แต่ไม่ลบมาร์คเกอร์จุดเริ่มต้นและจุดสิ้นสุด
      const additionalMarkersToRemove = []
      // ค้นหามาร์คเกอร์ที่ไม่ใช่จุดเริ่มต้นหรือจุดสิ้นสุด
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < this.markerList.length; i++) {
        const marker = this.markerList[i]
        if (i >= 2) { // สมมติว่า 2 อันดับแรกเป็นจุดเริ่มต้นและจุดสิ้นสุด
          additionalMarkersToRemove.push(marker)
        }
      }

      // ลบมาร์คเกอร์เพิ่มเติมออกจากแผนที่และลิสต์
      additionalMarkersToRemove.forEach(marker => {
        if (marker) {
          this.map.Overlays.remove(marker)
          const index = this.markerList.indexOf(marker)
          if (index > -1) {
            this.markerList.splice(index, 1)
          }
        }
      })

      // เพิ่มจุดอื่นๆ ตามที่กำหนด
      if (this.additionalMarkers && this.additionalMarkers.length > 0) {
        this.additionalMarkers.forEach(markerData => {
          if (markerData.lat && markerData.lng) {
            const marker = new window.longdo.Marker(
              { lat: markerData.lat, lon: markerData.lng },
              {
                title: markerData.title || 'จุดติดตั้ง',
                detail: markerData.detail || '',
                icon: {
                  url: this.iconPaths.cctv, // ใช้ path จาก data
                  offset: { x: 12, y: 45 },
                  size: { width: 30, height: 40 }, // ปรับขนาดไอคอนให้เหมาะสม
                },
                weight: window.longdo.OverlayWeight.Top,
              },
            )
            this.map.Overlays.add(marker)
            this.markerList.push(marker)
          }
        })
      }
    },
  },
}
</script>

<style>
/* อาจจะมีการปรับแต่ง CSS เพิ่มเติมตามความต้องการ */
.longdo-map-container {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
