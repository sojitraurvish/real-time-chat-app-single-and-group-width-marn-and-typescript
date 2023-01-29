import { useDispatch, useSelector } from "react-redux"
import {useState,ChangeEvent,KeyboardEvent,useEffect, useCallback} from "react"
import styled from "styled-components"
import { AppDispatch, RootState } from "../store/store"
import { Chat, CHAT_CREATE_ACTION_TYPE, LIST_ALL_MESSAGES_ACTION_TYPE } from "../store/types"
import { getSender, isLastMessage, isSameSenderMargin } from "../utils/ChatLogic"
import { createAction } from "../utils/reducer.utils"
import ProfileModel from "./miscellaneous/ProfileModel"
import GroupDetailsUpdateModel from "./miscellaneous/GroupDetailsUpdateModel"
import Loader from "./Loader"
import {listMessages, sendMessage as mySendMessage} from "../store/actions/messageActions"
import { toast } from "react-toastify"
import ScrollableMessages from "./MyMessage"
import MyMessage from "./MyMessage"
import { isSameSender } from "../utils/ChatLogic"
import ScrollableFeed from "react-scrollable-feed"
import {Helmet} from "react-helmet"
import {io,Socket} from "socket.io-client"
import { Message } from "../store/types/message"

let selectedChatCompare:Chat;

const SingleChat=()=>{
    
    const dispatch=useDispatch<AppDispatch>();
    const {createdChat}=useSelector((state:RootState)=>state.chatCreate)
    const [profileModel,setProfileModel]=useState(false)
    const [gropDetailsUpdateModel,setGroupDetailsUpdateModel]=useState<boolean>(false);
    const [newMessage,setNewMessage]=useState("");
    const [socketConneted,setSocketConnected]=useState(false)

    const {userInfo}=useSelector((state:RootState)=>state.userLogin)
    const {messages,loading,error}=useSelector((state:RootState)=>state.listAllMessages)
    const {socket}=useSelector((state:RootState)=>state.createSocket)

    useEffect(()=>{
        // console.log(createSocket);
        if(!socket?.connected) return;
        socket!.emit("setup",userInfo)
        socket!.on("connection",()=>setSocketConnected(true))
    },[socket])

    useEffect(()=>{
        if(createdChat){
            dispatch(listMessages(createdChat._id))
            //emit
        }
        selectedChatCompare=createdChat!
    },[createdChat])

    useEffect(()=>{ 
        if(!socket?.connected) return;   
        socket!.on("message_received",(newMessageReceived:Message)=>{
            console.log("hello"); 
            
            if(!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
                //give notification
            }
            else{
                dispatch(createAction(LIST_ALL_MESSAGES_ACTION_TYPE.LIST_ALL_MESSAGES_UPEND,newMessageReceived))
            }
        })
    },[socket])

    if(!userInfo || userInfo === undefined || !createdChat || createdChat === undefined) {return(<div style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>Click on user to start chatting</div>)}
    
    const sender=getSender(userInfo!,createdChat?.users!)


    const typingHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setNewMessage(e.target.value)

        // Typing Indicator Logic
    }

    const sendMessage=(e:KeyboardEvent<HTMLInputElement>)=>{
        // console.log(socket);
        
        if(!socket?.connected)return;
        if(e.key==="Enter" && newMessage){
           dispatch(mySendMessage(newMessage,createdChat._id))
           //emit
           setNewMessage("")
        //    console.log(newMessage);
        }
    }

    return (
        <>
        <Container>
            {
                createdChat && (
                    <>
                        <First>

                            <BackArrow onClick={()=>dispatch(createAction(CHAT_CREATE_ACTION_TYPE.CHAT_CREATE_RESET))}>
                                <img src="/images/back_arrow.png" alt="" />
                            </BackArrow>
                            <Text>
                                {
                                    createdChat.isGroupChat ? createdChat.chatName : sender.name
                                }
                            <Profile onClick={()=>{
                                    createdChat.isGroupChat
                                    ?setGroupDetailsUpdateModel(!gropDetailsUpdateModel)
                                    :setProfileModel(!profileModel)
                            }}>
                                <img src="/images/eye.png" alt="" />
                                
                            </Profile>
                            </Text>
                            <span>
                            </span>
                        </First>
                        
                        <Second>
                            <MessageContainer>
                                <ScrollableFeed>
                            
                                {loading && <Loader style={{position:"absolute",top:"50%",left:"60%"}}/>}
                                {!messages
                                ?<>No Messages</>
                                :(
                                    // <>messages</>
                                   messages && messages.map((message,i)=>(
                                            
                                            <MineMessage key={message._id}>  
                                                {

                                                    (isSameSender(messages,message,i,userInfo._id) || 
                                                    isLastMessage(messages,i,userInfo._id)) && (
                                                        <>
                                                        <img src={message.sender.pic ?`/uploads/${message.sender.pic}` : `https://cdn-icons-png.flaticon.com/512/149/149071.png`}
                                                        style={{width:"30px",height:"30px",border:"1px solid black",display:"inline-block",marginRight:"10px",borderRadius:"50%"}}
                                                        alt="" />
                                                            <ToolTip>
                                                                {message.sender.name}
                                                            </ToolTip>
                                                        
                                                        </>
                                                        
                                                        )
                                                    }
                                                <MyMessage style={{marginLeft:isSameSenderMargin(messages,message,i,userInfo._id)}}  key={message._id} mymessage={message}/>

                                            </MineMessage>
                                                   
                                                   
                                                   
                                                   
                                    ))
                                    )
                                }
                                
                                </ScrollableFeed>
                            </MessageContainer>
                            <MessageInput>
                                <input type="text" onKeyDown={(e)=>sendMessage(e)} value={newMessage} onChange={(e)=>typingHandler(e)}/>
                                {/* <button onClick={sendMessage}>Send</button> */}
                            </MessageInput>
                        </Second>
                    </>
                ) 
            }
        </Container>
        <ProfileModel user={sender!} visible={profileModel} myOnClick={setProfileModel}/>
        <GroupDetailsUpdateModel visible={gropDetailsUpdateModel} myOnClick={setGroupDetailsUpdateModel}/>
        
        </>
    )
}

