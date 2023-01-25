
import { Action, ActionWithPayload } from "../../utils/reducer.utils";
import { Chat } from "./chat";
import { UserWithToken } from "./user";


export interface ChatCreateState{
    readonly createdChat?:Chat,
    readonly loading?:boolean,
    readonly error?:Error
}

export enum CHAT_CREATE_ACTION_TYPE{
    CHAT_CREATE_REQUEST="user/CHAT_CREATE_REQUEST",
    CHAT_CREATE_SUCCESS="user/CHAT_CREATE_SUCCESS",
    CHAT_CREATE_FAIL="user/CHAT_CREATE_FAIL",
    CHAT_CREATE_RESET="user/CHAT_CREATE_RESET",
}

export type ChatCreateRequestAction=Action<CHAT_CREATE_ACTION_TYPE.CHAT_CREATE_REQUEST>
export type ChatCreateSuccessAction=ActionWithPayload<CHAT_CREATE_ACTION_TYPE.CHAT_CREATE_SUCCESS,Chat>
export type ChatCreateFailAction=ActionWithPayload<CHAT_CREATE_ACTION_TYPE.CHAT_CREATE_FAIL,Error>
export type ChatCreateReset=Action<CHAT_CREATE_ACTION_TYPE.CHAT_CREATE_RESET>


export type ChatCreateAction=
ChatCreateRequestAction |
ChatCreateSuccessAction |
ChatCreateFailAction  |
ChatCreateReset;