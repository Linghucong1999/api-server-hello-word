const { id } = require('@hapi/joi/lib/base')
const db = require('../db/index')



exports.getArticleCate = (req, res) => {
    const sql = 'SELECT * FROM ev_article_cate WHERE is_delete=0 ORDER BY id ASC'     //is_delete为0表示没有删除，1表示删除
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '文章列表获取成功',
            data: results
        })
    })
}

exports.addArticleCates = (req, res) => {
    const sql = 'SELECT * FROM ev_article_cate WHERE `name`=? OR alias=?'
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('分类名称与别名别占用，请更换后重试')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用')
        const sql = 'INSERT INTO ev_article_cate SET ?'
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败!')
            res.cc('新增文章分类成功', 0)
        })

    })
}

exports.deletCateById = (req, res) => {
    const sql = 'UPDATE ev_article_cate SET is_delete=1 WHERE id=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败！')
        res.cc('删除文章成功', 0)
    })
}

exports.getArticleById = (req, res) => {
    const sql = 'SELECT * FROM ev_article_cate WHERE id=? AND is_delete=0'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('文章分类不存在')
        res.send({
            status: 0,
            message: '获取文章成功',
            data: results[0]
        })
    })
}

exports.updateCateById = (req, res) => {
    const sql = 'SELECT * FROM ev_article_cate WHERE id<>? AND (`name`=? OR alias=?) AND is_delete=0'
    db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 2) return res.cc('分类别名与分类名称被占用')
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用')
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用')
        const sql = 'UPDATE ev_article_cate SET ? WHERE id=? AND is_delete=0'
        db.query(sql, [req.body, req.body.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新文章失败')
            res.cc('更新文章成功',0)
        })
    })
}