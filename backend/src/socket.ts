import { IncomingMessage, Server, ServerResponse } from "http";
import {Socket} from "socket.io"


let io:Server<typeof IncomingMessage, typeof ServerResponse>;

export const init=(serverOrHttpServer:Server<typeof IncomingMessage, typeof ServerResponse>)=>{
        io=require("socket.io")(serverOrHttpServer,{
            pingTimeout:60000,
            cors: {
                origin: "http://loaclhost:3000",//* for all
                // methods: ["GET", "POST"]
              },
            //   allowRequest: (req: { headers: { origin: undefined; }; }, callback: (arg0: null, arg1: boolean) => void) => {
            //     const noOriginHeader = req.headers.origin === undefined;
            //     callback(null, noOriginHeader);
            //   }
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