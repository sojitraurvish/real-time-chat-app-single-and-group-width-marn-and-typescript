import axios from "axios";
import { createAction } from "../../utils/reducer.utils";
import { AppThunk } from "../store";
import { CHAT_CREATE_ACTION_TYPE, CHAT_LIST_ACTION_TYPE } from "../types";
import { errorHandler } from "./errorHandler";

export const chatCreate = (userId:string): AppThunk => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch(createAction(
        CHAT_CREATE_ACTION_TYPE.CHAT_CREATE_REQUEST
      ));
  
      // Get user info from the userLogin object (from getState)
      const {
        userLogin: { userInfo },
        chatList:{chatList}
      } = getState();
  
      // Axios config
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
  
      const { data } = await axios.post(`/api/chats`,{userId}, config);

    
      if(!chatList?.find((c)=>c._id===data._id)){
        dispatch(createAction(
            CHAT_LIST_ACTION_TYPE.CHAT_LIST_UPEND,
            data
        ))
      }

      dispatch(createAction(
        CHAT_CREATE_ACTION_TYPE.CHAT_CREATE_SUCCESS,
        data
      ));
  
    } catch (error) {
      dispatch({
        type: CHAT_CREATE_ACTION_TYPE.CHAT_CREATE_FAIL,
        payload: errorHandler(error),
      });
    }
  };
  
export const chatList = (): AppThunk => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch(createAction(
        CHAT_LIST_ACTION_TYPE.CHAT_LIST_REQUEST
      ));
  
      // Get user info from the userLogin object (from getState)
      const {
        userLogin: { userInfo },
      } = getState();
  
      // Axios config
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/chats`, config);
    //   console.log(data);
      
      dispatch(createAction(
        CHAT_LIST_ACTION_TYPE.CHAT_LIST_SUCCESS,
        data
      ));
  
    } catch (error) {
      dispatch({
        type: CHAT_LIST_ACTION_TYPE.CHAT_LIST_FAIL,
        payload: errorHandler(error),
      });
    }
  };