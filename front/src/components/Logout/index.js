import { useDispatch } from "react-redux";
import { logout } from "../Redux/reduxActionAuth";
import './index.css';
function Logout(){

    const dispatch = useDispatch();
    const logOut = () => {
        dispatch(logout());
    };

    return(
        <div className="boxDeco">
            <button className="deco" onClick={logOut}>Déconnexion</button>
        </div>
    );
}

export default Logout;