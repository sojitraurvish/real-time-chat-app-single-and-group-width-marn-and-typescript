import { FC,CSSProperties } from "react"

export type Props={
    style?:CSSProperties
}

const Loader:FC<Props>=({style})=>{
    
    return (
        <img style={style} src="/images/loading.gif" alt="" />
    )
}

export default Loader