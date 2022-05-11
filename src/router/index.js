import Vue from 'vue'
import VueRouter from 'vue-router'
import echarts from './echarts'
import interview from './interview'
import map from './baidu-map'
import css from './css-study'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/note',
    name: 'Note',
    component: () => import('@/views/Note.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  ...echarts,
  ...map,
  ...interview,
  ...css,
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/404.vue')
  },
  // 因为我们并不想让用户进入系统就看到白白的毫无功能性的页面，初始定向一般为系统的首页或数据展示部分
  {
    path: '/',
    redirect: '/home'
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404' }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
