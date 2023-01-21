import express,{Request,Response,NextFunction} from "express"
import colors from "colors"
import dotenv from "dotenv"
import path from "path";
import morgan from "morgan"
import {chats} from "./data/data"

dotenv.config({path:path.join(__dirname,"..","config.env")})

colors.enable()

const app=express();

if(process.env.NODE_ENV==="development"){
    app.use(morgan("dev"))
}

app.get("/",(req:Request,res:Response,next:NextFunction)=>{
    res.send("API is Running...")
})

app.get("/api/chat",(req:Request,res:Response,next:NextFunction)=>{
    res.send(chats)
})

app.get("/api/chat/:id",(req:Request,res:Response,next:NextFunction)=>{
    const singleChat=chats.find((chat)=>chat._id===req.params.id)
    res.send(singleChat)
})

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold);  
})