import axios from "axios"
import { Socket,io } from "socket.io-client"
import { createAction } from "../../utils/reducer.utils"
import { AppThunk } from "../store"
import { CREATE_SOCKET_ACTION_TYPE } from "../types/createSocket"
import { errorHandler } from "./errorHandler"

export const createSocket=(socket:Socket):AppThunk=>async(dispatch)=>{
    try {
        dispatch(createAction(
            CREATE_SOCKET_ACTION_TYPE.CREATE_SOCKET_REQUEST
        ))

        
        dispatch(createAction(
            CREATE_SOCKET_ACTION_TYPE.CREATE_SOCKET_SUCCESS,
            socket
            ))
            // console.log(socket);

            // Save user info to local storage
       

    } catch (error) {
        dispatch({
            type: CREATE_SOCKET_ACTION_TYPE.CREATE_SOCKET_FAIL,
            payload: errorHandler(error),
          });
    }
}