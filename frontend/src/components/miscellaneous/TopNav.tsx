import styled from "styled-components"
import TopNevDropDown from "./TopNevDropDown"
import { Container } from "./TopNevDropDown"
import {MouseEvent, useEffect, useState} from "react"
import ProfileModel from "./ProfileModel"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { logout } from "../../store/actions/userActions"
import { useNavigate } from "react-router-dom"
const TopNav=()=>{

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
                    <button>
                        <img src="/images/search.png" alt="" />
                        <span>Search User</span>
                    </button>
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
                            <img src="https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png" alt="" />
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
    max-width: 1600px;
    margin:0 auto;
    border-width: 7px;
    height: 60px;
    background-color: white;
`

const SearchBtn=styled.div`
    height: 100%;
    width: 100%;
    /* border:2px solid red; */
    display: flex;
    align-items: center;
    justify-content:flex-start;
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
        }
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
                    
        
            margin-right: 35px;
            /* border:2px solid red; */
            width: 30%;
            display:  flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;
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
        div{
           
                /* border: 1px solid rgba(0,0,0,0.3); */
               
                background-color:rgba(0,0,0,0.1) ;
                border-radius: 10px;
                width: 70%;
                display:  flex;
                align-items: center;
                justify-content: space-around;
                position: relative;
                
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
    }
`