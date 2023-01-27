
import { Action, ActionWithPayload } from "../../utils/reducer.utils";
import { Chat } from "./chat";
import { UserWithToken } from "./user";


export interface deleteUserToGroupState{
    readonly deletedUserToGroup?:Chat,
    readonly loading?:boolean,
    readonly error?:Error
}

export enum DELETE_USER_TO_GROUP_ACTION_TYPE{
    DELETE_USER_TO_GROUP_REQUEST="user/DELETE_USER_TO_GROUP_REQUEST",
    DELETE_USER_TO_GROUP_SUCCESS="user/DELETE_USER_TO_GROUP_SUCCESS",
    DELETE_USER_TO_GROUP_FAIL="user/DELETE_USER_TO_GROUP_FAIL",
    DELETE_USER_TO_GROUP_RESET="user/DELETE_USER_TO_GROUP_RESET",
}

export type DeleteUserToGroupRequestAction=Action<DELETE_USER_TO_GROUP_ACTION_TYPE.DELETE_USER_TO_GROUP_REQUEST>
export type DeleteUserToGroupSuccessAction=ActionWithPayload<DELETE_USER_TO_GROUP_ACTION_TYPE.DELETE_USER_TO_GROUP_SUCCESS,Chat>
export type DeleteUserToGroupFailAction=ActionWithPayload<DELETE_USER_TO_GROUP_ACTION_TYPE.DELETE_USER_TO_GROUP_FAIL,Error>
export type DeleteUserToGroupReset=Action<DELETE_USER_TO_GROUP_ACTION_TYPE.DELETE_USER_TO_GROUP_RESET>

export type DeleteUserToGroupAction=
DeleteUserToGroupRequestAction |
DeleteUserToGroupSuccessAction |
DeleteUserToGroupFailAction  |
DeleteUserToGroupReset;