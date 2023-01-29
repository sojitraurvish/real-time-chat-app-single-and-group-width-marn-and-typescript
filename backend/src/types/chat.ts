import mongoose, {Model,Document} from "mongoose"
import {IUser} from "./user"

export interface IChat extends Document{
    _id:string,
    chatName:string,
    isGroupChat:boolean,
    users:IUser[]
    groupAdmin:IUser,
    latestMessage:string,
    createdAt:string
}

