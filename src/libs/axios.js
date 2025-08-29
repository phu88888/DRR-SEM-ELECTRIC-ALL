import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: 'https://its.drr.go.th/node/mb-api/',
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

axiosIns.interceptors.request.use(config => {
  const { url: originalUrl } = config
  let baseURL
  let url
  let headers = {}
  if (originalUrl.startsWith('/api-go/')) {
    baseURL = 'https://its.drr.go.th/goapi/v1'
    headers = {
      'x-api-key': 'TlDUgcAzXWdy1kyB40IHVpgL9g4ELXdPxx4GKpxF',
    }
    url = originalUrl.replace('/api-go/', '/')
  } else {
    baseURL = 'https://its.drr.go.th/node/mb-api/'
    url = originalUrl
  }
  return {
    ...config,
    baseURL,
    url,
    headers,
  }
})

Vue.prototype.$http = axiosIns

export default axiosIns
