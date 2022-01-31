import './burgermenu.css';
import React from "react";
import { fallDown as Menu } from "react-burger-menu";
import teaBag from './ttt.png';
import { Link } from 'react-router-dom';
import Logout from "../Logout";
import { useSelector } from "react-redux";

function BurgerMenu() {
  const auth = useSelector((state) => state.auth);
    
    return (
      <Menu right noOverlay width={ '75%' }>
        <main id="page-wrap">
          <Link className="menu-item" to="/">
            <h1>Accueil</h1>
          </Link>

          <Link className="menu-item" to="/rules">
            <h1>Règlement</h1>
          </Link>

          <Link className="menu-item" to="/prizes">
            <h1>Liste des lots</h1>
          </Link>

          <Link className="menu-item" to="/FAQ">
            <h1>FAQ</h1>
          </Link>
          {auth ?
            <div> 
              <Link className="menu-item menu-profil" to="/dashboard">
                <img src={teaBag} />
                <h1>Mon profil</h1>
              </Link>
              <Logout/>
            </div>
            :
            <Link className="menu-item menu-profil" to="/login">
              <img src={teaBag} />
              <h1>Me connecter</h1>
            </Link>
          }
        </main>
    </Menu>
  );
}

export default BurgerMenu;
