import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_SUCCESS,
    USER_FAIL,
    LOGOUT,
    DELETE,
    SET_MESSAGE,
    SET_MESSAGE_LOGIN,
    SET_MESSAGE_REGISTER,
} from "./reduxTypes";
import signinService from "../Signin/signinService";
import signupService from "../Signup/signupService";
import profilService from "../Profil/profilService";
// import logoutService from '../Logout/logoutService';
import logoutService from '../Logout/logoutService';
  

// export const register = (email, firstname, lastname, profession, phone, password, passwordConfirm, token) => (dispatch) => {
//     return AuthService.register(email, firstname, lastname, profession, phone, password, passwordConfirm, token).then(
//       	(response) => {
// 			dispatch({
// 				type: REGISTER_SUCCESS,
// 			});
  
// 			dispatch({
// 				type: SET_MESSAGE_REGISTER,
// 				payload: response.data.message,
// 			});
  
//         	return Promise.resolve();
//       	},
//       	(error) => {
//         	const message =
//           		(error.response &&
// 				error.response.data &&
// 				error.response.data.message) ||
// 				error.message ||
// 				error.toString();
  
// 			dispatch({
// 				type: REGISTER_FAIL,
// 			});
  
// 			dispatch({
// 				type: SET_MESSAGE_REGISTER,
// 				payload: message,
// 			});
  
//         	return Promise.reject();
//       	}
//     );
// };

export const signup = (user) => (dispatch) => {
	return signupService.signupLocal(user).then(
		(data) => {
			if (data.status && data.status !== 200) {
				dispatch({
					type: REGISTER_FAIL,
					payload: {
						error: {
							status: data.data.status,
							message: data.data.message,
						}
					},
				});
			}
			else {
				dispatch({
					type: REGISTER_SUCCESS,
					payload: {
						isMailSent: data.data.isMailSent,
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
				type: REGISTER_FAIL,
				payload: {
					error: {
						message: "Une erreur inattendue est survenue. Veuillez réessayer.",
						status: message,
					}
				},
			});
  
        	return Promise.reject();
     	 }
    )
};

export const login = (user) => (dispatch) => {
    return signinService.signinLocal(user).then(
      	(data) => {
			if (data.status && data.status !== 200) {
				dispatch({
					type: LOGIN_FAIL,
					payload: {
						error: {
							status: data.data.error,
							message: data.data.message,
						},
					},
				});
			}
			else {
				dispatch({
					type: LOGIN_SUCCESS,
					payload: {
						accessToken: data.accessToken,
						user: data.user,
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
				type: LOGIN_FAIL,
				payload: {
					error: error,
				},
			});

			dispatch({
				type: SET_MESSAGE_LOGIN,
				payload: message,
			});
  
        	return Promise.reject();
     	 }
    )
};

export const getUser = () => (dispatch) => {
    return profilService.getUser().then(
      	(data) => {
			dispatch({
				type: USER_SUCCESS,
				payload: { user: data },
			});
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
          		type: USER_FAIL,
        	});
  
        	dispatch({
          		type: SET_MESSAGE,
          		payload: message,
        	});
  
        	return Promise.reject();
      	}
    );
};
  
export const logout = () => (dispatch) => {
	logoutService.remove();
    dispatch({
      	type: LOGOUT,
    });
};

export const deleteUser = () => (dispatch) => {
	profilService.deleteUser();
    dispatch({
      	type: DELETE,
    });
};