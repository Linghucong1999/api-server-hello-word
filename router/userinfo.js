const experss = require('express')
const router = experss.Router()
const experssJoi = require('@escook/express-joi')
const userinfo_handler = require('../router_handler/userinfo')
const { updata_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')


router.get('/userinfo', userinfo_handler.getUserInfo)   //获取用户信息
router.post('/userinfo', experssJoi(updata_userinfo_schema), userinfo_handler.updateUserInfo)    //更新用户基本信息
router.post('/updatepwd', experssJoi(update_password_schema), userinfo_handler.updatePassword)   //重置用户密码
router.post('/update/avatar', experssJoi(update_avatar_schema), userinfo_handler.updateAvatar)
module.exports = router