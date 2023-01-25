import styled from "styled-components"
import TopNevDropDown from "./TopNevDropDown"
import { Container } from "./TopNevDropDown"
import {MouseEvent, useEffect, useState,Dispatch,FC} from "react"
import ProfileModel from "./ProfileModel"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { logout } from "../../store/actions/userActions"
import { useNavigate } from "react-router-dom"

export type Props={
    show:boolean
    set:Dispatch<React.SetStateAction<boolean>>
}

const TopNav:FC<Props>=({show,set})=>{

    const dispatch=useDispatch<AppDispatch>()
    const navigate=useNavigate();

    const {userInfo}=useSelector((state:RootState)=>state.userLogin)

    const [profileModel,setProfileModel]=useState(false)

    const onLogout=(e:MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        dispatch(logout());
    }

    return (
        <>
            <TContainer>
                <SearchBtn>
                    <button onClick={()=>set(!show)}>
                        <img src="/images/search.png" alt="" />
                        <span>Search User</span>
                    </button>
                    <ToolTip>Search User to chat</ToolTip>
                </SearchBtn>
                <MainContent>
                    <img src="/images/app-icon.png" alt="" />
                    <span>Chatter</span>
                </MainContent>
                <RightSide>
                    <div>
                        <button>
                            <img src="/images/bell.png" alt="" />
                        </button>
                        <div style={{position:"relative"}}>
                            <img src={!userInfo?.pic ? `https://cdn-icons-png.flaticon.com/512/149/149071.png` : `/uploads/${userInfo.pic}`} alt="" />
                            <img src="/images/downarrow.png" alt="" />
                            <TopNevDropDown style={{top:"53px",right:"-37px"}}>
                                <button onClick={()=>setProfileModel(!profileModel)}>Profile</button>
                                <button onClick={(e)=>onLogout(e)}>Logout</button>
                            </TopNevDropDown>
                        </div>
                    </div>
                        
                </RightSide>
            </TContainer>
            <ProfileModel user={userInfo!} visible={profileModel} myOnClick={setProfileModel}/>
        </>
    )
}

export default TopNav

const TContainer=styled.div`

    border:2px solid #e9e7e9;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    /* max-width: 1600px; */
    margin:0 auto;
    border-width: 7px;
    height: 60px;
    background-color: white;
`

const ToolTip=styled.span`
    /* border: 2px solid red; */
    position: absolute;
    top:35px;
    left: 80px;
    font-size: 15px;
    background-color: rgba(0,0,0,0.5);
    color:white;
    padding: 1px 5px;
    letter-spacing: 1px;
    border-radius: 5px;
    opacity: 0;
`

const SearchBtn=styled.div`
    height: 100%;
    width: 100%;
    /* border:2px solid red; */
    display: flex;
    align-items: center;
    justify-content:flex-start;
    position: relative;
    button{
        background-color: transparent;
        width:40%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        height: 100%;
        border: none;
        img{
            width: 20px;
            
        }
        span{
            font-size: 19px;
        }
        &:hover{
            outline:1px solid rgba(0,0,0,0.2);
            cursor: pointer;
            border-radius: 10px;
        }
    }
    &:hover ${ToolTip}{
        opacity: 1;
    }
`

const MainContent=styled.div`
     height: 100%;
     width: 100%;
     display:  flex;
     align-items: center;
     justify-content: center;
    img{
        width: 50px;
        animation-name: animateDown;
        animation-iteration-count: infinite;
        animation-duration:1.5s;
    }
    span{

    }
`

const RightSide=styled.div`
    /* border:2px solid red; */
    height: 100%;
    width: 100%;
    display:  flex;
    align-items: center;
    justify-content: flex-end;
    transition: all 2s ease 0s;
    
   

    &>div{  
        /* border:2px solid red; */
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-right: 35px;
        width: 30%;
        &>div{

            /* border:2px solid red; */
            display:  flex;
            align-items: center;
            justify-content: space-between;
            height: 36px;
            background-color:rgba(0,0,0,0.1) ;
            border-radius: 10px;
            width: 60%;
            display:  flex;
            align-items: center;
            justify-content: space-around;
            position: relative;
            /* border:2px solid red; */
            img{
                width: 30px;
                &:first-child{
                border-radius: 50px;
                }
                &:nth-child(2){
                width: 15px;
                }
            }
            &:hover{
                /* border: 2px solid red; */
                outline:2px solid rgba(0,0,0,0.3);
                ${Container} {
                    opacity: 1;
                }
            } 
        }
        &>button{
            background-color: transparent;
            border: none;
            height: 82%;
            img{
            }
            &:first-child{
                img{
                    width: 25px;
    
                }
            }
        }
    }
`