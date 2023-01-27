import axios from "axios";
import { toast } from "react-toastify";
import { createAction } from "../../utils/reducer.utils";
import { AppThunk } from "../store";
import { ADD_USER_TO_GROUP_ACTION_TYPE, CHAT_CREATE_ACTION_TYPE, CHAT_LIST_ACTION_TYPE, DELETE_USER_TO_GROUP_ACTION_TYPE, GROP_CHAT_CREATE_ACTION_TYPE, GROP_NAME_UPDATE_ACTION_TYPE, User } from "../types";
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
      dispatch(createAction(
        CHAT_LIST_ACTION_TYPE.CHAT_LIST_FAIL,
        errorHandler(error),
      ));
    }
  };

export const groupChatCreate = (groupName:string,users:User[]): AppThunk => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch(createAction(
        GROP_CHAT_CREATE_ACTION_TYPE.GROP_CHAT_CREATE_REQUEST
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
  
      const { data } = await axios.post(`/api/chats/group`,{
        name:groupName,
        users:JSON.stringify(users.map((u)=>u._id))
      }, config);
    //   console.log(data);

  
    if(!chatList?.find((c)=>c._id===data._id)){
        dispatch(createAction(
            CHAT_LIST_ACTION_TYPE.CHAT_LIST_UPEND,
            data
        ))
      }
      
      dispatch(createAction(
        GROP_CHAT_CREATE_ACTION_TYPE.GROP_CHAT_CREATE_SUCCESS,
        data
      ));
  
    } catch (error) {
      dispatch({
        type: GROP_CHAT_CREATE_ACTION_TYPE.GROP_CHAT_CREATE_FAIL,
        payload: errorHandler(error),
      });
    }
  };


export const groupNameUpdate = (chatID:string,groupName:string): AppThunk => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch(createAction(
        GROP_NAME_UPDATE_ACTION_TYPE.GROP_NAME_UPDATE_REQUEST
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
  
      const { data } = await axios.put(`/api/chats/rename`,{
        chatId:chatID,
        chatName:groupName,
      }, config);
    //   console.log(data);
      
      dispatch(createAction(
        GROP_NAME_UPDATE_ACTION_TYPE.GROP_NAME_UPDATE_SUCCESS,
        data
      ));

      dispatch(createAction(
        CHAT_CREATE_ACTION_TYPE.CHAT_CREATE_SUCCESS,
        data
      ))
  
    } catch (error) {
      dispatch({
        type: GROP_NAME_UPDATE_ACTION_TYPE.GROP_NAME_UPDATE_FAIL,
        payload: errorHandler(error),
      });
    }
  };

export const addUserToGroup = (chatID:string,userID:string): AppThunk => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch(createAction(
        ADD_USER_TO_GROUP_ACTION_TYPE.ADD_USER_TO_GROUP_REQUEST
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
  
      const { data } = await axios.put(`/api/chats/groupadd`,{
        chatId:chatID,
        userId:userID,
      }, config);
    //   console.log(data);
      
      dispatch(createAction(
        ADD_USER_TO_GROUP_ACTION_TYPE.ADD_USER_TO_GROUP_SUCCESS,
        data
      ));

      dispatch(createAction(
        CHAT_CREATE_ACTION_TYPE.CHAT_CREATE_SUCCESS,
        data
      ))
  
    } catch (error) {
      dispatch({
        type: ADD_USER_TO_GROUP_ACTION_TYPE.ADD_USER_TO_GROUP_FAIL,
        payload: errorHandler(error),
      });
    }
  };

export const deleteUserToGroup = (chatID:string,userID:string): AppThunk => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch(createAction(
        DELETE_USER_TO_GROUP_ACTION_TYPE.DELETE_USER_TO_GROUP_REQUEST
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
  
      const { data } = await axios.put(`/api/chats/groupremove`,{
        chatId:chatID,
        userId:userID,
      }, config);
    //   console.log(data);
      
      dispatch(createAction(
        DELETE_USER_TO_GROUP_ACTION_TYPE.DELETE_USER_TO_GROUP_SUCCESS,
        data
      ));

      dispatch(createAction(
        CHAT_CREATE_ACTION_TYPE.CHAT_CREATE_SUCCESS,
        data
      ))
  
    } catch (error) {
      dispatch({
        type: DELETE_USER_TO_GROUP_ACTION_TYPE.DELETE_USER_TO_GROUP_FAIL,
        payload: errorHandler(error),
      });
    }
  };