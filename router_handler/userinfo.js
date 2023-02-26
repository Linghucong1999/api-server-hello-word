const db = require('../db/index')
const bcrypt = require('bcryptjs')

exports.getUserInfo = (req, res) => {
    const sql = `SELECT id,username,nickname,email,user_pic FROM ev_users WHERE id=?`
    db.query(sql, req.auth.id, (err, result) => {
        if (err) return res.cc(err)
        if (result.length != 1) return res.cc('获取用户信息失败')
        res.send({
            status: 0,
            message: '获取用户基本信息成功',
            data: result[0],
        })
    })
}

//更新用户模块
exports.updateUserInfo = (req, res) => {
    const sql = `UPDATE ev_users set ?WHERE id=?`
    db.query(sql, [req.body, req.body.id], (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('修改用户基本信息失败')
        return res.cc('修改用户成功', 0)
    })
}

//重置密码
exports.updatePassword = (req, res) => {
    const sql = `SELECT * FROM ev_users WHERE id=?`
    db.query(sql, req.auth.id, (err, result) => {
        if (err) return res.cc(err)
        if (result.length !== 1) return res.cc('用户不存在')
        const compareResult = bcrypt.compareSync(req.body.oldPwd, result[0].password)
        if (!compareResult) return res.cc('原密码错误')
        const sql = 'UPDATE ev_users SET `password`=? WHERE id=?'
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sql, [newPwd, req.auth.id], (err, result) => {
            if (err) return res.cc(err)
            if (result.affectedRows !== 1) return res.cc('更新密码失败！')
            res.cc('更新密码成功!', 0)
        })
    })
}

//更新用户头像
exports.updateAvatar = (req, res) => {
    const sql = 'UPDATE ev_users SET user_pic=? WHERE id=?'
    console.log(req.body.user_pic)
    db.query(sql, [req.body.user_pic, req.auth.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新头像失败!')
        return res.cc('更新成功！', 0)
    })
}