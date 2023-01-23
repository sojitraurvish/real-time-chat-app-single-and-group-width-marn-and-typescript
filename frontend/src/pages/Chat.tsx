import {useEffect} from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import styled from "styled-components"
import MyChats from "../components/MyChats"
import ChatBox from "../components/ChatBox"
import TopNav from "../components/miscellaneous/TopNav"
import { useNavigate } from "react-router-dom"

const Chat=()=>{

    const navigate=useNavigate();
    const {userInfo}=useSelector((state:RootState)=>state.userLogin)

    useEffect(()=>{
        if(!userInfo){
            navigate("/")
        }
    },[userInfo])

    return (
            <Container style={{width:"100%"}}>
                <BgImg/>
                <TopNav/>
                <Box>
                    <MyChats/>
                    <ChatBox/>
                </Box>
            </Container>
    )
}

export default Chat

const Container=styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid red;
    height:100vh;
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
    
`