export default SingleChat

const ToolTip=styled.span`
    position: absolute;
    top: 38px;
    left: 28px;
    background-color: rgba(0,0,0,0.5);
    color:white;
    border-radius: 10px;
    border-top-left-radius: 0px;
    padding:6px 15px;
    opacity:0;
`

const MineMessage=styled.div` 
    /* min-height:max-content; */
    position: relative;
    display: flex;
    align-items: center;
    margin: 10px;
    /* border: 2px solid red; */
    /* flex-direction: column-reverse; */
    /* justify-content: center; */
    &:hover{
        ${ToolTip}:hover{
            opacity: 1;
        }
    }
    /* z-index: -1; */
`


    

const Container=styled.div `
    overflow:hidden;
    /* border:2px solid red; */
    padding: 0 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
`

const Text=styled.div`
display: flex;
align-items: center;
justify-content: space-between;
/* border: 2px solid red; */
`
const BackArrow=styled.button`
    width: 20px;
    background: transparent;
    border: none;
    img{
        width: 100%;
    }
`
const Profile=styled.button`
    background: transparent;
    border:none;
    margin-top: 3px;
    margin-left: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    img{
        width: 100%;
    }
`

const First=styled.div`
    margin-top: 10px;
    /* border:2px solid red; */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    /* padding:0 10px; */
    `
const Second=styled.div`
    width: 100%;
    margin: 10px 40px;
    border-radius: 10px;
    overflow:hidden;
    /* border:2px solid red; */
    background-color: #e9e7e9;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* width */

`

const MessageContainer=styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    padding: 10px;
    padding-right: 0%;
    /* border:2px solid red; */
    &>div{

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
}

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

const MessageInput=styled.div`
    margin-bottom: 10px;
    width: 97%;
    display: flex;
    justify-content: space-between;

    /* border:2px solid red; */
    input{
        width: 100%;
        height: 40px;
        border-radius: 10px;
        border:1px solid black;
        outline: none;
        padding: 14px;
        font-size: 18px;
        /* flex: 8; */
    }
   
`
