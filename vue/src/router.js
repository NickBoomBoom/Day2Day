import Router from 'vue-router'
import Vue from 'vue'
import a from '@/view/a.vue'
import b from '@/view/b.vue'
import c from '@/view/c.vue'
Vue.use(Router)
const router = new Router({
  mode: 'history',

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.saveScrollTop) {
        from.meta.savedPosition = document.documentElement.scrollTop || document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },

  routes: [
    {
      path: '/a',
      component: a
    },
    {
      path: '/b',
      component: b
    },
    {
      path: '/c',
      component: c
    },
    {
      path: '*',
      redirect: '/a'
    }
  ]
})


export default router