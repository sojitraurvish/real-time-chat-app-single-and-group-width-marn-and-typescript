
import { Action, ActionWithPayload } from "../../utils/reducer.utils";
import { Chat } from "./chat";

export interface ChatListState{
    readonly chatList?:Chat[],
    readonly loading?:boolean,
    readonly error?:Error
}

export enum CHAT_LIST_ACTION_TYPE{
    CHAT_LIST_REQUEST="user/CHAT_LIST_REQUEST",
    CHAT_LIST_SUCCESS="user/CHAT_LIST_SUCCESS",
    CHAT_LIST_FAIL="user/CHAT_LIST_FAIL",
    CHAT_LIST_UPEND="user/CHAT_LIST_UPEND",
    CHAT_LIST_RESET="user/CHAT_LIST_RESET",
}

export type ChatListRequestAction=Action<CHAT_LIST_ACTION_TYPE.CHAT_LIST_REQUEST>
export type ChatListSuccessAction=ActionWithPayload<CHAT_LIST_ACTION_TYPE.CHAT_LIST_SUCCESS,Chat[]>
export type ChatListFailAction=ActionWithPayload<CHAT_LIST_ACTION_TYPE.CHAT_LIST_FAIL,Error>
export type ChatListUpendAction=ActionWithPayload<CHAT_LIST_ACTION_TYPE.CHAT_LIST_UPEND,Chat>
export type ChatListReset=Action<CHAT_LIST_ACTION_TYPE.CHAT_LIST_RESET>

export type ChatListAction=
ChatListRequestAction |
ChatListSuccessAction |
ChatListFailAction |
ChatListUpendAction |
ChatListReset;