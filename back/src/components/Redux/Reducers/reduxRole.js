import {
    ROLECOUNT_GET_FAILURE,
	ROLECOUNT_GET_SUCCESS,
    ROLE_GET_ALL_FAILURE,
	ROLE_GET_ALL_SUCCESS,
    ROLE_GET_ONE_FAILURE,
	ROLE_GET_ONE_SUCCESS,
	ROLE_ADD_SUCCESS,
	ROLE_ADD_FAILURE,
	ROLE_ADD_FAILURE_EXISTING_NAME,
	ROLE_UPDATE_FAILURE,
	ROLE_UPDATE_FAILURE_EXISTING_NAME,
	ROLE_UPDATE_SUCCESS,
	ROLE_DELETE_FAILURE,
	ROLE_DELETE_SUCCESS,
} from "../reduxTypes";
  
const initialState = {
	count: null,
	rows: null,
	currentPage: null,
	update: null,
	bin: null,
};
  
export default function _(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
	  	case ROLECOUNT_GET_SUCCESS:
			return {
				...state,
				count: payload.roleCount,
			};
		case ROLECOUNT_GET_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		case ROLE_GET_ALL_SUCCESS:
			return {
				...state,
				rows: payload.roles,
				currentPage: payload.currentPage,
			};
		case ROLE_GET_ALL_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		case ROLE_GET_ONE_SUCCESS:
			return {
				...state,
				edit: payload.role,
			};
		case ROLE_GET_ONE_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		case ROLE_ADD_SUCCESS:
			return {
				...state,
				update: payload.update,
			};
		case ROLE_ADD_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		case ROLE_ADD_FAILURE_EXISTING_NAME:
			return {
				...state,
				error: payload.error,
				error_type: payload.error_type,
			};
		case ROLE_UPDATE_SUCCESS:
			return {
				...state,
				update: payload.update,
			};
		case ROLE_UPDATE_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		case ROLE_UPDATE_FAILURE_EXISTING_NAME:
			return {
				...state,
				error: payload.error,
				error_type: payload.error_type,
			};
		case ROLE_DELETE_SUCCESS:
			return {
				...state,
				bin: payload.bin,
			};
		case ROLE_DELETE_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		default:
			return state;
	}
}
