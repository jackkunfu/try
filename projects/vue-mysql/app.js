const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')

const config = require('./config.js')

// api代理
const proxy = require('koa-proxies')
const httpsProxyAgent = require('https-proxy-agent')
app.use(proxy('/api', {
  target: 'http://172.16.8.197:8081',
  changeOrigin: true,
  logs: true,
  rewrite: path => path.replace(/^\/api/g, '')
  // agent: new httpsProxyAgent('http://172.16.8.197:8081'),
  // rewrite: path => path.replace(/^\/api(\/|\/\w+)?$/, '')
  
}))

// 链接数据库
const db = require('mysql');
// var connection = db.createConnection({
//     host: '172.16.8.191:3306',
//     // host: '172.16.8.191:3306/pudong',
//     user: 'root',
//     password: 'ipudong',
//     database: 'ceshi'
// })
var connection = db.createConnection(config.mysql)
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});
global.connection = connection;
global.sf = require('./boot.js');

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// 使用端路由渲染页面
// app.use(require('koa-static')(__dirname + '/public'))
// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// 使用前端路由分离渲染页面
// app.use(require('koa-static')(__dirname + '/dist'))
// app.use(views(__dirname + '/dist'))

// 使用前端路由，前后端，node端做后端，代理访问其他数据员后台api
app.use(require('koa-static')(__dirname + '/dist-proxy'))
app.use(views(__dirname + '/dist-proxy'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

module.exports = app
