import API from '@Config';

const authHeader = () => {
	const token = localStorage.getItem('token');
	if (token) {
		return { 'x-access-token': token };
	} else {
		return {};
	}
};

const getUser = () => {
    return API.get('profile', {headers: authHeader()}).then((response) => {
        return response.data;
    });
};

const updateUser = (user) =>{
	return API.put('user', {user}, {headers: authHeader()}).then((response) => {
		return response.data
	})
};

const logOut = ()=>{
    localStorage.removeItem('token');
};

const ProfileApi = {
    authHeader,
    getUser,
    updateUser,
    logOut,
};

export default ProfileApi;
