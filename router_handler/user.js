const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sql = 'select * from ev_users where username=?'


// 注册用户的处理函数
exports.regUser = (req, res) => {
    const userinfo = req.body

    db.query(sql, [userinfo.username], function (err, results) {
        //执行sql语句失败
        if (err) {
            return res.send({ status: 1, message: err.message })
        }
        //用户名被占用
        if (results.length > 0) {
            return res.send({ status: 1, message: '用户名被占用,请更换用户名！' })
        }

        //用户名可用继续流程......
        userinfo.password = bcrypt.hashSync(userinfo.password, 10) //密码加密
        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, function (err, results) {
            if (err) return res.send({ status: 1, message: err.message })
            if (results.affectedRows !== 1) {
                return res.send({ status: 1, message: '注册用户失败，请稍后再试!' })
            }
            // console.log(results)
            res.send({ status: 0, message: '注册成功!' })
        })
    })
}

const config = require('../config')
// 登录用户的处理函数
exports.login = (req, res) => {
    const userinfo = req.body
    const sql = 'select * from ev_users where username=?'
    db.query(sql, userinfo.username, function (err, results) {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('登录失败！')

        const user = { ...results[0], password: '', user_pic: '' }
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)

        if (!compareResult) {
            return res.cc('登录失败')
        }
        //生成token字符串
        const tokenStr = jwt.sign(user, config.jwtSceretKey, {
            expiresIn: '10H'
        })
        res.send({
            status: 0,
            message: '登录成功!',
            tooken: 'Bearer ' + tokenStr,
        })
    })

}


// 检测路由与数据库
// exports.cherklist=(req,res)=>{
//     const userinfo=req.body
//     const sql =`select * from ev_users where username='linghuchong'`
//     db.query(sql,function(err,results){
//         console.log(results)
//         res.cc()
//     })
// }