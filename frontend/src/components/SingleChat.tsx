import { useDispatch, useSelector } from "react-redux"
import {useState,ChangeEvent,KeyboardEvent,useEffect} from "react"
import styled from "styled-components"
import { AppDispatch, RootState } from "../store/store"
import { CHAT_CREATE_ACTION_TYPE } from "../store/types"
import { getSender } from "../utils/ChatLogic"
import { createAction } from "../utils/reducer.utils"
import ProfileModel from "./miscellaneous/ProfileModel"
import GroupDetailsUpdateModel from "./miscellaneous/GroupDetailsUpdateModel"
import Loader from "./Loader"
import {listMessages, sendMessage as mySendMessage} from "../store/actions/messageActions"
import { toast } from "react-toastify"
import ScrollableMessages from "./MyMessage"
import Message from "./MyMessage"
import MyMessage from "./MyMessage"


const SingleChat=()=>{
    
    const dispatch=useDispatch<AppDispatch>();
    const {createdChat}=useSelector((state:RootState)=>state.chatCreate)
    const [profileModel,setProfileModel]=useState(false)
    const [gropDetailsUpdateModel,setGroupDetailsUpdateModel]=useState<boolean>(false);
    const [newMessage,setNewMessage]=useState("");

    const {userInfo}=useSelector((state:RootState)=>state.userLogin)
    const {messages,loading,error}=useSelector((state:RootState)=>state.listAllMessages)

    useEffect(()=>{
        if(createdChat){
            dispatch(listMessages(createdChat._id))
        }
    },[createdChat])

    if(!userInfo || userInfo === undefined || !createdChat || createdChat === undefined) {return(<div style={{height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>Click on user to start chatting</div>)}
    
    const sender=getSender(userInfo!,createdChat?.users!)


    const typingHandler=(e:ChangeEvent<HTMLInputElement>)=>{
        setNewMessage(e.target.value)

        // Typing Indicator Logic
    }

    const sendMessage=(e:KeyboardEvent<HTMLInputElement>)=>{
        if(e.key==="Enter" && newMessage){
           dispatch(mySendMessage(newMessage,createdChat._id))
           setNewMessage("")
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
                                {loading && <Loader style={{position:"absolute",top:"50%",left:"60%"}}/>}
                                {!messages
                                ?<>No Messages</>
                                :(
                                    // <>messages</>
                                    messages.map((message)=>(
                                        <MyMessage key={message._id} mymessage={message}/>
                                    ))
                                )
                                }
                                
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
    display: flex;
    flex-direction: column;

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
