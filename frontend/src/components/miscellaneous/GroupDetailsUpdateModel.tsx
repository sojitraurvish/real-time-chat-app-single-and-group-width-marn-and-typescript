import { FC,Dispatch, useState, ChangeEvent,useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled, { CSSProperties } from "styled-components";
import { deleteUserToGroup, groupChatCreate } from "../../store/actions/chatActions";
import { listSearchUsers } from "../../store/actions/userActions";
import { AppDispatch, RootState } from "../../store/store";
import { User, UserWithToken, USER_SEARCH_LIST_ACTION_TYPE } from "../../store/types";
import { createAction } from "../../utils/reducer.utils";
import ChatLoading from "../ChatLoading";
import GroupSearchList from "../User/GroupSearchList";
import UserListForAddToGroup from "../User/UserListForAddToGroup";
import {groupNameUpdate as myGroupNameUpdate} from "../../store/actions/chatActions"
import {addUserToGroup as myAddUserToGroup} from "../../store/actions/chatActions"
import { listMessages } from "../../store/actions/messageActions";

export type Props={
    children?:string | JSX.Element | JSX.Element[];
    style?:CSSProperties;
    visible:boolean;
    myOnClick:Dispatch<React.SetStateAction<boolean>>
}

const GroupDetailsUpdateModel:FC<Props>=({visible,style,children,myOnClick})=>{

    const dispatch=useDispatch<AppDispatch>()

    const [groupChatName,setGroupChatName]=useState("")
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    
    const {userInfo}=useSelector((state:RootState)=>state.userLogin)
    const {userList,error,loading}=useSelector((state:RootState)=>state.userSearchList)
    const {createdGroupChat,error:gropChatCreateError,loading:gropChatCreateLoading}=useSelector((state:RootState)=>state.groupChatCreate)
    const {createdChat}=useSelector((state:RootState)=>state.chatCreate)

    const [search,setSearch]=useState("")

    useEffect(()=>{
        setSelectedUsers(createdChat!.users)
        if(createdGroupChat)
        {
            setGroupChatName("");
            setSelectedUsers([]);
            myOnClick(!visible)
        }
    },[createdGroupChat,createdChat])

    const handleSearch=async(e:ChangeEvent<HTMLInputElement>)=>{
        setSearch(e.target.value)
        if(e.target.value===""){
            dispatch(createAction(USER_SEARCH_LIST_ACTION_TYPE.USER_SEARCH_LIST_RESET))
            return;
        }
        dispatch(listSearchUsers(search))
    }   

    const addUserToGroup=(user:User)=>{


        if(selectedUsers.find((u)=>u._id===user._id)){
            toast.info("User Already added...")
            return
        }
        if(createdChat?.groupAdmin._id !== userInfo?._id){
            toast.error("Only Group admin can add users")
            return;
        }
        
        dispatch(myAddUserToGroup(createdChat!._id,user._id))
        // setSelectedUsers([...selectedUsers,user])
        dispatch(createAction(USER_SEARCH_LIST_ACTION_TYPE.USER_SEARCH_LIST_RESET))
        setSearch("")


    }
    
    const deleteUser=(user:User)=>{

        if(createdChat?.groupAdmin._id !== userInfo?._id){
            toast.error("Only Group admin can remove users")
            return;
        }
        
        dispatch(deleteUserToGroup(createdChat!._id,user._id))
        if(createdChat){

            dispatch(listMessages(createdChat?._id))
        }
        // setSelectedUsers(selectedUsers.filter((u)=>(u._id!==user._id)))
    }

    const leaveUser=(user:UserWithToken)=>{

        // if(createdChat?.groupAdmin._id !== userInfo?._id){
        //     toast.error("Only Group admin can remove users")
        //     return;
        // }
        
        dispatch(deleteUserToGroup(createdChat!._id,user._id))
        myOnClick(!visible)
        // setSelectedUsers(selectedUsers.filter((u)=>(u._id!==user._id)))
    }

    // const handleSubmit=()=>{      
    //     if (!groupChatName || !selectedUsers) {
    //         toast.error("Please fill all the feilds")
    //         return;
    //     }
      
    //     if(selectedUsers.length<2){
    //         toast.error("Group must have at list 2 people...");
    //         return;
    //     }
    //     dispatch(groupChatCreate(groupChatName,selectedUsers))
    // }

    const groupNameUpdate=()=>{
        if (!groupChatName) {
            toast.error("Please fill group name...")
            return;
        }
        if(createdChat?.groupAdmin._id !== userInfo?._id){
            toast.error("Only Group admin can change the group name")
            return;
        }
        dispatch(myGroupNameUpdate(createdChat!._id,groupChatName))
    }

    return (
        <Container visible={visible} style={style}>
            {
                children ? (
                    <span>{children}</span>
                ):(
                    <Content>
                        <button onClick={()=>myOnClick(!visible)}>
                            <img src="/images/wrong.png" alt="" />
                        </button>
                        
                        <InnerContent>
                            <Header>{createdChat?.chatName}</Header>
                            
                            <First>
                                <input type="text" value={groupChatName} onChange={(e)=>setGroupChatName(e.target.value)} placeholder="Chat Name"/>
                                <button onClick={()=>groupNameUpdate()}>Update</button>
                            </First> 
                            <Second>
                                <input type="search" value={search} onChange={(e)=>handleSearch(e)} placeholder="Add User eg: John, Piyush, Jane"/>
                            </Second>
                            <All>
                                <div>
                                    {
                                        selectedUsers.map((user)=>(
                                            user._id!==userInfo?._id &&
                                            <UserListForAddToGroup key={user._id} user={user} deleteUser={deleteUser}/>
                                        ))
                                    }
                                    
                                </div>
                                <MyGroupSearchList>
                            
                                    {
                                        loading ? <ChatLoading/> : error ? toast.error(`${error}`) :
                                        userList?.map((user)=>(
                                            <GroupSearchList
                                                key={user._id}
                                                user={user}
                                                accessChat={()=>addUserToGroup(user)}
                                            />
                                            ))
                                    }
                                    { !userList?.length && <>Not Found...</>}
                                
                                </MyGroupSearchList>
                            </All>

                        </InnerContent>
                        <button onClick={()=>leaveUser(userInfo!)}>Leave Group</button>
                        {/* onClick={()=>handleSubmit()} */}
                    </Content>
                )
            }
        </Container>
    )
}

export default GroupDetailsUpdateModel

const Container=styled.div`
    overflow: hidden;
    position: absolute;
    top:0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.6);
    border: none;
    outline: none;
    margin: auto;
    display: ${(props:{visible:boolean})=>{
        return props.visible ? "flex" : "none";
    }};
    align-items: center;
    flex-direction: column;
    justify-content: center;
`
const Content=styled.div`
    background-color: white;
    max-width: 500px;
    height:500px;
    /* height: 100%; */
    width: 100%;
    margin: auto;
    position: relative;
    border-radius: 15px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content:flex-start;
    overflow: hidden;
    padding: 20px;
    /* width: 100%; */
    /* border: 2px solid red; */
    &>button{
        img{
            margin: 15px;
            &:nth-child(1){
                /* border: 2px solid red; */
                position: absolute;
                width: 10px;
                top:15px;
                right: 15px;
            }
        }
        &:nth-child(3){
            margin-top: 10px;
            border: 1px solid black;
            height: 40px;
            padding: 4px;
            width: 110px;
            border-radius: 5px;
            margin-left: auto;
            background-color: #2c78bf;
            color: white;
            font-weight: bold;
            font-size: 14px;
            &:hover{
                background-color: #a2b3c5;
                cursor:pointer;
            }
        }
    }
`

const InnerContent=styled.div`
    overflow: hidden;
    width: 100%;
    height: 100%;
    display:  flex;
    flex-direction: column;
    align-items: center;
    /* border:2px solid red; */
`

const Header=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    /* border:2px solid red; */
    width: 100%;
`
const First=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    /* border:2px solid red; */
    margin-top: 10px;
    width: 100%;
    input{
        border-radius: 5px;
        /* outline:1px solid black; */
        border: none;
        outline: none;
        width:100%;
        height: 40px;
        padding-left: 20px;
        &:focus{
            border: 2px solid #2c78bf;
        }
    }
    button{
        /* margin-top: 10px; */
            border: 1px solid black;
            height: 40px;
            padding: 4px;
            width: 110px;
            border-radius: 5px;
            margin-left: auto;
            background-color: #2c78bf;
            color: white;
            font-weight: bold;
            font-size: 14px;
            &:hover{
                background-color: #a2b3c5;
                cursor:pointer;
            }
    }
`

const Second=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    /* border:2px solid red; */
    width: 100%;
    input{
        border-radius: 5px;
        /* outline:1px solid black; */
        border:none;
        outline: none;
        width:100%;
        height: 40px;
        padding-left: 20px;
        padding-right: 20px;
        
        &:focus{
            border: 2px solid #2c78bf;
        }
    }
    

`

const All=styled.div`
margin-top: 10px;
overflow-y: auto;
/* border: 2px solid red; */
padding: 5px 8px;
overflow-x: hidden;
overflow-y: auto;
width: 100%;
    div:first-child{
        /* display:flex; */
        /* flex-direction: column; */
        /* align-items: center; */
        /* justify-content: center; */
        &>span{
            /* border:2px solid red; */
            color: white;
            background-color: red;
            border-radius: 10px;
            padding: 3px 8px;
            display: inline-block;
            margin: 4px;
            white-space: normal;
            font-size: 15px;
            text-align: center;
            button{
                margin-left: 5px;
                border: none;
                background-color: transparent;
                color: white;
                width: 10px;
                &:hover{
                    cursor: pointer;
                    color: white;
                }
            }
            
            /* align-items: center; */
            /* display: flex; */
            /* flex-direction: row; */
            /* align-items: center; */
            /* justify-content: center; */
        }
    }

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

const MyGroupSearchList=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`