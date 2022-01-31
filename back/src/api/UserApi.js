import API from '@Config';

const authHeader = () => {
	const token = localStorage.getItem('token');
	if (token) {
		return { 'x-access-token': token };
	} else {
		return {};
	}
}

const getUserCount = () => {
    return API.get('user/count', { headers: authHeader() }).then(response => {
        return response.data;
    });
};

const getNewsletterUserCount = () => {
    return API.get('user/count?newsletter=1', { headers: authHeader() }).then(response => {
        return response.data;
    });
};

const getClientsCount = () => {
    return API.get('user/count?clients=1', { headers: authHeader() }).then(response => {
        return response.data;
    });
};

const getUsers = () => {
    return API.get('user', { headers: authHeader() }).then(response => {
        return response.data;
    });
};

const getUsersPagination = (query) => {
    const limit = query.limit ? query.limit : 20;
	const offset = query.offset ? query.offset : 0;
	let queryStr = "?limit=" + limit + "&offset=" + offset;

    return API.get('user/page' + queryStr, { headers: authHeader() }).then(response => {
        return response.data;
    });
};

const getUser = (id) => {
    return API.get('user/?id=' + id, { headers: authHeader() }).then(response => {
        return response.data;
    });
};

const addUser = (body) => {
	return API.post('user',
        body,
        { headers: authHeader() })
        .then(response => {
		return response.data;
	});
};

const updateUser = (id, body) => {
    return API.put('user/' + id,
		body,
		{ headers: authHeader() })
		.then(response => {
        return response.data;
    });
};

const deleteUser = (id) => {
	return API.delete('user/' + id, { headers: authHeader() }).then(response => {
		return response.data;
	});
};

const UserApi = {
	authHeader,
	getUserCount,
	getUsers,
	getUsersPagination,
	getUser,
	updateUser,
	deleteUser,
    getClientsCount,
    getNewsletterUserCount,
    addUser,
};

export default UserApi;
