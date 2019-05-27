import * as Koa from 'koa'
import KoaRouter = require('koa-router')

const app = new Koa()
app.use(async ctx => {
    ctx.body = "HelloWorld"
})