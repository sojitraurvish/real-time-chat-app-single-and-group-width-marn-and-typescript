import { Chat } from "./chat"
import { User } from "./user"

export interface Message{
    _id:string,
    sender:{
        id:string,
        name:string,
        pic:string
    },
    content:string,
    chat:Chat
    createdAt:User
}

