import { FC,useState,ChangeEvent, MouseEvent, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import styled from "styled-components"
import { login } from "../../store/actions/userActions"
import { AppDispatch } from "../../store/store"
import { ReduxState } from "../../store/types"
import Loader from "../Loader"

export type Props={
    visible:boolean
}

const Login:FC<Props>=({visible})=>{

    const [showPassword,setShowPassword]=useState(false);
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })
    const {email,password}=formData

    const resetFormData=()=>{
        setFormData({email:"",password:""})
    }

    const navigate=useNavigate();
    const dispatch=useDispatch<AppDispatch>();

    const {loading,userInfo,error}=useSelector((state:ReduxState)=>state.userLogin)

    useEffect(()=>{
        if(userInfo){
            // console.log("signup");
            toast.success("Login Successfully!...");
            resetFormData()
            navigate("/chats")
        }
    },[userInfo])

    const onChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;

        setFormData((prevState)=>({
            ...prevState,
            [name]:value
        }))
    }

    
    
    const submitHandler=(e:MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if (!password || !email) {
            toast.error("Please Fill all the Feilds");
            return;
        }

        dispatch(login(email,password));
          
    }

    return(
        <Container visible={visible}>
            {error && toast.error(`${error as Error}`)}
            {loading && <Loader style={{
                position:"absolute",
                left:"38%",
                right:"50%",
                top:"222px",
                zIndex:"999999"
                
            }}/>}
            <Content>
                <div>
                    <span>Email Address: <MyError visible={email}>*</MyError></span>
                    <input type="email" name="email" value={email} onChange={(e)=>onChange(e)} placeholder="Enter Email Address"/>
                </div>
                <div>
                    <span>Email Password: <MyError visible={password}>*</MyError></span>
                    <input type={showPassword==true ? "text" : "password"} name="password" value={password} onChange={(e)=>onChange(e)} placeholder="Enter Password"/>
                    <button onClick={(e)=>setShowPassword(!showPassword)}>{showPassword? "hide" : "show"}</button>
                </div>
                <button onClick={(e)=>submitHandler(e)} disabled={(email==="" && password==="") ? true : false} >Login</button>
                <button onClick={(e:MouseEvent<HTMLButtonElement>)=>{
                    e.preventDefault();
                    setFormData({email:"guest@example.com",password:"123456"})
                }}>Get Guest User Credentials</button>
            </Content>
        </Container>
    )
}

export default Login

const Container=styled.div`
    display:${(props:{visible:boolean})=>{
        return props.visible ? "initial" : "none";
    }};
    
`
const Content=styled.div`
    margin:10px;
    /* border: 2px solid red; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    div{
        margin-top:10px;
        &:first-child{
            /* border:2px solid red; */
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            span{
                font-size: 15px;
                font-weight: 600;
            }
            input{
                margin-top: 5px;
                width: 100%;
                height: 37px;
                padding: 10px;
            }
        }
        &:nth-child(2){
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            position: relative;
            span{
                font-size: 15px;
                font-weight: 600;
            }
            input{
                margin-top: 5px;
                width: 100%;
                height: 37px;
                padding: 10px;
            }
            button{
                position: absolute;
                top:25px;
                right: 2px;
                height: 32px;
                width: 50px;
                border: none;
                font-weight: 600;
                border-radius: 8px;
                &:hover{
                    cursor: pointer;
                    background-color: rgba(0,0,0,0.2);
                }
            }
        }
    }

    & > button{
        margin-top:10px;
        width: 100%;
        height: 37px;
        border:none;
        border-radius: 10px;
        color:white;
        font-weight: 600;
        letter-spacing: 1px;
        &:nth-child(3){
            margin-top:15px;
            background-color: #3282ce;
            &:hover{
                background-color: #81a3c3; 
                cursor: pointer;
            }
        }
        &:nth-child(4){
            background-color: #dd3c3d;
            &:hover{
                background-color: #db8989; 
                cursor: pointer;
            }
        }
    }
`

const MyError=styled.span`
    display:${(props:{visible:string})=>{
        return props.visible === "" ? "initial" : "none";
    }};
    color: red;
`