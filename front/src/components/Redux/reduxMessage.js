import { SET_MESSAGE, CLEAR_MESSAGE, SET_MESSAGE_LOGIN, CLEAR_MESSAGE_LOGIN, SET_MESSAGE_REGISTER, CLEAR_MESSAGE_REGISTER } from "./reduxTypes";

const initialState = {};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_MESSAGE:
            return { message: payload };

        case CLEAR_MESSAGE:
            return { message: "" };

        case SET_MESSAGE_LOGIN:
            return { message: {type: "login", text: payload }};
        
        case CLEAR_MESSAGE_LOGIN:
            return { message: "" };

        case SET_MESSAGE_REGISTER:
            return { message: {type: "register", text: payload } };
    
        case CLEAR_MESSAGE_REGISTER:
            return { message: "" };

        default:
            return state;
    }
}