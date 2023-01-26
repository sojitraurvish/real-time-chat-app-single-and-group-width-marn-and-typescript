import { ChatCreateState } from "./chatCreate";
import { ChatListState } from "./chatList";
import { GroupChatCreateState } from "./groupChatCreate";
import { UserLoginState } from "./userLogin";
import { UserRegisterState } from "./userRegister";
import { UserSearchListState } from "./userSearchList";

export interface ReduxState{
    userRegister:UserRegisterState,
    userLogin:UserLoginState,
    userSearchList:UserSearchListState,

    chatCreate:ChatCreateState,
    chatList:ChatListState,
    groupChatCreate:GroupChatCreateState
}