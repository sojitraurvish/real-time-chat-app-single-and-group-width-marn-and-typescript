import mongoose, {Model,Document} from "mongoose"

export interface IChat extends Document{
    chatName:string,
    isGroupChat:string,
    users:string,
    latestMessage:string
    groupAdmin:string
}

