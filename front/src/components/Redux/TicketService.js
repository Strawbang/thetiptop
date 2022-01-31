import API from '../../config';

const authHeader = () => {
	const token = localStorage.getItem('token');
	if (token) {
		return { 'x-access-token': token };
	} else {
		return {};
	}
}

// const getRemainingTicketCount = () => {
// 	return API.get('ticket/count?printed=0', { headers: authHeader() }).then(response => {
//         return response.data;
//     });
// };

const TicketService = {
	authHeader,
	// getRemainingTicketCount,
};

export default TicketService;
