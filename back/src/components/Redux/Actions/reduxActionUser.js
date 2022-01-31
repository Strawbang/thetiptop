import {
    USERCOUNT_GET_SUCCESS,
    USERCOUNT_GET_FAILURE,
    USER_GET_ALL_SUCCESS,
    USER_GET_ALL_FAILURE,
    USER_GET_ONE_SUCCESS,
    USER_GET_ONE_FAILURE,
    USER_ADD_SUCCESS,
    USER_ADD_FAILURE,
    USER_ADD_FAILURE_EXISTING_EMAIL,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAILURE,
    USER_UPDATE_FAILURE_EXISTING_EMAIL,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAILURE,
    USERCOUNT_CLIENT_GET_FAILURE,
    USERCOUNT_CLIENT_GET_SUCCESS,
    USERCOUNT_NEWSLETTER_GET_FAILURE,
    USERCOUNT_NEWSLETTER_GET_SUCCESS,
} from "../reduxTypes";
import UserService from "@Api/UserApi";

const getUserCount = () => (dispatch) => {
    return UserService.getUserCount().then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: USERCOUNT_GET_FAILURE,
                    payload: { error: data },
                });
            }
            else {
                dispatch({
                    type: USERCOUNT_GET_SUCCESS,
                    payload: { userCount: data.count },
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
                type: USERCOUNT_GET_FAILURE,
                payload: { error: message },
            });

            return Promise.reject();
        }
    );
};

const getClientsCount = () => (dispatch) => {
    return UserService.getClientsCount().then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: USERCOUNT_CLIENT_GET_FAILURE,
                    payload: { error: data },
                });
            }
            else {
                dispatch({
                    type: USERCOUNT_CLIENT_GET_SUCCESS,
                    payload: { clientsCount: data.count },
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
                type: USERCOUNT_CLIENT_GET_FAILURE,
                payload: { error: message },
            });

            return Promise.reject();
        }
    );
};

const getNewsletterUserCount = () => (dispatch) => {
    return UserService.getNewsletterUserCount().then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: USERCOUNT_NEWSLETTER_GET_FAILURE,
                    payload: { error: data },
                });
            }
            else {
                dispatch({
                    type: USERCOUNT_NEWSLETTER_GET_SUCCESS,
                    payload: { newsletterCount: data.count },
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
                type: USERCOUNT_NEWSLETTER_GET_FAILURE,
                payload: { error: message },
            });

            return Promise.reject();
        }
    );
};

const getUsers = () => (dispatch) => {
    return UserService.getUsers().then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: USER_GET_ALL_FAILURE,
                    payload: { error: data },
                });
            }
            else {
                dispatch({
                    type: USER_GET_ALL_SUCCESS,
                    payload: { users: data.users },
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
                type: USER_GET_ALL_FAILURE,
                payload: { error: message },
            });

            return Promise.reject();
        }
    );
};

const getUsersPagination = (query) => (dispatch) => {
	return UserService.getUsersPagination(query).then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: USER_GET_ALL_FAILURE,
                    payload: { error: data },
                });
            }
            else {
                dispatch({
                    type: USER_GET_ALL_SUCCESS,
                    payload: {
                        users: data.users.rows,
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
                type: USER_GET_ALL_FAILURE,
                payload: { error: message },
            });

            return Promise.reject();
        }
    );
};

const getUser = (id) => (dispatch) => {
    return UserService.getUser(id).then(
      	(data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: USER_GET_ONE_FAILURE,
                    payload: { error: data },
                });
                return Promise.resolve();
            }
            else {
                dispatch({
                    type: USER_GET_ONE_SUCCESS,
                    payload: { user: data },
                });
                return Promise.resolve();
            }
      	},
      	(error) => {
        	const message =
          		(error.response &&
            	error.response.data &&
            	error.response.data.message) ||
          		error.message ||
          		error.toString();

        	dispatch({
          		type: USER_GET_ONE_FAILURE,
          		payload: message,
        	});
  
        	return Promise.reject();
      	}
    );
};

const addUser = (body) => (dispatch) => {
    body = { user: body };
	return UserService.addUser(body).then(
        (data) => {
            if (data.status && data.status === 200) {
                dispatch({
                    type: USER_ADD_SUCCESS,
                    payload: { add: true },
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
            
            if (error.response.status && error.response.status === 422) {
                dispatch({
                    type: USER_ADD_FAILURE_EXISTING_EMAIL,
                    payload: {
                        error: message,
                        error_type: 'existing_email',
                    },
                });
            }
            else {
                dispatch({
                    type: USER_ADD_FAILURE,
                    payload: { error: message },
                });
            }

            return Promise.reject();
        }
    );
};

const updateUser = (id, body) => (dispatch) => {
	return UserService.updateUser(id, body).then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: USER_UPDATE_FAILURE,
                    payload: { error: data },
                });
            }
            else {
                dispatch({
                    type: USER_UPDATE_SUCCESS,
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

            if (error.response.status && error.response.status === 422) {
                dispatch({
                    type: USER_UPDATE_FAILURE_EXISTING_EMAIL,
                    payload: {
                        error: message,
                        error_type: 'existing_email',
                    },
                });
            }
            else {
                dispatch({
                    type: USER_UPDATE_FAILURE,
                    payload: { error: message },
                });
            }

            return Promise.reject();
        }
    );
};

const deleteUser = (id) => (dispatch) => {
	return UserService.deleteUser(id).then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: USER_DELETE_FAILURE,
                    payload: { error: data },
                });
            }
            else {
                dispatch({
                    type: USER_DELETE_SUCCESS,
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
                type: USER_DELETE_FAILURE,
                payload: { error: message },
            });

            return Promise.reject();
        }
    );
};

export {
    getUserCount,
    getUsers,
    getUsersPagination,
    getUser,
    updateUser,
    deleteUser,
    getClientsCount,
    getNewsletterUserCount,
    addUser,
}
