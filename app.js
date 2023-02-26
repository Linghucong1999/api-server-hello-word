const experss = require("express")
const app = experss()

const cors = require('cors')    //跨域
const joi = require('joi')  //密码账号书写规则

const config = require('./config')


app.use(cors())
app.use(experss.urlencoded({ extended: false }))



//响应数据的中间件
app.use(function (req, res, next) {
    res.cc = function (err, status = 1) {
        res.send({
            //状态
            status,
            //状态描述,判断err是错误对象还是字符串
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

const experssJwt = require('express-jwt') //解析token中间件
app.use(experssJwt.expressjwt({
    secret: config.jwtSceretKey, algorithms: ["HS256"], credentialsRequired: true
}).unless({ path: [/^\/api\//] }))

//托管静态资源
app.use('/upload', experss.static('./upload'))

const userRouter = require('./router/user')
app.use('/api', userRouter)


const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

//文章列表
const artCateRouter = require('./router/artcate')
app.use('/my/article', artCateRouter)

//发布文章
const articleRouter = require('./router/article')
app.use('/my/article', articleRouter)



//错误中间件
app.use(function (err, req, res, next) {
    //数据验证失败
    if (err instanceof joi.ValidationError) return res.cc(err)
    if (err.name === 'UnauthorizedError') return res.cc('身份验证失败')
    res.cc(err) //未知错误

})










app.listen(3000, function () {
    console.log("api server running at http://127.0.0.1:3000")
})      