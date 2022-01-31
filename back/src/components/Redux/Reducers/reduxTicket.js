import {
    TICKETCOUNT_GET_FAILURE,
	TICKETCOUNT_GET_SUCCESS,
    TICKETCOUNT_PRINTED_GET_FAILURE,
	TICKETCOUNT_PRINTED_GET_SUCCESS,
    TICKETCOUNT_CLAIMED_GET_FAILURE,
	TICKETCOUNT_CLAIMED_GET_SUCCESS,
	TICKET_GET_ALL_FAILURE,
	TICKET_GET_ALL_SUCCESS,
	TICKET_GET_ONE_FAILURE,
	TICKET_GET_ONE_SUCCESS,
	TICKET_UPDATE_FAILURE,
	TICKET_UPDATE_SUCCESS,
	TICKET_DELETE_FAILURE,
	TICKET_DELETE_SUCCESS,
} from "../reduxTypes";
  
const initialState = {
	count: null,
	printedCount: null,
	claimedCount: null,
	rows: null,
	currentPage: null,
	bin: null,
	stats: null,
};
  
export default function _(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
	  	case TICKETCOUNT_GET_SUCCESS:
			return {
				...state,
				count: payload.ticketCount,
			};
		case TICKETCOUNT_GET_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		case TICKETCOUNT_PRINTED_GET_SUCCESS:
			return {
				...state,
				stats: {
					...state.stats,
					printed: payload.printedTicketCount,
				},
			};
		case TICKETCOUNT_PRINTED_GET_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		case TICKETCOUNT_CLAIMED_GET_SUCCESS:
			return {
				...state,
				stats: {
					...state.stats,
					claimed: payload.claimedTicketCount,
				},
			};
		case TICKETCOUNT_CLAIMED_GET_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		case TICKET_GET_ALL_SUCCESS:
			return {
				...state,
				rows: payload.tickets,
				currentPage: payload.currentPage,
			};
		case TICKET_GET_ALL_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		case TICKET_GET_ONE_SUCCESS:
			return {
				...state,
				edit: payload.ticket,
			};
		case TICKET_GET_ONE_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		case TICKET_UPDATE_SUCCESS:
			return {
				...state,
				update: payload.update,
			};
		case TICKET_UPDATE_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		case TICKET_DELETE_SUCCESS:
			return {
				...state,
				bin: payload.bin,
			};
		case TICKET_DELETE_FAILURE:
			return {
				...state,
				error: payload.error,
			};
		default:
			return state;
	}
}