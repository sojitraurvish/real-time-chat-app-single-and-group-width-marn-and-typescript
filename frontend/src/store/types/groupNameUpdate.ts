
import { Action, ActionWithPayload } from "../../utils/reducer.utils";
import { Chat } from "./chat";
import { UserWithToken } from "./user";


export interface GroupNameUpdateState{
    readonly updatedNameOfGroup?:Chat,
    readonly loading?:boolean,
    readonly error?:Error
}

export enum GROP_NAME_UPDATE_ACTION_TYPE{
    GROP_NAME_UPDATE_REQUEST="user/GROP_NAME_UPDATE_REQUEST",
    GROP_NAME_UPDATE_SUCCESS="user/GROP_NAME_UPDATE_SUCCESS",
    GROP_NAME_UPDATE_FAIL="user/GROP_NAME_UPDATE_FAIL",
    GROP_NAME_UPDATE_RESET="user/GROP_NAME_UPDATE_RESET",
}

export type GropNameUpdateRequestAction=Action<GROP_NAME_UPDATE_ACTION_TYPE.GROP_NAME_UPDATE_REQUEST>
export type GropNameUpdateSuccessAction=ActionWithPayload<GROP_NAME_UPDATE_ACTION_TYPE.GROP_NAME_UPDATE_SUCCESS,Chat>
export type GropNameUpdateFailAction=ActionWithPayload<GROP_NAME_UPDATE_ACTION_TYPE.GROP_NAME_UPDATE_FAIL,Error>
export type GropNameUpdateReset=Action<GROP_NAME_UPDATE_ACTION_TYPE.GROP_NAME_UPDATE_RESET>


export type GroupNameUpdateAction=
GropNameUpdateRequestAction |
GropNameUpdateSuccessAction |
GropNameUpdateFailAction  |
GropNameUpdateReset;