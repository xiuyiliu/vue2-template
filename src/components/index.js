import AppUpload from './app-upload'
import AppUploadPlus from './app-upload-plus'
import AppPagination from './app-pagination'

const components = {
  AppUpload,
  AppUploadPlus,
  AppPagination
}

export default {
  install (Vue) {
    Object.keys(components).forEach(key => {
      Vue.component(key, components[key])
    })
  }
}
