const joi = require('joi')

const name = joi.string().required()  //分类名称验证
const alias = joi.string().alphanum().required()  //分类别名的验证规则
const id = joi.number().integer().min(1).required()


exports.add_cate_schema = {
    body: {
        name, alias
    }
}
exports.delete_cate_schema = {
    params: {
        id
    }
}

exports.get_cate_schema = {
    params: {
        id
    }
}

exports.update_cate_schema={
    body:{
        id,
        name,
        alias
    }
}