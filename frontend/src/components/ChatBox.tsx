import { useEffect } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components";
import { chatList } from "../store/actions/chatActions";
import { AppDispatch } from "../store/store"

const MyChats=()=>{

    const dispatch=useDispatch<AppDispatch>();

    useEffect(()=>{
        dispatch(chatList())
    },[])

    return (
        <Container>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
            <div>fdsfsfsddsfsdfds</div>
        </Container>
    )
}

export default MyChats

const Container=styled.div`
    width: 69%;
    border:2px solid red;   
    background-color: white;
    height: 98%;
    border-radius: 10px;
    overflow: auto;
`