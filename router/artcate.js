const experss = require('express')
const experssJoi = require('@escook/express-joi')
const router = experss.Router()

const { add_cate_schema, delete_cate_schema, get_cate_schema, update_cate_schema } = require('../schema/artcate')

const artcate_handler = require('../router_handler/artcate')

router.get('/cates', artcate_handler.getArticleCate)
router.post('/addcates', experssJoi(add_cate_schema), artcate_handler.addArticleCates)    //文章分类
router.get('/deletecate/:id', experssJoi(delete_cate_schema), artcate_handler.deletCateById)    //文章删除
router.get('/cates/:id', experssJoi(get_cate_schema), artcate_handler.getArticleById) //根据id获取文章分类列表
router.post('/updatecate', experssJoi(update_cate_schema), artcate_handler.updateCateById)   //根据id更新文章分类

module.exports = router