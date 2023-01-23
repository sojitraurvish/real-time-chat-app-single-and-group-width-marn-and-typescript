import {
    compose,
    legacy_createStore as createStore,
    applyMiddleware,
    Action,
    combineReducers
} from "redux"
import thunk,{ThunkAction,ThunkDispatch} from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { ReduxState } from "./types/ReduxState"
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers"
import { UserWithToken } from "./types"

export type AppDispatch=ThunkDispatch<ReduxState,unknown,Action<string>>

export type AppThunk=ThunkAction<
    Promise<void>,
    ReduxState,
    unknown,
    Action<string>
>

export const rootReducer=combineReducers({
    userRegister:userRegisterReducer,
    userLogin:userLoginReducer
})

export type RootState=ReturnType<typeof rootReducer>

const userInfoFromLocalStorage=localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")!) : null

const initialState={
    userLogin:{userInfo:userInfoFromLocalStorage}
}

const middleware=[thunk]

export const store=createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)