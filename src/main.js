import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import ImageUploader from 'vue-image-upload-resize'
import VueSweetalert2 from 'vue-sweetalert2'
import { Icon } from 'leaflet'
import router from './router'
import store from './store'
import App from './App.vue'
// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'

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
// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
Vue.use(ImageUploader)
// Composition API
Vue.use(VueCompositionAPI)
Vue.use(VueSweetalert2)
// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
