import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import styled from "styled-components"
import { AppDispatch, RootState } from "../store/store"
import ChatLoading from "./ChatLoading"
import GroupChatModel from "./miscellaneous/GropChatModel"
import MyChat from "./User/MyChat"
import {useState} from "react"

const ChatBox=()=>{

    const [gropModel,setGroupModel]=useState<boolean>(false);
    const {chatList,error,loading}=useSelector((state:RootState)=>state.chatList)

    const dispatch=useDispatch<AppDispatch>();

    return (
        <>
            <Container>

                    <First>
                        <div>My Chats</div>
                        <button onClick={()=>setGroupModel(!gropModel)}>New Group Chat +</button>
                    </First>
    
                    <Section>
                            {
                                loading ? <ChatLoading/> : error ? toast.error(`${error}`) :
                                chatList?.map((chat)=>(
                                    <MyChat key={chat._id} chat={chat} />
                                ))
                            }
                            { !chatList?.length && <>Not Found...</>}
                    </Section>

            </Container>
            <GroupChatModel visible={gropModel} myOnClick={setGroupModel}/>
        </>
    )
}
export default ChatBox

const Container=styled.div`
    width: 29%;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: flex-start;
    /* border:2px solid red; */
    background-color: white;
    height: 98%;
    border-radius: 10px;
    /* overflow: hidden; */
`

const First=styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* border:2px solid red; */
    height: 14%;
    padding:0 26px;
    div{

    }
    button{
        width:45%;
        height:39%;
        border: none;
        border-radius: 5px;
        background-color: #e5e5e5;
        font-weight: bold;
        font-size: 14px;
        &:hover{
            outline: 1px solid black;
        }
    }
`
const Section=styled.div`
         /* margin-top:18px; */
    /* border: 2px solid red; */
    overflow-y: auto;
    height: 100%;
    /* min-height: 100%; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    /* width */
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}

    
`