<template>
  <div class="phase-card-container">
    <b-card
      no-body
      class="phase-card"
    >
      <b-card-header class="d-flex justify-content-center card-header-custom">
        <h2 class="energy-title">
          <feather-icon
            icon="ZapIcon"
            size="24"
            class="mr-2"
          />
          Energy Information
        </h2>
      </b-card-header>
      <b-card-body class="energy-card-body">
        <div class="header-spacer" />
        <!-- Energy Value Items -->
        <div class="energy-item">
          <div class="energy-badge">
            <div class="badge-icon-container">
              <feather-icon
                icon="ZapIcon"
                class="energy-icon"
              />
            </div>
            <div class="energy-value">
              {{ volt }}
            </div>
            <div class="badge-container">
              <b-badge
                variant="success"
                class="energy-badge-label"
              >
                Volt
              </b-badge>
            </div>
          </div>
        </div>

        <div class="energy-item">
          <div class="energy-badge">
            <div class="badge-icon-container">
              <feather-icon
                icon="ActivityIcon"
                class="energy-icon"
              />
            </div>
            <div class="energy-value">
              {{ amp }}
            </div>
            <div class="badge-container">
              <b-badge
                variant="primary"
                class="energy-badge-label"
              >
                Amp
              </b-badge>
            </div>
          </div>
        </div>

        <div class="energy-item">
          <div class="energy-badge">
            <div class="badge-icon-container">
              <feather-icon
                icon="BatteryChargingIcon"
                class="energy-icon"
              />
            </div>
            <div class="energy-value">
              {{ watt }}
            </div>
            <div class="badge-container">
              <b-badge
                variant="warning"
                class="energy-badge-label"
              >
                Watt
              </b-badge>
            </div>
          </div>
        </div>

        <div class="energy-item">
          <div class="energy-badge">
            <div class="badge-icon-container">
              <feather-icon
                icon="RefreshCwIcon"
                class="energy-icon"
              />
            </div>
            <div class="energy-value">
              {{ hz }}
            </div>
            <div class="badge-container">
              <b-badge
                variant="info"
                class="energy-badge-label"
              >
                Hz
              </b-badge>
            </div>
          </div>
        </div>

        <div class="energy-item">
          <div class="energy-badge">
            <div class="badge-icon-container">
              <feather-icon
                icon="BarChartIcon"
                class="energy-icon"
              />
            </div>
            <div class="energy-value">
              {{ kwh }}
            </div>
            <div class="badge-container">
              <b-badge
                variant="danger"
                class="energy-badge-label"
              >
                kWh
              </b-badge>
            </div>
          </div>
        </div>

        <div class="energy-item">
          <div class="energy-badge">
            <div class="badge-icon-container">
              <feather-icon
                icon="PieChartIcon"
                class="energy-icon"
              />
            </div>
            <div class="energy-value">
              {{ pf }}
            </div>
            <div class="badge-container">
              <b-badge
                variant="secondary"
                class="energy-badge-label"
              >
                Pf
              </b-badge>
            </div>
          </div>
        </div>

        <!-- Last Updated Info -->
        <div class="last-updated">
          <feather-icon
            icon="ClockIcon"
            size="14"
            class="mr-1"
          />
          Last Updated: {{ formattedDate }}
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import axios from '@axios'
import {
  BCard,
  BCardHeader,
  BCardBody,
  BBadge,
} from 'bootstrap-vue'

export default {
  name: 'L1PhaseCard',
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BBadge,
  },
  data() {
    return {
      volt: '0',
      amp: '0',
      watt: '0',
      hz: '0',
      kwh: '0',
      pf: '0',
      lastUpdated: new Date(),
      interval: null,
    }
  },
  computed: {
    formattedDate() {
      return this.lastUpdated.toLocaleString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    },
  },
  created() {
    this.fetchData()
    this.interval = setInterval(() => {
      this.fetchData()
    }, 10000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    fetchData() {
      // ดึงค่า wid จาก URL query
      const { wid } = this.$route.query

      if (!wid) {
        console.warn('ไม่พบค่า wid ใน URL query')
        return
      }

      // เรียก API เพื่อดึงข้อมูล 1 phase โดยใช้ POST /getEnergyData1Phase-Electic
      axios.post('/getEnergyData1Phase-Electic', { wid })
        .then(response => {
          if (response.data && response.data.length > 0) {
            const data = response.data[0]
            this.volt = data.volt || '0'
            this.amp = data.amp || '0'
            this.watt = data.watt || '0'
            this.hz = data.hz || '0'
            this.kwh = data.kwh || '0'
            this.pf = data.pf || '0'

            // อัพเดทเวลาล่าสุดที่ดึงข้อมูล
            this.lastUpdated = new Date()
            console.log('อัพเดทข้อมูล L1PhaseCard เวลา:', this.formattedDate)
          }
        })
        .catch(error => {
          console.error('เกิดข้อผิดพลาดในการดึงข้อมูล 1 phase:', error)
        })
    },
  },
}
</script>

<style scoped>
.phase-card-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.phase-card {
  flex-grow: 1;
  font-size: 18px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border: 1px solid #00B058;
  border-radius: 10px;
  height: 960px;
}

.card-header-custom {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.energy-title {
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.7);
  font-size: 1.8rem;
  margin: 0;
}

.energy-card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.energy-item {
  margin-bottom: 1.5rem;
}

.energy-badge {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
  margin: 0 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.2);
  border: 1px solid rgba(0, 255, 0, 0.3);
}

.badge-icon-container {
  display: flex;
  align-items: center;
}

.energy-icon {
  color: #00ff00;
  margin-right: 0.75rem;
  filter: drop-shadow(0 0 3px rgba(0, 255, 0, 0.7));
}

.energy-badge-label {
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  min-width: 70px;
  text-align: center;
  border-radius: 8px;
  margin-left: 0.5rem;
}

.energy-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

.status-indicators {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.status-indicator {
  display: flex;
  align-items: center;
  margin: 0 1rem;
}

.indicator-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.indicator-dot.active {
  background-color: #00ff00;
  box-shadow: 0 0 10px #00ff00;
}

.indicator-dot.normal {
  background-color: #00bfff;
  box-shadow: 0 0 10px #00bfff;
}

.last-updated {
  text-align: center;
  font-size: 0.9rem;
  color: #aaaaaa;
  margin-top: 1rem;
}
</style>
