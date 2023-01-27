import axios from "axios"
import { FC,useState,ChangeEvent, MouseEventHandler, MouseEvent,useEffect } from "react"
import styled from "styled-components"
import {toast} from "react-toastify"
import Loader from "../Loader"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../../store/store"
import { ReduxState } from "../../store/types"
import { register } from "../../store/actions/userActions"
import { useNavigate } from "react-router-dom"

export type Props={
    visible:boolean
}

const SignUp:FC<Props>=({visible})=>{

    const [imageUploading,setImageUploading]=useState(false);
    const [showPassword,setShowPassword]=useState(false);
    const [showConfirmPassword,setShowConfirmPassword]=useState(false);
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        pic:""
    })
    const {name,email,password,confirmPassword,pic}=formData

    const navigate=useNavigate();
    const dispatch=useDispatch<AppDispatch>();

    const {loading,userInfo,error}=useSelector((state:ReduxState)=>state.userRegister)
    // const {loading:loadingRegister,userInfo:userInfoRegister,error:errorRegister}=useSelector((state:ReduxState)=>state.userRegister)

    const resetFormData=()=>{
        setFormData({name:"",
        email:"",
        password:"",
        confirmPassword:"",
        pic:""})
    }

    useEffect(()=>{
        if(userInfo){
            // console.log("signup");
            
            toast.success("Register Successfully!...");
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
    
    const handleChange=async(e:ChangeEvent<HTMLInputElement>):Promise<void>=>{
        //reset old url
        setFormData((prevState)=>({
            ...prevState,
            pic:""
        }));

        const image = e.target.files![0];
        console.log(image);
        

        if (!image || image===undefined) {
            toast.error("Please Select an Image!");
            return;
        };

        if (!(image.type === "image/jpeg" || image.type === "image/png")){
            console.log("fdsfsdfds");
            
            toast.error("Please Select an Image!");
            return;
        }

        const formData=new FormData();
        formData.append("image",image);
        
        try {
            setImageUploading(true)
            const config = {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            };
      
            const { data }:{data:string} = await axios.post("/api/upload", formData, config);
      
            
            setFormData((prevState)=>({
                ...prevState,
                pic:data
            }));

            setImageUploading(false);
          } catch (error) {
            console.error(error);
            toast.error("Error :"+error);
            setImageUploading(false);
          }

    }

    const submitHandler=(e:MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword) {
            toast.error("Please Fill all the Feilds");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords must match");
            return;
        } 

        dispatch(register(name, email, password,pic));
          
    }


    return(
        <Container visible={visible}>
            {/* {error && toast.error(`${error as Error}`)} */}
            {loading && <Loader style={{
                position:"absolute",
                left:"38%",
                right:"50%",
                top:"222px",
                zIndex:"999999"
            }}/>}
            <Content>
                <div>
                    <span>Name: <MyError visible={name}>*</MyError></span>
                    <input type="name" name="name" value={name} onChange={(e)=>onChange(e)} placeholder="Enter Name"/>
                </div>
                <div>
                    <span>Email Address: <MyError visible={email}>*</MyError></span>
                    <input type="email" name="email" value={email} onChange={(e)=>onChange(e)} placeholder="Enter Email Address"/>
                </div>
                <div>
                    <span>Email Password: <MyError visible={password}>*</MyError></span>
                    <input type={showPassword==true ? "text" : "password"} name="password" value={password} onChange={(e)=>onChange(e)} placeholder="Enter Password"/>
                    <button onClick={(e)=>setShowPassword(!showPassword)}>{showPassword? "hide" : "show"}</button>
                </div>
                <div>
                    <span>Confirm Password: <MyError visible={confirmPassword}>*</MyError></span>
                    <input type={showConfirmPassword==true ? "text" : "password"} name="confirmPassword" value={confirmPassword} onChange={(e)=>onChange(e)} placeholder="Enter Confirm Password"/>
                    <button onClick={(e)=>setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword? "hide" : "show"}</button>
                </div>
                <div style={{position:"relative"}}>
                    <span>Upload Your Picture: <MyError visible={pic}>*</MyError></span>
                    <input type="file" name="image" accept="image/*" onChange={(e) => handleChange(e)}/>
                    {imageUploading && <Loader style={{
                        // border:"2px solid red",
                        position:"absolute",
                        top:"23px",
                        right:"2px",
                        width:"43px",
                        height:"32px",
                        
                    }}/>}
                </div>
                <button onClick={(e)=>submitHandler(e)} disabled={(name==="" && email==="" && password==="" && confirmPassword==="" && pic=="") ? true : false}>Sign Up</button>
                
            </Content>
        </Container>
    )
}

export default SignUp

const Container=styled.div`
    display:${(props:{visible:boolean})=>{
        return !props.visible ? "initial" : "none";
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
        &:nth-child(1){
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
        &:nth-child(5){
            /* border:2px solid red; */
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            /* background-color: initial; */
            span{
                font-size: 15px;
                font-weight: 600;
            }
            input{
                border:1px solid rgba(0,0,0,0.6);
                margin-top: 5px;
                width: 100%;
                height: 37px;
                padding:7px 7px;
                border-radius: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
            
            }
        }
        &:nth-child(3){
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
        &:nth-child(4){
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
        &:nth-child(6){
            margin-top:15px;
            background-color: #3282ce;
            &:hover{
                background-color: #81a3c3; 
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