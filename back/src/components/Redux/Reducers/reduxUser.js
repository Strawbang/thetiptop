import {
    USERCOUNT_GET_FAILURE,
	USERCOUNT_GET_SUCCESS,
	USER_GET_ALL_FAILURE,
	USER_GET_ALL_SUCCESS,
	USER_GET_ONE_FAILURE,
	USER_GET_ONE_SUCCESS,
	USER_ADD_SUCCESS,
	USER_ADD_FAILURE,
	USER_ADD_FAILURE_EXISTING_EMAIL,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAILURE,
	USER_UPDATE_FAILURE_EXISTING_EMAIL,
	USER_DELETE_FAILURE,
	USER_DELETE_SUCCESS,
	USERCOUNT_NEWSLETTER_GET_FAILURE,
	USERCOUNT_NEWSLETTER_GET_SUCCESS,
	USERCOUNT_CLIENT_GET_FAILURE,
	USERCOUNT_CLIENT_GET_SUCCESS,
} from "../reduxTypes";
  
const initialState = {
	count: null,
	rows: null,
	currentPage: null,
	add: null,
	update: null,
	bin: null,
	stats: null,
};
  
export default function _(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
	  	case USERCOUNT_GET_SUCCESS:
			return {
				...state,
				count: payload.userCount,
			};
		case USERCOUNT_GET_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		case USER_GET_ALL_SUCCESS:
			return {
				...state,
				rows: payload.users,
				currentPage: payload.currentPage,
			};
		case USER_GET_ALL_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		case USER_GET_ONE_SUCCESS:
			return {
				...state,
				edit: payload.user,
			};
		case USER_GET_ONE_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		case USER_ADD_SUCCESS:
			return {
				...state,
				add: payload.add,
			};
		case USER_ADD_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		case USER_ADD_FAILURE_EXISTING_EMAIL:
			return {
				...state,
				error: payload.error,
				error_type: payload.error_type,
			};
		case USER_UPDATE_SUCCESS:
			return {
				...state,
				update: payload.update,
			};
		case USER_UPDATE_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		case USER_UPDATE_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		case USER_UPDATE_FAILURE_EXISTING_EMAIL:
			return {
				...state,
				error: payload.error,
				error_type: payload.error_type,
			};
		case USER_DELETE_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		case USERCOUNT_CLIENT_GET_SUCCESS:
			return {
				...state,
				stats: {
					...state.stats,
					clients: payload.clientsCount,
				},
			};
		case USERCOUNT_CLIENT_GET_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		case USERCOUNT_NEWSLETTER_GET_SUCCESS:
			return {
				...state,
				stats: {
					...state.stats,
					newsletter: payload.newsletterCount,
				},
			};
		case USERCOUNT_NEWSLETTER_GET_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		default:
			return state;
	}
}