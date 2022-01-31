import React, { useState } from 'react';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ticketCheckService from './ticketCheckService';
import Cookies from 'js-cookie'
import './index.css';

function TicketCheck(props){
    const [number, setnumber] = useState('');
    const [count, setCount] = useState(0);
    const cookies = Cookies.get();
    const { user: auth } = useSelector((state) => state.auth);

    useEffect(() => {
        const url = window.location.href;
        var loginError = url.includes("errorsGoogle")
        if(loginError) {
            let errorMsg = document.querySelector('.field.ticket .error-msg');
            errorMsg.classList.add('showCenter');
            errorMsg.innerHTML = 'Vous n\'avez pas de compte Thé Tip Top.<br> Merci de participer au jeu-concours à l\'aide d\'un ticket valide et vous inscrire ensuite.';
        }
        if (auth) {
            if (cookies.ticket) {
                let trimTicket = cookies.ticket.slice(1, -1)
                props.data.setTicket(trimTicket);
                props.data.setPrize(cookies.prize);
                props.data.setShow(4)
            }
        }
    })

    const testTicket = async (numberTicket) => {
        let errorMsg = document.querySelector('.field.ticket .error-msg');

        errorMsg.classList.remove('show');
        errorMsg.innerHTML = '';
        
        const expr = /^[a-z0-9]+$/gi;

        if (!expr.test(numberTicket)) {
            errorMsg.classList.add('show');
            errorMsg.innerHTML = "Le numéro de ticket que vous avez entré contient des caractères interdits. Veuillez réessayer.";
            return false;
        }

        await ticketCheckService.testTicket(numberTicket).then((response) => {
            if (response.data.successful === true){
                props.data.setTicket(response.data.ticket.number);
                props.data.setPrize(response.data.ticket.prize);
                if(auth && count < 1){
                    props.data.setShow(4);
                    setCount(1);
                }
                else{
                    Cookies.set('prize', response.data.ticket.prize)
                    Cookies.set('ticket', response.data.ticket.prize)
                    props.data.setShow(2);
                }
            }
            else {
                errorMsg.classList.add('show');
                errorMsg.innerHTML = response.data.message;
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        testTicket(number.trim());
    }

    return(
        <form className='ticket-check' onSubmit={handleSubmit}>
            <h2>Veuillez renseigner votre numéro de ticket</h2>
            <p><i>La participation au jeu-concours Thé Tip Top nécessite un ticket valide.</i></p>
            <div className='field ticket'>
                <label>
                    Numéro de ticket:
                    <input
                    name="number"
                    placeholder="Numéro de ticket"
                    type="text"
                    value={number}
                    onChange={e => setnumber(e.target.value)}
                    required />
                </label>
                <p className='error-msg'></p>
            </div>
            <button>Envoyer</button>
        </form>
    );
}

export default TicketCheck;