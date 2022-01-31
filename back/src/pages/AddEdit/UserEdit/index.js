import React, { useEffect, useState, useCallback, Fragment } from 'react';
import Nav from '@Components/Nav';
import Main from '@Components/Main';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "@Components/Redux/Actions/reduxActionUser";
import { getRoles } from "@Components/Redux/Actions/reduxActionRole";
import './index.scss';
import '../index.scss';
import { isValidUsername, isValidName, showErrorMessage, resetErrorMessages, getCheckboxesValues, isValidAddress, isValidCity, isValidPostcode } from '@Utilities';
import CircularProgress from '@material-ui/core/CircularProgress';

const UserEdit = (props) =>  {
    const { id } = useParams();
    const history = useHistory();
    const reducer = useSelector(state => state);
    const loggedUser = reducer.auth.user;
    const user = reducer.user.edit;
    const update = reducer.user.update;
    const roles = reducer.role.rows;
    const dispatch = useDispatch();
    const [submitBtnText, setSubmitBtnText] = useState('Valider');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch(getUser(id));
        dispatch(getRoles());
    }, []);

    useEffect(() => {
        if (update === true) {
            history.go(0);
        }
    }, [update]);

    useEffect(() => {
        if (reducer.user.error) {
            const { email, actions } = getFormVars();
            let field;

            if (reducer.user.error_type && reducer.user.error_type === 'existing_email') {
                field = email;
            }
            else {
                field = actions;
            }

            noSpam();
            setSubmitBtnText('Valider');
            field.errorMsg.innerHTML = reducer.user.error; 
            showErrorMessage(field.errorMsg);
            reducer.user.error = null;
            reducer.user.error_type = null;
        }
    }, [reducer.user.error]);

    const isClient = () => {
        let client = false;

        if (user) {
            if (roles) {        
                    if (user) {
                        user.roles.forEach((userRole) => {
                            if (userRole.name === 'Client') {
                                client = true;
                            }
                        });
                    }
            }
        }

        return client;
    }

    /*
        Get form different elements and values
    */
    const getFormVars = () => {
        const   form = document.querySelector('.ttt-form'),
                errorMessages = form.querySelectorAll('.error-msg'),
                email = {
                    field: form.querySelector('.field.email'),
                    value: form.querySelector('.field.email input').value.trim(),
                    errorMsg: form.querySelector('.field.email .error-msg'),
                },
                firstname = {
                    field: form.querySelector('.field.firstname'),
                    value: form.querySelector('.field.firstname input').value.trim(),
                    errorMsg: form.querySelector('.field.firstname .error-msg'),
                },
                lastname = {
                    field: form.querySelector('.field.lastname'),
                    value: form.querySelector('.field.lastname input').value.trim(),
                    errorMsg: form.querySelector('.field.lastname .error-msg'),
                },
                roleCheckboxes = {
                    field: form.querySelector('.field.roles'),
                    value: getCheckboxesValues(form.querySelectorAll('.field.roles input:checked')),
                    length: form.querySelectorAll('.field.roles input:checked').length,
                    errorMsg: form.querySelector('.field.roles .error-msg'),
                },
                actions = {
                    field: form.querySelector('.actions'),
                    submit: form.querySelector(".actions button[type='submit']"),
                    errorMsg: form.querySelector('.actions .error-msg'),
                };

        let address, city, postcode, newsletter;
        
        if (isClient()) {
            address = {
                field: form.querySelector('.field.address'),
                value: form.querySelector('.field.address input').value.trim(),
                errorMsg: form.querySelector('.field.address .error-msg'),
            };
            city = {
                field: form.querySelector('.field.city'),
                value: form.querySelector('.field.city input').value.trim(),
                errorMsg: form.querySelector('.field.city .error-msg'),
            };
            postcode = {
                field: form.querySelector('.field.postcode'),
                value: form.querySelector('.field.postcode input').value.trim(),
                errorMsg: form.querySelector('.field.postcode .error-msg'),
            };
            newsletter = {
                field: form.querySelector('.field.newsletter'),
                value: form.querySelector('.field.newsletter input:checked').value,
                errorMsg: form.querySelector('.field.newsletter .error-msg'),
            };
        }
        
        return { form, errorMessages, email, firstname, lastname, address, city, postcode, roleCheckboxes, newsletter, actions };
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

        if (isLoading) {
            return;
        }

        const { errorMessages, email, firstname, lastname, address, city, postcode, roleCheckboxes, newsletter, actions } = getFormVars();
        
        resetErrorMessages(errorMessages);

        if (email.value === '') {
            noSpam();
            email.errorMsg.innerHTML = "L'email est requis.";
            showErrorMessage(email.errorMsg);
            return;
        }

        if (firstname.value === '') {
            noSpam();
            firstname.errorMsg.innerHTML = "Le prénom est requis.";
            showErrorMessage(firstname.errorMsg);
            return;
        }

        if (lastname.value === '') {
            noSpam();
            lastname.errorMsg.innerHTML = "Le nom de famille est requis.";
            showErrorMessage(lastname.errorMsg);
            return;
        }

        if (isClient()) {
            if (address.value === '') {
                noSpam();
                address.errorMsg.innerHTML = "Le numéro et le nom de rue sont requis.";
                showErrorMessage(address.errorMsg);
                return;
            }
    
            if (city.value === '') {
                noSpam();
                city.errorMsg.innerHTML = "La ville est requise.";
                showErrorMessage(city.errorMsg);
                return;
            }
    
            if (postcode.value === '') {
                noSpam();
                city.errorMsg.innerHTML = "Le code postal est requis.";
                showErrorMessage(city.errorMsg);
                return;
            }

            if (!isValidAddress(address.value)) {
                noSpam();
                address.errorMsg.innerHTML = "Ce nom d'adresse est invalide. Il doit contenir entre 8 et 50 caractères.";
                showErrorMessage(address.errorMsg);
                return;
            }
    
            if (!isValidCity(city.value)) {
                noSpam();
                city.errorMsg.innerHTML = "Ce nom de ville est invalide. Il dépasse la limite de 45 caractères ou contient des caractères interdits.";
                showErrorMessage(city.errorMsg);
                return;
            }
    
            if (!isValidPostcode(postcode.value)) {
                noSpam();
                postcode.errorMsg.innerHTML = "Ce code postal est invalide. Il doit contenir exactement 5 caractères numériques.";
                showErrorMessage(postcode.errorMsg);
                return;
            }
        }

        if (!roleCheckboxes.length) {
            noSpam();
            roleCheckboxes.errorMsg.innerHTML = "L'attribution d'au moins un rôle est requise.";
            showErrorMessage(roleCheckboxes.errorMsg);
            return;
        }

        if (!isValidUsername(email.value)) {
            noSpam();
            email.errorMsg.innerHTML = "Cet email est invalide.";
            showErrorMessage(email.errorMsg);
            return;
        }

        if (!isValidName(firstname.value)) {
            noSpam();
            firstname.errorMsg.innerHTML = "Ce prénom est invalide.";
            showErrorMessage(firstname.errorMsg);
            return;
        }

        if (!isValidName(lastname.value)) {
            noSpam();
            lastname.errorMsg.innerHTML = "Ce nom de famille est invalide.";
            showErrorMessage(lastname.errorMsg);
            return;
        }

        const data = {};

        if (email.value !== user.email) {
            data.email = email.value;
        }

        if (firstname.value !== user.firstname) {
            data.firstname = firstname.value;
        }

        if (lastname.value !== user.lastname) {
            data.lastname = lastname.value;
        }

        if (isClient()) {
            if (address.value !== user.address) {
                data.address = address.value;
            }
    
            if (city.value !== user.city) {
                data.city = city.value;
            }
    
            if (postcode.value !== user.postcode) {
                data.postcode = postcode.value;
            }
    
            if (newsletter.value !== user.newsletter) {
                data.newsletter = newsletter.value;
            }
        }

        let roleArray = [];

        if (roleCheckboxes.length !== user.roles.length) {
            // Check if role values really exist within role table
            Object.entries(roles).map( ([index, role]) => {
                roleCheckboxes.value.forEach( (value) => {
                    if (value === role.name) {
                        roleArray.push(role.id);
                    }
                });
            });
            data.roles = roleArray;
        }
        
        try {
            setIsLoading(true);
            setSubmitBtnText(<CircularProgress />);
            dispatch(updateUser(id, data));
        } catch(e) {
            noSpam();
            setSubmitBtnText('Valider');
            actions.errorMsg.innerHTML = "Une erreur inattendue est survenue. Veuillez réessayer plus tard.";
            showErrorMessage(actions.errorMsg);
            console.error(e);
        }
    };

    let roleCheckboxesHTML;
    let currentUserRoles;
    let isLoggedUserEmployee = false;

    if (loggedUser) {
        if (loggedUser.roles) {
            currentUserRoles = loggedUser.roles;
        
            currentUserRoles.forEach((role) => {
                if (role.name === 'Admin') {
                    isLoggedUserEmployee = false;
                    return false;
                }
                else if (role.name === 'Employee') {
                    isLoggedUserEmployee = true;
                }
            });
        }
    }
    
    if (roles) {
        roleCheckboxesHTML = Object.entries(roles).map( ([index, role]) => {
            let checked;

            if (user) {
                user.roles.forEach((userRole) => {
                    if (userRole.name === role.name) {
                        checked = 'checked';
                    }
                });
            }

            return (
                <div className='role'>
                    <label>
                        <input id={ 'role' + index } type='checkbox' name='role' value={ role.name } defaultChecked={ checked } disabled={ isLoggedUserEmployee }/>
                        { role.name }
                    </label>
                </div>
            )
        });
    }
    
    let newsletterChecked = {}, clientFields;

    if (user) {
        if (user.newsletter) {
            newsletterChecked.yes = 'checked';
            newsletterChecked.no = '';
        } else {
            newsletterChecked.no = 'checked';
            newsletterChecked.yes = '';
        }
    }
    
    if (isClient()) {
        clientFields = (
            <Fragment>
                <div className='full-address'>
                    <fieldset>
                        <legend>Adresse</legend>
                        <div className='field address'>
                            <label>
                                Numéro et nom de rue:
                                <input id='address' type='text' name='address' placeholder="Adresse" aria-required="true" autoComplete='street-address' defaultValue={ user ? user.address : '' } required readOnly={ isLoggedUserEmployee }/>
                            </label>
                            <div className='error-msg'></div>
                        </div>
                        <div className='field city'>
                            <label>
                                Ville:
                                <input id='city' type='text' name='city' placeholder="Ville" aria-required="true" defaultValue={ user ? user.city : '' } required readOnly={ isLoggedUserEmployee }/>
                            </label>
                            <div className='error-msg'></div>
                        </div>
                        <div className='field postcode'>
                            <label>
                                Code postal:
                                <input id='postcode' type='text' name='postcode' placeholder="Code postal" aria-required="true" autoComplete='postal-code' defaultValue={ user ? user.postcode : '' } required readOnly={ isLoggedUserEmployee }/>
                            </label>
                            <div className='error-msg'></div>
                        </div>
                    </fieldset>
                </div>
                <div className='field newsletter'>
                        <label>Newsletter:</label>
                        <div className='radio-container'>
                            <label>
                                <input type='radio' name='newsletter' value='1' defaultChecked={ newsletterChecked.yes } disabled={ isLoggedUserEmployee }/>
                                Inscrit
                            </label>
                            <label>
                                <input type='radio' name='newsletter' value='0' defaultChecked={ newsletterChecked.no } disabled={ isLoggedUserEmployee }/>
                                Non-inscrit
                            </label>
                        </div>
                    <div className='error-msg'></div>
                </div>
            </Fragment>
        );
    }
    else {
        clientFields = null;
    }

    const html = (
        <div className=''>
            <form className='ttt-form edit' onSubmit={ handleSubmit }>
                <div className='field email'>
                    <label>
                        Email:
                        <input id='email' type='text' name='email' placeholder="Email" aria-required="true" autoComplete='email' defaultValue={ user ? user.email : '' } required readOnly={ isLoggedUserEmployee }/>
                    </label>
                    <div className='error-msg'></div>
                </div>
                <div className='field firstname'>
                    <label>
                        Prénom:
                        <input id='firstname' type='text' name='firstname' placeholder="Prénom" aria-required="true" autoComplete='given-name' defaultValue={ user ? user.firstname : '' } required readOnly={ isLoggedUserEmployee }/>
                    </label>
                    <div className='error-msg'></div>
                </div>
                <div className='field lastname'>
                    <label>
                        Nom de famille:
                        <input id='lastname' type='text' name='lastname' placeholder="Nom de famille" aria-required="true" autoComplete='family-name' defaultValue={ user ? user.lastname : '' } required readOnly={ isLoggedUserEmployee }/>
                    </label>
                    <div className='error-msg'></div>
                </div>
                <div className='field roles'>
                        <label>Rôles:</label>
                        <div className='checkboxes-container'>
                            { roleCheckboxesHTML }
                        </div>
                    <div className='error-msg'></div>
                </div>
                { clientFields }
                <div className='actions'>
                    <Button className='return-to-list' variant="contained" disabled={isLoading ? true : false }>
                        <Link to='/users' aria-label='Revenir au tableau des utilisateurs'>Revenir au tableau</Link>
                    </Button>
                    {
                        isLoggedUserEmployee ?
                        <Fragment/> :
                        <Button type='submit' className='submit' variant="contained" aria-label='Valider la modification de cet utilisateur' disabled={isLoading ? true : false }>{ submitBtnText }</Button>
                    }
                    <div className='error-msg'></div>
                </div>
            </form>
        </div>
    );
    
    return (
        <div className='dashboard'>
            <div className='row'>
                <Nav/>
                <Main title='Modifier un utilisateur' html={ html } edit={ true }></Main>
            </div>
        </div>
    );
};

export default UserEdit;
