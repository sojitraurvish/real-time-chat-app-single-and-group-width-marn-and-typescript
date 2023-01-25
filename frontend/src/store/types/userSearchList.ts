
import { Action, ActionWithPayload } from "../../utils/reducer.utils";
import { User } from "./user";


export interface UserSearchListState{
    readonly userList?:User[],
    readonly loading?:boolean,
    readonly error?:Error
}

export enum USER_SEARCH_LIST_ACTION_TYPE{
    USER_SEARCH_LIST_REQUEST="user/USER_SEARCH_LIST_REQUEST",
    USER_SEARCH_LIST_SUCCESS="user/USER_SEARCH_LIST_SUCCESS",
    USER_SEARCH_LIST_FAIL="user/USER_SEARCH_LIST_FAIL",
    USER_SEARCH_LIST_RESET="user/USER_SEARCH_LIST_RESET",
}

export type UserSearchListRequestAction=Action<USER_SEARCH_LIST_ACTION_TYPE.USER_SEARCH_LIST_REQUEST>
export type UserSearchListSuccessAction=ActionWithPayload<USER_SEARCH_LIST_ACTION_TYPE.USER_SEARCH_LIST_SUCCESS,User[]>
export type UserSearchListFailAction=ActionWithPayload<USER_SEARCH_LIST_ACTION_TYPE.USER_SEARCH_LIST_FAIL,Error>
export type UserSearchListReset=Action<USER_SEARCH_LIST_ACTION_TYPE.USER_SEARCH_LIST_RESET>


export type UserSearchListAction=
UserSearchListRequestAction |
UserSearchListSuccessAction |
UserSearchListFailAction  |
UserSearchListReset;