import Vue from 'vue'
import Router from 'vue-router'

import Index from '../pages/Index.vue'
import Watch from '@/pages/Watch.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/watch',
      name: 'watch',
      component: Watch
    }
  ]
})
