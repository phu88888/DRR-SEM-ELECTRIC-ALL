<template>
  <div>
    <b-row>
      <b-col
        lg="6"
        md="6"
        class="d-flex align-items-center justify-content-start mt-1"
      >
        <b-link
          style="font-size: 26px; color: #fff;"
          href="/location"
        >
          <!-- target="_blank" -->
          <feather-icon
            style="margin-bottom: 10px;"
            size="34"
            icon="ArrowLeftIcon"
          />
        </b-link>
      </b-col>
      <b-col
        lg="6"
        md="6"
        class="d-flex align-items-center justify-content-end mt-1"
      >
        <!-- <b-button
          variant="primary"
          style="color: ffffff;"
          @click="printPage"
        >
          Export
        </b-button> -->
        <b-link @click="printPage">
          <feather-icon
            style="color: #fff; margin-right: 15px; margin-bottom: 10px;"
            size="34"
            icon="DownloadIcon"
          />
        </b-link>
      </b-col>
    </b-row>
    <div>
      <section
        slot="pdf-content"
        class="pdf-content"
      >
        <!-- <b-row>
          <b-col
            lg="12"
            md="12"
          > -->
        <div class="html2pdf__page-break">
          <!-- <b-card style="background: #fff; width: 100%; height: 100%; border-radius: 10px;"> -->
          <b-row>
            <b-col
              class="d-flex align-items-center justify-content-center mb-1"
              lg="12"
            >
              <ReportP1 />
            </b-col>
          </b-row>
          <!-- </b-card> -->
        </div>
        <!-- </b-col>
        </b-row> -->
      </section>

      <section
        slot="pdf-content"
        class="pdf-content"
      >
        <!-- <b-card style="background: #fff; width: 100%; height: 100%; border-radius: 10px;"> -->
        <div class="html2pdf__page-break">
          <b-row>
            <b-col
              class="d-flex align-items-center justify-content-center mb-1"
              lg="12"
            >
              <ReportP2 />
            </b-col>
          </b-row>
        </div>
        <hr
          class="page-break"
          style="width: 100%; border: none;"
        >
        <!-- </b-card> -->
        <!-- </b-col>
        </b-row> -->
      </section>

      <section
        slot="pdf-content"
        class="pdf-content"
      >
        <div class="html2pdf__page-break">
          <!-- <b-card style="background: #fff; width: 100%; height: 100%; border-radius: 10px;"> -->
          <b-row>
            <b-col
              class="d-flex align-items-center justify-content-center mb-1"
              lg="12"
            >
              <ReportP3 />
            </b-col>
          </b-row>
          <!-- </b-card> -->
        </div>
        <!-- <hr
          class="page-break"
          style="width: 100%; border: none;"
        > -->
        <!-- </b-col>
        </b-row> -->
      </section>

      <section
        slot="pdf-content"
        class="pdf-content"
      >
        <div>
          <!-- <b-card style="background: #fff; width: 100%; height: 100%; border-radius: 10px;"> -->
          <b-row>
            <b-col
              class="d-flex align-items-center justify-content-center mb-1"
              lg="12"
            >
              <ReportP4 />
            </b-col>
          </b-row>
          <!-- </b-card> -->
        </div>
      </section>

      <section
        slot="pdf-content"
        class="pdf-content hidden"
      >
        <div>
          <b-row>
            <b-col
              class="d-flex align-items-center justify-content-center mb-1"
              lg="12"
            >
              <ReportP5 />
            </b-col>
          </b-row>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol, BLink,
  // BButton,
} from 'bootstrap-vue'
import axios from '@axios'
// import html2PDF from 'jspdf-html2canvas'
import ReportP1 from './ReportP1-longdo.vue'
import ReportP2 from './ReportP2.vue'
import ReportP3 from './ReportP3.vue'
import ReportP4 from './ReportP4.vue'
import ReportP5 from './ReportP5.vue'

