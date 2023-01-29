import {
    compose,
    legacy_createStore as createStore,
    applyMiddleware,
    Action,
    combineReducers
} from "redux"
import thunk,{ThunkAction,ThunkDispatch} from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
// import { ReduxState } from "./types/ReduxState"
import { userLoginReducer, userRegisterReducer, userSearchListReducer } from "./reducers/userReducers"
import { UserWithToken } from "./types"
import { addUserToGroupReducer, chatCreateReducer, chatListReducer, deleteUserToGroupReducer, groupChatCreateReducer, groupNameUpdateReducer } from "./reducers/chatReducers"
import { listAllMessagesReducer, sendMessageReducer } from "./reducers/messageReducer"
import { createSocketReducer } from "./reducers/socketReducers"


export const rootReducer=combineReducers({
    userRegister:userRegisterReducer,
    userLogin:userLoginReducer,
    userSearchList:userSearchListReducer,
    
    chatCreate:chatCreateReducer,
    chatList:chatListReducer,
    groupChatCreate:groupChatCreateReducer,
    groupNameUpdate:groupNameUpdateReducer,
    addUserToGroup:addUserToGroupReducer,
    deleteUserToGroup:deleteUserToGroupReducer,
    
    sendMessage:sendMessageReducer,
    listAllMessages:listAllMessagesReducer,

    createSocket:createSocketReducer
})

export type RootState=ReturnType<typeof rootReducer>

export type AppDispatch=ThunkDispatch<RootState,unknown,Action<string>>

export type AppThunk=ThunkAction<
    Promise<void>,
    RootState,
    unknown,
    Action<string>
>
const userInfoFromLocalStorage=localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")!) : null
const minesocket=localStorage.getItem("socket") ? localStorage.getItem("socket") : null

const initialState={
    userLogin:{userInfo:userInfoFromLocalStorage},
}

const middleware=[thunk]

export const store=createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
