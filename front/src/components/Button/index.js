import './index.css';

import { Link } from "react-router-dom";

function Login(props) {
    const buttonName = props.buttonName
    if(buttonName === "Login") {
        return (
            <div className="boxLogin">
                <button className="login">
                    <Link style={{color: '#326148'}} to='/login'>
                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M33.15 27.2H28.9V9.42703C28.9 7.97885 27.7562 6.8 26.35 6.8H20.4V10.2H25.5V30.6H33.15C33.6196 30.6 34 30.2196 34 29.75V28.05C34 27.5804 33.6196 27.2 33.15 27.2ZM16.5877 3.45366L6.38775 6.0961C5.63072 6.29213 5.1 6.99657 5.1 7.80513V27.2H0.85C0.380375 27.2 0 27.5804 0 28.05V29.75C0 30.2196 0.380375 30.6 0.85 30.6H18.7V5.16269C18.7 4.01625 17.6609 3.17528 16.5877 3.45366ZM14.025 18.7C13.3211 18.7 12.75 17.9387 12.75 17C12.75 16.0613 13.3211 15.3 14.025 15.3C14.7289 15.3 15.3 16.0613 15.3 17C15.3 17.9387 14.7289 18.7 14.025 18.7Z" fill="#326148"/>
                        </svg>
                        Se connecter
                    </Link>
                </button>
            </div>
        );
    }
    if (buttonName === "Profil") {
        return (
            <div className="boxLogin">
                <button className="login"><Link style={{color: '#326148'}} to='/dashboard'>Mon profil</Link></button>
            </div>
        );
    }
}

export default Login;
