
import { Action, ActionWithPayload } from "../../utils/reducer.utils";
import { UserWithToken } from "./user";


export interface UserRegisterState{
    readonly userInfo?:UserWithToken,
    readonly loading?:boolean,
    readonly error?:Error
}

export enum USER_REGISTER_ACTION_TYPE{
    USER_REGISTER_REQUEST="user/USER_REGISTER_REQUEST",
    USER_REGISTER_SUCCESS="user/USER_REGISTER_SUCCESS",
    USER_REGISTER_FAIL="user/USER_REGISTER_FAIL",
    USER_REGISTER_RESET="user/USER_REGISTER_RESET",
}

export type UserRegisterRequestAction=Action<USER_REGISTER_ACTION_TYPE.USER_REGISTER_REQUEST>
export type UserRegisterSuccessAction=ActionWithPayload<USER_REGISTER_ACTION_TYPE.USER_REGISTER_SUCCESS,UserWithToken>
export type UserRegisterFailAction=ActionWithPayload<USER_REGISTER_ACTION_TYPE.USER_REGISTER_FAIL,Error>
export type UserRegisterReset=Action<USER_REGISTER_ACTION_TYPE.USER_REGISTER_RESET>


export type UserRegisterAction=
UserRegisterRequestAction |
UserRegisterSuccessAction |
UserRegisterFailAction  |
UserRegisterReset;