import { User } from "../store/types"
import { Message } from "../store/types/message"

export const getSender=(currentUser:User,users:User[])=>{
    return users[0]._id==currentUser._id ? users[1] : users[0]
}

export const isSameSender=(messages:Message[],m:Message,i:number,userId:string)=>{
    return (
        i < messages.length - 1 && 
            (messages[i+1].sender._id !== m.sender._id ||
                messages[i+1].sender._id === undefined) &&
            messages[i].sender._id !==userId
    )
}

export const isLastMessage=(messages:Message[],i:number,userId:string)=>{
    return (
        i=== messages.length-1 &&
        messages[messages.length-1].sender._id !== userId &&
        messages[messages.length-1].sender._id
    )
}

export const isSameSenderMargin = (messages:Message[], m:Message, i:number, userId:string) => {
    // console.log(i === messages.length - 1);
  
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === m.sender._id &&
      messages[i].sender._id !== userId
    )
      return 40;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== m.sender._id &&
        messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 0;
    else return "auto";
  };
  