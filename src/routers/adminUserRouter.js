import express from "express";
import { comparePassword, hashPassword } from "../helpers/bcryptHelper.js";
import {
  emailVerificationValidation,
  loginValidation,
  newAdminUserValidation,
  resetAdminPasswordValidation,
  updateAdminPasswordUpdateValidation,
  updateAdminUserValidation,
} from "../middlewares/joi-validation/joiValidation.js";
import {
  findOneAdminUser,
  insertAdminUser,
  updateOneAdminUser,
} from "../models/adminUser/AdminUserModel.js";
import {
  deleteSession,
  insertSession,
} from "../models/session/SessionModel.js";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import {
  otpNotification,
  userVerifiednotification,
  verificationEmail,
} from "../helpers/emailHelper.js";
import {
  createJWTs,
  singAccessJWT,
  verifyRefreshJWT,
} from "../helpers/jwtHelper.js";
import { adminAuth } from "../middlewares/auth-middleware/authMiddleware.js";
import { createOTP } from "../utils/randomGenerator.js";

router.get("/", adminAuth, (req, res, next) => {
  try {
    const user = req.adminInfo;
    user.password = undefined;
    user.refreshJWT = undefined;

    res.json({
      status: "success",
      message: "todo",
      user,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", adminAuth, newAdminUserValidation, async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = hashPassword(password);
    req.body.emailValidationCode = uuidv4();

    const user = await insertAdminUser(req.body);
    if (user?._id) {
      res.json({
        status: "success",
        message:
          "we have sent you an email to verify your account, Please chek your mail box including Junk folder",
      });

      const url = `${process.env.ROOT_DOMAI}/admin/verify-email?c=${user.emailValidationCode}&e=${user.email}`;
      //send email
      verificationEmail({
        fName: user.fName,
        lName: user.lName,
        email: user.email,
        url,
      });
      return;
    }

    res.json({
      status: "error",
      message: "Unable to create new admin user, try again later",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.status = 200;
      error.message =
        "There is already another user uses this email, ethier reset password or use different email.";
    }
    next(error);
  }
});

router.put(
  "/",
  adminAuth,
  updateAdminUserValidation,
  async (req, res, next) => {
    try {
      const { _id, ...rest } = req.body;
      const result = await updateOneAdminUser({ _id }, rest);
      result?._id
        ? res.json({
            status: "success",
            message: "The user profile has been updated",
          })
        : res.json({
            status: "error",
            message: "unable to update the user profile please try again later",
          });
    } catch (error) {
      next(error);
    }
  }
);

//update password from user profile page
router.patch(
  "/",
  adminAuth,
  updateAdminPasswordUpdateValidation,
  async (req, res, next) => {
    try {
      const { password, _id, newPassword } = req.body;
      const userId = req.adminInfo._id.toString();

      if (_id !== userId) {
        return res.status(401).json({
          status: "error",
          message: "Invalid user request",
        });
      }
      // aA12345
      const passFromDb = req.adminInfo.password;

      // check if the password is valid?
      const isMatched = comparePassword(password, passFromDb);

      if (isMatched) {
        // encrypt the new password
        const hashedPassword = hashPassword(newPassword);

        //update the password in the db
        const result = await updateOneAdminUser(
          { _id },
          {
            password: hashedPassword,
          }
        );
        if (result?._id) {
          return res.json({
            status: "success",
            message: "Password has been updated successfully!",
          });
        }
      }

      res.json({
        status: "error",
        message: "Unable to update the password, please try again later",
      });
    } catch (error) {
      next(error);
    }
  }
);

// public router below here
router.patch(
  "/verify-email",
  emailVerificationValidation,
  async (req, res, next) => {
    try {
      const { emailValidationCode, email } = req.body;

      const user = await updateOneAdminUser(
        {
          emailValidationCode,
          email,
        },
        {
          status: "active",
          emailValidationCode: "",
        }
      );

      user?._id
        ? res.json({
            status: "success",
            message: "You account has been verified, you may login in now.",
          }) && userVerifiednotification(user)
        : res.json({
            status: "error",
            message: "Invalid or expired link, no action was takne.",
          });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/login", loginValidation, async (req, res, next) => {
  try {
    const { password, email } = req.body;

    // find if user exist based on give email

    const user = await findOneAdminUser({ email });

    if (user?._id) {
      if (user?.status !== "active") {
        return res.json({
          status: "error",
          message:
            "Your account has not been verified, Pelase check your emai and verify your account.",
        });
      }

      // we need to verify if the password send by the user and the hased password stored in our db is the same

      const isMatched = comparePassword(password, user.password);
      if (isMatched) {
        user.password = undefined;

        //jwt
        const jwts = await createJWTs({ email });

        return res.json({
          status: "success",
          message: "Logged in successfully",
          user,
          ...jwts,
        });
      }
    }

    res.json({
      status: "error",
      message: "Invalid login credintials.",
    });
  } catch (error) {
    next(error);
  }
});

// generat new accessJWT send back to the client
router.get("/accessjwt", async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization) {
      //verify the token
      const decoded = verifyRefreshJWT(authorization);

      if (decoded.email) {
        //check if exist in db
        const user = await findOneAdminUser({ email: decoded.email });
        if (user?._id) {
          //create new accessjwt and return

          return res.json({
            status: "success",
            accessJWT: await singAccessJWT({ email: decoded.email }),
          });
        }
      }
    }

    res.status(401).json({
      status: "error",
      message: "Unauthenticated",
    });
  } catch (error) {
    error.status = 401;
    next(error);
  }
});

// password reset as logged out user
router.post("/request-password-reset-otp", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (email.includes("@")) {
      // check if user exit
      const user = await findOneAdminUser({ email });
      if (user?._id) {
        // create uniq code and store in the datas with the email

        const obj = {
          token: createOTP(),
          associate: email,
          type: "updatePassword",
        };

        const result = await insertSession(obj);
        if (result?._id) {
          // email the otp  to the client
          otpNotification({
            otp: result.token,
            fName: result.associate,
            email,
          });
        }
      }
    }

    res.json({
      status: "success",
      message:
        "If the emil exist in our system, we will send you OTP and email reset instruction",
    });
  } catch (error) {
    next(error);
  }
});

// reset password
router.patch(
  "/reset-password",
  resetAdminPasswordValidation,
  async (req, res, next) => {
    try {
      const { email, otp, password } = req.body;

      const filter = {
        token: otp,
        associate: email,
        type: "updatePassword",
      };

      // find if the filter exist in the session table and delete it.
      const result = await deleteSession(filter);

      console.log(result);
      // if delete is succeed,
      if (result?._id) {
        // then, encrypt the  password and updat in user table by email id

        const ecrypted = hashPassword(password);

        const user = await updateOneAdminUser(
          { email },
          { password: ecrypted }
        );

        if (user?._id) {
          return res.json({
            status: "success",
            message: "The password has been updated",
          });
        }
      }

      res.json({
        status: "error",
        message: "Invalid request",
      });
    } catch (error) {
      next(error);
    }
  }
);
export default router;
