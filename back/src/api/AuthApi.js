import API from '@Config';

const signupLocal = (user) => {
    return API.post('auth/signup-local', { user }).then(response => {
        return response;
    }).catch(error => {
        return error.response;
    });
};

const signinLocal = (user) => {
    return API.post('auth/signin-local', { user, from: 'back', }).then(response => {
        if(response.data.accessToken){
            localStorage.setItem('token', response.data.accessToken);
        }
        return response.data;
    }).catch(error => {
        return error.response;
    });
}

const AuthApi = {
    signupLocal,
    signinLocal,
};

export default AuthApi;
