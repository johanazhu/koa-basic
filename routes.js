const Router = require('koa-router')

const AuthController = require('./controllers/auth')
const UserController = require('./controllers/user')

// const router = new Router();
const unprotectedRouter = new Router()

unprotectedRouter.get('/home', async (ctx) => {
  ctx.body = 'hello world'
})

// auth 相关的路由
unprotectedRouter.post('/login', AuthController.login)
unprotectedRouter.post('/register', AuthController.register)

const protectedRouter = new Router()

// users 相关的路由
// 创建用户
unprotectedRouter.post('/users', UserController.createUser)
// 查看所有用户
protectedRouter.get('/users', UserController.listUsers)
protectedRouter.get('/users/:id', UserController.showUserDetail)
protectedRouter.put('/users/:id', UserController.updateUser)
protectedRouter.delete('/users/:id', UserController.deleteUser)

// 导出未受保护的路由和受保护的路由
module.exports = {
  unprotectedRouter,
  protectedRouter,
}
