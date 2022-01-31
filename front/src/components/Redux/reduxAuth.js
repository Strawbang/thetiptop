import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_SUCCESS,
	USER_FAIL,
	LOGOUT,
	DELETE,
} from "./reduxTypes";

let user;
if (typeof window !== 'undefined') {
	user = localStorage.getItem("token");
}
  
const initialState = user
	? { isLoggedIn: true, user }
	: { isLoggedIn: false, user: null };
  
export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
	  	case REGISTER_SUCCESS:
			return {
				...state,
				isLoggedIn: false,
				isRegistered: true,
				isMailSent: payload.isMailSent,
				error: null,
			};
		case REGISTER_FAIL:
			return {
				...state,
				isLoggedIn: false,
				isRegistered: false,
				isMailSent: null,
				error: payload.error
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				accessToken: payload.accessToken,
				user: payload.user,
				error: null,
			};
		case LOGIN_FAIL:
			return {
				...state,
				isLoggedIn: false,
				user: null,
				error: payload.error,
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
				accessToken: null,
				error: null
			};
		case DELETE:
			localStorage.removeItem('token');
			return {
				...state,
				isLoggedIn: false,
				user: null,
				accessToken: null,
				error: null
			};
		default:
			return state;
	}
}