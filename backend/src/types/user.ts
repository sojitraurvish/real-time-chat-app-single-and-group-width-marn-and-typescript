import mongoose, {Model,Document} from "mongoose"

export interface IUser extends Document{
    _id:string,
    name:string,
    email:string,
    password:string,
    pic:string
}

export interface UserDocument extends IUser {
    matchPassword: (password: string) => Promise<Boolean>;
  }
  