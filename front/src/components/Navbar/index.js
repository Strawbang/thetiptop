import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react'
import Logo from '../Logo'
import NavLabel from '../NavLabel'
import SquareButton from '../Button'
import Rules from '../Rules'
import Stats from '../Stats'
import './index.css';
import BurgerMenu from "./burgermenu";
import { getRemainingTicketCount } from "../Redux/reduxActionTicket";
import { getUser } from "../Redux/reduxActionAuth";
import Logout from "../Logout";
import Cookies from 'js-cookie'

function Navbar() {
    const reducer = useSelector((state) => state);
    const auth = reducer.auth;
    const ticket = reducer.ticket;
    const dispatch = useDispatch();
    const cookies = Cookies.get();

    useEffect( () => {
        if(cookies.accessToken) {
            localStorage.setItem('token', cookies.accessToken);
            Cookies.remove('accessToken')
            Cookies.remove('is_connected')
            dispatch(getUser())
        }
        if (auth !== null) {
            if (auth.accessToken) {
                dispatch(getUser())
            }
        }
        // dispatch(getRemainingTicketCount());
    }, []);

    let button, displayLogoutButton = false;
    if(auth !== null) {
        if (auth.isLoggedIn) {
            button = 'Profil';
            displayLogoutButton = true;
        }
        else {
            button = 'Login';
        }
    }
    else{
        button = 'Login';
    }

    return (
        <div>
            <div className="boxNavBar">
                <div className="navBarLogo">
                    <Logo></Logo>
                </div>
                <div className="navBarLabel">
                    <NavLabel></NavLabel>
                </div>
                <div className="navBarLogin">
                    <SquareButton buttonName={button}></SquareButton>
                    {displayLogoutButton ? <Logout/> : null};
                </div>
                <div className="navBurgerMenu">
                    <BurgerMenu pageWrapId={"page-wrap"} outerContainerId={"App"} />
                </div>
            </div>
            <div className="boxNavBar">
                    <Rules></Rules>
                    <Stats></Stats>
            </div>
        </div>
    );
}

export default Navbar;
