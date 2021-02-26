import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n/'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.use(ViewUI)

Vue.config.productionTip = false

import './icons' // icon

import _ from 'lodash'
Vue.prototype._ = _

// 自定义样式
import '@/assets/less/index.less'

Vue.config.productionTip = false


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
