
import { Action, ActionWithPayload } from "../../utils/reducer.utils";
import { Chat } from "./chat";
import { Message } from "./message";
import { UserWithToken } from "./user";


export interface SendMessageState{
    readonly message?:Message,
    readonly loading?:boolean,
    readonly error?:Error
}

export enum SEND_MESSAGE_ACTION_TYPE{
    SEND_MESSAGE_REQUEST="user/SEND_MESSAGE_REQUEST",
    SEND_MESSAGE_SUCCESS="user/SEND_MESSAGE_SUCCESS",
    SEND_MESSAGE_FAIL="user/SEND_MESSAGE_FAIL",
    SEND_MESSAGE_RESET="user/SEND_MESSAGE_RESET",
}

export type SendMessageRequestAction=Action<SEND_MESSAGE_ACTION_TYPE.SEND_MESSAGE_REQUEST>
export type SendMessageSuccessAction=ActionWithPayload<SEND_MESSAGE_ACTION_TYPE.SEND_MESSAGE_SUCCESS,Message>
export type SendMessageFailAction=ActionWithPayload<SEND_MESSAGE_ACTION_TYPE.SEND_MESSAGE_FAIL,Error>
export type SendMessageReset=Action<SEND_MESSAGE_ACTION_TYPE.SEND_MESSAGE_RESET>


export type SendMessageAction=
SendMessageRequestAction |
SendMessageSuccessAction |
SendMessageFailAction  |
SendMessageReset;