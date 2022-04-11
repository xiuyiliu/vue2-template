import Axios from 'axios'
import { Message, Loading } from 'element-ui'
import { getToken } from '@/utils/common'

// 在配置axios实例时，需要在切面配置接口请求的loading，在项目层面上防止在请求接口时的用户操作。
// 为了防止同时调用多个接口导致生成多个loading实例的问题，需要做出以下配置：

const loadingOptions = {
  text: '加载中...'
}

const loadingInstanceObj = {
  loadingInstance: null,
  loadingCount: 0,
  addLoading () {
    this.loadingInstance = Loading.service(loadingOptions)
    this.loadingCount++
  },
  closeLoading () {
    this.loadingCount--
    if (this.loadingCount <= 0) {
      this.loadingInstance && this.loadingInstance.close()
      this.loadingCount = 0
    }
  }
}

// 错误处理函数
const handleError = (error) => {
  Message.error(error)
}

// 创建实例时设置配置的默认值
const service = Axios.create({
  timeout: 20000
  // baseURL: '',
})

// 在实例已创建后修改默认值
// 针对IE浏览器get请求缓存问题
service.defaults.headers.common['cache-control'] = 'no-cache'
service.defaults.headers.common.Pragma = 'no-cache'

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = getToken()
  if (token) {
    config.headers.token = token
  }
  if (!config.hideLoading) {
    loadingInstanceObj.addLoading()
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  loadingInstanceObj.closeLoading()
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  loadingInstanceObj.closeLoading()
  return response.data
}, function (error) {
  // 对响应错误做点什么
  loadingInstanceObj.closeLoading()
  handleError(error)
  return Promise.reject(error)
})

export default service
