import {useEffect} from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import styled from "styled-components"
import MyChats from "../components/MyChats"
import ChatBox from "../components/ChatBox"
import SideDrawar from "../components/miscellaneous/SideDrawer"
import { useNavigate } from "react-router-dom"

const Chat=()=>{

    const navigate=useNavigate();
    const {userInfo}=useSelector((state:RootState)=>state.userLogin)

    useEffect(()=>{
        if(!userInfo){
            navigate("/")
        }
    })

    return (
            <div style={{width:"100%"}}>
                <SideDrawar/>
                
                <Box>
                    <MyChats/>
                    <ChatBox/>

                </Box>
            </div>
    )
}

export default Chat

const Box=styled.div`
    
`