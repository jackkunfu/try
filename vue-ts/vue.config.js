module.exports = {
  assetsDir: 'static',
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'vuex': 'Vuex',
      'vue-router': 'VueRouter',
      // 'axios': 'axios',
      // 'element-ui': 'ELEMENT'
    }
  },
  css: {
    loaderOptions: {
      sass: {
        // data: `@import "@/sass/fn.sass";`
      }
    }
  },
  devServer: {
    port: 7777, // 端口号
    host: '0.0.0.0',
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    proxy: {
      '/dsp': {
        target: 'http://10.10.0.244:10080',
        // target: 'http://192.168.1.55:10080/',
        // target: 'http://192.168.1.35:10080/',
        // pathRewrite: { '^/dsp': ''},
        changeOrigin: true
      },
      '/customer': {
        target: 'http://10.10.0.244:10090/',
        changeOrigin: true
      },
      '/boss': {
        target: 'http://10.10.0.244:10090',
        // target: 'http://192.168.1.55:10090/',
        // target: 'http://192.168.1.35:10090/',
        // pathRewrite: { '^/boss': ''},
        changeOrigin: true
      },
      // '/fs': {
      //     
      //     pathRewrite: { '^/fs': ''},
      //     changeOrigin: true
      // },
      '/fs': {
        // target: 'http://10.10.0.244:10091',
        target: 'http://122.112.251.59:8082',
        changeOrigin: true
      },
      '/cas': {
        // target: 'https://test.yun-ti.com:8282',
        target: 'http://10.10.0.244:8181/',
        changeOrigin: true
      }
    }
  }
}
