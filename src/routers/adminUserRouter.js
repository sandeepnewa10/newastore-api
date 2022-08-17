import express from 'express'
import { comparePassword, hashPassword } from '../helpers/bcryptHelper.js';
import { insertAdminUser, updateOneAdminUser, findOneAdminUser } from '../models/adminUser/AdminUserModel.js';
import { newAdminUserValidation, loginValidation } from './../middlewares/joi-validation/adminUserValidation.js'
const router = express.Router()
import { v4 as uuidv4 } from 'uuid';
import { verificationEmail, userVerifiednotification } from '../helpers/emailHelper.js';
import { emailVerificationValidation } from '../middlewares/joi-validation/adminUserValidation.js'
import {createJWTs} from '../helpers/jwtHelpers.js'

// create unique varification code
// send create a link poiting to our frontend with the email and verification code and send to their email


router.post("/", newAdminUserValidation, async (req, res, next) => {
    try {

        const { password } = req.body;
        req.body.password = hashPassword(password)
        req.body.emailValidationCod = uuidv4();

        console.log(req.body);
        const user = await insertAdminUser(req.body);
        if (user?._id) {
            res.json({
                status: "success",
                message: "we have sent you an email to verify your account, please check your email box including junk folder"
            })
            const url = `${process.env.ROOT_DOMAIN}/admin/verify-email?c=${user.emailValidationCod}&e=${user.email}`;

            //send email            
            verificationEmail({
                fName: user.fName,
                lName: user.lName,
                email: user.email,
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
    } catch (error) {
        if (error.message.includes("E11000 duplicate key error collection")) {
            error.status = 200;
            error.message = "There is already another user uses this email, either reset password or use different email"
        }
        next(error)
    }
})
// Email verification validation 
router.patch("/verify-email", emailVerificationValidation, async (req, res, next) => {
    try {
        const { emailValidationCode, email } = req.body
        const user = await updateOneAdminUser({
            emailValidationCode,
            email,
        },
            {
                status: "active",
                emailValidationCode: "",
            })
        console.log(user)
        user?._id ?
            res.json({
                status: "success",
                message: "You account has been verified, you may login in now"
            }) && userVerifiednotification(user)
            : res.json({
                status: "error",
                message: "Invalid or expired link, no action was taken"
            })
    } catch (error) {
        next(error)
    }
})




// Admin login 
router.post("/login", loginValidation, async (req, res, next) => {
    try {
        const { password, email } = req.body
        console.log(email)
        const user = await findOneAdminUser({ email })
       
       
        if (user?._id) {


            if(user?.status !== "active"){
                return res.json({
                    status: "error",
                    message: "Your account has not been verified, please check your email and verify your account"
                })
            }

            //we need to verify if the password send by the user and the hased password stored in our db in the same
            const isMatched = comparePassword(password, user.password)
            if (isMatched) {
                user.password = undefined;

                //JWT
                const jwts =  await createJWTs({email})
                return   res.json({
                    status: "success",
                    message: "Logged in successfully",
                    user,
                    ...jwts,
                })
            }
        } 
        res.json({
            status: "error",
            message: "Invalid login credintials"
        })
      
    } catch (error) {
        next(error)
    }
})

export default router