import { FC } from "react"
import styled, { CSSProperties } from "styled-components"

export type Props={
    children?:string | JSX.Element | JSX.Element[];
    style?:CSSProperties;
}

const TopNevDropDown:FC<Props>=({children,style})=>{
    return (
        <Container style={style}>
            {children}
        </Container>
    )
}

export default TopNevDropDown

export const Container=styled.div`
    z-index: 1000;
    background-color: white;
    border:1px solid black;
    position:absolute;
    top:64px;
    right: 7px;
    /* display: flex; */
    /* flex-direction: column; */
    /* align-items: center; */
    /* justify-content: center; */
    border-radius: 7px;
    transition: all 2s ease 0s !important;
    /* -webkit-transition:all 0.s linear 0s; */
    /* display: none; */
    opacity: 0;
    /* z-index: -100; */
    button{
        border: none;
        /* border:2px solid red !important; */
        width: 100%;
        /* border-radius: 5px !important; */
        background-color: transparent;
        padding: 10px 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        /* width: 100%; */
        /* height: 100%; */
        &:hover{
            background-color: rgba(0,0,0,0.2);
        }
        &:nth-child(n+2){

            border-top:1px solid rgba(0,0,0,0.2);
        }

    }
    
`