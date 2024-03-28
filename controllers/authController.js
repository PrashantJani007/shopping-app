const {User} = require('../models');
const registerUserValidation = require('../validations/registerUserValidation');
const {errorResponse,successResponse} = require('../helpers/responseHelpers');
const register = async(req,res)=>{
    try {
        const result = registerUserValidation(req.body);
        if(result.error){
            return res.status(422).json({status:false,error:result.error.message});
        }
        const data = req.body
        const checkDuplicateEmail = await User.findOne({where:{email:data.email}});
        if(checkDuplicateEmail){
            return errorResponse(res,'Email already exists.',422);
        }
        const registerUser = await User.create(data);
        return successResponse(res,registerUser,'User registered successfully',200);
    } catch (error) {
        return errorResponse(res,error.message,500);
    }
}

module.exports = {register}