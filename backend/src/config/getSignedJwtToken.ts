import jwt from "jsonwebtoken"
import mongoose from "mongoose";

export const getSignedJwtToken=(_id:mongoose.Types.ObjectId)=>{
    if(!process.env.JWT_SECRET){
        console.log("Error : JWT_SECRET define into env file or not able to read it".red);
        return;
    }
    if(!process.env.JWT_EXPIRE){
        console.log("Error : JWT_EXPIRE define into env file or not able to read it".red);
        return;
    }

    return jwt.sign({_id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}