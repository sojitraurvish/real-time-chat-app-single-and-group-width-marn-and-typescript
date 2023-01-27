
import { Action, ActionWithPayload } from "../../utils/reducer.utils";
import { Chat } from "./chat";
import { UserWithToken } from "./user";


export interface addUserToGroupState{
    readonly addedUserToGroup?:Chat,
    readonly loading?:boolean,
    readonly error?:Error
}

export enum ADD_USER_TO_GROUP_ACTION_TYPE{
    ADD_USER_TO_GROUP_REQUEST="user/ADD_USER_TO_GROUP_REQUEST",
    ADD_USER_TO_GROUP_SUCCESS="user/ADD_USER_TO_GROUP_SUCCESS",
    ADD_USER_TO_GROUP_FAIL="user/ADD_USER_TO_GROUP_FAIL",
    ADD_USER_TO_GROUP_RESET="user/ADD_USER_TO_GROUP_RESET",
}

export type AddUserToGroupRequestAction=Action<ADD_USER_TO_GROUP_ACTION_TYPE.ADD_USER_TO_GROUP_REQUEST>
export type AddUserToGroupSuccessAction=ActionWithPayload<ADD_USER_TO_GROUP_ACTION_TYPE.ADD_USER_TO_GROUP_SUCCESS,Chat>
export type AddUserToGroupFailAction=ActionWithPayload<ADD_USER_TO_GROUP_ACTION_TYPE.ADD_USER_TO_GROUP_FAIL,Error>
export type AddUserToGroupReset=Action<ADD_USER_TO_GROUP_ACTION_TYPE.ADD_USER_TO_GROUP_RESET>


export type AddUserToGroupAction=
AddUserToGroupRequestAction |
AddUserToGroupSuccessAction |
AddUserToGroupFailAction |
AddUserToGroupReset;