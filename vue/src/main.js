
import App from './App.vue'
import router from './router'
// import { VueHistory } from 'utils94'
import Utils, { VueHistory } from 'utils94'
Vue.config.productionTip = false
Vue.use(VueHistory, {
  router
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

