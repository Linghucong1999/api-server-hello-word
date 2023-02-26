const db = require('../db/index')
const path = require('path')

//文章发布处理函数
exports.addArticle = (req, res) => {
    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必须选项参数！')

    const articleInfo = {
        ...req.body,
        cover_img: path.join('/upload', req.file.filename),
        pub_date: new Date(),
        author_id: req.auth.id,
    }
    const sql = 'INSERT INTO ev_articles SET ?'
    
    db.query(sql, articleInfo, (err, result) => {
        if (err) return res.cc(err)
        if (result.affectedRows !== 1) return res.cc('发布文章失败！')
        res.cc('发布文章成功', 0)
    })
}