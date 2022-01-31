import API from '@Config';

const authHeader = () => {
	const token = localStorage.getItem('token');
	if (token) {
		return { 'x-access-token': token };
	} else {
		return {};
	}
}

const getTicketCount = () => {
    return API.get('ticket/count', { headers: authHeader() }).then(response => {
        return response.data;
    });
};

const getPrintedTicketCount = () => {
	return API.get('ticket/count?printed=1', { headers: authHeader() }).then(response => {
        return response.data;
    });
};

const getClaimedTicketCount = () => {
	return API.get('ticket/count?claimed=1', { headers: authHeader() }).then(response => {
        return response.data;
    });
};

const getTickets = () => {
    return API.get('ticket', { headers: authHeader() }).then(response => {
        return response.data;
    });
};

const getTicketsPagination = (query) => {
	const limit = query.limit ? query.limit : 20;
	const offset = query.offset ? query.offset : 0;
	let queryStr = "?limit=" + limit + "&offset=" + offset;

	queryStr += query.printed ? "printed=" + query.printed : "" ;
	queryStr += query.claimed ? "claimed=" + query.claimed : "" ;

	return API.get('ticket/page' + queryStr, { headers: authHeader() }).then(response => {
        return response.data;
    });
};

const getTicket = (id) => {
	return API.get('ticket/?id=' + id, { headers: authHeader() }).then(response => {
		return response.data;
	})
};

const updateTicket = (id, body) => {
	return API.put('ticket/' + id,
		body,
		{ headers: authHeader() })
		.then(response => {
		return response.data;
	})
};

const deleteTicket = (id) => {
	return API.delete('ticket/' + id, { headers: authHeader() }).then(response => {
		return response.data;
	})
};

const TicketApi = {
	authHeader,
	getTicketCount,
	getTickets,
	getPrintedTicketCount,
	getClaimedTicketCount,
	getTicketsPagination,
	getTicket,
	updateTicket,
	deleteTicket,
};

export default TicketApi;
