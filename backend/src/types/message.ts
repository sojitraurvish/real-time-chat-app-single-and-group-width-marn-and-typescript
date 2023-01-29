import mongoose, {Model,Document} from "mongoose"
import {IChat} from "./chat"
import {IUser} from "./user"

export interface IMessage extends Document{
    _id:string,
    sender:{
        _id:string,
        name:string,
        pic:string
    },
    content:string,
    chat:IChat
    createdAt:IUser
}

  