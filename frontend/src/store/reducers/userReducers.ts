import { UserLoginAction, UserLoginState, USER_LOGIN_ACTION_TYPE } from "../types/userLogin";
import { UserRegisterAction, UserRegisterState, USER_REGISTER_ACTION_TYPE } from "../types/userRegister";


export const userRegisterReducer = (state:UserRegisterState = {}, action:UserRegisterAction):UserRegisterState => {
    const {type}=action;

    if(type===USER_REGISTER_ACTION_TYPE.USER_REGISTER_REQUEST){
        return {...state,loading:true}
    }
    if(type===USER_REGISTER_ACTION_TYPE.USER_REGISTER_SUCCESS){
        return {...state,loading:false,userInfo:action.payload}
    }
    if(type===USER_REGISTER_ACTION_TYPE.USER_REGISTER_FAIL){
        return {...state,loading:false,error:action.payload}
    }
    if(type===USER_REGISTER_ACTION_TYPE.USER_REGISTER_RESET){
        return {}
    }
    return state;
  };

export const userLoginReducer=(state:UserLoginState={},action:UserLoginAction):UserLoginState=>{
    const {type}=action;

    if(type===USER_LOGIN_ACTION_TYPE.USER_LOGIN_REQUEST){
        return {...state,loading:true}
    }
    if(type===USER_LOGIN_ACTION_TYPE.USER_LOGIN_SUCCESS){
        return {...state,loading:false,userInfo:action.payload}
    }
    if(type===USER_LOGIN_ACTION_TYPE.USER_LOGIN_FAIL){
        return {...state,loading:false,error:action.payload}
    }
    if(type===USER_LOGIN_ACTION_TYPE.USER_LOGOUT){
        return {}
    }
    return state;
}