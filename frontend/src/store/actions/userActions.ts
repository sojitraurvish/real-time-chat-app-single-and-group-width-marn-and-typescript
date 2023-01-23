import axios from "axios";
import { createAction } from "../../utils/reducer.utils";
import { AppThunk } from "../store";
import { UserWithToken, USER_REGISTER_ACTION_TYPE } from "../types";
import { USER_LOGIN_ACTION_TYPE } from "../types/userLogin";
import { errorHandler } from "./errorHandler";

export const register=(
    name:string,
    email:string,
    password:string,
    pic:string
):AppThunk=>async(dispatch)=>{
    try {
        dispatch(createAction(
            USER_REGISTER_ACTION_TYPE.USER_REGISTER_REQUEST
        ))


        //Axios config
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }

        const {data}=await axios.post(
            "/api/users",
            {name,email,password,pic},
            config
        )

        dispatch(createAction(
            USER_REGISTER_ACTION_TYPE.USER_REGISTER_SUCCESS,
            data,
        ));
      
        // Log user in immediately after registration
        dispatch(createAction(
            USER_LOGIN_ACTION_TYPE.USER_LOGIN_SUCCESS,
            data
          ));

        // Save user info to local storage
        localStorage.setItem("userInfo", JSON.stringify(data));


    } catch (error) {
        dispatch({
            type: USER_REGISTER_ACTION_TYPE.USER_REGISTER_FAIL,
            payload: errorHandler(error),
          });
    }
}

/**
 * Action used to log in a user
 */
export const login = (email: string, password: string): AppThunk => async (
    dispatch
  ) => {
    try {
      dispatch(createAction(
        USER_LOGIN_ACTION_TYPE.USER_LOGIN_REQUEST,
      ));
  
      // Axios config
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );
  
      dispatch(createAction(
        USER_LOGIN_ACTION_TYPE.USER_LOGIN_SUCCESS,
        data
      ));
  
      // Save user info to local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_ACTION_TYPE.USER_LOGIN_FAIL,
        payload: errorHandler(error),
      });
    }
  };
  
  /**
   * Action used to log out a user
   */
  export const logout = (): AppThunk => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_REGISTER_ACTION_TYPE.USER_REGISTER_RESET });
    dispatch({ type: USER_LOGIN_ACTION_TYPE.USER_LOGOUT });
   
  };