import API from '../../config';

const testTicket = (number) => {
    return API.post('/number/ticket', { number }).then(response => {
        return response;
    }).catch(error => {
        return error.response;
    });
}

export default {
    testTicket,
}