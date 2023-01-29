"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.init = void 0;
let io;
const init = (serverOrHttpServer) => {
    io = require("socket.io")(serverOrHttpServer, {
        pingTimeout: 60000,
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            // transports: ['websocket', 'polling'],
            // credentials: true
        },
        // allowEIO3: true
    });
    return io;
};
exports.init = init;
const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
};
exports.getIO = getIO;
// export const allSocketOps=(io:Server<typeof IncomingMessage, typeof ServerResponse>)=>{
//     io.on("connection",(socket: Socket)=>{
//         console.log("Client is connected.".blue,socket.id);   
//     })
// }
