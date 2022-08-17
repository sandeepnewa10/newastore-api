import jwt from 'jsonwebtoken';
import { updateOneAdminUser } from '../models/adminUser/AdminUserModel.js';
import { insertSession } from '../models/session/SessionModel.js';

export const singAccessJWT = async (payload) => {
    const accessJWT = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "1hr"
    })

    const obj = {
        token: accessJWT,
        type: 'jwt'
    }
    await insertSession(obj)
    return accessJWT;
}



export const singRefreshJWT = async (payload) => {
    const refreshJWT = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "30d"
    })

    await updateOneAdminUser(payload, { refreshJWT })
    return singRefreshJWT;
}

export const createJWTs= async(payload) =>{
    return{
        accessJWT: await singAccessJWT(payload) ,
        refreshJWT: await singRefreshJWT(payload) 
    }
}