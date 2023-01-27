import { IncomingMessage, Server, ServerResponse } from "http";
import {Socket} from "socket.io"


let io:Server<typeof IncomingMessage, typeof ServerResponse>;

module.exports={
    init:(httpServer:Server<typeof IncomingMessage, typeof ServerResponse>)=>{
        io=require("socket.io")(httpServer,{
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
              },
            //   allowRequest: (req: { headers: { origin: undefined; }; }, callback: (arg0: null, arg1: boolean) => void) => {
            //     const noOriginHeader = req.headers.origin === undefined;
            //     callback(null, noOriginHeader);
            //   }
        });
        return io;
    },
    getIO:()=>{
        if(!io){
            throw new Error("Socket.io not initialized");
        }
        return io;
    }
}

// export const allSocketOps=(io:Server<typeof IncomingMessage, typeof ServerResponse>)=>{
//     io.on("connection",(socket: Socket)=>{
//         console.log("Client is connected.".blue,socket.id);   
//     })
// }