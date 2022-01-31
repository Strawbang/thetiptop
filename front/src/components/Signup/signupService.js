import API from '../../config';

const signupLocal = (user) => {
    return API.post('auth/signup-local', { user }).then(response => {
        return response;
    }).catch(error => {
        return error.response;
    });
}

export default {
    signupLocal,
}