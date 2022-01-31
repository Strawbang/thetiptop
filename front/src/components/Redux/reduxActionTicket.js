import {
    TICKETCOUNT_REMAINING_GET_SUCCESS,
    TICKETCOUNT_REMAINING_GET_FAILURE,
    TICKET_UPDATE_FAILURE,
    TICKET_UPDATE_SUCCESS,
} from "./reduxTypes";
import TicketService from "./TicketService";
import WheelService from "../Wheel/wheelService";

const getRemainingTicketCount = () => (dispatch) => {
    return TicketService.getRemainingTicketCount().then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: TICKETCOUNT_REMAINING_GET_FAILURE,
                    payload: { error: data },
                });
            }
            else {
                dispatch({
                    type: TICKETCOUNT_REMAINING_GET_SUCCESS,
                    payload: { remainingTicketCount: data.count },
                });
            }
            
            return Promise.resolve();
        },
        (error) => {
            const message =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();

            dispatch({
                type: TICKETCOUNT_REMAINING_GET_FAILURE,
                payload: { error: message },
            });

            return Promise.reject();
        }
    );
};
const updateTicket = (number) => (dispatch) => {
    return WheelService.updateTicket(number).then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: TICKET_UPDATE_FAILURE,
                    payload: {
                        error: {
                            message: data.data.error.message,
                            text: data.data.error.text,
                        }
                    },
                });
            }
            else {
                dispatch({
                    type: TICKET_UPDATE_SUCCESS,
                    payload: {
                        text: data.text,
                        message: data.message ? data.message : '',
                    }
                });
            }
            
            return Promise.resolve();
        },
        (error) => {
            const message =
                    (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                    error.message ||
                    error.toString();

            dispatch({
                type: TICKET_UPDATE_FAILURE,
                payload: {
                    error: {
                        message: message,
                        text: error.response.data.text,
                    }
                },
            });

            return Promise.reject();
        });
};

export {
	getRemainingTicketCount,
    updateTicket,
};