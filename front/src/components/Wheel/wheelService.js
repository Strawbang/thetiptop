import API from '../../config';
import profilService from '../Profil/profilService';

const updateTicket = (number) => {
    return API.put('ticket', {number}, {headers: profilService.authHeader()}).then((response) =>{
        return response.data
    })
}

export default {
    updateTicket,
}