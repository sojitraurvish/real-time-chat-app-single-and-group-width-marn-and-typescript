import { Request, Response, NextFunction } from "express"
import asyncHandler from "express-async-handler"
import { Chat } from "../models/chatModel";
import { Message } from "../models/messageModel";
import { User } from "../models/userModel";

export const sendMessage=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const {content,chatId}=req.body;

    if(!content|| !chatId){
        res.status(400);
        throw new Error("Invalid data passed into request")
    }

    let newMessage={
        sender:req.user._id,
        content:content,
        chat:chatId
    }

    try{
        let message=await Message.create(newMessage)

        await Chat.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message
        })

        message=await message.populate("sender","name pic")
        message=await message.populate("chat")
        let nextNewMessage=await User.populate(message,{
            path:"chat.users",
            select:"name pic email"
        })


        res.json(nextNewMessage)
    }catch(error){
        res.status(400);
        throw new Error(`${error}`)
    }
})

export const allMessages=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{

    try{
        const message=await Message.find({chat:req.params.chatId})
            .populate("sender","name pic email")
            .populate("chat")

        res.json(message)
    }catch(error){
        res.status(400);
        throw new Error(`${error}`)
    }
})

