import React from 'react';
import './index.scss';
import '@Assets/css/utilities.scss';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Add';
import Header from '@Components/Header';
import { useSelector } from 'react-redux';

const Main = (props) => {
    const { title, html, children } = props;
    const loggedUser = useSelector((state) => state.auth.user);
    let isLoggedUserEmployee;

    if  (loggedUser) {
        if  (loggedUser.roles) {
            loggedUser.roles.forEach((role) => {
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

    return (
        <div className='main-content'>
            <Header></Header>
            <main role='main'>
                <div className='top'>
                    <h1>
                        { title }
                        {
                            (!props.home & !props.edit) & children !== 'tickets' & !isLoggedUserEmployee ? (
                                <a href={ '/' + children + '/add' }>
                                    <Button className='create' variant="contained" startIcon={ <CreateIcon/> }>Créer</Button>
                                </a>
                            ): null
                        }
                        <div className='clear'></div>
                    </h1>
                </div>
                <hr/>
                <div className='content'>
                    { html }
                </div>
            </main>
        </div>

    )
};

export default Main;
