const Joi = require('joi');

const registerUserValidation = (data)=>{
    
    const schema = Joi.object().keys({
        id:Joi.optional().allow(''),
        firstName:Joi.string().min(2).pattern(/\D+/).max(100).required().messages({
            "string.min":`First name should have atleast 2 characters!`,
            "string.max":`First name should not exceed more than 100 characters!`,
            "string.pattern":`First name cannot have only numbers!`,
            "any.required":`Please enter your first name!`,
        }),
        lastName:Joi.string().min(2).pattern(/\D+/).max(100).required().messages({
            "string.min":`Last name should have atleast 2 characters!`,
            "string.max":`Last name should not exceed more than 100 characters!`,
            "string.pattern":`Lastname cannot have only numbers!`,
            "any.required":`Please enter your last name!`,
        }),
        email:Joi.string().email().max(100).when('id', {is: Joi.equal('',null), then: Joi.required() , otherwise: Joi.optional().allow('')}).messages({
            "string.email":`Please enter your email in proper format!`,
            "string.max":`Email should not exceed more than 100 characters!`,
            "any.required":`Please enter your email!`,
        }),
        password:Joi.string().min(7).max(20).required().messages({
            "any.required":"Please enter your password",
            "string.min":`Password should have atleast 7 characters!`,
            "string.max":`Password should not exceed more than 20 characters!`,
        }),
    });
    const result = schema.validate(data);
    return result;    
}
module.exports = registerUserValidation