const Joi = require('joi');

const categoryValidation = (data)=>{
    
    const schema = Joi.object().keys({
        id:Joi.optional().allow(''),
        title:Joi.string().min(4).pattern(/\D+/).max(100).required().messages({
            "string.min":`Category title should have atleast 4 characters!`,
            "string.max":`Category title should not exceed more than 100 characters!`,
            "string.pattern":`Category title cannot have only numbers!`,
            "any.required":`Please enter category title!`,
        }),
        description:Joi.string().min(10).pattern(/\D+/).max(100).required().messages({
            "string.min":`Description should have atleast 10 characters!`,
            "string.max":`Description should not exceed more than 100 characters!`,
            "string.pattern":`Description cannot have only numbers!`,
            "any.required":`Please enter category description!`,
        }),
    });
    const result = schema.validate(data);
    return result;    
}
module.exports = categoryValidation