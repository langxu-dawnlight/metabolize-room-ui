import Vue from 'vue'
import VueRouter from 'vue-router'

import home from './routes/home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/layout/index'),
    children: [
      ...home
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
