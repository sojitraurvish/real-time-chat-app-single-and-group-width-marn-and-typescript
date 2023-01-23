import mongoose, {Model,Document} from "mongoose"

export interface IMessage extends Document{
    sender:string,
    content:string,
    chat:string,
}

  