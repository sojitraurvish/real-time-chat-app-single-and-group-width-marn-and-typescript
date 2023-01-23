import { Request, Response, NextFunction } from "express"
import asyncHandler from "express-async-handler"
import { Chat } from "../models/chatModel"
import { User } from "../models/userModel";

export const accessChat=asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const {userId}=req.body;

    if(!userId){
        // console.log("UserId param not sent with request");
        res.sendStatus(400)
        throw new Error("UserId param not sent with request")
        return;
    }

    var isChat=await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:userId}}}
        ]
    })
    .populate("users","-password")
    .populate("latestMessage")

    let isChatArray=await User.populate(isChat,{
        path:"latestMessage.sender",
        select:"name pic email",
    })

    if(isChatArray.length>0){
        res.send(isChat[0])
    }else{
        var chatData={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId],
        }

        try {
            const createdChat=await Chat.create(chatData)

            const fullChat=await Chat.findOne({_id:createdChat._id}).populate("users","-password")
            res.status(200).send(fullChat)
            
        } catch (error:any) {
            res.status(400)
            throw new Error(error.message)
        }
    }
})

export const fetchChats=asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
   try{
    const myChat=await Chat.find({users:{$elemMatch:{$eq:req.user._id}}})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt:-1})
    
        let isChatArray=await User.populate(myChat,{
            path:"latestMessage.sender",
            select:"name pic email",
        })

        res.status(200).send(isChatArray)
   }catch(error:any){
        res.status(400)
        throw new Error(error.message)
   }
})

export const createGroupChat=asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    if(!req.body.users || !req.body.name){
        res.status(400).send({message:"Please Fill all the feilds"})
        return
    }

    var users=JSON.parse(req.body.users)

    if(users.length<2){
        res.status(400)
        .send("More than 2 users are require to form a group chat")
    }

    users.push(req.user)

    try {
        const groupChat=await Chat.create({
            chatName:req.body.name,
            users:users,
            isGroupChat:true,
            groupAdmin:req.user 
        })

        const fullGroupChat=await Chat.findOne({_id:groupChat._id})
        .populate("users","-password")
        .populate("groupAdmin","-password")

        res.status(200).json(fullGroupChat)

    } catch (error:any) {
        res.status(400)
        throw new Error(error.message)
    }
})

export const renameGroup=asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
   const {chatId,chatName}=req.body;

    if(!chatId || !chatName){
    res.status(400).send({message:"Please Fill all the feilds"})
    return
    }

   const updatedChat=await Chat.findByIdAndUpdate(
    chatId,
    {
        chatName:chatName
    },
    {
        new:true// if i don't pass true it will give me old chatName without updation
    }
   )
   .populate("users","-password")
   .populate("groupAdmin","-password")

   if(!updatedChat){
    res.status(404)
    throw new Error("Chat Not Found")
   }else{
    res.json(updatedChat)
   }
})

export const addToGroup=asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const {chatId,userId}=req.body;

    if(!chatId || !userId){
    res.status(400).send({message:"Please Fill all the feilds"})
    return
    }

    const added=await Chat.findByIdAndUpdate(chatId,{
        $push:{users:userId},
    },{new:true})
    .populate("users","-password")
    .populate("groupAdmin","-password")
 
    if(!added){
     res.status(404)
     throw new Error("Chat Not Found")
    }else{
     res.json(added)
    }
})

export const removeFromGroup=asyncHandler(async (req:Request,res:Response,next:NextFunction)=>{
    const {chatId,userId}=req.body;

    if(!chatId || !userId){
    res.status(400).send({message:"Please Fill all the feilds"})
    return
    }

    const removed=await Chat.findByIdAndUpdate(chatId,{
        $pull:{users:userId},
    },{new:true})
    .populate("users","-password")
    .populate("groupAdmin","-password")
 
    if(!removed){
     res.status(404)
     throw new Error("Chat Not Found")
    }else{
     res.json(removed)
    }
})