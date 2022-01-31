import {
    ROLECOUNT_GET_SUCCESS,
    ROLECOUNT_GET_FAILURE,
    ROLE_GET_ALL_SUCCESS,
    ROLE_GET_ALL_FAILURE,
    ROLE_GET_ONE_SUCCESS,
    ROLE_GET_ONE_FAILURE,
    ROLE_ADD_SUCCESS,
	ROLE_ADD_FAILURE,
	ROLE_ADD_FAILURE_EXISTING_NAME,
    ROLE_UPDATE_SUCCESS,
    ROLE_UPDATE_FAILURE,
    ROLE_UPDATE_FAILURE_EXISTING_NAME,
    ROLE_DELETE_SUCCESS,
    ROLE_DELETE_FAILURE,
} from "../reduxTypes";
import RoleService from "@Api/RoleApi";

const getRoleCount = () => (dispatch) => {
    return RoleService.getRoleCount().then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: ROLECOUNT_GET_FAILURE,
                    payload: { error: data },
                });
            }
            else {
                dispatch({
                    type: ROLECOUNT_GET_SUCCESS,
                    payload: { roleCount: data.count },
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
                type: ROLECOUNT_GET_FAILURE,
                payload: { error: message },
            });

            return Promise.reject();
        }
    );
};

const getRoles = () => (dispatch) => {
    return RoleService.getRoles().then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: ROLE_GET_ALL_FAILURE,
                    payload: { error: data },
                });
            }
            else {
                dispatch({
                    type: ROLE_GET_ALL_SUCCESS,
                    payload: { roles: data.roles },
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
                type: ROLE_GET_ALL_FAILURE,
                payload: { error: message },
            });

            return Promise.reject();
        }
    )
};

const getRolesPagination = (query) => (dispatch) => {
	return RoleService.getRolesPagination(query).then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: ROLE_GET_ALL_FAILURE,
                    payload: { error: data },
                });
            }
            else {
                dispatch({
                    type: ROLE_GET_ALL_SUCCESS,
                    payload: {
                        roles: data.roles.rows,
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
                type: ROLE_GET_ALL_FAILURE,
                payload: { error: message },
            });

            return Promise.reject();
        }
    );
};

const getRole = (id) => (dispatch) => {
	return RoleService.getRole(id).then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: ROLE_GET_ONE_FAILURE,
                    payload: { error: data },
                });
            }
            else {
                dispatch({
                    type: ROLE_GET_ONE_SUCCESS,
                    payload: {
                        role: data,
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
                type: ROLE_GET_ONE_FAILURE,
                payload: { error: message },
            });

            return Promise.reject();
        }
    );
};

const addRole = (body) => (dispatch) => {
	return RoleService.addRole(body).then(
        (data) => {
            if (data.status && data.status === 200) {
                dispatch({
                    type: ROLE_ADD_SUCCESS,
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
                    type: ROLE_ADD_FAILURE_EXISTING_NAME,
                    payload: {
                        error: message,
                        error_type: 'existing_name',
                    },
                });
            }
            else {
                dispatch({
                    type: ROLE_ADD_FAILURE,
                    payload: { error: message },
                });
            }

            return Promise.reject();
        }
    );
};

const updateRole = (id, body) => (dispatch) => {
	return RoleService.updateRole(id, body).then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: ROLE_UPDATE_FAILURE,
                    payload: { error: data },
                });
            }
            else {
                dispatch({
                    type: ROLE_UPDATE_SUCCESS,
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
                    type: ROLE_UPDATE_FAILURE_EXISTING_NAME,
                    payload: {
                        error: message,
                        error_type: 'existing_name',
                    },
                });
            }
            else {
                dispatch({
                    type: ROLE_UPDATE_FAILURE,
                    payload: { error: message },
                });
            }

            return Promise.reject();
        }
    );
};

const deleteRole = (id) => (dispatch) => {
	return RoleService.deleteRole(id).then(
        (data) => {
            if (data.status && data.status !== 200) {
                dispatch({
                    type: ROLE_DELETE_FAILURE,
                    payload: { error: data },
                });
            }
            else {
                dispatch({
                    type: ROLE_DELETE_SUCCESS,
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
                type: ROLE_DELETE_FAILURE,
                payload: { error: message },
            });

            return Promise.reject();
        }
    );
};

export {
    getRoleCount,
    getRoles,
    getRolesPagination,
    getRole,
    addRole,
    updateRole,
    deleteRole,
};
