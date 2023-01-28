import { FC,CSSProperties } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { RootState } from "../store/store"
import { Message } from "../store/types/message"
import { isSameSenderMargin } from "../utils/ChatLogic"

export type Props={
    mymessage:Message,
    style:CSSProperties
}


const MyMessage:FC<Props>=({mymessage,style})=>{
    const {userInfo}=useSelector((state:RootState)=>state.userLogin)
    return (
        <Container style={style} isSender={mymessage.sender._id===userInfo?._id}>{mymessage.content}</Container>
    )
}

export default MyMessage

const Container=styled.div<{isSender:boolean}>`
    margin: 5px 0;
    padding: 8px;

    /* margin: 0 15px; */
    /* border: 2px solid red; */
    /* width: 50px; */
    text-align: justify;
    word-wrap: break-word;
    max-width: 500px;
    min-width: 10px;
    border-radius: 15px;
    /* display: inline; */
    background-color: ${(props)=>{
        return props.isSender ? "#a7e89c" : "#ffffff"
    }};
    border-top-left-radius: ${(props)=>{
        return !props.isSender ? "0px" : ""
    }};
    border-bottom-right-radius: ${(props)=>{
        return props.isSender ? "0px" : ""
    }};
    /* background-color: white; */
    
`