import axios from "axios";
import { createAction } from "../../utils/reducer.utils";
import { AppThunk } from "../store";
import { LIST_ALL_MESSAGES_ACTION_TYPE, SEND_MESSAGE_ACTION_TYPE } from "../types";
import { errorHandler } from "./errorHandler";

export const sendMessage = (message:string,chatID:string): AppThunk => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch(createAction(
        SEND_MESSAGE_ACTION_TYPE.SEND_MESSAGE_REQUEST
      ));
  
      // Get user info from the userLogin object (from getState)
      const {
        userLogin: { userInfo },
        listAllMessages:{messages},
        createSocket:{socket}
      } = getState();
  
      // Axios config
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
  
      const { data } = await axios.post(`/api/messages`,{ 
        content:message,
        chatId:chatID,
      }, config);
    //   console.log(data);
      
      dispatch(createAction(
        SEND_MESSAGE_ACTION_TYPE.SEND_MESSAGE_SUCCESS,
        data
      ));

      socket?.emit("new_message",data)

      if(!messages?.find((m)=>m._id===data._id)){
        dispatch(createAction(
            LIST_ALL_MESSAGES_ACTION_TYPE.LIST_ALL_MESSAGES_UPEND,
            data
        ))
      }

    //   dispatch(createAction(
    //     CHAT_CREATE_ACTION_TYPE.CHAT_CREATE_SUCCESS,
    //     data
    //   ))
  
    } catch (error) {
      dispatch({
        type: SEND_MESSAGE_ACTION_TYPE.SEND_MESSAGE_FAIL,
        payload: errorHandler(error),
      });
    }
  };

export const listMessages = (chatID:string): AppThunk => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch(createAction(
        LIST_ALL_MESSAGES_ACTION_TYPE.LIST_ALL_MESSAGES_REQUEST
      ));
  
      // Get user info from the userLogin object (from getState)
      const {
        userLogin: { userInfo },
        createSocket:{socket}
      } = getState();
  
      // Axios config
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/messages/${chatID}`, config);
      console.log(data);
      
      dispatch(createAction(
        LIST_ALL_MESSAGES_ACTION_TYPE.LIST_ALL_MESSAGES_SUCCESS,
        data
      ));

      socket!.emit("join chat",chatID)

    //   dispatch(createAction(
    //     CHAT_CREATE_ACTION_TYPE.CHAT_CREATE_SUCCESS,
    //     data
    //   ))
  
    } catch (error) {
      dispatch({
        type: LIST_ALL_MESSAGES_ACTION_TYPE.LIST_ALL_MESSAGES_FAIL,
        payload: errorHandler(error),
      });
    }
  };