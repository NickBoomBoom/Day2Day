// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AlloyFinger from 'alloyfinger'
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue.js'
import './packages/toast/toast.css'
import Toast from './packages/toast/index.js'
Vue.use(AlloyFingerVue, { AlloyFinger: AlloyFinger })
Vue.config.productionTip = false
Vue.use(Toast)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
