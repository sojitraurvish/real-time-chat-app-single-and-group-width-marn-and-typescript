import styled from "styled-components"
import {Dispatch,FC, MouseEvent, useState,useEffect} from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { listSearchUsers } from "../../store/actions/userActions"
import UserSearchListItem from "../User/UserSearchListItem"
import { createAction } from "../../utils/reducer.utils"
import { USER_SEARCH_LIST_ACTION_TYPE } from "../../store/types"
import ChatLoading from "../ChatLoading"
import { chatCreate } from "../../store/actions/chatActions"
import Loader from "../Loader"

export type Props={
    show:boolean,
    set:Dispatch<React.SetStateAction<boolean>>
}


const LeftSideSearchDrower:FC<Props>=({show,set})=>{

    const dispatch=useDispatch<AppDispatch>();
    const {userList,loading,error}=useSelector((state:RootState)=>state.userSearchList)
    const {createdChat,loading:chatLoading,error:chatError}=useSelector((state:RootState)=>state.chatCreate)

    const [searchText,setSearchText]=useState("")

    const handleSearch=(e:MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()

        if(!searchText || searchText===""){
            toast.error("Please Enter something in search!...")
            return;
        }

        dispatch(listSearchUsers(searchText))
    }

    useEffect(()=>{
        if(createdChat){
            dispatch(createAction(
                USER_SEARCH_LIST_ACTION_TYPE.USER_SEARCH_LIST_RESET
            ))
            setSearchText("")
            set(false)
        }
    },[createdChat])

    const accessChat=(userid:string)=>{
        // if(!chatLoading){
            dispatch(chatCreate(userid))
        // }
    }

    return (
        <Container show={show}>
            <Content show={show}>
                <First>
                    <h3>Search Users</h3>
                    <button onClick={()=>{
                        dispatch(createAction(
                            USER_SEARCH_LIST_ACTION_TYPE.USER_SEARCH_LIST_RESET
                        ))
                        setSearchText("")
                        return set(!show)
                    }}>
                        <img src="/images/wrong.png" alt="" />

                    </button>
                </First>
                <Second>
                    <input type="search" value={searchText} onChange={(e)=>setSearchText(e.target.value)} />
                    <button onClick={(e)=>handleSearch(e)}>Go</button>
                </Second>
                <Third>
                    {
                        loading ? <ChatLoading/> : error ? toast.error(`${error}`) :
                        userList?.map((user)=>(
                            <UserSearchListItem
                            key={user._id}
                            user={user}
                            accessChat={()=>accessChat(user._id)}
                            />
                            ))
                    }
                    { !userList?.length && <>Not Found...</>}
                    { chatLoading ? <Loader/> : error ? toast.error(`${error}`) : <></>}
                </Third>
            </Content>
        </Container>
    )
}

export default LeftSideSearchDrower

const Container=styled.div<{show:boolean}>`
    background-color: rgba(0,0,0,0.6);
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1;
    display: ${(props)=>{
        return props.show ? "initial" : "none" ;
    }};
`

const Content=styled.div<{show:boolean}>`
    background-color: white;
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    /* padding: 0 30px; */
    transition:all 2s ease-in 5s;
    transform:${(props)=> props.show ? "translateX(0%)" : "translateX(100%)"};
`
const First=styled.div`
    padding: 0 30px;
    width: 100%;
    position: relative;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    h3{
        /* display: flex; */
        align-items: center;
        justify-content: center;
        width: 100%;
        /* border: 2px solid red; */
        margin:18px 0px;
        /* padding-left: 12px; */
    }
    button{
        position: absolute;
        right: 15px;
        top:15px;
        border: none;
        background-color: transparent;
        img{
            width: 12px;
            &:hover{
                width: 13px;
                cursor: pointer;
                
            }
            /* position: absolute; */
        }
    }
`
const Second=styled.div`
padding: 0 30px;
    margin-top: 10px;
    width: 100%;
    /* border: 2px solid red; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 35px;
    input{
        border-radius: 5px;
        height: 100%;
        /* width: 100%; */
        /* flex: 4; */
        width: 79%;
        padding: 10px;
        font-size: 20px;
        border:1px solid blue;
        outline: none;
        &:hover{
            /* cursor: pointer; */
            outline:2px solid rgba(0,0,0,0.4);
        }
    }
    button{
        height: 100%;
        /* flex: 1; */
        border-radius: 5px;
        width: 20%;
        font-size: 22px;
        font-weight: 600;
        border: none;
        &:hover{
            cursor: pointer;
            outline:2px solid rgba(0,0,0,0.4);
        }
    }
`
const Third=styled.div`
    margin-top:18px;
    /* border: 2px solid red; */
    overflow-y: auto;
    height: 100%;
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