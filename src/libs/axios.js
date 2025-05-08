import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: 'https://mobile-api.firsttech.co.th/',
  // baseURL: 'https://drrweb-api.firsttech.co.th/',
  // baseURL: 'https://khuntan-api.hwpd.go.th/',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

Vue.prototype.$http = axiosIns

export default axiosIns
