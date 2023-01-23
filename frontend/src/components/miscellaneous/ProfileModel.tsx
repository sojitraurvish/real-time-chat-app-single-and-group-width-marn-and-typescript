import { FC,Dispatch} from "react"
import styled, { CSSProperties } from "styled-components";
import { UserWithToken } from "../../store/types";

export type Props={
    children?:string | JSX.Element | JSX.Element[];
    style?:CSSProperties;
    visible:boolean;
    user:UserWithToken;
    myOnClick:Dispatch<React.SetStateAction<boolean>>
}

const ProfileModel:FC<Props>=({user,visible=true,style,children,myOnClick})=>{
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
                        <div>
                            {user.name}
                        </div>
                        <img src={`/uploads${user.pic}`} alt="" />
                        <div>{user.email}</div>
                        
                    </Content>
                )
            }
        </Container>
    )
}

export default ProfileModel

const Container=styled.div`
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
    margin: auto;
    position: relative;
    border-radius: 15px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    div{
        margin: 15px;
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 2px;
        /* margin-bottom: 15px; */
        &:nth-child(2){
            /* border: 2px solid red; */
            font-size: 36px;
        }
        &:nth-child(4){
            /* border: 2px solid red; */
            /* margin-bottom: px; */
            padding-bottom: 20px;
        }
    }

    img{
        margin: 15px;
        &:nth-child(1){
            /* border: 2px solid red; */
            position: absolute;
            width: 10px;
            top:15px;
            right: 15px;
        }
        &:nth-child(3){
            /* border: 2px solid red; */
            border-radius: 50%;
            width: 50%;
        }
    }
    /* button{
        border: 2px solid red;
        width: 100%;
    } */
    
`