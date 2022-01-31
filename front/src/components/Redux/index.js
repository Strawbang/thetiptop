import { combineReducers } from "redux";
import auth from "./reduxAuth";
import message from "./reduxMessage";
import ticket from "./reduxTicket";
import token from "./reduxToken";

export default combineReducers({
    auth,
    message,
    ticket,
    token,
});