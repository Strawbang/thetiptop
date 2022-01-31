import {
    TOKEN_CONSUME_FAILURE,
    TOKEN_CONSUME_SUCCESS,
} from "./reduxTypes";
import TokenService from "../Token/TokenService";
  
export const consumeToken = (token) => (dispatch) => {
	return TokenService.consumeToken(token).then(
		(data) => {
			if (data.status && data.status !== 200) {
				dispatch({
					type: TOKEN_CONSUME_FAILURE,
					payload: {
						error: data.data.error,
					},
				});
			}
			else {
				dispatch({
					type: TOKEN_CONSUME_SUCCESS,
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
				type: TOKEN_CONSUME_FAILURE,
				payload: {
					error: {
						text: "Une erreur inattendue est survenue. Veuillez réessayer.",
						message: message,
					}
				},
			});
  
        	return Promise.reject();
     	 }
    )
};
