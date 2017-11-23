// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import md5 from 'blueimp-md5'

import moment from 'moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/style.css'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.moment = moment
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");