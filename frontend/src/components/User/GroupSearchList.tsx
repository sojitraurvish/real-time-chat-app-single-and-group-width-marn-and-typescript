import { User } from "../../store/types"
import {FC} from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import Loader from "../Loader"
import { toast } from "react-toastify"

export type Props={
    user:User,
    accessChat:(user:User)=>void
}

const GroupSearchList:FC<Props>=({user,accessChat})=>{

    
    return (
            
        <Container onClick={()=>accessChat(user)}>
            <First>
                <img src={!user.pic ? `https://cdn-icons-png.flaticon.com/512/149/149071.png` : `/uploads/${user.pic}` } alt="" />
            </First>
            <Second>
                <div>{user.name}</div>
                <div><span>Email : </span>{user.email}</div>
            </Second>
        </Container>
    )
}

export default GroupSearchList

const Container=styled.button`
    margin-top: 0px;
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