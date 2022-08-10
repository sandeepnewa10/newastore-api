import express from 'express'
import { hashPassword } from '../helpers/bcryptHelper.js';
import { insertAdminUser } from '../models/adminUser/AdminUserModel.js';
import {  newAdminUserValidation } from './../middlewares/joi-validation/adminUserValidation.js'
const router = express.Router()
import { v4 as uuidv4 } from 'uuid';
import { verificationEmail } from '../helpers/emailHelper.js';


// create unique varification code
// send create a link poiting to our frontend with the email and verification code and send to their email


router.post("/", newAdminUserValidation, async (req, res, next)=>{
    try{

        const {password}= req.body;  
        req.body.password = hashPassword(password) 
        req.body.emailValidationCod = uuidv4() ;

        console.log(req.body);
        const user = await insertAdminUser(req.body);
        if(user?._id){
            res.json({
                status: "success",
                message: "we have sent you an email to verify your account, please check your email box including junk folder"
            })
            const url=`${process.env.ROOT_DOMAIN}/admin/verify-email?c=${user.emailValidationCod}&e=${user.email}`;

            //send email            
            verificationEmail({
                    fName: user.fName,
                    lName:user.lName,
                    email:user.email,
                    url,
            })
            return;
        }
        // user?._id 
        // ?   res.json({
        //     status: "success",
        //     message: "we have sent you an email to verify your account, please check your email box including junk folder"
        // })
        // :  
         res.json({
            status: "error",
            message: "unable to create new admin user, try again later"
        })
    } catch(error){
        if(error.message.includes("E11000 duplicate key error collection")){
            error.status = 2000;
            error.message="There is already another user uses this email, either reset password or use different email"
        }
        next(error)
    }
})

router.patch("/verify-email", (req, res, next)=>{
    try{
        console.log(req.body);
        res.json({
            status: "success",
            message: "verify email todo create new user"
        })
    } catch(error){
        next(error)
    }
})



export default router