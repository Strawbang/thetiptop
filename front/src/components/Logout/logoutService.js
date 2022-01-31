import API from '../../config';

const remove = ()=>{
    localStorage.removeItem('token');
    API.get('/logout')
}

export default {
    remove
};