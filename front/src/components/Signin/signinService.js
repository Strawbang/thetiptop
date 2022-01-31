import API from '../../config';

const signinLocal = (user) => {
    return API.post('auth/signin-local', { user }).then(response => {
        if(response.data.accessToken){
            localStorage.setItem('token', response.data.accessToken);
        }
        return response.data;
    }).catch(error => {
        console.log(error.response)
        return error.response;
    });
}

export default {
    signinLocal,
}