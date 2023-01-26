import { useEffect } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components";
import { chatList } from "../store/actions/chatActions";
import { AppDispatch } from "../store/store"
import SingleChat from "./SingleChat";

const MyChats=()=>{

    return (
        <Container>
            <SingleChat/>
        </Container>
    )
}

export default MyChats

const Container=styled.div`
    width: 70%;
    /* border:2px solid red;    */
    background-color: white;
    height: 98%;
    border-radius: 10px;
    overflow: auto;
`