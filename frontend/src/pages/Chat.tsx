import {useEffect,useState} from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import styled from "styled-components"
import MyChats from "../components/MyChats"
import ChatBox from "../components/ChatBox"
import TopNav from "../components/miscellaneous/TopNav"
import { useNavigate } from "react-router-dom"
import LeftSideSearchDrower from "../components/miscellaneous/LeftSideSearchDrower"
import { chatList } from "../store/actions/chatActions"

const Chat=()=>{

    const [leftDrower,setLeftDrower]=useState(false);

    const navigate=useNavigate();
    const {userInfo}=useSelector((state:RootState)=>state.userLogin)

    const {chatList:myChatList}=useSelector((state:RootState)=>state.chatList)
    const {updatedNameOfGroup}=useSelector((state:RootState)=>state.groupNameUpdate)
    const {addedUserToGroup}=useSelector((state:RootState)=>state.addUserToGroup)
    const {deletedUserToGroup}=useSelector((state:RootState)=>state.deleteUserToGroup)

    const dispatch=useDispatch<AppDispatch>();

    useEffect(()=>{
        // if(!myChatList){
            dispatch(chatList())
        // }
    },[updatedNameOfGroup,addedUserToGroup,deletedUserToGroup])

    useEffect(()=>{
        if(!userInfo){
            navigate("/")
        }
    },[userInfo])

    return (
            <>
                <BgImg/>
            
            <Container>
                <LeftSideSearchDrower show={leftDrower} set={setLeftDrower}/>
                <TopNav show={leftDrower} set={setLeftDrower}/>
                <Box>
                    <MyChats/>
                    <ChatBox/>
                </Box>
            </Container>
            </>
    )
}

export default Chat

const Container=styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /* border: 1px solid red; */
    height:96vh;
    width:100%;
    max-width:1600px;

    @media only screen and (max-width:1366px) {
        height:100vh;
    }
    /* margin: auto; */
 /* overflow: hidden; */
`

const BgImg=styled.div`
    background-image: url("/images/login-bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    min-height: 100%;
    z-index: -1;
`

const Box=styled.div`
    /* border:5px solid red; */
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
`