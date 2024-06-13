import jwt from "jsonwebtoken"
import { SECRET } from "../config/config.js";

export const generateToken=(payload)=>{
    var token = jwt.sign({payload}, SECRET);
    return token
}
export const verifyToken=(token)=>{
    var tokenVerify = jwt.verify(token, SECRET);
    return tokenVerify
}