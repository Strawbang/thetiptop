import React, { useEffect, useState, useCallback } from 'react';
import Nav from '@Components/Nav';
import Main from '@Components/Main';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import './index.scss';
import '../index.scss';
import { getTicket, updateTicket } from "@Components/Redux/Actions/reduxActionTicket";
import { showErrorMessage, resetErrorMessages } from '@Utilities';

const TicketEdit = (props) =>  {
    const { id } = useParams();
    const history = useHistory();
    const reducer = useSelector(state => state.ticket);
    const ticket = reducer.edit ? reducer.edit.ticket : null;
    const update = reducer.update;
    const dispatch = useDispatch();
    const [submitBtnText, setSubmitBtnText] = useState('Valider');
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        dispatch(getTicket(id));
    }, []);

    useEffect(() => {
        if (reducer.error) {
            history.push('/tickets');
        }
    }, [reducer]);

    useEffect(() => {
        if (update === true) {
            history.go(0);
        }
    }, [update]);

    /*
        Get form different elements and values
    */
    const getFormVars = () => {
        const   form = document.querySelector('.ttt-form'),
                errorMessages = form.querySelectorAll('.error-msg'),
                number = {
                    field: form.querySelector('.field.number'),
                    value: form.querySelector('.field.number input').value.trim(),
                    errorMsg: form.querySelector('.field.number .error-msg'),
                },
                prize = {
                    field: form.querySelector('.field.prize'),
                    value: form.querySelector('.field.prize input').value.trim(),
                    errorMsg: form.querySelector('.field.prize .error-msg'),
                },
                actions = {
                    field: form.querySelector('.actions'),
                    submit: form.querySelector(".actions button[type='submit']"),
                    errorMsg: form.querySelector('.actions .error-msg'),
                };
        
        return { form, errorMessages, number, prize, actions };
    };

    /*
        Limit requests to one per second
    */
    const noSpam = useCallback(() => {
        if(!isLoading) {
            setIsLoading(true);
        }

        setTimeout(() => setIsLoading(false), 1000);
    }, [isLoading]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    let status;

    if (ticket) {
        if (ticket.printed) {
            status = "Imprimé";
        }
        else if (ticket.userId) {
            let owner = ticket.user.firstname + " " + ticket.user.lastname; 
            status = "Validé par " + owner;
        }
    }

    const html = (
        <div className=''>
            <form className='ttt-form edit' onSubmit={ handleSubmit }>
                <div className='field number'>
                    <label>
                        Numéro:
                        <input id='number' type='text' name='number' placeholder="Numéro" value={ ticket ? ticket.number : '' } readOnly disabled />
                    </label>
                    <div className='error-msg'></div>
                </div>
                <div className='field prize'>
                    <label>
                        Lot:
                        <input id='prize' type='text' name='prize' placeholder="Lot" defaultValue={ ticket ? ticket.prize : '' } readOnly disabled />
                    </label>
                    <div className='error-msg'></div>
                </div>
                <div className='field status'>
                    <label>
                        Statut:
                        <input id='status' type='text' name='status' placeholder="Statut" defaultValue={ status } readOnly disabled/>
                    </label>
                    <div className='error-msg'></div>
                </div>
                <div className='actions'>
                    <Button className='return-to-list' variant="contained" disabled={isLoading ? true : false }>
                        <Link to='/tickets' aria-label='Revenir au tableau des tickets'>Revenir au tableau</Link>
                    </Button>
                    {/* <Button type='submit' className='submit' variant="contained" aria-label='Valider la modification de ce ticket' disabled={isLoading ? true : false }>{ submitBtnText }</Button> */}
                    <div className='error-msg'></div>
                </div>
            </form>
        </div>
    );
    
    return (
        <div className='dashboard'>
            <div className='row'>
                <Nav/>
                <Main title='Modifier un ticket' html={ html } edit={ true }></Main>
            </div>
        </div>
    );
};

export default TicketEdit;
