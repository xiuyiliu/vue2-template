import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import components from './components'
import Element from 'element-ui'
import '@/style/index.scss'
import 'normalize.css/normalize.css' // reset css
// import './config/permission'
import BaiduMap from 'vue-baidu-map' // 引入百度地图

Vue.use(components)
Vue.use(Element, {
  size: 'small'
})
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  // ak: 'vVUs68wAOUQVNejHKylEBpP1CZEX2YBx'
  ak: '3G4O89KkktVLK1mapNEQ0YEPHtlG7T2K'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
