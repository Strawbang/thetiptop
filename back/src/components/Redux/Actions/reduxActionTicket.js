import {
    TICKETCOUNT_GET_SUCCESS,
    TICKETCOUNT_GET_FAILURE,
    TICKETCOUNT_PRINTED_GET_SUCCESS,
    TICKETCOUNT_PRINTED_GET_FAILURE,
    TICKETCOUNT_CLAIMED_GET_SUCCESS,
    TICKETCOUNT_CLAIMED_GET_FAILURE,
    TICKET_GET_ALL_SUCCESS,
    TICKET_GET_ALL_FAILURE,
    TICKET_GET_ONE_SUCCESS,
    TICKET_GET_ONE_FAILURE,
    TICKET_UPDATE_SUCCESS,
    TICKET_UPDATE_FAILURE,
    TICKET_DELETE_SUCCESS,
    TICKET_DELETE_FAILURE,
} from "../reduxTypes";
import TicketService from "@Api/TicketApi";

const getTicketCount = () => (dispatch) => {
    return TicketService.getTicketCount().then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: TICKETCOUNT_GET_FAILURE,
                    payload: { error: data },
                });
            }
            else {
                dispatch({
                    type: TICKETCOUNT_GET_SUCCESS,
                    payload: { ticketCount: data.count },
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
                type: TICKETCOUNT_GET_FAILURE,
                payload: { error: message },
            });

            return Promise.reject();
        }
    );
};

const getPrintedTicketCount = () => (dispatch) => {
    return TicketService.getPrintedTicketCount().then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: TICKETCOUNT_PRINTED_GET_FAILURE,
                    payload: { error: data },
                });
            }
            else {
                dispatch({
                    type: TICKETCOUNT_PRINTED_GET_SUCCESS,
                    payload: { printedTicketCount: data.count },
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
                type: TICKETCOUNT_PRINTED_GET_FAILURE,
                payload: { error: message },
            });

            return Promise.reject();
        }
    );
};

const getClaimedTicketCount = () => (dispatch) => {
    return TicketService.getClaimedTicketCount().then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: TICKETCOUNT_CLAIMED_GET_FAILURE,
                    payload: { error: data },
                });
            }
            else {
                dispatch({
                    type: TICKETCOUNT_CLAIMED_GET_SUCCESS,
                    payload: { claimedTicketCount: data.count },
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
                type: TICKETCOUNT_CLAIMED_GET_FAILURE,
                payload: { error: message },
            });

            return Promise.reject();
        }
    );
};

const getTicketsPagination = (query) => (dispatch, getState) => {
	return TicketService.getTicketsPagination(query).then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: TICKET_GET_ALL_FAILURE,
                    payload: { error: data },
                });
            }
            else {
                dispatch({
                    type: TICKET_GET_ALL_SUCCESS,
                    payload: {
                        tickets: data.tickets.rows,
                        currentPage: query.page,
                    },
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
                type: TICKET_GET_ALL_FAILURE,
                payload: { error: message },
            });

            return Promise.reject();
        }
    );
};

const getTicket = (id) => (dispatch) => {
	return TicketService.getTicket(id).then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: TICKET_GET_ONE_FAILURE,
                    payload: { error: data },
                });
            }
            else {
                dispatch({
                    type: TICKET_GET_ONE_SUCCESS,
                    payload: {
                        ticket: data,
                    },
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
                type: TICKET_GET_ONE_FAILURE,
                payload: { error: message },
            });

            return Promise.reject();
        }
    );
};

const updateTicket = (id, body) => (dispatch) => {
	return TicketService.updateTicket(id, body).then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: TICKET_UPDATE_FAILURE,
                    payload: { error: data },
                });
            }
            else {
                dispatch({
                    type: TICKET_UPDATE_SUCCESS,
                    payload: { update: true },
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
                payload: { error: message },
            });

            return Promise.reject();
        }
    );
};

const deleteTicket = (id) => (dispatch) => {
	return TicketService.deleteTicket(id).then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: TICKET_DELETE_FAILURE,
                    payload: { error: data },
                });
            }
            else {
                dispatch({
                    type: TICKET_DELETE_SUCCESS,
                    payload: { bin: true },
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
                type: TICKET_DELETE_FAILURE,
                payload: { error: message },
            });

            return Promise.reject();
        }
    );
};

export {
    getTicketCount,
    getPrintedTicketCount,
    getClaimedTicketCount,
    getTicketsPagination,
    getTicket,
    updateTicket,
    deleteTicket,
};
