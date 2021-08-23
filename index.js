const path = require('path')
const Koa = require('koa')
const bobyParser = require('koa-bodyparser')
const koaStatic = require('koa-static')
const cors = require('@koa/cors')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const jwt = require('koa-jwt')
const { protectedRouter, unprotectedRouter } = require('./routes')
const { JWT_SECRET } = require('./config/')
const db = require('./db/')

const app = new Koa()

db.connect()

app.use(
  error({
    postFormat: (e, { stack, ...rest }) =>
      process.env.NODE_ENV === 'production' ? rest : { stack, ...rest },
  }),
)
app.use(bobyParser())
app.use(koaStatic(path.join(__dirname, 'public')))
app.use(cors())
app.use(parameter(app))

// 无需 JWT Token 即可访问
app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods())

// 注册 JWT 中间件
app.use(jwt({ secret: JWT_SECRET }).unless({ method: 'GET' }))

// 需要 JWT Token 才可访问
app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods())

app.listen(3000, () => {
  console.log('3000端口已启动')
})
