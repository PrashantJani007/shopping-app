const { errorResponse, successResponse } = require('../helpers/responseHelpers');
const {Category} = require('../models');
const {STATUS} = require('../models/category');

const categoryValidation = require('../validations/categoryValidation');

const createCategory = async(req,res)=>{
    try {
        const result = categoryValidation(req.body);
        if(result.error){
            return errorResponse(res,result.error.message,422);
        }
        const data = {
            title:req.body.title,
            description:req.body.description,
            status:STATUS.ACTIVE
        }
        const createCategory = await Category.create(data);
        return successResponse(res,createCategory,'Category created successfully',200);
    } catch (error) {
        return errorResponse(res,error.message,500)
    }
}

const getCategories = async(req,res)=>{
    try {
        const categories = await Category.findAll({attributes:['id','title']});
        return successResponse(res,categories,'All categories',200);
    } catch (error) {
        return errorResponse(res,'Something went wrong',500)
    }
}

module.exports = {createCategory,getCategories}
