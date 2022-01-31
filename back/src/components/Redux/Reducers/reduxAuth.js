import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_SUCCESS,
	USER_FAIL,
	LOGOUT,
} from "../reduxTypes";

let user;
if (typeof window !== 'undefined') {
	user = localStorage.getItem("token");
}
  
const initialState = user
	? { isLoggedIn: true, user }
	: { isLoggedIn: false, user: null };
  
export default function _(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
	  	case REGISTER_SUCCESS:
			return {
				...state,
				isLoggedIn: false,
			};
		case REGISTER_FAIL:
			return {
				...state,
				isLoggedIn: false,
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				user: payload.user,
			};
		case LOGIN_FAIL:
			return {
				...state,
				isLoggedIn: false,
				error: payload.data,
			};
		case USER_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				user: payload.user,
			};
		case USER_FAIL:
			localStorage.removeItem("token");
			return {
				...state,
				isLoggedIn: false,
				user: null,
			};
		case LOGOUT:
			return {
				...state,
				isLoggedIn: false,
				user: null,
			};
		default:
			return state;
	}
}