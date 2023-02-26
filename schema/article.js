const joi = require('joi')

const title = joi.string().required()   //标题
const cate_id = joi.number().integer().min(1).required()    //分类id
const content = joi.string().required().allow()     //内容
const state = joi.string().valid('已发布', '草稿').required()   //发布状态

exports.add_article_schema = {
    body: {
        title,
        cate_id,
        content,
        state
    }
}