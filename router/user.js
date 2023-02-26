const experss = require('express')
const router = experss.Router()
const userHandler = require('../router_handler/user')
const experssJoi = require('@escook/express-joi')
const { reg_schema ,login_schema} = require('../schema/user')

// 注册新用户
router.post('/reguser', experssJoi(reg_schema), userHandler.regUser)

//登录用户
router.post('/login', experssJoi(login_schema), userHandler.login)

// router.post('/list',userHandler.cherklist) //检测路由，数据库
module.exports = router