import React from 'react';
import './index.scss';
import { Link } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import UserIcon from '@material-ui/icons/People';
import RoleIcon from '@material-ui/icons/AssignmentInd';
import TicketIcon from '@material-ui/icons/Receipt';
import logo from '@Assets/img/logo.svg';

const Nav = () => {
    return(
        <div className='nav-sidebar'>
            <Link to='/'>
                <img className='logo' src={ logo } alt="logo de Thé Tip Top"/>
            </Link>
            <nav className='nav-menu' aria-label="navigation">
                <ul>
                    <li>
                        <Link to='/'>
                            <div className='nav-item-icon'><HomeIcon/></div>
                            <div className='nav-item-text'>Dashboard</div>
                        </Link>
                    </li>
                    <li>
                        <Link to='/users'>
                            <div className='nav-item-icon'><UserIcon/></div>
                            <div className='nav-item-text'>Utilisateurs</div>
                        </Link>
                    </li>
                    <li>
                        <Link to='/roles'>
                            <div className='nav-item-icon'><RoleIcon/></div>
                            <div className='nav-item-text'>Rôles</div>
                        </Link></li>
                    <li>
                        <Link to='/tickets'>
                            <div className='nav-item-icon'><TicketIcon/></div>
                            <div className='nav-item-text'>Tickets</div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Nav;
