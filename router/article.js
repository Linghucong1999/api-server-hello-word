const express = require('express')
const router = express.Router()

const multer = require('multer')    //解析formdata格式的包
const path = require('path')  //处理路径的核心模块
const upload = multer({ dest: path.join(__dirname, '../upload') })

const article_handler = require('../router_handler/article')
const expressJoi = require('@escook/express-joi')
const { add_article_schema } = require('../schema/article')
router.post('/add',upload.single('cover_img'), expressJoi(add_article_schema), article_handler.addArticle)  //发布新文章

module.exports = router