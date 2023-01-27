import { ListAllMessagesAction, ListAllMessagesState, LIST_ALL_MESSAGES_ACTION_TYPE, SendMessageAction, SendMessageState, SEND_MESSAGE_ACTION_TYPE } from "../types";

export const sendMessageReducer = (state:SendMessageState = {}, action:SendMessageAction):SendMessageState => {
    const {type}=action;

    if(type===SEND_MESSAGE_ACTION_TYPE.SEND_MESSAGE_REQUEST){
        return {...state,loading:true}
    }
    if(type===SEND_MESSAGE_ACTION_TYPE.SEND_MESSAGE_SUCCESS){
        return {...state,loading:false,message:action.payload}
    }
    if(type===SEND_MESSAGE_ACTION_TYPE.SEND_MESSAGE_FAIL){
        return {...state,loading:false,error:action.payload}
    }
    if(type===SEND_MESSAGE_ACTION_TYPE.SEND_MESSAGE_RESET){
        return {}
    }
    return state;
  };
export const listAllMessagesReducer = (state:ListAllMessagesState = {}, action:ListAllMessagesAction):ListAllMessagesState => {
    const {type}=action;

    if(type===LIST_ALL_MESSAGES_ACTION_TYPE.LIST_ALL_MESSAGES_REQUEST){
        return {...state,loading:true}
    }
    if(type===LIST_ALL_MESSAGES_ACTION_TYPE.LIST_ALL_MESSAGES_SUCCESS){
        return {...state,loading:false,messages:action.payload}
    }
    if(type===LIST_ALL_MESSAGES_ACTION_TYPE.LIST_ALL_MESSAGES_FAIL){
        return {...state,loading:false,error:action.payload}
    }
    if(type===LIST_ALL_MESSAGES_ACTION_TYPE.LIST_ALL_MESSAGES_UPEND){
        return {...state,loading:false,messages:[...state.messages!,action.payload]}
    }
    if(type===LIST_ALL_MESSAGES_ACTION_TYPE.LIST_ALL_MESSAGES_RESET){
        return {}
    }
    return state;
  };