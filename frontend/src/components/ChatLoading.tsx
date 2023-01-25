import styled from "styled-components"

const ChatLoading=()=>{
    return (
        <Container>
            <img src="/images/chatloading.gif" alt="" />
            <img src="/images/chatloading.gif" alt="" />
            <img src="/images/chatloading.gif" alt="" />
            <img src="/images/chatloading.gif" alt="" />
            <img src="/images/chatloading.gif" alt="" />
            
            {/* <img src="/images/chatloading.gif" alt="" /> */}
        </Container>
    )
}

export default ChatLoading

const Container=styled.div`
    width: 97%;
    /* border: 2px solid red; */
`