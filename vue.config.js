'use strict'
// import { resolve } from 'path'

module.exports = {
  devServer: {
    port: 8000,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     pathRewrite: { '^/api': '' }
    //   }
    // }
  }
}
