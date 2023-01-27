import { User } from "./user"

export interface Chat{
    _id:string,
    chatName:string,
    isGroupChat:boolean,
    users:User[]
    groupAdmin:User,
    latestMessage:string,
    createdAt:string
}

