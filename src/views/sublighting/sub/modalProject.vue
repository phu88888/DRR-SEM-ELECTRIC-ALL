<template>
  <b-modal
    id="modalProject"
    ref="my-modal"
    hide-header
    hide-footer
    size="lg"
    centered
    no-close-on-backdrop
    no-close-on-esc
    content-class="square-modal"
    @show="resetModal"
  >
    <div class="square-modal-container">
      <!-- Header -->
      <div class="modal-header-square">
        <h5 class="modal-title">
          <feather-icon
            icon="FileTextIcon"
            size="20"
            class="mr-2"
          />
          ข้อมูลโครงการ
        </h5>
        <button
          type="button"
          class="close-button"
          @click="$bvModal.hide('modalProject')"
        >
          <feather-icon
            icon="XIcon"
            size="20"
          />
        </button>
      </div>

      <!-- Content -->
      <div class="modal-content-square">
        <div
          v-if="items"
          class="project-data"
        >
          <!-- Project Name -->
          <div class="project-name">
            <feather-icon
              icon="BookmarkIcon"
              size="22"
              class="mr-2"
            />
            {{ items.pj_name || '-' }}
          </div>

          <!-- Project Details -->
          <div class="data-grid">

            <div class="data-item full-width">
              <div class="data-label">
                <feather-icon
                  icon="FileIcon"
                  size="16"
                  class="mr-1"
                />
                เลขที่สัญญา
              </div>
              <div class="data-value">
                {{ items.contract_no || '-' }}
              </div>
            </div>

            <!-- ถ้าหน่วยงานที่เซ็นสัญญาและหน่วยงานที่รับผิดชอบเหมือนกัน ให้แสดงแค่อันเดียว -->
            <div
              v-if="items.deptname === items.Dept_Name"
              class="data-item full-width"
            >
              <div class="data-label">
                <feather-icon
                  icon="BriefcaseIcon"
                  size="16"
                  class="mr-1"
                />
                หน่วยงานที่เซ็นสัญญา
              </div>
              <div class="data-value">
                {{ items.deptname || '-' }}
              </div>
            </div>

            <!-- ถ้าหน่วยงานไม่เหมือนกัน ให้แสดงทั้งสองอัน -->
            <template v-else>
              <div class="data-item">
                <div class="data-label">
                  <feather-icon
                    icon="BriefcaseIcon"
                    size="16"
                    class="mr-1"
                  />
                  หน่วยงานที่เซ็นสัญญา
                </div>
                <div class="data-value">
                  {{ items.deptname || '-' }}
                </div>
              </div>

              <div class="data-item">
                <div class="data-label">
                  <feather-icon
                    icon="UsersIcon"
                    size="16"
                    class="mr-1"
                  />
                  หน่วยงานที่รับผิดชอบ
                </div>
                <div class="data-value">
                  {{ items.Dept_Name || '-' }}
                </div>
              </div>
            </template>

            <div class="data-item">
              <div class="data-label">
                <feather-icon
                  icon="CalendarIcon"
                  size="16"
                  class="mr-1"
                />
                วันที่รับประกัน
              </div>
              <div class="data-value">
                {{ formatDate(items.guarantee_date_start_de) }}
              </div>
            </div>

            <div class="data-item">
              <div class="data-label">
                <feather-icon
                  icon="CalendarIcon"
                  size="16"
                  class="mr-1"
                />
                วันสิ้นสุดค้ำประกัน
              </div>
              <div class="data-value">
                {{ formatDate(items.guarantee_date_end_de) }}
              </div>
            </div>
          </div>

          <!-- Vendor Section with margin top -->
          <div class="vendor-section">
            <div class="data-item full-width">
              <div class="data-label">
                <feather-icon
                  icon="UserIcon"
                  size="16"
                  class="mr-1"
                />
                ผู้รับจ้าง
              </div>
              <div class="data-value">
                {{ items.vendor_name || '-' }}
              </div>
            </div>
          </div>
        </div>

        <div
          v-else
          class="no-data"
        >
          <feather-icon
            icon="AlertCircleIcon"
            size="36"
          />
          <div>โครงการเก่า : ยังไม่ได้เชื่อมต่อข้อมูล</div>
        </div>
      </div>

      <!-- Footer -->
      <div class="modal-footer-square">
        <b-button
          variant="success"
          class="close-btn"
          @click="$bvModal.hide('modalProject')"
        >
          <feather-icon
            icon="CheckIcon"
            size="16"
            class="mr-1"
          />
          ปิด
        </b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
