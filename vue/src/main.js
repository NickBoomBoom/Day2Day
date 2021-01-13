import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { VueHistory } from 'utils94'

Vue.config.productionTip = false
Vue.use(VueHistory, {
  router,
  // onExceed(obj) {
  //   console.warn('exceed',obj)
  // },
  // onExit(obj) {
  //   console.error('exit',obj)
  // },
  // onChange(obj) {
  //   console.log('stack update',obj)
  // }
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

