
import { Action, ActionWithPayload } from "../../utils/reducer.utils";
import { UserWithToken } from "./user";


export interface UserLoginState{
    readonly userInfo?:UserWithToken,
    readonly loading?:boolean,
    readonly error?:Error
}

export enum USER_LOGIN_ACTION_TYPE{
    USER_LOGIN_REQUEST="user/USER_LOGIN_REQUEST",
    USER_LOGIN_SUCCESS="user/USER_LOGIN_SUCCESS",
    USER_LOGIN_FAIL="user/USER_LOGIN_FAIL",
    USER_LOGOUT="user/USER_LOGOUT",
}

export type UserLoginRequestAction=Action<USER_LOGIN_ACTION_TYPE.USER_LOGIN_REQUEST>
export type UserLoginSuccessAction=ActionWithPayload<USER_LOGIN_ACTION_TYPE.USER_LOGIN_SUCCESS,UserWithToken>
export type UserLoginFailAction=ActionWithPayload<USER_LOGIN_ACTION_TYPE.USER_LOGIN_FAIL,Error>
export type UserLogoutAction=Action<USER_LOGIN_ACTION_TYPE.USER_LOGOUT>


export type UserLoginAction=
UserLoginRequestAction |
UserLoginSuccessAction |
UserLoginFailAction  |
UserLogoutAction;