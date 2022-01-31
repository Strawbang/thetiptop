import API from '../../config';

const authHeader = () => {
	const token = localStorage.getItem('token');
	if (token) {
		return { 'x-access-token': token };
	} else {
		return {};
	}
}

const getUser = () => {
    return API.get('profile', {headers: authHeader()}).then((response) => {
        return response.data
    })
}

const updateUser = (user) =>{
	return API.put('user', user, {headers: authHeader()}).then((response) => {
		return response.data
	})
}

const deleteUser = () =>{
	API.delete('user', {headers: authHeader()}).then((response) => {
		API.get('/logout');
		return response.data
	})
}
const getUserTickets = (userId) =>{
	return API.get('user/tickets?id=' + userId, {headers: authHeader()}).then((response) => {
		return response.data
	})
};

const updatePassword = (userData) =>{
	return API.post('user/passwordUpdate', userData, {headers: authHeader()}).then((response) => {
		return response.data
	})
};


export default {
    authHeader,
    getUser,
	updateUser,
	deleteUser,
	getUserTickets,
	updatePassword,
};