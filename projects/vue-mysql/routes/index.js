const router = require('koa-router')()

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.post('/json', async (ctx) => {
    console.log('-----------------')
    console.log('ctx.req.body')
    console.log(ctx.request.body)
    var data = await sf.dbOp('SELECT * FROM `pd_clerk` where `id` = "4"')
    ctx.body = {
        data: data
    }
})

module.exports = router
