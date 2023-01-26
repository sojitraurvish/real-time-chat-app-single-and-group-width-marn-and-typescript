
import { Action, ActionWithPayload } from "../../utils/reducer.utils";
import { Chat } from "./chat";
import { UserWithToken } from "./user";


export interface GroupChatCreateState{
    readonly createdGroupChat?:Chat,
    readonly loading?:boolean,
    readonly error?:Error
}

export enum GROP_CHAT_CREATE_ACTION_TYPE{
    GROP_CHAT_CREATE_REQUEST="user/GROP_CHAT_CREATE_REQUEST",
    GROP_CHAT_CREATE_SUCCESS="user/GROP_CHAT_CREATE_SUCCESS",
    GROP_CHAT_CREATE_FAIL="user/GROP_CHAT_CREATE_FAIL",
    GROP_CHAT_CREATE_RESET="user/GROP_CHAT_CREATE_RESET",
}

export type GropChatCreateRequestAction=Action<GROP_CHAT_CREATE_ACTION_TYPE.GROP_CHAT_CREATE_REQUEST>
export type GropChatCreateSuccessAction=ActionWithPayload<GROP_CHAT_CREATE_ACTION_TYPE.GROP_CHAT_CREATE_SUCCESS,Chat>
export type GropChatCreateFailAction=ActionWithPayload<GROP_CHAT_CREATE_ACTION_TYPE.GROP_CHAT_CREATE_FAIL,Error>
export type GropChatCreateReset=Action<GROP_CHAT_CREATE_ACTION_TYPE.GROP_CHAT_CREATE_RESET>


export type GroupChatCreateAction=
GropChatCreateRequestAction |
GropChatCreateSuccessAction |
GropChatCreateFailAction  |
GropChatCreateReset;