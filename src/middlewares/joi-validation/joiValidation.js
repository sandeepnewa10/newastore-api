import Joi from 'joi'
import { ADDRESS, DATE, EMAIL, FNAME, LNAME, PASSWORD, PHONE, SHORTSTR, STATUS, validate } from './constant.js';

export const newAdminUserValidation = (req, res, next) => {
  
        //define rules
        const schema = Joi.object({
            fName: FNAME.required(),
            lName: LNAME.required(),
            email: EMAIL.required(),
            password: PASSWORD,
            phone: PHONE,
            address: ADDRESS,
            dob: DATE,
        })
        //give data to the rules
        validate(schema, req, res, next)

}

export const emailVerificationValidation = (req, res, next) => {   
        const schema = Joi.object({
            email: EMAIL.required(),
            emailValidationCode: SHORTSTR.required(),
        })
        validate(schema, req, res, next)
        

}


export const loginValidation = (req, res, next) => {   
        const schema = Joi.object({
            email: EMAIL.required(),
            password: PASSWORD.required()
        })
        validate(schema, req, res, next)        

}


// ========== category


export const newCategoryValidation = (req, res, next) => {  
    req.body.parentId = req.body.parentId ? req.body.parentId : null;
    const schema = Joi.object({
        status: STATUS,
        name: SHORTSTR.required(),
        parentId: SHORTSTR.allow(null, ""),
    })
    validate(schema, req, res, next)        

}
