const {User} = require('../models');
const registerUserValidation = require('../validations/registerUserValidation');
const {errorResponse,successResponse} = require('../helpers/responseHelpers');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const register = async(req,res)=>{
    try {
        const result = registerUserValidation(req.body);
        if(result.error){
            return errorResponse(res,result.error.message,422);
        }
        const data = req.body
        const checkDuplicateEmail = await User.findOne({where:{email:data.email}});
        if(checkDuplicateEmail){
            return errorResponse(res,'Email already exists.',422);
        }
        const registerUser = await User.create(data);
        return successResponse(res,null,'User registered successfully',200);
    } catch (error) {
        return errorResponse(res,error.message,500);
    }
}

const login = async(req,res)=>{
    const {email,password} = req.body;
    const getUserData = await User.findOne({where:{email},attributes:['email','password']});
    if(!getUserData){
        return errorResponse(res,'User does not exists.',400);
    }
    const checkPassword = await bcrypt.compare(password,getUserData.password);
    if(!checkPassword){
        return errorResponse(res,'Please check the credentials.',400);
    }
    const SECRET = process.env.SECRET
    const token = jwt.sign({email:getUserData.email},SECRET,{expiresIn:'30h'});
    const responseUserData = { ...getUserData.dataValues, token };
    delete responseUserData.password;
    return successResponse(res,responseUserData,'User logged in successfully',200);
}

module.exports = {register,login}