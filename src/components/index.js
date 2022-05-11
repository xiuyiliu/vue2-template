import AppUpload from './app-upload'
import AppUploadPlus from './app-upload-plus'
import AppPagination from './app-pagination'
import AppStaff from './app-staff'

const components = {
  AppUpload,
  AppUploadPlus,
  AppPagination,
  AppStaff
}

export default {
  install (Vue) {
    Object.keys(components).forEach(key => {
      Vue.component(key, components[key])
    })
  }
}
