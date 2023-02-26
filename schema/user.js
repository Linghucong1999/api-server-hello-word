const joi = require('joi')

const username = joi.string().alphanum().min(1).max(20).required()
const password = joi.string().pattern(/^[\S]{6,12}$/)
const id = joi.number().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
const avatar = joi.string().dataUri().required()

//注册和登录表单的验证规则对象
exports.reg_schema = {
    //表示需要对 req.body中的数据进行验证
    body: {
        username,
        password,
    }
}
exports.login_schema = {
    body: {
        username,
        password
    }
}

exports.updata_userinfo_schema = {
    body: {
        id, nickname, email
    }
}
//密码更新
exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

//头像
exports.update_avatar_schema = {
    body: {
        user_pic: avatar
    }
}