<template>
  <div>
    <b-modal
      id="modalprovinces"
      title="ข้อมูลแต่ละจังหวัด"
      size="lg"
      ok-title="กลับ"
      ok-only
      @shown="resetSorting"
    >
      <b-tabs
        content-class="mt-3"
        fill
      >
        <b-tab
          v-for="(provinces, region) in groupedProvinces"
          :key="region"
          :title="region"
        >
          <b-row class="text3">
            <b-col cols="12">
              <b-table
                responsive
                :items="provinces"
                :fields="fields"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                :filter="filter"
                :filter-included-fields="filterOn"
                :borderless="borderless"
                :per-page="perPage"
              >
                <template #cell(count_province)="data">
                  {{ data.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} สายทาง
                </template>
              </b-table>
            </b-col>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-modal>
  </div>
</template>

<script>
import {
  BRow, BCol, BTable, BTabs,
  BTab,
  // BFormGroup,
} from 'bootstrap-vue'
import axios from '@axios'
// import flatPickr from 'vue-flatpickr-component'

// ข้อมูลจังหวัดตามภาค
const PROVINCE_REGIONS = {
  ภาคเหนือ: [
    'เชียงใหม่', 'เชียงราย', 'น่าน', 'พะเยา', 'แพร่', 'แม่ฮ่องสอน', 'ลำปาง',
    'ลำพูน', 'อุตรดิตถ์', 'ตาก', 'พิษณุโลก', 'สุโขทัย', 'เพชรบูรณ์', 'พิจิตร',
    'กำแพงเพชร', 'นครสวรรค์', 'อุทัยธานี',
  ],
  ภาคตะวันออกเฉียงเหนือ: [
    'กาฬสินธุ์', 'ขอนแก่น', 'ชัยภูมิ', 'นครพนม', 'นครราชสีมา', 'บึงกาฬ',
    'บุรีรัมย์', 'มหาสารคาม', 'มุกดาหาร', 'ยโสธร', 'ร้อยเอ็ด', 'เลย',
    'ศรีสะเกษ', 'สกลนคร', 'สุรินทร์', 'หนองคาย', 'หนองบัวลำภู', 'อำนาจเจริญ',
    'อุดรธานี', 'อุบลราชธานี',
  ],
  ภาคกลาง: [
    'กรุงเทพมหานคร', 'นนทบุรี', 'ปทุมธานี', 'พระนครศรีอยุธยา', 'อ่างทอง',
    'ลพบุรี', 'สิงห์บุรี', 'ชัยนาท', 'สระบุรี', 'สมุทรปราการ', 'นครนายก',
    'สมุทรสงคราม', 'สมุทรสาคร', 'นครปฐม', 'สุพรรณบุรี',
  ],
  ภาคตะวันออก: [
    'ฉะเชิงเทรา', 'ปราจีนบุรี', 'สระแก้ว', 'ชลบุรี', 'ระยอง', 'จันทบุรี', 'ตราด',
  ],
  ภาคตะวันตก: [
    'กาญจนบุรี', 'ราชบุรี', 'เพชรบุรี', 'ประจวบคีรีขันธ์',
  ],
  ภาคใต้: [
    'ชุมพร', 'ระนอง', 'สุราษฎร์ธานี', 'พังงา', 'ภูเก็ต', 'กระบี่', 'นครศรีธรรมราช',
    'ตรัง', 'พัทลุง', 'สตูล', 'สงขลา', 'ปัตตานี', 'ยะลา', 'นราธิวาส',
  ],
}

export default {
  components: {
    BRow,
    BCol,
    BTable,
    BTabs,
    BTab,
    // BLink,
    // BFormGroup,
    // flatPickr,
  },
  data() {
    return {

      fields: [
        {
          key: 'province',
          label: 'จังหวัด',
          sortable: false,
        },
        {
          key: 'count_province',
          label: 'สายทาง',
          sortable: true,
          class: 'text-center',
          tdClass: 'bg-light-warning',
        },
        {
          key: 'active_location',
          label: 'นับแล้ว',
          sortable: true,
          class: 'text-center',
          tdClass: 'bg-light-success',
        },
        {
          key: 'none_active_location',
          label: 'ยังไม่นับ',
          sortable: true,
          class: 'text-center',
          tdClass: 'bg-light-danger',
        },
      ],
      items: [],
      perPage: 1000,
      sortBy: '',
      sortDesc: false,
      borderless: true,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],

      userData: JSON.parse(localStorage.getItem('userData')),
    }
  },
  computed: {
    groupedProvinces() {
      const grouped = {}
      Object.keys(PROVINCE_REGIONS).forEach(region => {
        grouped[region] = this.items.filter(item => PROVINCE_REGIONS[region].includes(item.province))
      })
      return grouped
    },
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
    computedFields() {
      // If the user isn't an admin, filter out fields that require auth.
      if (this.userData.role === 'User') return this.fields.filter(field => !field.requiresAdmin)
      return this.fields
    },
  },

  beforeDestroy() {
    clearInterval(this.interval)
  },
  mounted() {
    this.getPopupProvincesAll()
    this.interval = setInterval(() => {
      this.getPopupProvincesAll()
    }, 300000)
  },
  methods: {
    resetSorting() {
      this.sortBy = '' // Reset to default column or keep empty if no default
      this.sortDesc = false // Reset the sort direction
    // Reset other related sorting parameters if any
    },
    getPopupProvincesAll() {
      axios
        .post('/modal-ProvinceDB-All')
        .then(response => {
          // eslint-disable-next-line prefer-destructuring
          this.items = response.data
          this.totalRows = response.data.length
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.text3 {
    font-family: 'Sarabun';
    font-size: 16px;
    color: #fff;
  }
</style>
