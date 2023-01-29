import { IncomingMessage, Server, ServerResponse } from "http";
import {Socket} from "socket.io"


let io:any;

export const init=(serverOrHttpServer:Server)=>{
        io=require("socket.io")(serverOrHttpServer,{
            pingTimeout:60000,
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
                // transports: ['websocket', 'polling'],
                // credentials: true
            },
            // allowEIO3: true
        });
        return io;
    } 

export const getIO=()=>{
        if(!io){
            throw new Error("Socket.io not initialized");
        }
        return io;
    }

// export const allSocketOps=(io:Server<typeof IncomingMessage, typeof ServerResponse>)=>{
//     io.on("connection",(socket: Socket)=>{
//         console.log("Client is connected.".blue,socket.id);   
//     })
// }