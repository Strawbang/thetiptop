import {
    TOKEN_CONSUME_SUCCESS,
    TOKEN_CONSUME_FAILURE,
} from "./reduxTypes";
  
const initialState = {
	token: null,
    successful: null,
    error: null,
};
  
export default function _(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
        case TOKEN_CONSUME_SUCCESS:
            return {
                ...state,
                token: null,
                successful: true,
                error: null,
            };
        case TOKEN_CONSUME_FAILURE:
            return {
                ...state,
                successful: false,
                error: payload.error,
            };
        default:
            return state;
	}
}