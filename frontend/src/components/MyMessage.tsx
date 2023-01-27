import { FC } from "react"
import styled from "styled-components"
import { Message } from "../store/types/message"

export type Props={
    mymessage:Message
}

const MyMessage:FC<Props>=({mymessage})=>{
    return (
        <Container>{mymessage.content}</Container>
    )
}

export default MyMessage

const Container=styled.div`
    margin-left: auto;
    background-color: white;
`