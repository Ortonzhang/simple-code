const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const path = require('path')
const app = new Koa()

const router = new Router()



const cors = async(ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET')
  ctx.set('Access-Control-Max-Age', 3600 * 24);
  await next()
}

router.get('/getdata', async(ctx, next) => {
  ctx.body = {
    name: 'pig',
    url: 'pig.jpg'
  }
  await next()
})

app
  .use(cors)
  .use(static(path.join(__dirname, 'public')))
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)