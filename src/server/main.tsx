import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'
import * as KoaBodyParser from 'koa-bodyparser'
import * as React from 'react'
import {renderToString} from 'react-dom/server'


const app = new Koa()
const router = new KoaRouter()

app.use(async (ctx, next) => {
    await next()
})

app.use(KoaBodyParser())

router.get('/api/form', async (ctx, next) => {
   const formComponent = (
       <form action="/api/form/signin" method="post">
           <p><input name="name" defaultValue="koa"/></p>
           <p><button type="submit">Submit</button></p>
       </form>
   )
    const reactDom = renderToString(formComponent)
    ctx.response.body = reactDom
})

router.post('/api/form/signin',async (ctx,next) =>{
    const name = ctx.request.body.name || ''
    console.log(name)
})

router.get("/api/hello/:name", async (ctx, next) => {
    const name = ctx.params.name
    ctx.response.body = `<h1>Hello,${name}!</h1>`
})

app.use(router.routes())

app.listen(3000)