import { combineReducers } from "redux";
import auth from "./Reducers/reduxAuth";
import message from "./Reducers/reduxMessage";
import user from "./Reducers/reduxUser";
import role from "./Reducers/reduxRole";
import ticket from "./Reducers/reduxTicket";

export default combineReducers({
    auth,
    message,
    user,
    role,
    ticket,
});