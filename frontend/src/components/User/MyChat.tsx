import styled from "styled-components"
import { Chat, CHAT_CREATE_ACTION_TYPE, CHAT_LIST_ACTION_TYPE } from "../../store/types"
import {FC} from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from "redux"
import { createAction } from "../../utils/reducer.utils"
import { AppDispatch, RootState } from "../../store/store"
import { getSender } from "../../utils/ChatLogic"

export type Props={
    chat:Chat,
    // dispatch:Dispatch
}

const MyChat:FC<Props>=({chat})=>{
    const dispatch=useDispatch<AppDispatch>();

    const {createdChat}=useSelector((state:RootState)=>state.chatCreate)
    const {userInfo}=useSelector((state:RootState)=>state.userLogin)

    if(!userInfo || userInfo === undefined) {return(<></>)}
    
    const sender=getSender(userInfo!,chat.users)

    return (

    <Container idSelected={createdChat?._id===chat._id} onClick={()=>dispatch(createAction(CHAT_CREATE_ACTION_TYPE.CHAT_CREATE_SUCCESS,chat))}>
            <First>
                <img src={chat?.isGroupChat ? `https://assets.webiconspng.com/uploads/2016/12/Group-Icon-PNG.png` :sender.pic ? `/uploads${sender.pic}` :`https://cdn-icons-png.flaticon.com/512/149/149071.png`} alt="" />
            </First>
            <Second>
                <div>{chat?.isGroupChat 
                    ? chat.chatName
                    : sender.name}
                </div>
                <div><span>Email : </span>{"Fsdf"}</div>
            </Second>
    </Container>
    )
}

export default MyChat

const Container=styled.button<{idSelected:boolean}>`

    width: 84%;
    /* min-height: 10%; */
    margin:4px 0;
    margin-left: 5px;
    padding: 8px;
    /* max-width: 100%; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: none;
    border-radius: 10px;
    &:hover{
        background-color: #39b1ab;
    }
    background-color: ${(props)=>{
        return props.idSelected ? "#39b1ab !important" :"initial";
    }};
    background-color: #e9e7e9;
`
const First=styled.div`
/* min-height: 100%; */
/* border: 2px solid red; */
/* width: 20%; */
display: flex;
align-items: center;
justify-content: center;
border-radius: 50%;
img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
`
const Second=styled.div`
min-height: 90%;
width:79%;
/* border: 2px solid red; */
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: space-between;
    div{
        &:nth-child(1){

        }
        &:nth-child(2){
            span{
                font-weight: 600;
            }
        }
    }
`