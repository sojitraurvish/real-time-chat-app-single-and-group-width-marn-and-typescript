import { CreateSocketAction, CreateSocketState, CREATE_SOCKET_ACTION_TYPE } from "../types/createSocket";

export const createSocketReducer = (state:CreateSocketState = {}, action:CreateSocketAction):CreateSocketState => {
    const {type}=action;

    if(type===CREATE_SOCKET_ACTION_TYPE.CREATE_SOCKET_REQUEST){
        return {...state,loading:true}
    }
    if(type===CREATE_SOCKET_ACTION_TYPE.CREATE_SOCKET_SUCCESS){
        return {...state,loading:false,socket:action.payload}
    }
    if(type===CREATE_SOCKET_ACTION_TYPE.CREATE_SOCKET_FAIL){
        return {...state,loading:false,error:action.payload}
    }
    if(type===CREATE_SOCKET_ACTION_TYPE.CREATE_SOCKET_RESET){
        return {}
    }
    return state;
  };