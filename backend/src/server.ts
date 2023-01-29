import express, { Request, Response, NextFunction } from "express"
import colors from "colors"
import dotenv from "dotenv"
import path from "path";
import morgan from "morgan"
import { chats } from "./data/data"
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import connectDB from "./config/config";
import cors from "cors"
import { createServer } from "http";

// import io from "socket.io"
import { init } from "./socket"
import { Socket } from "socket.io";
import { IMessage, IUser } from "./types";
// import { Server } from "http";

import userRoutes from "./routes/userRoutes"
import chatRoutes from "./routes/chatRoutes"
import uploadRoutes from "./routes/uploadRoutes"
import messageRoutes from "./routes/messageRoutes"

dotenv.config({ path: path.join(__dirname, "..", "config.env") })

connectDB();

colors.enable()

const app = express();
app.use(cors())
const httpServer = createServer(app);

const io = init(httpServer);
io.on("connect", (socket: Socket) => {
    console.log("connected to socket io");
    
    socket.on("setup", (userData: IUser) => {
        socket.join(userData._id) 
        // console.log(userData._id); 
        socket.emit("connected")
    })

    socket.on("join chat", (room) => { 
        socket.join(room)
        console.log("User Join Room:" + room);
    })
        
        
    socket.on("new_message",(newMessageRecived:IMessage)=>{
        let chat=newMessageRecived.chat;
        
        console.log("message sended"+chat);
        
        if(!chat.users)return console.log("chat.users not define");

        chat.users.forEach(user=>{
                if(user._id==newMessageRecived.sender._id)return;
                
                socket.to(user._id).emit("message_received",newMessageRecived)
            })
            
        })
        
})



// To Accept JSON Data
app.use(express.json())

// const ___dirname = path.resolve();
const ___dirname = path.resolve();
const rootDir = path.dirname(___dirname);
app.use("/uploads", express.static(path.join(rootDir, "/uploads")))

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("API is Running...")
})

app.use("/api/users", userRoutes)
app.use("/api/chats", chatRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/upload", uploadRoutes);



app.use(notFound)

app.use(errorHandler)
    
const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold);
})
    
    // app.use(()=>{server.close()})