### koa-generator生成的koa项目，这里用的是koa2

#### 启动
* npm start  默认3000端口
* npm run dev    开发模式 更改文件自动重启服务

#### 线上启动 全局安装pm2 用pm2 ./bin/www 启动服务器

#### 文件目录
* fronts是前端各个项目，目前是测试的vue的项目

#### 功能
* 作为静态服务器（目录指向fronts中的dist文件夹）
* 作为node服务器，接口转发（目录指向fronts中的dist-proxy文件夹）
    - 由于fronts里有多个项目，每个项目目前都是通过二级目录访问，每个vue项目打包时要设置assetsPublicPath路径为当前项目目录文件夹名称
    - 后面学习下nginx，应该可以解决需要设置assetsPublicPath的问题
* 作为全栈项目，有连接mysql（app.js中），直接定义接口访问数据库
    - 整套返回（渲染views目录）
    - 作为fronts文件夹的后台api服务，fronts里面的项目中直接访问node层的直连数据库接口