import { NextFunction } from "express";
import mongoose from "mongoose";
import { UserDocument } from "../types";
import bcrypt from "bcryptjs"

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false 
    },
    pic:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    }
},{
    timestamps:true
})

userSchema.methods.matchPassword=async function(this:any,enteredPassword:string){
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.pre("save",async function(this:UserDocument,next){
    if(!this.isModified("password")){
        next();
    }

    const solt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,solt)
})

export const User=mongoose.model<UserDocument>("User",userSchema)