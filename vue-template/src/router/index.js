import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import KeepAlive from '@/components/keep-alive'
import TabContainerTest from '@/components/TabContainerTest'
import Tab1 from '@/components/Tab1'
import Tab2 from '@/components/Tab2'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [
        {
          path: '/home/tab1',
          component: Tab1
        },
        {
          path: '/home/tab2',
          component: Tab2
        }
      ]
    },
    {
      path: 'keep-alive',
      name: 'KeepAlive',
      component: KeepAlive,
      meta: { keepAlive: true }
    },
    {
      path: 'tab',
      name: 'TabContainerTest',
      component: TabContainerTest
    }
  ]
})
