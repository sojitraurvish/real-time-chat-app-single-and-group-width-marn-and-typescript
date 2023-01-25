import express,{Request,Response,NextFunction} from "express"
import colors from "colors"
import dotenv from "dotenv"
import path from "path";
import morgan from "morgan"
import {chats} from "./data/data"
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import connectDB from "./config/config";

import userRoutes from "./routes/userRoutes"
import chatRoutes from "./routes/chatRoutes"
import uploadRoutes from "./routes/uploadRoutes"

dotenv.config({path:path.join(__dirname,"..","config.env")})

connectDB();

colors.enable()

const app=express();

// To Accept JSON Data
app.use(express.json()) 

// const ___dirname = path.resolve();
const ___dirname = path.resolve();
const rootDir=path.dirname(___dirname);
app.use("/uploads",express.static(path.join(rootDir,"/uploads")))

if(process.env.NODE_ENV==="development"){ 
    app.use(morgan("dev"))
}

app.get("/",(req:Request,res:Response,next:NextFunction)=>{
    res.send("API is Running...") 
})

app.use("/api/users",userRoutes)
app.use("/api/chats",chatRoutes)
app.use("/api/upload", uploadRoutes);



app.use(notFound)

app.use(errorHandler)

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold);
})