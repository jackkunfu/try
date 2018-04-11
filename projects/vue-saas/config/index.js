console.log('config/index.js');

// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
      // 配置成资源服务的域名地址
      // 这里配成 /vue/ 是因为测试地址 http://172.16.8.191/vue/index.html 未设置代理
    assetsPublicPath: '',
    // assetsPublicPath: '/vue/',
    productionSourceMap: false,
    productionGzip: true,    // 打包是否开启gzip压缩
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: true    // 打包后是否展示分析结构
    // bundleAnalyzerReport: process.env.pack_analysis
  },
  dev: {
    env: require('./dev.env'),
    port: 8002,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    context: [ //代理路径
        // '/shopping',
        // '/ugc',
        // '/v1',
        // '/v2',
        // '/v3',
        // '/v4',
        // '/bos',
        // '/member',
        // '/promotion',
        // '/eus',
        // '/payapi',
        // '/admin',
        // '/statis',
    ],
    cssSourceMap: false
  }
}
