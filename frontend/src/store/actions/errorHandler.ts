import { toast } from "react-toastify";

/**
 * General error handling method that returns an error message
 */
export const errorHandler = (error: any) => {
    toast.error(`${error.response && error.response.data.message
      ? error.response.data.message
      : error.message}`)
    // console.log(error);
    
    return error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  };
  