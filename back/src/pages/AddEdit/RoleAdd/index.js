import React, { useEffect, useState, useCallback } from 'react';
import Nav from '@Components/Nav';
import Main from '@Components/Main';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import './index.scss';
import '../index.scss';
import { addRole } from "@Components/Redux/Actions/reduxActionRole";
import { isValidName, showErrorMessage, resetErrorMessages } from '@Utilities';
import CircularProgress from '@material-ui/core/CircularProgress';

const RoleAdd = (props) =>  {
    const { id } = useParams();
    const history = useHistory();
    const reducer = useSelector(state => state.role);
    const add = reducer.add;
    const dispatch = useDispatch();
    const [submitBtnText, setSubmitBtnText] = useState('Valider');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (add === true) {
            history.go(0);
        }
    }, [add]);

    useEffect(() => {
        if (reducer.error) {
            const { name, actions } = getFormVars();
            let field;

            if (reducer.error_type && reducer.error_type === 'existing_name') {
                field = name;
            }
            else {
                field = actions;
            }

            noSpam();
            setSubmitBtnText('Valider');
            field.errorMsg.innerHTML = reducer.error; 
            showErrorMessage(field.errorMsg);
            reducer.error = null;
            reducer.error_type = null;
        }
        
    }, [reducer.error]);

    /*
        Get form different elements and values
    */
    const getFormVars = () => {
        const   form = document.querySelector('.ttt-form'),
                errorMessages = form.querySelectorAll('.error-msg'),
                name = {
                    field: form.querySelector('.field.name'),
                    value: form.querySelector('.field.name input').value.trim(),
                    errorMsg: form.querySelector('.field.name .error-msg'),
                },
                actions = {
                    field: form.querySelector('.actions'),
                    submit: form.querySelector(".actions button[type='submit']"),
                    errorMsg: form.querySelector('.actions .error-msg'),
                };
        
        return { form, errorMessages, name, actions };
    }

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

        if (isLoading) {
            return;
        }

        const { errorMessages, name, actions } = getFormVars();
        
        resetErrorMessages(errorMessages);

        if (name.value === '') {
            noSpam();
            name.errorMsg.innerHTML = "Le nom du rôle est obligatoire.";
            showErrorMessage(name.errorMsg);
            return;
        }

        if (!isValidName(name.value)) {
            noSpam();
            name.errorMsg.innerHTML = "Ce nom de rôle est invalide.";
            showErrorMessage(name.errorMsg);
            return;
        }

        const data = {
            name : name.value
        };

        setIsLoading(true);
        setSubmitBtnText(<CircularProgress />);
        dispatch(addRole(data));
    };

    const html = (
        <div className=''>
            <form className='ttt-form edit' onSubmit={ handleSubmit }>
                <div className='field name'>
                    <label>
                        Nom:
                        <input id='name' type='text' name='name' placeholder="Nom" aria-required="true" required />
                    </label>
                    <div className='error-msg'></div>
                </div>
                <div className='actions'>
                    <Button className='return-to-list' variant="contained" disabled={isLoading ? true : false }>
                        <Link to='/roles' aria-label='Revenir au tableau des rôles'>Revenir au tableau</Link>
                    </Button>
                    <Button type='submit' className='submit' variant="contained" aria-label="Valider l'ajout de ce rôle" disabled={isLoading ? true : false }>{ submitBtnText }</Button>
                    <div className='error-msg'></div>
                </div>
            </form>
        </div>
    );

    return (
        <div className='dashboard'>
            <div className='row'>
                <Nav/>
                <Main title='Ajouter un rôle' html={ html } edit={ true }></Main>
            </div>
        </div>
    );
};

export default RoleAdd;