export default {
  components: {
    BRow,
    BCol,
    BLink,
    // BCard,
    // BButton,
    ReportP1,
    ReportP2,
    ReportP3,
    ReportP4,
    ReportP5,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      location_id: '',
      road_code: '',
      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },
  mounted() {
    this.reportData()
    this.interval = setInterval(() => {
      this.reportData()
    }, 600000)
  },
  methods: {
    printPage() {
      const tempTitle = document.title
      document.title = `(${this.location_id}) ${this.road_code}`
      window.print()
      document.title = tempTitle
    },
    // saveFile() {
    //   const element = document.createElement('a')
    //   const file = new Blob(['Example file content'], { type: 'text/plain' })
    //   element.href = URL.createObjectURL(file)
    //   element.download = 'example.pdf'
    //   document.body.appendChild(element) // Append the element to the body
    //   element.click() // Programmatically click the element to trigger the download
    //   document.body.removeChild(element) // Clean up and remove the element from the body
    // },
    // printAndSave() {
    //   this.printPage()
    //   this.saveFile()
    // },

    reportData() {
      axios
        .post('/get-Data-Report-All', { location_id: this.$route.query.location_id })
        .then(response => {
          this.location_id = response.data[0].location_id
          this.road_code = response.data[0].road_code
        })
        .catch(error => {
          console.log(error)
        })
    },

    // generatePDF() {
    //   const page = document.getElementById('Report')
    //   const date = new Date().toJSON().slice(0, 10).replace(/-/g, '-')
    //   html2PDF(page, {
    //     jsPDF: {
    //       format: 'a4',
    //     },
    //     backgroundColor: '#ffffff',
    //     margin: {
    //       top: 5,
    //       right: 5,
    //       bottom: 5,
    //       left: 5,
    //     },
    //     imageType: 'image/jpeg',
    //     output: `Report ${date}.pdf`,
    //   })
    // },

    // generatePDF() {
    //   this.$refs.html2Pdf.generatePdf()
    // },
  },
}
</script>

<style>
/* Table styles */
.custom-table .table, .custom-table .table th, .custom-table .table td {
  background-color: white;
  border: 1px solid black;
}

.custom-table .table th,
.custom-table .table td {
  border-color: black;
  color: black !important;
}

@media print {
  /* Global print settings */
  @page {
    size: A4;
    margin: 0.5cm; /* Reduced margins to prevent blank pages */
  }

  /* Page 1 specific rules */
  section[slot="pdf-content"]:first-of-type {
    margin-top: -245px !important;
  }

  section[slot="pdf-content"]:first-of-type .html2pdf__page-break {
    margin-top: -245px !important;
  }

  section[slot="pdf-content"]:first-of-type .b-row:first-child {
    margin-top: -245px !important;
  }

  /* Hide navigation elements */
  .main-menu,
  .header-navbar,
  .vertical-overlay-menu .content {
    display: none !important;
  }

  /* Make content full width */
  .app-content {
    margin-left: 0 !important;
    padding: 0 !important;
    width: 100% !important;
  }

  /* Page break handling */
  .page-break {
    page-break-after: always;
  }

  /* A4 size settings */
  .a4-size {
    width: 210mm;
    height: 297mm;
    padding: 20mm;
    margin: 0;
    background: white;
  }

  /* Hide scrollbars */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Reset wrapper positioning */
  .content-wrapper {
    margin: 0 !important;
    padding: 0 !important;
  }

  /* Hide floating elements */
  .floating-nav,
  .scroll-to-top {
    display: none !important;
  }

  /* Table styles for printing */
  .custom-table .table th,
  .custom-table .table td,
  .table th,
  .table td {
    background-color: white !important;
    color: black !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    vertical-align: middle !important;
    padding: 2px 5px !important;
    white-space: normal !important;
    border: 1px solid black !important;
  }

  /* Ensure all table backgrounds are white */
  .table,
  .custom-table .table {
    background-color: white !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}

/* Font settings */
.pdf-content span,
.pdf-content div {
  font-family: 'Sarabun', sans-serif;
  font-size: 14px;
}
</style>
