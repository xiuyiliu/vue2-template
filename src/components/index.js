import AppUpload from './app-upload'
import AppUploadPlus from './app-upload-plus'

const components = {
  AppUpload,
  AppUploadPlus
}

export default {
  install (Vue) {
    Object.keys(components).forEach(key => {
      Vue.component(key, components[key])
    })
  }
}
