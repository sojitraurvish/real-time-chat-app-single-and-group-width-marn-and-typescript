import { User } from "../store/types"

export const getSender=(currentUser:User,users:User[])=>{
    return users[0]._id==currentUser._id ? users[1] : users[0]
}