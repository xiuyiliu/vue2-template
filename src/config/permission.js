
import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/common'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/home', '/', '/404', '/401']

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    // 如果在已经登录的情况下跳转路径是登录也，则直接跳转到首页即可，无需重新登录
    if (to.path === '/login') {
      next('/home')
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
