import jwt from "jsonwebtoken";
import {User} from "../models/userModel"
import asyncHandler from "express-async-handler"
import express,{NextFunction, Request,Response} from "express";

export const protect=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    let token 

    if(!process.env.JWT_SECRET){
        console.log("Error : JWT_SECRET define into env file or not able to read it".red);
        return;
    }

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token=req.headers.authorization.split(" ")[1]
            if(!token) { 
                res.status(400).json({msg: "Invalid Authentication."})
                return;
            }

            interface JwtPayload {
                _id?: string;
                iat: number;
                exp: number;
            }

            const decoded:JwtPayload=<JwtPayload>jwt.verify(token,process.env.JWT_SECRET) as JwtPayload
            if(!decoded){
                res.status(400).json({msg: "Invalid Authentication."})
                return;
            }
            
            const user=await User.findById(decoded._id).select("-password")
            if(!user) {
                res.status(400).json({msg: "User does not exist."})
                return;
            }

            req.user=user;

            next();
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error("Not authorized, token failed")
        }
    }

    if(!token){
        res.status(401)
        throw new Error("Not authorized , no token")
    }

})