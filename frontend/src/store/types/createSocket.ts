
import { Socket } from "socket.io-client";
import { Action, ActionWithPayload } from "../../utils/reducer.utils";
import { UserWithToken } from "./user";


export interface CreateSocketState{
    readonly socket?:Socket,
    readonly loading?:boolean,
    readonly error?:Error
}

export enum CREATE_SOCKET_ACTION_TYPE{
    CREATE_SOCKET_REQUEST="user/CREATE_SOCKET_REQUEST",
    CREATE_SOCKET_SUCCESS="user/CREATE_SOCKET_SUCCESS",
    CREATE_SOCKET_FAIL="user/CREATE_SOCKET_FAIL",
    CREATE_SOCKET_RESET="user/CREATE_SOCKET_RESET",
}

export type CreateSocketRequestAction=Action<CREATE_SOCKET_ACTION_TYPE.CREATE_SOCKET_REQUEST>
export type CreateSocketSuccessAction=ActionWithPayload<CREATE_SOCKET_ACTION_TYPE.CREATE_SOCKET_SUCCESS,Socket>
export type CreateSocketFailAction=ActionWithPayload<CREATE_SOCKET_ACTION_TYPE.CREATE_SOCKET_FAIL,Error>
export type CreateSocketReset=Action<CREATE_SOCKET_ACTION_TYPE.CREATE_SOCKET_RESET>


export type CreateSocketAction=
CreateSocketRequestAction |
CreateSocketSuccessAction |
CreateSocketFailAction  |
CreateSocketReset;