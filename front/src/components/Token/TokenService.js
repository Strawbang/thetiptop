import API from '../../config';

const consumeToken = (token) => {
    return API.post('token/consume', { token: token }, {}).then(response => {
        return response;
    }).catch(error => {
        return error.response;
    });
};

const TokenService = {
    consumeToken,
};

export default TokenService;
