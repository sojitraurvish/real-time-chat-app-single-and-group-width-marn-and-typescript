import { UserLoginState } from "./userLogin";
import { UserRegisterState } from "./userRegister";

export interface ReduxState{
    userRegister:UserRegisterState,
    userLogin:UserLoginState
}