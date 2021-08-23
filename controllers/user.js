const assert = require('http-assert')
const User = require('../models/User')

class UserController {
  static async createUser(ctx) {
    ctx.verifyParams({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })
    const { username, password } = ctx.request.body
    const model = await User.create({ username, password })
    ctx.status = 200
    ctx.body = model
  }
  static async listUsers(ctx) {
    //   插入数据
    // User.insertMany([
    //   {
    //     username: 'johan',
    //     password: '123',
    //   },
    //   {
    //     username: 'elaine',
    //     password: '456',
    //   },
    // ])
    const model = await User.find()
    ctx.status = 200
    ctx.body = model
  }
  static async showUserDetail(ctx) {
    const model = await User.findById(ctx.params.id)
    ctx.status = 200
    ctx.body = model
  }
  static async updateUser(ctx) {
    const userId = ctx.params.id

    assert(userId === ctx.state.user.id, 403, '无权进行此操作')
    const model = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    ctx.status = 200
    ctx.body = model
  }
  static async deleteUser(ctx) {
    const userId = ctx.params.id

    assert(userId === ctx.state.user.id, 403, '无权进行此操作')

    await User.findByIdAndDelete(ctx.params.id)
    ctx.status = 204
  }
}

module.exports = UserController
