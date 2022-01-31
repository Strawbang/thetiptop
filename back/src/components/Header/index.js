import React, { useEffect } from 'react';
import './index.scss';
import { Link } from "react-router-dom";
import ProfileIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import ChevronDown from '@material-ui/icons/KeyboardArrowDown';
import { useDispatch, useSelector } from "react-redux";
import { logout, getUser } from "@Components/Redux/Actions/reduxActionAuth";
import { useHistory } from "react-router-dom";

const Header = (props) => {
    const   user = useSelector((state) => state.auth.user),
            envText = getEnvText(),
            dispatch = useDispatch(),
            history = useHistory();

    useEffect(()=>{
        if(user !== null){
            dispatch(getUser())
        }
    }, []);

    useEffect(() => {
        if (!user){
            history.push('/signin');
        }
    }, [user]);

    const signOut = (e) => {
        e.preventDefault();

        dispatch(logout());
    };

    if (!user) {
        history.push('/signin');
        return null;
    }

    return (
        <header role='banner'>
            { envText }
            <div className='dropdown'>
                <div className='user'>
                    <ProfileIcon className='user-icon'/>
                    <span>{ user.email }</span><ChevronDown/>
                </div>
                <ul className='actions' role='navigation' aria-hidden='true'>
                    <li className='profile'>
                        <Link to='/profile'><ProfileIcon/> Profil</Link>
                    </li>
                    <li className='settings'>
                        <Link to='/settings'><SettingsIcon/> Paramètres</Link>
                    </li>
                    <li className='sign-out'>
                        <Link to='/' onClick={ signOut }><SignOutIcon/> Déconnexion</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

const getEnvText = () => {
    let envText;
    
    if ( process.env.NODE_ENV === 'development') {
        envText = "dév";
    }
    else {
        envText = '';
    }

    const ENV = envText;

    if (ENV && ENV === 'dév') {
        envText = <span className='env'><span>Vous êtes sur le site de </span><b>{ ENV }</b></span>;
    }
    else {
        envText = <span className='env'></span>;
    }

    return envText;
};

export default Header;
