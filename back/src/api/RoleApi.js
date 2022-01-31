import API from '@Config';

const authHeader = () => {
	const token = localStorage.getItem('token');
	if (token) {
		return { 'x-access-token': token };
	} else {
		return {};
	}
}

const getRoleCount = () => {
    return API.get('role/count', { headers: authHeader() }).then(response => {
        return response.data;
    });
};

const getRoles = () => {
    return API.get('role', { headers: authHeader() }).then(response => {
        return response.data;
    });
};

const getRolesPagination = () => {
    return API.get('role/page', { headers: authHeader() }).then(response => {
        return response.data;
    });
};

const getRole = (id) => {
	return API.get('role/?id=' + id, { headers: authHeader() }).then(response => {
		return response.data;
	})
};

const addRole = (body) => {
	return API.post('role',
        body,
        { headers: authHeader() })
        .then(response => {
		return response.data;
	});
};

const updateRole = (id, body) => {
	return API.put('role/' + id,
		body,
		{ headers: authHeader() })
		.then(response => {
			return response.data;
		});
};

const deleteRole = (id) => {
	return API.delete('role/' + id, { headers: authHeader() }).then(response => {
		return response.data;
	})
};

const RoleApi = {
	authHeader,
	getRoleCount,
	getRoles,
	getRolesPagination,
	getRole,
	addRole,
	updateRole,
	deleteRole,
};

export default RoleApi;
