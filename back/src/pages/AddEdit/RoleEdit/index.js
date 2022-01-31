import React, { useEffect, useState, useCallback } from 'react';
import Nav from '@Components/Nav';
import Main from '@Components/Main';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import './index.scss';
import '../index.scss';
import { getRole, updateRole } from "@Components/Redux/Actions/reduxActionRole";
import { isValidName, showErrorMessage, resetErrorMessages } from '@Utilities';
import CircularProgress from '@material-ui/core/CircularProgress';

const RoleEdit = (props) =>  {
    const { id } = useParams();
    const history = useHistory();
    const reducer = useSelector(state => state.role);
    const role = reducer.edit ? reducer.edit.role : 1;
    const update = reducer.update;
    const dispatch = useDispatch();
    const [submitBtnText, setSubmitBtnText] = useState('Valider');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch(getRole(id));
    }, []);

    useEffect(() => {
        if (update === true) {
            history.go(0);
        }
    }, [update]);

    useEffect(() => {
        if (role.error) {
            const { name, actions } = getFormVars();
            let field;

            if (role.error_type && role.error_type === 'existing_name') {
                field = name;
            }
            else {
                field = actions;
            }

            noSpam();
            setSubmitBtnText('Valider');
            field.errorMsg.innerHTML = role.error; 
            showErrorMessage(field.errorMsg);
            role.error = null;
            role.error_type = null;
        }
        
    }, [role.error]);

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

        const data = {};

        if (name.value !== role.name) {
            data.name = name.value;
        }

        setIsLoading(true);
        setSubmitBtnText(<CircularProgress />);
        dispatch(updateRole(id, data));
    };

    const html = (
        <div className=''>
            <form className='ttt-form edit' onSubmit={ handleSubmit }>
                <div className='field name'>
                    <label>
                        Nom:
                        <input id='name' type='text' name='name' placeholder="Nom" aria-required="true" defaultValue={ role ? role.name : '' } required />
                    </label>
                    <div className='error-msg'></div>
                </div>
                <div className='actions'>
                    <Button className='return-to-list' variant="contained" disabled={isLoading ? true : false }>
                        <Link to='/roles' aria-label='Revenir au tableau des rôles'>Revenir au tableau</Link>
                    </Button>
                    <Button type='submit' className='submit' variant="contained" aria-label='Valider la modification de ce rôle' disabled={isLoading ? true : false }>{ submitBtnText }</Button>
                    <div className='error-msg'></div>
                </div>
            </form>
        </div>
    );

    return (
        <div className='dashboard'>
            <div className='row'>
                <Nav/>
                <Main title='Modifier un rôle' html={ html } edit={ true }></Main>
            </div>
        </div>
    );
};

export default RoleEdit;
