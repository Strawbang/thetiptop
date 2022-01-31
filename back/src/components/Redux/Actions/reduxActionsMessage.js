import { SET_MESSAGE, CLEAR_MESSAGE, SET_MESSAGE_LOGIN, CLEAR_MESSAGE_LOGIN, SET_MESSAGE_REGISTER, CLEAR_MESSAGE_REGISTER } from "../reduxTypes";

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});

export const setMessageLogin = (message) => ({
    type: SET_MESSAGE_LOGIN,
    payload: message,
});
  
export const clearMessageLogin = () => ({
    type: CLEAR_MESSAGE_LOGIN,
});

export const setMessageRegister = (message) => ({
    type: SET_MESSAGE_REGISTER,
    payload: message,
});
  
export const clearMessageRegister = () => ({
    type: CLEAR_MESSAGE_REGISTER,
});