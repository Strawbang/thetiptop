import './index.css';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
function Logo() {
    return (
        <div className="boxLogo">
            <Link to="/">
                <img className="logo" alt="logo de thé tip top" src={logo}/>
            </Link>
        </div>
    );
}

export default Logo;
