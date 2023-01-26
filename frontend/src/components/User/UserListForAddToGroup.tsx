import {FC,Dispatch} from "react"
import { User } from "../../store/types"

export type Props={
    user:User,
    deleteUser:(user:User)=>void
}

const UserListForAddToGroup:FC<Props>=({user,deleteUser})=>{
    return (
        <span>
            {user.name}
            <button onClick={()=>deleteUser(user)} style={{fontSize:"10px",textAlign:"center",border:"1px solid black",borderRadius:"50%"}}>X</button>
        </span>
    )
}

export default UserListForAddToGroup