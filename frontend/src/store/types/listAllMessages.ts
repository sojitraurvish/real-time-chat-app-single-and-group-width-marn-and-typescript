
import { Action, ActionWithPayload } from "../../utils/reducer.utils";
import { Chat } from "./chat";
import { Message } from "./message";
import { UserWithToken } from "./user";


export interface ListAllMessagesState{
    readonly messages?:Message[],
    readonly loading?:boolean,
    readonly error?:Error
}

export enum LIST_ALL_MESSAGES_ACTION_TYPE{
    LIST_ALL_MESSAGES_REQUEST="user/LIST_ALL_MESSAGES_REQUEST",
    LIST_ALL_MESSAGES_SUCCESS="user/LIST_ALL_MESSAGES_SUCCESS",
    LIST_ALL_MESSAGES_FAIL="user/LIST_ALL_MESSAGES_FAIL",
    LIST_ALL_MESSAGES_RESET="user/LIST_ALL_MESSAGES_RESET",
    LIST_ALL_MESSAGES_UPEND="user/LIST_ALL_MESSAGES_UPEND",
}

export type ListAllMessagesRequestAction=Action<LIST_ALL_MESSAGES_ACTION_TYPE.LIST_ALL_MESSAGES_REQUEST>
export type ListAllMessagesSuccessAction=ActionWithPayload<LIST_ALL_MESSAGES_ACTION_TYPE.LIST_ALL_MESSAGES_SUCCESS,Message[]>
export type ListAllMessagesFailAction=ActionWithPayload<LIST_ALL_MESSAGES_ACTION_TYPE.LIST_ALL_MESSAGES_FAIL,Error>
export type ListAllMessagesReset=Action<LIST_ALL_MESSAGES_ACTION_TYPE.LIST_ALL_MESSAGES_RESET>
export type ListAllMessagesUpend=ActionWithPayload<LIST_ALL_MESSAGES_ACTION_TYPE.LIST_ALL_MESSAGES_UPEND,Message>


export type ListAllMessagesAction=
ListAllMessagesRequestAction |
ListAllMessagesSuccessAction |
ListAllMessagesFailAction |
ListAllMessagesReset |
ListAllMessagesUpend;