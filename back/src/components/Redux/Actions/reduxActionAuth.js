import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_SUCCESS,
    USER_FAIL,
    LOGOUT,
    SET_MESSAGE,
    SET_MESSAGE_LOGIN,
    SET_MESSAGE_REGISTER,
} from "../reduxTypes";
import AuthService from "@Api/AuthApi";
import ProfileService from "@Api/ProfileApi";
  

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
  
export const login = (user) => (dispatch) => {
    return AuthService.signinLocal(user).then(
      	(data) => {
			if (data.status && data.status !== 200) {
				dispatch({
					type: LOGIN_FAIL,
					payload: { data: data },
				});
			}
			else {
				dispatch({
					type: LOGIN_SUCCESS,
					payload: { user: data },
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
    return ProfileService.getUser().then(
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
	ProfileService.logOut();
    dispatch({
      	type: LOGOUT,
    });
};