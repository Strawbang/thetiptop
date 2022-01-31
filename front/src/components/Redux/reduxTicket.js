import {
    TICKETCOUNT_REMAINING_GET_SUCCESS,
    TICKETCOUNT_REMAINING_GET_FAILURE,
	TICKET_UPDATE_FAILURE,
	TICKET_UPDATE_SUCCESS,
} from "./reduxTypes";
  
const initialState = {
	remainingCount: null,
};
  
export default function _(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case TICKETCOUNT_REMAINING_GET_SUCCESS:
			return {
				...state,
				remainingCount: payload.remainingTicketCount,
			};
		case TICKETCOUNT_REMAINING_GET_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		case TICKET_UPDATE_FAILURE:
			return {
				...state,
				error: payload.error,
				successful: false,
			};
		case TICKET_UPDATE_SUCCESS:
			return {
				...state,
				successful: true,
			};
        default:
            return state;
	}
}