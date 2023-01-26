import { chatList } from "../actions/chatActions";
import { ChatCreateAction, ChatCreateState, CHAT_CREATE_ACTION_TYPE } from "../types/chatCreate";
import { ChatListAction, ChatListState, CHAT_LIST_ACTION_TYPE } from "../types/chatList";
import { GROP_CHAT_CREATE_ACTION_TYPE, GroupChatCreateAction, GroupChatCreateState } from "../types/groupChatCreate";

export const chatCreateReducer = (state:ChatCreateState = {}, action:ChatCreateAction):ChatCreateState => {
    const {type}=action;

    if(type===CHAT_CREATE_ACTION_TYPE.CHAT_CREATE_REQUEST){
        return {...state,loading:true}
    }
    if(type===CHAT_CREATE_ACTION_TYPE.CHAT_CREATE_SUCCESS){
        return {...state,loading:false,createdChat:action.payload}
    }
    if(type===CHAT_CREATE_ACTION_TYPE.CHAT_CREATE_FAIL){
        return {...state,loading:false,error:action.payload}
    }
    if(type===CHAT_CREATE_ACTION_TYPE.CHAT_CREATE_RESET){
        return {}
    }
    return state;
  };

export const chatListReducer = (state:ChatListState = {}, action:ChatListAction):ChatListState => {
    const {type}=action;

    if(type===CHAT_LIST_ACTION_TYPE.CHAT_LIST_REQUEST){
        return {...state,loading:true}
    }
    if(type===CHAT_LIST_ACTION_TYPE.CHAT_LIST_SUCCESS){
        if(action.payload)
        return {...state,loading:false,chatList:action.payload}
    }
    if(type===CHAT_LIST_ACTION_TYPE.CHAT_LIST_FAIL){
        return {...state,loading:false,error:action.payload}
    }
    if(type===CHAT_LIST_ACTION_TYPE.CHAT_LIST_UPEND){
        return {...state,loading:false,chatList:[action.payload,...state.chatList!]}
    }
    if(type===CHAT_LIST_ACTION_TYPE.CHAT_LIST_RESET){
        return {}
    }
    return state;
  };


  export const groupChatCreateReducer = (state:GroupChatCreateState = {}, action:GroupChatCreateAction):GroupChatCreateState => {
    const {type}=action;

    if(type===GROP_CHAT_CREATE_ACTION_TYPE.GROP_CHAT_CREATE_REQUEST){
        return {...state,loading:true}
    }
    if(type===GROP_CHAT_CREATE_ACTION_TYPE.GROP_CHAT_CREATE_SUCCESS){
        return {...state,loading:false,createdGroupChat:action.payload}
    }
    if(type===GROP_CHAT_CREATE_ACTION_TYPE.GROP_CHAT_CREATE_FAIL){
        return {...state,loading:false,error:action.payload}
    }
    if(type===GROP_CHAT_CREATE_ACTION_TYPE.GROP_CHAT_CREATE_RESET){
        return {}
    }
    return state;
  };