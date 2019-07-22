module.exports = {
  assetsDir: 'static',
  configureWebpack: {
    externals: {
      'jquery': '$'
    }
  },
  css: {
    loaderOptions: {
      sass: {
        // data: `@import "@/reset.scss";`
        data: ''
      }
    }
  },
  devServer: {
    port: 8080, // 端口号
    host: '0.0.0.0',
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    proxy: {
      '/dsp': {
        target: 'http://10.10.0.244:10080',
        // pathRewrite: { '^/dsp': ''},
        changeOrigin: true
      },
      '/boss': {
        target: 'http://10.10.0.244:10090',
        // pathRewrite: { '^/boss': ''},
        changeOrigin: true
      }
    }
  }
}
