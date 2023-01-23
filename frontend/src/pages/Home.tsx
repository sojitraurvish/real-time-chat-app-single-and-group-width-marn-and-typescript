import styled from "styled-components"
import {useState} from "react"
import Login from "../components/authentication/Login";
import SignUp from "../components/authentication/SignUp";

const Home=()=>{

    const [changeForm,setChangeForm]=useState<boolean>(true);

    return (
        <Container>
            <BgImg/>
            <InnerContainer>
                <HeadingText>
                    Chatter
                </HeadingText>
                <MyForm>
                    <CBtn>
                            <button className={changeForm==true ? "active" : ""} disabled={changeForm} onClick={(e)=>{setChangeForm(!changeForm)}}>Login</button>
                            <button className={!changeForm==true ? "active" : ""} disabled={!changeForm} onClick={(e)=>{setChangeForm(!changeForm)}}>Sign Up</button>
                    </CBtn>
                    <RealForm>
                        <Login visible={changeForm}/>
                        <SignUp visible={changeForm}/>
                    </RealForm>
                </MyForm>
            </InnerContainer>
        </Container>
    )
}

export default Home

const Container=styled.div`
    /* border: 2px solid red; */
    min-height: 100vh;
    max-width: 100%;
    /* display: flex; */
    /* flex-direction: column; */
    /* align-items: center; */
    /* justify-content: center; */
    /* display:block; */
    width: 540px;
    margin:auto;
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

const InnerContainer=styled.div`
    /* margin: auto; */
    /* border:2px solid red; */
    max-width: 540px;
    width: 100%;
    /* margin-top:20px; */
    position: absolute;
    top:13px;
    bottom:70px;
`

const HeadingText=styled.div`
    width: 100%;
    background-color: white;
    padding: 20px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9px;
    font-size: 30px;
    font-weight:bold;
    letter-spacing: 3px;
`


const MyForm=styled(HeadingText)`
    margin-top: 10px;
    font-weight: normal;
    font-size: 20px;
    letter-spacing: initial;
    display: flex;
    flex-direction: column;
    padding:25px;
`

const CBtn=styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    /* border:2px solid red; */
    width: 100%;
    
    button{
        height:40px;
        width: 100%;
        padding:8px;
        border-radius: 50px;
        margin:0 7px;
        background:transparent;
        background-color: #3daf7e;
        border:none;
        font-weight:600;
        &:hover{
            background-color: #aeccbf;
        }
    }

    .active{
        background-color: #747675;
        color:black;
    }

`

const RealForm=styled.div`

    width:100%;
    margin-top:20px;
`