import axios from '@axios'
import {
  BModal, BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BModal,
    BButton,
  },
  data() {
    return {
      items: [],
    }
  },
  mounted() {
  },
  methods: {
    InfoProject(id) {
      axios
        .post('/infoProject', { wid: id })
        .then(response => {
          // eslint-disable-next-line prefer-destructuring
          this.items = response.data[0]
        })
        .catch(error => {
          console.log(error)
        })
    },
    resetModal() {
      this.items = []
    },
    formatDate(dateString) {
      if (!dateString) return '-'

      // ตรวจสอบรูปแบบวันที่
      const dateFormats = [
        // รูปแบบ YYYY-MM-DD
        /^\d{4}-\d{2}-\d{2}$/,
        // รูปแบบ DD/MM/YYYY
        /^\d{2}\/\d{2}\/\d{4}$/,
        // รูปแบบ YYYY-MM-DDTHH:mm:ss
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/,
      ]

      let date

      if (dateFormats[0].test(dateString)) {
        // YYYY-MM-DD
        const [year, month, day] = dateString.split('-')
        date = new Date(year, month - 1, day)
      } else if (dateFormats[1].test(dateString)) {
        // DD/MM/YYYY
        const [day, month, year] = dateString.split('/')
        date = new Date(year, month - 1, day)
      } else if (dateFormats[2].test(dateString)) {
        // YYYY-MM-DDTHH:mm:ss
        date = new Date(dateString)
      } else {
        // ถ้าไม่ตรงกับรูปแบบใดเลย ให้ลองแปลงโดยตรง
        date = new Date(dateString)
      }

      // ตรวจสอบว่าวันที่ถูกต้องหรือไม่
      if (Number.isNaN(date.getTime())) {
        return dateString // ถ้าแปลงไม่ได้ให้คืนค่าเดิม
      }

      // แปลงเป็นรูปแบบ DD/MM/YYYY
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      let year = date.getFullYear()

      // ตรวจสอบว่าปีเป็น ค.ศ. หรือ พ.ศ.
      // ถ้าปีน้อยกว่า 2400 ให้สันนิษฐานว่าเป็น ค.ศ. และแปลงเป็น พ.ศ.
      if (year < 2400) {
        year += 543
      }

      return `${day}/${month}/${year}`
    },
  },
}
</script>

<style lang="scss" scoped>
.square-modal {
  border-radius: 0 !important;
  padding: 0 !important;
  max-width: 600px !important;
  height: 600px !important;
  overflow: hidden !important;
  background: transparent !important;
  border: none !important;
}

.square-modal-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #1e1e2d;
  border: 2px solid #00B058;
  box-shadow: 0 0 12px #00B058, 0 0 20px rgba(0, 176, 88, 0.6);
  position: relative;
  animation: modal-pulse 2s infinite alternate;
}

.modal-header-square {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #00B058;
  color: white;

  .modal-title {
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    font-weight: 600;
    margin: 0;
  }

  .close-button {
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    padding: 5px;

    &:hover {
      opacity: 0.8;
    }
  }
}

.modal-content-square {
  flex: 1;
  padding: 25px;
  overflow-y: auto;
  background: #151521;
  color: #e6e6e6;
}

.project-data {
  .project-name {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 600;
    color: #e6e6e6;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid #00B058;
  }
}

.vendor-section {
  margin-top: 30px;
  border-top: 1px solid #2b2b40;
  padding-top: 25px;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  .full-width {
    grid-column: 1 / -1;
  }
}

.data-item {
  background: #1e1e2d;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  border-left: 3px solid #00B058;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    background: #252536;
  }

  .data-label {
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    color: #00B058;
    margin-bottom: 8px;
    font-weight: 500;
  }

  .data-value {
    font-size: 1.1rem;
    font-weight: 500;
    color: #e6e6e6;
    padding-left: 24px;
  }
}

.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #e6e6e6;
  text-align: center;

  svg {
    margin-bottom: 15px;
    color: #00B058;
  }
}

.modal-footer-square {
  padding: 15px 20px;
  background: #1e1e2d;
  border-top: 1px solid #2b2b40;
  display: flex;
  justify-content: flex-end;

  .close-btn {
    display: flex;
    align-items: center;
    background: #00B058;
    border-color: #00B058;
    border-radius: 3px;
    padding: 8px 25px;
    font-weight: 500;

    &:hover {
      background: darken(#00B058, 5%);
      border-color: darken(#00B058, 5%);
    }
  }
}

// Override Bootstrap Vue modal styles
::v-deep .modal-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

/* ใช้ global CSS เพื่อให้แน่ใจว่าไม่ถูก override โดย scoped CSS */
</style>

<style>
/* สร้างเอฟเฟกต์แสงเรืองที่กรอบ modal */
#modalProject.modal.fade.show .modal-dialog {
  overflow: visible !important;
  position: relative !important;
  z-index: 1050 !important;
  border: none !important;
}

/* เพิ่ม CSS สำหรับ .square-modal-container */
#modalProject.modal.fade.show .square-modal-container {
  border: 2px solid #00B058 !important;
  box-shadow: 0 0 12px #00B058, 0 0 20px rgba(0, 176, 88, 0.6) !important;
  animation: modal-pulse 2s infinite alternate !important;
}

#modalProject.modal.fade.show .modal-content {
  border: none !important;
  border-radius: 0 !important;
  position: relative !important;
  overflow: hidden !important;
}

/* ใช้ animation เพื่อทำให้แสงกระพริบ */
@keyframes modal-pulse {
  0% {
    opacity: 0.7;
    box-shadow: 0 0 8px #00B058, 0 0 12px rgba(0, 176, 88, 0.5) !important;
  }
  100% {
    opacity: 1;
    box-shadow: 0 0 12px #00B058, 0 0 20px rgba(0, 176, 88, 0.8) !important;
  }
}

/* เพิ่ม style ให้กับ modal backdrop */
#modalProject.modal.fade.show + .modal-backdrop {
  opacity: 0.5 !important;
  background-color: rgba(0, 0, 0, 0.8) !important;
}

/* ปรับ modal-content ให้ไม่มี box-shadow เพื่อไม่ให้ซ้ำซ้อนกับแสงที่กรอบ */
#modalProject.modal.fade.show .modal-content {
  box-shadow: none !important;
}
</style>
