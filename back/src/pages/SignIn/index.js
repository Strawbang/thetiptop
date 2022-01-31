import React, { useEffect, useState, useCallback } from 'react';
import './index.scss';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { isValidUsername, isValidPassword, showErrorMessage, resetErrorMessages } from '@Utilities';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { login } from "@Components/Redux/Actions/reduxActionAuth";
import logo from '@Assets/img/logo.svg';

const SignIn = () => {
    const   auth = useSelector((state) => state.auth),
            history = useHistory(),
            [submitBtnText, setSubmitBtnText] = useState('Connexion'),
            [isLoading, setIsLoading] = useState(false),
            dispatch = useDispatch();

    /*
        Limit requests to one per second
    */
    const noSpam = useCallback(() => {
        if(!isLoading) {
            setIsLoading(true);
        }

        setTimeout(() => setIsLoading(false), 1000);
    }, [isLoading]);

    /*
        Get form different elements and values
    */
    const getFormVars = () => {
        const   form = document.querySelector('.ttt-form'),
                errorMessages = form.querySelectorAll('.error-msg'),
                username = {
                    field: form.querySelector('.field.username'),
                    value: form.querySelector('.field.username input').value.trim(),
                    errorMsg: form.querySelector('.field.username .error-msg'),
                },
                password = {
                    field: form.querySelector('.field.password'),
                    value: form.querySelector('.field.password input').value.trim(),
                    errorMsg: form.querySelector('.field.password .error-msg'),
                },
                actions = {
                    field: form.querySelector('.actions'),
                    submit: form.querySelector(".actions button[type='submit']"),
                    errorMsg: form.querySelector('.actions .error-msg'),
                };
        
        return { form, errorMessages, username, password, actions };
    };

    useEffect( () => {
        const afterDispatch = () => {
            const { actions } = getFormVars();
            
            if (auth.isLoggedIn) {
                setSubmitBtnText(<CheckCircleOutlineIcon/>);
            }
            else if (auth.error) {
                noSpam();

                if (auth.error.status === 401 || auth.error.status === 404) {
                    actions.errorMsg.innerHTML = "Vous avez entré un email ou mot de passe invalide.";
                }
                else if (auth.error.status === 403) {
                    actions.errorMsg.innerHTML = "Vous n'avez pas accès au site d'administration.";
                }
                else {
                    actions.errorMsg.innerHTML = "Une erreur inattendue est survenue. Veuillez réessayer.";
                }

                showErrorMessage(actions.errorMsg);
                setSubmitBtnText('Connexion');
            }
        };

        if (auth) {
            afterDispatch();

            if (auth.isLoggedIn) {
                history.push("/");
            }
        }
    }, [auth]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) {
            return;
        }

        const { errorMessages, username, password, actions } = getFormVars();
        
        resetErrorMessages(errorMessages);
        
        if (username.value === '') {
            noSpam();
            username.errorMsg.innerHTML = "L'email est obligatoire.";
            showErrorMessage(username.errorMsg);
            return;
        }

        if (password.value === '') {
            noSpam();
            password.errorMsg.innerHTML = "Le mot de passe est obligatoire.";
            showErrorMessage(password.errorMsg);
            return;
        }

        if (!isValidUsername(username.value)) {
            noSpam();
            username.errorMsg.innerHTML = "Cet email est invalide.";
            showErrorMessage(username.errorMsg);
            return;
        }

        if (!isValidPassword(password.value)) {
            noSpam();
            password.errorMsg.innerHTML = "Ce mot de passe est invalide. Rappel: minimum 6 caractères.";
            showErrorMessage(password.errorMsg);
            return;
        }

        const data = {
            email : username.value,
            password : password.value,
        };
        
        try {
            setIsLoading(true);
            setSubmitBtnText(<CircularProgress />);
            dispatch(login(data));
        }
        catch (e) {
            noSpam();
            setSubmitBtnText('Connexion');
            actions.errorMsg.innerHTML = "Une erreur inattendue est survenue. Veuillez réessayer plus tard.";
            showErrorMessage(actions.errorMsg);
            console.error(e);
        }

    };

    return(
        <div className='signin'>
            <div className='top'>
                <img src={ logo } alt='logo de Thé Tip Top'/>
                <h1>Administration</h1>
            </div>
            <form className='ttt-form' onSubmit={ handleSubmit }>
                <h2>Connexion</h2>
                <div className='field username'>
                    <label htmlFor='username'>Email</label>
                    <input id='username' type='text' name='username' placeholder="Email" aria-required="true" autoComplete='current-password' required />
                    <div className='error-msg'></div>
                </div>
                <div className='field password'>
                    <label htmlFor='password'>Mot de passe</label>
                    <input id='password' type='password' name='password' placeholder='Mot de passe' aria-required="true" autoComplete='current-password' required />
                    <div className='error-msg'></div>
                </div>
                <div className='actions'>
                    <Button type='submit' className='submit' variant="contained" disabled={isLoading ? true : false }>{ submitBtnText }</Button>
                    <div className='error-msg'></div>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
